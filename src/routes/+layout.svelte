<script>
    import favicon from '$lib/assets/favicon.svg';
    import { language, translations } from '$lib/stores/language.js';

    /** @typedef {import('$lib/types').ThemeData} ThemeData */
    /** @typedef {import('$lib/types').UserPreferences} UserPreferences */

    let { children, data } = $props();
    const theme = /** @type {ThemeData} */ (data.theme);
    const preferences = /** @type {UserPreferences} */ (data.preferences ?? { language: 'ko', theme: 'night' });

	let isDark = $state(preferences?.theme === 'light' ? false : true);
	let t = $derived(translations[$language]);

	$effect(() => {
		if (preferences?.language) {
			language.set(preferences.language);
		}
	});

	async function toggleTheme() {
		isDark = !isDark;
		await savePreferences();
	}

	async function toggleLanguage() {
		language.toggle();
		await savePreferences();
	}

	async function savePreferences() {
		const formData = new FormData();
		formData.append('language', $language);
		formData.append('theme', isDark ? 'night' : 'light');
		
		try {
			await fetch('/api/preferences', {
				method: 'POST',
				body: formData
			});
		} catch (e) {
			console.log('Failed to save to Redis');
		}
	}

	let colors = $derived(isDark ? theme.night : theme.light);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Busan Theme</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script> 
</svelte:head>

<nav class="navbar navbar-expand-lg" style="--bg-base: {colors.base}; --text-color: {colors.text};">
	<div class="container">
		<a class="navbar-brand" href="/">Busan Theme</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav ms-auto">
				<li class="nav-item">
					<a class="nav-link" href="/">{t.palette}</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/ports">{t.ports}</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/admin">{t.admin}</a>
				</li>
				<li class="nav-item">
					<button class="btn theme-toggle" onclick={toggleTheme} aria-label="Toggle theme">
						{#if isDark}
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
						{/if}
					</button>
				</li>
				<li class="nav-item">
					<button class="lang-switch" onclick={toggleLanguage}>
						{$language === 'ko' ? 'EN' : '한'}
					</button>
				</li>
			</ul>
		</div>
	</div>
</nav>

<main style="--bg-base: {colors.base}; --text-color: {colors.text}; --beach: {colors.beach}; --gold: {colors.gold}; --mackerel: {colors.mackerel}; --wakame: {colors.wakame};">
	{@render children()}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	:global(.navbar) {
		background-color: var(--bg-base) !important;
	}
	:global(.navbar-brand), :global(.nav-link) {
		color: var(--text-color) !important;
		transition: color 0.3s ease;
	}
	:global(.nav-link:hover) {
		opacity: 0.8;
	}
	:global(main) {
		background-color: var(--bg-base);
		min-height: 100vh;
	}
	:global(h1, h2, h3, h4, h5, h6, p, span, li) {
		color: var(--text-color);
	}
	:global(a) {
		color: var(--text-color);
	}
	:global(.card) {
		background-color: var(--bg-base);
		border-color: var(--mackerel);
		color: var(--text-color);
	}
	:global(.card-header) {
		background-color: var(--wakame);
		color: var(--text-color);
	}
	:global(.card-body) {
		background-color: var(--bg-base);
		color: var(--text-color);
	}
	:global(.table) {
		--bs-table-bg: var(--bg-base);
		--bs-table-color: var(--text-color);
		--bs-table-border-color: var(--mackerel);
	}
	:global(.breadcrumb-item), :global(.breadcrumb-item a) {
		color: var(--text-color);
	}
	:global(.form-control) {
		background-color: var(--bg-base);
		border-color: var(--mackerel);
		color: var(--text-color);
	}
	:global(.form-control:focus) {
		background-color: var(--bg-base);
		color: var(--text-color);
	}
	:global(.form-label) {
		color: var(--text-color);
	}
	:global(.list-group-item) {
		background-color: var(--bg-base);
		border-color: var(--mackerel);
		color: var(--text-color);
	}
	:global(code) {
		color: var(--text-color);
		opacity: 0.85;
	}
	.theme-toggle {
		background: none;
		border: 1px solid var(--text-color);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.2s ease;
	}
	.theme-toggle:hover {
		transform: scale(1.1);
	}
	.theme-toggle svg {
		vertical-align: middle;
		color: var(--text-color);
	}
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
		margin-left: 8px;
	}
	.lang-switch:hover {
		transform: scale(1.05);
		background-color: rgba(128, 128, 128, 0.2);
	}
</style>
