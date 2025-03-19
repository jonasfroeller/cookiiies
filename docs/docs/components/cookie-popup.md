# CookiePopup

A modal dialog component for managing cookie preferences, built on top of an accessible AlertDialog component.

## Features

- Built with AlertDialog for robust modal functionality
- Fully accessible with ARIA support
- Responsive design with max-width constraint
- Simple interface for managing cookie preferences
- Default open state

## Usage

### Basic Usage

```svelte
<script lang="ts">
  import { CookiePopup } from 'cookiiies';
</script>

<CookiePopup />
```

### With Custom Initial State

```svelte
<script lang="ts">
  import { CookiePopup } from 'cookiiies';
  let isOpen = true;
</script>

<CookiePopup bind:open={isOpen} />
```

## Component Structure

The CookiePopup uses an AlertDialog layout with the following structure:
- Modal dialog with maximum width of 2xl
- Header with title and description
- Content section with cookie preference controls
- Built-in close functionality

```svelte
<CookiePopup>
  <AlertDialog.Root>
    <AlertDialog.Content class="max-w-2xl">
      <AlertDialog.Header>
        <AlertDialog.Title>Cookie Preferences</AlertDialog.Title>
        <AlertDialog.Description>
          We use cookies to enhance your experience on our website.
          Here you can manage your preferences.
        </AlertDialog.Description>
      </AlertDialog.Header>
      
      <CookiePreferencesContent />
    </AlertDialog.Content>
  </AlertDialog.Root>
</CookiePopup>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls the visibility of the popup |

## Best Practices

1. **Initial State**: Consider your users' experience by choosing an appropriate initial state:
```svelte
<CookiePopup open={!hasUserConsented} />
```

2. **Content Clarity**: The component provides a clear description of cookie usage:
```svelte
<CookiePopup />
```
