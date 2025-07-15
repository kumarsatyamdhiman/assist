import React from 'react';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <header className="p-6 text-center font-bold text-xl text-blue-600">
        Welcome to BSNL Assist
      </header>
      <ChatBot />
    </div>
  );
}
