<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const sheetVariants = tv({
		base: "cc:bg-background cc:data-[state=open]:animate-in cc:data-[state=closed]:animate-out cc:fixed cc:z-50 cc:gap-4 cc:p-6 cc:shadow-lg cc:transition cc:ease-in-out cc:data-[state=closed]:duration-300 cc:data-[state=open]:duration-500",
		variants: {
			side: {
				top: "cc:data-[state=closed]:slide-out-to-top cc:data-[state=open]:slide-in-from-top cc:inset-x-0 cc:top-0 cc:border-b",
				bottom: "cc:data-[state=closed]:slide-out-to-bottom cc:data-[state=open]:slide-in-from-bottom cc:inset-x-0 cc:bottom-0 cc:border-t",
				left: "cc:data-[state=closed]:slide-out-to-left cc:data-[state=open]:slide-in-from-left cc:inset-y-0 cc:left-0 cc:h-full cc:w-3/4 cc:border-r cc:sm:max-w-sm",
				right: "cc:data-[state=closed]:slide-out-to-right cc:data-[state=open]:slide-in-from-right cc:inset-y-0 cc:right-0 cc:h-full cc:w-3/4 cc:border-l cc:sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	});

	export type Side = VariantProps<typeof sheetVariants>["side"];
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import X from "lucide-svelte/icons/x";
	import type { Snippet } from "svelte";
	import SheetOverlay from "./sheet-overlay.svelte";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		side = "right",
		children,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: SheetPrimitive.PortalProps;
		side?: Side;
		children: Snippet;
	} = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content bind:ref class={cn(sheetVariants({ side }), className)} {...restProps}>
		{@render children?.()}
		<SheetPrimitive.Close
			class="cc:ring-offset-background cc:focus:ring-ring cc:data-[state=open]:bg-secondary cc:absolute cc:right-4 cc:top-4 cc:rounded-sm cc:opacity-70 cc:transition-opacity cc:hover:opacity-100 cc:focus:outline-hidden cc:focus:ring-2 cc:focus:ring-offset-2 cc:disabled:pointer-events-none"
		>
			<X class="cc:size-4" />
			<span class="cc:sr-only">Close</span>
		</SheetPrimitive.Close>
	</SheetPrimitive.Content>
</SheetPrimitive.Portal>
