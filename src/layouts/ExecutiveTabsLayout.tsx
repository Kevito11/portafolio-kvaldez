import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2,
    Cpu,
    Server,
    Briefcase,
    Wrench,
    FileText,
    Mail,
    MapPin,
    GraduationCap,
    Compass,
    Sparkles,
    Zap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { CONTACT_INFO, getProjectsList, renderHighlightedText } from '../data/portfolioData';
import {
    ProfilePhotoSwitcher,
    ProjectCarousel,
    ProjectActionLinks,
    ImageModal,
    ContactModal,
} from '../components/shared/MediaPrimitives';

type TabKey = 'overview' | 'experience' | 'projects' | 'skills';

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const TRAIT_ICONS = [Compass, Sparkles, Zap] as const;

const ExecutiveTabsLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [activeTab, setActiveTab] = useState<TabKey>('overview');
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const tabs: Array<{ id: TabKey; label: string }> = [
        { id: 'overview', label: t.nav.overview },
        { id: 'experience', label: t.nav.experience },
        { id: 'projects', label: t.nav.projects },
        { id: 'skills', label: t.nav.skills },
    ];

    const traits = [t.about.traits.analytical, t.about.traits.creative, t.about.traits.proactive];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
            {/* Executive Header Banner */}
            <header className="border-b border-border-subtle bg-bg-surface">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <ProfilePhotoSwitcher className="w-24 sm:w-28 aspect-[6/7] rounded-2xl shrink-0 shadow-sm" />
                            <div>
                                <div className="inline-flex items-center gap-2 font-mono text-xs text-accent-primary mb-1.5">
                                    <MapPin size={13} />
                                    <span>{t.about.locationBadge}</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-heading tracking-tight">
                                    {t.hero.name}
                                </h1>
                                <p className="text-sm sm:text-base text-text-secondary mt-1">
                                    {t.experience.items[0].role}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            <button
                                type="button"
                                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                                className="h-9 px-3 rounded-xl border border-border-subtle bg-bg-elevated font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                            >
                                {language.toUpperCase()}
                            </button>
                            <ThemeSwitcher />
                            <a
                                href={CONTACT_INFO.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-9 px-4 rounded-xl border border-border-subtle bg-bg-elevated text-text-heading hover:border-border-strong inline-flex items-center gap-1.5 font-mono text-xs font-medium transition-colors"
                            >
                                <FileText size={14} />
                                <span>{t.nav.resume}</span>
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="h-9 px-4 rounded-xl bg-accent-primary text-accent-on hover:bg-accent-hover inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <Mail size={14} />
                                <span>{t.nav.contact}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sticky Executive Tab Bar */}
            <div className="sticky top-0 z-30 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center gap-1 overflow-x-auto">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-3.5 text-sm font-heading font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                                    isActive ? 'text-text-heading' : 'text-text-secondary hover:text-text-heading'
                                }`}
                            >
                                {tab.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="executive-tab-underline"
                                        className="absolute bottom-0 inset-x-2 h-[2px] bg-accent-primary rounded-full"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Tab Panel */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 py-10 pb-24">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="rounded-2xl border border-border-subtle bg-bg-surface p-7 sm:p-8 space-y-4 shadow-xs">
                                <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                                    {t.about.eyebrow}
                                </span>
                                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                                    {renderHighlightedText(t.about.p1)}
                                </p>
                                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                                    {renderHighlightedText(t.about.p2)}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {traits.map((trait, idx) => {
                                    const Icon = TRAIT_ICONS[idx];
                                    return (
                                        <div
                                            key={trait.title}
                                            className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-xs"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center mb-3.5">
                                                <Icon size={18} />
                                            </div>
                                            <h3 className="font-heading font-bold text-text-heading mb-1">
                                                {trait.title}
                                            </h3>
                                            <p className="text-sm text-text-secondary">{trait.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div>
                                <h2 className="text-xl font-heading font-bold text-text-heading mb-4">
                                    {t.education.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {t.education.items.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border border-border-subtle bg-bg-surface p-5 flex items-start gap-3.5 shadow-xs"
                                        >
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg-elevated border border-border-subtle font-mono text-xs text-accent-primary shrink-0">
                                                <GraduationCap size={13} />
                                                {edu.date || t.education.defaultBadge}
                                            </span>
                                            <div>
                                                <h3 className="font-heading font-bold text-text-heading text-sm sm:text-base">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                                                    {edu.institution}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'experience' && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-10"
                        >
                            {t.experience.items.map((exp) => (
                                <div key={`${exp.role}-${exp.period}`} className="space-y-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <h2 className="text-2xl font-heading font-bold text-text-heading">
                                                {exp.role}
                                            </h2>
                                            <p className="text-sm text-text-secondary mt-0.5">{exp.company}</p>
                                        </div>
                                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-bg-surface font-mono text-xs text-accent-primary">
                                            {exp.isCurrent && (
                                                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                            )}
                                            {exp.period}
                                        </span>
                                    </div>

                                    <div
                                        className={`grid grid-cols-1 md:grid-cols-2 ${
                                            exp.pillars.length === 5 ? 'lg:grid-cols-6' : ''
                                        } gap-4`}
                                    >
                                        {exp.pillars.map((pillar, idx) => {
                                            const Icon = PILLAR_ICONS[pillar.icon];
                                            const spanClass =
                                                exp.pillars.length === 5
                                                    ? idx < 3
                                                        ? 'lg:col-span-2'
                                                        : 'lg:col-span-3'
                                                    : '';
                                            return (
                                                <div
                                                    key={pillar.title}
                                                    className={`${spanClass} rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-xs hover:border-border-strong transition-colors`}
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center mb-4">
                                                        <Icon size={18} />
                                                    </div>
                                                    <h3 className="text-base font-heading font-bold text-text-heading mb-1.5">
                                                        {pillar.title}
                                                    </h3>
                                                    <p className="text-sm text-text-secondary leading-relaxed">
                                                        {pillar.desc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        >
                            {projects.map((project, idx) => (
                                <article
                                    key={project.title}
                                    className="flex flex-col rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden shadow-xs"
                                >
                                    <div className="aspect-[16/10] border-b border-border-subtle">
                                        <ProjectCarousel
                                            images={project.images}
                                            title={project.title}
                                            tech={project.tech}
                                            fallbackLabel={t.projects.previewFallback}
                                            onImageClick={(i) => {
                                                setSelectedImages(project.images);
                                                setModalIndex(i);
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1 gap-4">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-lg font-heading font-bold text-text-heading">
                                                    {project.title}
                                                </h3>
                                                {idx < 3 && (
                                                    <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent-primary font-mono text-[10px] shrink-0">
                                                        {t.projects.featured}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="mt-auto space-y-3">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2.5 py-0.5 rounded-md bg-bg-elevated border border-border-subtle font-mono text-[11px] text-text-secondary"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <ProjectActionLinks links={project.links} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'skills' && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            {t.skills.groups.map((group) => (
                                <div
                                    key={group.title}
                                    className="rounded-2xl border border-border-subtle bg-bg-surface p-6 shadow-xs"
                                >
                                    <h3 className="text-lg font-heading font-bold text-text-heading mb-4 pb-3 border-b border-border-subtle">
                                        {group.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="border-t border-border-subtle py-6">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between text-xs font-mono text-text-secondary">
                    <span>{t.contact.footer}</span>
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="text-accent-primary hover:underline cursor-pointer"
                    >
                        {t.nav.contact}
                    </button>
                </div>
            </footer>

            <ImageModal
                isOpen={!!selectedImages}
                images={selectedImages}
                currentIndex={modalIndex}
                onNext={() => selectedImages && setModalIndex((p) => (p + 1) % selectedImages.length)}
                onPrev={() =>
                    selectedImages &&
                    setModalIndex((p) => (p - 1 + selectedImages.length) % selectedImages.length)
                }
                onClose={() => setSelectedImages(null)}
            />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};

export default ExecutiveTabsLayout;
