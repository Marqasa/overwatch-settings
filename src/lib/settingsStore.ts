import { writable } from 'svelte/store';
import type { SectionKey, Settings, SettingsKey } from '../schema/SettingsSchema';
import { invoke } from '@tauri-apps/api/tauri';
import { prepareSettings } from './prepareSettings';

function createSettingsStore() {
	const { subscribe, set, update } = writable<Settings>();

	function updateSetting<T extends SettingsKey>(section: T, setting: SectionKey<T>, value: any) {
		update((settings) => {
			settings[section][setting] = value;

			if (setting === 'WindowMode') {
				settings['[Render.13]'].WindowedFullscreen = 0;
				settings['[Render.13]'].FullscreenWindow = 0;
				settings['[Render.13]'].FullscreenWindowEnabled = 0;

				switch (value) {
					case 0:
						settings['[Render.13]'].FullscreenWindowEnabled = 1;
						break;
					case 1:
						settings['[Render.13]'].WindowedFullscreen = 1;
						break;
					case 2:
						settings['[Render.13]'].FullscreenWindow = 1;
						break;
				}
			} else if (setting === 'UseCustomWorldScale' && value === 0) {
				settings['[Render.13]'].MinWorldScale = 50;
				settings['[Render.13]'].MaxWorldScale = 100;
			} else if (setting === 'UseCustomFrameRates' && value === 0) {
				settings['[Render.13]'].FrameRateCap = 60;
			} else if (setting === 'GFXPresetLevel') {
				settings['[Render.13]'].TextureDetail = value >= 3 ? 3 : value;
				settings['[Render.13]'].AnisotropicFiltering = value;
				settings['[Render.13]'].LocalFogDetail = value >= 4 ? 4 : value;
				settings['[Render.13]'].SimpleDirectionalShadows = value >= 3 ? 3 : value;
				settings['[Render.13]'].DirectionalShadowDetail = value >= 4 ? 4 : value;
				settings['[Render.13]'].ModelQuality = value >= 4 ? 4 : value;
				settings['[Render.13]'].EffectsQuality = value >= 4 ? 4 : value;
				settings['[Render.13]'].LightQuality = value >= 4 ? 4 : value;
				settings['[Render.13]'].AADetail = value >= 4 ? 4 : value;
				settings['[Render.13]'].RefractionDetail = value >= 3 ? 3 : value;
				settings['[Render.13]'].SSAODetail = value >= 3 ? 3 : value;
				settings['[Render.13]'].LocalReflections = value >= 3 ? 1 : 0;
			}

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
