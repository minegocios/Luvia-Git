import React, { useState } from 'react';
import { Plus, Users, Clock, MessageSquare, BarChart2 } from 'lucide-react';

interface Queue {
  id: string;
  name: string;
  description: string;
  agents: number;
  waitingTime: string;
  activeChats: number;
  status: 'active' | 'inactive';
}

const initialQueues: Queue[] = [
  {
    id: '1',
    name: 'Suporte Técnico',
    description: 'Atendimento para questões técnicas e problemas com produtos',
    agents: 5,
    waitingTime: '2min',
    activeChats: 12,
    status: 'active'
  },
  {
    id: '2',
    name: 'Vendas',
    description: 'Atendimento para novos clientes e oportunidades comerciais',
    agents: 3,
    waitingTime: '1min',
    activeChats: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Financeiro',
    description: 'Suporte para questões financeiras e pagamentos',
    agents: 2,
    waitingTime: '5min',
    activeChats: 4,
    status: 'active'
  }
];

const Queues: React.FC = () => {
  const [queues] = useState<Queue[]>(initialQueues);

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Filas de Atendimento</h1>
          <p className="text-gray-600">Gerencie suas filas e monitore o desempenho</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" />
          Nova Fila
        </button>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queues.map((queue) => (
          <div
            key={queue.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {queue.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {queue.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  queue.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {queue.status === 'active' ? 'Ativa' : 'Inativa'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Users className="w-4 h-4 mr-2" />
                  Agentes
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {queue.agents}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Tempo de Espera
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {queue.waitingTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chats Ativos
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {queue.activeChats}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  SLA
                </div>
                <p className="text-lg font-semibold text-green-500">98%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queues;