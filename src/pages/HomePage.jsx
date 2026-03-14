import React, { useContext } from 'react';
import { Search, Users, CheckCircle, Percent, ClipboardX } from 'lucide-react'; 
import Table from '../components/Table';
import { all_provider } from '../components/ContextProvider';

const HomePage = () => {
  const { 
    setsearch, 
    setyear, 
    setmonth, 
    setweek, 
    alldata, 
    currentroll,
    attendancedate // Added to show current selection in UI
  } = useContext(all_provider);

  // --- Logic Calculations ---
  const totalMembers = alldata?.length || 0;
  
  // Guard against empty currentroll
  const rollData = currentroll?.roll || [];
  const presentCount = rollData.filter(person => person.present === true).length;
  
  const attendanceRate = totalMembers > 0 
    ? Math.round((presentCount / totalMembers) * 100) 
    : 0;

  return (
    <div className="w-full min-h-screen pt-4 px-4 bg-gray-50/50">
      
      {/* 1. Dashboard Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total Members</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalMembers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Present Now</p>
            <h3 className="text-2xl font-bold text-gray-800">{presentCount}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <Percent size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Attendance Rate</p>
            <h3 className="text-2xl font-bold text-gray-800">{attendanceRate}%</h3>
          </div>
        </div>
      </div>

      {/* 2. Filters Bar (Sticky) */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl mb-6 py-4 px-4 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search member name..."
            onChange={(e) => setsearch(e.target.value)}
            className="w-full text-sm rounded-xl border border-gray-200 bg-gray-50 py-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select
            value={attendancedate.year} // Linked value
            onChange={(e) => setyear(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer"
          >
            {['2026', '2025', '2024'].map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            value={attendancedate.month} // Linked value
            onChange={(e) => setmonth(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer capitalize"
          >
            {['january','february','march','april','may','june','july','august','september','october','november','december']
              .map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <select
            value={attendancedate.week} // Linked value
            onChange={(e) => setweek(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer capitalize"
          >
            {['week 1','week 2','week 3','week 4'].map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
      </div>

      {/* 3. Attendance Table / Empty State */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10 min-h-[300px] flex flex-col">
        {rollData.length > 0 ? (
          <Table />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <ClipboardX size={48} className="text-gray-300 mb-4" />
            <h4 className="text-gray-800 font-semibold">No record found</h4>
            <p className="text-gray-500 text-xs mt-1">
              No attendance roll exists for {attendancedate.month} {attendancedate.week}. 
              Go to Admin to create one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;