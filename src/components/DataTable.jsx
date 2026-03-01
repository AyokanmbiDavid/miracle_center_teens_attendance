import React, { useContext } from 'react'
import { all_provider } from './ContextProvider'

const DataTable = () => {
  const {alldata} = useContext(all_provider);

  return (
    <>
      <div className="w-full h-screen- overflow-y-auto flex justify-center items-start">
        <table className='md:w-2/3 max-md:w-full mt-3'>
        <tr>
          <th className='w-1/8 text-start p-2 text-xs border border-gray-200 bg-gray-100'>
            S/N
          </th>
          <th className='w-3/8 text-start p-2 text-xs border border-gray-200 bg-gray-100'>
            Name
          </th>
          <th className='w-2/8 text-start p-2 text-xs border border-gray-200'>
            Date of Birth
          </th>
          <th className='w-2/8 text-start p-2 text-xs border border-gray-200'>
            Phone Number
          </th>
        </tr>

        <tbody>
          {alldata.map((item, i) => (
            <tr >
               <td className='w-1/8 text-start p-2 text-xs border border-gray-200 '>
                {item.id}
              </td>
              <td className='w-3/8 text-start p-2 text-xs border border-gray-200 '>
                {item.title}
              </td>
              <td className='w-2/8 text-start p-2 text-xs border border-gray-200'>
                {item.date_of_birth}
              </td>
              <td className='w-2/8 text-start p-2 text-xs border border-gray-200'>
                {item.phone_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default DataTable