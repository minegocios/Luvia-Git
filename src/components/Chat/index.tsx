import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const Chat: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] ml-64 bg-white dark:bg-gray-800">
      <ChatList />
      <ChatWindow />
    </div>
  );
};

export default Chat;