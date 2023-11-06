import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path='about' element={<About/>}/>
         <Route path='contact' element={<Contact/>}/>
        </Route>
       </Routes>
      </BrowserRouter>
    </div>
  )
}
