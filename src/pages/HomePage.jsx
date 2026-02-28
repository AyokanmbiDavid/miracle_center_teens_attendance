import { Search } from 'lucide-react'
import React, { useContext } from 'react'
import Table from '../components/Table'
import { all_provider } from '../components/ContextProvider'

const HomePage = () => {
  const {setsearch} = useContext(all_provider)
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="sticky top-15 w-full flex max-md:flex-col justify-around py-2 bg-white">
      {/* input */}
          <div className="relative w-2/3 max-md:w-full">
            <input type="text"
            placeholder='Type in a name...'
            onChange={(e) => setsearch(e.target.value)}
            className='text-xs rounded-md border w-full py-3 border-gray-200 bg-gray-100 focus:ring-1 focus:ring-blue-200' />
            <Search 
            className='absolute right-4 h-full top-0 '
            size={16}/>
          </div>

          {/* selects */}
          <div className="flex justify-around items-center max-md:mt-2">
            {/* for year */}
          <div className="flex justify-center gap-2 items-center">
            <span className="text-sm">Year</span>
          <select name="" 
          className='border border-gray-200 rounded-md text-xs py-3 focus:ring-0'>
            <option value="">2026</option>
            <option value="">2025</option>
            <option value="">2024</option>
          </select>
          </div>

          {/* for month */}
          <div className="flex justify-center gap-2 items-center">
            <span className="text-sm">Month</span>
          <select name="" 
          className='border border-gray-200 rounded-md text-xs py-3 focus:ring-0'>
            <option value="">March</option>
            <option value="">February</option>
            <option value="">January</option>
          </select>
          </div>
          </div>
        </div>
          
          <Table/>

      </div>
    </>
  )
}

export default HomePage