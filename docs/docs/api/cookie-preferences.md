# Cookie Preferences

A Svelte store that manages cookie consent preferences with predefined categories and persistence.

## Features

- Predefined cookie categories with descriptions
- State persistence using `CookieManager`
- TypeScript support with proper types
- Toggle functionality for categories
- Batch operations (accept all, reject all)
- Automatic loading of saved preferences

## Types

```ts
interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  checked: boolean;
}
```

## Store Structure

The store maintains the following state:

```ts
interface CookiePreferencesStore {
  categories: CookieCategory[];
  showDetails: boolean;
}
```

## Default Categories

The store comes with four predefined categories:

1. Essential Cookies (required)
2. Functional Cookies (optional)
3. Analytics Cookies (optional)
4. Marketing Cookies (optional)

## Store Methods

| Method | Description |
|--------|-------------|
| `toggleDetails()` | Toggles the visibility of detailed information |
| `toggleSelected(category)` | Toggles the checked state of a specific category |
| `acceptAll()` | Accepts all cookie categories and saves preferences |
| `acceptSelected()` | Saves the current selection of cookie preferences |
| `rejectAll()` | Rejects all optional categories and saves preferences |
| `loadPreferences()` | Loads saved preferences from cookie storage |
| `updateCategory(id, checked)` | Updates a specific category's checked state and saves |

## Usage

```ts
import { cookiePreferences } from 'cookiiies';

// Subscribe to store changes
cookiePreferences.subscribe(state => {
  console.log('Categories:', state.categories);
  console.log('Show details:', state.showDetails);
});

// Toggle details visibility
cookiePreferences.toggleDetails();

// Accept all cookies
cookiePreferences.acceptAll();

// Reject all optional cookies
cookiePreferences.rejectAll();

// Toggle specific category
cookiePreferences.toggleSelected({
  id: 'analytics',
  name: 'Analytics Cookies',
  description: 'These cookies help us understand usage.',
  required: false,
  checked: false
});

// Update specific category
cookiePreferences.updateCategory('analytics', true);

// Load saved preferences
cookiePreferences.loadPreferences();
```

## Persistence

Preferences are automatically saved to a cookie named `cookie_preferences` when using:
- `acceptAll()`
- `acceptSelected()`
- `rejectAll()`
- `updateCategory()`

The cookie is set with:
- 365 days expiration
- Secure flag enabled
- JSON stringified preferences object

## Best Practices

1. **Load Preferences on Mount**
```ts
import { onMount } from 'svelte';
import { cookiePreferences } from 'cookiiies';

onMount(() => {
  cookiePreferences.loadPreferences();
});
```

2. **Handle Required Categories**
```ts
// Required categories cannot be unchecked
const isRequired = category.required;
if (!isRequired) {
  cookiePreferences.toggleSelected(category);
}
```

3. **React to Changes**
```ts
cookiePreferences.subscribe(({ categories }) => {
  const analyticsEnabled = categories.find(c => c.id === 'analytics')?.checked;
  if (analyticsEnabled) {
    // Initialize analytics
  }
});
```
