import React, { useRef, useEffect, useState } from 'react';

export default function ChatWindow({ isOpen, onClose, messages, onSendMessage, onAudioSubmit, isTyping }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-96 h-96 bg-white shadow-lg rounded-lg border flex flex-col overflow-hidden z-50">
      <div className="p-4 font-semibold bg-blue-600 text-white flex justify-between">
        BSNL Assist
        <button onClick={onClose}>✖</button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <div className="inline-block bg-gray-200 px-3 py-2 rounded">
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-left italic text-gray-400">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage(input) && setInput('')}
        />
      </div>
    </div>
  );
}
