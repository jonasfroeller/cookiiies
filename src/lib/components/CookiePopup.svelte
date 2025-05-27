<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/dialog/index.js';
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
	<AlertDialog.Root
		bind:open={isOpen}
	>
		<AlertDialog.Content class="cc:max-w-2xl">
			<AlertDialog.Header>
				<AlertDialog.Title class="cc:text-2xl cc:font-bold">Cookie Preferences</AlertDialog.Title>
				<AlertDialog.Description class="cc:mt-4">
					<p>
						We use cookies to enhance your experience on our website. Here you can manage your
						preferences.
					</p>
				</AlertDialog.Description>
			</AlertDialog.Header>

			<CookiePreferencesContent
				class="cc:mt-6"
				onClose={() => {
					isOpen = false;
				}}
			/>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
