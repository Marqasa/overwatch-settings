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
			name: 'Advanced',
			settings: [
				{
					name: 'Graphics Quality',
					type: SettingTypes.Dropdown,
					options: [
						{ name: 'Low', value: 1 },
						{ name: 'Medium', value: 2 },
						{ name: 'High', value: 3 },
						{ name: 'Ultra', value: 4 },
						{ name: 'Epic', value: 5 },
					],
					value: settings['[Render.13]']?.GFXPresetLevel ?? 2,
					section: '[Render.13]',
					key: 'GFXPresetLevel',
					children: [
						{
							name: 'High Quality Upsampling',
							type: SettingTypes.Toggle,
							off: 'Default',
							on: 'AMD FSR 1.0',
							value: settings['[Render.13]']?.HighQualityUpsample ?? 0,
							section: '[Render.13]',
							key: 'HighQualityUpsample',
						},
						{
							name: 'Image Sharpening',
							type: SettingTypes.Slider,
							min: 0,
							max: 1,
							decimalPlaces: 2,
							value: settings['[Render.13]']?.ImageSharpening ?? 0.25,
							section: '[Render.13]',
							key: 'ImageSharpening',
							hidden: [0, undefined].includes(settings['[Render.13]']?.HighQualityUpsample),
						},
						{
							name: 'Texture Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
							],
							value:
								settings['[Render.13]']?.TextureDetail !== undefined
									? settings['[Render.13]'].TextureDetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'TextureDetail',
						},
						{
							name: 'Texture Filtering Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low - 1x', value: 1 },
								{ name: 'Medium - 2x', value: 2 },
								{ name: 'High - 4x', value: 4 },
								{ name: 'Ultra - 8x', value: 8 },
								{ name: 'Epic - 16x', value: 16 },
							],
							value:
								settings['[Render.13]']?.MaxAnisotropy !== undefined
									? settings['[Render.13]'].MaxAnisotropy
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 16
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 8
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'MaxAnisotropy',
						},
						{
							name: 'Local Fog Detail',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
								{ name: 'Ultra', value: 4 },
							],
							value:
								settings['[Render.13]']?.LocalFogDetail !== undefined
									? settings['[Render.13]'].LocalFogDetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'LocalFogDetail',
						},
						{
							name: 'Dynamic Reflections',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Off', value: 0 },
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
							],
							value:
								settings['[Render.13]']?.SimpleDirectionalShadows !== undefined
									? settings['[Render.13]'].SimpleDirectionalShadows
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'SimpleDirectionalShadows',
						},
						{
							name: 'Shadow Detail',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Off', value: 0 },
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
								{ name: 'Ultra', value: 4 },
							],
							value:
								settings['[Render.13]']?.DirectionalShadowDetail !== undefined
									? settings['[Render.13]'].DirectionalShadowDetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'DirectionalShadowDetail',
						},
						{
							name: 'Model Detail',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
								{ name: 'Ultra', value: 4 },
							],
							value:
								settings['[Render.13]']?.ModelQuality !== undefined
									? settings['[Render.13]'].ModelQuality
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'ModelQuality',
						},
						{
							name: 'Effects Detail',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
								{ name: 'Ultra', value: 4 },
							],
							value:
								settings['[Render.13]']?.EffectsQuality !== undefined
									? settings['[Render.13]'].EffectsQuality
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'EffectsQuality',
						},
						{
							name: 'Lighting Detail',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
								{ name: 'Ultra', value: 4 },
							],
							value:
								settings['[Render.13]']?.LightQuality !== undefined
									? settings['[Render.13]'].LightQuality
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'LightQuality',
						},
						{
							name: 'Antialias Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Off', value: 0 },
								{ name: 'Low - FXAA', value: 1 },
								{ name: 'Medium - SMAA Low', value: 2 },
								{ name: 'High - SMAA Medium', value: 3 },
								{ name: 'Ultra - SMAA High', value: 4 },
							],
							value:
								settings['[Render.13]']?.AADetail !== undefined
									? settings['[Render.13]'].AADetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 4
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'AADetail',
						},
						{
							name: 'Refraction Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
							],
							value:
								settings['[Render.13]']?.RefractionDetail !== undefined
									? settings['[Render.13]'].RefractionDetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'RefractionDetail',
						},
						{
							name: 'Screenshot Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: '1x Resolution', value: 1 },
								{ name: '3x Resolution', value: 2 },
								{ name: '5x Resolution', value: 3 },
								{ name: '7x Resolution', value: 4 },
								{ name: '9x Resolution', value: 5 },
							],
							value: 1,
							disabled: true,
						},
						{
							name: 'Ambient Occlusion',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Off', value: 0 },
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
							],
							value:
								settings['[Render.13]']?.SSAODetail !== undefined
									? settings['[Render.13]'].SSAODetail
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 3
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 2
									: 1,
							section: '[Render.13]',
							key: 'SSAODetail',
						},
						{
							name: 'Local Reflections',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value:
								settings['[Render.13]']?.LocalReflections !== undefined
									? settings['[Render.13]'].LocalReflections
									: settings['[Render.13]']?.GFXPresetLevel === 5
									? 1
									: settings['[Render.13]']?.GFXPresetLevel === 4
									? 1
									: settings['[Render.13]']?.GFXPresetLevel === 3
									? 1
									: settings['[Render.13]']?.GFXPresetLevel === 2
									? 1
									: 0,
							section: '[Render.13]',
							key: 'LocalReflections',
						},
						{
							name: 'Damage FX',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Default', value: 1 },
								{ name: 'Low', value: 2 },
							],
							value: 1,
							disabled: true,
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
