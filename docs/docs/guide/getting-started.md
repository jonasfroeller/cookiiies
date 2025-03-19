# Getting Started with Cookiiies

Cookiiies is a collection of beautiful, customizable cookie consent components for Svelte applications. Built with TypeScript and designed for modern web applications, it provides everything you need to implement GDPR-compliant cookie consent in your Svelte projects.

## Features

- 🎨 **Beautiful Components**: Pre-built, customizable cookie consent components
- ♿ **Accessibility First**: WCAG 2.1 compliant with full keyboard navigation and screen reader support
- 🌗 **Dark Mode Ready**: Seamless light and dark theme switching
- 📱 **Responsive Design**: Works seamlessly across all common device sizes
- ✨ **TypeScript Ready**: Full TypeScript support with type definitions
- 🔒 **GDPR Compliant**: Helps you meet cookie consent requirements
- 🎯 **Easy Integration**: Simple API for managing cookie preferences
- 🛠 **Customizable**: Extensive styling and configuration options

## Quick Start

1. Install the package:

```sh [ni]
npm i -g @antfu/ni
```

```sh [ni]
ni cookiiies
```

2. Import and use the components:

```svelte
<script lang="ts">
  import { CookieBanner } from 'cookiiies';
</script>

<!-- Dark mode is automatically detected from system preferences -->
<CookieBanner />
```

## Available Components

- **CookieBanner**: A traditional banner-style cookie consent component
- **CookieSidebar**: A sidebar-style cookie preferences manager
- **CookiePopup**: A modal popup for cookie consent
- **CookieTester**: A development tool for testing cookie settings

Ready to dive deeper? Check out our [`cookie-banner` component documentation](/components/cookie-banner) for detailed usage instructions and examples.

## Sandbox

<iframe src="https://codesandbox.io/p/github/jonasfroeller/cookiiies/main?embed=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
