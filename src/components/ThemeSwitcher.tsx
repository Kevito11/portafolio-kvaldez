import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage();
    const isDark = theme === 'dark';

    return (
        <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label={isDark ? t.theme.switchToLight : t.theme.switchToDark}
            title={isDark ? t.theme.switchToLight : t.theme.switchToDark}
            className="relative w-8 h-8 rounded-full flex items-center justify-center border border-border-subtle bg-bg-elevated/80 text-text-secondary hover:text-text-heading hover:border-border-strong transition-colors cursor-pointer"
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.span
                        key="sun"
                        initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                    >
                        <Sun size={15} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                    >
                        <Moon size={15} />
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeSwitcher;
