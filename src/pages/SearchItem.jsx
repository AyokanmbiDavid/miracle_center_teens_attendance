import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { Filter, Hand, Search } from 'lucide-react'
import { ShopContext } from '../components/ContextProvider'
import { ItemCard } from '../components/ItemCard'

const SearchItem = () => {
  const { confirmsearch,filtertype,setfiltertype,filtereditem,selSearch,all_product} = useContext(ShopContext);

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
            onChange={(e) => selSearch(e.target.value)}
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

       {/* fileted cards result */}
       {filtereditem.length != 0 ? 
       (
        <div className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {filtereditem.map((item, i) => (
          <ItemCard title={item.title} price={item.price} desc={item.description} />
        ))}
        </div>
       ) : filtertype.confirmSearch ? <>
        <div className="grid max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {all_product.map((item, ue) => <ItemCard title={item.title} price={item.price} desc={item.description} />)}
        </div>
        </> : filtereditem.length == 0 && confirmsearch != "" ? 
        <>
          <h1 className="text-red-500 text-center my-4">
            No Products found
          </h1>
        </> :  
        <></>}
      </div>
      
    </div>
    </>
  )
}

export default SearchItem