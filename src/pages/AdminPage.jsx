import { Check, Eye } from 'lucide-react'
import React, { useContext, useState } from 'react'
import AdminPass from '../components/AdminPass'
import NavAdmin from '../components/NavAdmin'
import { all_provider } from '../components/ContextProvider'

const AdminPage = () => {
  const {addnewmember,Notify} = useContext(all_provider)
  const [newdata, setnewdata] = useState({
    name:'',
    date_of_birth:'',
    phone_number: '',
  })
  
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

          <form
          onSubmit={(e) => {e.preventDefault(), addnewmember(newdata.name,newdata.phone_number,newdata.date_of_birth)}}
           className="grid grid-cols-3 max-md:grid-cols-2 gap-3">
            {/* name */}
            <input type="text"
            placeholder='Name...' 
            onChange={(e) => setnewdata({...newdata, name:e.target.value})}
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>

            {/* age */}
             <input type="number"
            placeholder='Phone Number...' 
            onChange={(e) => setnewdata({...newdata, phone_number:e.target.value})}
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>

            {/* phine number */}
            <input type="date"
            placeholder='Date of birth...' 
            onChange={(e) => setnewdata({...newdata, date_of_birth:e.target.value})}
            className='text-xs border- border-gray-200 focus:ring-2 p-3 focus:ring-blue-200'/>
          </form>

          <div className="flex justify-center items-center mt-4">
            <button
            onClick={() => Notify("success","new member added to the data")}
            className="mx-auto p-3 px-5 rounded-xl text-xs bg-green-600 text-white flex items-center gap-2 cursor-pointer">
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