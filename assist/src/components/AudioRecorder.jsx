import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AudioRecorder({ onAudioSubmit, disabled }) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleStartRecording = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
                console.error('Error accessing microphone:', err);
                alert("Microphone access was denied. Please allow access in your browser settings to use this feature.");
            }
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            handleStopRecording();
        } else {
            handleStartRecording();
        }
    };

    return (
        <div className="relative">
            <Button
                type="button"
                onClick={toggleRecording}
                disabled={disabled && !isRecording}
                className={`rounded-full w-10 h-10 p-0 transition-colors duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
            >
                {isRecording ? <Square className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4" />}
            </Button>
            {isRecording && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-red-500"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}
        </div>
    );
}