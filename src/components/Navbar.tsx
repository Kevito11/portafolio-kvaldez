import { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.experience, href: '#experience' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <>
            {/* Desktop Floating Pill Navbar */}
            <header className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-[92%]">
                <nav
                    aria-label="Primary navigation"
                    className={`flex items-center justify-between px-4 lg:px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        scrolled
                            ? 'bg-bg-surface/85 border-border-subtle shadow-lg shadow-black/5'
                            : 'bg-bg-surface/70 border-border-subtle/80 shadow-xs'
                    }`}
                >
                    <a
                        href="#hero"
                        className="font-heading font-extrabold text-lg tracking-tight text-text-heading pl-1.5 flex items-center"
                    >
                        KV<span className="text-accent-primary">.</span>
                    </a>

                    <div className="flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-3 py-1.5 rounded-full text-sm font-medium text-text-secondary hover:text-text-heading hover:bg-bg-elevated/80 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="h-8 px-2.5 rounded-full border border-border-subtle bg-bg-elevated/80 text-text-secondary hover:text-text-heading hover:border-border-strong font-mono text-xs font-medium transition-colors cursor-pointer"
                            aria-label="Toggle language"
                        >
                            {language.toUpperCase()}
                        </button>

                        <ThemeSwitcher />

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 px-3.5 rounded-full bg-text-heading text-bg-primary hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 font-mono text-xs font-semibold"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                    </div>
                </nav>
            </header>

            {/* Mobile Clean Top Bar */}
            <header
                className={`md:hidden fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                    scrolled || isOpen
                        ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle'
                        : 'bg-bg-primary/60 backdrop-blur-sm border-b border-transparent'
                }`}
            >
                <div className="px-5 py-3.5 flex items-center justify-between">
                    <a
                        href="#hero"
                        className="font-heading font-extrabold text-lg tracking-tight text-text-heading"
                    >
                        KV<span className="text-accent-primary">.</span>
                    </a>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="h-8 px-2.5 rounded-full border border-border-subtle bg-bg-elevated/80 text-text-secondary hover:text-text-heading font-mono text-xs font-medium transition-colors cursor-pointer"
                            aria-label="Toggle language"
                        >
                            {language.toUpperCase()}
                        </button>

                        <ThemeSwitcher />

                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="w-8 h-8 rounded-full border border-border-subtle bg-bg-elevated/80 text-text-heading flex items-center justify-center cursor-pointer"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X size={17} /> : <Menu size={17} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden border-t border-border-subtle bg-bg-surface/95 backdrop-blur-md"
                        >
                            <div className="px-5 py-4 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-heading hover:bg-bg-elevated transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-2 px-4 py-2.5 rounded-xl bg-text-heading text-bg-primary text-center font-mono text-xs font-semibold inline-flex items-center justify-center gap-2"
                                >
                                    <FileText size={14} />
                                    <span>{t.nav.resume}</span>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Navbar;
