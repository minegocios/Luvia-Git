import React from 'react';
import {
  Bell,
  Globe,
  Lock,
  MessageSquare,
  Shield,
  Sliders,
  Users,
  Webhook
} from 'lucide-react';

const Settings: React.FC = () => {
  const settingsSections = [
    {
      title: 'Geral',
      icon: Sliders,
      description: 'Configurações gerais do sistema',
      items: ['Idioma', 'Fuso horário', 'Formato de data', 'Tema']
    },
    {
      title: 'Notificações',
      icon: Bell,
      description: 'Gerenciar notificações e alertas',
      items: ['E-mail', 'Push', 'Som', 'Desktop']
    },
    {
      title: 'Segurança',
      icon: Shield,
      description: 'Configurações de segurança e privacidade',
      items: ['Autenticação em 2 fatores', 'Senhas', 'Sessões ativas']
    },
    {
      title: 'Integrações',
      icon: Webhook,
      description: 'Gerenciar integrações com outros serviços',
      items: ['API', 'Webhooks', 'Aplicações']
    },
    {
      title: 'Atendimento',
      icon: MessageSquare,
      description: 'Configurações de atendimento ao cliente',
      items: ['Horário de funcionamento', 'Mensagens automáticas', 'Tags']
    },
    {
      title: 'Equipe',
      icon: Users,
      description: 'Gerenciar configurações da equipe',
      items: ['Permissões', 'Grupos', 'Funções']
    },
    {
      title: 'Domínios',
      icon: Globe,
      description: 'Gerenciar domínios e URLs',
      items: ['Domínios permitidos', 'SSL', 'Redirecionamentos']
    },
    {
      title: 'Privacidade',
      icon: Lock,
      description: 'Configurações de privacidade e dados',
      items: ['Política de privacidade', 'Termos de uso', 'LGPD']
    }
  ];

  return (
    <div className="p-6 ml-64">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <section.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold ml-3">{section.title}</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {section.description}
            </p>

            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
                >
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <button className="mt-4 text-sm text-blue-500 hover:text-blue-600">
              Configurar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;