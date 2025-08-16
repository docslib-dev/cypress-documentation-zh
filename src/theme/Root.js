import React from 'react';
import VercelAnalytics from '../components/VercelAnalytics';

// 包装根组件以注入Vercel Analytics
export default function Root({ children }) {
  return (
    <>
      {children}
      <VercelAnalytics />
    </>
  );
}