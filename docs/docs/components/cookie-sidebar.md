# CookieSidebar

A slide-out sidebar component for managing cookie preferences, built on top of an accessible Sheet component.

## Features

- Built with Sheet component for smooth slide-out animation
- Fully accessible with ARIA support
- Responsive design
- Simple interface for managing cookie preferences
- Default open state

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { CookieSidebar } from 'cookiiies';
</script>

<CookieSidebar />
```

### With Custom Initial State

```svelte
<script lang="ts">
  import { CookieSidebar } from 'cookiiies';
  let initiallyOpen = false;
</script>

<CookieSidebar open={initiallyOpen} />
```

## Component Structure

The CookieSidebar uses a Sheet layout with the following structure:
- Slide-out panel from the side of the screen
- Header with title and description
- Content section with cookie preference controls
- Built-in close functionality

```svelte
<CookieSidebar>
  <Sheet.Root>
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Cookie Preferences</Sheet.Title>
        <Sheet.Description>
          We use cookies to enhance your experience on our website.
          Here you can manage your preferences.
        </Sheet.Description>
      </Sheet.Header>
      
      <CookiePreferencesContent />
    </Sheet.Content>
  </Sheet.Root>
</CookieSidebar>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls the visibility of the sidebar |

## Best Practices

1. **Initial State**: Consider your users' experience by choosing an appropriate initial state:
```svelte
<CookieSidebar open={!hasUserConsented} />
```

2. **Content Clarity**: The component provides a clear description of cookie usage:
```svelte
<CookieSidebar />
```
