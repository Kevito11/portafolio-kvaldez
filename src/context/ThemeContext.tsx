import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const STORAGE_KEY = 'portfolio-theme';

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
    } catch {
        // Ignore storage errors
    }
    return 'dark';
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

    const setTheme = (nextTheme: Theme) => setThemeState(nextTheme);
    const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        return {
            theme: 'dark',
            setTheme: () => {},
            toggleTheme: () => {},
        };
    }
    return context;
};
