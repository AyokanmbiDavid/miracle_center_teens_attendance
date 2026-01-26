import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { ShopContext } from '../components/ContextProvider'
import { DoorOpen, Pen, Star } from 'lucide-react';

const Profile = () => {
  const {userdata} = useContext(ShopContext);
  const [rating,setrating] = useState()

  return (
    <>
      <div className="">
        <Navbar/>

        <div className="mt-15">
          <div className=" w-[200px] text-md font-semibold text-slate-800 p-3 relative">
            User Account

          <h1 className="absolute right-10 bottom-0 text-xs bg-slate-100 p-1 rounded-full">
            {userdata.username}
          </h1>
            </div>
          
          <div className="flex mt-3 px-4 gap-3 items-center justify-start pb-4 border-b border-slate-300">
            {/* Edit profile */}
            <button className="relative cursor-pointer text-xs max-md:w-full p-2 rounded-l-full rounded-md flex items-center justify-center border border-purple-300 text-purple-700 hover:scale-[1.1] duration-300">
              Edit Account <Pen className='absolute -bottom-2 right-1/2 bg-white ' size={15} />
            </button>

            {/* logout */}
             <button className="relative cursor-pointer text-xs max-md:w-full p-2 rounded-r-full rounded-xl border border-red-300 text-white bg-red-500 hover:scale-[1.1] duration-300">
              Log out
               <DoorOpen className='absolute -bottom-2 right-1/2 text-red-900 bg-white rounded-full' size={15} />
            </button>
          </div>

          {/* contact us */}
          <div className="mt-4 px-3 border-b border-slate-200 pb-3">
            <h1 className="">Contact Us for</h1>
            <div className="flex mt-2 gap-1 overflow-y-auto">
              {/* feedback */}
              <span className="text-xs p-1 px-3 rounded-full border border-green-300 text-slate-800 hover:bg-green-500 duration-300 shrink-0">feedback</span>

              {/* complaint */}
               <span className="text-xs p-1 px-3 rounded-full border border-green-300 text-slate-800 hover:bg-green-500 duration-300 shrink-0">Complaints</span>

               {/* support us */}
                <span className="text-xs p-1 px-3 rounded-full border border-green-300 text-slate-800 hover:bg-green-500 duration-300 shrink-0">Support Us</span>

                {/* others */}
                 <span className="text-xs p-1 px-3 rounded-full border border-green-300 text-slate-800 bg-green-100 hover:bg-green-500 duration-300">Others</span>
            </div> 
          </div>

          {/* rating */}
            <div className="mt-4 px-3">
              <h1 className="text-sm text-slate-700 ">Please take a moment to give us a rating</h1>

              <div className="flex gap-2 items-center max-md:justify-center mt-2">
                {[1,2,3,4,5].map((star, i) => (
                <>
                  <div 
                  onClick={() => setrating(star)}
                  className={`${star <= rating ? 'text-green-600 ' : ''} cursor-pointer hover:scale-[1.1] duration-300`} key={i}>
                    <Star size={17}/>
                  </div>
                </>
              ))}
              </div>
              
              {rating && <div className="w-full flex mt-3 items-center justify-start max-md:justify-center">
                  <button className="p-2 px-4 rounded-xl bg-green-600 text-white text-xs cursor-pointer">
                    Submit
                  </button>
              </div>}
            </div>
        </div>
      </div>
    </>
  )
}

export default Profile