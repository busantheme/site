import { join } from 'npm:path'; // Using npm:path for consistency with other npm imports

/** @typedef {import('$lib/types').ThemeData} ThemeData */

/**
 * @param {string} content
 * @returns {Record<string, Record<string, string>>}
 */
function parseToml(content) {
    const lines = content.split('\n');
    const result = /** @type {Record<string, Record<string, string>>} */ ({});
    let currentSection = null;
    let currentObj = /** @type {Record<string, string>} */ ({});

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            if (currentSection) {
                result[currentSection] = currentObj;
            }
            currentSection = trimmed.slice(1, -1);
<<<<<<< HEAD
            currentObj = /** @type {Record<string, string>} */ ({});
        } else if (currentSection && trimmed.includes('=')) {
=======
            currentObj = {};
        } else if (trimmed.includes('=')) {
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
            currentObj[key.trim()] = value;
        }
    }

    if (currentSection) {
        result[currentSection] = currentObj;
    }

    return result;
}

<<<<<<< HEAD
/**
 * @returns {ThemeData}
 */
export function loadTheme() {
    try {
        const tomlPath = join(process.cwd(), '..', 'theme.toml');
        const content = readFileSync(tomlPath, 'utf-8');
        const parsedTheme = parseToml(content);
        return /** @type {ThemeData} */ (parsedTheme);
=======
export async function getTheme() {
    try {
        const tomlPath = join(Deno.cwd(), '..', 'theme.toml');
        const content = await Deno.readTextFile(tomlPath);
        return parseToml(content);
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199
    } catch (e) {
        return {
            theme: { name: 'busan', version: '0.1.0' },
            night: {
                base: '#010313',
                beach: '#007EDA',
                gold: '#EFB908',
                dongbaek: '#CE7B68',
                leaf: '#889E05',
                horison: '#AC4712',
                mackerel: '#596B92',
                wakame: '#2C2A11',
                text: '#BDC1BB'
            },
            light: {
                base: '#d2d6cf',
                beach: '#003b83',
                gold: '#ba8a00',
                dongbaek: '#974938',
                leaf: '#495800',
                horison: '#933000',
                mackerel: '#27375a',
                wakame: '#201e05',
                text: '#030d1f'
            }
        };
    }
}
