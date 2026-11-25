import Section from './Section';
import { motion } from 'framer-motion';
import { Server, Layout, Cpu, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const GROUP_ICONS = [Server, Layout, Cpu, Database] as const;

const Skills = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

    const isBento = theme === 'bento';
    const isEditorial = theme === 'editorial';

    return (
        <Section id="skills" className="max-w-5xl mx-auto">
            <div
                className={`flex items-center mb-12 w-full max-w-4xl mx-auto ${
                    isEditorial ? 'border-b-2 border-text-heading/15 pb-4' : ''
                }`}
            >
                <span className="text-accent-primary font-mono text-xl mr-2">04.</span>
                <h2
                    className={`font-bold text-text-heading whitespace-nowrap ${
                        isEditorial
                            ? 'text-4xl md:text-5xl font-serif tracking-tight'
                            : 'text-3xl md:text-4xl font-serif'
                    }`}
                >
                    {t.skills.title}
                </h2>
                {!isEditorial && <div className="h-[1px] bg-border-subtle w-full ml-4"></div>}
            </div>

            <div className={`max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 ${isBento ? 'gap-4' : 'gap-6'}`}>
                {t.skills.groups.map((group, groupIndex) => {
                    const Icon = GROUP_ICONS[groupIndex % GROUP_ICONS.length];

                    return (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: groupIndex * 0.08 }}
                            className={
                                isBento
                                    ? 'group bg-bg-surface p-5 md:p-6 rounded-2xl border border-border-subtle hover:border-accent-primary/70 hover:bg-bg-elevated hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] transition-all duration-300'
                                    : isEditorial
                                      ? 'group bg-bg-surface p-6 rounded-xs border border-border-subtle hover:border-accent-primary transition-all duration-300 shadow-xs'
                                      : 'group bg-bg-surface p-6 rounded-xl shadow-lg border border-border-subtle/60 border-b-2 border-b-transparent hover:border-b-accent-primary transition-all duration-300'
                            }
                        >
                            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-border-subtle/70">
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className={`p-2 text-accent-primary bg-bg-primary border border-border-subtle ${
                                            isBento ? 'rounded-xl' : isEditorial ? 'rounded-xs' : 'rounded-lg'
                                        }`}
                                    >
                                        <Icon size={18} />
                                    </span>
                                    <h3 className="text-lg font-bold text-text-heading">{group.title}</h3>
                                </div>
                                <span className="text-xs font-mono text-text-secondary">
                                    {group.items.length}
                                </span>
                            </div>

                            <ul className="flex flex-wrap gap-2.5">
                                {group.items.map((skill) => (
                                    <li
                                        key={skill}
                                        className={
                                            isBento
                                                ? 'px-3 py-1.5 text-xs font-mono rounded-lg bg-bg-primary border border-border-subtle text-text-primary hover:border-accent-primary/60 hover:text-accent-primary transition-colors'
                                                : isEditorial
                                                  ? 'px-3 py-1.5 text-xs font-mono rounded-xs bg-bg-elevated border border-border-subtle text-text-primary hover:border-accent-primary transition-colors'
                                                  : 'px-3 py-1.5 text-xs font-mono rounded-md bg-bg-primary/70 border border-border-subtle/80 text-text-primary hover:border-accent-primary/60 hover:text-accent-primary transition-colors'
                                        }
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Skills;
