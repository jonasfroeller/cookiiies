# Cookiiies

[![npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://www.npmjs.com)
[![total npm downloads](https://badgen.net/npm/dt/cookiiies)](https://www.npmjs.com/package/cookiiies)
[![latest npm release](https://img.shields.io/npm/v/cookiiies)](https://www.npmjs.com/package/cookiiies?activeTab=versions)
[![npm package license](https://badgen.net/npm/license/cookiiies)](https://www.npmjs.com/package/cookiiies)

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```bash
pnpm run package
```

To create a production version of your showcase app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

```bash
npm publish
```
