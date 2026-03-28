<script>
    import { language } from '$lib/stores/language.js';
</script>

<button class="lang-switch" onclick={() => language.toggle()}>
    {$language === 'ko' ? 'EN' : '한'}
</button>

<style>
    .lang-switch {
        background: none;
        border: 1px solid var(--text-color);
        border-radius: 6px;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-color);
        transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .lang-switch:hover {
        transform: scale(1.05);
        background-color: rgba(128, 128, 128, 0.2);
    }
</style>
