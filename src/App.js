import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './components/Home';
import TodoWrapper from './components/TodoWrapper';



export default function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoWrapper />} />
      
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}
