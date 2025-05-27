<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLThAttributes> = $props();
</script>

<th
	bind:this={ref}
	class={cn(
		"cc:text-muted-foreground cc:h-10 cc:px-2 cc:text-left cc:align-middle cc:font-medium cc:[&:has([role=checkbox])]:pr-0 cc:[&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</th>
