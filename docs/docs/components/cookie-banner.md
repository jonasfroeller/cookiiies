# CookieBanner

A drawer-style cookie consent banner that provides an interface for managing cookie preferences.

## Features

- Built with Drawer component for smooth animations
- Fully accessible with ARIA support
- Responsive design
- Simple interface for managing cookie preferences
- Default open state

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { CookieBanner } from 'cookiiies';
</script>

<CookieBanner />
```

### With Custom Initial State

```svelte
<script lang="ts">
  import { CookieBanner } from 'cookiiies';
  let isOpen = true;
</script>

<CookieBanner open={isOpen} />
```

## Component Structure

The CookieBanner uses a drawer layout with the following structure:
- Drawer component for slide-in/out animation
- Header with title and description
- Content section with cookie preference controls
- Built-in close functionality

```svelte
<CookieBanner>
  <Drawer.Root>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Cookie Preferences</Drawer.Title>
        <Drawer.Description>
          We use cookies to enhance your experience on our website.
          Here you can manage your preferences.
        </Drawer.Description>
      </Drawer.Header>
      
      <CookiePreferencesContent />
    </Drawer.Content>
  </Drawer.Root>
</CookieBanner>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls the visibility of the banner |

## Best Practices

1. **Initial State**: Consider your users' experience by choosing an appropriate initial state:
```svelte
<CookieBanner open={!hasUserConsented} />
```

2. **Content Clarity**: The component provides a clear description of cookie usage:
```svelte
<CookieBanner />
```
