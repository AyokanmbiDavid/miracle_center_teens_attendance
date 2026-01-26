import { ShoppingCart, Trash, Trash2, TrashIcon } from "lucide-react"

export const ItemCard = ({id,src,title,price,desc,}) => {
  return (
    <>
      <div className="relative w-full md:max-w-[200px] p-2 hover:scale-[0.95] duration-300">
        <div className="relative w-full">
          <img  className="bg-slate-100 w-full h-[200px] rounded-xl border-0 " />
        <h1 className="absolute -bottom-2 left-0 p-2 rounded-full bg-purple-100 text-sm shadow-md">{title}</h1>
        </div>
        
        <div className="flex w-full mt-3 justify-between items-center">
          <h1 className=" text-sm pl-2">{price} naira</h1>

          {/* add to cart */}
          <button className="flex justify-center items-center gap-2 p-0.5 px-2 rounded-xl bg-green-100 border border-white hover:border hover:border-green-300 duration-300">
            <ShoppingCart size={12}/> +
          </button>
        </div>

        {/* description */}
        <span className=" p-2 max-w-full ">
          <h4 className="text-xs truncate rounded-md bg-slate-100 p-1 -mt-4">{desc}</h4>
        </span>
      </div>
    </>
  )
}

export const CartCard = ({id,src,title,price,desc,color}) => {
  return (
    <>
      <div className=" relative w-full p-2 mb-3 flex justify-between md:border-r md:border-slate-300">
        <div className="absolute right-0 -top-2 flex gap-2 items-center">
            {/* add or subtract */}
            <div className="flex items-center gap-1 p-0.5 border border-slate-400/80 rounded-full">
              {/* minus */}
              <button className="p-0.5 px-2 rounded-md rounded-l-xl text-xs bg-red-600 text-white">-</button>
              {/* plus */}
               <button className="p-0.5 px-2 rounded-md rounded-r-xl text-xs rounded-r-full bg-blue-600 text-white">+</button>
            </div>

            {/* delete */}
            <button 
            className="px-3 text-red-600">
              <Trash size={15}/>
            </button>
        </div>

        <div className="relative">
          {/* image */}
        <img className="w-[100px] h-[100px] bg-slate-100 rounded-2xl" />
        <h1 className="absolute rounded-full p-1 bg-purple-100 -right-3 -bottom-0.5 text-xs">{title}</h1>
        </div>
       
       {/* right hand */}
       <div className="flex flex-col justify-end items-end">
        <h1 className="">{price} naira</h1>
        <div className="mt-2">
          <div className={`w-5 h-5 rounded-full ${color == "red" ? 'bg-red-500' : color == "blue" ? 'bg-blue-500' : color == "black" ? 'bg-black' :  color == "yellow" ? "bg-yellow-500" : "bg-slate-400"}`}></div>
        </div>
       </div>
      </div>
    </>
  )
}