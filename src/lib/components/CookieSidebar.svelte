<script lang="ts">
  	import * as Sheet from "$lib/components/ui/sheet/index.js";
	import { onMount } from 'svelte';

	onMount(() => {});
</script>

<Sheet.Root closeOnEscape={true} closeOnOutsideClick={true} open={true}>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Cookies</Sheet.Title>
			<Sheet.Description>
				We use cookies.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
