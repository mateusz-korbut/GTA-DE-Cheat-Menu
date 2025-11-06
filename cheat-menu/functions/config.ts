import { CONFIG_PATH } from '../config';

export const getBoolean = (section: string, key: string) =>
    IniFile.ReadString(CONFIG_PATH, section, key) === 'TRUE';

export const saveBoolean = (section: string, key: string, value: boolean) =>
    IniFile.WriteString(value ? 'TRUE' : 'FALSE', CONFIG_PATH, section, key);
