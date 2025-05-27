<script lang="ts" module>
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "cc:focus-visible:ring-ring cc:inline-flex cc:items-center cc:justify-center cc:gap-2 cc:whitespace-nowrap cc:rounded-md cc:text-sm cc:font-medium cc:transition-colors cc:focus-visible:outline-hidden cc:focus-visible:ring-1 cc:disabled:pointer-events-none cc:disabled:opacity-50 cc:[&_svg]:pointer-events-none cc:[&_svg]:size-4 cc:[&_svg]:shrink-0",
		variants: {
			variant: {
				default: "cc:bg-primary cc:text-primary-foreground cc:hover:bg-primary/90 cc:shadow-sm",
				destructive:
					"cc:bg-destructive cc:text-destructive-foreground cc:hover:bg-destructive/90 cc:shadow-xs",
				outline:
					"cc:border-input cc:bg-background cc:hover:bg-accent cc:hover:text-accent-foreground cc:border cc:shadow-xs",
				secondary: "cc:bg-secondary cc:text-secondary-foreground cc:hover:bg-secondary/80 cc:shadow-xs",
				ghost: "cc:hover:bg-accent cc:hover:text-accent-foreground",
				link: "cc:text-primary cc:underline-offset-4 cc:hover:underline",
			},
			size: {
				default: "cc:h-9 cc:px-4 cc:py-2",
				sm: "cc:h-8 cc:rounded-md cc:px-3 cc:text-xs",
				lg: "cc:h-10 cc:rounded-md cc:px-8",
				icon: "cc:h-9 cc:w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
