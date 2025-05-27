<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";
	export const badgeVariants = tv({
		base: "cc:focus:ring-ring cc:inline-flex cc:select-none cc:items-center cc:rounded-md cc:border cc:px-2.5 cc:py-0.5 cc:text-xs cc:font-semibold cc:transition-colors cc:focus:outline-hidden cc:focus:ring-2 cc:focus:ring-offset-2",
		variants: {
			variant: {
				default:
					"cc:bg-primary cc:text-primary-foreground cc:hover:bg-primary/80 cc:border-transparent cc:shadow-sm",
				secondary:
					"cc:bg-secondary cc:text-secondary-foreground cc:hover:bg-secondary/80 cc:border-transparent",
				destructive:
					"cc:bg-destructive cc:text-destructive-foreground cc:hover:bg-destructive/80 cc:border-transparent cc:shadow-sm",
				outline: "cc:text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
