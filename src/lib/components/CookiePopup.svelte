<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/dialog/index.js';
	import CookiePreferencesContent from './CookiePreferencesContent.svelte';

	let isOpen = $state(true);
</script>

<AlertDialog.Root bind:open={isOpen}>
	<AlertDialog.Content class="max-w-2xl">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-2xl font-bold">Cookie Preferences</AlertDialog.Title>
			<AlertDialog.Description class="mt-4">
				<p>
					We use cookies to enhance your experience on our website. Here you can manage your
					preferences.
				</p>
			</AlertDialog.Description>
		</AlertDialog.Header>

		<CookiePreferencesContent
			class="mt-6"
			onClose={() => {
				isOpen = false;
			}}
		/>
	</AlertDialog.Content>
</AlertDialog.Root>
