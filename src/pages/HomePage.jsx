import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import SwiperComp from '../components/SwiperComp'

const HomePage = () => {
  return (
    <>
    <div className="w-full">
      <Navbar/>
      
      <div className="mt-12 overflow-y-auto w-full">
      <SwiperComp/>
      </div>
    </div>
    
    </>
  )
}

export default HomePage