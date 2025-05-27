<script lang="ts">
	import { setCookieStyleContext, type CookieStyleContextProps, defaultCookieTexts } from './CookieStyleContext.js';
	import type { Snippet } from 'svelte';

	let {
		// Texts
		titleText = defaultCookieTexts.title,
		descriptionText = defaultCookieTexts.description,
		detailedInfoTriggerText = defaultCookieTexts.detailedInfoTrigger,
		storageDurationTitleText = defaultCookieTexts.storageDurationTitle,
		storageDurationDetailsText = defaultCookieTexts.storageDurationText,
		legalBasisTitleText = defaultCookieTexts.legalBasisTitle,
		legalBasisDetailsText = defaultCookieTexts.legalBasisText,
		legalBasisStrictlyNecessaryText = defaultCookieTexts.legalBasisStrictlyNecessary,
		legalBasisConsentText = defaultCookieTexts.legalBasisConsent,
		dataSharingTitleText = defaultCookieTexts.dataSharingTitle,
		dataSharingDetailsText = defaultCookieTexts.dataSharingText,
		rejectAllButtonText = defaultCookieTexts.rejectAllButton,
		confirmSelectionButtonText = defaultCookieTexts.confirmSelectionButton,
		cancelButtonText = defaultCookieTexts.cancelButton,
		acceptAllButtonText = defaultCookieTexts.acceptAllButton,
		cookieNameLabelText = defaultCookieTexts.cookieNameLabel,
		cookieValueLabelText = defaultCookieTexts.cookieValueLabel,
		cookieDaysLabelText = defaultCookieTexts.cookieDaysLabel,
		secureLabelText = defaultCookieTexts.secureLabel,
		sameSiteLabelText = defaultCookieTexts.sameSiteLabel,
		setCookieButtonText = defaultCookieTexts.setCookieButton,
		updateCookieButtonText = defaultCookieTexts.updateCookieButton,
		currentCookiesTitleText = defaultCookieTexts.currentCookiesTitle,
		noCookiesFoundText = defaultCookieTexts.noCookiesFoundText,
		cookieTableNameHeaderText = defaultCookieTexts.cookieTableNameHeader,
		cookieTableValueHeaderText = defaultCookieTexts.cookieTableValueHeader,
		cookieTableActionsHeaderText = defaultCookieTexts.cookieTableActionsHeader,
		deleteButtonText = defaultCookieTexts.deleteButton,
		categoryRequiredChipText = defaultCookieTexts.categoryRequiredChipText,

		// Cookie Categories
		cookieCategories,
		cookieCategoryTextOverrides,

		// CSS Variable values
		titleTextColor,
		titleBackgroundColor,
		descriptionParagraphTextColor,
		descriptionParagraphBackgroundColor,

		// Switch specific colors
		switchCheckedBgColor,
		switchUncheckedBgColor,
		switchThumbColor,

		// Styling classes
		titleClass,
		descriptionClass,
		descriptionParagraphClass,
		contentWrapperClass,
		headerClass,
		footerClass,
		categoryListClass,
		categoryItemClass,
		categorySwitchClass,
		categoryTextWrapperClass,
		categoryNameClass,
		categoryNameRequiredClass,
		categoryDescriptionClass,
		accordionRootClass,
		accordionItemClass,
		accordionTriggerClass,
		accordionContentClass,
		scrollAreaWrapperClass,
		scrollAreaClass,
		detailedInfoBoxClass,
		detailedInfoParagraphClass,
		detailedInfoStrongClass,
		detailedInfoListClass,
		detailedInfoListItemClass,

		// Button variants
		rejectAllButtonVariant,
		confirmSelectionButtonVariant,
		cancelButtonVariant,
		acceptAllButtonVariant,
		defaultButtonVariant,
		destructiveButtonVariant,
		outlineButtonVariant,
		secondaryButtonVariant,

		// CookieTester and general form elements styling
		formInputClass,
		formSelectClass,
		formLabelClass,
		formSwitchClass,
		formFlexContainerClass,
		formButtonContainerClass,
		testerRootClass,
		testerGridClass,
		testerFieldWrapperClass,
		tableWrapperClass,

		children
	}: CookieStyleContextProps & { children?: Snippet } = $props();

	setCookieStyleContext({
		// Texts
		titleText,
		descriptionText,
		detailedInfoTriggerText,
		storageDurationTitleText,
		storageDurationDetailsText,
		legalBasisTitleText,
		legalBasisDetailsText,
		legalBasisStrictlyNecessaryText,
		legalBasisConsentText,
		dataSharingTitleText,
		dataSharingDetailsText,
		rejectAllButtonText,
		confirmSelectionButtonText,
		cancelButtonText,
		acceptAllButtonText,
		cookieNameLabelText,
		cookieValueLabelText,
		cookieDaysLabelText,
		secureLabelText,
		sameSiteLabelText,
		setCookieButtonText,
		updateCookieButtonText,
		currentCookiesTitleText,
		noCookiesFoundText,
		cookieTableNameHeaderText,
		cookieTableValueHeaderText,
		cookieTableActionsHeaderText,
		deleteButtonText,
		categoryRequiredChipText,

		// Cookie Categories
		cookieCategories,
		cookieCategoryTextOverrides,

		// CSS Variable values
		titleTextColor,
		titleBackgroundColor,
		descriptionParagraphTextColor,
		descriptionParagraphBackgroundColor,

		// Switch specific colors
		switchCheckedBgColor,
		switchUncheckedBgColor,
		switchThumbColor,

		// Styling classes
		titleClass,
		descriptionClass,
		descriptionParagraphClass,
		contentWrapperClass,
		headerClass,
		footerClass,
		categoryListClass,
		categoryItemClass,
		categorySwitchClass,
		categoryTextWrapperClass,
		categoryNameClass,
		categoryNameRequiredClass,
		categoryDescriptionClass,
		accordionRootClass,
		accordionItemClass,
		accordionTriggerClass,
		accordionContentClass,
		scrollAreaWrapperClass,
		scrollAreaClass,
		detailedInfoBoxClass,
		detailedInfoParagraphClass,
		detailedInfoStrongClass,
		detailedInfoListClass,
		detailedInfoListItemClass,

		// Button variants
		rejectAllButtonVariant,
		confirmSelectionButtonVariant,
		cancelButtonVariant,
		acceptAllButtonVariant,
		defaultButtonVariant,
		destructiveButtonVariant,
		outlineButtonVariant,
		secondaryButtonVariant,

		// CookieTester and general form elements styling
		formInputClass,
		formSelectClass,
		formLabelClass,
		formSwitchClass,
		formFlexContainerClass,
		formButtonContainerClass,
		testerRootClass,
		testerGridClass,
		testerFieldWrapperClass,
		tableWrapperClass
	});
</script>

{#if children}
	{@render children()}
{/if}
