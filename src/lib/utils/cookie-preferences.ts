import { writable, get } from 'svelte/store';
import { CookieManager } from './cookie.js';

const COOKIE_NAME = 'cookie_preferences';

export interface CookieCategory {
    id: string;
    name: string;
    description: string;
    required: boolean;
    checked: boolean;
}

interface CookiePreferencesStore {
    categories: CookieCategory[];
    showDetails: boolean;
}

function createCookiePreferences() {
    const initialState: CookiePreferencesStore = {
        categories: [
            {
                id: 'necessary',
                name: 'Essential Cookies',
                description: 'These cookies are necessary for the basic functionality of the website.',
                required: true,
                checked: true
            },
            {
                id: 'functional',
                name: 'Functional Cookies',
                description: 'These cookies enable enhanced functionality and personalization.',
                required: false,
                checked: false
            },
            {
                id: 'analytics',
                name: 'Analytics Cookies',
                description: 'These cookies help us understand and improve how visitors use the website.',
                required: false,
                checked: false
            },
            {
                id: 'marketing',
                name: 'Marketing Cookies',
                description: 'These cookies are used to make advertising more relevant to you.',
                required: false,
                checked: false
            }
        ],
        showDetails: false
    };

    const store = writable<CookiePreferencesStore>(initialState);
    const { subscribe, update } = store;

    const savePreferences = () => {
        const state = get(store);
        const preferences = state.categories.reduce(
            (acc, category) => {
                acc[category.id] = category.checked;
                return acc;
            },
            {} as Record<string, boolean>
        );

        CookieManager.set(COOKIE_NAME, JSON.stringify(preferences), { days: 365, secure: true });
    };

    return {
        subscribe,
        toggleDetails: () => {
            update(state => ({
                ...state,
                showDetails: !state.showDetails
            }));
        },
        acceptAll: () => {
            update(state => ({
                ...state,
                categories: state.categories.map(category => ({
                    ...category,
                    checked: true
                }))
            }));
            savePreferences();
        },
        acceptSelected: () => {
            savePreferences();
        },
        rejectAll: () => {
            update(state => ({
                ...state,
                categories: state.categories.map(category => ({
                    ...category,
                    checked: category.required
                }))
            }));
            savePreferences();
        },
        loadPreferences: () => {
            const savedPreferences = CookieManager.get(COOKIE_NAME);
            if (savedPreferences) {
                const preferences = JSON.parse(savedPreferences);
                update(state => ({
                    ...state,
                    categories: state.categories.map(category => ({
                        ...category,
                        checked: category.required ? true : preferences[category.id] ?? false
                    }))
                }));
            }
        },
        updateCategory: (id: string, checked: boolean) => {
            update(state => ({
                ...state,
                categories: state.categories.map(category =>
                    category.id === id ? { ...category, checked } : category
                )
            }));
            savePreferences();
        }
    };
}

export const cookiePreferences = createCookiePreferences();
