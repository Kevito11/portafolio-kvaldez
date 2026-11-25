import Section from './Section';
import { motion } from 'framer-motion';
import { Code2, Cpu, Server, Briefcase, Wrench } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const Experience = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

    const isBento = theme === 'bento';
    const isEditorial = theme === 'editorial';

    return (
        <Section id="experience" className="max-w-5xl mx-auto">
            <div
                className={`flex items-center mb-12 w-full max-w-4xl mx-auto ${
                    isEditorial ? 'border-b-2 border-text-heading/15 pb-4' : ''
                }`}
            >
                <span className="text-accent-primary font-mono text-xl mr-2">02.</span>
                <h2
                    className={`font-bold text-text-heading whitespace-nowrap ${
                        isEditorial
                            ? 'text-4xl md:text-5xl font-serif tracking-tight'
                            : 'text-3xl md:text-4xl font-serif'
                    }`}
                >
                    {t.experience.title}
                </h2>
                {!isEditorial && <div className="h-[1px] bg-border-subtle w-full ml-4"></div>}
            </div>

            <div className="max-w-4xl mx-auto space-y-10">
                {t.experience.items.map((item, expIdx) => (
                    <motion.article
                        key={`${item.role}-${expIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className={
                            isBento
                                ? 'bg-bg-surface border border-border-subtle rounded-2xl p-6 md:p-8 shadow-lg'
                                : isEditorial
                                  ? 'bg-bg-surface border border-border-subtle rounded-xs p-6 md:p-8 shadow-sm'
                                  : 'bg-bg-surface/60 border border-border-subtle rounded-xl p-6 md:p-8 shadow-xl'
                        }
                    >
                        {/* Role Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 mb-6 border-b border-border-subtle/80">
                            <div>
                                <h3
                                    className={`font-bold text-text-heading ${
                                        isEditorial ? 'text-2xl md:text-3xl font-serif' : 'text-2xl md:text-3xl'
                                    }`}
                                >
                                    {item.role}
                                </h3>
                            </div>

                            {item.isCurrent ? (
                                <span
                                    className={`inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 font-mono text-xs font-semibold border border-accent-primary/60 text-accent-primary bg-bg-primary/80 ${
                                        isBento ? 'rounded-full' : isEditorial ? 'rounded-xs' : 'rounded-full'
                                    }`}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse"
                                        aria-hidden="true"
                                    />
                                    <span>{t.experience.presentBadge}</span>
                                </span>
                            ) : (
                                <span className="font-mono text-xs text-text-secondary">{item.period}</span>
                            )}
                        </div>

                        {/* 5 Pillars Grid */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${isBento ? 'gap-3.5' : 'gap-4'}`}>
                            {item.pillars.map((pillar, idx) => {
                                const Icon = PILLAR_ICONS[pillar.icon];
                                const isLastOdd =
                                    idx === item.pillars.length - 1 && item.pillars.length % 2 === 1;

                                return (
                                    <motion.div
                                        key={pillar.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.06 }}
                                        className={`${isLastOdd ? 'md:col-span-2' : ''} group p-5 transition-all duration-300 ${
                                            isBento
                                                ? 'bg-bg-primary/70 border border-border-subtle rounded-2xl hover:border-accent-primary/70 hover:bg-bg-elevated hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                                : isEditorial
                                                  ? 'bg-bg-elevated/60 border border-border-subtle rounded-xs hover:border-accent-primary'
                                                  : 'bg-bg-primary/50 border border-border-subtle/80 rounded-lg hover:border-accent-primary/60'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3.5">
                                            <div
                                                className={`p-2.5 shrink-0 border border-border-subtle text-accent-primary bg-bg-surface group-hover:border-accent-primary/60 transition-colors ${
                                                    isBento ? 'rounded-xl' : isEditorial ? 'rounded-xs' : 'rounded-lg'
                                                }`}
                                            >
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-base md:text-lg font-bold text-text-heading mb-1.5 group-hover:text-accent-primary transition-colors">
                                                    {pillar.title}
                                                </h4>
                                                <p className="text-text-secondary text-sm leading-relaxed">
                                                    {pillar.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
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
