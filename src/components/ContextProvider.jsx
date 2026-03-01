import React, { createContext, useEffect, useState } from 'react'

export const all_provider = createContext();

const ContextProvider = (children) => {
  const [search,setsearch] = useState()
   const [attendance,setattendance]=useState([
    {
      year: 2026,
      month: "january",
      week: "week 1",
      roll: [
        {
      id:1,
      title:"Ayomi Ademola",
      yes: true,
      no: false,
    },
     {
      id:2,
      title:"Debbi olawale",
      present: null,
    },
     {
      id:3,
      title:"Ini oluwatola",
      yes: true,
      no:false,
    },
      ]
    },
    {
      year: 2026,
      month: "january",
      week: "week 2",
      roll: [
        {
      id:1,
      title:"Ayomi Ademola",
      present: null,
    },
     {
      id:2,
      title:"Debbi olawale",
      present: null,
    },
     {
      id:3,
      title:"Ini oluwatola",
      present: null,
    },
      ]
    }
  ])  
  const [currentroll,setcurrentroll] = useState([])
  const [searchresult,setsearchresult] = useState([]);
  const [attendancedate, setattendancedate] = useState({
    year: 2026,
    month: "january",
    week: "week 1"
  })
  const [notifystatus,setnotifystatus] = useState({
    type: "success",
    message: "",
    show: false
  })

  // attendance array
  const [alldata,setdata] = useState([
   {
      id:1,
      title:"Abiodun M Iyanuoluwa",
      phone_number: 9024572602,
      date_of_birth: "12/3/09"
    },
     {
      id:2,
      title:"Adefesobi Emmaunuel",
      phone_number: 933212,
      date_of_birth: "12/3/09"
    },
     {
      id:3,
      title:"Adefesobi Nathaniel",
      phone_number: 933212,
      date_of_birth: "12/3/09"
    },
    
  ])
  // start loading
  async function startloading () {
    setnotifystatus({
      type: "loading",
      message: "Loading",
      show: true,
    })
  }

// stop loading
  async function stoploading () {
    setnotifystatus({
      type: "",
      message: "Loading",
      show: false,
    })
  }

  // search name
  async function searchname () {
    let resul = currentroll.roll.filter(prev => prev.title.toLowerCase().includes(search.toLowerCase()))

    setsearchresult(resul);
  }

  // add new member
  async function addnewmember (name,phone_number,date_of_birth) {
    if(name,phone_number,date_of_birth) {
      alldata.push({
      id: alldata.length + 1,
      title: name,
      phone_number: phone_number,
      date_of_birth: date_of_birth
    })
    }
  }

  // async funtion select another attendance
  async function selectattedance () {
    setcurrentroll(attendance.filter(att => attendancedate.year == att.year && attendancedate.month == att.month && attendancedate.week == att.week)[0] || []);
  }

  // set year
  async function setyear (val) {
    setattendancedate({...attendancedate, year: val})
    selectattedance()
  }

  // set month
  async function setmonth (val) {
    setattendancedate({...attendancedate, month: val})
    selectattedance()
  }

  // set week
  async function setweek (val) {
    setattendancedate({...attendancedate, week: val})
    selectattedance()
  }

  // detect change in input value
  useEffect(() => {
    searchname()
  }, [search])

  
  useEffect(() => {
    selectattedance()
    
  }, [attendancedate])
  
  // mark attendance 
    async function markattendance(obj) {
      startloading()
      setcurrentroll({...currentroll, roll: currentroll.roll.map((content) => content.id == obj ? 
    {...content,present : content.present == true? false : true} : content
      )})

    let sortRoll = attendance.find(pre => pre.year == currentroll.year && pre.month == currentroll.month && pre.week == currentroll.week)
    attendance.splice(sortRoll)
    setattendance([...attendance, currentroll]);
    stoploading()
  }

  // notify
  async function Notify (type,message) {
      setnotifystatus({type:type,
        message: message,
        show: true
      })

      if(notifystatus.type != "loading"){
        setTimeout(() => {
          setnotifystatus({...notifystatus, show: false})
        }, 3000);
      }
  }

  // close notification
  async function closenotify() {
    setnotifystatus({types: null,show: false})
  }

  async function createattendance(year,month,week) {
    if(!year || !month || !week) {
      Notify("failure","set all values properly")
    } else {
      startloading()
      let newType = {
        year:year,
        month: month,
        week:week,
        roll: [],
      }
      
      
      for (let i = 0; i < alldata.length; i++) {
        let sub = alldata[i]
        let newsub = {
          id:i,
          title: sub.title,
          present: null,
        }
        newType.roll.push(newsub)
      }

      let checkExist = attendance.find(e => e.year == year && e.month == month && e.week == week) 
      if (checkExist) {
          stoploading()
          Notify("failure","Attendance already exists")
        } else {
          attendance.push(newType)
          stoploading()
          Notify("success","New Attendance created")
        }
    }
    
  }

  return (
    <all_provider.Provider value={{alldata,attendance,currentroll,markattendance,setsearch,searchresult,search,setyear,setmonth,setweek,addnewmember,Notify,notifystatus, closenotify,createattendance}}>
        {children.children}
      </all_provider.Provider>
  )
}

export default ContextProvider