import React, { useContext } from 'react';
import { all_provider } from './ContextProvider';
import { Download, Trash2, Edit } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // 1. Import autoTable directly

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
    try {
      const doc = new jsPDF();

      // Add Title
      doc.setFontSize(18);
      doc.text("Miracle Centre - Members List", 14, 20);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

      // Prepare data
      const tableRows = alldata.map((item, index) => [
        index + 1,
        item.title,
        item.date_of_birth || "N/A",
        item.phone_number || "N/A"
      ]);

      // 2. Use autoTable(doc, options) instead of doc.autoTable
      autoTable(doc, {
        head: [['S/N', 'Full Name', 'DOB', 'Phone']],
        body: tableRows,
        startY: 35,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235] }, // Blue color to match your UI
        styles: { fontSize: 9 },
      });

      doc.save("miracle_centre_members.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Could not generate PDF. Check console for details.");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Members Directory</h2>
          <p className="text-sm text-gray-500">Total registered: {alldata.length}</p>
        </div>
        <button 
          onClick={downloadPDF} 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-2xl shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">S/N</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
              <th className="text-right p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alldata.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                <td className="p-4 text-sm font-semibold text-gray-800">{item.title}</td>
                <td className="p-4 text-sm text-gray-600">{item.phone_number || "—"}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Member"
                    >
                      <Edit size={17} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Are you sure you want to delete ${item.title}?`)) 
                        deletemember(item.id)
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Member"
                    >
                      <Trash2 size={17} />
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