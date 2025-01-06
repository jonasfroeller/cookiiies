/**
 * Cookie manager for **client-side** cookie operations
 * 
 * @see
 * [W3Schools](https://www.w3schools.com/js/js_cookies.asp) for the base implementation  
 * [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265) for the RFC specification
 * 
 * The following attributes can only be set by the server via Set-Cookie header:
 * - `HttpOnly`
 * - `Domain`
 * - `Path`
 * 
 * **Non-Standard attributes**
 * - `Priority`
 * - `Partition Key`
 * - `Cross Site`
 * 
 * The following attributes are calculated by the browser:
 * - `Size`
 * 
 * According to [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265):
 * - Only name-value pairs are accessible via document.cookie
 * - Only (name,) value, max-age (expires), secure and sameSite can be set- and updated by client-side JavaScript
 * - Cookie attributes are managed internally by the browser
 */
export namespace Cookie {
    export type SameSite = 'Strict' | 'Lax' | 'None';

    export interface Options {
        days?: number;
        secure?: boolean;
        sameSite?: SameSite;
    }
}

export class CookieManager {
    /**
     * Sets a cookie with the given name, value and options
     * Returns false if validation fails or cookie already exists (unless force is true)
     */
    static set(
        name: string,
        value: string,
        options: Cookie.Options = {},
        force = false
    ): boolean {
        if (!name || !value) return false;
        if (!force && this.exists(name)) return false;

        const {
            days = 365,
            secure = true,
            sameSite = 'None'
        } = options;

        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

        const cookieString = [
            `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
            `expires=${date.toUTCString()}`,
            secure && 'secure',
            `SameSite=${sameSite}`
        ]
            .filter(Boolean)
            .join('; ');

        document.cookie = cookieString;
        return true;
    }

    /**
     * Gets a cookie value by name
     */
    static get(name: string): string | null {
        const nameEQ = encodeURIComponent(name) + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');

        for (let cookie of cookies) {
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }

    /**
     * Updates an existing cookie
     * Returns false if the cookie doesn't exist
     */
    static update(name: string, value: string, options: Cookie.Options = {}): boolean {
        if (!this.exists(name)) return false;
        this.set(name, value, options, true);
        return true;
    }

    /**
     * Deletes a cookie by name
     * Returns false if the cookie doesn't exist
     */
    static delete(name: string): boolean {
        if (!this.exists(name)) return false;
        this.set(name, 'DELETED', { days: -1 }, true);
        return true;
    }

    /**
     * Checks if a cookie exists
     */
    static exists(name: string): boolean {
        return this.get(name) !== null;
    }

    /**
     * Gets all cookies as an object
     * Returns an empty object if the document is undefined or the cookie string is empty
     */
    static getAll(): Record<string, string> {
        const cookies: Record<string, string> = {};
        if (typeof document === 'undefined') return cookies;

        const cookieList = document.cookie.split(';');
        for (const cookie of cookieList) {
            const [name, value] = cookie.split('=').map((part) => part.trim());
            if (name && value !== undefined) {
                cookies[name] = value;
            }
        }
        return cookies;
    }
}
