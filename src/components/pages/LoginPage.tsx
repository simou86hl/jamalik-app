'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/store/useStore';


export function LoginPage() {
  const { goBack, navigateTo } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="py-6 flex items-center justify-center min-h-[70vh] relative"
    >
      {/* Decorative blobs behind the form */}
      <div className="absolute top-10 -right-10 w-40 h-40 bg-primary/8 blob-1 opacity-60 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/8 blob-2 opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-accent/5 rounded-full animate-float pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer group"
        >
          <span className="glass-subtle rounded-full p-1.5 group-hover:bg-primary/10 transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
          العودة
        </motion.button>

        {/* Card - Glass-strong with animated gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="glass-strong gradient-border-animated rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-xl)]"
        >
          {/* Logo Area */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-18 h-18 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-glow)]"
            >
              <Sparkles className="h-9 w-9 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl font-heading font-bold text-text-main"
            >
              {isRegister ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-text-subtle text-sm mt-1.5"
            >
              {isRegister ? 'انضمي إلى مجتمع جمالكِ' : 'أهلاً بعودتكِ'}
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name Field (Register only) */}
            {isRegister && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="text-xs font-medium text-text-subtle mb-1.5 block">الاسم</label>
                <div className="relative group">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="w-full pr-10 pl-4 py-3 glass-subtle rounded-xl text-sm text-text-main placeholder:text-text-subtle/40
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                      border border-transparent focus:border-primary/30 transition-all duration-300"
                  />
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="text-xs font-medium text-text-subtle mb-1.5 block">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pr-10 pl-4 py-3 glass-subtle rounded-xl text-sm text-text-main placeholder:text-text-subtle/40
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                    border border-transparent focus:border-primary/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-medium text-text-subtle mb-1.5 block">كلمة المرور</label>
              <div className="relative group">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 glass-subtle rounded-xl text-sm text-text-main placeholder:text-text-subtle/40
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30
                    border border-transparent focus:border-primary/30 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password (Login only) */}
            {!isRegister && (
              <div className="text-left">
                <button type="button" className="text-xs text-primary hover:text-primary-dark cursor-pointer transition-colors">
                  نسيتي كلمة المرور؟
                </button>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary w-full py-3 text-sm cursor-pointer glow-primary-hover"
            >
              {isRegister ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </motion.button>
          </motion.form>

          {/* Toggle Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="text-center text-sm text-text-subtle mt-7"
          >
            {isRegister ? 'لديكِ حساب بالفعل؟' : 'ليس لديكِ حساب؟'}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-gradient font-semibold cursor-pointer hover:opacity-80 transition-opacity"
            >
              {isRegister ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
