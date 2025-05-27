<script lang="ts">
	import { Switch as SwitchPrimitive, type WithoutChildrenOrChild } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		class: className,
		checkedBgColor = undefined,
		uncheckedBgColor = undefined,
		thumbColor = undefined,
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
		checkedBgColor?: string;
		uncheckedBgColor?: string;
		thumbColor?: string;
	} = $props();

	const rootStyles = [
		checkedBgColor ? `--cc-switch-checked-bg: ${checkedBgColor};` : '--cc-switch-checked-bg: hsl(var(--primary));',
		uncheckedBgColor ? `--cc-switch-unchecked-bg: ${uncheckedBgColor};` : '--cc-switch-unchecked-bg: hsl(var(--input));'
	].join(' ');

	const thumbStyles = thumbColor ? `--cc-switch-thumb-bg: ${thumbColor};` : '--cc-switch-thumb-bg: hsl(var(--background));';
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	style={rootStyles}
	class={cn(
		"cc:focus-visible:ring-ring cc:focus-visible:ring-offset-background cc:data-[state=checked]:bg-[var(--cc-switch-checked-bg)] cc:data-[state=unchecked]:bg-[var(--cc-switch-unchecked-bg)] cc:peer cc:inline-flex cc:h-5 cc:w-9 cc:shrink-0 cc:cursor-pointer cc:items-center cc:rounded-full cc:border-2 cc:border-transparent cc:shadow-xs cc:transition-colors cc:focus-visible:outline-hidden cc:focus-visible:ring-2 cc:focus-visible:ring-offset-2 cc:disabled:cursor-not-allowed cc:disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		style={thumbStyles}
		class={cn(
			"cc:bg-[var(--cc-switch-thumb-bg)] cc:pointer-events-none cc:block cc:size-4 cc:rounded-full cc:shadow-lg cc:ring-0 cc:transition-transform cc:data-[state=checked]:translate-x-4 cc:data-[state=unchecked]:translate-x-0"
		)}
	/>
</SwitchPrimitive.Root>
