<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<Dialog.Root closeOnEscape={true} closeOnOutsideClick={true} open={true}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Cookies</Dialog.Title>
			<Dialog.Description>
				We use cookies.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
