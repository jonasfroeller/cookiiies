<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/dialog/index.js';
	import CookiePreferencesContent from './CookiePreferencesContent.svelte';
	import { onMount } from 'svelte';
	import { CookieManager } from '$lib/utils/cookie.js';
	import { getCookieStyleContext, defaultCookieTexts } from './cookie-style/index.js';
	import { cn } from '$lib/utils.js';

	let isOpen = $state(false);
	const styleCtx = getCookieStyleContext();

	const titleStyles = (): string => {
		let s = '';
		if (styleCtx.titleTextColor) s += `--cc-title-text-color: ${styleCtx.titleTextColor};`;
		if (styleCtx.titleBackgroundColor) s += `--cc-title-bg-color: ${styleCtx.titleBackgroundColor};`;
		return s;
	};

	const descriptionParagraphStyles = (): string => {
		let s = '';
		if (styleCtx.descriptionParagraphTextColor) s += `--cc-desc-p-text-color: ${styleCtx.descriptionParagraphTextColor};`;
		if (styleCtx.descriptionParagraphBackgroundColor) s += `--cc-desc-p-bg-color: ${styleCtx.descriptionParagraphBackgroundColor};`;
		return s;
	};

	onMount(() => {
		const preferencesCookie = CookieManager.get('cookie_preferences');
		if (!preferencesCookie) {
			isOpen = true;
		}
	});
</script>

{#if isOpen}
	<AlertDialog.Root
		bind:open={isOpen}
	>
		<AlertDialog.Content class="cc:max-w-2xl cc:text-primary">
			<AlertDialog.Header class={cn('cc:text-left', styleCtx.headerClass)}>
				<AlertDialog.Title 
					class={cn('cc:text-2xl cc:font-bold', styleCtx.titleClass)} 
					style={titleStyles()}
				>
					{styleCtx.titleText ?? defaultCookieTexts.title}
				</AlertDialog.Title>
				<AlertDialog.Description class={cn('cc:mt-4', styleCtx.descriptionClass)}>
					<p 
						class={styleCtx.descriptionParagraphClass} 
						style={descriptionParagraphStyles()}
					>
						{styleCtx.descriptionText ?? defaultCookieTexts.description}
					</p>
				</AlertDialog.Description>
			</AlertDialog.Header>

			<CookiePreferencesContent
				class={cn('cc:mt-6', styleCtx.contentWrapperClass)}
				onClose={() => {
					isOpen = false;
				}}
			/>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
