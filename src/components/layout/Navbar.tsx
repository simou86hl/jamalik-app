'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X, Heart, User, Home, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const {
    currentPage,
    navigateTo,
    isMobileMenuOpen,
    toggleMobileMenu,
    toggleSearch,
  } = useStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-card/95 backdrop-blur-md shadow-md border-b border-border'
            : 'bg-card/80 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-gradient">
                {SITE_NAME}
              </span>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.slug}
                  onClick={() =>
                    link.slug === 'home'
                      ? navigateTo('home')
                      : link.slug === 'search'
                        ? toggleSearch()
                        : link.slug === 'favorites'
                          ? navigateTo('favorites')
                          : navigateTo('category')
                  }
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                    currentPage === link.slug || (link.slug !== 'home' && link.slug !== 'search' && link.slug !== 'favorites' && currentPage === 'category')
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-text-subtle hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSearch}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label="بحث"
              >
                <Search className="h-5 w-5 text-text-subtle" />
              </button>

              <button
                onClick={() => navigateTo('favorites')}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer relative"
                aria-label="المفضلة"
              >
                <Heart className="h-5 w-5 text-text-subtle" />
              </button>

              <button
                onClick={() => navigateTo('login')}
                className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label="حسابي"
              >
                <User className="h-5 w-5 text-text-subtle" />
              </button>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label="القائمة"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-text-main" />
                ) : (
                  <Menu className="h-5 w-5 text-text-main" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={toggleMobileMenu}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-card z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full p-6">
                {/* Logo */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-heading font-bold text-gradient">
                      {SITE_NAME}
                    </span>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/10 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 flex-1">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.slug}
                      onClick={() => {
                        if (link.slug === 'home') navigateTo('home');
                        else if (link.slug === 'search') { toggleSearch(); toggleMobileMenu(); }
                        else if (link.slug === 'favorites') navigateTo('favorites');
                        else {
                          useStore.getState().selectCategory(link.slug as 'fashion');
                          navigateTo('category');
                        }
                        toggleMobileMenu();
                      }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer',
                        currentPage === link.slug
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-text-subtle hover:text-primary hover:bg-primary/5'
                      )}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>

                {/* User Actions */}
                <div className="border-t border-border pt-4 space-y-2">
                  <button
                    onClick={() => { navigateTo('login'); toggleMobileMenu(); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-subtle hover:text-primary hover:bg-primary/5 transition-all w-full cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    تسجيل الدخول
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border lg:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-4">
          <button
            onClick={() => navigateTo('home')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer',
              currentPage === 'home' ? 'text-primary' : 'text-text-subtle'
            )}
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-medium">الرئيسية</span>
          </button>

          <button
            onClick={toggleSearch}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-text-subtle transition-all cursor-pointer"
          >
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium">بحث</span>
          </button>

          <button
            onClick={() => navigateTo('favorites')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer',
              currentPage === 'favorites' ? 'text-primary' : 'text-text-subtle'
            )}
          >
            <Heart className="h-5 w-5" />
            <span className="text-[10px] font-medium">المفضلة</span>
          </button>

          <button
            onClick={() => navigateTo('login')}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all cursor-pointer',
              currentPage === 'login' || currentPage === 'profile' ? 'text-primary' : 'text-text-subtle'
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-medium">حسابي</span>
          </button>
        </div>
      </nav>
    </>
  );
}
