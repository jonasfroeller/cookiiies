<script lang="ts">
  import CookiePopup from '../../lib/components/CookiePopup.svelte';
  import { CookieStyle } from '../../lib/components/cookie-style/index.js';
  import CookieTester from '../../lib/components/CookieTester.svelte';
  import type { CookieCategory } from '../../lib/utils/cookie-preferences.js';

  const customCookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      name: 'Essential Cookies',
      description: 'These cookies are absolutely necessary for the website to function properly.',
      required: true,
      checked: true
    },
    {
      id: 'analytics',
      name: 'Analytics & Performance Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
      checked: false
    }
  ];
</script>

<div class="cc:p-4 cc:bg-gray-50">
  <h1 class="cc:text-3xl cc:font-bold cc:mb-2">CookieStyle Comprehensive Demo</h1>
  <h2 class="cc:text-xl cc:font-semibold cc:mb-6">Targeting: &lt;CookieTester /&gt; and &lt;CookiePopup /&gt; with Custom Categories & Full Styling</h2>

  <CookieStyle
    cookieCategories={customCookieCategories}
    testerRootClass="cc:bg-gradient-to-br cc:from-indigo-700 cc:to-purple-800 cc:text-gray-100 cc:p-8 cc:rounded-xl cc:shadow-xl cc:my-5"
    testerGridClass="cc:grid-cols-1 lg:cc:grid-cols-2 cc:gap-8 cc:mb-8"
    testerFieldWrapperClass="cc:border-b-2 cc:border-purple-500 cc:pb-4"
    formLabelClass="cc:text-yellow-300 cc:text-xs cc:font-mono cc:uppercase cc:tracking-wider cc:mb-1 cc:block"
    formInputClass="cc:bg-purple-600 cc:text-white cc:border-yellow-400 cc:rounded-sm cc:p-3 cc:w-full focus:cc:ring-2 focus:cc:ring-yellow-300 focus:cc:border-transparent placeholder:cc:text-purple-300"
    formSelectClass="cc:bg-purple-600 cc:text-white cc:border-yellow-400 cc:rounded-sm cc:p-3 focus:cc:ring-2 focus:cc:ring-yellow-300 w-full"
    formSwitchClass="data-[state=checked]:cc:bg-green-400 data-[state=unchecked]:cc:bg-slate-600"
    formFlexContainerClass="cc:flex cc:flex-col md:cc:flex-row md:cc:items-end md:cc:space-x-6 cc:space-y-4 md:cc:space-y-0 cc:my-8"
    formButtonContainerClass="cc:flex cc:gap-5 cc:mt-8"
    cookieNameLabelText="[CONFIGURED] Cookie ID (Name)"
    cookieValueLabelText="[CONFIGURED] Cookie Payload (Value)"
    cookieDaysLabelText="[CONFIGURED] Expires In (Days)"
    secureLabelText="[CONFIGURED] Secure Flag (HTTPS)"
    sameSiteLabelText="[CONFIGURED] SameSite Attribute"
    setCookieButtonText="[CONFIGURED] Create New Cookie"
    updateCookieButtonText="[CONFIGURED] Revise Existing Cookie"
    currentCookiesTitleText="[CONFIGURED] Live Browser Cookie Jar"
    tableWrapperClass="cc:border-4 cc:border-dashed cc:border-purple-400 cc:rounded-lg cc:overflow-x-auto cc:mt-5 cc:p-1"
    cookieTableNameHeaderText="[CONFIGURED] Key"
    cookieTableValueHeaderText="[CONFIGURED] Data"
    cookieTableActionsHeaderText="[CONFIGURED] Operations"
    deleteButtonText="[CONFIGURED] Erase"
    defaultButtonVariant="default"
    outlineButtonVariant="outline"
    destructiveButtonVariant="destructive"
    secondaryButtonVariant="secondary"
    titleTextColor="#E0F2FE"
    titleBackgroundColor="#38BDF8"
    descriptionParagraphTextColor="#075985"
    descriptionParagraphBackgroundColor="#7DD3FC"
    titleText="[CONFIGURED] Filtered Cookie Categories"
    descriptionText="[CONFIGURED] Managing only Essential and Analytics preferences."
    titleClass="cc:p-3 cc:text-[var(--cc-title-text-color)] cc:bg-[var(--cc-title-bg-color)] cc:rounded-md"
    descriptionClass="cc:text-sm cc:text-slate-400 cc:mt-2"
    descriptionParagraphClass="cc:p-2 cc:text-[var(--cc-desc-p-text-color)] cc:bg-[var(--cc-desc-p-bg-color)] cc:italic cc:rounded"
    headerClass="cc:border-b-2 cc:border-sky-500 cc:pb-4 cc:mb-4"
    contentWrapperClass="cc:px-2 cc:border-x-2 cc:border-green-500 cc:py-3"
    footerClass="cc:mt-6 cc:p-4 cc:bg-slate-800 cc:border-t-2 cc:border-sky-500 cc:rounded-b-md"
    rejectAllButtonText="[CONFIGURED] Deny All"
    confirmSelectionButtonText="[CONFIGURED] Save Choices"
    cancelButtonText="[CONFIGURED] Revert"
    acceptAllButtonText="[CONFIGURED] Allow All Cookies"
    rejectAllButtonVariant="destructive"
    confirmSelectionButtonVariant="default"
    cancelButtonVariant="secondary"
    acceptAllButtonVariant="default"
    categoryListClass="cc:space-y-3 cc:p-2 cc:bg-slate-700 cc:rounded"
    categoryItemClass="cc:bg-slate-800 cc:border-slate-600 cc:rounded-lg cc:p-3 cc:shadow-md hover:cc:bg-slate-700/50"
    categorySwitchClass="focus-visible:cc:ring-2 focus-visible:cc:ring-offset-2 focus-visible:cc:ring-emerald-400 focus-visible:cc:ring-offset-slate-800"
    categoryTextWrapperClass="cc:ml-3"
    categoryNameClass="cc:text-emerald-300 cc:font-semibold"
    categoryNameRequiredClass="cc:text-xs cc:text-red-400 cc:italic"
    categoryDescriptionClass="cc:text-slate-400 cc:text-sm mt-1"
    categoryRequiredChipText="(Mandatory Field)"
    detailedInfoTriggerText="[CONFIGURED] Click for Legal Details"
    accordionRootClass="cc:mt-5 cc:border cc:border-yellow-500 cc:rounded-md"
    accordionItemClass="cc:border-b cc:border-yellow-600 last:cc:border-b-0"
    accordionTriggerClass="hover:cc:bg-yellow-700/20 cc:p-3 cc:text-yellow-300 data-[state=open]:cc:text-yellow-100"
    accordionContentClass="cc:bg-yellow-900/30 cc:p-0"
    scrollAreaWrapperClass="cc:p-0"
    scrollAreaClass="cc:h-[120px] cc:w-full cc:border-t cc:border-yellow-700"
    detailedInfoBoxClass="cc:p-3 cc:text-sm cc:text-yellow-200 cc:bg-yellow-800/30 space-y-2"
    detailedInfoParagraphClass="cc:leading-normal cc:text-yellow-100/90"
    detailedInfoStrongClass="cc:text-yellow-300 cc:font-bold"
    detailedInfoListClass="cc:list-disc cc:pl-5 cc:text-yellow-100/80"
    detailedInfoListItemClass="cc:mb-1"
    switchCheckedBgColor="#10B981"
    switchUncheckedBgColor="#D1D5DB"
    switchThumbColor="#FFFFFF"
  >
    <CookieTester />
    <CookiePopup />
  </CookieStyle>
</div>

<style>
</style>
