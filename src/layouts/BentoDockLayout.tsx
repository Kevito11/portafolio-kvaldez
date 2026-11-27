import { useState, useRef } from 'react';
import {
    Home,
    Briefcase,
    FolderGit2,
    Cpu,
    Mail,
    FileText,
    ChevronLeft,
    ChevronRight,
    Code2,
    Server,
    Wrench,
    MapPin,
    ArrowUpRight,
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

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const BentoDockLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);
    const carouselRef = useRef<HTMLDivElement>(null);

    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const scrollCarousel = (dir: 'left' | 'right') => {
        if (!carouselRef.current) return;
        const amount = Math.min(460, carouselRef.current.clientWidth * 0.85);
        carouselRef.current.scrollBy({
            left: dir === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-28">
            <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 md:pt-14 space-y-16">
                {/* Master Bento Grid (12 Columns) */}
                <section id="dock-home" className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Intro + CTA (7 cols) */}
                    <div className="md:col-span-7 rounded-2xl border border-border-subtle bg-bg-surface p-7 sm:p-9 flex flex-col justify-between">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium mb-5">
                                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                                {t.hero.badge}
                            </span>
                            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-text-heading tracking-tight leading-tight">
                                {t.hero.name}<span className="text-accent-primary">.</span>
                            </h1>
                            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
                                {t.hero.headline}
                            </p>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <a
                                href="#dock-projects"
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-accent-primary text-accent-on font-mono text-xs font-semibold hover:bg-accent-hover transition-colors"
                            >
                                <span>{t.hero.ctaPrimary}</span>
                                <ArrowUpRight size={15} />
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-border-subtle bg-bg-elevated text-text-heading font-mono text-xs font-medium hover:border-border-strong transition-colors cursor-pointer"
                            >
                                <Mail size={14} />
                                <span>{t.hero.ctaSecondary}</span>
                            </button>
                        </div>
                    </div>

                    {/* Photo Card (5 cols) */}
                    <div className="md:col-span-5">
                        <ProfilePhotoSwitcher
                            className="w-full h-full min-h-[320px] aspect-[6/7] md:aspect-auto rounded-2xl"
                            showBadge={t.about.locationBadge}
                        />
                    </div>

                    {/* Current Role Card (4 cols) */}
                    <div className="md:col-span-4 rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary">
                            {t.experience.presentBadge}
                        </span>
                        <div className="my-4">
                            <h2 className="text-xl font-heading font-bold text-text-heading">
                                {t.experience.items[0].role}
                            </h2>
                            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                                {t.hero.description}
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary">
                            <MapPin size={13} className="text-accent-primary" />
                            {t.about.locationBadge}
                        </span>
                    </div>

                    {/* Core Stack Card (5 cols) */}
                    <div className="md:col-span-5 rounded-2xl border border-border-subtle bg-bg-surface p-6">
                        <span className="font-mono text-xs uppercase tracking-wider text-accent-primary block mb-3">
                            {t.skills.eyebrow}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {t.skills.groups.flatMap((g) => g.items).slice(0, 12).map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-[11px] text-text-primary"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quick Contact Card (3 cols) */}
                    <div className="md:col-span-3 rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col justify-between">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-wider text-accent-primary block mb-2">
                                {t.contact.eyebrow}
                            </span>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {t.contact.title}
                            </p>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="w-full py-2.5 rounded-xl bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                            >
                                {t.contact.cta}
                            </button>
                            <a
                                href={CONTACT_INFO.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 rounded-xl border border-border-subtle bg-bg-elevated text-text-heading text-center font-mono text-xs"
                            >
                                {t.nav.resume}
                            </a>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="dock-experience" className="scroll-mt-10 space-y-10">
                    {t.experience.items.map((exp) => (
                        <div key={`${exp.role}-${exp.period}`} className="space-y-5">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                        {exp.period}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading mt-1">
                                        {exp.role}
                                    </h2>
                                    <p className="text-sm text-text-secondary mt-0.5">{exp.company}</p>
                                </div>
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
                                            className={`${spanClass} rounded-2xl border border-border-subtle bg-bg-surface p-6`}
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-accent-soft text-accent-primary flex items-center justify-center mb-3.5">
                                                <Icon size={18} />
                                            </div>
                                            <h3 className="font-heading font-bold text-text-heading mb-1.5">
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
                </section>

                {/* Projects Horizontal Scroll-Snap Carousel */}
                <section id="dock-projects" className="scroll-mt-10 space-y-5">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                {t.projects.eyebrow}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading mt-1">
                                {t.projects.title}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => scrollCarousel('left')}
                                aria-label="Scroll projects left"
                                className="w-9 h-9 rounded-full border border-border-subtle bg-bg-surface flex items-center justify-center text-text-heading hover:border-accent-primary hover:text-accent-primary transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollCarousel('right')}
                                aria-label="Scroll projects right"
                                className="w-9 h-9 rounded-full border border-border-subtle bg-bg-surface flex items-center justify-center text-text-heading hover:border-accent-primary hover:text-accent-primary transition-colors cursor-pointer"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1"
                    >
                        {projects.map((project) => (
                            <article
                                key={project.title}
                                className="snap-start shrink-0 w-[86vw] sm:w-[420px] rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden flex flex-col"
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
                                    <h3 className="text-lg font-heading font-bold text-text-heading leading-snug">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded-md bg-bg-elevated border border-border-subtle font-mono text-[10px] text-text-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <ProjectActionLinks links={project.links} />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* About + Skills & Education Compact Row */}
                <section id="dock-skills" className="scroll-mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-6 rounded-2xl border border-border-subtle bg-bg-surface p-6 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                            {t.about.title}
                        </span>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <div className="pt-3 border-t border-border-subtle grid grid-cols-2 gap-3">
                            {t.education.items.map((edu, idx) => (
                                <div key={idx}>
                                    <span className="font-mono text-[10px] text-accent-primary">
                                        {edu.date || t.education.defaultBadge}
                                    </span>
                                    <p className="text-xs font-heading font-bold text-text-heading">{edu.degree}</p>
                                    <p className="text-[11px] text-text-secondary">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {t.skills.groups.map((group) => (
                            <div
                                key={group.title}
                                className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
                            >
                                <h3 className="font-mono text-xs text-accent-primary mb-3">{group.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-1 rounded-md bg-bg-elevated border border-border-subtle font-mono text-[11px] text-text-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* macOS-Style Floating Bottom Dock */}
            <nav
                aria-label="Dock navigation"
                className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 rounded-2xl bg-bg-surface/90 backdrop-blur-xl border border-border-subtle px-2.5 py-2 shadow-2xl flex items-center gap-1 sm:gap-1.5 max-w-[94vw] overflow-x-auto"
            >
                <a
                    href="#dock-home"
                    title={t.nav.home}
                    aria-label={t.nav.home}
                    className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-bg-elevated transition-colors"
                >
                    <Home size={18} />
                </a>
                <a
                    href="#dock-experience"
                    title={t.nav.experience}
                    aria-label={t.nav.experience}
                    className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-bg-elevated transition-colors"
                >
                    <Briefcase size={18} />
                </a>
                <a
                    href="#dock-projects"
                    title={t.nav.projects}
                    aria-label={t.nav.projects}
                    className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-bg-elevated transition-colors"
                >
                    <FolderGit2 size={18} />
                </a>
                <a
                    href="#dock-skills"
                    title={t.nav.skills}
                    aria-label={t.nav.skills}
                    className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-bg-elevated transition-colors"
                >
                    <Cpu size={18} />
                </a>

                <div className="w-[1px] h-5 bg-border-subtle mx-1" aria-hidden="true" />

                <button
                    type="button"
                    onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                    className="px-2.5 h-8 rounded-xl border border-border-subtle bg-bg-elevated font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                >
                    {language.toUpperCase()}
                </button>

                <ThemeSwitcher />

                <a
                    href={CONTACT_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.nav.resume}
                    aria-label={t.nav.resume}
                    className="p-2.5 rounded-xl text-text-secondary hover:text-accent-primary hover:bg-bg-elevated transition-colors"
                >
                    <FileText size={18} />
                </a>
                <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    title={t.nav.contact}
                    aria-label={t.nav.contact}
                    className="p-2.5 rounded-xl bg-accent-primary text-accent-on hover:bg-accent-hover transition-colors cursor-pointer"
                >
                    <Mail size={18} />
                </button>
            </nav>

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

export default BentoDockLayout;
