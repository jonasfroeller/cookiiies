<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import CookiePreferencesContent from './CookiePreferencesContent.svelte';
	import { onMount } from 'svelte';
	import { CookieManager } from '$lib/utils/cookie.js';

	let isOpen = $state(false);

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
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title class="cc:text-2xl cc:font-bold">Cookie Preferences</Drawer.Title>
				<Drawer.Description class="cc:mt-4">
					<p>
						We use cookies to enhance your experience on our website. Here you can manage your
						preferences.
					</p>
				</Drawer.Description>
			</Drawer.Header>

			<CookiePreferencesContent
				class="cc:px-4 cc:mt-4"
				onClose={() => {
					isOpen = false;
				}}
			/>
		</Drawer.Content>
	</Drawer.Root>
{/if}
