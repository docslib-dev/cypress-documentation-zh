import { inject } from '@vercel/analytics';

// 在客户端初始化Vercel Analytics
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  try {
    inject({
      mode: 'production',
      debug: false,
    });
    console.log('Vercel Analytics initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize Vercel Analytics:', error);
  }
}