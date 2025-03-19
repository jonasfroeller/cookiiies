# Basic Usage

Cookiiies provides several components for managing cookie consent. Here's how to use them in your Svelte application.

## Using CookieBanner

The banner is a drawer-style component for managing cookie preferences, with a default open state.

```svelte
<script lang="ts">
  import { CookieBanner } from 'cookiiies';
  let isOpen = true;
</script>

<CookieBanner open={isOpen} />
```

## Using CookieSidebar

The sidebar provides a slide-out interface for managing cookie preferences, with a default open state.

```svelte
<script lang="ts">
  import { CookieSidebar } from 'cookiiies';
  let isOpen = true;
</script>

<CookieSidebar open={isOpen} />
```

## Using CookiePopup

The popup is a modal dialog that appears in the center of the screen with a maximum width constraint.

```svelte
<script lang="ts">
  import { CookiePopup } from 'cookiiies';
  let isOpen = true;
</script>

<CookiePopup bind:open={isOpen} />
```

## Using CookieTester

A development tool for testing cookie operations. Only use this component during development.

```svelte
<script lang="ts">
  import { CookieTester } from 'cookiiies';
</script>

{#if import.meta.env.DEV}
  <CookieTester />
{/if}
```

## Managing Cookies

Use the `CookieManager` to programmatically manage cookies:

```typescript
import { CookieManager } from 'cookiiies';

// Set a cookie
const success = CookieManager.set('theme', 'dark', {
  days: 365,
  secure: true,
  sameSite: 'Lax'
});

if (!success) {
  console.error('Failed to set cookie');
}

// Get a cookie
const theme = CookieManager.get('theme');

// Check if a cookie exists
if (CookieManager.exists('theme')) {
  // Do something
}

// Delete a cookie
CookieManager.delete('theme');
```

## Managing Cookie Preferences

The `cookiePreferences` store helps manage cookie consent categories:

```typescript
import { cookiePreferences } from 'cookiiies';

// Accept all cookies
cookiePreferences.acceptAll();

// Reject all optional cookies
cookiePreferences.rejectAll();

// Save current selection
cookiePreferences.acceptSelected();

// Load saved preferences
cookiePreferences.loadPreferences();
```
