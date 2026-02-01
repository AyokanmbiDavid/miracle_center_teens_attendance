import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { Filter, X } from 'lucide-react'
import SelectFilter from '../components/SelectFilter'
import { ShopContext } from '../components/ContextProvider'

const Category = () => {
  const [showSet, setshowSet] = useState(false);
  const {selcategory,selCat, } = useContext(ShopContext)
  return (
    <>
      <div className="w-full">
        <Navbar/>

        <div className="w-full relative mt-12 mb-12">
          {/* show to select */}
          {showSet && <SelectFilter/>}

          {/* remove button */}
          {showSet && 
          <div className="absolute top-5 right-5">
            <button 
            onClick={() => setshowSet(false)}
            className="">
              <X size={21}/>
            </button>
          </div>}

          {/* header */}
          <div className="flex w-full justify-between items-center px-3 py-2 border-b border-slate-200">
            <h1 className="text-xl p-2 py-3">
            Category Page
          </h1>

          {/* pick item */}
          <button 
          onClick={() => setshowSet(true)}
          className=" p-2 px-3 rounded-full border border-slate-200 flex items-center gap-2 bg-purple-300 shadow-md">
            select filter 
            <Filter size={17}/>
          </button>
          </div>

          {/* filter for: */}
          <h1 className="text-sm p-2">
            Filtered for: <span className="font-semibold text-xl">{selcategory}</span>
          </h1>
        </div>
      </div>
    </>
  )
}

export default Category