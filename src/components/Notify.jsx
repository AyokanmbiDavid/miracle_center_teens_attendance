import { X } from 'lucide-react'
import React, { useContext } from 'react'
import {motion} from "framer-motion"
import { all_provider } from './ContextProvider'

const Notify = () => {
  const {notifystatus,closenotify} = useContext(all_provider)
  return (
    <>  
      <div className="flex items-center gap-3">
        {notifystatus.type == "success" ?
        <motion.div 
          initial={{x:400}}
          animate={{x:0}}
          className="w-full fixed top-0 flex justify-end items-center  right-0 p-3 z-50">
          <div className={`bg-green-500 shadow-md p-3 min-w-[200px] text-white flex items-center justify-between gap-3`}>
            <h1 className="text-md">
              {notifystatus.message}
            </h1>

            <X size={17} 
            onClick={() => closenotify()}
            className='cursor-pointer'/>
          </div>
        </motion.div> : 
        <motion.div 
          initial={{x:400}}
          animate={{x:0}}
          className="w-full fixed top-0 flex justify-end items-center  right-0 p-3 z-50">
          <div className={`bg-red-500 shadow-md p-3 min-w-[200px] text-white flex items-center justify-between gap-3`}>
            <h1 className="text-md">
              {notifystatus.message}
            </h1>

            <X size={17} 
            onClick={() => closenotify()}
            className='cursor-pointer'/>
          </div>
        </motion.div>
        }

        {notifystatus.type == "loading" && 
        <motion.div 
      initial={{x:400}}
      animate={{x:0}}
      className="w-full fixed top-0 flex justify-end items-center  right-0 p-3 z-50">
          <div className={`bg-green-500 shadow-md p-3 min-w-[200px] text-white flex items-center justify-between gap-3`}>
            <h1 className="text-md">
              Loading
            </h1>

            <X size={17} 
            onClick={() => closenotify()}
            className='cursor-pointer'/>
          </div>
      </motion.div>}
      </div>
       </>
  )
}

export default Notify