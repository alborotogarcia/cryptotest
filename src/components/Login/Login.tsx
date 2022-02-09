import React, {useContext} from 'react'
import { useDisclosure, VStack, Button, Flex, 
    ModalFooter, ModalBody, ModalContent, ModalHeader, ModalOverlay, Modal, ModalCloseButton } from '@chakra-ui/react'
import { FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { userContext, loginContext, gqlContext, authGoogle, gqlendpoint } from '../../Context'
import { GraphQLClient } from 'graphql-request';
// import { createClient as createWSClient } from 'graphql-ws';
// import { createClient, Provider, subscriptionExchange, defaultExchanges } from 'urql';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

export const googleToken = (provider:string)=>{
  window.open(provider, "_self")
  const token = window.location.search.substring(1).split("access_token=")[1]
  return token.length !== 0 ? token : null
}

export const Login = (props:any) => {
    const [login, onLogin] = useContext<any>(loginContext);
    const [userState, setUserState] = useContext<any>(userContext);
    const [gqlClient, setGqlClient] = useContext<any>(gqlContext);

    const { isOpen, onOpen, onClose } = useDisclosure({isOpen:true})
    const googleLogin = () => {
        const token = googleToken(authGoogle)
        // console.log(document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
        // console.log(token)
        if(token){
            const user = userState
            user.token = token
            setUserState(user)

            // urql
            // const wsClient = createWSClient({
            //     url: 'ws://localhost:8080/v1/graphql',
            //     connectionParams: async () => {
            //       return {
            //         headers: {
            //           Authorization: `Bearer ${token}`,
            //         },
            //       };
            //     },
            //   });
            // const client = createClient({
            //     // url: 'http://localhost:3001/graphql',
            //     url: 'https://cryptoboro.herokuapp.com/graphql',
            //     fetchOptions: () => {
            //       // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbGJvcm90b2dhcmNpYTc3N0BnbWFpbC5jb20iLCJwcm92aWRlcmlkIjoiMTAwMDkyNjA2NzYwOTk4NTI2MjAyIiwiaWF0IjoxNjQzOTU3NjI5LCJleHAiOjE2NDQwNDQwMjl9.WX_jTtTSnU0JKKdo9EBObuuH1jG8hb9z5MWiqiD7vss';
            //       return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            //     },
            //     exchanges: [
            //       ...defaultExchanges,
            //       subscriptionExchange({
            //         forwardSubscription: (operation:any) => ({
            //           subscribe: (sink: any) => ({
            //             unsubscribe: wsClient.subscribe(operation, sink),
            //           }),
            //         }),
            //       }),
            //     ],
            //   });
            // apollo
            // const authLink = setContext((_, { headers }) => {
            //   // get the authentication token from local storage if it exists
            //   // const token = localStorage.getItem('token');
            //   // const token = document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            //   // return the headers to the context so httpLink can read them
            //   return {
            //     headers: {
            //       ...headers,
            //       authorization: token ? `Bearer ${token}` : "",
            //     }
            //   }
            // });
            
            // const client = new ApolloClient({
            //   link: authLink.concat(httpLink),
            //   cache: new InMemoryCache()
            // });
            
            const graphQLClient = new GraphQLClient(gqlendpoint, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            setGqlClient(graphQLClient)
            // console.log(user)
        }
    }

    const githubLogin = () => {
        // window.open("http://localhost:3001/auth/github", "_self");
        window.open("https://cryptoboro.herokuapp.com/auth/github", "_self");
    }
    
    const twitterLogin = () => {
        window.location.href = "https://cryptoboro.herokuapp.com/auth/twitter"
    }

    return (
        <Modal isOpen={isOpen} onClose={()=>{onLogin(!login); return onClose;}}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Sign in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Flex justifyContent="center">
                    <VStack spacing={6}>
                        <Button colorScheme='teal' leftIcon={<FaGoogle />} onClick={googleLogin} variant="outline">
                            Log in with Google
                        </Button>
                        <Button colorScheme='gray' leftIcon={<FaGithub />} onClick={githubLogin}>
                            Log in with Github
                        </Button> 
                        <Button colorScheme='twitter' leftIcon={<FaTwitter />} onClick={twitterLogin}>
                            Log in with Twitter
                        </Button> 
                    </VStack>
                </Flex>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='red' onClick={()=>{onLogin(!login); return onClose;}}>
            {/* <Button colorScheme='red' mr={3} onClick={()=>{onLogin(!login); return onClose;}}> */}
                Cancel
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
            </ModalFooter>
        </ModalContent>
        </Modal>

    )
}
