import { useState } from 'react';
import { ArrowRight, Mail, FileText, Code2, Cpu, Server, Briefcase, Wrench } from 'lucide-react';
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

const TechStudioLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const featuredProjects = projects.slice(0, 3);
    const archiveProjects = projects.slice(3);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
            {/* Clean Studio Navigation */}
            <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
                    <a href="#studio-top" className="font-heading font-extrabold text-xl tracking-tight text-text-heading">
                        KV<span className="text-accent-primary">.</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text-secondary">
                        <a href="#studio-projects" className="hover:text-text-heading">{t.nav.projects}</a>
                        <a href="#studio-experience" className="hover:text-text-heading">{t.nav.experience}</a>
                        <a href="#studio-skills" className="hover:text-text-heading">{t.nav.skills}</a>
                        <a href="#studio-about" className="hover:text-text-heading">{t.nav.about}</a>
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
                            className="h-8 px-4 rounded-lg bg-accent-primary text-accent-on font-mono text-xs font-bold cursor-pointer"
                        >
                            {t.nav.contact}
                        </button>
                    </div>
                </div>
            </header>

            <main id="studio-top" className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 md:pt-16 space-y-20">
                {/* High-Impact Studio Hero + Specialties Strip */}
                <section className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-8 space-y-6">
                            <span className="inline-block font-mono text-xs uppercase tracking-widest text-accent-primary font-semibold">
                                {t.hero.badge}
                            </span>
                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-text-heading tracking-tight leading-[1.03]">
                                {t.hero.headline}
                            </h1>
                            <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
                                {t.hero.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#studio-projects"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent-primary text-accent-on font-semibold text-sm hover:bg-accent-hover transition-colors"
                                >
                                    <span>{t.hero.ctaPrimary}</span>
                                    <ArrowRight size={16} />
                                </a>
                                <a
                                    href={CONTACT_INFO.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border-subtle bg-bg-surface text-text-heading font-semibold text-sm hover:border-border-strong transition-colors"
                                >
                                    <FileText size={16} />
                                    <span>{t.contact.ctaResume}</span>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <ProfilePhotoSwitcher
                                className="w-full max-w-xs mx-auto aspect-[6/7] rounded-2xl shadow-xl"
                                showBadge={t.hero.name}
                            />
                        </div>
                    </div>

                    {/* Horizontal Services / Specialties Strip */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-border-subtle py-6">
                        {t.hero.highlights.map((item, idx) => (
                            <div key={item.value} className="flex items-start gap-3">
                                <span className="font-mono text-xs text-accent-primary font-bold pt-0.5">
                                    0{idx + 1}
                                </span>
                                <div>
                                    <span className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                                        {item.label}
                                    </span>
                                    <span className="block font-heading text-base font-bold text-text-heading mt-0.5">
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Asymmetric Projects Grid: Top 3 Featured + 3-Column Archive */}
                <section id="studio-projects" className="scroll-mt-20 space-y-8">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                            {t.projects.eyebrow}
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-heading mt-1">
                            {t.projects.title}
                        </h2>
                    </div>

                    {/* Top 3 Featured (Wide Asymmetric Cards) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {featuredProjects.map((project, idx) => (
                            <article
                                key={project.title}
                                className={`${
                                    idx === 0 ? 'lg:col-span-12 lg:grid lg:grid-cols-12' : 'lg:col-span-6 flex flex-col'
                                } rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden shadow-xs`}
                            >
                                <div
                                    className={`${
                                        idx === 0
                                            ? 'lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:border-r'
                                            : 'aspect-[16/10]'
                                    } border-b border-border-subtle`}
                                >
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
                                <div
                                    className={`${
                                        idx === 0 ? 'lg:col-span-5' : 'flex-1'
                                    } p-6 sm:p-7 flex flex-col justify-between gap-4`}
                                >
                                    <div className="space-y-3">
                                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-soft text-accent-primary font-mono text-[11px] font-medium">
                                            {t.projects.featured}
                                        </span>
                                        <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="space-y-3">
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
                    </div>

                    {/* Remaining Projects in 3-Column Ordered Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {archiveProjects.map((project) => (
                            <article
                                key={project.title}
                                className="rounded-2xl border border-border-subtle bg-bg-surface overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[16/10] border-b border-border-subtle">
                                    <ProjectCarousel
                                        images={project.images}
                                        title={project.title}
                                        tech={project.tech}
                                        fallbackLabel={t.projects.previewFallback}
                                        compact
                                        onImageClick={(i) => {
                                            setSelectedImages(project.images);
                                            setModalIndex(i);
                                        }}
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-1 gap-3">
                                    <h3 className="text-base font-heading font-bold text-text-heading">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 flex-1">
                                        {project.description}
                                    </p>
                                    <ProjectActionLinks links={project.links} />
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Horizontal Experience Cards with Prominent Icons */}
                <section id="studio-experience" className="scroll-mt-20 space-y-12">
                    {t.experience.items.map((exp) => (
                        <div key={`${exp.role}-${exp.period}`} className="space-y-5">
                            <div className="flex flex-wrap items-end justify-between gap-2">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                        {exp.period}
                                    </span>
                                    <h2 className="text-3xl font-heading font-bold text-text-heading mt-1">
                                        {exp.role}
                                    </h2>
                                    <p className="text-sm text-text-secondary mt-0.5">{exp.company}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {exp.pillars.map((pillar) => {
                                    const Icon = PILLAR_ICONS[pillar.icon];
                                    return (
                                        <div
                                            key={pillar.title}
                                            className="rounded-2xl border border-border-subtle bg-bg-surface p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-border-strong transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-accent-soft text-accent-primary flex items-center justify-center shrink-0">
                                                <Icon size={22} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-heading font-bold text-text-heading">
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
                        </div>
                    ))}
                </section>

                {/* Skills + About & CTA */}
                <section id="studio-skills" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <section id="studio-about" className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                            {t.about.title}
                        </span>
                        <p className="text-base text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {t.contact.footer}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent-primary text-accent-on font-semibold text-sm hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                        <Mail size={16} />
                        <span>{t.contact.cta}</span>
                    </button>
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

export default TechStudioLayout;
