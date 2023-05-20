<script lang="ts">
	import type { SettingGroup } from '$types/SettingGroup';
	import { settingsStore } from '$lib/settingsStore';
	import { SettingTypes } from '$types/SettingType';
	import SettingsPage from '$components/SettingsPage.svelte';

	// Default to an empty object
	$: Sound = $settingsStore['[Sound.3]'] ?? {};

	// Desctructure settings and assign defaults
	$: ({ MasterVolume = 100, SFXVolume = 100, MusicVolume = 100, VoiceVolume = 100 } = Sound);

	// Create the settings groups
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
					value: MasterVolume,
					section: '[Sound.3]',
					key: 'MasterVolume',
					children: [
						{
							name: 'Sound Effects Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: SFXVolume,
							section: '[Sound.3]',
							key: 'SFXVolume',
						},
						{
							name: 'Music Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: MusicVolume,
							section: '[Sound.3]',
							key: 'MusicVolume',
						},
						{
							name: 'In-Game Voice Volume',
							type: SettingTypes.Slider,
							min: 0,
							max: 100,
							decimalPlaces: 0,
							value: VoiceVolume,
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
