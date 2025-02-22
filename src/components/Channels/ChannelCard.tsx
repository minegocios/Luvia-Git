import React from 'react';
import { CheckCircle2, XCircle, RefreshCw, QrCode } from 'lucide-react';
import { Channel } from '../../types';

interface ChannelCardProps {
  channel: Channel;
  onReconnect: (id: string) => void;
  onShowQR: (id: string) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onReconnect, onShowQR }) => {
  const handleReconnect = () => {
    onReconnect(channel.id);
  };

  const handleShowQR = () => {
    onShowQR(channel.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <img
            src={channel.icon}
            alt={channel.name}
            className="w-12 h-12 rounded-lg"
          />
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {channel.name}
            </h3>
            <div className="flex items-center mt-1">
              {channel.connected ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">Conectado</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">Desconectado</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {!channel.connected && (
            <button
              onClick={handleReconnect}
              className="p-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Reconectar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleShowQR}
            className="p-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="QR Code"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">Mensagens Hoje</span>
          <p className="text-lg font-semibold mt-1">{channel.stats.messagesPerDay}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-400">Atendimentos</span>
          <p className="text-lg font-semibold mt-1">{channel.stats.activeChats}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Status da API</span>
          <span className={channel.apiStatus === 'operational' ? 'text-green-500' : 'text-red-500'}>
            {channel.apiStatus === 'operational' ? 'Operacional' : 'Com Problemas'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>Última Sincronização</span>
          <span>{channel.lastSync}</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;