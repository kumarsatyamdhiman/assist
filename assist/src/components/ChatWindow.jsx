
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import AudioRecorder from './AudioRecorder';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ChatWindow({ isOpen, onClose, messages, onSendMessage, onAudioSubmit, isTyping, isProcessingAudio, audioError }) {
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed bottom-28 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] h-[32rem] max-h-[calc(100vh-8rem)]"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-400 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">BSNL Assist</h3>
              <p className="text-xs text-white/80">Your BSNL assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 w-8 h-8"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              className="flex-1 flex flex-col min-h-0"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 && (
                     <div className="text-center py-8">
                       <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                         <Wifi className="w-8 h-8 text-blue-500" />
                       </div>
                       <h4 className="font-semibold text-gray-800 mb-2">Welcome to BSNL Assist!</h4>
                       <p className="text-sm text-gray-600">I'm here to help with your BSNL service needs. Ask me anything or use the mic to talk!</p>
                     </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={index}
                      message={message.content}
                      sender={message.role}
                    />
                  ))}
                  
                  {isTyping && <TypingIndicator />}
                  {isProcessingAudio && (
                      <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                          <AlertDescription>
                              Processing your audio, one moment...
                          </AlertDescription>
                      </Alert>
                  )}
                  {audioError && (
                      <Alert variant="destructive">
                          <AlertDescription>{audioError}</AlertDescription>
                      </Alert>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isTyping || isProcessingAudio}
                  />
                  <AudioRecorder onAudioSubmit={onAudioSubmit} disabled={isTyping || isProcessingAudio} />
                  <Button
                    onClick={handleSend}
                    disabled={!inputMessage.trim() || isTyping || isProcessingAudio}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-orange-400 hover:from-blue-600 hover:to-orange-500 w-10 h-10 p-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
