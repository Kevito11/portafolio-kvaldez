import Section, { SectionHeader } from './Section';
import { Server, Layout, Cpu, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const GROUP_ICONS = [Server, Layout, Cpu, Database] as const;

const Skills = () => {
    const { t } = useLanguage();

    return (
        <Section id="skills">
            <SectionHeader
                eyebrow={t.skills.eyebrow}
                title={t.skills.title}
                subtitle={t.skills.subtitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {t.skills.groups.map((group, groupIndex) => {
                    const Icon = GROUP_ICONS[groupIndex % GROUP_ICONS.length];

                    return (
                        <div
                            key={group.title}
                            className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-7 hover:border-border-strong transition-colors shadow-xs"
                        >
                            <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-border-subtle">
                                <div className="flex items-center gap-3">
                                    <span className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center shrink-0">
                                        <Icon size={18} />
                                    </span>
                                    <h3 className="text-base sm:text-lg font-heading font-bold text-text-heading">
                                        {group.title}
                                    </h3>
                                </div>
                                <span className="font-mono text-xs text-text-secondary px-2 py-0.5 rounded-md bg-bg-elevated border border-border-subtle">
                                    {group.items.length}
                                </span>
                            </div>

                            <ul className="flex flex-wrap gap-2">
                                {group.items.map((skill) => (
                                    <li
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg bg-bg-elevated/80 border border-border-subtle text-xs font-mono text-text-primary hover:border-accent-primary/60 hover:text-accent-primary transition-colors"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Skills;
