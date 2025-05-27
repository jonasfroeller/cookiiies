<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import X from "lucide-svelte/icons/x";
	import type { Snippet } from "svelte";
	import * as Dialog from "./index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		class={cn(
			"cc:bg-background cc:data-[state=open]:animate-in cc:data-[state=closed]:animate-out cc:data-[state=closed]:fade-out-0 cc:data-[state=open]:fade-in-0 cc:data-[state=closed]:zoom-out-95 cc:data-[state=open]:zoom-in-95 cc:data-[state=closed]:slide-out-to-left-1/2 cc:data-[state=closed]:slide-out-to-top-[48%] cc:data-[state=open]:slide-in-from-left-1/2 cc:data-[state=open]:slide-in-from-top-[48%] cc:fixed cc:left-[50%] cc:top-[50%] cc:z-50 cc:grid cc:w-full cc:max-w-lg cc:translate-x-[-50%] cc:translate-y-[-50%] cc:gap-4 cc:border cc:p-6 cc:shadow-lg cc:duration-200 cc:sm:rounded-lg",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<DialogPrimitive.Close
			class="cc:ring-offset-background cc:focus:ring-ring cc:data-[state=open]:bg-accent cc:data-[state=open]:text-muted-foreground cc:absolute cc:right-4 cc:top-4 cc:rounded-sm cc:opacity-70 cc:transition-opacity cc:hover:opacity-100 cc:focus:outline-hidden cc:focus:ring-2 cc:focus:ring-offset-2 cc:disabled:pointer-events-none"
		>
			<X class="cc:size-4" />
			<span class="cc:sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
