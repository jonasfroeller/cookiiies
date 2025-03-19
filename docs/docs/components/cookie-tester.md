# CookieTester

A development tool for testing and managing cookies in your application. This component provides a user-friendly interface for creating, viewing, and managing cookies.

## Features

- Create and manage cookies with a visual interface
- Configure cookie attributes (secure, SameSite, expiration)
- View all existing cookies in a table format
- Delete individual cookies
- Copy cookie values to form for editing
- Real-time cookie list updates
- Browser-only functionality

## Usage

```svelte
<script lang="ts">
  import { CookieTester } from 'cookiiies';
</script>

<CookieTester />
```

## Component Interface

### Cookie Form Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| Cookie Name | `string` | `''` | Name of the cookie |
| Cookie Value | `string` | `''` | Value to store in the cookie |
| Valid Days | `number` | `365` | Number of days until expiration |
| Secure | `boolean` | `true` | Whether the cookie is secure |
| SameSite | `'Lax' \| 'Strict' \| 'None'` | `'Lax'` | SameSite attribute value |

### Actions

- **Set Cookie**: Creates a new cookie with the specified values
- **Update Cookie**: Updates an existing cookie with new values
- **Delete**: Removes a specific cookie
- **Copy to Form**: Copies cookie name and value to the form fields

## Error Handling

The component provides feedback for common operations:
- Alert when trying to set a cookie that already exists
- Alert when trying to update a non-existent cookie
- Alert when trying to delete a non-existent cookie

## Best Practices

1. **Development Usage**
```svelte
{#if import.meta.env.DEV}
  <CookieTester />
{/if}
```

2. **Testing Cookie Operations**
```svelte
<!-- Test different SameSite values -->
<CookieTester />
```

3. **Cookie Management**
```svelte
<!-- Place in a development-only route -->
<div class="p-8">
  <CookieTester />
</div>
```
