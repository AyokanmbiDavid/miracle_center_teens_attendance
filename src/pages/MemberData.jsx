import React, { useContext } from 'react';
import AdminPass from '../components/AdminPass';
import NavAdmin from '../components/NavAdmin';
import DataTable from '../components/DataTable';
import { Download, Search, X } from 'lucide-react';
import { all_provider } from '../components/ContextProvider';
import jsPDF from 'jsPDF';
import autoTable from 'jspdf-autotable';
import { motion } from "framer-motion";

const MemberData = () => {
  const { search, setsearch, alldata } = useContext(all_provider);

  const isSearching = search.trim().length > 0;

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const term = search.trim().toLowerCase();
      
      // Filter data for PDF based on search
      const dataToPrint = term 
        ? alldata.filter(m => m.title?.toLowerCase().includes(term)) 
        : alldata;

      const sortedData = [...dataToPrint].sort((a, b) => 
        (a.title || "").localeCompare(b.title || "")
      );

      doc.setFontSize(18);
      doc.text("Real Miracle Centre - Member List", 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
      
      if (isSearching) doc.text(`Search filter: "${search}"`, 14, 33);

      autoTable(doc, {
        startY: isSearching ? 38 : 35,
        head: [['S/N', 'Full Name', 'Phone Number', 'Date of Birth']],
        body: sortedData.map((m, i) => [i + 1, m.title, m.phone_number || "N/A", m.date_of_birth || "N/A"]),
        theme: 'grid',
        headStyles: { fillColor: [22, 101, 52] },
      });

      doc.save(isSearching ? "Filtered_Members.pdf" : "Full_Member_List.pdf");
    } catch (error) {
      alert("Error generating PDF");
    }
  };

  return (
    <div className="w-full min-h-screen pb-10 bg-gray-50/50">
      <AdminPass>
        <NavAdmin />
        <div className="max-w-6xl mx-auto px-4 mt-6">
          
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky top-4 z-30 mb-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name..."
                className="w-full pl-14 pr-12 py-5 rounded-3xl border-none shadow-lg focus:ring-4 focus:ring-blue-500/10 outline-none text-lg font-medium"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              {isSearching && (
                <button onClick={() => setsearch("")} className="absolute right-5 top-1/2 -translate-y-1/2 p-1 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={16} className="text-gray-500" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
            <DataTable onDownload={downloadPDF} />
          </motion.div>

          <div className="w-full mt-10 flex justify-center">
            <button 
              onClick={downloadPDF}
              className="px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-2xl hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-3"
            >
              DOWNLOAD {isSearching ? 'FILTERED' : 'FULL'} LIST <Download size={20} />
            </button>
          </div>
        </div>
      </AdminPass>
    </div>
  );
};

export default MemberData;