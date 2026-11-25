import Section from './Section';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

    const isEditorial = theme === 'editorial';
    const isBento = theme === 'bento';

    return (
        <Section id="hero" className="min-h-screen flex flex-col justify-center items-start pt-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={
                    isBento
                        ? 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-accent-primary font-mono mb-6 text-xs tracking-wider'
                        : isEditorial
                          ? 'flex items-center gap-3 text-accent-primary font-mono mb-5 text-sm tracking-widest uppercase'
                          : 'text-accent-primary font-mono mb-4 text-lg'
                }
            >
                {isBento && (
                    <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" aria-hidden="true" />
                )}
                {isEditorial && (
                    <span className="w-10 h-[2px] bg-accent-primary inline-block" aria-hidden="true" />
                )}
                <span>{t.hero.greeting}</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={
                    isEditorial
                        ? 'text-6xl md:text-8xl font-serif font-extrabold text-text-heading mb-4 tracking-tight leading-[1.03]'
                        : isBento
                          ? 'text-5xl md:text-7xl font-heading font-bold text-text-heading mb-4 tracking-tighter'
                          : 'text-5xl md:text-7xl font-heading font-bold text-text-heading mb-4 tracking-tight'
                }
            >
                Kevin Valdez.
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={
                    isEditorial
                        ? 'text-3xl md:text-5xl font-serif italic font-normal text-text-secondary mb-8 tracking-tight'
                        : isBento
                          ? 'text-3xl md:text-5xl font-heading font-semibold text-text-secondary mb-6 tracking-tight'
                          : 'text-4xl md:text-6xl font-heading font-bold text-text-primary mb-6 tracking-tight'
                }
            >
                {t.hero.role}
            </motion.h2>

            {isEditorial && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="w-24 h-[1px] bg-border-subtle origin-left mb-8"
                />
            )}

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`text-text-secondary text-lg max-w-xl mb-10 leading-relaxed ${
                    isEditorial ? 'text-text-primary/85 md:text-xl' : ''
                }`}
            >
                {t.hero.description}
            </motion.p>

            <motion.a
                href="#projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={
                    isEditorial
                        ? 'inline-block px-10 py-4 bg-accent-primary text-accent-on font-mono text-sm uppercase tracking-wider border border-accent-primary hover:bg-transparent hover:text-accent-primary transition-colors'
                        : isBento
                          ? 'inline-block px-8 py-3.5 border border-accent-primary/70 bg-bg-surface text-accent-primary font-mono rounded-xl hover:bg-accent-primary hover:text-accent-on hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] transition-all text-base'
                          : 'inline-block px-10 py-4 border-2 border-accent-primary text-accent-primary font-sans rounded hover:bg-accent-primary/10 transition-colors text-lg'
                }
            >
                {t.hero.cta}
            </motion.a>
        </Section>
    );
};

export default Hero;
