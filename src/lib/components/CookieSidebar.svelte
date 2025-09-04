<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import CookiePreferencesContent from './CookiePreferencesContent.svelte';
	import { onMount } from 'svelte';
	import { CookieManager } from '$lib/utils/cookie.js';
	import { getCookieStyleContext, defaultCookieTexts } from './cookie-style/index.js';
	import { cn } from '$lib/utils.js';

	let isOpen = $state(false);
	const styleCtx = getCookieStyleContext();

	onMount(() => {
		const preferencesCookie = CookieManager.get('cookie_preferences');
		if (!preferencesCookie) {
			isOpen = true;
		}
	});
</script>

{#if isOpen}
	<Sheet.Root
		bind:open={isOpen}
	>
		<Sheet.Content class="cc:text-primary cc:max-h-[100dvh] cc:overflow-y-auto">
			<Sheet.Header class={cn('cc:text-left', styleCtx.headerClass)}>
				<Sheet.Title class={cn('cc:text-2xl cc:font-bold', styleCtx.titleClass)}>
					{styleCtx.titleText ?? defaultCookieTexts.title}
				</Sheet.Title>
				<Sheet.Description class={cn('cc:mt-4', styleCtx.descriptionClass)}>
					<p class={styleCtx.descriptionParagraphClass}>
						{styleCtx.descriptionText ?? defaultCookieTexts.description}
					</p>
				</Sheet.Description>
			</Sheet.Header>

			<CookiePreferencesContent
				class={cn('cc:mt-6', styleCtx.contentWrapperClass)}
				onClose={() => {
					isOpen = false;
				}}
			/>
		</Sheet.Content>
	</Sheet.Root>
{/if}
