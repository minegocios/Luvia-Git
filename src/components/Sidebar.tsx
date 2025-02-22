import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Briefcase,
  CheckSquare,
  Share2,
  BarChart3,
  UserCog,
  ListTodo,
  Tags,
  Settings
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: MessageSquare, label: 'Atendimentos', path: '/chats' },
  { icon: Users, label: 'Contatos', path: '/contacts' },
  { icon: Briefcase, label: 'CRM', path: '/crm' },
  { icon: CheckSquare, label: 'Tarefas', path: '/tasks' },
  { icon: Share2, label: 'Canais', path: '/channels' },
  { icon: BarChart3, label: 'Relatórios', path: '/reports' },
  { icon: UserCog, label: 'Usuários', path: '/users' },
  { icon: ListTodo, label: 'Filas', path: '/queues' },
  { icon: Tags, label: 'Etiquetas', path: '/tags' },
  { icon: Settings, label: 'Configurações', path: '/settings' }
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">SaaS Platform</h1>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;