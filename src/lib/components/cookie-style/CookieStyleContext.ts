import { getContext, setContext } from 'svelte';
import type { ButtonVariant } from '../ui/button/button.svelte';
import type { CookieCategory } from '$lib/utils/cookie-preferences.js';

export const defaultCookieTexts = {
	title: 'Cookie Preferences',
	description: 'We use cookies to enhance your experience on our website. Here you can manage your preferences.',
	detailedInfoTrigger: 'Detailed Cookie Information',
	storageDurationTitle: 'Storage Duration:',
	storageDurationText:
		'The storage duration of cookies varies depending on their purpose. Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a period specified in each cookie, which may range from a few minutes to several years, but we regularly review and update our cookies to ensure they are not kept longer than necessary.',
	legalBasisTitle: 'Legal Basis:',
	legalBasisText: 'We rely on different legal bases depending on the type of cookie:',
	legalBasisStrictlyNecessary: 'For strictly necessary cookies: Art. 6(1)(f) GDPR (legitimate interests)',
	legalBasisConsent: 'For performance, functionality, marketing, and analytics cookies: Art. 6(1)(a) GDPR (Consent)',
	dataSharingTitle: 'Data Sharing:',
	dataSharingText:
		'We do not share data collected by strictly necessary cookies. For performance, functionality, marketing, and analytics cookies, data may be shared with third parties only with your explicit consent.',
	rejectAllButton: 'Reject All',
	confirmSelectionButton: 'Confirm Selection',
	cancelButton: 'Cancel',
	acceptAllButton: 'Accept All',
	// For CookieTester
	cookieNameLabel: 'Cookie Name',
	cookieValueLabel: 'Cookie Value',
	cookieDaysLabel: 'Valid Days',
	secureLabel: 'Secure',
	sameSiteLabel: 'SameSite',
	setCookieButton: 'Set Cookie',
	updateCookieButton: 'Update Cookie',
	currentCookiesTitle: 'Current Cookies',
	noCookiesFoundText: 'No cookies found',
	cookieTableNameHeader: 'Name',
	cookieTableValueHeader: 'Value',
	cookieTableActionsHeader: 'Actions',
	deleteButton: 'Delete',
	// Default category texts (can be overridden by provided categories or categoryTextOverrides)
	defaultCategoryNameEssential: 'Essential Cookies',
	defaultCategoryDescriptionEssential: 'These cookies are necessary for the basic functionality of the website.',
	defaultCategoryNameFunctional: 'Functional Cookies',
	defaultCategoryDescriptionFunctional: 'These cookies enable enhanced functionality and personalization.',
	defaultCategoryNameAnalytics: 'Analytics Cookies',
	defaultCategoryDescriptionAnalytics: 'These cookies help us understand and improve how visitors use the website.',
	defaultCategoryNameMarketing: 'Marketing Cookies',
	defaultCategoryDescriptionMarketing: 'These cookies are used to make advertising more relevant to you.',
	categoryRequiredChipText: '(Required)'
};

export type CookieCategoryTextOverride = {
	id: string; // Corresponds to CookieCategory.id
	name?: string;
	description?: string;
};

export type CookieStyleContextProps = {
	// Texts
	titleText?: string;
	descriptionText?: string;
	detailedInfoTriggerText?: string;
	storageDurationTitleText?: string;
	storageDurationDetailsText?: string;
	legalBasisTitleText?: string;
	legalBasisDetailsText?: string;
	legalBasisStrictlyNecessaryText?: string;
	legalBasisConsentText?: string;
	dataSharingTitleText?: string;
	dataSharingDetailsText?: string;
	rejectAllButtonText?: string;
	confirmSelectionButtonText?: string;
	cancelButtonText?: string;
	acceptAllButtonText?: string;
	cookieNameLabelText?: string;
	cookieValueLabelText?: string;
	cookieDaysLabelText?: string;
	secureLabelText?: string;
	sameSiteLabelText?: string;
	setCookieButtonText?: string;
	updateCookieButtonText?: string;
	currentCookiesTitleText?: string;
	noCookiesFoundText?: string;
	cookieTableNameHeaderText?: string;
	cookieTableValueHeaderText?: string;
	cookieTableActionsHeaderText?: string;
	deleteButtonText?: string;
	categoryRequiredChipText?: string;

	// Cookie Categories and their text overrides
	cookieCategories?: CookieCategory[];
	cookieCategoryTextOverrides?: CookieCategoryTextOverride[];

	// CSS Variable passthroughs
	// These would be set as CSS custom properties on the target elements
	// For example, on AlertDialog.Title, style="--cc-title-text-color: var(styleCtx.titleTextColor);"
	// Then titleClass can use var(--cc-title-text-color)
	titleTextColor?: string;
	titleBackgroundColor?: string;
	descriptionParagraphTextColor?: string;
	descriptionParagraphBackgroundColor?: string;

	// Switch component specific colors
	switchCheckedBgColor?: string;
	switchUncheckedBgColor?: string;
	switchThumbColor?: string;

	// Styling classes
	titleClass?: string;
	descriptionClass?: string; // For container like Drawer.Description
	descriptionParagraphClass?: string; // For the <p> tag inside description if needed
	contentWrapperClass?: string; // For CookiePreferencesContent inside Banner/Popup
	headerClass?: string; // For Drawer.Header etc.
	footerClass?: string; // For the button group in CookiePreferencesContent

	// CookiePreferencesContent category styling
	categoryListClass?: string; // Wrapper for categories
	categoryItemClass?: string;
	categorySwitchClass?: string;
	categoryTextWrapperClass?: string;
	categoryNameClass?: string;
	categoryNameRequiredClass?: string;
	categoryDescriptionClass?: string;

	// CookiePreferencesContent Accordion styling
	accordionRootClass?: string;
	accordionItemClass?: string;
	accordionTriggerClass?: string;
	accordionContentClass?: string; // Wrapper for scrollarea div
	scrollAreaWrapperClass?: string; // explicit wrapper for scroll area if needed.
	scrollAreaClass?: string;
	detailedInfoBoxClass?: string;
	detailedInfoParagraphClass?: string;
	detailedInfoStrongClass?: string;
	detailedInfoListClass?: string;
	detailedInfoListItemClass?: string;

	// Button variants
	rejectAllButtonVariant?: ButtonVariant;
	confirmSelectionButtonVariant?: ButtonVariant;
	cancelButtonVariant?: ButtonVariant;
	acceptAllButtonVariant?: ButtonVariant;

	// General button variants
	defaultButtonVariant?: ButtonVariant;
	destructiveButtonVariant?: ButtonVariant;
	outlineButtonVariant?: ButtonVariant;
	secondaryButtonVariant?: ButtonVariant;

	// CookieTester and general form elements styling
	formInputClass?: string;
	formSelectClass?: string;
	formLabelClass?: string;
	formSwitchClass?: string; // For the Switch component itself if needed
	formFlexContainerClass?: string; // For flex items like days, secure, samesite
	formButtonContainerClass?: string; // for set/update button group
	testerRootClass?: string;
	testerGridClass?: string;
	testerFieldWrapperClass?: string; // for div containing label + input
	tableWrapperClass?: string; // For the div wrapping Table.Root
};

const COOKIE_STYLE_CONTEXT_KEY = Symbol('cookieStyleContext');

export function setCookieStyleContext(props: CookieStyleContextProps) {
	setContext(COOKIE_STYLE_CONTEXT_KEY, props);
}

export function getCookieStyleContext(): CookieStyleContextProps {
	return getContext<CookieStyleContextProps>(COOKIE_STYLE_CONTEXT_KEY) || {};
}
