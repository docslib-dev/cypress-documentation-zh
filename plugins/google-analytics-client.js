import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // 确保gtag函数可用
  window.gtag = window.gtag || function() {
    (window.dataLayer = window.dataLayer || []).push(arguments);
  };

  // 监听Docusaurus路由变化
  const handleRouteChange = () => {
    if (window.gtag) {
      window.gtag('config', 'G-3FDPZ9D5QS', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  };

  // 监听popstate事件（浏览器前进/后退）
  window.addEventListener('popstate', handleRouteChange);

  // 监听pushstate和replacestate事件（程序化导航）
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(handleRouteChange, 0);
  };

  window.history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(handleRouteChange, 0);
  };

  console.log('Google Analytics 4 client initialized');
}