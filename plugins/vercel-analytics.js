module.exports = function vercelAnalyticsPlugin(context, options) {
  const { siteConfig } = context;
  const isProd = process.env.NODE_ENV === 'production';
  
  return {
    name: 'vercel-analytics-plugin',
    
    // 在客户端加载时初始化Analytics
    getClientModules() {
      return isProd ? [require.resolve('./vercel-analytics-client.js')] : [];
    },
    
    // 注入Analytics脚本
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              defer: true,
              src: 'https://va.vercel-scripts.com/v1/script.js',
            },
          },
        ],
      };
    },
  };
};