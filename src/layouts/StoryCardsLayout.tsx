import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Code2, Cpu, Server, Briefcase, Wrench } from 'lucide-react';
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

type FilterKey = 'all' | 'fullstack' | 'aiZoho' | 'other';

const STORY_SECTIONS = [
    'story-hero',
    'story-about',
    'story-experience',
    'story-projects',
    'story-skills',
    'story-contact',
] as const;

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const StoryCardsLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [activeSection, setActiveSection] = useState<string>(STORY_SECTIONS[0]);
    const [filter, setFilter] = useState<FilterKey>('all');
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        STORY_SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) setActiveSection(id);
                    });
                },
                { rootMargin: '-30% 0px -55% 0px' }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const filteredProjects = projects.filter((proj) => {
        if (filter === 'all') return true;
        const joined = proj.tech.join(' ').toLowerCase();
        if (filter === 'aiZoho') return joined.includes('gemini') || joined.includes('zoho');
        if (filter === 'fullstack') {
            return joined.includes('node') || joined.includes('redux') || joined.includes('supabase') || joined.includes('firebase');
        }
        return joined.includes('qr') || joined.includes('google') || joined.includes('giphy');
    });

    const spyLabels = [
        { id: 'story-hero', label: t.nav.home },
        { id: 'story-about', label: t.nav.about },
        { id: 'story-experience', label: t.nav.experience },
        { id: 'story-projects', label: t.nav.projects },
        { id: 'story-skills', label: t.nav.skills },
        { id: 'story-contact', label: t.nav.contact },
    ];

    const filterOptions: Array<{ key: FilterKey; label: string }> = [
        { key: 'all', label: t.layoutUi.filters.all },
        { key: 'fullstack', label: t.layoutUi.filters.fullstack },
        { key: 'aiZoho', label: t.layoutUi.filters.aiZoho },
        { key: 'other', label: t.layoutUi.filters.other },
    ];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary pb-24">
            {/* Minimal Top Controls */}
            <header className="sticky top-0 z-30 bg-bg-primary/85 backdrop-blur-md border-b border-border-subtle/70">
                <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
                    <a href="#story-hero" className="font-heading font-extrabold text-lg text-text-heading">
                        KV<span className="text-accent-primary">.</span>
                    </a>
                    <div className="flex items-center gap-2">
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
                            className="h-8 px-3.5 rounded-full bg-accent-primary text-accent-on font-mono text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Right Floating Scroll Spy Dots */}
            <nav
                aria-label="Scroll spy"
                className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 p-2.5 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-subtle shadow-lg"
            >
                {spyLabels.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            title={item.label}
                            aria-label={item.label}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                isActive
                                    ? 'bg-accent-primary scale-125'
                                    : 'bg-border-strong hover:bg-text-secondary'
                            }`}
                        />
                    );
                })}
            </nav>

            {/* Story Section Cards */}
            <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 space-y-8">
                {/* Hero Card */}
                <motion.section
                    id="story-hero"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs"
                >
                    <div className="lg:col-span-7 space-y-5">
                        <span className="inline-block px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium">
                            {t.hero.badge}
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-text-heading tracking-tight">
                            {t.hero.name}<span className="text-accent-primary">.</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary">{t.hero.headline}</p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <a
                                href="#story-projects"
                                className="px-6 py-3 rounded-full bg-accent-primary text-accent-on font-mono text-xs font-semibold"
                            >
                                {t.hero.ctaPrimary}
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="px-6 py-3 rounded-full border border-border-subtle bg-bg-elevated text-text-heading font-mono text-xs font-medium cursor-pointer"
                            >
                                {t.hero.ctaSecondary}
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <ProfilePhotoSwitcher
                            className="w-full max-w-xs mx-auto aspect-[6/7] rounded-2xl"
                            showBadge={t.about.locationBadge}
                        />
                    </div>
                </motion.section>

                {/* About Card */}
                <motion.section
                    id="story-about"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 space-y-5 shadow-xs"
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                        {t.about.eyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading">
                        {t.about.title}
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">
                        {renderHighlightedText(t.about.p1)}
                    </p>
                    <p className="text-base text-text-secondary leading-relaxed">
                        {renderHighlightedText(t.about.p2)}
                    </p>
                </motion.section>

                {/* Experience Card */}
                <motion.section
                    id="story-experience"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 space-y-10 shadow-xs"
                >
                    {t.experience.items.map((exp, expIdx) => (
                        <div
                            key={`${exp.role}-${exp.period}`}
                            className={`space-y-5 ${expIdx > 0 ? 'pt-8 border-t border-border-subtle' : ''}`}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                        {exp.company}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading mt-1">
                                        {exp.role}
                                    </h2>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs">
                                    {exp.period}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {exp.pillars.map((pillar) => {
                                    const Icon = PILLAR_ICONS[pillar.icon];
                                    return (
                                        <div
                                            key={pillar.title}
                                            className="p-5 rounded-2xl border border-border-subtle bg-bg-primary/60 flex items-start gap-3.5"
                                        >
                                            <span className="p-2 rounded-xl bg-accent-soft text-accent-primary shrink-0">
                                                <Icon size={17} />
                                            </span>
                                            <div>
                                                <h3 className="font-heading font-bold text-text-heading">
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
                </motion.section>

                {/* Projects Card with Quick Category Filters */}
                <motion.section
                    id="story-projects"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 space-y-6 shadow-xs"
                >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <span className="font-mono text-xs uppercase tracking-widest text-accent-primary">
                                {t.projects.eyebrow}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading mt-1">
                                {t.projects.title}
                            </h2>
                        </div>

                        {/* Quick Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setFilter(opt.key)}
                                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                                        filter === opt.key
                                            ? 'bg-accent-primary text-accent-on font-semibold'
                                            : 'bg-bg-elevated border border-border-subtle text-text-secondary hover:text-text-heading'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredProjects.map((project) => (
                            <article
                                key={project.title}
                                className="rounded-2xl border border-border-subtle bg-bg-primary/60 overflow-hidden flex flex-col"
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
                                    <h3 className="font-heading font-bold text-text-heading">{project.title}</h3>
                                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed flex-1">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tech.slice(0, 5).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded bg-bg-surface border border-border-subtle font-mono text-[10px] text-text-secondary"
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
                </motion.section>

                {/* Skills + Education Card */}
                <motion.section
                    id="story-skills"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 space-y-8 shadow-xs"
                >
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text-heading">
                        {t.skills.title} & {t.education.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t.skills.groups.map((group) => (
                            <div key={group.title} className="p-5 rounded-2xl border border-border-subtle bg-bg-primary/60">
                                <h3 className="font-mono text-xs text-accent-primary mb-3">{group.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 rounded-lg bg-bg-surface border border-border-subtle font-mono text-xs text-text-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border-subtle">
                        {t.education.items.map((edu, idx) => (
                            <div key={idx} className="flex items-baseline justify-between gap-2 p-3 rounded-xl bg-bg-primary/50">
                                <div>
                                    <p className="text-sm font-heading font-semibold text-text-heading">{edu.degree}</p>
                                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                                </div>
                                <span className="font-mono text-xs text-accent-primary shrink-0">
                                    {edu.date || t.education.defaultBadge}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Contact Card */}
                <motion.section
                    id="story-contact"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="scroll-mt-20 rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 text-center space-y-5 shadow-xs"
                >
                    <h2 className="text-3xl font-heading font-bold text-text-heading">{t.contact.title}</h2>
                    <p className="text-base text-text-secondary max-w-xl mx-auto">{t.contact.text}</p>
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-accent-on font-mono text-xs font-semibold cursor-pointer"
                    >
                        <Mail size={15} />
                        <span>{t.contact.cta}</span>
                    </button>
                    <p className="pt-6 text-xs font-mono text-text-secondary">{t.contact.footer}</p>
                </motion.section>
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

export default StoryCardsLayout;
