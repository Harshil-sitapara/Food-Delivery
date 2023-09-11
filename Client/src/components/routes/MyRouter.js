import React from 'react'
import {  Route, Routes } from 'react-router-dom'
// pages
import Home from '../../Pages/HomePage'
import Food from '../../Pages/FoodsPage'
import Cart from '../../Pages/CartPage'
import Contact from '../../Pages/ContactPage'
import Checkout from '../../Pages/Checkout'
import Register from '../../Pages/Register'
import Login from '../../Pages/Login'
import OrderPage from '../../Pages/OrderPage'
// import Dashboard from '../../Admin/pages/Dashboard.js'

export default function MyRouter() {
  return (
    <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/foods' element={<Food/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/feedback' element={<Contact/>}/>
        <Route path='/checkout' element={<Checkout/>}/>     
        <Route path='/myorders' element={<OrderPage/>}/>     
    </Routes>
  )
}
