import React, { useContext } from 'react';
import { all_provider } from '../components/ContextProvider';
import { Trash2, Calendar, Download, FileText } from 'lucide-react';
import NavAdmin from '../components/NavAdmin';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AllAttendance = () => {
  const { attendance, deleteattendance, setattendancedate } = useContext(all_provider);

  // --- 1. Function to download ONE specific record ---
  const downloadSingleAttendance = (att) => {
    const doc = new jsPDF();
    const title = `Attendance: ${att.month} ${att.week} (${att.year})`;
    
    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Students: ${att.roll.length}`, 14, 22);

    const tableRows = att.roll
      .sort((a, b) => a.title.localeCompare(b.title)) // Alphabetical
      .map((student, index) => [
        index + 1,
        student.title,
        student.present ? "PRESENT" : "ABSENT"
      ]);

    autoTable(doc, {
      head: [['S/N', 'Name', 'Status']],
      body: tableRows,
      startY: 30,
      headStyles: { fillColor: [22, 101, 52] }, // Green theme
    });

    doc.save(`Attendance_${att.month}_${att.week}.pdf`);
  };

  // --- 2. Function to download ALL history in one PDF ---
  const downloadAllHistory = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Complete Attendance History Report", 14, 20);

    attendance.forEach((att, index) => {
      const presentCount = att.roll.filter(p => p.present).length;
      
      autoTable(doc, {
        head: [[`${att.month} ${att.week} (${att.year})`, `Present: ${presentCount}/${att.roll.length}`]],
        body: att.roll
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(s => [s.title, s.present ? "PRESENT" : "ABSENT"]),
        startY: index === 0 ? 30 : doc.lastAutoTable.finalY + 15,
        headStyles: { fillColor: [37, 99, 235] }, // Blue theme for bulk
      });
    });

    doc.save("Full_Attendance_History.pdf");
  };

  const handleViewRecord = (att) => {
    setattendancedate({ year: att.year, month: att.month, week: att.week });
    alert(`Switched view to ${att.month} ${att.week}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <NavAdmin />
      
      <div className="max-w-5xl mx-auto p-4 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Attendance History</h1>
            <p className="text-gray-500 text-sm mt-1">Manage and export your saved records</p>
          </div>

          <button 
            onClick={downloadAllHistory}
            disabled={attendance.length === 0}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <FileText size={20} /> Export All History (PDF)
          </button>
        </div>

        <div className="grid gap-4">
          {attendance.length > 0 ? (
            [...attendance].reverse().map((att, i) => {
              const total = att.roll.length;
              const present = att.roll.filter(p => p.present === true).length;

              return (
                <motion.div 
                  key={att._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-wrap items-center justify-between shadow-sm hover:shadow-md transition-all group"
                >
                  <div 
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-[200px]"
                    onClick={() => handleViewRecord(att)}
                  >
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 capitalize text-lg">
                        {att.month} — {att.week}
                      </h3>
                      <p className="text-sm text-gray-500">{att.year}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex gap-4 text-sm bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                      <div className="text-center">
                        <p className="text-gray-400 uppercase text-[9px] font-bold">Present</p>
                        <p className="font-bold text-green-600">{present}</p>
                      </div>
                      <div className="text-center border-l border-gray-200 pl-4">
                        <p className="text-gray-400 uppercase text-[9px] font-bold">Total</p>
                        <p className="font-bold text-gray-700">{total}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Specific Download Button */}
                      <button 
                        onClick={() => downloadSingleAttendance(att)}
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Download this record"
                      >
                        <Download size={20} />
                      </button>

                      {/* Delete Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(window.confirm(`Delete ${att.month} ${att.week}?`)) {
                            deleteattendance(att._id); 
                          }
                        }}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200"
            >
              <p className="text-gray-400">No attendance records found yet.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAttendance;