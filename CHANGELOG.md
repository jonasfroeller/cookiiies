# [2.3.0](https://github.com/jonasfroeller/cookiiies/compare/v2.2.0...v2.3.0) (2025-05-27)


### Features

* **cookies:** make cookie components customizable (text, topics, styling) ([8244dff](https://github.com/jonasfroeller/cookiiies/commit/8244dff2a358581f48b7e1407a9e904a20c264f3))

# [2.2.0](https://github.com/jonasfroeller/cookiiies/compare/v2.1.0...v2.2.0) (2025-05-27)


### Features

* **styling:** implement 'cc:' prefix for Tailwind CSS classes to prevent collisions ([7ff0e52](https://github.com/jonasfroeller/cookiiies/commit/7ff0e5280998ba7062a4900510d630462329a1f2))

# [2.1.0](https://github.com/jonasfroeller/cookiiies/compare/v2.0.0...v2.1.0) (2025-05-27)


### Features

* **styling:** bundle TailwindCSS directly in build output ([7828c34](https://github.com/jonasfroeller/cookiiies/commit/7828c34becf847de2f6dbf8f0a1d8875fec808f9))

# [2.0.0](https://github.com/jonasfroeller/cookiiies/compare/v1.1.0...v2.0.0) (2025-05-27)


### Features

* **tailwind:** upgrade to Tailwind CSS v4 ([b1a66da](https://github.com/jonasfroeller/cookiiies/commit/b1a66da77685830e435597dbce282bcedf23ef2a))


### BREAKING CHANGES

* **tailwind:** Migrated the project from Tailwind CSS v3 to v4.
This major upgrade includes:
- Migration of Tailwind configuration from `tailwind.config.js` to `src/app.css` using `@theme`, `@utility`, and `@keyframes`.
- Deletion of `tailwind.config.js` and update of `postcss.config.cjs`.
- Integration of `@tailwindcss/vite` plugin.
- Removal of `autoprefixer` as it's now built into Tailwind CSS v4.
- Adjustments to `src/app.css` including cleanup of redundant v3 compatibility styles.

This version introduces breaking changes from Tailwind CSS v3. All UI components and styles require thorough review and testing to ensure compatibility and address any visual regressions or behavior changes due to updated utility names, default values, and Preflight styles.

# [1.1.0](https://github.com/jonasfroeller/cookiiies/compare/v1.0.0...v1.1.0) (2025-05-26)


### Features

* **cookies:** conditionally render cookie consent components depending on cookie presence and improve close behavior ([e43dd66](https://github.com/jonasfroeller/cookiiies/commit/e43dd6629a9634c248d1c64161ad88ccd49f86d9))

# 1.0.0 (2025-05-26)


### Bug Fixes

* **packaging:** ensure runtime dependencies are correctly declared ([ef7036b](https://github.com/jonasfroeller/cookiiies/commit/ef7036b94181e36fded99aadc0714a98674a535a))
