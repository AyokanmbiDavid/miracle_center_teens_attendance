import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import API from '../api/axios';
import { all_product } from './Exporting';
import { useLocation } from 'react-router-dom';

export const ShopContext = createContext();

const ContextProvider = ({children}) => {
  

  return (
  <ShopContext.Provider value={{all_product}}>
    {children}
    </ShopContext.Provider>
  )
}

export default ContextProvider