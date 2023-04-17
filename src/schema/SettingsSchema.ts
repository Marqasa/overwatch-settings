import { z } from 'zod';

export const SettingsSchema = z.object({
	'[Cinematics.1]': z
		.object({
			ShowIntro: z.coerce.number().optional(),
		})
		.optional(),
	'[environment.1]': z
		.object({
			Current: z.string().optional(),
		})
		.optional(),
	'[GPU.6]': z
		.object({
			GPUDeviceID: z.string().optional(),
			GPUName: z.string().optional(),
			GPUScaler: z.string().optional(),
			GPUVenderID: z.string().optional(),
		})
		.optional(),
	'[Input.1]': z
		.object({
			HighTickInput: z.coerce.number().optional(),
		})
		.optional(),
	'[Render.13]': z
		.object({
			AADetail: z.coerce.number().optional(),
			AnisotropicFiltering: z.coerce.number().optional(),
			CpuForceSyncEnabled: z.coerce.number().optional(),
			DirectionalShadowDetail: z.coerce.number().optional(),
			DynamicRenderScale: z.coerce.number().optional(),
			EffectsQuality: z.coerce.number().optional(),
			FrameRateCap: z.coerce.number().optional(),
			FullScreenHeight: z.coerce.number().optional(),
			FullScreenRefresh: z.coerce.number().optional(),
			FullScreenWidth: z.coerce.number().optional(),
			FullscreenWindow: z.coerce.number().optional(),
			FullscreenWindowEnabled: z.coerce.number().optional(),
			GFXPresetLevel: z.coerce.number().optional(),
			HighQualityUpsample: z.coerce.number().optional(),
			HorizontalFOV: z.coerce.number().optional(),
			ImageSharpening: z.coerce.number().optional(),
			LightQuality: z.coerce.number().optional(),
			LocalFogDetail: z.coerce.number().optional(),
			LocalReflections: z.coerce.number().optional(),
			MaxAnisotropy: z.coerce.number().optional(),
			MaxEffectsAnisotropy: z.coerce.number().optional(),
			MaxExtraQualityAnisotropy: z.coerce.number().optional(),
			MaxWorldScale: z.coerce.number().optional(),
			MinWorldScale: z.coerce.number().optional(),
			ModelQuality: z.coerce.number().optional(),
			RefractionDetail: z.coerce.number().optional(),
			RenderBrightness: z.coerce.number().optional(),
			RenderContrast: z.coerce.number().optional(),
			RenderGamma: z.coerce.number().optional(),
			ShowFPSCounter: z.coerce.number().optional(),
			ShowGPUTemp: z.coerce.number().optional(),
			ShowIND: z.coerce.number().optional(),
			ShowRTT: z.coerce.number().optional(),
			ShowSystemClock: z.coerce.number().optional(),
			ShowVRAMUsage: z.coerce.number().optional(),
			SimpleDirectionalShadows: z.coerce.number().optional(),
			SoundQuality: z.coerce.number().optional(),
			SSAODetail: z.coerce.number().optional(),
			SSLRDetailLevel: z.coerce.number().optional(),
			TextureDetail: z.coerce.number().optional(),
			TripleBufferingEnabled: z.coerce.number().optional(),
			UseCustomFrameRates: z.coerce.number().optional(),
			UseCustomWorldScale: z.coerce.number().optional(),
			VerticalSyncEnabled: z.coerce.number().optional(),
			WaterCombineCascades: z.coerce.number().optional(),
			WindowedFullscreen: z.coerce.number().optional(),
			WindowedHeight: z.coerce.number().optional(),
			WindowedPosX: z.coerce.number().optional(),
			WindowedPosY: z.coerce.number().optional(),
			WindowedRefresh: z.coerce.number().optional(),
			WindowedWidth: z.coerce.number().optional(),
			WindowMode: z.coerce.number().optional(),
		})
		.optional(),
	'[Sound.3]': z
		.object({
			AudioMix: z.coerce.number().optional(),
			MasterVolume: z.coerce.number().optional(),
			MusicVolume: z.coerce.number().optional(),
			SFXVolume: z.coerce.number().optional(),
			VoiceVolume: z.coerce.number().optional(),
		})
		.optional(),
	'[Subtitles.1]': z
		.object({
			Subtitles: z.coerce.number().optional(),
		})
		.optional(),
	'[TankMenuItems.1]': z
		.object({
			FPSOverlay: z.coerce.number().optional(),
		})
		.optional(),
});

export type Settings = z.infer<typeof SettingsSchema>;
export type SettingsKey = keyof Settings;
export type SectionKey<T extends SettingsKey> = keyof Settings[T];
