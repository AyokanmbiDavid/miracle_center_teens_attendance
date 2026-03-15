import React, { useContext } from 'react';
import { all_provider } from './ContextProvider';
import { CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = () => {
  const { notifystatus, closenotify } = useContext(all_provider);

  const styles = {
    success: "bg-green-600 border-green-700",
    failure: "bg-red-600 border-red-700",
    loading: "bg-blue-600 border-blue-700",
  };

  return (
    <AnimatePresence>
      {notifystatus.show && (
        <motion.div 
          // 1. Initial state (hidden below the screen)
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          // 2. Animate to this state (visible)
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          // 3. Exit state (slide back down when hidden)
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          // Smooth spring physics
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-10 left-1/2 z-[9999]"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-white shadow-2xl border ${styles[notifystatus.type] || styles.loading}`}>
            
            {notifystatus.type === "loading" && <Loader2 className="animate-spin" size={20} />}
            {notifystatus.type === "success" && <CheckCircle size={20} />}
            {notifystatus.type === "failure" && <XCircle size={20} />}

            <span className="text-sm font-bold tracking-wide">{notifystatus.message}</span>

            <button 
              onClick={closenotify} 
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;