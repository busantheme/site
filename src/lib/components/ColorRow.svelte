<script>
    let { color, name, description, textColor } = $props();
    let copied = $state(false);

    function copy() {
        navigator.clipboard.writeText(color);
        copied = true;
        setTimeout(() => copied = false, 1500);
    }
</script>

<button class="color-row" onclick={copy}>
    <div class="color-swatch" style="background-color: {color};"></div>
    <div class="color-info">
        <span class="color-name">{name}</span>
        <span class="color-desc">{description}</span>
    </div>
    <code class="color-code" style="color: {textColor};">{color}</code>
    {#if copied}
        <span class="copied-badge">Copied!</span>
    {/if}
</button>

<style>
    .color-row {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 12px 16px;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.2s;
        position: relative;
    }
    .color-row:hover {
        background-color: rgba(128, 128, 128, 0.15);
    }
    .color-swatch {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        margin-right: 16px;
        flex-shrink: 0;
    }
    .color-info {
        flex: 1;
        text-align: left;
    }
    .color-name {
        display: block;
        font-weight: 500;
        font-size: 1rem;
    }
    .color-desc {
        display: block;
        font-size: 0.85rem;
        opacity: 0.7;
    }
    .color-code {
        font-size: 0.9rem;
        opacity: 0.8;
    }
    .copied-badge {
        position: absolute;
        right: 16px;
        background-color: rgba(0,0,0,0.8);
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        animation: fadeOut 1.5s forwards;
    }
    @keyframes fadeOut {
        0%, 70% { opacity: 1; }
        100% { opacity: 0; }
    }
</style>
