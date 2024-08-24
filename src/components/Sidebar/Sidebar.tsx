import { useState } from 'react';
import { Link } from 'react-router-dom';

import IconHome from '@/assets/home.svg?react';
import IconUsers from '@/assets/users.svg?react';
import IconUserRoles from '@/assets/user-role-svgrepo-com.svg?react';
import IconMap from '@/assets/map-icon.svg?react';

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <aside
      id="logo-sidebar"
      className="w-64 h-auto h-screen-with-header transition-transform -translate-x-full bg-blue-gray-200 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <nav className="px-3 pb-4 mt-8 overflow-y-auto bg-blue-gray-50 dark:bg-gray-800 h-auto top-8 sticky">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 'home' ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveTab('home')}
            >
              <IconHome />
              <span className="ms-3">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 'users' ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveTab('users')}
            >
              <IconUsers width={20} height={18} />
              <span className="ms-3">Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 'roles' ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveTab('roles')}
            >
              <IconUserRoles />
              <span className="ms-3">Roles</span>
            </Link>
          </li>

          <li>
            <Link
              to="/map"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                activeTab === 'map' ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveTab('map')}
            >
              <IconMap />
              <span className="ms-3">Map</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
