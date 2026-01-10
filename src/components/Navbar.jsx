import { DoorOpenIcon, EditIcon, ImageIcon, MessageCircleIcon, Plus, UserIcon, Users2,} from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChatContext } from './ContextProvider'

const Navbar = () => {
  const [profiledrop, setprofileDrop] = useState(false)
  const Menus = [
    {name:'Chats',link:"/",icon: <MessageCircleIcon className='w-4' />},
    {name:'Groups',link:"",icon: <Users2 className='w-4' />},
    {name:'Add', link:"",icon:<Plus className='w-4' />},
    {name:'Account',link:"/account",icon: <UserIcon className='w-4' />},
  ]
  const {user} = useContext(ChatContext);

  const navigate = useNavigate()

  const location = useLocation()

  async function Logout () {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate('/login')
    }, 500);
  }

  return (
    <>
      {/* for mobile view */}
      <div className="md:hidden w-full absolute left-0 z-50 bottom-0 bg-white border-t-2 border-slate-200">
        <div className="w-full p-2 flex justify-around">
          {Menus.map((li, i) => (
            <>
              <Link to={li.link} className='relative'>
                <div className={`p-1 rounded-full border-2 ${location.pathname == li.link ? ' border-gray-200 px-3 text-green-600' : 'border-white'}`}
                 >
                  {li.icon}
                </div>
              </Link>
            </>
          ))}
          
        </div>
        
      </div>



      {/* for dektop view */}
      <div className="max-md:hidden flex flex-col gap-3 p-2 h-screen border-2 bg-white border-gray-200">
           {Menus.map((li, i) => (
            <>
              <Link to={li.link} className='relative'>
                <div className={` p-3 py-2 rounded-2xl border-2 hover:bg-green-100 duration-200 ${location.pathname == li.link ? ' text-green-600  border-green-300' : 'border-white'}`}
                >
                  {li.icon}
                </div>
              </Link>
            </>
          ))}
      </div>
    </>
  )
}

export default Navbar