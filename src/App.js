import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import TodoHistory from './components/TodoHistory';
import TodoWrapper from './components/TodoWrapper';



export default function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoWrapper />} />
      
        <Route path="/home" element={<TodoHistory/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}
