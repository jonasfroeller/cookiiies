<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props();
</script>

<tr
	bind:this={ref}
	class={cn(
		"cc:hover:bg-muted/50 cc:data-[state=selected]:bg-muted cc:border-b cc:transition-colors",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</tr>
