<script>
    import { language, translations } from '$lib/stores/language.js';

    /** @typedef {import('$lib/types').PortRecord} PortRecord */

    let { data } = $props();
    const ports = /** @type {PortRecord[]} */ (data.ports);

    let t = $derived(translations[$language]);
</script>

<div class="container py-5">
    <h1 class="page-title">{t.ports}</h1>
    <p class="page-subtitle">{$language === 'ko' ? '링크' : 'Links'}</p>
    
    <div class="ports-grid">
        {#each ports as port}
            <a href={port.url} target="_blank" class="port-card">
                <span class="port-name">{port.name}</span>
                <span class="port-url">{port.url}</span>
            </a>
        {/each}
    </div>
</div>

<style>
    .page-title {
        font-size: 2.5rem;
        font-weight: 300;
        margin-bottom: 8px;
    }
    .page-subtitle {
        opacity: 0.6;
        margin-bottom: 48px;
    }
    .ports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 16px;
    }
    .port-card {
        display: flex;
        flex-direction: column;
        padding: 24px;
        border-radius: 12px;
        background-color: var(--wakame);
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .port-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .port-name {
        font-weight: 500;
        font-size: 1.1rem;
        margin-bottom: 8px;
    }
    .port-url {
        font-size: 0.9rem;
        opacity: 0.75;
        word-break: break-all;
    }
</style>
