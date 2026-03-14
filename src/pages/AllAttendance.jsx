import React, { useContext } from 'react';
import { all_provider } from '../components/ContextProvider';
import { Trash2, Calendar, Users, ChevronRight } from 'lucide-react';
import NavAdmin from '../components/NavAdmin';

const AllAttendance = () => {
  const { attendance, deleteattendance } = useContext(all_provider);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NavAdmin />
      
      <div className="max-w-4xl mx-auto p-4 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Attendance History</h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {attendance.length} Records
          </span>
        </div>

        <div className="grid gap-4">
          {attendance.length > 0 ? (
            attendance.map((att, index) => {
              // Calculate stats for this specific record
              const total = att.roll.length;
              const present = att.roll.filter(p => p.present === true).length;

              return (
                <div 
                  key={`${att.year}-${att.month}-${att.week}`} 
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 capitalize">
                        {att.month} — {att.week}
                      </h3>
                      <p className="text-sm text-gray-500">{att.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    {/* Mini Stats */}
                    <div className="hidden md:flex gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-400 uppercase text-[10px] font-bold">Present</p>
                        <p className="font-semibold text-green-600">{present}</p>
                      </div>
                      <div className="text-center border-l pl-4">
                        <p className="text-gray-400 uppercase text-[10px] font-bold">Total</p>
                        <p className="font-semibold text-gray-700">{total}</p>
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button 
                      onClick={() => {
                        if(window.confirm(`Permanently delete attendance for ${att.month} ${att.week}?`)) {
                          deleteattendance(att.year, att.month, att.week);
                        }
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors group"
                      title="Delete Record"
                    >
                      <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500">No attendance records found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAttendance;