import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const pageConfig = {
  '/': {
    title: 'Airport Operations Overview',
    subtitle: 'Monitor baggage journeys and investigation activities.',
  },
  '/investigation': {
    title: 'Baggage Investigation',
    subtitle: 'Search and investigate individual baggage journeys.',
  },
  '/exceptions': {
    title: 'Exception Management',
    subtitle: 'Monitor, assign, and resolve baggage misroute exceptions.',
  },
};

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const config = pageConfig[location.pathname] || pageConfig['/'];

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Topbar
          title={config.title}
          subtitle={config.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
