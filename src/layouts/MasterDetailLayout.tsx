import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileText, ArrowRight, Code2, Cpu, Server, Briefcase, Wrench } from 'lucide-react';
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

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const MasterDetailLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [activeProjectIdx, setActiveProjectIdx] = useState(0);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const activeProject = projects[activeProjectIdx] ?? projects[0];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
            {/* Clean Top Bar */}
            <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
                    <a href="#md-hero" className="font-heading font-extrabold text-lg text-text-heading">
                        KV<span className="text-accent-primary">.</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
                        <a href="#md-projects" className="hover:text-text-heading">{t.nav.projects}</a>
                        <a href="#md-experience" className="hover:text-text-heading">{t.nav.experience}</a>
                        <a href="#md-skills" className="hover:text-text-heading">{t.nav.skills}</a>
                        <a href="#md-about" className="hover:text-text-heading">{t.nav.about}</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-8 px-2.5 rounded-lg border border-border-subtle bg-bg-surface font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="h-8 px-3.5 rounded-lg bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                        >
                            {t.nav.contact}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-5 sm:px-8 space-y-20 pt-10 md:pt-16">
                {/* Split 2-Column Hero */}
                <section id="md-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-text-heading tracking-tight leading-[1.05]">
                            {t.hero.name}<span className="text-accent-primary">.</span>
                            <span className="block text-2xl sm:text-4xl text-text-secondary font-bold mt-2">
                                {t.hero.headline}
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                            {t.hero.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#md-projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-accent-on font-medium text-sm hover:bg-accent-hover transition-colors"
                            >
                                <span>{t.hero.ctaPrimary}</span>
                                <ArrowRight size={16} />
                            </a>
                            <a
                                href={CONTACT_INFO.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle bg-bg-surface text-text-heading font-medium text-sm hover:border-border-strong transition-colors"
                            >
                                <FileText size={16} />
                                <span>{t.contact.ctaResume}</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                        <ProfilePhotoSwitcher
                            className="w-full max-w-sm mx-auto aspect-[6/7] rounded-2xl shadow-xl"
                            showBadge={t.about.locationBadge}
                        />
                        <div className="flex flex-wrap justify-center gap-2">
                            {t.hero.highlights.map((h) => (
                                <span
                                    key={h.value}
                                    className="px-3 py-1 rounded-full bg-bg-surface border border-border-subtle font-mono text-[11px] text-text-primary"
                                >
                                    {h.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Master-Detail Interactive Projects Showcase */}
                <section id="md-projects" className="scroll-mt-20 space-y-6">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                            {t.projects.eyebrow}
                        </span>
                        <h2 className="text-3xl font-heading font-bold text-text-heading mt-1">
                            {t.projects.title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Master Project List (Left) */}
                        <div className="lg:col-span-5 rounded-2xl border border-border-subtle bg-bg-surface p-2 space-y-1 max-h-[540px] overflow-y-auto">
                            {projects.map((project, idx) => {
                                const isActive = idx === activeProjectIdx;
                                return (
                                    <button
                                        key={project.title}
                                        type="button"
                                        onClick={() => setActiveProjectIdx(idx)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                                            isActive
                                                ? 'bg-accent-soft border border-accent-primary/50 text-text-heading'
                                                : 'border border-transparent hover:bg-bg-elevated/70 text-text-secondary hover:text-text-heading'
                                        }`}
                                    >
                                        <div className="min-w-0">
                                            <span className="block font-heading font-semibold text-sm truncate">
                                                {project.title}
                                            </span>
                                            <span className="block font-mono text-[11px] text-text-secondary truncate mt-0.5">
                                                {project.tech.slice(0, 3).join(' · ')}
                                            </span>
                                        </div>
                                        <span className="font-mono text-[11px] text-accent-primary shrink-0">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Live Detail Panel (Right) */}
                        <div className="lg:col-span-7 rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject.title}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="aspect-[16/10] border-b border-border-subtle">
                                        <ProjectCarousel
                                            images={activeProject.images}
                                            title={activeProject.title}
                                            tech={activeProject.tech}
                                            fallbackLabel={t.projects.previewFallback}
                                            onImageClick={(i) => {
                                                setSelectedImages(activeProject.images);
                                                setModalIndex(i);
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 sm:p-7 space-y-4">
                                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                                            {activeProject.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                            {activeProject.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {activeProject.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="pt-2">
                                            <ProjectActionLinks links={activeProject.links} />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* Experience */}
                <section id="md-experience" className="scroll-mt-20 space-y-10">
                    {t.experience.items.map((exp) => (
                        <div key={`${exp.role}-${exp.period}`} className="space-y-5">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                    {exp.period}
                                </span>
                                <h2 className="text-3xl font-heading font-bold text-text-heading mt-1">
                                    {exp.role}
                                </h2>
                                <p className="text-sm text-text-secondary mt-0.5">{exp.company}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {exp.pillars.map((pillar) => {
                                    const Icon = PILLAR_ICONS[pillar.icon];
                                    return (
                                        <div
                                            key={pillar.title}
                                            className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center mb-3">
                                                <Icon size={18} />
                                            </div>
                                            <h3 className="font-heading font-bold text-text-heading mb-1.5">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Skills + About & Education */}
                <section id="md-skills" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {t.skills.groups.map((group) => (
                        <div key={group.title} className="rounded-2xl border border-border-subtle bg-bg-surface p-6">
                            <h3 className="font-heading font-bold text-text-heading mb-4">{group.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section id="md-about" className="scroll-mt-20 rounded-2xl border border-border-subtle bg-bg-surface p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                            {t.about.title}
                        </span>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p2)}
                        </p>
                    </div>
                    <div className="lg:col-span-5 space-y-3 border-t lg:border-t-0 lg:border-l border-border-subtle pt-5 lg:pt-0 lg:pl-7">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            {t.education.title}
                        </span>
                        {t.education.items.map((edu, idx) => (
                            <div key={idx} className="flex items-baseline justify-between gap-2">
                                <div>
                                    <p className="text-sm font-heading font-semibold text-text-heading">{edu.degree}</p>
                                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                                </div>
                                <span className="font-mono text-xs text-accent-primary shrink-0">
                                    {edu.date || t.education.defaultBadge}
                                </span>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                        >
                            <Mail size={14} />
                            <span>{t.contact.cta}</span>
                        </button>
                    </div>
                </section>
            </main>

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

export default MasterDetailLayout;
