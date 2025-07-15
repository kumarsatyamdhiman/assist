
import React from 'react';
import { motion } from 'framer-motion';

const avatarImageUrl = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/05ee8af66_NewProject-3.png';

export default function ChatAvatar({ onClick, isOpen }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
    >
      <motion.button
        onClick={onClick}
        className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-orange-400 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Pulse animation based on open state */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-orange-300 opacity-30"
          animate={{
            scale: isOpen ? [1, 1.3, 1] : [1, 1.15, 1],
            opacity: isOpen ? [0.6, 0.2, 0.6] : [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: isOpen ? 1.5 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Avatar Image */}
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
          <motion.img
            src={avatarImageUrl}
            alt="Chatbot Avatar"
            className="w-full h-full object-contain p-2"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Notification dot */}
        {!isOpen && (
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{delay: 1}}
            >
            </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}
