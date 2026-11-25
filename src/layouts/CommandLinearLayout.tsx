import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, Mail, FileText, Command } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import {
    CONTACT_INFO,
    getProjectsList,
    renderHighlightedText,
    type ProjectItem,
} from '../data/portfolioData';
import {
    ProfilePhotoSwitcher,
    ProjectCarousel,
    ProjectActionLinks,
    ImageModal,
    ContactModal,
} from '../components/shared/MediaPrimitives';

const CommandLinearLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [cmdOpen, setCmdOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [slideProject, setSlideProject] = useState<ProjectItem | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCmdOpen((prev) => !prev);
            } else if (e.key === 'Escape') {
                setCmdOpen(false);
                setSlideProject(null);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const sections = useMemo(
        () => [
            { id: 'lin-about', label: t.nav.about },
            { id: 'lin-experience', label: t.nav.experience },
            { id: 'lin-projects', label: t.nav.projects },
            { id: 'lin-skills', label: t.nav.skills },
            { id: 'lin-education', label: t.nav.education },
        ],
        [t]
    );

    const q = query.trim().toLowerCase();
    const matchedSections = sections.filter((s) => !q || s.label.toLowerCase().includes(q));
    const matchedProjects = projects.filter(
        (p) =>
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.tech.some((tech) => tech.toLowerCase().includes(q))
    );

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
            {/* Linear-Style Topbar with ⌘K Search */}
            <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-3">
                    <a href="#lin-top" className="font-heading font-bold text-base text-text-heading tracking-tight">
                        KV<span className="text-accent-primary">.</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => setCmdOpen(true)}
                        className="flex-1 max-w-sm h-9 px-3 rounded-lg border border-border-subtle bg-bg-surface hover:border-border-strong flex items-center justify-between gap-2 text-xs text-text-secondary transition-colors cursor-pointer"
                    >
                        <span className="inline-flex items-center gap-2 truncate">
                            <Search size={14} />
                            <span className="truncate">{t.layoutUi.searchTrigger}</span>
                        </span>
                        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-bg-elevated border border-border-subtle font-mono text-[10px] text-text-secondary">
                            <Command size={10} />K
                        </kbd>
                    </button>

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
                            className="h-8 px-3 rounded-lg bg-accent-primary text-accent-on font-mono text-xs font-medium cursor-pointer"
                        >
                            {t.nav.contact}
                        </button>
                    </div>
                </div>
            </header>

            <main id="lin-top" className="max-w-5xl mx-auto px-5 sm:px-8 py-12 space-y-16">
                {/* Compact Precision Hero */}
                <section id="lin-about" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-4">
                        <span className="font-mono text-xs text-accent-primary">{t.hero.badge}</span>
                        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-text-heading tracking-tight">
                            {t.hero.name} — {t.hero.headline}
                        </h1>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                            <a
                                href={CONTACT_INFO.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-subtle bg-bg-surface text-xs font-mono text-text-heading hover:border-border-strong"
                            >
                                <FileText size={13} />
                                <span>{t.contact.ctaResume}</span>
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-primary text-accent-on text-xs font-mono font-medium cursor-pointer"
                            >
                                <Mail size={13} />
                                <span>{t.contact.cta}</span>
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <ProfilePhotoSwitcher
                            className="w-full max-w-[230px] mx-auto aspect-[6/7] rounded-xl"
                            showBadge={t.about.locationBadge}
                        />
                    </div>
                </section>

                {/* High-Density Projects List (Click row -> Slide-Over) */}
                <section id="lin-projects" className="scroll-mt-20 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-heading font-semibold text-text-heading">
                            {t.projects.title}
                        </h2>
                        <span className="font-mono text-xs text-text-secondary">{projects.length} items</span>
                    </div>

                    <div className="rounded-xl border border-border-subtle bg-bg-surface divide-y divide-border-subtle overflow-hidden">
                        {projects.map((project, idx) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => setSlideProject(project)}
                                className="w-full px-4 py-3.5 text-left hover:bg-bg-elevated/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer group"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="font-mono text-[11px] text-text-secondary shrink-0">
                                        PRJ-{String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="text-sm font-medium text-text-heading group-hover:text-accent-primary transition-colors truncate">
                                        {project.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="hidden md:flex items-center gap-1">
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle font-mono text-[10px] text-text-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <ArrowUpRight
                                        size={15}
                                        className="text-text-secondary group-hover:text-accent-primary transition-colors"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Experience Rows */}
                <section id="lin-experience" className="scroll-mt-20 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-heading font-semibold text-text-heading">
                            {t.experience.items[0].role}
                        </h2>
                        <span className="font-mono text-xs text-accent-primary">
                            {t.experience.presentBadge}
                        </span>
                    </div>
                    <div className="rounded-xl border border-border-subtle bg-bg-surface divide-y divide-border-subtle">
                        {t.experience.items[0].pillars.map((pillar) => (
                            <div key={pillar.title} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-2">
                                <h3 className="md:col-span-4 text-sm font-semibold text-text-heading">
                                    {pillar.title}
                                </h3>
                                <p className="md:col-span-8 text-sm text-text-secondary leading-relaxed">
                                    {pillar.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills & Education */}
                <section id="lin-skills" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {t.skills.groups.map((group) => (
                        <div key={group.title} className="rounded-xl border border-border-subtle bg-bg-surface p-5">
                            <h3 className="font-mono text-xs text-accent-primary mb-3">{group.title}</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {group.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <section id="lin-education" className="scroll-mt-20 rounded-xl border border-border-subtle bg-bg-surface divide-y divide-border-subtle">
                    {t.education.items.map((edu, idx) => (
                        <div key={idx} className="px-5 py-3.5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-text-heading">{edu.degree}</p>
                                <p className="text-xs text-text-secondary">{edu.institution}</p>
                            </div>
                            <span className="font-mono text-xs text-text-secondary shrink-0">
                                {edu.date || t.education.defaultBadge}
                            </span>
                        </div>
                    ))}
                </section>
            </main>

            {/* Command Palette Modal (⌘K) */}
            <AnimatePresence>
                {cmdOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCmdOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[80]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            className="fixed top-[14%] left-1/2 -translate-x-1/2 w-[92%] max-w-lg rounded-2xl bg-bg-surface border border-border-subtle shadow-2xl z-[85] overflow-hidden"
                        >
                            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border-subtle">
                                <Search size={16} className="text-text-secondary" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={t.layoutUi.searchPlaceholder}
                                    className="flex-1 bg-transparent text-sm text-text-heading placeholder:text-text-secondary focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setCmdOpen(false)}
                                    className="text-text-secondary hover:text-text-heading cursor-pointer"
                                    aria-label={t.layoutUi.closePanel}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="max-h-80 overflow-y-auto p-2 space-y-2">
                                {matchedSections.length > 0 && (
                                    <div>
                                        <span className="px-2.5 py-1 block font-mono text-[10px] uppercase text-text-secondary">
                                            Sections
                                        </span>
                                        {matchedSections.map((sec) => (
                                            <a
                                                key={sec.id}
                                                href={`#${sec.id}`}
                                                onClick={() => setCmdOpen(false)}
                                                className="block px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-bg-elevated"
                                            >
                                                {sec.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                                {matchedProjects.length > 0 && (
                                    <div>
                                        <span className="px-2.5 py-1 block font-mono text-[10px] uppercase text-text-secondary">
                                            {t.nav.projects}
                                        </span>
                                        {matchedProjects.map((proj) => (
                                            <button
                                                key={proj.title}
                                                type="button"
                                                onClick={() => {
                                                    setSlideProject(proj);
                                                    setCmdOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-bg-elevated flex items-center justify-between gap-2 cursor-pointer"
                                            >
                                                <span className="truncate">{proj.title}</span>
                                                <span className="font-mono text-[10px] text-accent-primary shrink-0">
                                                    {proj.tech[0]}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {matchedSections.length === 0 && matchedProjects.length === 0 && (
                                    <p className="px-3 py-6 text-center text-xs text-text-secondary">
                                        {t.layoutUi.noResults}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Right Slide-Over Project Detail Panel */}
            <AnimatePresence>
                {slideProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSlideProject(null)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[70]"
                        />
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-bg-surface border-l border-border-subtle z-[75] overflow-y-auto p-6 space-y-6 shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
                                <h3 className="text-xl font-heading font-bold text-text-heading">
                                    {slideProject.title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setSlideProject(null)}
                                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-heading hover:bg-bg-elevated cursor-pointer"
                                    aria-label={t.layoutUi.closePanel}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-border-subtle">
                                <ProjectCarousel
                                    images={slideProject.images}
                                    title={slideProject.title}
                                    tech={slideProject.tech}
                                    fallbackLabel={t.projects.previewFallback}
                                    onImageClick={(i) => {
                                        setSelectedImages(slideProject.images);
                                        setModalIndex(i);
                                    }}
                                />
                            </div>

                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                {slideProject.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5">
                                {slideProject.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <ProjectActionLinks links={slideProject.links} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

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

export default CommandLinearLayout;
