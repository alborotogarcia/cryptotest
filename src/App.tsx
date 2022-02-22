import React from "react"

import { QueryClient, QueryClientProvider } from 'react-query';
// import Assets from './market/Assets'
import { Login } from './components/Login/Login';
import { Profile } from './components/Profile/Profile'
import { Routes, Route } from 'react-router-dom'
import { userContext, loginContext, gqlContext } from './Context'
import { useContext } from 'react';
import { Home } from "./components/Home/Home";

export const App = () => {
  const [userState, setUserState] = useContext<any>(userContext);
  const [login, onLogin] = useContext<any>(loginContext);
  const [gqlClient, setGqlClient] = useContext<any>(gqlContext);


  const queryClient = new QueryClient();
  return (
    <>
      <Routes>
        {/* <Route path="/cryptotest" element={<Home />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/graphql" element={<></>} /> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};