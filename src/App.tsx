import React from "react"
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/300.css';
import {
  ChakraProvider, Box, Grid, Flex, extendTheme,
  // Text, Link, VStack, Code, Heading,
  // theme,
} from "@chakra-ui/react"
// import { Logo } from "./Logo"
// import { useSubscription, useQuery, } from "urql";
// import { Counter } from "./components/cryptonew/Counter";
import { CryptoNewBoard } from "./components/cryptonew/CryptoNewBoard";
// import GOAuth from "./components/goauth/GOAuth";

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import Assets from './market/Assets'
import {Login} from './components/Login/Login';
import {NavBar} from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { userContext, loginContext, gqlContext } from './Context'
import { useContext} from 'react';
// import { createClient, Provider, subscriptionExchange, defaultExchanges } from 'urql';
// import { createClient as createWSClient } from 'graphql-ws';


// import { ReactECharts } from "./gauge/ReactECharts"
// import { option } from "./gauge/Chart"

// const TotalNewsQuery = `
//     query Query {
//       totalNews
//     }
//   `;

// const TotalNewsUpdated = `
//     subscription Subscription {
//       totalNewsUpdated {
//         total
//       }
//     }
//   `;

// const handleSubscription = (previous: any, newTotal: any) => {
//   return newTotal?.totalNewsUpdated?.total;
// }

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat'
  },
})


export const App = () => {
  // const [res] = useSubscription({ query: TotalNewsUpdated }, handleSubscription);
  // const [{ data, fetching, error }] = useQuery({ query: TotalNewsQuery });
  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;
  const [userState, setUserState] = useContext<any>(userContext);
  const [login, onLogin] = useContext<any>(loginContext);
  const [gqlClient, setGqlClient] = useContext<any>(gqlContext);
  
  
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme}>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/graphql" element={<></>}/>
        <Route path="/" element={<></>}/>
        {/* <Route  path="/signup" element={<GOAuth/>}/> */}
      </Routes>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <Box textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']}>
        {/* <Assets/> */}
        <Grid minH="100vh" p={['sm', 'md', 'lg', 'xl']} bg="gray.50">

          <Flex alignItems="justify-between">
          {/* 
            {/* <Heading as="h2" size="4xl">
              <Counter from={0} to={res.data || data.totalNews} />
            </Heading> */}
            {/* <Flex> */}
              {/* <ReactECharts option={option} /> */}

              {
                login ? true : (
                  <Login />
                )
              }
              {/* <Provider value={gqlClient}> */}
                <CryptoNewBoard/>
              {/* </Provider> */}
            {/* </Flex> */}

          </Flex>
        </Grid>
      </Box>
        </QueryClientProvider>
    </ChakraProvider>
  );
};