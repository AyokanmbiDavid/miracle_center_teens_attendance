import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { motion } from "framer-motion";
import { all_provider } from './ContextProvider';

const Notify = () => {
  const { notifystatus, closenotify } = useContext(all_provider);

  if (!notifystatus.show) return null;

  const isSuccess = notifystatus.type === "success";
  const isLoading = notifystatus.type === "loading";
  const isError = notifystatus.type === "failure" || notifystatus.type === "error";

  let bgColor = "bg-blue-500";

  if (isSuccess) bgColor = "bg-green-600";
  if (isError) bgColor = "bg-red-600";
  if (isLoading) bgColor = "bg-yellow-600";

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className={`${bgColor} shadow-lg rounded-2xl text-white px-5 py-4 min-w-[280px] flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className="text-base font-medium">{notifystatus.message}</span>
        </div>

        <button
          onClick={closenotify}
          className="ml-4 hover:bg-white/20 p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default Notify;