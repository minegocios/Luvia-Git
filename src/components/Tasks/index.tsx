import React from 'react';
import TaskList from './TaskList';

const Tasks: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <TaskList />
    </div>
  );
};

export default Tasks;