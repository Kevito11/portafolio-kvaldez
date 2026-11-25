import { useState, useRef, useEffect } from 'react';
import { Palette, Sparkles, LayoutGrid, BookOpen, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Theme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeOptionMeta {
    id: Theme;
    icon: typeof Sparkles;
    swatches: [string, string, string];
}

const THEME_OPTIONS: ThemeOptionMeta[] = [
    {
        id: 'classic',
        icon: Sparkles,
        swatches: ['#0a192f', '#112240', '#d4af37'],
    },
    {
        id: 'bento',
        icon: LayoutGrid,
        swatches: ['#09090b', '#18181b', '#22d3ee'],
    },
    {
        id: 'editorial',
        icon: BookOpen,
        swatches: ['#f8f7f4', '#ffffff', '#1d4ed8'],
    },
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const activeOption = THEME_OPTIONS.find((opt) => opt.id === theme) ?? THEME_OPTIONS[0];

    return (
        <div ref={containerRef} className="relative">
            <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={t.theme.buttonAria}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border-subtle bg-bg-surface/80 text-text-secondary hover:text-accent-primary hover:border-accent-primary/60 transition-colors font-mono text-xs cursor-pointer"
            >
                <Palette size={15} className="text-accent-primary shrink-0" />
                <span className="hidden lg:inline text-text-primary">
                    {t.theme.options[theme].name}
                </span>
                <span
                    className="w-2.5 h-2.5 rounded-full border border-border-subtle shrink-0"
                    style={{ backgroundColor: activeOption.swatches[2] }}
                    aria-hidden="true"
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="menu"
                        aria-label={t.theme.label}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.16 }}
                        className="absolute right-0 mt-2 w-64 p-2 rounded-xl bg-bg-surface border border-border-subtle shadow-2xl z-[120]"
                    >
                        <div className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary border-b border-border-subtle/70 mb-1.5">
                            {t.theme.label}
                        </div>

                        <div className="flex flex-col gap-1">
                            {THEME_OPTIONS.map((option) => {
                                const Icon = option.icon;
                                const isActive = theme === option.id;
                                const copy = t.theme.options[option.id];

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={isActive}
                                        onClick={() => {
                                            setTheme(option.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                                            isActive
                                                ? 'bg-bg-elevated border border-accent-primary/60'
                                                : 'border border-transparent hover:bg-bg-elevated/70'
                                        }`}
                                    >
                                        <span
                                            className={`p-1.5 rounded-md border ${
                                                isActive
                                                    ? 'border-accent-primary/50 text-accent-primary bg-bg-primary'
                                                    : 'border-border-subtle text-text-secondary bg-bg-primary/60'
                                            }`}
                                        >
                                            <Icon size={15} />
                                        </span>

                                        <span className="flex-1 min-w-0">
                                            <span className="block text-sm font-semibold text-text-heading leading-tight">
                                                {copy.name}
                                            </span>
                                            <span className="block text-xs text-text-secondary truncate mt-0.5">
                                                {copy.desc}
                                            </span>
                                        </span>

                                        <span className="flex items-center gap-1 shrink-0" aria-hidden="true">
                                            {option.swatches.map((color, idx) => (
                                                <span
                                                    key={idx}
                                                    className="w-3 h-3 rounded-full border border-black/20 ring-1 ring-white/15"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </span>

                                        {isActive && (
                                            <Check size={14} className="text-accent-primary shrink-0" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSwitcher;
