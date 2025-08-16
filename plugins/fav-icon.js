module.exports = async function favIcon(context) {
  return {
    injectHtmlTags({ content }) {
      return {
        name: 'docusaurus-plugin-favicon',
        headTags: [
          // 标准favicon - 确保搜索引擎优先识别
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/x-icon',
              href: '/favicon.ico',
              sizes: 'any',
            },
          },
          // 添加多种尺寸的favicon以提高兼容性
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/png',
              href: '/favicon.ico',
              sizes: '32x32',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/png',
              href: '/favicon.ico',
              sizes: '16x16',
            },
          },
          // SVG favicon (现代浏览器)
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/svg+xml',
              href: '/favicon.svg',
            },
          },
          // Apple Touch Icon (iOS设备)
          {
            tagName: 'link',
            attributes: {
              rel: 'apple-touch-icon',
              href: '/favicon.ico',
              sizes: '180x180',
            },
          },
          // Microsoft Tile Icon (Windows)
          {
            tagName: 'meta',
            attributes: {
              name: 'msapplication-TileImage',
              content: '/favicon.ico',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'msapplication-TileColor',
              content: '#172a3a',
            },
          },
          // 主题色 (移动端浏览器)
          {
            tagName: 'meta',
            attributes: {
              name: 'theme-color',
              content: '#172a3a',
            },
          },
          // 确保搜索引擎能够找到图标 - 添加多个备用方案
          {
            tagName: 'link',
            attributes: {
              rel: 'shortcut icon',
              href: '/favicon.ico',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              href: '/favicon.ico',
            },
          },
          // 添加manifest文件引用（可选）
          {
            tagName: 'link',
            attributes: {
              rel: 'manifest',
              href: '/manifest.json',
            },
          },
        ],
      }
    },
  };
};
