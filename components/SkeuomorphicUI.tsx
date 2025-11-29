import React from 'react';

// --- Header ---
export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-white/10 sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {children}
    </div>
  </header>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'neutral' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'neutral', className = '', ...props }) => {
  const baseClass = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300";
  let variantClass = '';
  
  switch (variant) {
    case 'primary':
      // Gradient or glowing effect for primary
      variantClass = 'bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 shadow-lg shadow-blue-500/30 border border-transparent';
      break;
    case 'danger':
      variantClass = 'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-500 shadow-lg shadow-red-500/30 border border-transparent';
      break;
    case 'ghost':
      variantClass = 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white';
      break;
    default:
      // Neutral button with subtle depth
      variantClass = 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm';
  }

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-dark-card rounded-xl border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-2xl dark:shadow-black/20 ${className}`}>
    {children}
  </div>
);

// --- Input Fields ---
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...props }) => (
  <input
    className={`w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ${className}`}
    {...props}
  />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...props }) => (
  <textarea
    className={`w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ${className}`}
    {...props}
  />
);

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5">
    {children}
  </span>
);

// --- Theme Toggle ---
export const ThemeToggle: React.FC<{ isDark: boolean; toggle: () => void }> = ({ isDark, toggle }) => (
  <button 
    onClick={toggle}
    className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
    title="切换主题"
  >
    {isDark ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )}
  </button>
);