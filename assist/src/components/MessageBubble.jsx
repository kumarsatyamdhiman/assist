import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ message, sender }) {
  const isUser = sender === 'user';
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex items-end space-x-2 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-orange-400' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>

        {/* Message */}
        <div className={`relative px-4 py-2 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-orange-400 text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
           <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{message}</ReactMarkdown>
          </div>

          {/* Tail */}
          <div className={`absolute bottom-0 w-3 h-3 ${
            isUser 
              ? 'right-0 bg-orange-400 rounded-bl-full' 
              : 'left-0 bg-gray-100 rounded-br-full'
          }`} />
        </div>
      </div>
    </motion.div>
  );
}