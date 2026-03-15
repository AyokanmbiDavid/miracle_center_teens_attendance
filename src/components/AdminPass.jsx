import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPass = ({ children }) => {
  const [passtype, setpasstype] = useState('password');
  const [passvalue, setpassvalue] = useState('');
  
  // By removing sessionStorage, this defaults to false every time the page loads/refreshes
  const [isAdmin, setIsAdmin] = useState(false);

  const checkPass = (e) => {
    e.preventDefault();

    if (passvalue === 'teens') {
      setIsAdmin(true);
    } else if (!passvalue) {
      alert('Please, are you an admin?');
    } else {
      alert('Hey, wetin you dey find for here...');
      setpassvalue('');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isAdmin ? (
        <motion.div 
          key="lock-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }} // Shrinks and fades away on success
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-gray-50 flex justify-center items-center p-6"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
            className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="p-4 bg-blue-50 text-blue-600 rounded-full"
              >
                <Lock size={32} />
              </motion.div>
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

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all"
              >
                Access Dashboard
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="admin-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPass;