<script lang="ts">
	import type { ToggleSetting } from '$types/Setting';
	import { createEventDispatcher } from 'svelte';
	import Chevron from './Chevron.svelte';

	export let setting: ToggleSetting;

	$: label = setting.value === 1 ? setting.on : setting.off;

	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change', {
			setting,
			value: setting.value === 1 ? 0 : 1,
		});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="flex-1 bg-white text-black max-w-[450px] flex justify-center items-center cursor-pointer p-2"
	on:click={onChange}
>
	<Chevron width={16} height={16} rotation={90} />
	<span class="flex-1 text-center">{label}</span>
	<Chevron width={16} height={16} rotation={-90} />
</div>
