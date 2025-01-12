<script lang="ts">
	import { type Cookie, CookieManager } from '../utils/cookie.js';
	import { Button } from './ui/button/index.js';
	import Switch from './ui/switch/switch.svelte';
	import * as Table from './ui/table/index.js';
	import { BROWSER } from 'esm-env';
	import { onMount } from 'svelte';

	let cookieName = $state('');
	let cookieValue = $state('');
	let cookieDays = $state(365);
	let isSecure = $state(true);
	let sameSite: Cookie.SameSite = $state('Lax');
	let cookies: Record<string, string> = $state({});

	onMount(() => {
		refreshCookies();
	});

	function refreshCookies() {
		if (BROWSER) {
			cookies = CookieManager.getAll();
			console.log('Refreshed cookies:', cookies);
		}
	}

	function setCookie() {
		if (BROWSER) {
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
		if (BROWSER) {
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
		if (BROWSER) {
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
				class="px-3 py-2 w-full rounded-md border"
			/>
		</div>

		<div class="space-y-2">
			<label for="cookieValue" class="text-sm font-medium">Cookie Value</label>
			<input
				id="cookieValue"
				type="text"
				bind:value={cookieValue}
				class="px-3 py-2 w-full rounded-md border"
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
				class="px-3 py-2 w-32 rounded-md border"
			/>
		</div>

		<div class="space-y-2">
			<label for="secureSwitch" class="text-sm font-medium">Secure</label>
			<Switch id="secureSwitch" bind:checked={isSecure} />
		</div>

		<div class="space-y-2">
			<label for="sameSiteSelect" class="text-sm font-medium">SameSite</label>
			<select id="sameSiteSelect" bind:value={sameSite} class="px-3 py-2 rounded-md border">
				<option value="Lax">Lax</option>
				<option value="Strict">Strict</option>
				<option value="None">None</option>
			</select>
		</div>
	</div>

	<div class="space-x-2">
		<Button onclick={setCookie}>Set Cookie</Button>
		<Button onclick={updateCookie} variant="outline">Update Cookie</Button>
	</div>

	<div class="mt-8">
		<h2 class="mb-4 text-lg font-semibold">Current Cookies</h2>
		{#if Object.keys(cookies).length === 0}
			<p class="italic text-gray-500">No cookies found</p>
		{:else}
			<div class="rounded border">
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
										class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
										onclick={() => {
											cookieName = name;
											cookieValue = value;
										}}
									>
										{name}
									</Button>
								</Table.Cell>
								<Table.Cell>{value}</Table.Cell>
								<Table.Cell>
									<Button variant="destructive" size="sm" onclick={() => deleteCookie(name)}>
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
