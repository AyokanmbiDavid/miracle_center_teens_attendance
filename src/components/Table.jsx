import React, { useContext } from 'react'
import { all_provider } from './ContextProvider'

const Table = () => {
  const {currentroll,markattendance,searchresult,search} = useContext(all_provider)
  
  return (
    <>
      <div className="w-full">
        <table className='border-collapse w-full'>
          <tr>
            <th className='w-1/20 text-start border border-gray-200 p-2 text-sm'>ID</th>
            <th className='w-2/5 text-start border border-gray-200 p-2 bg-gray-100 text-sm'>Name</th>
            <th className='w-1/7 text-start border border-gray-200 p-2 text-sm'>Present</th>
            <th className='w-1/7 text-start border border-gray-200 p-2 text-sm'>Absent</th>
          </tr>

          <tbody>
           {!search ?
           <>
              {currentroll.length != 0 &&
                <>
                  {currentroll.roll.map((item, i)=> (
                    <>
                        <tr>
                          <td className='text-xs p-2 pl-4'>{item.id}</td>
                          <td className='text-xs p-2 pl-4'>{item.title}</td>
                          <td className='text-xs p-2 pl-4'>
                            <input type="radio"
                            name={item.title} 
                            defaultChecked={item.present == true}
                            onClick={() => markattendance(item.id)} /></td>
                          <td className='text-xs p-2 pl-4'>
                          <input type="radio" 
                          name={item.title} 
                          defaultChecked={item.present == false}
                          onClick={() => markattendance(item.id)}/></td>
                        </tr>
                    </>
                  )) }
                </> 
            }
           </>
            :
            <> {searchresult.map((item,i) => (
            <>
                 <tr>
              <td className='text-xs p-2 pl-4'>{item.id}</td>
              <td className='text-xs p-2 pl-4'>{item.title}</td>
             <td className='text-xs p-2 pl-4'
              onClick={() => markattendance(item.id,"yes")}>
                <input type="radio" name={item.title} /></td>
              <td className='text-xs p-2 pl-4'
              onClick={() => markattendance(item.id,"no")}>
               <input type="radio" name={item.title}/></td>
            </tr>
            </>
          ))}
          </>
            }
          </tbody>
        </table>
        
            {/* attendance error */}
            {currentroll.length == 0 && 
                <> 
                  <div className="w-full py-4 text-center text-orange-700">
                      The attendance that existed on this date was not taking
                  </div>
                </>}

            {/* serach value error */}
           {searchresult.length == 0 && search &&
            <>
              <div className="w-full py-4 text-sm text-center text-red-700 font-semibold">
                Sorry the person is not a member
              </div>
            </>}
          
      </div>
    </>
  )
}

export default Table