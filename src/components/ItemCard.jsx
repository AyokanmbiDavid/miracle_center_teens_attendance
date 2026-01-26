import { ShoppingCart } from "lucide-react"

export const ItemCard = ({title,price,desc,}) => {
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