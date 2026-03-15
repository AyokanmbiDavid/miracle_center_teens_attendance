import React, { useContext, useState } from 'react';
import { Check } from 'lucide-react';
import { all_provider } from '../components/ContextProvider';
import AdminPass from '../components/AdminPass';     // Uncomment when you create it
import NavAdmin from '../components/NavAdmin';

const AdminPage = () => {
  const { addnewmember, Notify } = useContext(all_provider);

  const [newdata, setnewdata] = useState({
    name: '',
    phone_number: '',
    date_of_birth: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newdata.name || !newdata.phone_number || !newdata.date_of_birth) {
      Notify("failure", "Please fill all fields");
      return;
    }

    addnewmember(newdata.name, newdata.phone_number, newdata.date_of_birth);
    Notify("success", "New member added successfully!");

    // Clear form after adding
    setnewdata({
      name: '',
      phone_number: '',
      date_of_birth: '',
    });
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center p-6">
      <NavAdmin/>
      <AdminPass/>
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-8 mt-3">Admin Dashboard</h1>

      {/* Add New Member Section */}
      <div className="max-w-2xl w-full bg-white border flex flex-col items-center border-gray-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">Add a New Member</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={newdata.name}
              onChange={(e) => setnewdata({ ...newdata, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone number"
              value={newdata.phone_number}
              onChange={(e) => setnewdata({ ...newdata, phone_number: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
            <input
              type="date"
              value={newdata.date_of_birth}
              onChange={(e) => setnewdata({ ...newdata, date_of_birth: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>

          <div className="md:col-span-3 flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-sm font-medium transition-all"
            >
              Add Member
              <Check size={18} />
            </button>
          </div>
        </form>
      </div>

      {/* You can add more sections later (Recent Attendance, etc.) */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-sm">Coming soon...</p>
      </div>
    </div>
  );
};

export default AdminPage;