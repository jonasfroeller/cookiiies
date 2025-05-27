<script lang="ts">
	import { Accordion as AccordionPrimitive, type WithoutChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
	bind:ref
	class={cn(
		"cc:data-[state=closed]:animate-accordion-up cc:data-[state=open]:animate-accordion-down cc:overflow-hidden cc:text-sm",
		className
	)}
	{...restProps}
>
	<div class="cc:pb-4 cc:pt-0">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
