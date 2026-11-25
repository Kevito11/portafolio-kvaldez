import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'classic' | 'bento' | 'editorial';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const STORAGE_KEY = 'portfolio-theme';
const VALID_THEMES: readonly Theme[] = ['classic', 'bento', 'editorial'];

const isValidTheme = (value: string | null): value is Theme => {
    return value !== null && (VALID_THEMES as readonly string[]).includes(value);
};

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'classic';
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (isValidTheme(stored)) {
            return stored;
        }
    } catch {
        // Ignore storage access errors (e.g. private browsing restrictions)
    }
    return 'classic';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // Ignore storage write errors
        }
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        setThemeState(nextTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            theme: 'classic',
            setTheme: () => {},
        };
    }
    return context;
};
