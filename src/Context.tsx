import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { initialUser, IUser } from './types'
// import { createClient, Provider, subscriptionExchange, defaultExchanges } from 'urql';
// import { createClient as createWSClient } from 'graphql-ws';

// import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import { GraphQLClient } from 'graphql-request'

import { googleToken } from './components/Login/Login';

export const userContext = createContext<any>([{}, () => { }]);
export const loginContext = createContext<any>([{}, () => { }]);
export const gqlContext = createContext<any>([{}, () => { }]);

export const authGoogle = 'http://localhost:3001/auth/google'
export const gqlendpoint = 'http://localhost:3001/graphql'

export const graphQLClient = new GraphQLClient(gqlendpoint)

// export const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
//   credentials: 'include'
// });

// export const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   // const token = localStorage.getItem('token');
//   const token = document.cookie.replace(/(?:(?:^|.*;\s*)session\s*\=\s*([^;]*).*$)|^.*$/, "$1")
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhbGJvcm90b2dhcmNpYTc3N0BnbWFpbC5jb20iLCJwcm92aWRlcmlkIjoiMTAwMDkyNjA2NzYwOTk4NTI2MjAyIiwiaWF0IjoxNjQzOTYxOTY1LCJleHAiOjE2NDQwNDgzNjV9.yLItGT3-yo5hjlQXDMwgcwfn5m38W5aWR_5qaWDqejA",
//     }
//   }
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

// export const wsClient = createWSClient({
//     url: 'ws://localhost:3001/graphql',
//     // url: 'ws://cryptoboro.herokuapp.com:3001/graphql',
//     // connectionParams: async () => {
//     //     return {
//     //       headers: {
//     //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYm9yb3RvZ2FyY2lhNzc3QGdtYWlsLmNvbSIsInN1YiI6MywicHJvdmlkZXJpZCI6IjEwMDA5MjYwNjc2MDk5ODUyNjIwMiIsImlhdCI6MTY0MzkzMjU0MCwiZXhwIjoxNjQ0MDE4OTQwfQ.8tYyNbMWULbkxaRuKRKKVF1BRRmMFBWc9eJJburTwmw`,
//     //       },
//     //     };
//     //   },
//   });
  
// export const client = createClient({
//     url: 'http://localhost:3001/graphql',
//     // url: 'https://cryptoboro.herokuapp.com/graphql',
//     fetchOptions: () => {
//       const token = googleToken(authGoogle);
//       console.log('taaa',token)
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


export const UserContext = (props: any) => {

    const [user, setUser] = useState(initialUser as IUser);
    useEffect(() => {
        axios.get("http://localhost:3001/profile", { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                const { username = '', providerid = '', auth = true, sub = -1 } = { ...res.data };
                const user = { username: username, googleId: providerid, auth: auth, _id: sub } as IUser
                setUser(user);
            }
        }).catch(console.error)
    }, [])
    const setAuth = (user: IUser) => {
        setUser(user)
    };
    return (
        <userContext.Provider value={[user, setAuth]}>{props.children}</userContext.Provider>
    )
}


export const LoginContext = (props: any) => {

    const [login, onLogin] = useState(true);

    return (
        <loginContext.Provider value={[login, onLogin]}>{props.children}</loginContext.Provider>
    )
}

export const GqlContext = (props:any) => {
    
    const [gqlClient, setGqlClient] = useState(graphQLClient);
      return (
        
            <gqlContext.Provider value={[gqlClient, setGqlClient]}>
              {/* <ApolloProvider client={gqlClient}> */}
                {props.children}
              {/* </ApolloProvider> */}
            </gqlContext.Provider>
    )
}