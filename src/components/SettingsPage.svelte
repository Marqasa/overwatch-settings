<script lang="ts">
	import SettingGroup from './SettingGroup.svelte';
	import type { SettingGroup as SettingGroupType } from '$types/SettingGroup';

	export let settingGroups: SettingGroupType[];
</script>

<article class="flex flex-col gap-10">
	{#each settingGroups as settingGroup}
		<SettingGroup {settingGroup} on:change />
	{/each}
</article>
