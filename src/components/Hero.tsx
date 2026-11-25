import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section
            id="hero"
            className="relative min-h-[92vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
        >
            {/* Subtle Architectural Grid Background with Radial Fade */}
            <div
                className="pointer-events-none absolute inset-0 bg-architectural-grid"
                style={{
                    maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 25%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, black 25%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            {/* Measured Ambient Indigo Top Highlight */}
            <div
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[260px] rounded-full bg-accent-primary/10 blur-[110px]"
                aria-hidden="true"
            />

            <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
                <div className="flex flex-col items-center text-center">
                    {/* Status / Role Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-subtle shadow-xs mb-8"
                    >
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="font-mono text-xs text-text-secondary font-medium">
                            {t.hero.badge}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-text-heading tracking-tight leading-[1.06] max-w-4xl"
                    >
                        {t.hero.name}
                        <span className="text-accent-primary">.</span>
                        <span className="block mt-2 text-text-secondary font-bold text-3xl sm:text-5xl lg:text-[3.5rem] leading-[1.12]">
                            {t.hero.headline}
                        </span>
                    </motion.h1>

                    {/* Concise Value Prop */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed"
                    >
                        {t.hero.description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.24 }}
                        className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
                    >
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-accent-on font-medium text-sm sm:text-base hover:bg-accent-hover transition-colors shadow-xs"
                        >
                            <span>{t.hero.ctaPrimary}</span>
                            <ArrowRight
                                size={17}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </a>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-surface border border-border-subtle text-text-heading font-medium text-sm sm:text-base hover:border-border-strong hover:bg-bg-elevated transition-colors shadow-xs"
                        >
                            <Mail size={16} className="text-text-secondary" />
                            <span>{t.hero.ctaSecondary}</span>
                        </a>
                    </motion.div>

                    {/* Compact Architectural Highlights Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.34 }}
                        className="mt-16 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-border-subtle bg-bg-surface/85 backdrop-blur-xs divide-y sm:divide-y-0 sm:divide-x divide-border-subtle shadow-xs overflow-hidden"
                    >
                        {t.hero.highlights.map((item) => (
                            <div key={item.value} className="px-5 py-4 text-center sm:text-left">
                                <span className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1">
                                    {item.label}
                                </span>
                                <span className="block font-heading text-sm font-semibold text-text-heading">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
