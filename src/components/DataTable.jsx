import React, { useContext, useMemo } from 'react';
import { all_provider } from '../components/ContextProvider';
import { Download, Trash2, Edit, UserX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DataTable = ({ onDownload }) => {
  const { alldata, search, searchresult, deletemember, updatemember } = useContext(all_provider);

  // ROCK-SOLID FILTER: This ensures the name search ALWAYS works
  const displayData = useMemo(() => {
    const term = search.trim().toLowerCase();
    
    // If there is a search term, filter manually as a fallback to searchresult
    let data = term 
      ? alldata.filter(m => m.title?.toLowerCase().includes(term)) 
      : alldata;

    // Sort alphabetically
    return [...data].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  }, [search, alldata]);

  const handleEdit = (item) => {
    const newName = window.prompt("Edit Name:", item.title);
    const newPhone = window.prompt("Edit Phone:", item.phone_number);
    if (newName && newPhone) {
      updatemember(item._id, newName, newPhone, item.date_of_birth);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Members Directory</h2>
          <p className="text-sm text-gray-500 font-medium">
            {search.trim() ? `Found: ${displayData.length}` : `Total: ${alldata.length}`}
          </p>
        </div>
        
        <button 
          onClick={onDownload} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-left">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">S/N</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode='popLayout'>
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <motion.tr 
                    key={item._id || index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="p-4 text-sm text-gray-400">{index + 1}</td>
                    <td className="p-4 text-sm font-bold text-gray-800">{item.title}</td>
                    <td className="p-4 text-sm text-gray-500">{item.phone_number || "—"}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                          <Edit size={16}/>
                        </button>
                        <button 
                          onClick={() => window.confirm(`Delete ${item.title}?`) && deletemember(item._id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <UserX size={40} />
                      <p className="text-sm italic">No members match "{search}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;