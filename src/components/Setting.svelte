<script lang="ts">
	import type { Setting } from '$types/Setting';
	import { SettingTypes } from '$types/SettingType';
	import { createEventDispatcher } from 'svelte';
	import Dropdown from './Dropdown.svelte';
	import Slider from './Slider.svelte';
	import Toggle from './Toggle.svelte';

	export let setting: Setting;

	const dispatch = createEventDispatcher();

	function onChange(e: Event) {
		dispatch('change', {
			setting,
			value: (e.target as HTMLInputElement).valueAsNumber,
		});
	}
</script>

<li class="w-full">
	<div class="flex text-xl">
		<span class="bg-[#303b50] px-6 py-2 flex-1">{setting.name}</span>

		{#if setting.disabled}
			<span class="bg-[#303b50] px-6 py-2">Not Available</span>
		{:else if setting.type === SettingTypes.Dropdown}
			<Dropdown {setting} on:change />
		{:else if setting.type === SettingTypes.Toggle}
			<Toggle {setting} on:change />
		{:else if setting.type === SettingTypes.Slider}
			<Slider {setting} on:change />
		{/if}
	</div>

	{#if setting.children}
		<ul class="pl-4 flex flex-col gap-1 mt-1">
			{#each setting.children as child}
				{#if !child.hidden}
					<svelte:self setting={child} on:change />
				{/if}
			{/each}
		</ul>
	{/if}
</li>
