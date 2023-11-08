import './App.css'
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './components/Product';
import NoPage from './pages/NoPage';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import ShoppingCart from './components/ShoppingCart';

export default function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path='about' element={<About/>}/>
         <Route path='contact' element={<Contact/>}/>
         <Route path='product/:id' element={<Product/>}/>
         <Route path='addproduct' element={<AddProduct/>}/>
         <Route path='cart' element={<ShoppingCart/>}/>
         <Route path='*' element={<NoPage/>}/>
        </Route>
       </Routes> 
      </BrowserRouter>
    </div>
  )
}
