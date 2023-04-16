<script lang="ts">
	import type { SliderSetting } from '$types/Setting';
	import { createEventDispatcher } from 'svelte';

	export let setting: SliderSetting;

	const dispatch = createEventDispatcher();

	function onChange(e: Event) {
		dispatch('change', {
			setting,
			value: (e.target as HTMLInputElement).valueAsNumber,
		});
	}
</script>

<div class="bg-[#303b50] flex-1 flex max-w-[450px]">
	<span class="p-2">{setting.value.toFixed(setting.decimalPlaces)}</span>
	<input
		type="range"
		step={setting.decimalPlaces ? 1 / 10 ** setting.decimalPlaces : 1}
		min={setting.min}
		max={setting.max}
		value={setting.value}
		class="flex-1 mx-2 cursor-pointer"
		on:input={onChange}
	/>
</div>
