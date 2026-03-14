import { Eye, EyeOff, Lock } from 'lucide-react'; // Added EyeOff for better UI
import React, { useState } from 'react';

const AdminPass = ({ children }) => {
  const [passtype, setpasstype] = useState('password');
  const [passvalue, setpassvalue] = useState('');
  
  // Check sessionStorage so the "login" persists during the session
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const checkPass = (e) => {
    e.preventDefault();

    if (passvalue === 'teens') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAdmin(true);
    } else if (!passvalue) {
      alert('Please, are you an admin?');
    } else {
      alert('Hey, wetin you dey find for here...');
      setpassvalue('');
    }
  };

  // If NOT authenticated, show the lock screen
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-[100] bg-gray-50 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
              <Lock size={32} />
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Please enter the passkey to continue
          </p>

          <form onSubmit={checkPass}>
            <div className="relative w-full mb-6">
              <input 
                type={passtype}
                placeholder='Enter passkey...' 
                value={passvalue}
                onChange={(e) => setpassvalue(e.target.value)}
                className='w-full p-4 bg-gray-100 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm'
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setpasstype(prev => prev === 'password' ? 'text' : 'password')}
              >
                {passtype === 'password' ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, show the actual Admin content
  return <>{children}</>;
};

export default AdminPass;