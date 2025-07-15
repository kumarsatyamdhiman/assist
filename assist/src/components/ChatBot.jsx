import React, { useState } from 'react';
import ChatAvatar from './ChatAvatar';
import ChatWindow from './ChatWindow';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [audioError, setAudioError] = useState('');

  const handleToggle = () => setIsOpen(!isOpen);

  const callOpenAI = async (messagesHistory) => {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messagesHistory,
          temperature: 0.7,
        })
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'No response from the model.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error contacting OpenAI.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (text) => {
    const newMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);
    await callOpenAI(updatedMessages);
  };

  const handleAudioSubmit = async (blob) => {
    setIsProcessingAudio(true);
    setAudioError('');
    try {
      const fakeTranscript = "This is a transcribed message from audio.";
      await handleSendMessage(fakeTranscript);
    } catch (err) {
      console.error(err);
      setAudioError('Failed to process audio.');
    } finally {
      setIsProcessingAudio(false);
    }
  };

  return (
    <>
      <ChatAvatar onClick={handleToggle} isOpen={isOpen} />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        onAudioSubmit={handleAudioSubmit}
        isTyping={isTyping}
        isProcessingAudio={isProcessingAudio}
        audioError={audioError}
      />
    </>
  );
}