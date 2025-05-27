<script lang="ts">
	import { Accordion as AccordionPrimitive, type WithoutChild } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps["level"];
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="cc:flex">
	<AccordionPrimitive.Trigger
		bind:ref
		class={cn(
			"cc:flex cc:flex-1 cc:items-center cc:justify-between cc:py-4 cc:text-sm cc:font-medium cc:transition-all cc:hover:underline cc:[&[data-state=open]>svg]:rotate-180",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDown
			class="cc:text-muted-foreground cc:size-4 cc:shrink-0 cc:transition-transform cc:duration-200"
		/>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
