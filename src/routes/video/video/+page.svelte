<script lang="ts">
	import type { SettingGroup } from '$types/SettingGroup';
	import type { Settings } from '../../../schema/SettingsSchema';
	import type { VideoMode } from '$types/VideoMode';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onDestroy } from 'svelte';
	import { settingsStore } from '$lib/settingsStore';
	import { SettingTypes } from '$types/SettingType';
	import SettingsPage from '$components/SettingsPage.svelte';

	let settings: Settings;
	let videoModes: VideoMode[] = [];

	invoke<VideoMode[]>('get_video_modes').then((result) => {
		videoModes = result;
	});

	const unsubscribe = settingsStore.subscribe((value) => (settings = value));

	onDestroy(unsubscribe);

	$: settingGroups = [
		{
			name: 'Apple GPU',
			settings: [
				{
					name: 'Display Mode',
					type: SettingTypes.Dropdown,
					options: [
						{
							name: 'Window',
							value: 2,
						},
						{
							name: 'Fullscreen',
							value: 0,
						},
						{
							name: 'Borderless Window',
							value: 1,
						},
					],
					value: settings['[Render.13]']?.WindowMode ?? 0,
					section: '[Render.13]',
					key: 'WindowMode',
				},
				{
					name: 'Target Display',
					type: SettingTypes.Dropdown,
					options: [{ name: 'Best Match', value: 0 }],
					value: 0,
					disabled: true,
				},
				{
					name: 'Resolution',
					type: SettingTypes.Dropdown,
					options: videoModes.length
						? videoModes.map((mode, index) => ({
								name: `${mode.width} X ${mode.height} (${mode.refresh_rate})`,
								value: index,
						  }))
						: [{ name: 'Loading...', value: 0 }],
					value: videoModes.findIndex(
						(mode) =>
							mode.width === settings['[Render.13]']?.FullScreenWidth &&
							mode.height === settings['[Render.13]']?.FullScreenHeight &&
							mode.refresh_rate === settings['[Render.13]']?.FullScreenRefresh
					),
				},
				{
					name: 'Field of View',
					type: SettingTypes.Slider,
					min: 80,
					max: 103,
					decimalPlaces: 0,
					value: settings['[Render.13]']?.HorizontalFOV ?? 103,
					section: '[Render.13]',
					key: 'HorizontalFOV',
				},
				{
					name: 'Aspect Ratio',
					type: SettingTypes.Dropdown,
					options: [{ name: '16:9', value: 0 }],
					value: 0,
					disabled: true,
				},
				{
					name: 'Dynamic Render Scale',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: settings['[Render.13]']?.DynamicRenderScale ?? 1,
					section: '[Render.13]',
					key: 'DynamicRenderScale',
				},
				{
					name: 'Render Scale',
					type: SettingTypes.Dropdown,
					options: [
						{ name: 'Automatic', value: 0 },
						{ name: 'Custom', value: 1 },
					],
					value: settings['[Render.13]']?.UseCustomWorldScale ?? 0,
					section: '[Render.13]',
					key: 'UseCustomWorldScale',
				},
				{
					name:
						settings['[Render.13]']?.DynamicRenderScale === 1
							? 'Maximum Render Scale'
							: 'In-Game Resolution',
					type: SettingTypes.Slider,
					min: 50,
					max: 200,
					decimalPlaces: 0,
					value: settings['[Render.13]']?.MaxWorldScale ?? 100,
					section: '[Render.13]',
					key: 'MaxWorldScale',
					hidden: [0, undefined].includes(settings['[Render.13]']?.UseCustomWorldScale),
				},
				{
					name: 'Minimum Render Scale',
					type: SettingTypes.Slider,
					min: 50,
					max: 200,
					decimalPlaces: 0,
					value: settings['[Render.13]']?.MinWorldScale ?? 75,
					section: '[Render.13]',
					key: 'MinWorldScale',
					hidden:
						[0, undefined].includes(settings['[Render.13]']?.UseCustomWorldScale) ||
						[0, undefined].includes(settings['[Render.13]']?.DynamicRenderScale),
				},
				{
					name: 'Frame Rate',
					type: SettingTypes.Dropdown,
					options: [
						{ name: 'Automatic', value: 0 },
						{ name: 'Custom', value: 1 },
					],
					value: settings['[Render.13]']?.UseCustomFrameRates ?? 0,
					section: '[Render.13]',
					key: 'UseCustomFrameRates',
				},
				{
					name: 'Maximum Frame Rate',
					type: SettingTypes.Slider,
					min: 30,
					max: 600,
					decimalPlaces: 0,
					value: settings['[Render.13]']?.FrameRateCap ?? 300,
					section: '[Render.13]',
					key: 'FrameRateCap',
					hidden: [0, undefined].includes(settings['[Render.13]']?.UseCustomFrameRates),
				},
				{
					name: 'VSync',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: settings['[Render.13]']?.VerticalSyncEnabled ?? 0,
					section: '[Render.13]',
					key: 'VerticalSyncEnabled',
				},
				{
					name: 'Triple Buffering',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: settings['[Render.13]']?.TripleBufferingEnabled ?? 0,
					section: '[Render.13]',
					key: 'TripleBufferingEnabled',
				},
				{
					name: 'Reduce Buffering',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: settings['[Render.13]']?.CpuForceSyncEnabled ?? 0,
					section: '[Render.13]',
					key: 'CpuForceSyncEnabled',
				},
				{
					name: 'NVIDIA Reflex',
					type: SettingTypes.Dropdown,
					options: [{ name: 'Disabled', value: 0 }],
					value: 0,
					disabled: true,
				},
				{
					name: 'Gamma Correction',
					type: SettingTypes.Slider,
					min: 1.0,
					max: 3.0,
					decimalPlaces: 2,
					value: settings['[Render.13]']?.RenderGamma ?? 2.2,
					section: '[Render.13]',
					key: 'RenderGamma',
				},
				{
					name: 'Contrast',
					type: SettingTypes.Slider,
					min: 0.5,
					max: 2.0,
					decimalPlaces: 2,
					value: settings['[Render.13]']?.RenderContrast ?? 1.0,
					section: '[Render.13]',
					key: 'RenderContrast',
				},
				{
					name: 'Brightness',
					type: SettingTypes.Slider,
					min: -0.25,
					max: 0.25,
					decimalPlaces: 2,
					value: settings['[Render.13]']?.RenderBrightness ?? 0,
					section: '[Render.13]',
					key: 'RenderBrightness',
				},
			],
		},
		{
			name: 'HDR',
			settings: [
				{
					name: 'HDR',
					type: SettingTypes.Toggle,
					on: 'On',
					off: 'Off',
					value: 0,
					disabled: true,
				},
				{
					name: 'HDR Calibration',
					type: SettingTypes.Modal,
					value: 0,
					disabled: true,
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
		} else if (event.detail.setting.name === 'Resolution') {
			const option = videoModes.at(event.detail.value);

			if (!option) return;

			settingsStore.updateSetting(
				'[Render.13]',
				'FullScreenWidth' as keyof (typeof settings)['[Render.13]'],
				option.width
			);

			settingsStore.updateSetting(
				'[Render.13]',
				'FullScreenHeight' as keyof (typeof settings)['[Render.13]'],
				option.height
			);

			settingsStore.updateSetting(
				'[Render.13]',
				'FullScreenRefresh' as keyof (typeof settings)['[Render.13]'],
				option.refresh_rate
			);
		}
	}
</script>

<SettingsPage {settingGroups} on:change={onChange} />
