import React, { useContext } from 'react'
import AdminPass from '../components/AdminPass'
import NavAdmin from '../components/NavAdmin'
import { all_provider } from '../components/ContextProvider'

const AllAttendance = () => {
  const {attendance} = useContext(all_provider)

  return (
    <>
       <div className="w-full h-screen relative ">
        <AdminPass />
        <NavAdmin/>

          <div className="w-full">
            {/* total number of attendance */}
            <div className="w-full gap-2 sticky top-30 right-0 flex justify-end">
              {/* search */}
              <input type="text"
              className='text-xs w-7/10 border border-gray-300'
              placeholder='Search for year and month and week at the same or seperate...'/>

              {/* total */}
                <div className="p-2 bg-white border border-gray-100 text-sm">
                 Total ({attendance.length})
                </div>
            </div>

            <div className="grid sm:grid-cols-3  gap-3 md:grid-cols-2 xl:grid-cols-1 mt-3">
              {attendance.map((item, i) => (
                <>
                  <div className="p-3 border border-gray-200 shadow-sm rounded-xl flex justify-between gap-3 ">
                    {/* for year */}
                    <div className="w-full text-center">
                      <h1 className="text-sm text-green-500">
                        Year
                      </h1>
                      <h1 className="text-xl">
                        {item.year}
                      </h1>
                    </div>

                     {/* for month */}
                    <div className="w-full text-center">
                      <h1 className="text-sm text-blue-500">
                        Month
                      </h1>
                      <h1 className="text-xl">
                        {item.month}
                      </h1>
                    </div>

                     {/* for week  */}
                    <div className="w-full text-center">
                      <h1 className="text-sm text-yellow-500">
                        Week
                      </h1>
                      <h1 className="text-xl">
                        {item.week}
                      </h1>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default AllAttendance