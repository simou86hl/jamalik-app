'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ARTICLES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { ArticleCard } from '@/components/cards/ArticleCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function LatestArticles() {
  const { navigateTo, selectCategory } = useStore();
  const latest = [...ARTICLES].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 6);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-main">
              أحدث المقالات
            </h2>
            <p className="text-text-subtle text-xs">اطلعي على الجديد في عالم الجمال</p>
          </div>
        </div>
        <button
          onClick={() => {
            selectCategory('fashion');
            navigateTo('category');
          }}
          className="hidden sm:flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
        >
          عرض الكل <ArrowLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {latest.map((article) => (
          <motion.div
            key={article.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
