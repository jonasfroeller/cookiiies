<script lang="ts">
	import { Accordion as AccordionPrimitive, type WithoutChild } from 'bits-ui';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { ScrollArea } from './ui/scroll-area/index.js';
	import { cookiePreferences } from '$lib/utils/cookie-preferences.js';
	import { onMount } from 'svelte';

	let {
		class: className,
		onClose
	}: WithoutChild<AccordionPrimitive.ContentProps> & {
		onClose: () => void;
	} = $props();

	let accordionValue = $state($cookiePreferences.showDetails ? 'details' : undefined);

	function handleToggle(category: any) {
		if (!category.required) {
			cookiePreferences.toggleSelected(category);
		}
	}

	$effect(() => {
		accordionValue = $cookiePreferences.showDetails ? 'details' : undefined;
	});

	onMount(() => {
		cookiePreferences.loadPreferences();
	});
</script>

<div class={className}>
	<div class="space-y-4">
		{#each $cookiePreferences.categories as category}
			<div class="flex items-start p-4 space-x-4 rounded border">
				<Switch
					checked={category.checked}
					disabled={category.required}
					onCheckedChange={() => handleToggle(category)}
				/>
				<div>
					<h3 class="font-semibold">
						{category.name}
						{category.required ? '(Required)' : ''}
					</h3>
					<p class="text-sm text-gray-600">{category.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-6">
		<Accordion.Root type="single" value={accordionValue}>
			<Accordion.Item value="details">
				<Accordion.Trigger class="text-sm font-medium">
					Detailed Cookie Information
				</Accordion.Trigger>
				<Accordion.Content>
					<div class="pt-2 pb-4">
						<ScrollArea class="h-[100px] w-full">
							<div class="p-4 space-y-2 text-sm rounded-md bg-secondary/50">
								<p class="leading-relaxed">
									<strong>Storage Duration:</strong> The storage duration of cookies varies depending
									on their purpose. Session cookies are deleted when you close your browser. Persistent
									cookies remain on your device for a period specified in each cookie, which may range
									from a few minutes to several years, but we regularly review and update our cookies
									to ensure they are not kept longer than necessary.
								</p>
								<p class="leading-relaxed">
									<strong>Legal Basis:</strong> We rely on different legal bases depending on the type
									of cookie:
								</p>
								<ul class="pl-4 space-y-1 list-disc">
									<li>For strictly necessary cookies: Art. 6(1)(f) GDPR (legitimate interests)</li>
									<li>
										For performance, functionality, marketing, and analytics cookies: Art. 6(1)(a)
										GDPR (Consent)
									</li>
								</ul>
								<p class="leading-relaxed">
									<strong>Data Sharing:</strong> We do not share data collected by strictly necessary
									cookies. For performance, functionality, marketing, and analytics cookies, data may
									be shared with third parties only with your explicit consent.
								</p>
							</div>
						</ScrollArea>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>

	<div class="flex flex-wrap gap-2 justify-end my-2">
		<Button
			variant="outline"
			onclick={() => {
				cookiePreferences.rejectAll();
				onClose();
			}}>Reject All</Button
		>
		<Button
			variant="outline"
			onclick={() => {
				cookiePreferences.acceptSelected();
				onClose();
			}}>Confirm Selection</Button
		>
		<Button
			variant="secondary"
			onclick={() => {
				cookiePreferences.loadPreferences();
				onClose();
			}}>Cancel</Button
		>
		<Button
			variant="default"
			onclick={() => {
				cookiePreferences.acceptAll();
				onClose();
			}}>Accept All</Button
		>
	</div>
</div>
