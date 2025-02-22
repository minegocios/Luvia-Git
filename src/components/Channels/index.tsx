import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ChannelCard from './ChannelCard';
import QRCodeModal from './QRCodeModal';
import { Channel } from '../../types';

const initialChannels: Channel[] = [
  {
    id: '1',
    name: 'WhatsApp Business',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    connected: false,
    stats: {
      messagesPerDay: 0,
      activeChats: 0
    },
    apiStatus: 'operational',
    lastSync: 'Nunca'
  },
  {
    id: '2',
    name: 'Telegram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    connected: true,
    stats: {
      messagesPerDay: 856,
      activeChats: 32
    },
    apiStatus: 'operational',
    lastSync: '5 minutos atrás'
  },
  {
    id: '3',
    name: 'Instagram Direct',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
    connected: false,
    stats: {
      messagesPerDay: 0,
      activeChats: 0
    },
    apiStatus: 'error',
    lastSync: 'Nunca'
  },
  {
    id: '4',
    name: 'Facebook Messenger',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg',
    connected: true,
    stats: {
      messagesPerDay: 543,
      activeChats: 28
    },
    apiStatus: 'operational',
    lastSync: '15 minutos atrás'
  }
];

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleReconnect = (channelId: string) => {
    setSelectedChannel(channelId);
    setShowQRModal(true);
  };

  const handleShowQR = (channelId: string) => {
    setSelectedChannel(channelId);
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
    setSelectedChannel(null);
  };

  const handleConnect = () => {
    if (selectedChannel) {
      setChannels(channels.map(channel =>
        channel.id === selectedChannel
          ? {
              ...channel,
              connected: true,
              stats: { messagesPerDay: 0, activeChats: 0 },
              lastSync: new Date().toLocaleTimeString()
            }
          : channel
      ));
    }
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Canais de Comunicação</h1>
          <p className="text-gray-600">Gerencie suas integrações com diferentes plataformas</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Plus className="w-5 h-5 mr-2" />
          Novo Canal
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar canais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-500" />
      </div>

      {/* Channel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map(channel => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            onReconnect={handleReconnect}
            onShowQR={handleShowQR}
          />
        ))}
      </div>

      {/* QR Code Modal */}
      {showQRModal && selectedChannel && (
        <QRCodeModal
          channel={channels.find(c => c.id === selectedChannel)!}
          onClose={handleCloseQRModal}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
};

export default Channels;