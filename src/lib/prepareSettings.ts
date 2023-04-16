import type { Settings } from '../schema/SettingsSchema';

/**
 * Prepare settings for writing to the file
 * @param settings
 */
export function prepareSettings(settings: Settings): string {
	let output = '';

	for (const section of Object.keys(settings)) {
		output += `${section}\n`;

		const sectionSettings = settings[section as keyof Settings];

		for (const [key, value] of Object.entries(sectionSettings)) {
			output += `${key} = "${value}"\n`;
		}

		output += '\n';
	}

	return output;
}
