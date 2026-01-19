import { Home, Menu, MenuIcon, Search, ShoppingBag, ShoppingCart, Table, User } from 'lucide-react'
import React, { useContext } from 'react'
import { ShopContext } from './ContextProvider'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const navs= [
    {name:'Home', icon:<Home/>, link:'/'},
    {name:'Category', icon:<Table/>, link:'/category'},
    {name:'Cart', icon:<ShoppingBag/>, link:'/cart'},
  ]
  return (
    <>
      <div className="w-full p-2 fixed top-0 left-0 border-b-2 border-gray-300/70 flex justify-between px-3 bg-slate-100">
        {/* name */}
        <h1 className="text-lg font-semibold text-blue-700/70 flex justify-center items-center">
        <span className="max-md:hidden"> ShoppingCart </span>
          <ShoppingCart />
        </h1>

        {/* input */}
        <Link to={'/search'} className="relative max-md:hidden">
          <input type="text"
          className="p-3 text-xs border-0 rounded-full bg-white w-[300px] focus:ring-1 ring-blue-200"
          placeholder='Search here..' 
          autoComplete='name'/>

          <button className="absolute h-full right-0 px-3 cursor-pointer">
            <Search />
          </button>
        </Link>


        {/* navigation */}
        <div className="flex items-cente gap-2">
           {/* input for mobile */}
        <Link to={'/search'} className='md:hidden text-slate-800 flex h-full items-center'>
          <Search/>
        </Link>

          {navs.map((nav, i) => (
            <>
              <Link to={nav.link}
              className={`${location.pathname == nav.link ? 'text-blue-600' : 'text-slate-800/80'} ${nav.name != "Cart" && 'max-md:hidden'} p-2 px-3 rounded-full hover:bg-blue-200/80 duration-300 cursor-pointer relative`} key={i}>
                {nav.icon}

                {nav.name == 'Cart' && 
                <> 
                <span className="absolute p-1.5 top-1 right-2 bg-blue-400 rounded-full ring-2 ring-white"></span>
                </>}
              </Link>

              
            </>
          ))}

          {/* menu for mobile */}
          <button className="md:hidden">
            <MenuIcon />
          </button>

          {/* user account */}
          <Link to={'/profile'}
          className='p-2 rounded-full bg-slate-600 text-white relative max-md:hidden'>
            <User/>
            <span className="absolute right-0 bottom-0 p-1.5 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar