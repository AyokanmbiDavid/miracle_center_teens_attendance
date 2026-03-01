import { Angry, Home, Plus, Speaker, Table, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavAdmin = () => {
  return (
    <>
      <div className="w-full sticky top-15 left-0 border-b bg-white border-gray-200 p-2 flex justify-start gap-3 overflow-x-auto px-2">
        {/* new attendance */}
        <Link
        to={'/newattendance'}
        className="p-2.5 px-3 text-xs bg-blue-600 text-white rounded-2xl flex items-center shrink-0 gap-3 cursor-pointer">
          <Plus size={16}/>
          <span className='max-md:hidden' >New</span>
        </Link>

        {/* Home */}
        <Link to={"/admin"}
        className="p-2.5 px-3 text-xs bg-gradient-to-tr from-blue-600 to-green-500 text-white shadow-xl hover:shadow-sm rounded-2xl flex items-center shrink-0 gap-3 duration-300 cursor-pointer">
          <span className="max-md:hidden">Home</span>
        <Home size={17} />
        </Link>

        {/* all attendance */}
        <Link to={"/allattendance"}
        className="p-2.5 px-3 text-xs border border-blue-400 text-blue-700 rounded-2xl flex items-center shrink-0 gap-3 cursor-pointer">
        All Attendance 
        <Table size={17} />
        </Link>

        {/* complaint */}
        <Link className="p-2.5 px-3 text-xs border border-blue-400 text-blue-700 rounded-2xl flex items-center shrink-0 gap-3 cursor-pointer">
          App Complaints <Speaker size={17}/>
        </Link>

        {/* see all members data */}
         <Link 
         to={"/memberdata"}
         className="p-2.5 px-3 text-xs border bg-green-600 text-white rounded-2xl flex items-center shrink-0 gap-3 cursor-pointer">
          Sell All members data <User size={17} />
        </Link>
      </div>
    </>
  )
}

export default NavAdmin