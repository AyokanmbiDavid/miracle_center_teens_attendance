import React, { useContext } from 'react';
import { Check, X } from 'lucide-react';
import { all_provider } from './ContextProvider';

const Table = () => {
  const { 
    currentroll, 
    markattendance, 
    searchresult, 
    search 
  } = useContext(all_provider);

  // Decide what list to show: filtered or full
  const displayList = search?.trim() ? searchresult : (currentroll?.roll || []);

  if (displayList.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        {search ? "Sorry, no member found with that name" : "No attendance data for this week"}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full max-w-3xl mx-auto border border-gray-200 rounded-xl text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left border border-gray-200">ID</th>
            <th className="p-4 text-left border border-gray-200">Name</th>
            <th className="p-4 text-center border border-gray-200 w-40">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {displayList.map((item, i) => (
            <tr key={item.id} className="hover:bg-gray-50 border-b last:border-none">
              <td className="p-4 border border-gray-200 text-xs">{item.id}</td>
              <td className="p-4 border border-gray-200 font-medium">{item.title}</td>
              <td className="p-4 border border-gray-200 text-center">
                <div className="flex justify-center gap-6">
                  {/* Present Button */}
                  <button
                    onClick={() => markattendance(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      item.present === true 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 hover:bg-green-50 text-gray-600'
                    }`}
                  >
                    <Check size={18} />
                    Present
                  </button>

                  {/* Absent Button */}
                  <button
                    onClick={() => markattendance(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                      item.present === false 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-gray-100 hover:bg-red-50 text-gray-600'
                    }`}
                  >
                    <X size={18} />
                    Absent
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;