import React, { createContext, useEffect, useState } from 'react'

export const all_provider = createContext();

const ContextProvider = (children) => {
  const [search,setsearch] = useState()
   const [attendance,setattendance]=useState([
    {
      id:1,
      title:"Ayomi Ademola",
      yes: true,
      no: false,
    },
     {
      id:2,
      title:"Debbi olawale",
      yes: false,
      no: true,
    },
     {
      id:3,
      title:"Ini oluwatola",
      yes: true,
      no:false,
    },
  ])
  const [searchresult,setsearchresult] = useState([]);

  async function searchname () {
    let resul = attendance.filter(prev => prev.title.toLowerCase().includes(search.toLowerCase()))

    setsearchresult(resul);
    console.log(resul);
  }

  useEffect(() => {
    searchname()
  }, [search])
  

    async function markattendance(obj,type) {
      setattendance(prev => prev.map((content) => content.id == obj ? 
    {...content, yes: type == "yes" ? true : false, no: type == 'no' ? true : false} : content
  ))
  
    }

  return (
    <all_provider.Provider value={{attendance,markattendance,setsearch,searchresult,search}}>
        {children.children}
      </all_provider.Provider>
  )
}

export default ContextProvider