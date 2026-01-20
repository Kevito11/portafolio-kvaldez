import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
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

    return (
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

                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="px-4 py-2 border border-gold-500 text-gold-500 rounded hover:bg-gold-500/10 transition-colors font-mono text-sm"
                    >
                        {t.nav.resume}
                    </motion.a>
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed inset-y-0 right-0 w-3/4 bg-navy-800 shadow-2xl z-40 md:hidden flex flex-col justify-center items-center"
                    >
                        <div className="flex flex-col space-y-8 text-center">
                            {navLinks.map((link, index) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-slate-lighter text-xl font-mono hover:text-gold-500 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="block text-gold-500 text-sm mb-1">0{index + 1}.</span>
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 border border-gold-500 text-gold-500 rounded hover:bg-gold-500/10 transition-colors font-mono"
                                onClick={() => setIsOpen(false)}
                            >
                                {t.nav.resume}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
