import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { ShopContext } from '../components/ContextProvider'
import { ChevronRight, DoorOpen, LogOut, Pen, Star } from 'lucide-react';
import Footer from '../components/Footer';
import {Link} from "react-router-dom"

const Profile = () => {
  const {userdata} = useContext(ShopContext);
  const [rating,setrating] = useState()

  return (
    <>
      <div className="relative mt-12 mb-12 max-md:h-[610px]  overflow-y-auto">
        <Navbar/>

       {/* logout button */}
       <Link to={'/login'}
        className="absolute flex justify-between items-center font-semibold top-3 right-3 p-2 px-3 rounded-r-md rounded-2xl bg-red-500 text-white text-xs shadow-md">
          logout <LogOut
          className='ml-3' 
          size={15}/>
       </Link>

       {/* Account Info */}
       <div className="w-full p-2">
        <h1 className="text-2xl font-bold text-slate-800 border-b pb-3 border-slate-300 mt-10 pl-3">
          {userdata.username}
        </h1>
       </div>

       {/* options */}
       <div className="w-full mb-7 flex flex-col justify-start px-2 gap-2">
          {["update Account","Recall Order","Customer Service"].map((item, e) => (
            <div key={e}
            className="w-full p-3 bg-slate-100 rounded-tl-xl flex justify-between items-center"> 
            {item}
            <ChevronRight size={17}/>
            </div>
          ))}


            <Footer/>
       </div>
      </div>
    </>
  )
}

export default Profile