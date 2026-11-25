import Section, { SectionHeader } from './Section';
import { motion } from 'framer-motion';
import { Code2, Cpu, Server, Briefcase, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const Experience = () => {
    const { t } = useLanguage();

    return (
        <Section id="experience">
            <SectionHeader
                eyebrow={t.experience.eyebrow}
                title={t.experience.title}
                subtitle={t.experience.subtitle}
            />

            <div className="space-y-8">
                {t.experience.items.map((item, expIdx) => (
                    <motion.article
                        key={`${item.role}-${expIdx}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 shadow-xs"
                    >
                        {/* Role Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 mb-6 border-b border-border-subtle">
                            <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                                {item.role}
                            </h3>

                            {item.isCurrent ? (
                                <span className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1 rounded-full border border-border-subtle bg-bg-elevated font-mono text-xs font-medium text-text-heading">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                                    <span>{t.experience.presentBadge}</span>
                                </span>
                            ) : (
                                <span className="font-mono text-xs text-text-secondary">{item.period}</span>
                            )}
                        </div>

                        {/* 5 Pillars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {item.pillars.map((pillar, idx) => {
                                const Icon = PILLAR_ICONS[pillar.icon];
                                // Top row: 3 cards (2 cols each); Bottom row: 2 wider cards (3 cols each)
                                const spanClass = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

                                return (
                                    <div
                                        key={pillar.title}
                                        className={`${spanClass} group rounded-xl border border-border-subtle bg-bg-primary/60 p-5 hover:border-border-strong hover:bg-bg-elevated/50 transition-all duration-200`}
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-accent-soft text-accent-primary flex items-center justify-center mb-3.5">
                                            <Icon size={18} />
                                        </div>
                                        <h4 className="text-base font-heading font-semibold text-text-heading mb-1.5 group-hover:text-accent-primary transition-colors">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.article>
                ))}
            </div>
        </Section>
    );
};

export default Experience;
