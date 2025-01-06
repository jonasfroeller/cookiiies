<script lang="ts">
	import { type Cookie, CookieManager } from '../utils/cookie.js';
	import Button from './ui/button/button.svelte';
	import Switch from './ui/switch/switch.svelte';
	import * as Table from './ui/table/index.js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let cookieName = '';
	let cookieValue = '';
	let cookieDays = 365;
	let isSecure = true;
	let sameSite: Cookie.SameSite = 'Lax';
	let cookies: Record<string, string> = {};

	onMount(() => {
		refreshCookies();
	});

	function refreshCookies() {
		if (browser) {
			cookies = CookieManager.getAll();
			console.log('Refreshed cookies:', cookies);
		}
	}

	function setCookie() {
		if (browser) {
			const success = CookieManager.set(cookieName, cookieValue, {
				days: cookieDays,
				secure: isSecure,
				sameSite
			});
			if (!success) {
				alert('Cookie already exists or is empty!');
			}
			refreshCookies();
		}
	}

	function updateCookie() {
		if (browser) {
			const success = CookieManager.update(cookieName, cookieValue, {
				days: cookieDays,
				secure: isSecure,
				sameSite
			});
			if (!success) {
				alert('Cookie not found!');
			}
			refreshCookies();
		}
	}

	function deleteCookie(name: string) {
		if (browser) {
			const success = CookieManager.delete(name);
			if (!success) {
				alert('Cookie not found!');
			}
			refreshCookies();
		}
	}
</script>

<div class="p-8 space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<label for="cookieName" class="text-sm font-medium">Cookie Name</label>
			<input
				id="cookieName"
				type="text"
				bind:value={cookieName}
				class="w-full px-3 py-2 border rounded-md"
			/>
		</div>

		<div class="space-y-2">
			<label for="cookieValue" class="text-sm font-medium">Cookie Value</label>
			<input
				id="cookieValue"
				type="text"
				bind:value={cookieValue}
				class="w-full px-3 py-2 border rounded-md"
			/>
		</div>
	</div>

	<div class="flex items-center space-x-4">
		<div class="space-y-2">
			<label for="cookieDays" class="text-sm font-medium">Valid Days</label>
			<input
				id="cookieDays"
				type="number"
				bind:value={cookieDays}
				class="w-32 px-3 py-2 border rounded-md"
			/>
		</div>

		<div class="space-y-2">
			<label for="secureSwitch" class="text-sm font-medium">Secure</label>
			<Switch id="secureSwitch" bind:checked={isSecure} />
		</div>

		<div class="space-y-2">
			<label for="sameSiteSelect" class="text-sm font-medium">SameSite</label>
			<select id="sameSiteSelect" bind:value={sameSite} class="px-3 py-2 border rounded-md">
				<option value="Lax">Lax</option>
				<option value="Strict">Strict</option>
				<option value="None">None</option>
			</select>
		</div>
	</div>

	<div class="space-x-2">
		<Button on:click={setCookie}>Set Cookie</Button>
		<Button on:click={updateCookie} variant="outline">Update Cookie</Button>
	</div>

	<div class="mt-8">
		<h2 class="mb-4 text-lg font-semibold">Current Cookies</h2>
		{#if Object.keys(cookies).length === 0}
			<p class="italic text-gray-500">No cookies found</p>
		{:else}
			<div class="border rounded">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Value</Table.Head>
							<Table.Head>Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each Object.entries(cookies) as [name, value]}
							<Table.Row>
								<Table.Cell>
									<Button
										variant="outline"
										size="sm"
										class="rounded-full px-2.5 py-0.5 text-xs font-semibold"
										on:click={() => {
											cookieName = name;
											cookieValue = value;
										}}
									>
										{name}
									</Button>
								</Table.Cell>
								<Table.Cell>{value}</Table.Cell>
								<Table.Cell>
									<Button variant="destructive" size="sm" on:click={() => deleteCookie(name)}>
										Delete
									</Button>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
		{/if}
	</div>
</div>
