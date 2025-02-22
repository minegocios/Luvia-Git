import React, { useEffect, useState } from 'react';
import { X, RefreshCw, AlertCircle } from 'lucide-react';
import { Channel } from '../../types';
import { whatsAppService } from '../../services/whatsapp';

interface QRCodeModalProps {
  channel: Channel;
  onClose: () => void;
  onConnect: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ channel, onClose, onConnect }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = (event: string, data: any) => {
      console.log('WhatsApp event:', event, data);
      if (event === 'qr') {
        setQrCode(data);
        setError(null);
      } else if (event === 'status') {
        setStatus(data);
        if (data === 'connected') {
          onConnect();
          onClose();
        }
      } else if (event === 'error') {
        setError(data);
      }
    };

    whatsAppService.addListener(handleUpdate);

    return () => {
      whatsAppService.removeListener(handleUpdate);
    };
  }, [onConnect, onClose]);

  const handleRefresh = async () => {
    setError(null);
    setQrCode(null);
    await whatsAppService.disconnect();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Conectar {channel.name}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center">
          {status === 'connecting' && !qrCode ? (
            <div className="flex flex-col items-center justify-center p-8">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Iniciando conexão com WhatsApp...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Erro na conexão
                </p>
              </div>
              <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                {error}
              </p>
              <button
                onClick={handleRefresh}
                className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : qrCode ? (
            <>
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1. Abra o WhatsApp no seu celular
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2. Toque em Menu ou Configurações e selecione WhatsApp Web
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  3. Aponte seu celular para esta tela para capturar o código
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleRefresh}
                  className="flex items-center mx-auto text-blue-500 hover:text-blue-600"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Atualizar QR Code
                </button>
              </div>
            </>
          ) : (
            <div className="p-4">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Aguardando QR Code...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;