import React, { useEffect } from 'react';
import { inject } from '@vercel/analytics';

export default function VercelAnalytics() {
  useEffect(() => {
    // 只在客户端和生产环境执行
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      try {
        inject({
          mode: 'production',
          debug: false,
        });
        console.log('Vercel Analytics initialized via React component');
      } catch (error) {
        console.warn('Failed to initialize Vercel Analytics:', error);
      }
    }
  }, []);

  return null; // 这个组件不渲染任何内容
}