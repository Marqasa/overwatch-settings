export const SettingTypes = {
	Dropdown: 'Dropdown',
	Slider: 'Slider',
	Toggle: 'Toggle',
	Modal: 'Modal',
} as const;

export type SettingType = (typeof SettingTypes)[keyof typeof SettingTypes];
