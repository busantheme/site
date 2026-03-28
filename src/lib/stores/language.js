import { writable } from 'svelte/store';

/** @typedef {import('$lib/types').LanguageCode} LanguageCode */
/** @typedef {import('$lib/types').TranslationSet} TranslationSet */

function createLanguageStore() {
    const initialLanguage = /** @type {LanguageCode} */ ('ko');
    const { subscribe, set, update } = writable(initialLanguage);

    return {
        subscribe,
        set,
        toggle: () => update((lang) => (lang === 'ko' ? 'en' : 'ko'))
    };
}

export const language = createLanguageStore();

/** @type {Record<LanguageCode, TranslationSet>} */
export const translations = {
    ko: {
        palette: '팔레트',
        ports: '포트',
        admin: '관리자',
        variants: '배리언트',
        colors: '컬러',
        copy: '복사됨!',
        beach: '바다',
        gold: '황혼',
        dongbaek: '동백',
        leaf: '녹지',
        horison: '지평선',
        mackerel: '고등어',
        wakame: '다시마',
        text: '본문',
        base: '베이스'
    },
    en: {
        palette: 'Palette',
        ports: 'Ports',
        admin: 'Admin',
        variants: 'variants',
        colors: 'colors',
        copy: 'Copied!',
        beach: 'Beach',
        gold: 'Gold',
        dongbaek: 'Dongbaek',
        leaf: 'Leaf',
        horison: 'Horison',
        mackerel: 'Mackerel',
        wakame: 'Wakame',
        text: 'Text',
        base: 'Base'
    }
};
