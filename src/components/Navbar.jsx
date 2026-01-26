import { Home, Menu, MenuIcon, Search, ShoppingBag, ShoppingCart, Table, User } from 'lucide-react'
import React, { useContext } from 'react'
import { ShopContext } from './ContextProvider'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const {filtertype,setfiltertype,filtsimilar} = useContext(ShopContext)
  const navs= [
    {name:'Home', icon:<Home size={17}/>, link:'/'},
    {name:'Category', icon:<Table size={17}/>, link:'/category'},
    {name:'Cart', icon:<ShoppingBag size={17}/>, link:'/cart'},
  ]

  // setInterval(() => {
  //   console.log(filtertype.searched);
    
  // }, 2000)
  return (
    <>
      <div className="w-full p-2 fixed z-30 top-0 left-0 border-b-2 border-gray-300/70 flex justify-between px-3 bg-slate-100">
        {/* name */}
        <h1 className="text-lg font-semibold text-blue-700/70 flex justify-center items-center">
        <Link to={'/'} className="max-md:hidden"> ShoppingCart </Link>
          <ShoppingCart />
        </h1>

        {/* input */}
        <Link to={'/search'} className="relative max-md:hidden">
          <input type="text"
          className="p-2 text-xs border-0 rounded-full bg-white w-[300px] focus:ring-1 ring-blue-200"
          placeholder='Search here..' 
          autoComplete='name'
          onChange={(e) => filtsimilar(e.target.value)}/>

          <button className="absolute h-full right-0 px-3 cursor-pointer">
            <Search size={15}/>
          </button>
        </Link>


        {/* navigation */}
        <div className="flex items-cente gap-2">
           {/* input for mobile */}
        <Link to={'/search'} className='md:hidden text-slate-800 flex h-full items-center'>
          <Search size={17}/>
        </Link>

          {navs.map((nav, i) => (
            <>
              <Link to={nav.link} key={i}
              className={`${location.pathname == nav.link ? 'text-blue-600' : 'text-slate-800/80'} ${nav.name != "Cart" && 'max-md:hidden'} p-2 px-3 rounded-full hover:bg-blue-200/80 duration-300 cursor-pointer relative`}>
                {nav.icon}

                {nav.name == 'Cart' && 
                <> 
                <span className="absolute p-1 top-1 right-2 bg-blue-400 rounded-full ring-2 ring-white"></span>
                </>}
              </Link>

              
            </>
          ))}

          {/* user account */}
          <Link to={'/profile'}
          className='h-7 w-7 flex justify-center items-center rounded-full bg-slate-600 text-white relative max-md:hidden'>
            <User size={17}/>
            <span className="absolute right-0 bottom-0 p-1 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
        </div>
      </div>

      {/* for mobile */}
      <div className="md:hidden fixed bottom-0 w-full left-0 z-50 p-2 bg-slate-100 flex justify-around items-center border-t-2 border-slate-200">
        {navs.map((navlink, i) => navlink.name != "Cart" && (
          <>
            <Link to={navlink.link}
             className={`${location.pathname == navlink.link ? 'text-blue-600' : ''}`} key={i}>
                {navlink.icon}
            </Link>
          </>
        ))}

        {/* user account */}
          <Link to={'/profile'}
          className='h-7 w-7 flex justify-center items-center rounded-full bg-slate-600 text-white relative'>
            <User size={17}/>
            <span className="absolute right-0 bottom-0 p-1 bg-red-600 rounded-full ring-2 ring-white"></span>
          </Link>
      </div>
    </>
  )
}

export default Navbar