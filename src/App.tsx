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

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import Assets from './market/Assets'
import {NavBar} from './components/NavBar/NavBar'
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

  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={theme}>
      <NavBar/>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <Box textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']}>
        {/* <Assets/> */}
        <Grid minH="100vh" p={['sm', 'md', 'lg', 'xl']} bg="gray.50">

          <Flex alignItems="justify-between">
            
{/* 
            <Logo h="32" pointerEvents="none" />
            <Heading as="h1" size="xl">
              JOIN THE MOVEMENT!
            </Heading>

            {/* <Heading as="h2" size="4xl">
              <Counter from={0} to={res.data || data.totalNews} />
            </Heading> */}
            {/* <Flex> */}
              {/* <ReactECharts option={option} /> */}
              <CryptoNewBoard/>
            {/* </Flex> */}

          </Flex>
        </Grid>
      </Box>
        </QueryClientProvider>
    </ChakraProvider>
  );
};