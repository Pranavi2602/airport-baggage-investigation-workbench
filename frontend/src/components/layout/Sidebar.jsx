import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, AlertOctagon, Luggage } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Luggage size={20} />
          </div>
          <div>
            <div className="sidebar-title">Airport Baggage</div>
            <div className="sidebar-subtitle">Investigation Workbench</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `sidebar-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/investigation"
            className={({ isActive }) =>
              `sidebar-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <Search size={20} />
            Baggage Investigation
          </NavLink>

          <NavLink
            to="/exceptions"
            className={({ isActive }) =>
              `sidebar-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <AlertOctagon size={20} />
            Exception Management
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          CAP-05 · Capstone Project
        </div>
      </aside>
    </>
  );
}
