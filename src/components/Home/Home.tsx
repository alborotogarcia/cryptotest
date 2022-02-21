import { Box, Flex, Grid } from "@chakra-ui/react"
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Login } from '../Login/Login';
import { CryptoNewBoard } from "../cryptonew/CryptoNewBoard";
import { useContext } from "react";
import { userContext, loginContext, gqlContext } from '../../Context'


export const Home = () => {
    const [login, onLogin] = useContext<any>(loginContext);

    const queryClient = new QueryClient();
    return <>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Box textAlign="center" fontSize={['sm', 'md', 'lg', 'xl']}>
                <Grid minH="100vh" p={['sm', 'md', 'lg', 'xl']} >
                    <Flex alignItems="justify-between">
                        {
                            login ? true : (
                                <Login />
                            )
                        }
                        <CryptoNewBoard />
                    </Flex>
                </Grid>
            </Box>
        </QueryClientProvider>
    </>
}