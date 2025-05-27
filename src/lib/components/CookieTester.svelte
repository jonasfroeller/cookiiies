<script lang="ts">
	import { type Cookie, CookieManager } from '../utils/cookie.js';
	import { Button } from './ui/button/index.js';
	import Switch from './ui/switch/switch.svelte';
	import * as Table from './ui/table/index.js';
	import { BROWSER } from 'esm-env';
	import { onMount } from 'svelte';
	import { getCookieStyleContext, defaultCookieTexts } from './cookie-style/index.js';
	import { cn } from '$lib/utils.js';

	let cookieName = $state('');
	let cookieValue = $state('');
	let cookieDays = $state(365);
	let isSecure = $state(true);
	let sameSite: Cookie.SameSite = $state('Lax');
	let cookies: Record<string, string> = $state({});

	const styleCtx = getCookieStyleContext();

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

<div class={cn("cc:p-8 cc:space-y-4 cc:text-primary", styleCtx.testerRootClass)}>
	<div class={cn("cc:grid cc:grid-cols-2 cc:gap-4", styleCtx.testerGridClass)}>
		<div class={cn("cc:space-y-2", styleCtx.testerFieldWrapperClass)}>
			<label for="cookieName" class={cn("cc:text-sm cc:font-medium", styleCtx.formLabelClass)}>{styleCtx.cookieNameLabelText ?? defaultCookieTexts.cookieNameLabel}</label>
			<input
				id="cookieName"
				type="text"
				bind:value={cookieName}
				class={cn("cc:px-3 cc:py-2 cc:w-full cc:rounded-md cc:border", styleCtx.formInputClass)}
			/>
		</div>

		<div class={cn("cc:space-y-2", styleCtx.testerFieldWrapperClass)}>
			<label for="cookieValue" class={cn("cc:text-sm cc:font-medium", styleCtx.formLabelClass)}>{styleCtx.cookieValueLabelText ?? defaultCookieTexts.cookieValueLabel}</label>
			<input
				id="cookieValue"
				type="text"
				bind:value={cookieValue}
				class={cn("cc:px-3 cc:py-2 cc:w-full cc:rounded-md cc:border", styleCtx.formInputClass)}
			/>
		</div>
	</div>

	<div class={cn("cc:flex cc:items-center cc:space-x-4", styleCtx.formFlexContainerClass)}>
		<div class={cn("cc:space-y-2", styleCtx.testerFieldWrapperClass)}>
			<label for="cookieDays" class={cn("cc:text-sm cc:font-medium", styleCtx.formLabelClass)}>{styleCtx.cookieDaysLabelText ?? defaultCookieTexts.cookieDaysLabel}</label>
			<input
				id="cookieDays"
				type="number"
				bind:value={cookieDays}
				class={cn("cc:px-3 cc:py-2 cc:w-32 cc:rounded-md cc:border", styleCtx.formInputClass)}
			/>
		</div>

		<div class={cn("cc:space-y-2", styleCtx.testerFieldWrapperClass)}>
			<label for="secureSwitch" class={cn("cc:text-sm cc:font-medium", styleCtx.formLabelClass)}>{styleCtx.secureLabelText ?? defaultCookieTexts.secureLabel}</label>
			<Switch id="secureSwitch" bind:checked={isSecure} class={styleCtx.formSwitchClass} />
		</div>

		<div class={cn("cc:space-y-2", styleCtx.testerFieldWrapperClass)}>
			<label for="sameSiteSelect" class={cn("cc:text-sm cc:font-medium", styleCtx.formLabelClass)}>{styleCtx.sameSiteLabelText ?? defaultCookieTexts.sameSiteLabel}</label>
			<select id="sameSiteSelect" bind:value={sameSite} class={cn("cc:px-3 cc:py-2 cc:rounded-md cc:border", styleCtx.formSelectClass)}>
				<option value="Lax">Lax</option>
				<option value="Strict">Strict</option>
				<option value="None">None</option>
			</select>
		</div>
	</div>

	<div class={cn("cc:space-x-2", styleCtx.formButtonContainerClass)}>
		<Button onclick={setCookie} variant={styleCtx.defaultButtonVariant}>{styleCtx.setCookieButtonText ?? defaultCookieTexts.setCookieButton}</Button>
		<Button onclick={updateCookie} variant={styleCtx.outlineButtonVariant ?? 'outline'}>{styleCtx.updateCookieButtonText ?? defaultCookieTexts.updateCookieButton}</Button>
	</div>

	<div class="cc:mt-8">
		<h2 class={cn("cc:mb-4 cc:text-lg cc:font-semibold", styleCtx.titleClass)}>{styleCtx.currentCookiesTitleText ?? defaultCookieTexts.currentCookiesTitle}</h2>
		{#if Object.keys(cookies).length === 0}
			<p class={cn("cc:italic cc:text-gray-500", styleCtx.descriptionParagraphClass)}>{styleCtx.noCookiesFoundText ?? defaultCookieTexts.noCookiesFoundText}</p>
		{:else}
			<div class={cn("cc:rounded cc:border", styleCtx.tableWrapperClass)}>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>{styleCtx.cookieTableNameHeaderText ?? defaultCookieTexts.cookieTableNameHeader}</Table.Head>
							<Table.Head>{styleCtx.cookieTableValueHeaderText ?? defaultCookieTexts.cookieTableValueHeader}</Table.Head>
							<Table.Head>{styleCtx.cookieTableActionsHeaderText ?? defaultCookieTexts.cookieTableActionsHeader}</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each Object.entries(cookies) as [name, value]}
							<Table.Row>
								<Table.Cell>
									<Button
										variant={styleCtx.outlineButtonVariant ?? 'outline'}
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
									<Button variant={styleCtx.destructiveButtonVariant ?? 'destructive'} size="sm" onclick={() => deleteCookie(name)}>
										{styleCtx.deleteButtonText ?? defaultCookieTexts.deleteButton}
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
