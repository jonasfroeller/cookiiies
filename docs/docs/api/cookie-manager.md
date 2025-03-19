# Cookie Manager

A client-side cookie management utility that provides a clean API for handling cookies in the browser, following RFC 6265 specifications.

## Features

- 🔒 Secure by default
- 🌐 SameSite attribute support
- 🔄 CRUD operations for cookies
- 📝 TypeScript ready
- 🧪 Input validation
- 🎯 RFC 6265 compliant

## Types

```ts
type SameSite = 'Strict' | 'Lax' | 'None';

interface Options {
  days?: number;      // Cookie expiration in days
  secure?: boolean;   // Secure flag
  sameSite?: SameSite // SameSite attribute
}
```

## Methods

### `set(name: string, value: string, options?: Options, force?: boolean): boolean`

Sets a new cookie. Returns `false` if validation fails or cookie already exists (unless forced).

```ts
CookieManager.set('userId', '123', {
  days: 7,
  secure: true,
  sameSite: 'Strict'
});
```

Default options:
- `days`: 365
- `secure`: true
- `sameSite`: 'None'

### `get(name: string): string | null`

Retrieves a cookie value by name. Returns `null` if not found.

```ts
const userId = CookieManager.get('userId');
```

### `update(name: string, value: string, options?: Options): boolean`

Updates an existing cookie. Returns `false` if cookie doesn't exist.

```ts
CookieManager.update('theme', 'light', {
  days: 30
});
```

### `delete(name: string): boolean`

Deletes a cookie. Returns `false` if cookie doesn't exist.

```ts
CookieManager.delete('userId');
```

### `exists(name: string): boolean`

Checks if a cookie exists.

```ts
if (CookieManager.exists('theme')) {
  // Cookie exists
}
```

### `getAll(): Record<string, string>`

Gets all cookies as a key-value object. Returns an empty object if document is undefined or cookie string is empty.

```ts
const cookies = CookieManager.getAll();
console.log(cookies); // { theme: 'dark', userId: '123' }
```

## Browser Limitations

According to RFC 6265:
- Only name-value pairs are accessible via `document.cookie`
- Only value, expiration, secure and sameSite can be modified client-side
- The following attributes can only be set by server via Set-Cookie header:
  - `HttpOnly`
  - `Domain`
  - `Path`
- The following attributes are non-standard:
  - `Priority`
  - `Partition Key`
  - `Cross Site`
- The `Size` attribute is calculated by the browser

## Best Practices

1. **Input Validation**
```ts
// Check return value for success/failure
const success = CookieManager.set('userId', '123');
if (!success) {
  console.error('Failed to set cookie');
}
```

2. **Error Handling**
```ts
// Handle non-existent cookies
const theme = CookieManager.get('theme');
if (theme === null) {
  // Handle missing cookie
}
```

3. **Cookie Cleanup**
```ts
// Delete cookies when no longer needed
CookieManager.delete('temporary_data');
```

4. **Secure Defaults**
```ts
// Uses secure defaults (secure: true, sameSite: 'None')
CookieManager.set('session', 'abc123');
```
