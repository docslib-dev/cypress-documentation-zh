// @ts-check
// 注意：类型注解允许类型检查和IDE自动补全

const darkCodeTheme = require('./src/theme/prism-material-oceanic')
const { default: remarkDirective } = require('remark-directive')

const fs = require('fs')
const {
  copyTsToJs,
  cypressConfigPluginExample,
  cypressConfigExample,
  visitMountExample,
} = require('./plugins/cypressRemarkPlugins/dist')
const prettierConfig = JSON.parse(fs.readFileSync('./.prettierrc', 'utf-8'))

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cypress 官方文档中文版',
  tagline: '为浏览器中运行的任何内容提供快速、简单且可靠的测试。',
  url: 'https://cypress.docslib.dev',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/favicon.ico',

  // 即使不使用国际化，也可以使用此字段设置有用的元数据，如html lang。
  // 例如，如果您的站点是中文的，您可能希望将"en"替换为"zh-Hans"。
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/cypress-io/cypress-documentation/tree/main/',
          routeBasePath: '/',
          remarkPlugins: [
            remarkDirective,
            cypressConfigExample,
            cypressConfigPluginExample,
            visitMountExample,
            [
              copyTsToJs,
              {
                prettierOptions: {
                  ...prettierConfig,
                  parser: 'typescript',
                },
              },
            ],
          ],
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        googleAnalytics: {
          trackingID: 'UA-59606812-1',
        },
        googleTagManager: {
          containerId: 'GTM-KNKBWLD',
        },
      },
    ],
  ],

  plugins: [
    [
      './plugins/osano',
      {
        id: 'docs-osano',
      },
    ],
    [
      './plugins/fav-icon',
      {
        id: 'docs-fav-icon',
      },
    ],
    [
      './plugins/fullstory',
      {
        id: 'docs-fullstory',
      },
    ],
    'docusaurus-plugin-sass',
    require.resolve('docusaurus-plugin-image-zoom'),
    // ....
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // 追加TailwindCSS和AutoPrefixer。
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      image: 'img/logo/cypress-logo-circle-dark.png',
      navbar: {
        style: 'dark',
        logo: {
          href: '/app/get-started/why-cypress',
          alt: 'Cypress 标志',
          src: '/img/logo/cypress-logo-light.svg',
          srcDark: '/img/logo/cypress-logo-dark.svg',
        },
        items: [
          {
            to: '/app/get-started/why-cypress',
            label: '应用',
            activeBasePath: 'app',
          },
          {
            to: '/api/table-of-contents',
            label: 'API',
            activeBasePath: 'api',
          },
          {
            to: '/cloud/get-started/introduction',
            label: '云服务',
            activeBasePath: 'cloud',
          },
          {
            to: '/ui-coverage/get-started/introduction',
            label: 'UI覆盖率',
            activeBasePath: 'ui-coverage',
          },
          {
            to: '/accessibility/get-started/introduction',
            label: '无障碍性',
            activeBasePath: 'accessibility',
          },
          {
            to: 'https://learn.cypress.io?utm_medium=nav&utm_source=docs.cypress.io&utm_content=Learn',
            label: '学习',
          },
        ],
      },
      // 可选，可以注释掉
      // 样式在src/css/announcement-bar.scss中控制
      announcementBar: {
        //给id一个唯一值以使新的公告栏出现
        id: 'ga-ui-cov-a11y',
        content: `📢 新功能！使用<a href="https://www.cypress.io/accessibility?utm_medium=accouncement-banner&utm_source=docs.cypress.io&utm_content=Cypress Accessibility">Cypress 无障碍性</a>或<a href="https://www.cypress.io/ui-coverage?utm_medium=announcement-banner&utm_source=docs.cypress.io&utm_content=UI Coverage">UI覆盖率</a>即时洞察提升应用质量。`,
        isCloseable: true,
      },
      footer: {
        style: 'dark',
        links: [
           {
            title: '解决方案',
            items: [
              {
                label: 'Cypress 应用',
                href: 'https://www.cypress.io/features?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Cypress App',
              },
              {
                label: 'Cypress 云服务',
                href: 'https://www.cypress.io/cloud?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Cypress Cloud',
              },
              {
                label: 'UI覆盖率',
                href: 'https://www.cypress.io/ui-coverage?utm_medium=footer&utm_source=docs.cypress.io&utm_content=UI Coverage',
              },
              {
                label: 'Cypress 无障碍性',
                href: 'https://www.cypress.io/accessibility?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Cypress Accessibility',
              },
            ],
          },
          {
            title: '学习',
            items: [
              {
                label: '真实世界应用',
                href: 'https://github.com/cypress-io/cypress-realworld-app',
              },
              {
                label: '真实世界测试',
                href: 'https://learn.cypress.io',
              },
              {
                label: 'Cypress.io YouTube',
                href: 'https://www.youtube.com/channel/UC-EOsTo2l2x39e4JmSaWNRQ',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Discord',
                href: 'https://on.cypress.io/discord',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Cypress_io',
              },
              {
                label: 'GitHub 讨论',
                href: 'https://github.com/cypress-io/cypress/discussions',
              },
            ],
          },
          {
            title: '公司',
            items: [
              {
                label: '关于我们',
                href: 'https://www.cypress.io/about-us?utm_medium=footer&utm_source=docs.cypress.io&utm_content=About',
              },
              {
                label: 'Cypress 博客',
                href: 'https://www.cypress.io/blog?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Cypress Blog',
              },
              {
                label: '职业',
                href: 'https://www.cypress.io/careers?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Careers',
              },
              {
                label: '支持',
                href: 'https://www.cypress.io/support?utm_medium=footer&utm_source=docs.cypress.io&utm_content=Support',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Cypress.io。保留所有权利。`,
      },
      algolia: {
        // Algolia提供的应用ID
        appId: 'R9KDA5FMJB',

        // 公共API密钥：可以安全提交
        apiKey: 'b4af59e23bc2fa05281af7dcf13fcae5',

        indexName: 'cypress_docs',

        // 可选：见下文文档部分
        contextualSearch: false,

        // 可选：指定应通过window.location而不是history.push进行导航的域。
        // 当我们的Algolia配置爬取多个文档站点并希望通过window.location.href导航到它们时很有用。
        // externalUrlRegex: "external\\.com|domain\\.com",

        // 可选：Algolia搜索参数
        // searchParameters: {},

        // 可选：默认启用的搜索页面路径（`false`禁用）
        // searchPagePath: "search",

        //... 其他Algolia参数
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
      zoom: {
        selector: ':not(.mediaImage, .navbar__logo img, .logo, .br-ui)', // 不缩放这些图像
        background: {
          light: 'rgb(50, 50, 50)',
          dark: 'rgb(50, 50, 50)',
        },
        // 可以通过https://github.com/francoischalifour/medium-zoom#usage指定的选项
        config: {
          scrollOffset: 60,
          margin: 100,
        },
      },
    },
}

module.exports = config