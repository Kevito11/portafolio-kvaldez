import Section from './Section';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <Section id="hero" className="min-h-screen flex flex-col justify-center items-start pt-0">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gold-500 font-mono mb-4 text-lg"
            >
                {t.hero.greeting}
            </motion.p>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-7xl font-heading font-bold text-slate-100 mb-4 tracking-tight"
            >
                Kevin Valdez.
            </motion.h1>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-6xl font-heading font-bold text-slate-light mb-6 tracking-tight"
            >
                {t.hero.role}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-slate-lighter text-lg max-w-xl mb-10 leading-relaxed"
            >
                {t.hero.description}
            </motion.p>
            <motion.a
                href="#projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-block px-10 py-4 border-2 border-gold-500 text-gold-500 font-sans rounded hover:bg-gold-500/10 transition-colors text-lg"
            >
                {t.hero.cta}
            </motion.a>
        </Section>
    );
};

export default Hero;
