import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavAdmin = () => {
  return (
    <>
      <div className="w-full sticky top-15 left-0 border-b bg-white border-gray-200 p-2 flex justify-start gap-3 overflow-x-auto px-2">
        {/* new attendance */}
        <Link className="p-2.5 px-3 text-xs bg-blue-600 text-white rounded-md flex items-center gap-3 cursor-pointer">
          <Plus size={16}/>
          <span className='max-md:hidden' >New</span>
        </Link>

        {/* all attendance */}
        <Link className="p-2.5 px-3 text-xs border border-blue-600 text-blue-700 rounded-md flex items-center gap-3 cursor-pointer">
        All Attendance
        </Link>

        {/* complaint */}
        <Link className="p-2.5 px-3 text-xs border border-blue-600 text-blue-700 rounded-md flex items-center gap-3 cursor-pointer">
          App Complaints
        </Link>
      </div>
    </>
  )
}

export default NavAdmin