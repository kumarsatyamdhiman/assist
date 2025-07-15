// src/components/AudioRecorder.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';

export default function AudioRecorder({ onAudioSubmit, disabled }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onAudioSubmit(audioBlob);
        audioChunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone error:', err);
      alert('Microphone access denied. Please allow mic access to record.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    isRecording ? handleStopRecording() : handleStartRecording();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleRecording}
        disabled={disabled && !isRecording}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
          ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
      >
        {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>
      {isRecording && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}
    </div>
  );
} 
