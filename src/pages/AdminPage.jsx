import { Check, Eye } from 'lucide-react'
import React, { useState } from 'react'
import AdminPass from '../components/AdminPass'
import NavAdmin from '../components/NavAdmin'

const AdminPage = () => {
  
  return (
    <>
     <div className="relative w-full h-screen">
      <AdminPass/>
      <NavAdmin/>

      <div className="w-full h-screen">
        <h1 className="text-md font-bold text-gray-700 py-3">
          Recent
        </h1>

        <div className="flex gap-2 justify-start items-center">
          {/* first */}
          <div className="p-3 border border-gray-300 cursor-pointer">
            2026 | February | Week 1
          </div>
        </div>

        {/* new Member */}
        <div className="">
          <h1 className="text-md font-bold text-gray-700 py-3">
            Add a New Member
          </h1>

          <div className="grid grid-cols-3 max-md:grid-cols-2 gap-3">
            {/* name */}
            <input type="text"
            placeholder='Name...' 
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>

            {/* age */}
             <input type="number"
            placeholder='Age...' 
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>

            {/* phine number */}
            <input type="date"
            placeholder='Date of birth...' 
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>
          </div>

          <div className="flex justify-center items-center mt-4">
            <button className="mx-auto p-3 rounded-sm text-xs bg-green-600 text-white flex items-center gap-2 cursor-pointer">
              Add Now
              <Check size={17} />
            </button>
           </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default AdminPage