import { Select, Text } from '@chakra-ui/react';
import React, { useState, useEffect, useRef, useContext } from 'react';
// import { useQuery } from "urql";
import { CryptoNew } from '../../types'
import { CryptoNewItem } from '../cryptonew/CryptoNewItem'
import { gqlContext, gqlendpoint } from '../../Context'

import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import { formatData } from "./utils";
import { gql, GraphQLClient, request } from 'graphql-request'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// const url = "https://api.pro.coinbase.com";
// const url = "https://api.coincap.io/v2";
const url = "https://min-api.cryptocompare.com/data"

type dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  fill: boolean;
}

type formattedDataType = {
  labels: string[];
  datasets: dataset[];
}

const initialState = {
  labels: [''], datasets: [{
    'label': '',
    'data': [],
    'backgroundColor': '#000',
    'borderColor': '#000',
    'fill': false
  }]
}

const searchQuery = `
  query Cryptonews($currencyInput: CurrencyInput!, $orderBy: OrderByParams) {
    search(currencyInput: $currencyInput, orderBy: $orderBy) {
      id
      kind
      domain
      sentiment
      title
      sourceUrl
    }
  }
`

type CryptoNewSearch = {
  id: CryptoNew['id']
  kind: CryptoNew['kind']
  domain: CryptoNew['domain']
  sentiment: CryptoNew['sentiment']
  title: CryptoNew['title']
  sourceUrl: CryptoNew['sourceUrl']
}

type CryptoNewSearchRes = {
  search: CryptoNewSearch[]
}

const CRYPTO_COMPARE_API_KEY = // "0ffd426e05f6800fd35e540bcc7d3199a05b7993d7acb6e45144c11adfde6393";
  "dab50da12c87b07262a8037ca921a3c32539c8bc2d490f7135a22f38d45eedfe"
const hourPeriod = { history: 'histominute', limit: 60 }
const dayPeriod = { history: 'histohour', limit: 24 }
const weekPeriod = { history: 'histohour', limit: 168 }
const monthPeriod = { history: 'histoday', limit: 30 }
const halfYearPeriod = { history: 'histoday', limit: 180 }
const yearPeriod = { history: 'histoday', limit: 365 }

const opts = {
  tooltips: {
    intersect: false,
    mode: "index"
  },
  plugins: {
    title: {
      display: true,
      text: ``,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

// async componentDidMount() {
//   const [gqlClient, setGqlClient] = useContext<any>(gqlContext);
//   const data = await gqlClient.request(searchQuery)

// }


export const Async = () => {
  const [state, setState] = useState(initialState as formattedDataType);
  // const [stateOpts, setStateOpts] = useState(opts);
  const [stateFilter, setStateFilter] = useState(weekPeriod);
  const [pair, setPair] = useState('ETH-EUR');
  const [quote, setQuote] = useState('0.0');
  const isSubscribed = useRef(false);
  const isSubscribedNews = useRef(false);
  const ws = useRef<WebSocket>();
  const gqlClient = new GraphQLClient(gqlendpoint)
  // const [gqlClient, setGqlClient] = useContext<any>(gqlContext);
  const [dataNews,setDataNews] = useState({} as CryptoNewSearchRes)

  const [field, setOrderByField] = useState('published_at');

  const variables = {
    orderBy: {
      field,
      direction: 'desc',
    },
    currencyInput: {
      currency: pair
    }
  }

  useEffect(() => {
    isSubscribedNews.current = true;
      // const token = document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      const token = window.location.search.substring(1).split("access_token=")[1]
      const requestHeaders = {
        authorization: token ? `Bearer ${token}` : ''
      }
      const fetchNews = async () => {
        const data = await gqlClient.request(searchQuery, variables,requestHeaders)
        setDataNews(data)
      }
      fetchNews().catch(console.error);
      return () => {
        isSubscribedNews.current = false;
        
      };
  },[pair])
  


  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com")
    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);

    ws.current.onopen = (e: any) => {
      ws.current?.send(jsonMsg);
    }

    ws.current.onmessage = (e: any) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      setQuote(data.price);

    };
  }, []);

  useEffect(() => {
    isSubscribed.current = true;

    const fetchHistoricalData = async () => {
      // console.log(stateFilter)
      let historicalDataURL = `${url}/${stateFilter.history}?fsym=${pair.split('-')[0]}&tsym=EUR&limit=${stateFilter.limit}`
      // https://api.pro.coinbase.com/products/ETH-USD/candles?start=2021-07-01T12:00:00&end=2021-07-15T12:00:00&granularity=86400
      // console.log(historicalDataURL)

      const jsondata = await fetch(historicalDataURL)
        .then(res => res.json())
        .catch(console.error);
      // console.log(jsondata)
      if (isSubscribed.current) {
        setState(formatData(jsondata))
        // initialState.datasets = formatData(jsondata).datasets;
      }
    };
    // call the function
    //.then(resp => { isSubscribed = false; })
    fetchHistoricalData().catch(console.error);
    return () => {
      isSubscribed.current = false;
    };
  }, [stateFilter, pair])

  function startFilter(e: HTMLInputElement) {
    // const oldPair = pair
    switch (e.value) {
      case '1H':
        setStateFilter(hourPeriod)
        break;
      case '1D':
        setStateFilter(dayPeriod)
        break;
      case '1W':
        setStateFilter(weekPeriod)
        break;
      case '1M':
        setStateFilter(monthPeriod)
        break;
      case '6M':
        setStateFilter(halfYearPeriod)
        break;
      case '1Y':
        setStateFilter(yearPeriod)
        break;
    }
  }

  const handleWS = (inputPair: string) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);
    ws.current?.send(unsub);
    let msg = {
      type: "subscribe",
      product_ids: [inputPair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current?.send(jsonMsg);
  };

  return (
    <>
      <Box flexShrink={0}>
        <Box width={{ base: "25em", sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} height={{ base: "sm", sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }}  >
          <Select variant='outline' placeholder='Select Currency' defaultValue={'ETH-EUR'} onChange={e => { e.preventDefault(); setPair(e.target.value); handleWS(e.target.value) }}>
            <option value='SHIB-EUR'>Shiba Inu</option>
            <option value='ETH-EUR'>Ethereum</option>
            <option value='BTC-EUR'>Bitcoin</option>
            <option value='MATIC-EUR'>Matic</option>
            <option value='USDT-EUR'>Tether</option>
            <option value='DOGE-EUR'>Dogecoin</option>
            <option value='AAVE-EUR'>AAVE</option>
            <option value='SOL-EUR'>Solana</option>
          </Select>
          <ButtonGroup variant='outline' spacing='6' my={3}>
            <Button value="1H" onClick={e => { startFilter(e.target as HTMLInputElement) }}>1H</Button>
            <Button value="1D" onClick={e => { startFilter(e.target as HTMLInputElement) }}>1D</Button>
            <Button value="1W" onClick={e => { startFilter(e.target as HTMLInputElement) }}>1W</Button>
            <Button value="1M" onClick={e => { startFilter(e.target as HTMLInputElement) }}>1M</Button>
            <Button value="6M" onClick={e => { startFilter(e.target as HTMLInputElement) }}>6M</Button>
            <Button value="1Y" onClick={e => { startFilter(e.target as HTMLInputElement) }}>1Y</Button>
          </ButtonGroup>
          <h2>{`€${quote}`}</h2>
          <Line data={state} options={opts} />
        </Box>
      </Box>
      <Box mt={{ base: 32, md: 0 }} ml={{ md: 6 }} width={{ base: "25em", sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '6xl' }}>
        <Text text-fontFamily={"Montserrat"}>Trending News</Text>
        {dataNews?.search?.map(p => <CryptoNewItem key={p.id} cryptoNew={p} />)}

      </Box>
    </>
  );
}
