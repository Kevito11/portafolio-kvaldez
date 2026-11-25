import Section, { SectionHeader } from './Section';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();

    return (
        <Section id="education">
            <SectionHeader
                eyebrow={t.education.eyebrow}
                title={t.education.title}
                subtitle={t.education.subtitle}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.education.items.map((item, index) => (
                    <div
                        key={`${item.institution}-${item.degree}-${index}`}
                        className="rounded-2xl border border-border-subtle bg-bg-surface p-6 hover:border-border-strong transition-colors shadow-xs flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                        <div className="shrink-0">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-elevated border border-border-subtle font-mono text-xs text-accent-primary font-medium">
                                <GraduationCap size={13} />
                                <span>{item.date || t.education.defaultBadge}</span>
                            </span>
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-base sm:text-lg font-heading font-bold text-text-heading leading-snug">
                                {item.degree}
                            </h3>
                            <p className="mt-1 text-sm text-text-secondary font-medium">
                                {item.institution}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Education;
