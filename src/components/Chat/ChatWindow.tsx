import React, { useState } from 'react';
import { 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Send,
  Image,
  FileText,
  Mic
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'customer';
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Olá, gostaria de saber sobre o produto X',
    timestamp: '10:30',
    sender: 'customer'
  },
  {
    id: '2',
    content: 'Olá! Claro, posso te ajudar com informações sobre o produto X. O que você gostaria de saber especificamente?',
    timestamp: '10:31',
    sender: 'user'
  },
  {
    id: '3',
    content: 'Qual o prazo de entrega para São Paulo?',
    timestamp: '10:31',
    sender: 'customer'
  },
  {
    id: '4',
    content: 'Para São Paulo, o prazo de entrega é de 2 a 3 dias úteis.',
    timestamp: '10:32',
    sender: 'user'
  }
];

const ChatWindow: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Contact"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h3 className="font-semibold">João Silva</h3>
            <p className="text-sm text-gray-500">online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs mt-1 block opacity-70">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Smile className="w-6 h-6" />
          </button>
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Paperclip className="w-6 h-6" />
            </button>
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700">
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Image className="w-5 h-5" />
                <span>Imagem</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <FileText className="w-5 h-5" />
                <span>Documento</span>
              </button>
            </div>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite uma mensagem"
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {newMessage ? (
            <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Send className="w-6 h-6" />
            </button>
          ) : (
            <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              <Mic className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;