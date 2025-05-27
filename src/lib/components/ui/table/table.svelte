<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTableAttributes> = $props();
</script>

<div class="cc:relative cc:w-full cc:overflow-auto">
	<table bind:this={ref} class={cn("cc:w-full cc:caption-bottom cc:text-sm", className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
