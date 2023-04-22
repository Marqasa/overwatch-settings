<script lang="ts">
	import type { SettingGroup } from '$types/SettingGroup';
	import { settingsStore } from '$lib/settingsStore';
	import { SettingTypes } from '$types/SettingType';
	import SettingsPage from '$components/SettingsPage.svelte';

	// Default to an empty object
	$: Render13 = $settingsStore['[Render.13]'] ?? {};

	// Default to medium
	$: ({ GFXPresetLevel = 2 } = Render13);

	// Desctructure settings and assign defaults
	$: ({
		AADetail = GFXPresetLevel > 3 ? 3 : GFXPresetLevel === 3 ? 2 : 1,
		DirectionalShadowDetail = GFXPresetLevel === 5
			? 4
			: GFXPresetLevel === 4
			? 3
			: GFXPresetLevel === 3
			? 2
			: 1,
		EffectsQuality = GFXPresetLevel === 5
			? 4
			: GFXPresetLevel === 4
			? 3
			: GFXPresetLevel === 3
			? 2
			: 1,
		HighQualityUpsample = GFXPresetLevel > 3 ? 1 : 0,
		ImageSharpening = 0.25,
		LightQuality = GFXPresetLevel > 3 ? 3 : GFXPresetLevel === 3 ? 2 : GFXPresetLevel === 2 ? 1 : 0,
		LocalFogDetail = GFXPresetLevel === 5
			? 4
			: GFXPresetLevel === 4
			? 3
			: GFXPresetLevel === 3
			? 3
			: GFXPresetLevel === 2
			? 2
			: 1,
		LocalReflections = GFXPresetLevel > 1 ? 1 : 0,
		MaxAnisotropy = GFXPresetLevel === 5
			? 16
			: GFXPresetLevel === 4
			? 8
			: GFXPresetLevel === 3
			? 4
			: GFXPresetLevel === 2
			? 2
			: 1,
		ModelQuality = GFXPresetLevel === 5 ? 4 : GFXPresetLevel === 4 ? 3 : GFXPresetLevel > 1 ? 2 : 1,
		RefractionDetail = GFXPresetLevel > 2 ? 2 : GFXPresetLevel === 2 ? 1 : 0,
		SimpleDirectionalShadows = GFXPresetLevel > 1 ? 0 : 1,
		SSAODetail = GFXPresetLevel > 2 ? GFXPresetLevel - 2 : GFXPresetLevel - 1,
		SSQuality = 0,
		TextureDetail = 3,
	} = Render13);

	// Create the settings groups
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
					value: GFXPresetLevel,
					section: '[Render.13]',
					key: 'GFXPresetLevel',
					children: [
						{
							name: 'High Quality Upsampling',
							type: SettingTypes.Toggle,
							off: 'Default',
							on: 'AMD FSR 1.0',
							value: HighQualityUpsample,
							section: '[Render.13]',
							key: 'HighQualityUpsample',
						},
						{
							name: 'Image Sharpening',
							type: SettingTypes.Slider,
							min: 0,
							max: 1,
							decimalPlaces: 2,
							value: ImageSharpening,
							section: '[Render.13]',
							key: 'ImageSharpening',
							hidden: HighQualityUpsample === 0,
						},
						{
							name: 'Texture Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: 'Low', value: 1 },
								{ name: 'Medium', value: 2 },
								{ name: 'High', value: 3 },
							],
							value: TextureDetail,
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
							value: MaxAnisotropy,
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
							value: LocalFogDetail,
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
							value: SimpleDirectionalShadows,
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
							value: DirectionalShadowDetail,
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
							value: ModelQuality,
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
							value: EffectsQuality,
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
							value: LightQuality,
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
							value: AADetail,
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
							value: RefractionDetail,
							section: '[Render.13]',
							key: 'RefractionDetail',
						},
						{
							name: 'Screenshot Quality',
							type: SettingTypes.Dropdown,
							options: [
								{ name: '1x Resolution', value: 0 },
								{ name: '3x Resolution', value: 1 },
								{ name: '5x Resolution', value: 2 },
								{ name: '7x Resolution', value: 3 },
								{ name: '9x Resolution', value: 4 },
							],
							value: SSQuality,
							section: '[Render.13]',
							key: 'SSQuality',
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
							value: SSAODetail,
							section: '[Render.13]',
							key: 'SSAODetail',
						},
						{
							name: 'Local Reflections',
							type: SettingTypes.Toggle,
							on: 'On',
							off: 'Off',
							value: LocalReflections,
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

	/**
	 * Update settings when a setting is changed
	 * @param event
	 */
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
