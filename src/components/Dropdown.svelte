<script lang="ts">
	import type { DropdownSetting, SettingOption } from '$types/Setting';
	import { createEventDispatcher } from 'svelte';
	import Chevron from './Chevron.svelte';

	export let setting: DropdownSetting;

	const dispatch = createEventDispatcher();
	let isOpen = false;
	let dropdown: HTMLDivElement;

	$: selectedOption =
		setting.options.find((option) => option.value === setting.value) ?? setting.options[0];

	function onLabelClick() {
		if (isOpen) {
			isOpen = false;
			document.removeEventListener('click', close);
		} else {
			isOpen = true;
			document.addEventListener('click', close);
		}
	}

	function onOptionClick(option: SettingOption) {
		isOpen = false;

		dispatch('change', {
			setting,
			value: option.value,
		});
	}

	function close(e: MouseEvent) {
		if (dropdown.contains(e.target as Node)) {
			return;
		}

		isOpen = false;

		document.removeEventListener('click', close);
	}
</script>

<div class="bg-white text-black px-6 py-2 flex-1 max-w-[450px] relative" bind:this={dropdown}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="flex justify-between cursor-pointer items-center" on:click={onLabelClick}>
		<span>{selectedOption.name}</span>

		<Chevron width={16} height={16} />
	</div>

	{#if isOpen}
		<div class="dropdown-options bg-white border-2 border-slate-800">
			<ul>
				{#each setting.options as option}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						class="option p-2 cursor-pointer"
						class:selected={selectedOption.name === option.name}
						on:click={() => onOptionClick(option)}
					>
						{option.name}
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	.dropdown-options {
		position: absolute;
		top: calc(100% + 1px);
		left: 0;
		width: 100%;
		z-index: 1;
		filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
	}
	.dropdown-options .option:hover {
		background-color: rgb(226 232 240);
		color: #2d3748;
	}
	.dropdown-options .option.selected {
		background-color: rgb(71 85 105);
		color: #fff;
	}
</style>
