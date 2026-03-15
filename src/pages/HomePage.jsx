import React, { useContext, useEffect, useState } from 'react';
import { Search, Users, CheckCircle, Percent, ClipboardX, Send, Loader2 } from 'lucide-react'; 
import Table from '../components/Table';
import { all_provider } from '../components/ContextProvider';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const { 
    setsearch, 
    setyear, 
    setmonth, 
    setweek, 
    alldata, 
    currentroll,
    attendancedate,
    submitAttendance // Ensure this is in your context
  } = useContext(all_provider);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setsearch("");
  }, [setsearch]);

  // --- Calculations ---
  const totalMembers = alldata?.length || 0;
  const rollData = currentroll?.roll || [];
  const presentCount = rollData.filter(person => person.present === true).length;
  const attendanceRate = totalMembers > 0 ? Math.round((presentCount / totalMembers) * 100) : 0;

  const handleFinalSubmit = async () => {
    if (rollData.length === 0) return alert("No data to submit!");
    if (!window.confirm("Submit and close this attendance roll?")) return;

    setLoading(true);
    try {
      await submitAttendance();
      alert("Attendance Saved Successfully!");
    } catch (err) {
      alert("Failed to submit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="w-full min-h-screen pt-4 px-4 bg-gray-50/50 pb-20"
    >
      
      {/* 1. Dashboard Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-4">
        {[
          { label: 'Database', val: totalMembers, icon: <Users />, color: 'blue' },
          { label: 'Present', val: presentCount, icon: <CheckCircle />, color: 'green' },
          { label: 'Success Rate', val: `${attendanceRate}%`, icon: <Percent />, color: 'purple' }
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 relative overflow-hidden"
          >
            <div className={`p-3 bg-${card.color}-50 text-${card.color}-600 rounded-2xl`}>
              {card.icon}
            </div>
            <div className="z-10">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
              <h3 className="text-2xl font-black text-gray-800">{card.val}</h3>
            </div>
            {/* Visual Progress Bar for Success Rate Card */}
            {card.label === 'Success Rate' && (
              <div className="absolute bottom-0 left-0 h-1 bg-purple-500 transition-all duration-1000" style={{ width: `${attendanceRate}%` }} />
            )}
          </motion.div>
        ))}
      </div>

      {/* 2. Filters & Submit Bar */}
      <div className="sticky top-4 z-30 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl mb-6 py-4 px-4 shadow-sm">
        <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full xl:w-96">
            <input
              type="text"
              placeholder="Search member in this roll..."
              onChange={(e) => setsearch(e.target.value)}
              className="w-full text-sm rounded-xl border border-gray-100 bg-gray-50 py-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto">
            <select
              value={attendancedate.year}
              onChange={(e) => setyear(e.target.value)}
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none"
            >
              {['2026', '2025', '2024'].map(y => <option key={y} value={y}>{y}</option>)}
            </select>

            <select
              value={attendancedate.month}
              onChange={(e) => setmonth(e.target.value)}
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold capitalize outline-none"
            >
              {['january','february','march','april','may','june','july','august','september','october','november','december'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <select
              value={attendancedate.week}
              onChange={(e) => setweek(e.target.value)}
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold capitalize outline-none"
            >
              {['week 1','week 2','week 3','week 4'].map(w => <option key={w} value={w}>{w}</option>)}
            </select>

            {/* THE SUBMIT BUTTON */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinalSubmit}
              disabled={loading || rollData.length === 0}
              className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 disabled:bg-gray-300 disabled:shadow-none transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              <span>{loading ? "Saving..." : "Submit Roll"}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 3. Table Section */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={attendancedate.month + attendancedate.week}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden mb-10 min-h-[400px] flex flex-col"
        >
          {rollData.length > 0 ? (
            <div className="p-2">
               <Table />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <motion.div 
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4"
              >
                 <ClipboardX size={40} className="text-gray-300" />
              </motion.div>
              <h4 className="text-gray-800 font-bold">Roll Not Started</h4>
              <p className="text-gray-500 text-xs mt-2 max-w-[200px] mx-auto">
                No attendance has been initialized for <span className="text-blue-600 font-bold">{attendancedate.month} {attendancedate.week}</span>.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;