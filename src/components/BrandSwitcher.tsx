import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type Brand } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface BrandSwatchConfig {
    id: Brand;
    dark: [string, string, string];
    light: [string, string, string];
}

const BRAND_CONFIGS: BrandSwatchConfig[] = [
    {
        id: 'architect',
        dark: ['#09090b', '#111114', '#6366f1'],
        light: ['#fafafa', '#ffffff', '#4f46e5'],
    },
    {
        id: 'terminal',
        dark: ['#050908', '#0c1311', '#10b981'],
        light: ['#f4f9f7', '#ffffff', '#059669'],
    },
    {
        id: 'executive',
        dark: ['#0b1120', '#111827', '#f59e0b'],
        light: ['#fafaf9', '#ffffff', '#d97706'],
    },
    {
        id: 'swiss',
        dark: ['#0c0c0c', '#161616', '#f97316'],
        light: ['#f5f4ef', '#ffffff', '#ea580c'],
    },
    {
        id: 'ocean',
        dark: ['#071117', '#0d1b24', '#06b6d4'],
        light: ['#f0f9ff', '#ffffff', '#0891b2'],
    },
    {
        id: 'monochrome',
        dark: ['#000000', '#0d0d0d', '#ffffff'],
        light: ['#ffffff', '#f4f4f5', '#09090b'],
    },
];

const BrandSwitcher = () => {
    const { brand, setBrand, mode } = useTheme();
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

    const activeConfig = BRAND_CONFIGS.find((item) => item.id === brand) ?? BRAND_CONFIGS[0];
    const activeAccent = activeConfig[mode][2];

    return (
        <div ref={containerRef} className="fixed bottom-5 left-5 z-40">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="menu"
                        aria-label={t.brands.panelTitle}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute bottom-full left-0 mb-2.5 w-72 sm:w-80 p-2 rounded-2xl bg-bg-surface/95 backdrop-blur-md border border-border-subtle shadow-2xl"
                    >
                        <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-text-secondary border-b border-border-subtle mb-1.5 flex items-center justify-between">
                            <span>{t.brands.panelTitle}</span>
                            <span className="text-[10px] text-accent-primary">{mode.toUpperCase()}</span>
                        </div>

                        <div className="flex flex-col gap-1 max-h-[65vh] overflow-y-auto">
                            {BRAND_CONFIGS.map((option) => {
                                const isActive = brand === option.id;
                                const copy = t.brands.options[option.id];
                                const swatches = option[mode];

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={isActive}
                                        onClick={() => {
                                            setBrand(option.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                                            isActive
                                                ? 'bg-bg-elevated border border-accent-primary/60'
                                                : 'border border-transparent hover:bg-bg-elevated/70'
                                        }`}
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-heading font-semibold text-text-heading truncate">
                                                    {copy.name}
                                                </span>
                                                {option.id === 'architect' && (
                                                    <span className="px-1.5 py-0.5 rounded bg-accent-soft text-accent-primary font-mono text-[10px] font-medium shrink-0">
                                                        {t.brands.currentBadge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="block text-[11px] font-mono text-text-secondary truncate mt-0.5">
                                                {copy.tag}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="flex items-center gap-1" aria-hidden="true">
                                                {swatches.map((color, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="w-3 h-3 rounded-full border border-black/25 ring-1 ring-white/15"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </span>
                                            {isActive && (
                                                <Check size={14} className="text-accent-primary" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={t.brands.buttonAria}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-subtle hover:border-border-strong text-text-heading shadow-lg transition-colors cursor-pointer"
            >
                <Palette size={15} className="text-accent-primary" />
                <span className="font-mono text-xs font-medium">{t.brands.buttonLabel}</span>
                <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20 ring-1 ring-white/15"
                    style={{ backgroundColor: activeAccent }}
                    aria-hidden="true"
                />
            </motion.button>
        </div>
    );
};

export default BrandSwitcher;
