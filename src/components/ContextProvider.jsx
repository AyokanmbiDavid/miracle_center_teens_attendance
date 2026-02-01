import React, { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import API from '../api/axios';
import { all_product, cart_items } from './Exporting';
import { useLocation } from 'react-router-dom';

export const ShopContext = createContext();

const ContextProvider = ({children}) => {
  const [userdata, setuserdata] = useState(JSON.parse(localStorage.getItem("staggerUser")))
  const [selcategory,setselcategory] = useState('')
  // for notification
  const [err, seterr] = useState();

  // cancel notification 
  async function cancelErr () {
    seterr();
  }

  // select category
  async function selCat(val) {
    setselcategory(prev => prev == val ? '' : val)
  }

  // set notification
  async function notify(type,message){
    seterr({type:type, message:message})
  }

  // filtertype
  const [filtertype, setfiltertype] = useState({
    confirmsearch:'',
  });
  const [filtereditem, setfiltereditem] = useState([]);


  useEffect(() => {
    console.log(filtereditem);
    
  }, [])
  
  // filter searched items
  async function selSearch (val) {
    setfiltereditem([])
    setfiltertype({...filtertype, confirmsearch: val})
      setfiltereditem(all_product.filter(item => val  &&
      item.title.toLowerCase().includes(val.toLowerCase())
        ))
  }
    
    

  return (
  <ShopContext.Provider value={{all_product, filtertype, setfiltertype, filtereditem,err,cancelErr,notify,userdata,selSearch,cart_items,selcategory,selCat}}>
    {children}
    </ShopContext.Provider>
  )
}

export default ContextProvider