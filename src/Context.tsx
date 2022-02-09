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

// export const authGoogle = 'http://localhost:3001/auth/google'
// export const gqlendpoint = 'http://localhost:3001/graphql'
export const authGoogle = 'https://cryptoboro.herokuapp.com/auth/google'
export const gqlendpoint = 'https://cryptoboro.herokuapp.com/graphql'

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
//       authorization: token ? `Bearer ${token}` : "Bearer ",
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
//     //         Authorization: `Bearer `,
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
        axios.get("https://cryptoboro.herokuapp.com/profile", { withCredentials: true }).then((res: AxiosResponse) => {
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