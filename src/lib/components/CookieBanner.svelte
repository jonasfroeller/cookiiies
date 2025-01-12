<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import CookiePreferencesContent from './CookiePreferencesContent.svelte';

	let isOpen = $state(true);
</script>

<Drawer.Root open={isOpen}>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title class="text-2xl font-bold">Cookie Preferences</Drawer.Title>
			<Drawer.Description class="mt-4">
				<p>
					We use cookies to enhance your experience on our website. Here you can manage your
					preferences.
				</p>
			</Drawer.Description>
		</Drawer.Header>

		<CookiePreferencesContent
			class="px-4 mt-4"
			onClose={() => {
				isOpen = false;
			}}
		/>
	</Drawer.Content>
</Drawer.Root>
