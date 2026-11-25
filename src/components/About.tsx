import Section, { SectionHeader } from './Section';
import profileNew from '../assets/profile-new.jpg';
import { MapPin, Compass, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TRAIT_ICONS = [Compass, Sparkles, Zap] as const;

const About = () => {
    const { t } = useLanguage();

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
                <span key={index} className="text-text-heading font-semibold underline decoration-accent-primary/50 decoration-2 underline-offset-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
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

                {/* Portrait Card */}
                <div className="lg:col-span-4 relative rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden min-h-[340px] lg:min-h-full group shadow-xs">
                    <img
                        src={profileNew}
                        alt="Kevin Valdez"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none"
                        aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-xs">
                            <MapPin size={12} className="text-indigo-400" />
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
