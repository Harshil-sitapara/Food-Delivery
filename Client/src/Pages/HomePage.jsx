import React, { useEffect } from 'react'
import Navbar from '../components/Home/Navbar'
import Front from '../components/Home/Front'
import Category from '../components/Home/Category'
import Serve from '../components/Home/Serve'
import PopularFood from '../components/Home/PopularFood'
import WhyFoodEase from '../components/Home/WhyFoodEase'
import HotPizza from '../components/Home/HotPizza'
import Testimonials from '../components/Home/Carousel/Testimonials'
import AOS from 'aos'
import Footer from '../components/Home/Footer'

export default function Home() {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <div>
      <Navbar/>
      <Front/>
      <Category/>
      <Serve/>
      <PopularFood/>
      <WhyFoodEase/>
      <HotPizza/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}
