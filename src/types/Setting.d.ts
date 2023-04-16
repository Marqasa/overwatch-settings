import type { SectionKey } from '../schema/SettingsSchema';
import type { SettingsKey } from '../schema/SettingsSchema';
import { SettingTypes, type SettingType } from './SettingType';

export type SettingOption = {
	name: string;
	value: number;
};

export type SettingBase = {
	name: string;
	type: SettingType;
	value: number;
	hidden?: boolean;
	disabled?: boolean;
	section?: SettingsKey;
	key?: SectionKey;
	children?: Setting[];
};

export type DropdownSetting = SettingBase & {
	type: typeof SettingTypes.Dropdown;
	options: SettingOption[];
};

export type SliderSetting = SettingBase & {
	type: typeof SettingTypes.Slider;
	min: number;
	max: number;
	decimalPlaces: number;
};

export type ToggleSetting = SettingBase & {
	type: typeof SettingTypes.Toggle;
	on: string;
	off: string;
};

export type ModalSetting = SettingBase & {
	type: typeof SettingTypes.Modal;
};

export type Setting = DropdownSetting | SliderSetting | ToggleSetting | ModalSetting;
