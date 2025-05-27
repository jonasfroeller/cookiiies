<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
	bind:this={ref}
	class={cn(
		"cc:p-2 cc:align-middle cc:[&:has([role=checkbox])]:pr-0 cc:[&>[role=checkbox]]:translate-y-[2px]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
