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
      className="py-6 flex items-center justify-center min-h-[70vh]"
    >
      <div className="w-full max-w-md">
        {/* Back */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-text-subtle hover:text-primary transition-colors mb-6 cursor-pointer"
        >
          <ArrowRight className="h-4 w-4" /> العودة
        </button>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-text-main">
              {isRegister ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </h1>
            <p className="text-text-subtle text-sm mt-1">
              {isRegister ? 'انضمي إلى مجتمع جمالكِ' : 'أهلاً بعودتكِ'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-xs font-medium text-text-subtle mb-1.5 block">الاسم</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="w-full pr-10 pl-4 py-3 bg-input-bg border border-border rounded-xl text-sm text-text-main placeholder:text-text-subtle/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-text-subtle mb-1.5 block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pr-10 pl-4 py-3 bg-input-bg border border-border rounded-xl text-sm text-text-main placeholder:text-text-subtle/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-subtle mb-1.5 block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 bg-input-bg border border-border rounded-xl text-sm text-text-main placeholder:text-text-subtle/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text-main cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {!isRegister && (
              <div className="text-left">
                <button type="button" className="text-xs text-primary hover:text-primary-dark cursor-pointer">
                  نسيتي كلمة المرور؟
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-colors cursor-pointer text-sm"
            >
              {isRegister ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-text-subtle mt-6">
            {isRegister ? 'لديكِ حساب بالفعل؟' : 'ليس لديكِ حساب؟'}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary font-medium hover:text-primary-dark cursor-pointer"
            >
              {isRegister ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
