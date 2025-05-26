<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
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
	<Sheet.Root
		bind:open={isOpen}
	>
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title class="text-2xl font-bold">Cookie Preferences</Sheet.Title>
				<Sheet.Description class="mt-4">
					<p>
						We use cookies to enhance your experience on our website. Here you can manage your
						preferences.
					</p>
				</Sheet.Description>
			</Sheet.Header>

			<CookiePreferencesContent
				class="mt-6"
				onClose={() => {
					isOpen = false;
				}}
			/>
		</Sheet.Content>
	</Sheet.Root>
{/if}
