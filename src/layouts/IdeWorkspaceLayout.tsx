import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileCode2,
    FileJson,
    FileText,
    Terminal,
    GitBranch,
    MapPin,
    Mail,
    FolderOpen,
    Code2,
    Cpu,
    Server,
    Briefcase,
    Wrench,
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

type IdeFileId = 'readme' | 'experience' | 'projects' | 'skills' | 'education' | 'contact';

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const IDE_FILES: Array<{ id: IdeFileId; filename: string; icon: typeof FileText }> = [
    { id: 'readme', filename: 'README.md', icon: FileText },
    { id: 'experience', filename: 'experience.ts', icon: FileCode2 },
    { id: 'projects', filename: 'projects.json', icon: FileJson },
    { id: 'skills', filename: 'skills.yml', icon: FileCode2 },
    { id: 'education', filename: 'education.md', icon: FileText },
    { id: 'contact', filename: 'contact.sh', icon: Terminal },
];

const IdeWorkspaceLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [activeFile, setActiveFile] = useState<IdeFileId>('readme');
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
            {/* Top Window Chrome + Open Tabs */}
            <header className="sticky top-0 z-30 bg-bg-surface border-b border-border-subtle">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle/70">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/75" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/75" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/75" />
                        </div>
                        <span className="font-mono text-xs text-text-secondary">
                            portafolio-kvaldez — {IDE_FILES.find((f) => f.id === activeFile)?.filename}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-7 px-2.5 rounded border border-border-subtle bg-bg-elevated font-mono text-[11px] text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                    </div>
                </div>

                {/* File Tabs Bar */}
                <div className="flex items-center overflow-x-auto bg-bg-primary/60">
                    {IDE_FILES.map((file) => {
                        const Icon = file.icon;
                        const isActive = activeFile === file.id;
                        return (
                            <button
                                key={file.id}
                                type="button"
                                onClick={() => setActiveFile(file.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs border-r border-border-subtle whitespace-nowrap transition-colors cursor-pointer ${
                                    isActive
                                        ? 'bg-bg-primary text-text-heading border-t-2 border-t-accent-primary'
                                        : 'text-text-secondary hover:text-text-heading hover:bg-bg-surface/60'
                                }`}
                            >
                                <Icon size={13} className={isActive ? 'text-accent-primary' : 'text-text-secondary'} />
                                <span>{file.filename}</span>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* Main IDE Body */}
            <div className="flex-1 flex min-h-0">
                {/* Left Explorer Sidebar (Desktop) */}
                <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border-subtle bg-bg-surface/70 p-3">
                    <div className="px-2 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary flex items-center gap-1.5">
                        <FolderOpen size={13} className="text-accent-primary" />
                        <span>{t.layoutUi.explorer}</span>
                    </div>

                    <div className="mt-2 space-y-0.5">
                        {IDE_FILES.map((file) => {
                            const Icon = file.icon;
                            const isActive = activeFile === file.id;
                            return (
                                <button
                                    key={file.id}
                                    type="button"
                                    onClick={() => setActiveFile(file.id)}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md font-mono text-xs text-left transition-colors cursor-pointer ${
                                        isActive
                                            ? 'bg-accent-soft text-accent-primary font-semibold'
                                            : 'text-text-secondary hover:text-text-heading hover:bg-bg-elevated/60'
                                    }`}
                                >
                                    <Icon size={14} />
                                    <span className="truncate">{file.filename}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border-subtle space-y-2 px-1">
                        <a
                            href={CONTACT_INFO.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-md border border-border-subtle bg-bg-elevated text-text-heading hover:border-accent-primary font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="w-full py-2 px-3 rounded-md bg-accent-primary text-accent-on hover:bg-accent-hover font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <Mail size={13} />
                            <span>{t.nav.contact}</span>
                        </button>
                    </div>
                </aside>

                {/* Active Editor Pane */}
                <main className="flex-1 overflow-y-auto p-6 sm:p-10 pb-24">
                    <div className="max-w-5xl mx-auto">
                        <AnimatePresence mode="wait">
                            {activeFile === 'readme' && (
                                <motion.div
                                    key="readme"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                                >
                                    <div className="lg:col-span-8 space-y-6">
                                        <div>
                                            <span className="font-mono text-xs text-accent-primary">
                                                # {t.hero.badge}
                                            </span>
                                            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-text-heading mt-2">
                                                {t.hero.name}
                                            </h1>
                                            <p className="text-lg sm:text-xl text-text-secondary mt-2">
                                                {t.hero.headline}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-border-subtle bg-bg-surface p-6 space-y-4">
                                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                                {renderHighlightedText(t.about.p1)}
                                            </p>
                                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                                {renderHighlightedText(t.about.p2)}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {[
                                                t.about.traits.analytical,
                                                t.about.traits.creative,
                                                t.about.traits.proactive,
                                            ].map((trait) => (
                                                <div
                                                    key={trait.title}
                                                    className="p-4 rounded-xl border border-border-subtle bg-bg-surface"
                                                >
                                                    <h3 className="font-mono text-xs text-accent-primary font-semibold mb-1">
                                                        {trait.title}
                                                    </h3>
                                                    <p className="text-xs text-text-secondary leading-relaxed">
                                                        {trait.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4">
                                        <ProfilePhotoSwitcher
                                            className="w-full max-w-xs mx-auto aspect-[6/7] rounded-xl"
                                            showBadge={t.about.locationBadge}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {activeFile === 'experience' && (
                                <motion.div
                                    key="experience"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="space-y-6"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border-subtle">
                                        <div>
                                            <span className="font-mono text-xs text-accent-primary">
                                                export const currentRole =
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading mt-1">
                                                {t.experience.items[0].role}
                                            </h2>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium">
                                            {t.experience.presentBadge}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {t.experience.items[0].pillars.map((pillar) => {
                                            const Icon = PILLAR_ICONS[pillar.icon];
                                            return (
                                                <div
                                                    key={pillar.title}
                                                    className="p-5 rounded-xl border border-border-subtle bg-bg-surface flex items-start gap-3.5"
                                                >
                                                    <span className="p-2 rounded-lg bg-accent-soft text-accent-primary shrink-0">
                                                        <Icon size={17} />
                                                    </span>
                                                    <div>
                                                        <h3 className="font-heading font-bold text-text-heading text-base">
                                                            {pillar.title}
                                                        </h3>
                                                        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                                                            {pillar.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}

                            {activeFile === 'projects' && (
                                <motion.div
                                    key="projects"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                                >
                                    {projects.map((project) => (
                                        <article
                                            key={project.title}
                                            className="rounded-xl border border-border-subtle bg-bg-surface overflow-hidden flex flex-col"
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
                                            <div className="p-5 flex flex-col flex-1 gap-3">
                                                <h3 className="font-heading font-bold text-text-heading text-base">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed flex-1">
                                                    {project.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.tech.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle font-mono text-[10px] text-text-secondary"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <ProjectActionLinks links={project.links} />
                                            </div>
                                        </article>
                                    ))}
                                </motion.div>
                            )}

                            {activeFile === 'skills' && (
                                <motion.div
                                    key="skills"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                >
                                    {t.skills.groups.map((group) => (
                                        <div
                                            key={group.title}
                                            className="p-6 rounded-xl border border-border-subtle bg-bg-surface"
                                        >
                                            <h3 className="font-mono text-xs text-accent-primary font-semibold mb-4">
                                                {group.title}:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1.5 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeFile === 'education' && (
                                <motion.div
                                    key="education"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="space-y-4"
                                >
                                    {t.education.items.map((edu, idx) => (
                                        <div
                                            key={idx}
                                            className="p-5 rounded-xl border border-border-subtle bg-bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                                        >
                                            <div>
                                                <h3 className="font-heading font-bold text-text-heading">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-sm text-text-secondary">{edu.institution}</p>
                                            </div>
                                            <span className="font-mono text-xs text-accent-primary">
                                                {edu.date || t.education.defaultBadge}
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {activeFile === 'contact' && (
                                <motion.div
                                    key="contact"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.18 }}
                                    className="max-w-xl rounded-xl border border-border-subtle bg-bg-surface p-7 space-y-5"
                                >
                                    <span className="font-mono text-xs text-accent-primary">
                                        $ ./contact.sh --connect
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading">
                                        {t.contact.title}
                                    </h2>
                                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                        {t.contact.text}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsContactOpen(true)}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                                        >
                                            <Mail size={14} />
                                            <span>{t.contact.cta}</span>
                                        </button>
                                        <a
                                            href={CONTACT_INFO.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-bg-elevated text-text-heading font-mono text-xs"
                                        >
                                            <FileText size={14} />
                                            <span>{t.contact.ctaResume}</span>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {/* Bottom IDE Status Bar */}
            <footer className="sticky bottom-0 z-30 bg-bg-surface border-t border-border-subtle px-4 py-1.5 flex items-center justify-between font-mono text-[11px] text-text-secondary">
                <div className="flex items-center gap-4 pl-28 sm:pl-32">
                    <span className="inline-flex items-center gap-1 text-accent-primary">
                        <GitBranch size={12} />
                        main
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1">
                        <MapPin size={12} />
                        {t.about.locationBadge}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={CONTACT_INFO.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent-primary transition-colors"
                    >
                        {t.nav.resume}
                    </a>
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="hover:text-accent-primary transition-colors cursor-pointer"
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

export default IdeWorkspaceLayout;
