import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Task, TaskPriority } from '../../types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Preparar proposta comercial',
    description: 'Elaborar proposta para o cliente ABC Tecnologia',
    dueDate: '2024-04-10',
    priority: 'high',
    status: 'pending',
    assignee: {
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  {
    id: '2',
    title: 'Reunião de alinhamento',
    description: 'Alinhar requisitos do projeto com a equipe técnica',
    dueDate: '2024-04-12',
    priority: 'medium',
    status: 'in_progress',
    assignee: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  },
  {
    id: '3',
    title: 'Follow-up com cliente',
    description: 'Verificar feedback sobre a última apresentação',
    dueDate: '2024-04-08',
    priority: 'low',
    status: 'completed',
    assignee: {
      name: 'Pedro Lima',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
];

const priorityColors: Record<TaskPriority, string> = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-blue-500'
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const nextStatus = {
          pending: 'in_progress',
          in_progress: 'completed',
          completed: 'pending'
        } as const;
        return { ...task, status: nextStatus[task.status as keyof typeof nextStatus] };
      }
      return task;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tarefas</h1>
          <p className="text-gray-600">Gerencie suas atividades e prazos</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" />
          Nova Tarefa
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Em Andamento
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Concluídas
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-start">
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className="mt-1 mr-4"
              >
                {getStatusIcon(task.status)}
              </button>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <AlertCircle className={`w-4 h-4 ${priorityColors[task.priority]}`} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600 ml-2">
                    {task.assignee.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;