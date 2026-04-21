import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cn } from '../../utils/cn';
import Sidebar from './Sidebar';
import AuthNavbar from './AuthNavbar';
import useTheme from '../../hooks/useTheme';

/**
 * DashboardLayout - Main layout for authenticated users
 * Refined to Flexbox architecture to avoid sidebar overlapping issues.
 */
const DashboardLayout = () => {
  const { isDark } = useTheme();

  return (
    <div className={cn(
      'min-h-screen transition-colors duration-300 font-body flex overflow-hidden',
      isDark ? 'dark bg-slate-950 text-white' : 'bg-gray-50/30 text-slate-900'
    )}>
      {/* Sidebar Navigation - Controlled fixed width flex child */}
      <Sidebar />

      {/* Main Content Area - Flexible scrollable area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        <AuthNavbar />

        <main className="flex-grow p-4 md:p-8" id="main-content">
          <div className="max-w-[1600px] mx-auto animate-fade-in pb-20">
            <Outlet />
          </div>
        </main>

        <footer className="px-8 py-6 border-t border-gray-100 dark:border-slate-800 text-center md:text-left bg-white/50 dark:bg-slate-950/50 backdrop-blur-md">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            GyaanSetu Dashboard v1.0.0 — Build Phase
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
