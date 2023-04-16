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
			name: 'Volume',
			settings: [
				{
					name: 'Master Volume',
					type: SettingTypes.Slider,
					min: 0,
					max: 100,
					decimalPlaces: 0,
					value: settings['[Sound.3]'].MasterVolume,
					section: '[Sound.3]',
					key: 'MasterVolume',
					children: [
						{
							name: 'Sound Effects Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: settings['[Sound.3]'].SFXVolume,
							section: '[Sound.3]',
							key: 'SFXVolume',
						},
						{
							name: 'Music Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: settings['[Sound.3]'].MusicVolume,
							section: '[Sound.3]',
							key: 'MusicVolume',
						},
						{
							name: 'In-Game Voice Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: settings['[Sound.3]'].VoiceVolume,
							section: '[Sound.3]',
							key: 'VoiceVolume',
						},
					],
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
