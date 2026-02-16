import { useState, useEffect } from 'react';
import { Menu, X, Globe, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            if (offset > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: t.nav.about, href: '#about' },
        { name: t.nav.education, href: '#education' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-900/90 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-gold-500 font-serif font-bold text-2xl"
                    >
                        <a href="#">KV.</a>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-slate-lighter hover:text-gold-500 text-sm font-mono transition-colors"
                            >
                                <span className="text-gold-500 mr-1">0{index + 1}.</span> {link.name}
                            </motion.a>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            onClick={toggleLanguage}
                            className="text-slate-lighter hover:text-gold-500 transition-colors flex items-center gap-1 font-mono text-sm"
                        >
                            <Globe size={18} />
                            <span>{language.toUpperCase()}</span>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="text-slate-lighter hover:text-gold-500 transition-colors flex items-center gap-1 font-mono text-sm"
                        >
                            <Globe size={18} />
                            <span>{language.toUpperCase()}</span>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gold-500 focus:outline-none"
                        >
                            {isOpen ? <X size={30} /> : <Menu size={30} />}
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
                            className="absolute inset-0"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Drawer */}
                        <motion.div
                            key="menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="relative w-72 h-full bg-navy-900/60 backdrop-blur-md shadow-2xl flex flex-col justify-center items-center border-l border-gold-500/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 text-gold-500 hover:text-white transition-colors p-2"
                                aria-label="Close menu"
                            >
                                <X size={32} />
                            </button>

                            <div className="flex flex-col space-y-8 text-center w-full px-8">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-slate-lighter text-xl font-mono hover:text-gold-500 transition-colors block w-full py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="block text-gold-500 text-sm mb-1">0{index + 1}.</span>
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
                        className="fixed bottom-8 right-8 bg-gold-500 text-navy-900 p-3 rounded-full shadow-lg hover:bg-gold-400 transition-colors z-[90]"
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
