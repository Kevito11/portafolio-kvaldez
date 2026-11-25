import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export type BrandTheme =
    | 'architect'
    | 'terminal'
    | 'executive'
    | 'ocean'
    | 'ide'
    | 'showcase'
    | 'linear'
    | 'readcv'
    | 'sidebar'
    | 'story'
    | 'studio';

export type Brand = BrandTheme;

interface ThemeContextType {
    mode: Theme;
    theme: Theme;
    setMode: (mode: Theme) => void;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    brand: BrandTheme;
    setBrand: (brand: BrandTheme) => void;
}

const MODE_STORAGE_KEY = 'portfolio-theme';
const BRAND_STORAGE_KEY = 'portfolio-brand';
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

const isValidBrand = (value: string | null): value is BrandTheme => {
    return value !== null && (VALID_BRANDS as readonly string[]).includes(value);
};

const getInitialMode = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    try {
        const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
    } catch {
        // Ignore storage errors
    }
    return 'dark';
};

const getInitialBrand = (): BrandTheme => {
    if (typeof window === 'undefined') return 'architect';
    try {
        const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
        if (isValidBrand(stored)) {
            return stored;
        }
    } catch {
        // Ignore storage errors
    }
    return 'architect';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<Theme>(getInitialMode);
    const [brand, setBrandState] = useState<BrandTheme>(getInitialBrand);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', mode);
        try {
            window.localStorage.setItem(MODE_STORAGE_KEY, mode);
        } catch {
            // Ignore storage write errors
        }
    }, [mode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-brand', brand);
        try {
            window.localStorage.setItem(BRAND_STORAGE_KEY, brand);
        } catch {
            // Ignore storage write errors
        }
    }, [brand]);

    const setMode = (nextMode: Theme) => setModeState(nextMode);
    const toggleTheme = () => setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
    const setBrand = (nextBrand: BrandTheme) => setBrandState(nextBrand);

    return (
        <ThemeContext.Provider
            value={{
                mode,
                theme: mode,
                setMode,
                setTheme: setMode,
                toggleTheme,
                brand,
                setBrand,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            mode: 'dark',
            theme: 'dark',
            setMode: () => {},
            setTheme: () => {},
            toggleTheme: () => {},
            brand: 'architect',
            setBrand: () => {},
        };
    }
    return context;
};
