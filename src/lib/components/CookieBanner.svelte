<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
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
	<Drawer.Root
		bind:open={isOpen}
	>
		<Drawer.Content class='cc:text-primary'>
			<div class='cc:max-h-[calc(100dvh-6rem)] cc:overflow-y-auto'>
				<Drawer.Header class={cn('cc:text-left', styleCtx.headerClass)}>
					<Drawer.Title class={cn('cc:text-2xl cc:font-bold', styleCtx.titleClass)}>
						{styleCtx.titleText ?? defaultCookieTexts.title}
					</Drawer.Title>
					<Drawer.Description class={cn('cc:mt-4', styleCtx.descriptionClass)}>
						<p class={styleCtx.descriptionParagraphClass}>
							{styleCtx.descriptionText ?? defaultCookieTexts.description}
						</p>
					</Drawer.Description>
				</Drawer.Header>

				<CookiePreferencesContent
					class={cn('cc:px-4 cc:mt-4', styleCtx.contentWrapperClass)}
					onClose={() => {
						isOpen = false;
					}}
				/>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{/if}
