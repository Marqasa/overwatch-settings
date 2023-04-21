<script lang="ts">
	import { onDestroy } from 'svelte';
	import { settingsStore } from '$lib/settingsStore';
	import { SettingTypes } from '$types/SettingType';
	import SettingsPage from '$components/SettingsPage.svelte';
	import type { SettingGroup } from '$types/SettingGroup';
	import type { Settings } from '../../../schema/SettingsSchema';

	let settings: Settings;

	const unsubscribe = settingsStore.subscribe((value) => (settings = value));

	onDestroy(unsubscribe);

	$: settingGroups = [
		{
			name: 'Miscellaneous',
			settings: [
				{
					name: 'Enable High Precision Mouse Input',
					type: SettingTypes.Toggle,
					off: 'Off',
					on: 'On',
					value: settings['[Input.1]']?.HighTickInput ?? 0,
					section: '[Input.1]',
					key: 'HighTickInput',
				},
			],
		},
	] satisfies SettingGroup[];

	function onChange(event: CustomEvent) {
		if (event.detail.setting.section && event.detail.setting.key) {
			settingsStore.updateSetting(
				event.detail.setting.section,
				event.detail.setting.key,
				event.detail.value
			);
		}
	}
</script>

<SettingsPage {settingGroups} on:change={onChange} />
