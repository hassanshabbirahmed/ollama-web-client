import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "./components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { Slider } from "./components/ui/slider"
import { useTheme } from './ThemeContext';
import { Moon, Sun } from 'lucide-react';

const App = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchModels = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      const data = await response.json();
      const modelNames = data.models.map(model => model.name);
      setModels(modelNames);
      if (modelNames.length > 0) {
        setSelectedModel(modelNames[0]);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!input.trim() || !selectedModel || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setConversations(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...conversations,
            userMessage
          ],
          stream: true,
          options: {
            temperature: temperature,
            top_p: topP,
          }
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };

      setConversations(prev => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim() === '') continue;
          try {
            const parsedLine = JSON.parse(line);
            if (parsedLine.message?.content) {
              assistantMessage.content += parsedLine.message.content;
              setConversations(prev => 
                prev.map((msg, index) => 
                  index === prev.length - 1 ? { ...assistantMessage } : msg
                )
              );
            }
          } catch (error) {
            console.error('Error parsing line:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedModel, isLoading, systemPrompt, conversations, temperature, topP]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header with model selector, system prompt, and dark mode toggle */}
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={toggleDarkMode} variant="outline" size="icon">
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
          
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system prompt here (optional)..."
            className={`w-full p-2 text-sm border rounded-lg resize-none h-20 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Temperature: {temperature.toFixed(2)}</label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[temperature]}
                onValueChange={([value]) => setTemperature(value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Top P: {topP.toFixed(2)}</label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[topP]}
                onValueChange={([value]) => setTopP(value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conversation history */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {conversations.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'user' 
                  ? darkMode ? 'bg-blue-900 ml-12' : 'bg-blue-100 ml-12'
                  : darkMode ? 'bg-gray-800 mr-12' : 'bg-white mr-12'
              }`}
            >
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your prompt here..."
            className={`flex-1 p-2 border rounded-lg resize-none h-[100px] ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
            }`}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !selectedModel}
            className="px-4 py-2"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
