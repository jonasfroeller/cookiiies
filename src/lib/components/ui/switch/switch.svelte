<script lang="ts">
	import { Switch as SwitchPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	class={cn(
		"cc:focus-visible:ring-ring cc:focus-visible:ring-offset-background cc:data-[state=checked]:bg-primary cc:data-[state=unchecked]:bg-input cc:peer cc:inline-flex cc:h-5 cc:w-9 cc:shrink-0 cc:cursor-pointer cc:items-center cc:rounded-full cc:border-2 cc:border-transparent cc:shadow-xs cc:transition-colors cc:focus-visible:outline-hidden cc:focus-visible:ring-2 cc:focus-visible:ring-offset-2 cc:disabled:cursor-not-allowed cc:disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		class={cn(
			"cc:bg-background cc:pointer-events-none cc:block cc:size-4 cc:rounded-full cc:shadow-lg cc:ring-0 cc:transition-transform cc:data-[state=checked]:translate-x-4 cc:data-[state=unchecked]:translate-x-0"
		)}
	/>
</SwitchPrimitive.Root>
