<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { ScrollArea } from './ui/scroll-area/index.js';
	import { cookiePreferences } from '$lib/utils/cookie-preferences.js';
	import { onMount } from 'svelte';

	onMount(() => {
		cookiePreferences.loadPreferences();
	});
</script>

<AlertDialog.Root closeOnEscape={true} closeOnOutsideClick={true} open={true}>
	<AlertDialog.Content class="max-w-2xl">
		<AlertDialog.Header>
			<AlertDialog.Title class="text-2xl font-bold">Cookie Preferences</AlertDialog.Title>
			<AlertDialog.Description class="mt-4">
				We use cookies to enhance your experience on our website. Here you can manage your
				preferences.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<div class="mt-6">
			<div class="space-y-4">
				{#each $cookiePreferences.categories as category}
					<div class="flex items-start p-4 space-x-4 border rounded">
						<Switch bind:checked={category.checked} disabled={category.required} />
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
				<Accordion.Root value={$cookiePreferences.showDetails ? 'details' : undefined}>
					<Accordion.Item value="details">
						<Accordion.Trigger class="text-sm font-medium">
							Detailed Cookie Information
						</Accordion.Trigger>
						<Accordion.Content class="pt-2 pb-4">
							<ScrollArea class="h-[150px]">
								<div class="p-4 space-y-1 text-sm rounded-md bg-secondary">
									<p>
										<strong>Storage Duration:</strong> The storage duration of cookies varies depending
										on their purpose. Session cookies are deleted when you close your browser. Persistent
										cookies remain on your device for a period specified in each cookie, which may range
										from a few minutes to several years, but we regularly review and update our cookies
										to ensure they are not kept longer than necessary.
									</p>
									<p>
										<strong>Legal Basis:</strong> We rely on different legal bases depending on the type
										of cookie:
									</p>
									<ul>
										<li>
											For strictly necessary cookies: Art. 6(1)(f) GDPR (legitimate interests)
										</li>
										<li>
											For performance, functionality, marketing, and analytics cookies: Art. 6(1)(a)
											GDPR (Consent)
										</li>
									</ul>
									<p>
										<strong>Data Sharing:</strong> We do not share data collected by strictly necessary
										cookies. For performance, functionality, marketing, and analytics cookies, data may
										be shared with third parties only with your explicit consent.
									</p>
								</div>
							</ScrollArea>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>

		<div class="flex justify-end mt-2 space-x-4">
			<Button variant="outline" on:click={cookiePreferences.rejectAll}>Reject All</Button>
			<Button variant="outline" on:click={cookiePreferences.acceptSelected}>
				Confirm Selection
			</Button>
			<AlertDialog.Close>
				<Button variant="secondary">Cancel</Button>
			</AlertDialog.Close>
			<Button variant="default" on:click={cookiePreferences.acceptAll}>Accept All</Button>
		</div>
	</AlertDialog.Content>
</AlertDialog.Root>
