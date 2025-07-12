import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <motion.div
      className="fixed top-6 right-16 z-[100] flex items-center justify-end w-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Enhanced animated glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-full pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{
          boxShadow: isDark
            ? [
                '0 0 24px 8px #6366f1, 0 0 64px 16px #818cf8',
                '0 0 32px 12px #818cf8, 0 0 80px 24px #6366f1',
                '0 0 24px 8px #6366f1, 0 0 64px 16px #818cf8'
              ]
            : [
                '0 0 24px 8px #fbbf24, 0 0 64px 16px #f59e42',
                '0 0 32px 12px #f59e42, 0 0 80px 24px #fbbf24',
                '0 0 24px 8px #fbbf24, 0 0 64px 16px #f59e42'
              ]
        }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'loop' }}
      />
      {/* Main toggle container with enhanced backdrop */}
      <motion.button
        onClick={toggleTheme}
        className="btn icon-animate relative border-2 border-white/80 bg-white dark:bg-gray-900 shadow-lg"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        data-interactive="true"
        style={{ zIndex: 1 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-indigo-400/30 select-none"
          animate={{
            backgroundPosition: isDark ? ['0% 50%', '100% 50%', '0% 50%'] : ['100% 50%', '0% 50%', '100% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        />
        {/* Sliding pill indicator */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-blue-400 dark:to-purple-400 shadow-lg flex items-center justify-center select-none border border-white/80"
          animate={{
            x: isDark ? 20 : -20,
            rotate: isDark ? 180 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.5
          }}
        >
          <motion.div
            animate={{
              rotate: isDark ? 180 : 0,
              scale: isDark ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
            className="text-white select-none"
          >
            {isDark ? (
              <FaSun className="w-4 h-4" />
            ) : (
              <FaMoon className="w-4 h-4" />
            )}
          </motion.div>
        </motion.div>
        {/* Background icons (subtle) */}
        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-20 select-none">
          <FaSun className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
          <FaMoon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
        </div>
        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 select-none"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      {/* Tooltip with enhanced backdrop */}
      <motion.div
        className="absolute top-14 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap shadow-lg border border-gray-200/50 dark:border-gray-700/50 select-none"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 2 }}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </motion.div>
    </motion.div>
  );
};

export default DarkModeToggle; 