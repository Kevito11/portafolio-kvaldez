import { useState, useEffect } from 'react';
import { Code2, Cpu, Server, Briefcase, Wrench, FileText, Mail, MapPin } from 'lucide-react';
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

const SECTION_IDS = ['split-about', 'split-experience', 'split-projects', 'split-skills', 'split-education'] as const;

const SplitScreenLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [activeSection, setActiveSection] = useState<string>(SECTION_IDS[0]);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) setActiveSection(id);
                    });
                },
                { rootMargin: '-25% 0px -60% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    const navItems = [
        { id: 'split-about', label: t.nav.about },
        { id: 'split-experience', label: t.nav.experience },
        { id: 'split-projects', label: t.nav.projects },
        { id: 'split-skills', label: t.nav.skills },
        { id: 'split-education', label: t.nav.education },
    ];

    const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            {/* Mobile Compact Top Bar */}
            <header className="lg:hidden sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle px-5 py-3 flex items-center justify-between">
                <span className="font-mono font-bold text-base text-text-heading">
                    KV<span className="text-accent-primary">_</span>
                </span>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        className="h-8 px-2.5 rounded-md border border-border-subtle bg-bg-surface font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                    >
                        {language.toUpperCase()}
                    </button>
                    <ThemeSwitcher />
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="h-8 px-3 rounded-md bg-accent-primary text-accent-on font-mono text-xs font-medium cursor-pointer"
                    >
                        {t.nav.contact}
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12">
                {/* Fixed Left Console Column */}
                <aside className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen lg:border-r border-border-subtle px-6 sm:px-10 py-10 lg:py-12 flex flex-col justify-between bg-bg-primary">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <ProfilePhotoSwitcher className="w-24 sm:w-28 aspect-[6/7] rounded-lg shrink-0" />
                            <div className="min-w-0 pt-1">
                                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent-primary mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                                    {t.experience.presentBadge}
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading tracking-tight">
                                    {t.hero.name}
                                </h1>
                                <p className="text-sm font-mono text-text-secondary mt-1">
                                    {t.experience.items[0].role}
                                </p>
                                <span className="inline-flex items-center gap-1 text-xs font-mono text-text-secondary mt-2">
                                    <MapPin size={12} className="text-accent-primary" />
                                    {t.about.locationBadge}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                            {t.hero.description}
                        </p>

                        {/* Vertical Nav with Active Indicator */}
                        <nav aria-label="Section navigation" className="hidden lg:flex flex-col gap-1 pt-2">
                            {navItems.map((item, idx) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className={`group flex items-center gap-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                                            isActive
                                                ? 'text-accent-primary font-semibold'
                                                : 'text-text-secondary hover:text-text-heading'
                                        }`}
                                    >
                                        <span
                                            className={`h-[1px] transition-all duration-200 ${
                                                isActive
                                                    ? 'w-10 bg-accent-primary'
                                                    : 'w-4 bg-border-strong group-hover:w-7 group-hover:text-text-heading'
                                            }`}
                                        />
                                        <span>0{idx + 1}. {item.label}</span>
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom Controls & Actions */}
                    <div className="pt-8 mt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent-primary text-accent-on hover:bg-accent-hover font-mono text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <Mail size={14} />
                                <span>{t.nav.contact}</span>
                            </button>
                            <a
                                href={CONTACT_INFO.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-subtle bg-bg-surface text-text-heading hover:border-border-strong font-mono text-xs font-medium transition-colors"
                            >
                                <FileText size={14} />
                                <span>{t.nav.resume}</span>
                            </a>
                        </div>

                        <div className="hidden lg:flex items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleLanguage}
                                className="h-8 px-2.5 rounded-full border border-border-subtle bg-bg-elevated/80 font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                            >
                                {language.toUpperCase()}
                            </button>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </aside>

                {/* Scrollable Right Content Column */}
                <main className="lg:col-span-7 px-6 sm:px-10 py-10 lg:py-16 space-y-20 pb-28">
                    {/* About */}
                    <section id="split-about" className="scroll-mt-16 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            // {t.about.title}
                        </span>
                        <p className="text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p1)}
                        </p>
                        <p className="text-text-secondary leading-relaxed">
                            {renderHighlightedText(t.about.p2)}
                        </p>
                    </section>

                    {/* Experience */}
                    <section id="split-experience" className="scroll-mt-16 space-y-6">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            // {t.experience.title}
                        </span>
                        <div className="space-y-8">
                            {t.experience.items.map((exp) => (
                                <div key={`${exp.role}-${exp.period}`} className="space-y-3">
                                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2 border-b border-border-subtle">
                                        <div>
                                            <h3 className="text-base font-heading font-bold text-text-heading">
                                                {exp.role}
                                            </h3>
                                            <p className="text-xs text-text-secondary">{exp.company}</p>
                                        </div>
                                        <span className="font-mono text-xs text-accent-primary">{exp.period}</span>
                                    </div>
                                    <div className="space-y-3">
                                        {exp.pillars.map((pillar) => {
                                            const Icon = PILLAR_ICONS[pillar.icon];
                                            return (
                                                <div
                                                    key={pillar.title}
                                                    className="p-4 rounded-lg border border-border-subtle bg-bg-surface hover:border-accent-primary/50 transition-colors flex items-start gap-3.5"
                                                >
                                                    <span className="p-2 rounded-md bg-accent-soft text-accent-primary shrink-0 mt-0.5">
                                                        <Icon size={16} />
                                                    </span>
                                                    <div>
                                                        <h4 className="text-sm sm:text-base font-heading font-bold text-text-heading">
                                                            {pillar.title}
                                                        </h4>
                                                        <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                                                            {pillar.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects — Compact Horizontal Cards */}
                    <section id="split-projects" className="scroll-mt-16 space-y-5">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            // {t.projects.title}
                        </span>
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <article
                                    key={project.title}
                                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 rounded-lg border border-border-subtle bg-bg-surface hover:border-border-strong transition-colors"
                                >
                                    <div className="sm:col-span-5 aspect-[16/10] sm:aspect-auto sm:h-40 rounded-md overflow-hidden border border-border-subtle">
                                        <ProjectCarousel
                                            images={project.images}
                                            title={project.title}
                                            tech={project.tech}
                                            fallbackLabel={t.projects.previewFallback}
                                            compact
                                            onImageClick={(idx) => {
                                                setSelectedImages(project.images);
                                                setModalIndex(idx);
                                            }}
                                        />
                                    </div>
                                    <div className="sm:col-span-7 flex flex-col justify-between gap-3">
                                        <div>
                                            <h3 className="text-base font-heading font-bold text-text-heading leading-snug">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="space-y-2.5">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.slice(0, 5).map((tech) => (
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
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    {/* Skills */}
                    <section id="split-skills" className="scroll-mt-16 space-y-5">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            // {t.skills.title}
                        </span>
                        <div className="space-y-4">
                            {t.skills.groups.map((group) => (
                                <div key={group.title} className="p-4 rounded-lg border border-border-subtle bg-bg-surface">
                                    <h3 className="font-mono text-xs text-accent-primary mb-3">{group.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2.5 py-1 rounded bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section id="split-education" className="scroll-mt-16 space-y-4">
                        <span className="font-mono text-xs uppercase tracking-widest text-accent-primary block">
                            // {t.education.title}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {t.education.items.map((edu, idx) => (
                                <div key={idx} className="p-4 rounded-lg border border-border-subtle bg-bg-surface">
                                    <span className="font-mono text-[11px] text-accent-primary">
                                        {edu.date || t.education.defaultBadge}
                                    </span>
                                    <h3 className="text-sm font-heading font-bold text-text-heading mt-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xs text-text-secondary mt-0.5">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="pt-8 border-t border-border-subtle font-mono text-xs text-text-secondary">
                        {t.contact.footer}
                    </footer>
                </main>
            </div>

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

export default SplitScreenLayout;
