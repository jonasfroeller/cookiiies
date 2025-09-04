<script lang="ts">
	import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { ScrollArea } from './ui/scroll-area/index.js';
	import { cookiePreferences, type CookieCategory } from '$lib/utils/cookie-preferences.js';
	import { onMount } from 'svelte';
	import { getCookieStyleContext, defaultCookieTexts } from './cookie-style/index.js';
	import { cn } from '$lib/utils.js';

	let {
		class: className,
		onClose
	}: WithoutChild<AccordionPrimitive.ContentProps> & {
		onClose: () => void;
	} = $props();

	const styleCtx = getCookieStyleContext();
	let accordionValue = $state($cookiePreferences.showDetails ? 'details' : undefined);

	let categoriesToDisplay = $state<CookieCategory[]>([]);

	function handleToggle(category: CookieCategory) {
		if (!category.required) {
			cookiePreferences.toggleSelected(category);
		}
	}

	$effect(() => {
		accordionValue = $cookiePreferences.showDetails ? 'details' : undefined;
	});

	function getCategoryText(categoryId: string, field: 'name' | 'description', defaultText: string): string {
		const override = styleCtx.cookieCategoryTextOverrides?.find(o => o.id === categoryId);
		return override?.[field] ?? defaultText;
	}

	onMount(() => {
		if (styleCtx.cookieCategories && styleCtx.cookieCategories.length > 0) {
			cookiePreferences.initializeCategories(styleCtx.cookieCategories);
		}
		cookiePreferences.loadPreferences();

		const unsubscribe = cookiePreferences.subscribe(prefs => {
			categoriesToDisplay = prefs.categories.map(cat => ({
				...cat,
				name: getCategoryText(cat.id, 'name', cat.name),
				description: getCategoryText(cat.id, 'description', cat.description)
			}));
		});

		return unsubscribe;
	});
</script>

<div class={cn('cc:text-primary', className)}>
	<div class={cn('cc:space-y-4', styleCtx.categoryListClass)}>
		{#each categoriesToDisplay as category (category.id)}
			<div class={cn('cc:flex cc:items-start cc:p-4 cc:space-x-4 cc:rounded cc:border', styleCtx.categoryItemClass)}>
				<Switch
					class={styleCtx.categorySwitchClass}
					checked={category.checked}
					disabled={category.required}
					onCheckedChange={() => handleToggle(category)}
					checkedBgColor={styleCtx.switchCheckedBgColor}
					uncheckedBgColor={styleCtx.switchUncheckedBgColor}
					thumbColor={styleCtx.switchThumbColor}
				/>
				<div class={styleCtx.categoryTextWrapperClass}>
					<h3 class={cn('cc:font-semibold', styleCtx.categoryNameClass)}>
						{category.name}
						{#if category.required}
							<span class={styleCtx.categoryNameRequiredClass}> {styleCtx.categoryRequiredChipText ?? defaultCookieTexts.categoryRequiredChipText}</span>
						{/if}
					</h3>
					<p class={cn('cc:text-sm cc:text-gray-600', styleCtx.categoryDescriptionClass)}>{category.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class={cn('cc:mt-6', styleCtx.accordionRootClass)}>
		<Accordion.Root type="single" value={accordionValue}>
			<Accordion.Item value="details" class={styleCtx.accordionItemClass}>
				<Accordion.Trigger class={cn('cc:text-sm cc:font-medium', styleCtx.accordionTriggerClass)}>
					{styleCtx.detailedInfoTriggerText ?? defaultCookieTexts.detailedInfoTrigger}
				</Accordion.Trigger>
				<Accordion.Content class={styleCtx.accordionContentClass}>
					<div class={cn('cc:pt-2 cc:pb-4', styleCtx.scrollAreaWrapperClass)}>
						<ScrollArea oneLinePerScroll={true} class={cn('cc:h-[100px] cc:w-full', styleCtx.scrollAreaClass)}>
							<div class={cn('cc:p-4 cc:space-y-2 cc:text-sm cc:rounded-md cc:bg-secondary/50', styleCtx.detailedInfoBoxClass)}>
								<p class={cn('cc:leading-relaxed', styleCtx.detailedInfoParagraphClass)}>
									<strong class={styleCtx.detailedInfoStrongClass}>{styleCtx.storageDurationTitleText ?? defaultCookieTexts.storageDurationTitle}</strong>
									{styleCtx.storageDurationDetailsText ?? defaultCookieTexts.storageDurationText}
								</p>
								<p class={cn('cc:leading-relaxed', styleCtx.detailedInfoParagraphClass)}>
									<strong class={styleCtx.detailedInfoStrongClass}>{styleCtx.legalBasisTitleText ?? defaultCookieTexts.legalBasisTitle}</strong>
									{styleCtx.legalBasisDetailsText ?? defaultCookieTexts.legalBasisText}
								</p>
								<ul class={cn('cc:pl-4 cc:space-y-1 cc:list-disc', styleCtx.detailedInfoListClass)}>
									<li class={styleCtx.detailedInfoListItemClass}>{styleCtx.legalBasisStrictlyNecessaryText ?? defaultCookieTexts.legalBasisStrictlyNecessary}</li>
									<li class={styleCtx.detailedInfoListItemClass}>
										{styleCtx.legalBasisConsentText ?? defaultCookieTexts.legalBasisConsent}
									</li>
								</ul>
								<p class={cn('cc:leading-relaxed', styleCtx.detailedInfoParagraphClass)}>
									<strong class={styleCtx.detailedInfoStrongClass}>{styleCtx.dataSharingTitleText ?? defaultCookieTexts.dataSharingTitle}</strong>
									{styleCtx.dataSharingDetailsText ?? defaultCookieTexts.dataSharingText}
								</p>
							</div>
						</ScrollArea>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<div class={cn('cc:flex cc:flex-wrap cc:gap-2 cc:justify-end cc:my-2', styleCtx.footerClass)}>
		<Button
			variant={styleCtx.rejectAllButtonVariant ?? 'outline'}
			onclick={() => {
				cookiePreferences.rejectAll();
				onClose();
			}}>{styleCtx.rejectAllButtonText ?? defaultCookieTexts.rejectAllButton}</Button
		>
		<Button
			variant={styleCtx.confirmSelectionButtonVariant ?? 'outline'}
			onclick={() => {
				cookiePreferences.acceptSelected();
				onClose();
			}}>{styleCtx.confirmSelectionButtonText ?? defaultCookieTexts.confirmSelectionButton}</Button
		>
		<Button
			variant={styleCtx.cancelButtonVariant ?? 'secondary'}
			onclick={() => {
				cookiePreferences.loadPreferences();
				onClose();
			}}>{styleCtx.cancelButtonText ?? defaultCookieTexts.cancelButton}</Button
		>
		<Button
			variant={styleCtx.acceptAllButtonVariant ?? 'default'}
			onclick={() => {
				cookiePreferences.acceptAll();
				onClose();
			}}>{styleCtx.acceptAllButtonText ?? defaultCookieTexts.acceptAllButton}</Button
		>
	</div>
</div>
