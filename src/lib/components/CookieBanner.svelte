<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/dialog/index.js';
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<AlertDialog.Root closeOnEscape={true} closeOnOutsideClick={true} open={true}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Cookies</AlertDialog.Title>
			<AlertDialog.Description>We use cookies.</AlertDialog.Description>
		</AlertDialog.Header>
	</AlertDialog.Content>
</AlertDialog.Root>
