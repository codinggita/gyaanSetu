import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../utils/cn';

const Breadcrumbs = ({ items, className }) => {
  return (
    <nav className={cn("flex items-center space-x-2 text-xs font-bold uppercase tracking-widest", className)}>
      <Link 
        to="/" 
        className="flex items-center text-slate-400 hover:text-primary transition-colors"
      >
        <Home size={14} className="mr-1" />
        Home
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={12} className="text-slate-300" />
          {item.path ? (
            <Link 
              to={item.path} 
              className="text-slate-400 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-600 dark:text-slate-300">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
