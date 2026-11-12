import { Menu, User } from 'lucide-react';
import { useHealthCheck } from '../../hooks/useHealthCheck';

export default function Topbar({ title, subtitle, onMenuClick }) {
  const { status } = useHealthCheck(30000);

  const statusLabels = {
    connected: 'API Connected',
    disconnected: 'API Disconnected',
    checking: 'Checking...',
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className="topbar-page-info">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="health-indicator">
          <span className={`health-dot ${status}`} />
          <span>{statusLabels[status] || 'Unknown'}</span>
        </div>
        <div className="user-avatar">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
