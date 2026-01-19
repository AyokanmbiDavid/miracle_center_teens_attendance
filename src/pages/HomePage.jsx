import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const HomePage = () => {
  return (
    <>
    <div className="w-full">
      <Navbar/>
      
      <div className="flex w-full mt-15 ">
        <Sidebar/>
      </div>
    </div>
    
    </>
  )
}

export default HomePage