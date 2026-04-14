'use client';

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

export default function Home() {
  const { currentPage } = useStore();

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && (
          <>
            <div className="pt-4 sm:pt-6">
              <HeroSlider />
            </div>
            <CategoryGrid />
            <DailyTip />
            <LatestArticles />
            <LatestRecipes />
          </>
        )}

        {currentPage === 'category' && <CategoryPage />}
        {currentPage === 'article' && <ArticlePage />}
        {currentPage === 'recipe' && <RecipePage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'search' && <CategoryPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'register' && <LoginPage />}
        {currentPage === 'profile' && <ProfilePage />}
      </main>

      <SearchModal />
      <Footer />
    </div>
  );
}
