import React, { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import API from '../api/axios';
import { all_product } from './Exporting';
import { useLocation } from 'react-router-dom';

export const ShopContext = createContext();

const ContextProvider = ({children}) => {
  const [userdata, setuserdata] = useState(JSON.parse(localStorage.getItem("staggerUser")))
  // for notification
  const [err, seterr] = useState();

  // cancel notification 
  async function cancelErr () {
    seterr();
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
  const [similaritem, setsimilaritem] = useState([])


  // filter simliar name 
  async function filtsimilar (val) {
     let filtersimilar = all_product.filter(item => val &&
      item.title.toLowerCase().includes(val.toLowerCase()));
    setsimilaritem(filtersimilar);
    
  }
   
  
  // filter searched items
  async function selSearch (val) {
    setfiltertype({...filtertype, confirmsearch: val})
    setfiltereditem([])
    const matchfiltered = all_product.filter(item => filtertype.confirmsearch &&
      item.title.toLowerCase().includes(val.toLowerCase())
        )
      setsimilaritem([])
      setfiltereditem(matchfiltered)
  }
    
    

  return (
  <ShopContext.Provider value={{all_product, filtertype, setfiltertype, filtereditem, similaritem,err,cancelErr,notify,userdata,filtsimilar,selSearch}}>
    {children}
    </ShopContext.Provider>
  )
}

export default ContextProvider