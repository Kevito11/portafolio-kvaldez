import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, FileText, ArrowUp } from 'lucide-react';
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

const GalleryMinimalLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const navLinks = [
        { href: '#gal-about', label: t.nav.about },
        { href: '#gal-experience', label: t.nav.experience },
        { href: '#gal-projects', label: t.nav.projects },
        { href: '#gal-skills', label: t.nav.skills },
        { href: '#gal-contact', label: t.nav.contact },
    ];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            {/* Minimal Architectural Top Bar */}
            <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#gal-top" className="font-heading font-extrabold text-lg tracking-tight text-text-heading">
                        KV.
                    </a>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-8 px-2.5 rounded-full border border-border-subtle font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                        <button
                            type="button"
                            onClick={() => setMenuOpen((p) => !p)}
                            className="h-8 px-3 rounded-full border border-border-subtle text-text-heading font-mono text-xs inline-flex items-center gap-1.5 cursor-pointer"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={14} /> : <Menu size={14} />}
                            <span>{t.nav.menu}</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden border-t border-border-subtle bg-bg-surface"
                        >
                            <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 text-sm">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-text-secondary hover:text-text-heading transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href={CONTACT_INFO.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs underline text-text-heading"
                                >
                                    {t.nav.resume}
                                </a>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            <main id="gal-top" className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-24 pb-28">
                {/* Zen Editorial Intro */}
                <section className="space-y-10">
                    <div className="space-y-4">
                        <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                            {t.hero.badge}
                        </p>
                        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-text-heading leading-[1.06]">
                            {t.hero.name}
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                            {t.hero.headline}
                        </p>
                    </div>

                    <ProfilePhotoSwitcher
                        className="w-full max-w-md aspect-[6/7] rounded-2xl"
                        showBadge={t.about.locationBadge}
                    />
                </section>

                {/* About */}
                <section id="gal-about" className="scroll-mt-24 space-y-5 border-t border-border-subtle pt-12">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        {t.about.title}
                    </h2>
                    <p className="text-base sm:text-lg text-text-primary leading-relaxed">
                        {renderHighlightedText(t.about.p1)}
                    </p>
                    <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                        {renderHighlightedText(t.about.p2)}
                    </p>
                </section>

                {/* Experience */}
                <section id="gal-experience" className="scroll-mt-24 space-y-8 border-t border-border-subtle pt-12">
                    <div className="flex items-baseline justify-between gap-4">
                        <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                            {t.experience.title}
                        </h2>
                        <span className="font-mono text-xs text-text-heading">
                            {t.experience.presentBadge}
                        </span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-text-heading">
                        {t.experience.items[0].role}
                    </h3>
                    <div className="space-y-6">
                        {t.experience.items[0].pillars.map((pillar) => (
                            <div key={pillar.title} className="space-y-1">
                                <h4 className="text-base font-heading font-semibold text-text-heading">
                                    {pillar.title}
                                </h4>
                                <p className="text-sm text-text-secondary leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Single-Column Architecture Gallery Projects */}
                <section id="gal-projects" className="scroll-mt-24 space-y-16 border-t border-border-subtle pt-12">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        {t.projects.title}
                    </h2>

                    <div className="space-y-20">
                        {projects.map((project) => (
                            <article key={project.title} className="space-y-5">
                                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border-subtle">
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
                                <div className="space-y-3">
                                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                        {project.description}
                                    </p>
                                    <p className="font-mono text-xs text-text-secondary">
                                        {project.tech.join(' · ')}
                                    </p>
                                    <div className="pt-1">
                                        <ProjectActionLinks links={project.links} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Skills & Education */}
                <section id="gal-skills" className="scroll-mt-24 space-y-10 border-t border-border-subtle pt-12">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                        {t.skills.title}
                    </h2>
                    <div className="space-y-6">
                        {t.skills.groups.map((group) => (
                            <div key={group.title} className="space-y-2">
                                <h3 className="text-sm font-heading font-semibold text-text-heading">
                                    {group.title}
                                </h3>
                                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                                    {group.items.join(' · ')}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-border-subtle space-y-4">
                        <h2 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
                            {t.education.title}
                        </h2>
                        {t.education.items.map((edu, idx) => (
                            <div key={idx} className="flex items-baseline justify-between gap-4">
                                <div>
                                    <p className="text-sm font-heading font-semibold text-text-heading">
                                        {edu.degree}
                                    </p>
                                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                                </div>
                                <span className="font-mono text-xs text-text-secondary shrink-0">
                                    {edu.date || t.education.defaultBadge}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Minimal Contact & Footer */}
                <section id="gal-contact" className="scroll-mt-24 border-t border-border-subtle pt-12 space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-heading">
                        {t.contact.title}
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">{t.contact.text}</p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                        >
                            <Mail size={14} />
                            <span>{t.contact.cta}</span>
                        </button>
                        <a
                            href={CONTACT_INFO.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle text-text-heading font-mono text-xs"
                        >
                            <FileText size={14} />
                            <span>{t.contact.ctaResume}</span>
                        </a>
                    </div>

                    <footer className="pt-12 flex items-center justify-between text-xs font-mono text-text-secondary">
                        <span>{t.contact.footer}</span>
                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="inline-flex items-center gap-1 hover:text-text-heading cursor-pointer"
                        >
                            <ArrowUp size={13} />
                            <span>{t.contact.backToTop}</span>
                        </button>
                    </footer>
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

export default GalleryMinimalLayout;
