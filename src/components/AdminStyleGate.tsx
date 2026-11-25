import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, KeyRound, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import BrandSwitcher from './BrandSwitcher';

const SESSION_KEY = 'portfolio-style-admin-unlocked';

const sha256Hex = async (input: string): Promise<string> => {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const bytes = Array.from(new Uint8Array(hashBuffer));
    return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
};

const getInitialUnlocked = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return window.sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
        return false;
    }
};

const AdminStyleGate = () => {
    const { t } = useLanguage();
    const [isUnlocked, setIsUnlocked] = useState<boolean>(getInitialUnlocked);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [verifying, setVerifying] = useState(false);

    // Trigger 1: URL param (?admin-style=true) or hash (#admin-style)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const url = new URL(window.location.href);
        const hasParam = url.searchParams.get('admin-style') === 'true';
        const hasHash = url.hash === '#admin-style';

        if (hasParam || hasHash) {
            url.searchParams.delete('admin-style');
            if (hasHash) url.hash = '';
            const cleanUrl = `${url.pathname}${url.search}${url.hash}`;
            window.history.replaceState({}, '', cleanUrl);

            if (!getInitialUnlocked()) {
                setIsModalOpen(true);
            }
        }
    }, []);

    // Trigger 2: Keyboard shortcut Ctrl+Shift+K / Cmd+Shift+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (!isUnlocked) {
                    setError(null);
                    setIsModalOpen((prev) => !prev);
                }
            } else if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isUnlocked, isModalOpen]);

    const handleVerify = async (e: FormEvent) => {
        e.preventDefault();
        if (!passphrase.trim() || verifying) return;

        setVerifying(true);
        setError(null);

        try {
            const configuredHash = (
                import.meta.env.VITE_STYLE_ADMIN_HASH as string | undefined
            )?.trim().toLowerCase();

            if (!configuredHash) {
                setError(t.adminStyle.notConfigured);
                setVerifying(false);
                return;
            }

            const inputHash = await sha256Hex(passphrase.trim());
            const isValid = inputHash === configuredHash;

            if (isValid) {
                try {
                    window.sessionStorage.setItem(SESSION_KEY, 'true');
                } catch {
                    // Ignore storage errors
                }
                setIsUnlocked(true);
                setIsModalOpen(false);
                setPassphrase('');
                setError(null);
            } else {
                setError(t.adminStyle.invalidKey);
            }
        } catch {
            setError(t.adminStyle.invalidKey);
        } finally {
            setVerifying(false);
        }
    };

    const handleLock = () => {
        try {
            window.sessionStorage.removeItem(SESSION_KEY);
        } catch {
            // Ignore storage errors
        }
        setIsUnlocked(false);
    };

    return (
        <>
            {isUnlocked && <BrandSwitcher onLock={handleLock} />}

            <AnimatePresence>
                {isModalOpen && !isUnlocked && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[120]"
                        />
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={t.adminStyle.modalTitle}
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            transition={{ duration: 0.18 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-sm rounded-2xl bg-bg-surface border border-border-subtle p-6 shadow-2xl z-[125]"
                        >
                            <div className="flex items-start justify-between gap-3 mb-5">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center shrink-0">
                                        <Lock size={17} />
                                    </span>
                                    <div>
                                        <h3 className="text-base font-heading font-bold text-text-heading leading-tight">
                                            {t.adminStyle.modalTitle}
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-0.5">
                                            {t.adminStyle.modalSubtitle}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-heading hover:bg-bg-elevated cursor-pointer"
                                    aria-label={t.adminStyle.cancel}
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="relative">
                                    <KeyRound
                                        size={15}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                                    />
                                    <input
                                        type="password"
                                        autoFocus
                                        value={passphrase}
                                        onChange={(e) => {
                                            setPassphrase(e.target.value);
                                            if (error) setError(null);
                                        }}
                                        placeholder={t.adminStyle.placeholder}
                                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-bg-elevated border border-border-subtle focus:border-accent-primary text-sm text-text-heading placeholder:text-text-secondary focus:outline-none transition-colors"
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-xs text-rose-500 font-mono">
                                        <AlertCircle size={14} className="shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-3.5 py-2 rounded-xl border border-border-subtle bg-bg-elevated text-xs font-mono text-text-secondary hover:text-text-heading cursor-pointer"
                                    >
                                        {t.adminStyle.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={verifying || !passphrase.trim()}
                                        className="px-4 py-2 rounded-xl bg-accent-primary text-accent-on hover:bg-accent-hover disabled:opacity-50 text-xs font-mono font-semibold transition-colors cursor-pointer"
                                    >
                                        {t.adminStyle.unlock}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminStyleGate;
