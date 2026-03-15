import React, { useContext } from 'react';
import { Check, X } from 'lucide-react';
import { all_provider } from './ContextProvider';
import { motion } from 'framer-motion';

const Table = () => {
  const { currentroll, markattendance, searchresult, search } = useContext(all_provider);

  // Apply Alphabetical Sort A-Z
  const displayList = (search?.trim() ? searchresult : (currentroll?.roll || []))
    .sort((a, b) => a.title.localeCompare(b.title));

  if (displayList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        {search ? "Sorry, no member found with that name" : "No attendance data for this week"}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full max-w-3xl mx-auto border border-gray-200 rounded-xl text-sm bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-4 text-left border-b border-gray-200 font-semibold text-gray-600">S/N</th>
            <th className="p-4 text-left border-b border-gray-200 font-semibold text-gray-600">Name</th>
            <th className="p-4 text-center border-b border-gray-200 font-semibold text-gray-600 w-40">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((item, i) => (
            <motion.tr 
              key={item.id || i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }} // Staggered entrance
              className="hover:bg-gray-50 border-b last:border-none transition-colors"
            >
              <td className="p-4 text-gray-500 text-xs">{i + 1}</td>
              <td className="p-4 font-medium text-gray-800">{item.title}</td>
              <td className="p-4 text-center">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => markattendance(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-sm ${
                      item.present === true ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Check size={16} /> Present
                  </button>

                  <button
                    onClick={() => markattendance(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all shadow-sm ${
                      item.present === false ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <X size={16} /> Absent
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;