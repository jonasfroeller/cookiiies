<script lang="ts">
	import { ScrollArea as ScrollAreaPrimitive, type WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		orientation = "vertical",
		children,
		...restProps
	}: WithoutChild<ScrollAreaPrimitive.ScrollbarProps> = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
	bind:ref
	{orientation}
	class={cn(
		"cc:flex cc:touch-none cc:select-none cc:transition-colors",
		orientation === "cc:vertical" && "cc:h-full cc:w-2.5 cc:border-l cc:border-l-transparent cc:p-px",
		orientation === "cc:horizontal" && "cc:h-2.5 cc:w-full cc:border-t cc:border-t-transparent cc:p-px",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ScrollAreaPrimitive.Thumb
		class={cn("cc:bg-border cc:relative cc:rounded-full", orientation === "cc:vertical" && "cc:flex-1")}
	/>
</ScrollAreaPrimitive.Scrollbar>
