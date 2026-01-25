import React, { useState } from 'react'

const Sidebar = () => {
  const [currentside,setcurrentside] = useState('Appliances')
  const sides = [
    {name: 'Appliances',set:""},
    {name: 'Utensils',set:""},
    {name: 'Gadgets',set:""},
    {name: 'Toy',set:""},
    {name: 'Sport',set:""},
  ]
  return (
    <>
      <div className="max-md:hidden bg-slate-100 sticky top-20  w-[250px] border-r-2 border-slate-200 max-md:w-[170px]">
        <div className="flex flex-col w-full">
          {sides.map((side, i) => (
            <>
              <div className={`w-full p-2 cursor-pointer hover:bg-white duration-300 ${currentside == side.name && 'bg-white border-r-white border-slate-200 relative'}`} 
              onClick={() => setcurrentside(side.name)}
              key={i}>
                <span className="text-slate-700 text-xs pl-3">
                  {side.name}
                </span>
                
                {currentside == side.name && 
                <>
                  <div className="absolute top-0 left-2 h-full  py-1 flex justify-center items-center">
                    <span className="h-full rounded-full bg-blue-600 w-1 p-0.5"></span>
                  </div>
                </>}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar