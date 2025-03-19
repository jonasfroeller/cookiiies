import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'Cookiiies',
  description: 'Beautiful Cookie Consent Components for Svelte',
  head: [
    ['link', { rel: 'icon', href: '/cookie.svg' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/cookie-banner' },
      { text: 'API', link: '/api/cookie-manager' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Basic Usage', link: '/guide/basic-usage' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'CookieBanner', link: '/components/cookie-banner' },
          { text: 'CookieSidebar', link: '/components/cookie-sidebar' },
          { text: 'CookiePopup', link: '/components/cookie-popup' },
          { text: 'CookieTester', link: '/components/cookie-tester' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'CookieManager', link: '/api/cookie-manager' },
          { text: 'Cookie Preferences', link: '/api/cookie-preferences' }
        ]
      }
    ]
  },
});
