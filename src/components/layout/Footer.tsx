'use client';

import { SITE_NAME, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import {
  Heart, Sparkles, Camera, MessageCircle, Users,
  Tv, Send, Film, Brain, GitCompareArrows, Gift,
  Bell, Globe, Shirt, ChefHat, Scissors, Dumbbell,
  Palette, Leaf, Mail, ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CategorySlug, SitePage } from '@/types';

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Camera,
  twitter: MessageCircle,
  facebook: Users,
  tiktok: Film,
  youtube: Tv,
  snapchat: Send,
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  fashion: Shirt,
  cooking: ChefHat,
  skincare: Sparkles,
  haircare: Scissors,
  fitness: Dumbbell,
  beauty: Palette,
  health: Heart,
  natural: Leaf,
};

const MORE_ICONS: Record<string, React.ElementType> = {
  Brain,
  GitCompareArrows,
  Gift,
  Bell,
};

export function Footer() {
  const { navigateTo, selectCategory } = useStore();

  const handleCategoryClick = (slug: string) => {
    selectCategory(slug as CategorySlug);
    navigateTo('category');
  };

  const handlePageNav = (page: SitePage) => {
    navigateTo(page);
  };

  return (
    <footer className="bg-gradient-hero mt-12 pb-20 lg:pb-0 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* ─── Top Bar: Brand + Newsletter (compact) ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-border/30">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-[var(--shadow-glow)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-heading font-bold text-gradient block leading-tight">
                {SITE_NAME}
              </span>
              <p className="text-[11px] text-text-subtle leading-tight mt-0.5">
                دليلك الشامل للجمال والعناية
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] || MessageCircle;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full glass-subtle flex items-center justify-center text-text-subtle transition-all duration-300 hover:bg-gradient-primary hover:text-white hover:shadow-[var(--shadow-glow)] hover:scale-110 cursor-pointer"
                  aria-label={social.name}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>

          {/* Newsletter Mini */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-subtle/50" />
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full pr-9 pl-4 py-2 text-xs glass-subtle rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:shadow-[var(--shadow-glow)] text-text-main placeholder:text-text-subtle/40 transition-all duration-300"
              />
            </div>
            <button className="btn-primary text-xs px-4 py-2 whitespace-nowrap">
              اشتراك
            </button>
          </div>
        </div>

        {/* ─── Main Sections Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-border/30">
          {/* ── الأقسام (7 categories as pill chips) ── */}
          <div className="md:col-span-5">
            <h3 className="font-heading font-bold text-gradient text-sm mb-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-primary/10 flex items-center justify-center">
                <span className="text-[10px]">✦</span>
              </div>
              الأقسام
            </h3>
            <div className="flex flex-wrap gap-2">
              {FOOTER_LINKS.categories.slice(0, 7).map((cat, i) => {
                const Icon = CATEGORY_ICONS[cat.slug];
                return (
                  <motion.button
                    key={cat.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-subtle text-text-subtle hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all duration-300 cursor-pointer group hover:shadow-[var(--shadow-sm)]"
                  >
                    {Icon && <Icon className="h-3 w-3 group-hover:text-primary transition-colors" />}
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── روابط مفيدة ── */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-gradient text-sm mb-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-primary/10 flex items-center justify-center">
                <span className="text-[10px]">◈</span>
              </div>
              روابط مفيدة
            </h3>
            <ul className="space-y-1">
              {FOOTER_LINKS.about.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => handlePageNav(link.page)}
                    className="text-xs text-text-subtle hover:text-primary transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 group py-0.5"
                  >
                    <ArrowLeft className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── المزيد ── */}
          <div className="md:col-span-4">
            <h3 className="font-heading font-bold text-gradient text-sm mb-3 flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-primary/10 flex items-center justify-center">
                <span className="text-[10px]">❖</span>
              </div>
              المزيد
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {FOOTER_LINKS.more.map((link, i) => {
                const Icon = MORE_ICONS[link.icon];
                return (
                  <motion.button
                    key={link.page}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handlePageNav(link.page)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-text-subtle hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
                  >
                    {Icon && <Icon className="h-3 w-3 group-hover:text-primary transition-colors" />}
                    <span className="truncate">{link.label}</span>
                  </motion.button>
                );
              })}
              {/* Language */}
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: FOOTER_LINKS.more.length * 0.04 }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-text-subtle hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer group"
              >
                <Globe className="h-3 w-3 group-hover:text-primary transition-colors" />
                <span className="truncate">اللغة العربية</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-text-subtle flex items-center gap-1">
            © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.
            <Heart className="h-3 w-3 text-primary fill-primary animate-pulse-heart" />
          </p>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-text-subtle/60 hover:text-primary transition-colors cursor-pointer"
                aria-label={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
