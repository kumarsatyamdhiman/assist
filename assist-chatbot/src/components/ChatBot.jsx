import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioError, setAudioError] = useState('');

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setIsTyping(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: text }],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Something went wrong.';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error contacting OpenAI.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAudioSubmit = async (blob) => {
    setIsProcessingAudio(true);
    setTimeout(() => {
      setIsProcessingAudio(false);
      sendMessage("This is a simulated transcript.");
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={sendMessage}
        onAudioSubmit={handleAudioSubmit}
        isTyping={isTyping}
        isProcessingAudio={isProcessingAudio}
        audioError={audioError}
      />
    </>
  );
}
