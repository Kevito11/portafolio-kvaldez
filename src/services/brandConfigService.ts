import type { BrandTheme, Theme } from '../context/ThemeContext';

const VALID_BRANDS: readonly BrandTheme[] = [
    'architect',
    'terminal',
    'executive',
    'ocean',
    'ide',
    'showcase',
    'linear',
    'readcv',
    'sidebar',
    'story',
    'studio',
];

const SETTING_ID = 'portfolio_theme';

export interface GlobalBrandConfig {
    active_brand: BrandTheme;
    default_mode: Theme;
}

export interface PublishResult {
    ok: boolean;
    mode: 'remote' | 'local';
    error?: string;
}

const getSupabaseConfig = () => {
    const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
        ?.trim()
        .replace(/\/+$/, '');
    const url = rawUrl?.replace(/\/rest\/v1$/i, '');
    const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();
    return { url, anonKey };
};

export const isRemoteBrandConfigEnabled = (): boolean => {
    const { url, anonKey } = getSupabaseConfig();
    return Boolean(url && anonKey);
};

const isValidBrand = (value: unknown): value is BrandTheme => {
    return typeof value === 'string' && (VALID_BRANDS as readonly string[]).includes(value);
};

const isValidMode = (value: unknown): value is Theme => {
    return value === 'dark' || value === 'light';
};

export const fetchGlobalBrandConfig = async (): Promise<GlobalBrandConfig | null> => {
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) return null;

    try {
        const endpoint = `${url}/rest/v1/site_settings?id=eq.${SETTING_ID}&select=active_brand,default_mode`;
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                apikey: anonKey,
                Authorization: `Bearer ${anonKey}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) return null;

        const rows = (await response.json()) as Array<{
            active_brand?: unknown;
            default_mode?: unknown;
        }>;

        const row = rows?.[0];
        if (!row || !isValidBrand(row.active_brand)) return null;

        return {
            active_brand: row.active_brand,
            default_mode: isValidMode(row.default_mode) ? row.default_mode : 'dark',
        };
    } catch {
        return null;
    }
};

export const publishGlobalBrandConfig = async (
    brand: BrandTheme,
    mode: Theme
): Promise<PublishResult> => {
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) {
        return { ok: true, mode: 'local' };
    }

    try {
        const endpoint = `${url}/rest/v1/site_settings?on_conflict=id`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                apikey: anonKey,
                Authorization: `Bearer ${anonKey}`,
                'Content-Type': 'application/json',
                Prefer: 'resolution=merge-duplicates,return=minimal',
            },
            body: JSON.stringify({
                id: SETTING_ID,
                active_brand: brand,
                default_mode: mode,
            }),
        });

        if (!response.ok) {
            return {
                ok: false,
                mode: 'remote',
                error: `HTTP ${response.status}`,
            };
        }

        return { ok: true, mode: 'remote' };
    } catch (err) {
        return {
            ok: false,
            mode: 'remote',
            error: err instanceof Error ? err.message : 'Network error',
        };
    }
};
