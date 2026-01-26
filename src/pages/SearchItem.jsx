import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Filter, Hand, Search } from 'lucide-react'
import { ShopContext } from '../components/ContextProvider'
import { ItemCard } from '../components/ItemCard'

const SearchItem = () => {
  const { setfiltertype,similaritem,filtereditem,filtsimilar,selSearch} = useContext(ShopContext);

  let searchval;
  

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
            onChange={(e) => {filtsimilar(e.target.value); searchval = e.target.value}}
            onClick={(e) => filtsimilar(e.target.value)}
            className='w-full p-2 text-xs rounded-l-xl rounded-md focus:ring-2 focus:ring-blue-200 bg-slate-100 border-0 '
            placeholder='Search here..'/>
            <Search size={15}
            className='absolute right-2 h-full top-0'
             />
          </div>
          {/* filter by */}
          <button className=" p-2 rounded-r-xl rounded-md bg-blue-300 text-white">
            <Filter size={15}/>
          </button>
        </div>

       {similaritem.length != 0 && 
       <>
        {/* search result */}
        <div className="w-full h-screen  bg-green-100 flex flex-col overflow-x-auto">
          {similaritem.map((item, i) => (
            <>
              <div 
              onClick={() => selSearch(item.title)}
              className="w-full border-b border-green-200 p-2 flex justify-between items-center">
                  {item.title}
                  <Hand size={15} className='text-purple-700' />
              </div>
            </>
          ))}
        </div>
       </>}

       {/* fileted cards result */}
       {filtereditem.length != 0 && 
       (
        <div className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filtereditem.map((item, i) => (
          <ItemCard title={item.title} price={item.price} desc={item.description} />
        ))}
        </div>
       )}
      </div>
      
    </div>
    </>
  )
}

export default SearchItem