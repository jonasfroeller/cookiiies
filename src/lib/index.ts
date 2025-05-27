import './app.css'; // will be true in final build
import CookiePopup__SvelteComponent_ from "./components/CookiePopup.svelte";
import CookieBanner__SvelteComponent_ from "./components/CookieBanner.svelte";
import CookieSidebar__SvelteComponent_ from "./components/CookieSidebar.svelte";
import CookieStyle__SvelteComponent_ from "./components/cookie-style/CookieStyle.svelte";
import { CookieManager } from "./utils/cookie.js";
import { cookiePreferences } from "./utils/cookie-preferences.js";

// Cookie Components and Managers
export {
    CookieBanner__SvelteComponent_ as CookieBanner,
    CookieSidebar__SvelteComponent_ as CookieSidebar,
    CookiePopup__SvelteComponent_ as CookiePopup,
    CookieStyle__SvelteComponent_ as CookieStyler,
    CookieManager,
    cookiePreferences
};

// Cookie Style
export {
    type CookieStyleContextProps,
    type CookieCategoryTextOverride,
	getCookieStyleContext,
	defaultCookieTexts
} from '$components/cookie-style/index.js';

// Cookie Types
export type { Cookie } from "$lib/utils/cookie.js";
export type {
    CookieCategory,
    CookiePreferencesStore
} from "$lib/utils/cookie-preferences.js";
