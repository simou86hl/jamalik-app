'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ARTICLES } from '@/data/seedData';
import { useStore } from '@/store/useStore';
import { ArticleCard } from '@/components/cards/ArticleCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] },
  },
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
      {/* Section header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-main">
              أحدث <span className="text-gradient">المقالات</span>
            </h2>
            <p className="text-text-subtle text-xs">اطلعي على الجديد في عالم الجمال</p>
          </div>
        </div>
        <button
          onClick={() => {
            selectCategory('fashion');
            navigateTo('category');
          }}
          className="btn-outline hidden sm:flex items-center gap-1.5 text-xs px-4 py-2 cursor-pointer"
        >
          عرض الكل <ArrowLeft className="h-3.5 w-3.5" />
        </button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {latest.map((article) => (
          <motion.div
            key={article.id}
            variants={itemVariants}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
