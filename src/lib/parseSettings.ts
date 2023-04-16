import { SettingsSchema } from '../schema/SettingsSchema';
import { settingsStore } from './settingsStore';

export const parseSettings = (settings: string) => {
	// Split the settings string into an array of lines
	let lines = settings.split('\n');

	// Remove all unnecessary characters from each line
	lines = lines.map((line) => line.trim().replace(/[^a-zA-Z0-9=\.[\]]/g, ''));

	// Remove all empty lines
	lines = lines.filter((line) => line.length > 0);

	const parsedData: { [key: string]: any } = {};
	let currentSection: string = '';

	for (const line of lines) {
		if (line.startsWith('[') && line.endsWith(']')) {
			currentSection = line;
			parsedData[currentSection] = {};
		} else if (currentSection) {
			const [key, value] = line.split('=');
			parsedData[currentSection][key] = value;
		}
	}

	const result = SettingsSchema.safeParse(parsedData);

	if (result.success) {
		settingsStore.set(result.data);
	}
};
