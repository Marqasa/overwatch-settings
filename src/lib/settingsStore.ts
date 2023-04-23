import { writable } from 'svelte/store';
import type { SectionKey, Settings, SettingsKey } from '../schema/SettingsSchema';
import { invoke } from '@tauri-apps/api/tauri';
import { prepareSettings } from './prepareSettings';

function createSettingsStore() {
	const { subscribe, set, update } = writable<Settings>();

	function updateSetting<T extends SettingsKey>(section: T, setting: SectionKey<T>, value: any) {
		update((settings) => {
			const newSettings = { ...settings };

			if (!newSettings['[Render.13]']) {
				newSettings['[Render.13]'] = {};
			}

			const newSection = { ...(newSettings[section] ?? ({} as any)) };

			newSection[setting] = value;
			newSettings[section] = newSection;

			if (setting === 'WindowMode') {
				newSettings['[Render.13]'].WindowedFullscreen = 0;
				newSettings['[Render.13]'].FullscreenWindow = 0;
				newSettings['[Render.13]'].FullscreenWindowEnabled = 0;

				switch (value) {
					case 0:
						newSettings['[Render.13]'].FullscreenWindowEnabled = 1;
						break;
					case 1:
						newSettings['[Render.13]'].WindowedFullscreen = 1;
						break;
					case 2:
						newSettings['[Render.13]'].FullscreenWindow = 1;
						break;
				}
			} else if (setting === 'UseCustomWorldScale' && value === 0) {
				newSettings['[Render.13]'].MinWorldScale = 50;
				newSettings['[Render.13]'].MaxWorldScale = 100;
			} else if (setting === 'UseCustomFrameRates' && value === 0) {
				newSettings['[Render.13]'].FrameRateCap = 60;
			} else if (setting === 'GFXPresetLevel') {
				newSettings['[Render.13]'].AADetail = value >= 4 ? 3 : value === 3 ? 2 : 1;
				newSettings['[Render.13]'].AnisotropicFiltering = value >= 2 ? 1 : 0;
				newSettings['[Render.13]'].DirectionalShadowDetail =
					value === 5 ? 4 : value === 4 ? 3 : value === 3 ? 2 : 1;
				newSettings['[Render.13]'].EffectsQuality =
					value === 5 ? 4 : value === 4 ? 3 : value === 3 ? 2 : 1;
				newSettings['[Render.13]'].HighQualityUpsample = value >= 4 ? 1 : 0;
				newSettings['[Render.13]'].LightQuality =
					value >= 4 ? 3 : value === 3 ? 2 : value === 2 ? 1 : 0;
				newSettings['[Render.13]'].LocalFogDetail =
					value === 5 ? 4 : value >= 3 ? 3 : value === 2 ? 2 : 1;
				newSettings['[Render.13]'].LocalReflections = value >= 2 ? 1 : 0;
				newSettings['[Render.13]'].MaxAnisotropy =
					value === 5 ? 16 : value === 4 ? 8 : value === 3 ? 4 : value === 2 ? 2 : 1;
				newSettings['[Render.13]'].MaxEffectsAnisotropy =
					value === 5 ? 8 : value === 4 ? 4 : value === 3 ? 2 : 1;
				newSettings['[Render.13]'].MaxExtraQualityAnisotropy =
					value === 5 ? 16 : value === 4 ? 16 : value === 3 ? 8 : value === 2 ? 4 : 1;
				newSettings['[Render.13]'].ModelQuality =
					value === 5 ? 4 : value === 4 ? 3 : value === 3 ? 2 : 1;
				// newSettings['[Render.13]'].PhysicsQuality = value === 5 ? 2 : 1;
				newSettings['[Render.13]'].RefractionDetail = value >= 3 ? 2 : value === 2 ? 1 : 0;
				newSettings['[Render.13]'].ShaderQuality = value >= 3 ? 3 : value;
				newSettings['[Render.13]'].SimpleDirectionalShadows = value >= 2 ? 0 : 1;
				newSettings['[Render.13]'].SSAODetail =
					value === 5 ? 3 : value === 4 ? 2 : value >= 2 ? 1 : 0;
				newSettings['[Render.13]'].SSQuality = 0;
				newSettings['[Render.13]'].TextureDetail = 3;
				// newSettings['[Render.13]'].WaterCombineCascades = value >= 4 ? 1 : 0;
			} else if (setting === 'MaxAnisotropy') {
				newSettings['[Render.13]'].AnisotropicFiltering = value >= 2 ? 1 : 0;
				newSettings['[Render.13]'].MaxEffectsAnisotropy =
					value === 16 ? 8 : value === 8 ? 4 : value === 4 ? 2 : 1;
				newSettings['[Render.13]'].MaxExtraQualityAnisotropy =
					value >= 8 ? 16 : value >= 4 ? 8 : value >= 2 ? 4 : 1;
			}

			settings = newSettings;

			invoke('write_settings', { settings: prepareSettings(settings) });

			return settings;
		});
	}

	return {
		set,
		subscribe,
		updateSetting,
	};
}

export const settingsStore = createSettingsStore();
