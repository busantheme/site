<script>
    import ColorRow from '$lib/components/ColorRow.svelte';
    import { language, translations } from '$lib/stores/language.js';

    /** @typedef {import('$lib/types').ThemeData} ThemeData */
    /** @typedef {import('$lib/types').LanguageCode} LanguageCode */
    /** @typedef {import('$lib/types').ThemeVariant} ThemeVariant */

    let { data } = $props();
    const theme = /** @type {ThemeData} */ (data.theme);
    const variants = /** @type {ThemeVariant[]} */ (['night', 'light']);
    
    let t = $derived(translations[$language]);

    const colorNames = /** @type {Record<string, string>} */ ({
        beach: t.beach,
        gold: t.gold,
        dongbaek: t.dongbaek,
        leaf: t.leaf,
        horison: t.horison,
        mackerel: t.mackerel,
        wakame: t.wakame,
        text: t.text
    });

    /** @type {Record<LanguageCode, Record<string, string>>} */
    const colorDescriptions = {
        ko: {
            beach: '부산의 바다',
            gold: '황혼의 노을',
            dongbaek: '봄의 동백',
            leaf: '도시의 녹지',
            horison: '지평선',
            mackerel: '바다의 생기',
            wakame: '바다의 향기',
            text: '기본 텍스트'
        },
        en: {
            beach: 'Busan sea',
            gold: 'Sunset glow',
            spring: 'Spring camellia',
            leaf: 'Urban greenery',
            horison: 'Horizon',
            mackerel: 'Ocean memory',
            wakame: 'Sea fragrance',
            text: 'Default text'
        }
    };

    let descriptions = $derived(colorDescriptions[$language]);
</script>

<div class="hero">
    <h1 class="hero-title">Busan Theme</h1>
    <p class="hero-subtitle">{$language === 'ko' ? '부산의 자연에서 영감을 받은 테마' : 'Theme inspired by Busan nature'}</p>
</div>

<main class="container py-5">
    <section class="palette-section">
        <div class="section-header">
            <h2 class="section-title">{t.palette}</h2>
            <p class="section-count">2 {t.variants} & 16 {t.colors}</p>
        </div>

        {#each variants as variant}
            <div class="variant-section">
                <h3 class="variant-title text-capitalize">{variant}</h3>
                
                {#each Object.entries(theme[variant] || {}).filter(([k]) => k !== 'base') as [key, value]}
                    <ColorRow 
                        color={value} 
                        name={colorNames[key] || key} 
                        description={descriptions[key] || ''}
                        textColor={theme[variant].text}
                    />
                {/each}
            </div>
        {/each}
    </section>
</main>

<style>
    .hero {
        text-align: center;
        padding: 80px 20px 40px;
    }
    .hero-title {
        font-size: 3.5rem;
        font-weight: 300;
        letter-spacing: -0.02em;
        margin-bottom: 16px;
    }
    .hero-subtitle {
        font-size: 1.25rem;
        opacity: 0.75;
    }
    .palette-section {
        max-width: 800px;
        margin: 0 auto;
    }
    .section-header {
        text-align: center;
        margin-bottom: 48px;
    }
    .section-title {
        font-size: 2rem;
        font-weight: 300;
        margin-bottom: 8px;
    }
    .section-count {
        opacity: 0.6;
        font-size: 0.9rem;
    }
    .variant-section {
        margin-bottom: 48px;
    }
    .variant-title {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 24px;
        opacity: 0.8;
    }
</style>
