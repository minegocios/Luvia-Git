import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { LoadingSpinner } from '../common/LoadingSpinner';

// Lazy load components
const Dashboard = lazy(() => import('../Dashboard'));
const Chat = lazy(() => import('../Chat'));
const CRM = lazy(() => import('../CRM'));
const Tasks = lazy(() => import('../Tasks'));
const Channels = lazy(() => import('../Channels'));
const Contacts = lazy(() => import('../Contacts'));
const Reports = lazy(() => import('../Reports'));
const Users = lazy(() => import('../Users'));
const Queues = lazy(() => import('../Queues'));
const Tags = lazy(() => import('../Tags'));
const Settings = lazy(() => import('../Settings'));

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="ml-64">
        <Suspense fallback={
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
          </div>
        }>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="chats" element={<Chat />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="crm" element={<CRM />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="channels" element={<Channels />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="queues" element={<Queues />} />
            <Route path="tags" element={<Tags />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;