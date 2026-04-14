'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { DailyTip } from '@/components/home/DailyTip';
import { LatestArticles } from '@/components/home/LatestArticles';
import { LatestRecipes } from '@/components/home/LatestRecipes';
import { SearchModal } from '@/components/shared/SearchModal';
import { CategoryPage } from '@/components/pages/CategoryPage';
import { ArticlePage } from '@/components/pages/ArticlePage';
import { RecipePage } from '@/components/pages/RecipePage';
import { FavoritesPage } from '@/components/pages/FavoritesPage';
import { LoginPage } from '@/components/pages/LoginPage';
import { ProfilePage } from '@/components/pages/ProfilePage';

const pageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.995 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.998,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number] },
  },
};

export default function Home() {
  const { currentPage } = useStore();

  return (
    <div className="min-h-screen bg-bg flex flex-col relative">
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 pattern-dots opacity-[0.03] pointer-events-none z-0" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="pt-4 sm:pt-6">
                <HeroSlider />
              </div>
              <CategoryGrid />
              <DailyTip />
              <LatestArticles />
              <LatestRecipes />
            </motion.div>
          )}

          {(currentPage === 'category' || currentPage === 'search') && (
            <motion.div
              key={`category-${currentPage}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CategoryPage />
            </motion.div>
          )}

          {currentPage === 'article' && (
            <motion.div
              key="article"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ArticlePage />
            </motion.div>
          )}

          {currentPage === 'recipe' && (
            <motion.div
              key="recipe"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RecipePage />
            </motion.div>
          )}

          {currentPage === 'favorites' && (
            <motion.div
              key="favorites"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <FavoritesPage />
            </motion.div>
          )}

          {(currentPage === 'login' || currentPage === 'register') && (
            <motion.div
              key={`login-${currentPage}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <LoginPage />
            </motion.div>
          )}

          {currentPage === 'profile' && (
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProfilePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SearchModal />
      <Footer />
    </div>
  );
}
