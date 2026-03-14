import React, { useContext } from 'react';
import { all_provider } from './ContextProvider';
import { Download, Trash2, Edit } from 'lucide-react'; // Added icons
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DataTable = () => {
  const { alldata, deletemember, updatemember } = useContext(all_provider);

  const handleEdit = (item) => {
    const newName = window.prompt("Edit Name:", item.title);
    const newPhone = window.prompt("Edit Phone:", item.phone_number);
    if (newName && newPhone) {
      updatemember(item.id, newName, newPhone, item.date_of_birth);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Members List", 14, 20);
    const tableRows = alldata.map((item, index) => [
      index + 1,
      item.title,
      item.date_of_birth,
      item.phone_number
    ]);
    doc.autoTable({
      head: [['S/N', 'Full Name', 'DOB', 'Phone']],
      body: tableRows,
      startY: 30,
    });
    doc.save("members.pdf");
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Members ({alldata.length})</h2>
        <button onClick={downloadPDF} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
          <Download size={18} /> Download PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-4 text-xs font-medium text-gray-600">S/N</th>
              <th className="text-left p-4 text-xs font-medium text-gray-600">Name</th>
              <th className="text-left p-4 text-xs font-medium text-gray-600">Phone</th>
              <th className="text-right p-4 text-xs font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alldata.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50 last:border-none">
                <td className="p-4 text-sm">{index + 1}</td>
                <td className="p-4 text-sm font-medium">{item.title}</td>
                <td className="p-4 text-sm">{item.phone_number}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Are you sure you want to delete ${item.title}?`)) 
                        deletemember(item.id)
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;