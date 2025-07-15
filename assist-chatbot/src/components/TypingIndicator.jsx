import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white border px-4 py-2 rounded-xl shadow text-sm">
        <span className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
        </span>
      </div>
    </div>
  );
}
