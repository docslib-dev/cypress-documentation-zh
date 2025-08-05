module.exports = async function seoOptimizer(context) {
  return {
    name: 'docusaurus-plugin-seo-optimizer',
    injectHtmlTags({ content }) {
      return {
        headTags: [
          // 确保每个页面都有基本的meta description
          {
            tagName: 'meta',
            attributes: {
              name: 'description',
              content: 'Cypress官方文档中文版，为浏览器中运行的任何内容提供快速、简单且可靠的测试。',
            },
          },
          // 添加robots meta标签
          {
            tagName: 'meta',
            attributes: {
              name: 'robots',
              content: 'index, follow',
            },
          },
          // 添加viewport meta标签
          {
            tagName: 'meta',
            attributes: {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          },
          // 添加charset
          {
            tagName: 'meta',
            attributes: {
              charset: 'utf-8',
            },
          },
          // 添加语言标识
          {
            tagName: 'meta',
            attributes: {
              'http-equiv': 'content-language',
              content: 'zh-CN',
            },
          },
          // 添加canonical URL
          {
            tagName: 'link',
            attributes: {
              rel: 'canonical',
              href: 'https://cypress.docslib.dev',
            },
          },
          // 添加结构化数据
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Cypress 官方文档中文版',
              description: 'Cypress官方文档中文版，为浏览器中运行的任何内容提供快速、简单且可靠的测试。',
              url: 'https://cypress.docslib.dev',
              publisher: {
                '@type': 'Organization',
                name: 'Cypress.io',
                url: 'https://www.cypress.io',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://cypress.docslib.dev/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          },
        ],
      };
    },
  };
}; 