import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const all_provider = createContext();

const ContextProvider = ({ children }) => {
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);

  // Persistence with localStorage - Real Miracle Centre Data
  const [alldata, setalldata] = useLocalStorage('members', [
    { id: 1, title: "Abiodun M Iyanuoluwa", date_of_birth: "01-10-2009", phone_number: "0803989972" },
    { id: 2, title: "Adefesobi Emmanuel", date_of_birth: "", phone_number: "" },
    { id: 3, title: "Adefobi Nathaniel", date_of_birth: "21-09-2007", phone_number: "09018535677" },
    { id: 4, title: "Adebayo Emmanuella", date_of_birth: "30-11-2008", phone_number: "08069769519" },
    { id: 5, title: "Adebayo Louis", date_of_birth: "27-08-2011", phone_number: "080823011321" },
    { id: 6, title: "Adebeshin Doyin", date_of_birth: "14-06-2009", phone_number: "08125679273" },
    { id: 7, title: "Ajadi Kehinde", date_of_birth: "9-05-2011", phone_number: "07033198604" },
    { id: 8, title: "Ajadi Taiwo", date_of_birth: "9-05-2011", phone_number: "07033198604" },
    { id: 9, title: "Amos Erioluwa", date_of_birth: "30-05-2009", phone_number: "09119030521" },
    { id: 10, title: "Aina Felicia", date_of_birth: "7-6-2009", phone_number: "07033198604" },
    { id: 11, title: "Akintola Comfort", date_of_birth: "4-27-2012", phone_number: "" },
    { id: 12, title: "Akinseye Kehinde", date_of_birth: "28-01-2010", phone_number: "08083301243" },
    { id: 13, title: "Akinseye Taiwo", date_of_birth: "28-01-2010", phone_number: "08022285545" },
    { id: 14, title: "Alongside Tomisin", date_of_birth: "3-05-2012", phone_number: "08023552901" },
    { id: 15, title: "Aro Oyinkansola", date_of_birth: "13-10", phone_number: "09137805830" },
    { id: 16, title: "Ayokanmbi Emmanuella", date_of_birth: "10-09-2010", phone_number: "09129507070" },
    { id: 17, title: "Ayokanmbi David", date_of_birth: "24-2-2009", phone_number: "09024572602" },
    { id: 18, title: "Ikotun Boluwatife", date_of_birth: "19-9-2010", phone_number: "08023776886" },
    { id: 19, title: "Imis", date_of_birth: "07-01-2012", phone_number: "080279621617" },
    { id: 20, title: "Jimi Adefaramola", date_of_birth: "31-10-2009", phone_number: "08140746327" },
    { id: 21, title: "John Deborah", date_of_birth: "6-05-2007", phone_number: "08121930162" },
    { id: 22, title: "Lawal Temiloluwa", date_of_birth: "6-28-2010", phone_number: "07012800340" },
    { id: 23, title: "Lawal Toluwalase", date_of_birth: "7-18-2012", phone_number: "07012800340" },
    { id: 24, title: "Majiyagbe Tolulope", date_of_birth: "16-10-2010", phone_number: "08150568252" },
    { id: 25, title: "Majiyagbe Dorcas", date_of_birth: "12-08-2007", phone_number: "09127847352" },
    { id: 26, title: "Olibamoyo Tobiloba", date_of_birth: "23-10-2011", phone_number: "0813884291" },
    { id: 27, title: "Olujomoye Micheal", date_of_birth: "05-11-2008", phone_number: "09163769214" },
    { id: 28, title: "Olujomoye Emmanuel", date_of_birth: "5-25-2010", phone_number: "09047245871" },
    { id: 29, title: "Oni Samuel", date_of_birth: "01-08-2011", phone_number: "09110377152" },
    { id: 30, title: "Olayinka Mercy", date_of_birth: "8-03-2010", phone_number: "" },
    { id: 31, title: "Olaoluwa Promise", date_of_birth: "10-04-2007", phone_number: "07019347676" },
    { id: 32, title: "Olasegha Olamide Isreal", date_of_birth: "03-21-2012", phone_number: "09152397158" },
    { id: 33, title: "Sunday Yemisi", date_of_birth: "25-12-2003", phone_number: "08126399271" },
    { id: 34, title: "Shoremekun Omoteniola", date_of_birth: "19-10", phone_number: "0810544279" },
    { id: 35, title: "Christine Darasimi", date_of_birth: "14-01-2012", phone_number: "080279621617" },
    { id: 36, title: "Yusuf Ayomide", date_of_birth: "22-9-2007", phone_number: "09127847352" }
  ]);

  const [attendance, setattendance] = useLocalStorage('attendance', []);

  const [currentroll, setcurrentroll] = useState({ roll: [] });
  const [attendancedate, setattendancedate] = useState({
    year: 2026,
    month: "january",
    week: "week 1"
  });

  const [notifystatus, setnotifystatus] = useState({
    type: "",
    message: "",
    show: false
  });

  // --- Effects ---

  // Search Effect
  useEffect(() => {
    if (!currentroll?.roll) return;
    const result = currentroll.roll.filter(prev =>
      prev.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(result);
  }, [search, currentroll]);

  // Select current attendance when date changes
  useEffect(() => {
    const found = attendance.find(att =>
      String(att.year) === String(attendancedate.year) &&
      att.month === attendancedate.month &&
      att.week === attendancedate.week
    );
    setcurrentroll(found || { roll: [] });
  }, [attendancedate, attendance]);

  // --- Functions ---

  const Notify = (type, message) => {
    setnotifystatus({ type, message, show: true });
    if (type !== "loading") {
      setTimeout(() => {
        setnotifystatus({ type: "", message: "", show: false });
      }, 3000);
    }
  };

  const closenotify = () => setnotifystatus({ type: "", message: "", show: false });

  const addnewmember = (name, phone_number, date_of_birth) => {
    if (!name || !phone_number) return;
    setalldata(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(m => m.id)) : 0;
      return [...prev, {
        id: maxId + 1,
        title: name,
        phone_number: phone_number,
        date_of_birth: date_of_birth
      }];
    });
  };

  const deletemember = (id) => {
    setalldata(prev => prev.filter(member => member.id !== id));
    setattendance(prevAttendance => prevAttendance.map(att => ({
      ...att,
      roll: att.roll.filter(person => person.id !== id)
    })));
    Notify("success", "Member removed successfully");
  };

  const updatemember = (id, updatedName, updatedPhone, updatedDOB) => {
    setalldata(prev => prev.map(member =>
      member.id === id
        ? { ...member, title: updatedName, phone_number: updatedPhone, date_of_birth: updatedDOB }
        : member
    ));
    Notify("success", "Member details updated");
  };

  const createattendance = (year, month, week) => {
    if (!year || !month || !week) {
      Notify("failure", "Set all values properly");
      return;
    }

    const formattedMonth = month.toLowerCase();
    const formattedWeek = week.toLowerCase();

    const exists = attendance.some(e =>
      String(e.year) === String(year) && 
      e.month === formattedMonth && 
      e.week === formattedWeek
    );

    if (exists) {
      Notify("failure", "Attendance already exists");
      return;
    }

    const newType = {
      year: String(year),
      month: formattedMonth,
      week: formattedWeek,
      roll: alldata.map((sub) => ({
        id: sub.id, 
        title: sub.title,
        present: null,
      }))
    };

    setattendance(prev => [...prev, newType]);
    setattendancedate({
      year: String(year),
      month: formattedMonth,
      week: formattedWeek
    });

    Notify("success", `Attendance for ${month} ${week} created!`);
  };

  // --- DELETE ATTENDANCE (STANDALONE) ---
  const deleteattendance = (year, month, week) => {
    setattendance(prev => prev.filter(att => 
      !(String(att.year) === String(year) && att.month === month && att.week === week)
    ));
    
    if (String(attendancedate.year) === String(year) && attendancedate.month === month && attendancedate.week === week) {
        setcurrentroll({ roll: [] });
    }
    
    Notify("success", `Attendance for ${month} ${week} deleted`);
  };

  const markattendance = (id) => {
    if (!currentroll?.roll || currentroll.roll.length === 0) return;

    setcurrentroll(prev => ({
      ...prev,
      roll: prev.roll.map(person =>
        person.id === id
          ? { ...person, present: person.present === true ? false : true }
          : person
      )
    }));

    setattendance(prevAttendance =>
      prevAttendance.map(att => {
        if (
          String(att.year) === String(attendancedate.year) &&
          att.month === attendancedate.month &&
          att.week === attendancedate.week
        ) {
          return {
            ...att,
            roll: att.roll.map(person =>
              person.id === id
                ? { ...person, present: person.present === true ? false : true }
                : person
            )
          };
        }
        return att;
      })
    );
  };

  return (
    <all_provider.Provider value={{
      alldata,
      attendance,
      currentroll,
      search,
      setsearch,
      searchresult,
      attendancedate,
      setattendancedate,
      setyear: (val) => setattendancedate(prev => ({ ...prev, year: val })),
      setmonth: (val) => setattendancedate(prev => ({ ...prev, month: val })),
      setweek: (val) => setattendancedate(prev => ({ ...prev, week: val })),
      addnewmember,
      deletemember,
      updatemember,
      markattendance,
      createattendance,
      deleteattendance,
      Notify,
      notifystatus,
      closenotify,
    }}>
      {children}
    </all_provider.Provider>
  );
};

export default ContextProvider;