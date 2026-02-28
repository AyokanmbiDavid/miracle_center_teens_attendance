import React from 'react'

const Table = () => {
  return (
    <>
      <div className="w-full">
        <table className='border-collapse w-full'>
          <tr>
            <th className='w-1/10 text-start border border-gray-200 p-2 text-sm'>ID</th>
            <th className='w-2/5 text-start border border-gray-200 p-2 bg-gray-100 text-sm'>Name</th>
            <th className='w-1/7 text-start border border-gray-200 p-2 text-sm'>Present</th>
            <th className='w-1/7 text-start border border-gray-200 p-2 text-sm'>Absent</th>
          </tr>

          <tbody>
            <tr>
              <td className='text-xs p-2 pl-4'>1</td>
              <td className='text-xs p-2 pl-4'>Ayo Ademolaa</td>
              <td className='text-xs p-2 pl-4'>Yes</td>
              <td className='text-xs p-2 pl-4'>-</td>
            </tr>

            <tr>
              <td className='text-xs p-2 pl-4'>1</td>
              <td className='text-xs p-2 pl-4'>Ayo Ademolaa</td>
              <td className='text-xs p-2 pl-4'>Yes</td>
              <td className='text-xs p-2 pl-4'>-</td>
            </tr>

            <tr>
              <td className='text-xs p-2 pl-4'>1</td>
              <td className='text-xs p-2 pl-4'>Ayo Ademolaa</td>
              <td className='text-xs p-2 pl-4'>Yes</td>
              <td className='text-xs p-2 pl-4'>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table