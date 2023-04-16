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
			name: 'Stats',
			settings: [
				{
					name: 'Display Performance Stats',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value:
						settings['[Render.13]'].ShowFPSCounter ||
						settings['[Render.13]'].ShowVRAMUsage ||
						settings['[Render.13]'].ShowRTT ||
						settings['[Render.13]'].ShowIND ||
						settings['[Render.13]'].ShowGPUTemp,
					children: [
						{
							name: 'Show Framerate',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: settings['[Render.13]'].ShowFPSCounter,
							section: '[Render.13]',
							key: 'ShowFPSCounter',
						},
						{
							name: 'Show GPU Temperature',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: settings['[Render.13]'].ShowGPUTemp,
							section: '[Render.13]',
							key: 'ShowGPUTemp',
						},
						{
							name: 'Show VRAM Usage',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: settings['[Render.13]'].ShowVRAMUsage,
							section: '[Render.13]',
							key: 'ShowVRAMUsage',
						},
						{
							name: 'Show Network Latency',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: settings['[Render.13]'].ShowRTT,
							section: '[Render.13]',
							key: 'ShowRTT',
						},
						{
							name: 'Show Network Interpolation Delay',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: settings['[Render.13]'].ShowIND,
							section: '[Render.13]',
							key: 'ShowIND',
						},
					],
				},
			],
		},
		{
			name: 'Information',
			settings: [
				{
					name: 'Display System Clock',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: settings['[Render.13]'].ShowSystemClock,
					section: '[Render.13]',
					key: 'ShowSystemClock',
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
		} else if (event.detail.setting.name === 'Display Performance Stats') {
			if (event.detail.value === 0) {
				settingsStore.updateSetting('[Render.13]', 'ShowFPSCounter', 0);
				settingsStore.updateSetting('[Render.13]', 'ShowVRAMUsage', 0);
				settingsStore.updateSetting('[Render.13]', 'ShowRTT', 0);
				settingsStore.updateSetting('[Render.13]', 'ShowIND', 0);
				settingsStore.updateSetting('[Render.13]', 'ShowGPUTemp', 0);
			} else {
				settingsStore.updateSetting('[Render.13]', 'ShowFPSCounter', 1);
				settingsStore.updateSetting('[Render.13]', 'ShowRTT', 1);
			}
		}
	}
</script>

<SettingsPage {settingGroups} on:change={onChange} />
