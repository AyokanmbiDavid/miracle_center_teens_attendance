import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SwiperComp from '../components/SwiperComp'
import Categorise from '../components/Categorise'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
    <div className="w-full relative mt-12 mb-12 overflow-y-auto">
      <Navbar/>
      
      <div className="mt-12 mb-12 overflow-y-auto w-full">
      <SwiperComp/>
      <Categorise/>
      </div>

      <Footer/>
    </div>
    
    </>
  )
}

export default HomePage