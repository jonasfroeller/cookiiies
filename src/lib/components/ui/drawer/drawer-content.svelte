<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		...restProps
	}: DrawerPrimitive.ContentProps & {
		portalProps?: DrawerPrimitive.PortalProps;
	} = $props();
</script>

<DrawerPrimitive.Portal {...portalProps}>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		bind:ref
		class={cn(
			"cc:bg-background cc:fixed cc:inset-x-0 cc:bottom-0 cc:z-50 cc:mt-24 cc:flex cc:h-auto cc:flex-col cc:rounded-t-[10px] cc:border",
			className
		)}
		{...restProps}
	>
		<div class="cc:bg-muted cc:mx-auto cc:mt-4 cc:h-2 cc:w-[100px] cc:rounded-full"></div>
		{@render children?.()}
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
