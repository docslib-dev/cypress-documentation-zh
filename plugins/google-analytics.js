module.exports = function googleAnalyticsPlugin(context, options) {
  const { siteConfig } = context;
  const isProd = process.env.NODE_ENV === 'production';
  
  return {
    name: 'google-analytics-plugin',
    
    // 注入Google Analytics脚本
    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      
      return {
        headTags: [
          // Google Analytics 4 (gtag.js)
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://www.googletagmanager.com/gtag/js?id=G-3FDPZ9D5QS',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3FDPZ9D5QS', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                send_page_view: true,
                custom_map: {
                  'custom_parameter_1': 'site_type',
                  'custom_parameter_2': 'content_category'
                }
              });
              
              // 设置自定义参数
              gtag('config', 'G-3FDPZ9D5QS', {
                site_type: 'documentation',
                content_category: 'cypress-docs'
              });
            `,
          },
        ],
      };
    },
    
    // 在客户端模块中处理页面导航
    getClientModules() {
      return isProd ? [require.resolve('./google-analytics-client.js')] : [];
    },
  };
};