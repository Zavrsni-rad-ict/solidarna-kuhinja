import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from './sidebarList';

export const Sidebar = () => {
  const location = useLocation();
  const tabName = location.pathname.split('/')[1];

  const [activeTab, setActiveTab] = useState(
    location.pathname === '/' ? 'home' : tabName,
  );

  return (
    <aside
      id="logo-sidebar"
      className="hidden sm:block w-64 h-auto h-screen-with-header transition-transform -translate-x-full bg-blue-gray-200 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <nav className="px-3 pb-4 mt-8 overflow-y-auto bg-blue-gray-50 dark:bg-gray-800 h-auto top-8 sticky">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map(({ to, tabName, Icon }) => (
            <li>
              <Link
                to={to}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  activeTab === tabName ? 'bg-gray-100' : ''
                }`}
                onClick={() => setActiveTab(tabName)}
              >
                <Icon width={20} height={18} />
                <span className="ms-3 first-letter:capitalize">{tabName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
