<script lang="ts">
	import Setting from '$components/Setting.svelte';
	import type { SettingGroup } from '$types/SettingGroup';

	export let settingGroup: SettingGroup;
</script>

<section class="flex flex-col w-full max-w-[84%]">
	<h2 class="mb-2">{settingGroup.name}</h2>

	<ul class="flex flex-col gap-1">
		{#each settingGroup.settings as setting}
			{#if !setting.hidden}
				<Setting {setting} on:change />
			{/if}
		{/each}
	</ul>
</section>
