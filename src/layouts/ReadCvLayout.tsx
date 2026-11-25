import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, FileText, X } from 'lucide-react';
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

const ReadCvLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [detailProject, setDetailProject] = useState<ProjectItem | null>(null);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-28">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-10 md:pt-16 space-y-14">
                {/* Compact Horizontal Dossier Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-border-subtle">
                    <div className="flex items-center gap-5">
                        <ProfilePhotoSwitcher className="w-20 sm:w-24 aspect-square rounded-2xl shrink-0" />
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading">
                                {t.hero.name}
                            </h1>
                            <p className="text-sm sm:text-base text-text-secondary mt-0.5">
                                {t.experience.items[0].role}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary mt-1.5">
                                <MapPin size={12} className="text-accent-primary" />
                                {t.about.locationBadge}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-8 px-2.5 rounded-full border border-border-subtle bg-bg-surface font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                        <a
                            href={CONTACT_INFO.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 px-3.5 rounded-full border border-border-subtle bg-bg-surface text-text-heading inline-flex items-center gap-1.5 font-mono text-xs"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="h-8 px-3.5 rounded-full bg-accent-primary text-accent-on inline-flex items-center gap-1.5 font-mono text-xs font-semibold cursor-pointer"
                        >
                            <Mail size={13} />
                            <span>{t.nav.contact}</span>
                        </button>
                    </div>
                </header>

                {/* About */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <h2 className="md:col-span-3 font-mono text-xs uppercase tracking-wider text-text-secondary pt-1">
                        {t.about.title}
                    </h2>
                    <div className="md:col-span-9 space-y-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                        <p>{renderHighlightedText(t.about.p1)}</p>
                        <p>{renderHighlightedText(t.about.p2)}</p>
                    </div>
                </section>

                {/* Experience — 2-Column Read.cv Format */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-10 border-t border-border-subtle">
                    <div className="md:col-span-3 space-y-1">
                        <h2 className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                            {t.experience.title}
                        </h2>
                        <span className="inline-block font-mono text-xs text-accent-primary">
                            {t.experience.presentBadge}
                        </span>
                    </div>
                    <div className="md:col-span-9 space-y-5">
                        <h3 className="text-lg font-heading font-bold text-text-heading">
                            {t.experience.items[0].role}
                        </h3>
                        <ul className="space-y-4">
                            {t.experience.items[0].pillars.map((pillar) => (
                                <li key={pillar.title} className="space-y-1">
                                    <span className="text-sm font-semibold text-text-heading block">
                                        {pillar.title}
                                    </span>
                                    <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Projects — Compact 3-Column Grid */}
                <section className="space-y-5 pt-10 border-t border-border-subtle">
                    <h2 className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                        {t.projects.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project) => (
                            <button
                                key={project.title}
                                type="button"
                                onClick={() => setDetailProject(project)}
                                className="text-left rounded-xl border border-border-subtle bg-bg-surface overflow-hidden hover:border-border-strong transition-colors flex flex-col cursor-pointer group"
                            >
                                <div className="aspect-[16/10] w-full border-b border-border-subtle pointer-events-none">
                                    <ProjectCarousel
                                        images={project.images}
                                        title={project.title}
                                        tech={project.tech}
                                        fallbackLabel={t.projects.previewFallback}
                                        compact
                                        onImageClick={() => {}}
                                    />
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                                    <h3 className="text-sm font-heading font-bold text-text-heading group-hover:text-accent-primary transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-[10px] text-text-secondary truncate">
                                        {project.tech.slice(0, 3).join(' · ')}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Education — 2-Column Format */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-10 border-t border-border-subtle">
                    <h2 className="md:col-span-3 font-mono text-xs uppercase tracking-wider text-text-secondary pt-1">
                        {t.education.title}
                    </h2>
                    <div className="md:col-span-9 space-y-4">
                        {t.education.items.map((edu, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
                                <span className="sm:col-span-3 font-mono text-xs text-accent-primary">
                                    {edu.date || t.education.defaultBadge}
                                </span>
                                <div className="sm:col-span-9">
                                    <p className="text-sm font-heading font-semibold text-text-heading">
                                        {edu.degree}
                                    </p>
                                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-10 border-t border-border-subtle">
                    <h2 className="md:col-span-3 font-mono text-xs uppercase tracking-wider text-text-secondary pt-1">
                        {t.skills.title}
                    </h2>
                    <div className="md:col-span-9 space-y-4">
                        {t.skills.groups.map((group) => (
                            <div key={group.title} className="space-y-2">
                                <h3 className="text-xs font-mono text-text-heading font-semibold">{group.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle font-mono text-xs text-text-secondary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="pt-8 border-t border-border-subtle text-xs font-mono text-text-secondary">
                    {t.contact.footer}
                </footer>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {detailProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDetailProject(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[75]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl bg-bg-surface border border-border-subtle p-6 space-y-5 z-[80] shadow-2xl"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-xl font-heading font-bold text-text-heading">
                                    {detailProject.title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setDetailProject(null)}
                                    className="p-1.5 rounded-lg text-text-secondary hover:text-text-heading cursor-pointer"
                                    aria-label={t.layoutUi.closePanel}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-border-subtle">
                                <ProjectCarousel
                                    images={detailProject.images}
                                    title={detailProject.title}
                                    tech={detailProject.tech}
                                    fallbackLabel={t.projects.previewFallback}
                                    onImageClick={(i) => {
                                        setSelectedImages(detailProject.images);
                                        setModalIndex(i);
                                    }}
                                />
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {detailProject.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {detailProject.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <ProjectActionLinks links={detailProject.links} />
                        </motion.div>
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

export default ReadCvLayout;
