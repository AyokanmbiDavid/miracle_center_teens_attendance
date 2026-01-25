import React, { useEffect, useMemo, useState } from 'react'
import { createContext } from 'react'
import API from '../api/axios';
import { all_product } from './Exporting';
import { useLocation } from 'react-router-dom';

export const ShopContext = createContext();

const ContextProvider = ({children}) => {
  const [filtertype, setfiltertype] = useState({
    searched: '',
    confirmsearch:'',
    price: 0,
  });
  const [filtereditem, setfiltereditem] = useState([]);
  const [similaritem, setsimilaritem] = useState([])

  // filter simliar name 
  useEffect(() => {
    let filtersimilar = all_product.filter(item => {
      item.title.toLowerCase().includes(filtertype.searched.toLowerCase())
    });
    setsimilaritem(filtersimilar)
  }, [filtertype.searched])
  
  // filter searched items
  useEffect(() => {
    let matchfiltered = all_product.filter(item => {
      const matchfiltered = item.title.toLowerCase().includes(filtertype.confirmsearch.toLowerCase());
      const matchprice = item.price > filtertype.price

      return matchfiltered && matchprice;
    })

    setfiltereditem(matchfiltered)
    console.log(filtereditem);
    
  }, [filtertype.confirmsearch])
  

  return (
  <ShopContext.Provider value={{all_product, filtertype, setfiltertype, filtereditem, similaritem}}>
    {children}
    </ShopContext.Provider>
  )
}

export default ContextProvider