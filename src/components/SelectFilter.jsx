import React, { useContext, useState } from 'react'
import { ShopContext } from './ContextProvider'

const SelectFilter = () => {
  const {selCat, selcategory} = useContext(ShopContext)
  const cats = ['Men','Women','kids',"Appliances","Gadgets",'Office','Utensils','Games'];

  const [filtarr, setfiltarr] = useState([])

  async function filtSel(val) {
    if (val) {
      setfiltarr(cats.filter(pes => pes.toLowerCase().includes(val.toLowerCase())))
    } else {
      setfiltarr([])
    }
  }

  return (
    <>
      <div className="w-full absolute top-0 left-0 h-screen bg-white">
        {/* top */}
        <div className="w-full mt-10 px-3">
          <input type="text" 
          onChange={(e) => filtSel(e.target.value)}
          className='w-full  rounded-full border border-slate-200 focus:ring-2 focus:ring-purple-100'
          placeholder='Search' />
        </div>

         {filtarr.length == 0 ?
         <div className="grid grid-cols-3 mt-3 max-md:grid-cols-2 gap-2 w-full max-md:px-4 lg:max-w-1/2">
        {cats.map((item, e) => (
        <>
          <div
          onClick={() => selCat(item)}
          className={`p-1 py-3 text-sm border border-slate-400 rounded-full text-center hover:bg-slate-200 hover:border-b-4 duration-300 cursor-pointer ${selcategory == item && 'bg-slate-200'}`} key={e}>
            {item}
          </div>
        </>
      ))}
      </div>: 
      
      <div className="grid grid-cols-3 mt-3 max-md:grid-cols-2 gap-2 w-full max-md:px-4 lg:max-w-1/2">
        {filtarr.map((item, e) => (
        <>
          <div
          onClick={() => selCat(item)}
          className={`p-1 py-3 text-sm border border-slate-400 rounded-full text-center hover:bg-slate-200 hover:border-b-4 duration-300 cursor-pointer ${selcategory == item && 'bg-slate-200'}`} key={e}>
            {item}
          </div>
        </>
      ))}
      </div>}
      </div>
    </>
  )
}

export default SelectFilter