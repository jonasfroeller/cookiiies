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

<div class="cc:p-8 cc:space-y-4">
	<div class="cc:grid cc:grid-cols-2 cc:gap-4">
		<div class="cc:space-y-2">
			<label for="cookieName" class="cc:text-sm cc:font-medium">Cookie Name</label>
			<input
				id="cookieName"
				type="text"
				bind:value={cookieName}
				class="cc:px-3 cc:py-2 cc:w-full cc:rounded-md cc:border"
			/>
		</div>

		<div class="cc:space-y-2">
			<label for="cookieValue" class="cc:text-sm cc:font-medium">Cookie Value</label>
			<input
				id="cookieValue"
				type="text"
				bind:value={cookieValue}
				class="cc:px-3 cc:py-2 cc:w-full cc:rounded-md cc:border"
			/>
		</div>
	</div>

	<div class="cc:flex cc:items-center cc:space-x-4">
		<div class="cc:space-y-2">
			<label for="cookieDays" class="cc:text-sm cc:font-medium">Valid Days</label>
			<input
				id="cookieDays"
				type="number"
				bind:value={cookieDays}
				class="cc:px-3 cc:py-2 cc:w-32 cc:rounded-md cc:border"
			/>
		</div>

		<div class="cc:space-y-2">
			<label for="secureSwitch" class="cc:text-sm cc:font-medium">Secure</label>
			<Switch id="secureSwitch" bind:checked={isSecure} />
		</div>

		<div class="cc:space-y-2">
			<label for="sameSiteSelect" class="cc:text-sm cc:font-medium">SameSite</label>
			<select id="sameSiteSelect" bind:value={sameSite} class="cc:px-3 cc:py-2 cc:rounded-md cc:border">
				<option value="Lax">Lax</option>
				<option value="Strict">Strict</option>
				<option value="None">None</option>
			</select>
		</div>
	</div>

	<div class="cc:space-x-2">
		<Button onclick={setCookie}>Set Cookie</Button>
		<Button onclick={updateCookie} variant="outline">Update Cookie</Button>
	</div>

	<div class="cc:mt-8">
		<h2 class="cc:mb-4 cc:text-lg cc:font-semibold">Current Cookies</h2>
		{#if Object.keys(cookies).length === 0}
			<p class="cc:italic cc:text-gray-500">No cookies found</p>
		{:else}
			<div class="cc:rounded cc:border">
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
										class="cc:px-2.5 cc:py-0.5 cc:text-xs cc:font-semibold cc:rounded-full"
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
