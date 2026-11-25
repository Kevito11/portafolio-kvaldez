import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, FileText } from 'lucide-react';
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

const SwissEditorialLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [expandedProject, setExpandedProject] = useState<number | null>(0);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const traits = [t.about.traits.analytical, t.about.traits.creative, t.about.traits.proactive];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            {/* Swiss Minimal Top Bar */}
            <header className="sticky top-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-b border-border-subtle">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
                    <a href="#swiss-top" className="font-heading font-extrabold text-xl tracking-tighter text-text-heading">
                        KV<span className="text-accent-primary">.</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-text-secondary">
                        <a href="#swiss-about" className="hover:text-text-heading transition-colors">{t.nav.about}</a>
                        <a href="#swiss-experience" className="hover:text-text-heading transition-colors">{t.nav.experience}</a>
                        <a href="#swiss-skills" className="hover:text-text-heading transition-colors">{t.nav.skills}</a>
                        <a href="#swiss-projects" className="hover:text-text-heading transition-colors">{t.nav.projects}</a>
                        <a href="#swiss-contact" className="hover:text-text-heading transition-colors">{t.nav.contact}</a>
                    </nav>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-8 px-2.5 border border-border-subtle bg-bg-surface font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                        <a
                            href={CONTACT_INFO.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 px-3 bg-accent-primary text-accent-on font-mono text-xs font-bold uppercase inline-flex items-center gap-1.5"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                    </div>
                </div>
            </header>

            <main id="swiss-top" className="max-w-7xl mx-auto px-5 sm:px-8 pb-28">
                {/* Massive Typographic Editorial Hero */}
                <section className="py-12 md:py-16">
                    <p className="font-mono text-xs uppercase tracking-widest text-accent-primary mb-4">
                        {t.hero.badge}
                    </p>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold uppercase tracking-tighter leading-[0.95] text-text-heading">
                        {t.hero.name}
                    </h1>

                    {/* Asymmetric Exposed Grid */}
                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 border border-border-subtle bg-bg-surface">
                        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-subtle">
                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-4xl font-heading font-bold tracking-tight text-text-heading leading-tight">
                                    {t.hero.headline}
                                </h2>
                                <p className="text-base text-text-secondary leading-relaxed max-w-xl">
                                    {t.hero.description}
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#swiss-projects"
                                    className="px-6 py-3 bg-accent-primary text-accent-on font-mono text-xs uppercase tracking-wider font-bold hover:bg-accent-hover transition-colors"
                                >
                                    {t.hero.ctaPrimary}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setIsContactOpen(true)}
                                    className="px-6 py-3 border border-border-strong text-text-heading font-mono text-xs uppercase tracking-wider font-semibold hover:border-accent-primary hover:text-accent-primary transition-colors cursor-pointer"
                                >
                                    {t.hero.ctaSecondary}
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-5 p-4 sm:p-6 flex items-center justify-center bg-bg-elevated/40">
                            <ProfilePhotoSwitcher
                                className="w-full max-w-xs aspect-[6/7] rounded-none"
                                showBadge={t.about.locationBadge}
                            />
                        </div>
                    </div>
                </section>

                {/* Exposed Grid Section: About */}
                <section id="swiss-about" className="scroll-mt-20 py-14 border-t border-border-subtle lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24">
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2">
                                {t.about.eyebrow}
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tighter text-text-heading">
                                {t.about.title}
                            </h2>
                        </div>
                    </div>
                    <div className="lg:col-span-8 space-y-6">
                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p2)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 border border-border-subtle divide-y sm:divide-y-0 sm:divide-x divide-border-subtle bg-bg-surface">
                            {traits.map((trait) => (
                                <div key={trait.title} className="p-5">
                                    <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold mb-2">
                                        {trait.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{trait.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Exposed Grid Section: Experience */}
                <section id="swiss-experience" className="scroll-mt-20 py-14 border-t border-border-subtle lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24">
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2">
                                {t.experience.presentBadge}
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tighter text-text-heading">
                                {t.experience.title}
                            </h2>
                            <p className="font-mono text-xs text-text-secondary mt-3">
                                {t.experience.items[0].role}
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-8 divide-y divide-border-subtle border-y border-border-subtle">
                        {t.experience.items[0].pillars.map((pillar, idx) => (
                            <div key={pillar.title} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                                <span className="sm:col-span-1 font-mono text-xs text-accent-primary font-bold">
                                    0{idx + 1}
                                </span>
                                <div className="sm:col-span-11">
                                    <h3 className="text-lg font-heading font-bold text-text-heading">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exposed Grid Section: Projects (Expandable Editorial Index) */}
                <section id="swiss-projects" className="scroll-mt-20 py-14 border-t border-border-subtle lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24">
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2">
                                {t.projects.eyebrow}
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tighter text-text-heading">
                                {t.projects.title}
                            </h2>
                        </div>
                    </div>
                    <div className="lg:col-span-8 divide-y divide-border-subtle border-y border-border-subtle">
                        {projects.map((project, idx) => {
                            const isExpanded = expandedProject === idx;
                            const num = String(idx + 1).padStart(2, '0');

                            return (
                                <div key={project.title} className="bg-bg-primary">
                                    <button
                                        type="button"
                                        onClick={() => setExpandedProject(isExpanded ? null : idx)}
                                        className="w-full py-5 text-left flex items-center justify-between gap-4 group cursor-pointer"
                                    >
                                        <div className="flex items-baseline gap-4 min-w-0">
                                            <span className="font-mono text-xs text-accent-primary font-bold shrink-0">
                                                {num}
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className="text-lg sm:text-xl font-heading font-bold text-text-heading group-hover:text-accent-primary transition-colors truncate">
                                                    {project.title}
                                                </h3>
                                                <p className="font-mono text-[11px] text-text-secondary truncate mt-0.5">
                                                    {project.tech.slice(0, 4).join(' / ')}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-text-secondary transition-transform duration-200 ${
                                                isExpanded ? 'rotate-180 text-accent-primary' : ''
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-6 pl-0 sm:pl-9 space-y-4">
                                                    <div className="aspect-[16/9] border border-border-subtle overflow-hidden">
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
                                                    <p className="text-sm text-text-secondary leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                    <ProjectActionLinks links={project.links} />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Exposed Grid Section: Skills & Education */}
                <section id="swiss-skills" className="scroll-mt-20 py-14 border-t border-border-subtle lg:grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-24">
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2">
                                {t.skills.eyebrow}
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tighter text-text-heading">
                                {t.skills.title}
                            </h2>
                        </div>
                    </div>
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 border border-border-subtle divide-y sm:divide-y-0 sm:divide-x divide-border-subtle bg-bg-surface">
                            {t.skills.groups.map((group) => (
                                <div key={group.title} className="p-5 border-b border-border-subtle last:border-b-0">
                                    <h3 className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold mb-3">
                                        {group.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {group.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2 py-1 border border-border-subtle bg-bg-elevated font-mono text-xs text-text-primary"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="divide-y divide-border-subtle border-y border-border-subtle">
                            {t.education.items.map((edu, idx) => (
                                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <div>
                                        <h3 className="font-heading font-bold text-text-heading">{edu.degree}</h3>
                                        <p className="text-xs text-text-secondary">{edu.institution}</p>
                                    </div>
                                    <span className="font-mono text-xs text-accent-primary">
                                        {edu.date || t.education.defaultBadge}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Exposed Grid Section: Contact */}
                <section id="swiss-contact" className="scroll-mt-20 py-14 border-t border-border-subtle lg:grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 mb-6 lg:mb-0">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block mb-2">
                            {t.contact.eyebrow}
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tighter text-text-heading">
                            {t.contact.title}
                        </h2>
                    </div>
                    <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-7 border border-border-subtle bg-bg-surface">
                        <p className="text-sm sm:text-base text-text-secondary max-w-md">{t.contact.text}</p>
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-accent-primary text-accent-on font-mono text-xs uppercase tracking-wider font-bold cursor-pointer"
                        >
                            <Mail size={15} />
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

export default SwissEditorialLayout;
