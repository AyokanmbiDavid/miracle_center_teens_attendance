import React, { useContext, useState } from 'react'
import AdminPass from '../components/AdminPass'
import NavAdmin from '../components/NavAdmin'
import { Calendar } from 'lucide-react'
import { all_provider } from '../components/ContextProvider'

const NewAttendance = () => {
  const {createattendance} = useContext(all_provider)
  const [newdetail,setnewdetail] = useState({
    year:2026,
    month:"March",
    week: 2,
  })
  return (
    <>
      <div className="w-full h-screen relative ">
        <AdminPass />
        <NavAdmin/>
        
        <div className="w-full">
          <h1 className="text-xl my-3 font-semibold text-gray-800">New Attendance</h1>

          {/* deutail info */}
          <div className="w-full grid grid-cols-3 max-md:grid-cols-1 gap-3">
            {/* for year */}
            <div className="p-3 border border-gray-200 rounded-xl">
              <h1 className="text-sm text-green-700 font-semibold">
                Year
              </h1>
              <div className="text-2xl flex w-full justify-between gap-3">
                <span className="">{newdetail.year}</span>

                <select
                onChange={(e => (setnewdetail({...newdetail, year: e.target.value})))}
                className='text-sm rounded-xl border border-gray-500'>
                  {["2026","2025","2024"].map((item, i) => (
                    <option value={item} >{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* for month */}
            <div className="p-3 border border-gray-200 rounded-xl">
              <h1 className="text-sm text-blue-700 font-semibold">
                Month
              </h1>
              <div className="text-2xl  flex w-full justify-between gap-3">
                <span className="">{newdetail.month}</span>

                <select name=""
                onChange={(e => (setnewdetail({...newdetail, month: e.target.value})))}
                className='text-sm rounded-xl border border-gray-500'>
                  {["April","May","June","July"].map((item, i) => (
                    <option value={item} >{item}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* for week */}
            <div className="p-3 border border-gray-200 rounded-xl">
              <h1 className="text-sm text-yellow-500 font-semibold">
                Week
              </h1>
              <div className="text-2xl flex w-full justify-between gap-3">
                <span className="">{newdetail.week}</span>

                <select name=""
                onChange={(e => (setnewdetail({...newdetail, week: e.target.value})))}
                className='text-sm rounded-xl border border-gray-500'>
                  {[1,2,3,4].map((item, i) => (
                    <option value={item} >{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* submit */}
          <div className="w-full flex justify-center items-center mt-4">
              <button 
              onClick={() => createattendance(newdetail.year,newdetail.month,newdetail.week)}
              className="flex justify-center items-center gap-3 p-3 px-6 rounded-xl shadow-md hover:shadow-sm bg-gradient-to-bl from-blue-400 to-green-700 text-white cursor-pointer duration-200">
                Create <Calendar size={17}/></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewAttendance