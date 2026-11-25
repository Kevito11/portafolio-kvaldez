import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section, { SectionHeader } from './Section';
import profileMain from '../assets/profile-main.jpg';
import profileNew from '../assets/profile-new.jpg';
import { MapPin, Compass, Sparkles, Zap, ArrowLeftRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TRAIT_ICONS = [Compass, Sparkles, Zap] as const;
const PROFILE_PHOTOS = [profileMain, profileNew] as const;

const About = () => {
    const { t } = useLanguage();
    const [photoIndex, setPhotoIndex] = useState(0);

    const togglePhoto = () => {
        setPhotoIndex((prev) => (prev + 1) % PROFILE_PHOTOS.length);
    };

    const traits = [
        t.about.traits.analytical,
        t.about.traits.creative,
        t.about.traits.proactive,
    ];

    // Helper to render text with <gold> tags as accented spans
    const renderText = (text: string) => {
        const parts = text.split(/<gold>(.*?)<\/gold>/g);
        return parts.map((part, index) =>
            index % 2 === 1 ? (
                <span
                    key={index}
                    className="text-text-heading font-semibold underline decoration-accent-primary/50 decoration-2 underline-offset-4"
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <Section id="about">
            <SectionHeader
                eyebrow={t.about.eyebrow}
                title={t.about.title}
                subtitle={t.about.subtitle}
            />

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Narrative Card */}
                <div className="lg:col-span-8 rounded-2xl border border-border-subtle bg-bg-surface p-7 sm:p-9 flex flex-col justify-between shadow-xs">
                    <div className="space-y-5">
                        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                            {renderText(t.about.p1)}
                        </p>
                        <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                            {renderText(t.about.p2)}
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-elevated border border-border-subtle font-mono text-xs text-text-secondary">
                            <MapPin size={13} className="text-accent-primary" />
                            {t.about.locationBadge}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium">
                            {t.about.roleBadge}
                        </span>
                    </div>
                </div>

                {/* Dual Portrait Card (respects 1244x1445 vertical ratio ~6/7) */}
                <div
                    onClick={togglePhoto}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            togglePhoto();
                        }
                    }}
                    aria-label={t.about.switchPhoto}
                    className="lg:col-span-4 relative rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden aspect-[6/7] w-full max-w-sm mx-auto lg:max-w-none group shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.img
                            key={photoIndex}
                            src={PROFILE_PHOTOS[photoIndex]}
                            alt="Kevin Valdez"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                    </AnimatePresence>

                    {/* Top-right subtle dual photo switcher */}
                    <div
                        className="absolute top-3.5 right-3.5 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-1.5">
                            {PROFILE_PHOTOS.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setPhotoIndex(idx)}
                                    aria-label={`${t.about.switchPhoto} ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                        photoIndex === idx
                                            ? 'w-4 bg-white'
                                            : 'w-1.5 bg-white/45 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={togglePhoto}
                            aria-label={t.about.switchPhoto}
                            title={t.about.switchPhoto}
                            className="text-white/85 hover:text-white transition-colors cursor-pointer pl-1 border-l border-white/20"
                        >
                            <ArrowLeftRight size={13} />
                        </button>
                    </div>

                    <div
                        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none"
                        aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-xs">
                            <MapPin size={12} className="text-white/80" />
                            {t.about.locationBadge}
                        </span>
                    </div>
                </div>

                {/* 3 Compact Trait Cards */}
                {traits.map((trait, index) => {
                    const Icon = TRAIT_ICONS[index];
                    return (
                        <div
                            key={trait.title}
                            className="lg:col-span-4 rounded-2xl border border-border-subtle bg-bg-surface p-6 hover:border-border-strong transition-colors shadow-xs group"
                        >
                            <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center mb-4">
                                <Icon size={18} />
                            </div>
                            <h3 className="text-base font-heading font-bold text-text-heading mb-1.5">
                                {trait.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {trait.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

export default About;
