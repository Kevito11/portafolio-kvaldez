import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 50);
            setShowBackToTop(offset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.experience, href: '#experience' },
        { name: t.nav.education, href: '#education' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-bg-primary/90 backdrop-blur-md shadow-sm border-b border-border-subtle/70 py-4'
                        : 'bg-transparent py-6'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`text-accent-primary font-bold text-2xl ${
                            theme === 'bento' ? 'font-mono tracking-tighter' : 'font-serif'
                        }`}
                    >
                        <a href="#">KV.</a>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-7">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="text-text-secondary hover:text-accent-primary text-sm font-mono transition-colors"
                            >
                                <span className="text-accent-primary mr-1">0{index + 1}.</span> {link.name}
                            </motion.a>
                        ))}

                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                            className={`px-4 py-2 border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-on transition-colors font-mono text-sm ${
                                theme === 'bento' ? 'rounded-lg' : theme === 'editorial' ? 'rounded-none' : 'rounded'
                            }`}
                        >
                            {t.nav.resume}
                        </motion.a>

                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            onClick={toggleLanguage}
                            className="text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1 font-mono text-sm cursor-pointer"
                            aria-label="Toggle language"
                        >
                            <Globe size={17} />
                            <span>{language.toUpperCase()}</span>
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.55 }}
                        >
                            <ThemeSwitcher />
                        </motion.div>
                    </div>

                    {/* Mobile Menu Controls */}
                    <div className="md:hidden flex items-center gap-3">
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1 font-mono text-sm"
                            aria-label={t.nav.resume}
                        >
                            <FileText size={18} />
                        </a>

                        <button
                            onClick={toggleLanguage}
                            className="text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1 font-mono text-sm cursor-pointer"
                            aria-label="Toggle language"
                        >
                            <Globe size={17} />
                            <span>{language.toUpperCase()}</span>
                        </button>

                        <ThemeSwitcher />

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-accent-primary focus:outline-none cursor-pointer"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] md:hidden flex justify-end"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Drawer */}
                        <motion.div
                            key="menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="relative w-72 h-full bg-bg-primary/95 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center border-l border-border-subtle"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 text-accent-primary hover:text-text-heading transition-colors p-2 cursor-pointer"
                                aria-label="Close menu"
                            >
                                <X size={30} />
                            </button>

                            <div className="flex flex-col space-y-8 text-center w-full px-8">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-text-primary text-xl font-mono hover:text-accent-primary transition-colors block w-full py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="block text-accent-primary text-sm mb-1">0{index + 1}.</span>
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-accent-primary text-accent-on p-3 rounded-full shadow-lg hover:opacity-90 transition-all z-[90] cursor-pointer"
                        aria-label="Back to top"
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
