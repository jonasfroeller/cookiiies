<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	class={cn(
		"cc:data-[state=open]:animate-in cc:data-[state=closed]:animate-out cc:data-[state=closed]:fade-out-0 cc:data-[state=open]:fade-in-0 cc:fixed cc:inset-0 cc:z-50 cc:bg-black/80",
		className
	)}
	{...restProps}
/>
