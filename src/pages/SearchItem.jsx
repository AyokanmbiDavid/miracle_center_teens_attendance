import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Filter, Search } from 'lucide-react'
import { ShopContext } from '../components/ContextProvider'

const SearchItem = () => {
  const {filtertype, setfiltertype,similaritem,filtereditem} = useContext(ShopContext)
  

  return (
    <>
      <div className="w-full">
      <Navbar/>

      <div className="w-full mt-12">
        {/* for mobile */}
        <div className="md:hidden w-full flex p-2 justify-between items-center gap-1">
          {/* input */}
          <div className="w-full relative">
            <input type="text" 
            className='w-full p-2 text-xs rounded-l-xl rounded-md focus:ring-2 focus:ring-blue-200 bg-slate-100 border-0 '
            placeholder='Search here..'/>
            <Search size={15}
            className='absolute right-2 h-full top-0'
            onChange={(e) => setfiltertype({...filtertype, searched: e.target.value})} />
          </div>
          {/* filter by */}
          <button className=" p-2 rounded-r-xl rounded-md bg-blue-300 text-white">
            <Filter size={15}/>
          </button>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default SearchItem