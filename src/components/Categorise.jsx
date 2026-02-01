import React, { useContext } from 'react'
import { ShopContext } from './ContextProvider'
import { Link } from 'react-router-dom'

const Categorise = () => {
   const {selCat, selcategory} = useContext(ShopContext)

  return (
    <>
      <div className="mt-2 bg-slate-100 p-2 flex items-center justify-center flex-col ">
      <h1 className="text-sm border-b p-2 border-slate-300">Select Category</h1>

      <div className="grid grid-cols-3 mt-3 max-md:grid-cols-2 gap-2 w-full max-md:px-4 lg:max-w-1/2">
        {['Men','Women','kids','Office','Utensils','Games'].map((item, e) => (
        <>
          <Link to={'/category'}
          onClick={() => selCat(item)}
          className="p-1 text-sm border border-slate-400 rounded-full text-center hover:bg-slate-200 hover:border-b-4 duration-300 cursor-pointer" key={e}>
            {item}
          </Link>
        </>
      ))}
      </div>
      </div>
    </>
  )
}

export default Categorise