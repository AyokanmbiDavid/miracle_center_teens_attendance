import React, { createContext, useState, useEffect } from 'react';

export const all_provider = createContext();

const API_URL = "https://teens-attendance-backend-1.onrender.com/api";

const ContextProvider = ({ children }) => {
  // --- 1. STATE INITIALIZATION (From Cache) ---
  const [alldata, setalldata] = useState(() => {
    const saved = localStorage.getItem('cached_members');
    return saved ? JSON.parse(saved) : [];
  });

  const [attendance, setattendance] = useState(() => {
    const saved = localStorage.getItem('cached_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [currentroll, setcurrentroll] = useState({ roll: [] });
  
  const [attendancedate, setattendancedate] = useState(() => {
    const saved = localStorage.getItem('cached_date');
    return saved ? JSON.parse(saved) : { year: "2026", month: "march", week: "week 1" };
  });

  const [notifystatus, setnotifystatus] = useState({ type: "", message: "", show: false });

  // --- 2. NOTIFICATION HELPER ---
  const Notify = (type, message) => {
    setnotifystatus({ type, message, show: true });
    if (type !== "loading") {
      setTimeout(() => setnotifystatus({ type: "", message: "", show: false }), 3000);
    }
  };

  const closenotify = () => setnotifystatus({ type: "", message: "", show: false });

  // --- 3. BACKGROUND SYNC (Stale-While-Revalidate) ---
  useEffect(() => {
    const syncWithCloud = async () => {
      try {
        const [memRes, attRes] = await Promise.all([
          fetch(`${API_URL}/members`),
          fetch(`${API_URL}/attendance`)
        ]);
        
        const members = await memRes.json();
        const attendanceHistory = await attRes.json();

        // Update State & Local Storage
        setalldata(members);
        setattendance(attendanceHistory);
        localStorage.setItem('cached_members', JSON.stringify(members));
        localStorage.setItem('cached_attendance', JSON.stringify(attendanceHistory));
      } catch (err) {
        console.log("Background sync paused (Offline or Server Sleeping)");
      }
    };
    syncWithCloud();
  }, []);

  // --- 4. SELECTION & SEARCH LOGIC ---
  useEffect(() => {
    if (!currentroll?.roll) return;
    const result = currentroll.roll.filter(prev =>
      prev.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(result);
  }, [search, currentroll]);

  // Handle Attendance Filtering and Date Caching
  useEffect(() => {
    const found = attendance.find(att =>
      String(att.year) === String(attendancedate.year) &&
      att.month === attendancedate.month &&
      att.week === attendancedate.week
    );
    setcurrentroll(found || { roll: [] });
    // This saves your current view (Year/Month/Week) to memory
    localStorage.setItem('cached_date', JSON.stringify(attendancedate));
  }, [attendancedate, attendance]);

  // --- 5. MEMBER API ACTIONS ---

  const addnewmember = async (name, phone_number, date_of_birth) => {
    Notify("loading", "Saving to Cloud...");
    try {
      const res = await fetch(`${API_URL}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: name, phone_number, date_of_birth })
      });
      const data = await res.json();
      if (res.ok) {
        const updated = [...alldata, data];
        setalldata(updated);
        localStorage.setItem('cached_members', JSON.stringify(updated));
        Notify("success", "Member Added Successfully!");
      } else { throw new Error(data.message); }
    } catch (err) { Notify("failure", err.message || "Failed to add member"); }
  };

  const deletemember = async (id) => {
    Notify("loading", "Deleting Member...");
    try {
      const res = await fetch(`${API_URL}/members/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = alldata.filter(m => m._id !== id);
        setalldata(updated);
        localStorage.setItem('cached_members', JSON.stringify(updated));
        Notify("success", "Member Removed");
      }
    } catch (err) { Notify("failure", "Cloud sync failed"); }
  };

  const updatemember = async (id, updatedName, updatedPhone, updatedDOB) => {
    Notify("loading", "Updating Details...");
    try {
      const res = await fetch(`${API_URL}/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: updatedName, phone_number: updatedPhone, date_of_birth: updatedDOB })
      });
      const data = await res.json();
      if (res.ok) {
        const updated = alldata.map(m => m._id === id ? data : m);
        setalldata(updated);
        localStorage.setItem('cached_members', JSON.stringify(updated));
        Notify("success", "Details Updated!");
      }
    } catch (err) { Notify("failure", "Update Failed"); }
  };

  // --- 6. ATTENDANCE API ACTIONS ---

  const createattendance = async (year, month, week) => {
    Notify("loading", "Generating Sheet...");
    try {
      const res = await fetch(`${API_URL}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, month, week })
      });
      const data = await res.json();
      if (res.ok) {
        const updatedAtt = [data, ...attendance];
        setattendance(updatedAtt);
        localStorage.setItem('cached_attendance', JSON.stringify(updatedAtt));
        setattendancedate({ year, month, week });
        Notify("success", `${month} ${week} created!`);
      } else { throw new Error(data.message); }
    } catch (err) { Notify("failure", err.message || "Attendance already exists"); }
  };

  const markattendance = async (memberId) => {
    if (!currentroll?._id) return;
    
    // OPTIMISTIC UPDATE: Instant UI Toggle
    const prevHistory = [...attendance];
    setattendance(prev => prev.map(att => {
      if (att._id === currentroll._id) {
        return {
          ...att,
          roll: att.roll.map(p => p.id === memberId ? { ...p, present: !p.present } : p)
        };
      }
      return att;
    }));

    try {
      const res = await fetch(`${API_URL}/attendance/mark`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentroll._id, memberId })
      });
      if (res.ok) {
        const updatedRecord = await res.json();
        const newHistory = attendance.map(att => att._id === updatedRecord._id ? updatedRecord : att);
        localStorage.setItem('cached_attendance', JSON.stringify(newHistory));
      } else { throw new Error(); }
    } catch (err) {
      setattendance(prevHistory); // Rollback if API fails
      Notify("failure", "Failed to sync marking");
    }
  };

  const deleteattendance = async (id) => {
    Notify("loading", "Removing Sheet...");
    try {
      const res = await fetch(`${API_URL}/attendance/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const updated = attendance.filter(att => att._id !== id);
        setattendance(updated);
        localStorage.setItem('cached_attendance', JSON.stringify(updated));
        Notify("success", "Attendance Deleted");
      }
    } catch (err) { Notify("failure", "Delete Failed"); }
  };

  // --- 7. EXPORTED VALUES ---
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
      // Fixed Setters with Cache logic
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