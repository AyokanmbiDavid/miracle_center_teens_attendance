import React from 'react'
import AdminPass from '../components/AdminPass'
import NavAdmin from '../components/NavAdmin'
import DataTable from '../components/DataTable'
import { Download } from 'lucide-react'

const MemberData = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <AdminPass/>
        <NavAdmin/>

        <div className="w-full h-screen">
          <DataTable/>

          <div className="w-full mt-5 flex justify-center">
            <button className='flex items-center justify-center gap-3 p-3 px-4 text-xs text-white bg-gradient-to-bl from-green-500 to-green-800 rounded-xl shadow-md cursor-pointer'>
              Download PDF <Download size={17} />
            </button>
          </div>
        </div>
    </div>
    </>
  )
}

export default MemberData