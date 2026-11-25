import { useState, useRef, useEffect } from 'react';
import { Palette, Check, CloudUpload, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, type BrandTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { publishGlobalBrandConfig } from '../services/brandConfigService';

interface BrandSwatchConfig {
    id: BrandTheme;
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
        id: 'ocean',
        dark: ['#071117', '#0d1b24', '#06b6d4'],
        light: ['#f0f9ff', '#ffffff', '#0891b2'],
    },
    {
        id: 'ide',
        dark: ['#0d1117', '#161b22', '#38bdf8'],
        light: ['#f6f8fa', '#ffffff', '#0284c7'],
    },
    {
        id: 'showcase',
        dark: ['#0a0a0f', '#12121a', '#8b5cf6'],
        light: ['#f8fafc', '#ffffff', '#7c3aed'],
    },
    {
        id: 'linear',
        dark: ['#0b0c0e', '#121417', '#5e6ad2'],
        light: ['#fbfbfc', '#ffffff', '#4f46e5'],
    },
    {
        id: 'readcv',
        dark: ['#111111', '#181818', '#10b981'],
        light: ['#ffffff', '#fafafa', '#059669'],
    },
    {
        id: 'sidebar',
        dark: ['#0f172a', '#1e293b', '#14b8a6'],
        light: ['#f1f5f9', '#ffffff', '#0d9488'],
    },
    {
        id: 'story',
        dark: ['#121316', '#191b20', '#3b82f6'],
        light: ['#f5f5f7', '#ffffff', '#2563eb'],
    },
    {
        id: 'studio',
        dark: ['#0e0d0c', '#171513', '#f59e0b'],
        light: ['#faf9f7', '#ffffff', '#d97706'],
    },
];

type PublishState = 'idle' | 'saving' | 'savedRemote' | 'savedLocal' | 'error';

const BrandSwitcher = ({ onLock }: { onLock?: () => void }) => {
    const { brand, setBrand, mode } = useTheme();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [publishState, setPublishState] = useState<PublishState>('idle');
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

    const handlePublish = async () => {
        setPublishState('saving');
        const result = await publishGlobalBrandConfig(brand, mode);
        if (!result.ok) {
            setPublishState('error');
        } else if (result.mode === 'remote') {
            setPublishState('savedRemote');
        } else {
            setPublishState('savedLocal');
        }
        window.setTimeout(() => setPublishState('idle'), 3000);
    };

    const activeConfig = BRAND_CONFIGS.find((item) => item.id === brand) ?? BRAND_CONFIGS[0];
    const activeAccent = activeConfig[mode][2];
    const isTopRight = brand === 'ocean';

    const getPublishLabel = () => {
        switch (publishState) {
            case 'saving':
                return t.adminStyle.publishing;
            case 'savedRemote':
                return t.adminStyle.publishedRemote;
            case 'savedLocal':
                return t.adminStyle.publishedLocal;
            case 'error':
                return t.adminStyle.publishError;
            default:
                return t.adminStyle.publishButton;
        }
    };

    return (
        <div
            ref={containerRef}
            className={isTopRight ? 'fixed top-5 right-5 z-50' : 'fixed bottom-5 left-5 z-40'}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="menu"
                        aria-label={t.brands.panelTitle}
                        initial={{ opacity: 0, y: isTopRight ? -10 : 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: isTopRight ? -8 : 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute w-[92vw] sm:w-[460px] max-h-[78vh] flex flex-col rounded-2xl bg-bg-surface/95 backdrop-blur-md border border-border-subtle shadow-2xl overflow-hidden ${
                            isTopRight ? 'top-full right-0 mt-2.5' : 'bottom-full left-0 mb-2.5'
                        }`}
                    >
                        <div className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary border-b border-border-subtle flex items-center justify-between shrink-0">
                            <span>{t.brands.panelTitle}</span>
                            <span className="text-[10px] text-accent-primary">{mode.toUpperCase()}</span>
                        </div>

                        <div className="p-3 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                                            setPublishState('idle');
                                        }}
                                        className={`w-full flex flex-col justify-between gap-2 p-3 rounded-xl text-left transition-colors cursor-pointer ${
                                            isActive
                                                ? 'bg-bg-elevated border border-accent-primary/70'
                                                : 'border border-border-subtle/60 hover:bg-bg-elevated/70 hover:border-border-strong'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-xs sm:text-sm font-heading font-semibold text-text-heading truncate">
                                                        {copy.name}
                                                    </span>
                                                    {option.id === 'architect' && (
                                                        <span className="px-1.5 py-0.5 rounded bg-accent-soft text-accent-primary font-mono text-[9px] font-medium shrink-0">
                                                            {t.brands.currentBadge}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="block text-[11px] font-mono text-text-secondary truncate mt-0.5">
                                                    {copy.tag}
                                                </span>
                                            </div>
                                            {isActive && (
                                                <Check size={14} className="text-accent-primary shrink-0 mt-0.5" />
                                            )}
                                        </div>

                                        <span className="flex items-center gap-1.5" aria-hidden="true">
                                            {swatches.map((color, idx) => (
                                                <span
                                                    key={idx}
                                                    className="w-3 h-3 rounded-full border border-black/25 ring-1 ring-white/15"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Admin Controls Footer */}
                        <div className="p-3 border-t border-border-subtle bg-bg-elevated/50 flex flex-wrap items-center justify-between gap-2 shrink-0">
                            <button
                                type="button"
                                onClick={handlePublish}
                                disabled={publishState === 'saving'}
                                className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer ${
                                    publishState === 'error'
                                        ? 'bg-rose-500/15 text-rose-500 border border-rose-500/40'
                                        : publishState === 'savedRemote' || publishState === 'savedLocal'
                                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/40'
                                          : 'bg-accent-primary text-accent-on hover:bg-accent-hover'
                                }`}
                            >
                                {publishState === 'saving' ? (
                                    <Loader2 size={13} className="animate-spin" />
                                ) : publishState === 'savedRemote' || publishState === 'savedLocal' ? (
                                    <Check size={13} />
                                ) : (
                                    <CloudUpload size={13} />
                                )}
                                <span>{getPublishLabel()}</span>
                            </button>

                            {onLock && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsOpen(false);
                                        onLock();
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-heading hover:border-border-strong font-mono text-xs transition-colors cursor-pointer"
                                    title={t.adminStyle.lockButton}
                                >
                                    <Lock size={13} />
                                    <span>{t.adminStyle.lockButton}</span>
                                </button>
                            )}
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
