import { Home, Key, Menu, User } from 'lucide-react'
import React, { useState } from 'react'
import {motion} from "framer-motion"
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [sidebar,setsidebar]=useState(false)
  const menus = [
    {name:"Dashboard", icon:<Home className='text-blue-800' size={16}/>,link:'/'},
    {name:"Complain", icon:<User className='text-blue-800' size={16}/>, link:'/complain'},
    {name:"Admin", icon:<Key className='text-blue-800' size={16}/>, link:'/admin'},
  ]
  const location = useLocation().pathname
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-50 p-3 bg-white border border-gray-200 flex justify-between items-center">
          {/* menu */}
          <div 
           onClick={() => setsidebar(!sidebar)}
          className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer duration-200 ">
            <Menu size={16} 
            className='text-gray-700/70'/>
          </div>

          <h1 className="font-semibold text-lg">
            Teens Attendance
          </h1>

          {/* Admin login */}
          <Link to={'./admin'} className="bg-blue-500 p-2 px-3 text-xs text-white rounded-xl flex justify-between items-center gap-3 cursor-pointer hover:bg-blue-600 duration-200">
            <span  className='max-md:hidden'>Admin Login</span>
            <Key size={16} className='rotate-[40deg]'/>
          </Link>
      </div>

      {/* sidebar */}
      {sidebar && 
      <div className="fixed w-full h-screen z-40 top-4 bg-gray-200/60 left-0">
          <motion.div 
          initial={{x:-100}}
          animate={{x:0}}
          className="p-2 pl-4 border-r border-gray-200 bg-white h-screen w-[250px] mt-10">
            <span className="text-sm font-semibold text-gray-500">MENU</span>

            {/* menus */}
            <div className="h-screen w-full flex flex-col mt-2">
             {menus.map((item,i) => (
              <>
                 <Link to={item.link}
                  className={`w-full flex justify-start p-2 py-3 rounded-md ${location == item.link && 'bg-blue-200' } items-center gap-3`}>
                {item.icon}
                <span className={`${location == item.link && 'text-blue-600'} text-xs font-semibold`}>{item.name}</span>
              </Link>
              </>
             ))}
            </div>
          </motion.div>
      </div>}
    </>
  )
}

export default Navbar