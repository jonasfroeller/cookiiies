<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const alertVariants = tv({
		base: "cc:[&>svg]:text-foreground cc:relative cc:w-full cc:rounded-lg cc:border cc:px-4 cc:py-3 cc:text-sm cc:[&>svg]:absolute cc:[&>svg]:left-4 cc:[&>svg]:top-4 cc:[&>svg~*]:pl-7",
		variants: {
			variant: {
				default: "cc:bg-background cc:text-foreground",
				destructive:
					"cc:border-destructive/50 cc:text-destructive cc:dark:border-destructive cc:[&>svg]:text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	} = $props();
</script>

<div bind:this={ref} class={cn(alertVariants({ variant }), className)} {...restProps} role="alert">
	{@render children?.()}
</div>
