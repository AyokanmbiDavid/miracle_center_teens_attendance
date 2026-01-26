import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { ShopContext } from '../components/ContextProvider'
import { CardSim, ShoppingBasket } from 'lucide-react';
import { CartCard } from '../components/ItemCard';

const Cart = () => {
    const {cart_items} = useContext(ShopContext);

  return (
    <>
      <div className="w-full">
        <Navbar/>

        <div className="w-full mt-12">
          <h1 className=" p-2 border-b border-slate-200">Cart</h1>
        </div>

        {/* no cart item */}
        {cart_items.length == 0 && (
          <>
            <div className="w-full text-purle-700 py-3 text-center flex justify-center items-center">
                No cart Item
            </div>
          </>
        )}

        {/* cart items-display */}
        <div className="grid max-md:grid-cols-1 md:grid-cols-2">
          {cart_items.map((item, i) => (
              <>
                <CartCard title={item.title} price={item.price} color={item.color}/>
              </>
          ))}
        </div>

        {cart_items.length != 0 && <>
          <div className="w-full flex justify-center items-center my-3">
            <button className=" flex gap-1 items-center">
              <span className="text-xs text-white rounded-md rounded-l-xl bg-green-600 p-2 px-4">Checkout</span>
              <span className='text-green-700 bg-green-200 rounded-md rounded-r-xl p-2'>
                  <ShoppingBasket 
                    size={15}/>
              </span>
              
            </button>
          </div> 
        </>}
      </div>
    </>
  )
}

export default Cart