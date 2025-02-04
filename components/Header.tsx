'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { appConfig } from '@/lib/config';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events to update header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `
    fixed w-full top-0 z-50 transition-all duration-300 ease-in-out
    ${isScrolled 
      ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-2' 
      : 'bg-transparent py-4'}
  `;

  const navItemClasses = `
    relative text-gray-700 dark:text-gray-200 hover:text-[#21568a] dark:hover:text-white
    transition-colors duration-200 px-4 py-2
    before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0
    before:h-0.5 before:bg-[#21568a] dark:before:bg-white
    before:transition-all before:duration-300 hover:before:w-full
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider text-[#21568a] dark:text-white hover:opacity-80 transition-opacity">
            {appConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {appConfig.navigation.main.map((item) => (
              <React.Fragment key={item.name}>
                {item.external ? (
                  <a
                    href={item.path}
                    className={navItemClasses}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link href={item.path} className={navItemClasses}>
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-4 p-2 text-gray-700 dark:text-gray-200 hover:text-[#21568a] dark:hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-2">
                {appConfig.navigation.main.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.external ? (
                      <a
                        href={item.path}
                        className="block py-2 text-gray-700 dark:text-gray-200 hover:text-[#21568a] dark:hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        href={item.path}
                        className="block py-2 text-gray-700 dark:text-gray-200 hover:text-[#21568a] dark:hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;