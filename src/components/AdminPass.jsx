import { Eye } from 'lucide-react'
import React, { useState } from 'react'

const AdminPass = () => {
   const [passtype,setpasstype] = useState('password')
    const [passvalue, setpassvalue] = useState('');
    const [showPassCheck, setShowPassCheck] = useState(true)
  
    async function checkPass(e) {
      e.preventDefault();
  
      if(passvalue) {
        if (passvalue == 'teens') {
          setShowPassCheck(false)
        } else {
          alert ('hey wetin you dey find for here..')
          setpassvalue('')
        }
      } else {
        alert('please are you an admin..')
      }
    }
    return (
      <>
       {showPassCheck && 
        <div className="w-full absolute top-0 h-screen bg-white flex justify-center items-center">
  
            {/* form for pass */}
            <form
            onSubmit={(e) => checkPass(e)}
            className="p-2 border border-gray-100 rounded-md max-md:-mt-20">
              <h1 className="text-sm text-center">
                Enter Passkey to access Admin page
              </h1>
              <div className="relative mt-5 w-full bg-gray-100 rounded-xl ">
                <input type={passtype}
                placeholder='Enter passkey... ' 
                onChange={(e) => setpassvalue(e.target.value)}
                className='text-xs w-full p-3 bg-gray-100 rounded-xl border-0 focus:ring-1 focus:ring-blue-200'/>
                <div className="absolute top-0 right-5 h-full flex justify-center items-center"
                onClick={() => setpasstype(prev => prev == 'password' ? 'text' : 'password')}>
                  <Eye size={17} />
                </div>
              </div>
  
                <button className="w-full mt-5 rounded-xl p-3 bg-green-600 text-white text-xs" >
                  Enter
                </button>
            </form>
        </div>}
      </>
    )
}

export default AdminPass