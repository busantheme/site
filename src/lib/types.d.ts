export type LanguageCode = 'ko' | 'en';
export type ThemeVariant = 'night' | 'light';

export type TranslationSet = {
    palette: string;
    ports: string;
    admin: string;
    variants: string;
    colors: string;
    copy: string;
    beach: string;
    gold: string;
    dongbaek: string;
    leaf: string;
    horison: string;
    mackerel: string;
    wakame: string;
    text: string;
    base: string;
};

export type ThemeInfo = {
    name: string;
    version: string;
};

export type ThemePalette = {
    base: string;
    beach: string;
    gold: string;
    dongbaek: string;
    leaf: string;
    horison: string;
    mackerel: string;
    wakame: string;
    text: string;
};

export type ThemeData = {
    theme: ThemeInfo;
    night: ThemePalette;
    light: ThemePalette;
};

export type UserPreferences = {
    language?: LanguageCode;
    theme?: ThemeVariant;
};

export interface PortRecord {
    id: number;
    name: string;
    url: string;
}

export type PortInput = {
    name: string;
    url: string;
};
