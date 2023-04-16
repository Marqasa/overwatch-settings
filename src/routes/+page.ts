import type { PageLoad } from './$types';
import { invoke } from '@tauri-apps/api/tauri';
import { parseSettings } from '$lib/parseSettings';
import { goto } from '$app/navigation';

export const load = (async () => {
	invoke<string>('get_settings').then((message) => {
		parseSettings(message);
		goto('/video/video');
	});
}) satisfies PageLoad;
