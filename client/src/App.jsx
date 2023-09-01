import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Layout from './pages/Layout';
import Type from './pages/Type';
import { UserContextProvider } from './contex';
import Result from './pages/Result';
import Game from './pages/game';


export default function App() {
 
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index/>}/>
            <Route path="/type" element={<Type />} />
            <Route path="/game" element={<Game />} />
            <Route path="/result" element={<Result/>} />
          </Route>
        </Routes>
      </UserContextProvider>
  );
}
