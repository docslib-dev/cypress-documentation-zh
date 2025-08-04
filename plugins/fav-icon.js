module.exports = async function favIcon(context) {
  return {
    injectHtmlTags({ content }) {
      return {
        name: 'docusaurus-plugin-favicon',
        headTags: [
          // 标准favicon
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              type: 'image/x-icon',
              href: '/favicon.ico',
              sizes: 'any',
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
          // 确保搜索引擎能够找到图标
          {
            tagName: 'link',
            attributes: {
              rel: 'shortcut icon',
              href: '/favicon.ico',
            },
          },
        ],
      }
    },
  };
};
