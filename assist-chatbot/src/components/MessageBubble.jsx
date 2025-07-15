// src/components/MessageBubble.jsx
import React from 'react';

export default function MessageBubble({ message, sender }) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap shadow-md
          ${isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
            : 'bg-white text-gray-900 border rounded-tl-none'}
        `}
      >
        {message}
      </div>
    </div>
  );
} 
