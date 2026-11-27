import { useState } from 'react';
import {
    PanelLeftClose,
    PanelLeftOpen,
    User,
    Briefcase,
    FolderGit2,
    Cpu,
    GraduationCap,
    Mail,
    FileText,
    Code2,
    Server,
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

const PILLAR_ICONS = {
    code: Code2,
    ai: Cpu,
    server: Server,
    briefcase: Briefcase,
    wrench: Wrench,
} as const;

const ModularSidebarLayout = () => {
    const { t, language, setLanguage } = useLanguage();
    const projects = getProjectsList(t);

    const [collapsed, setCollapsed] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const navItems = [
        { href: '#mod-profile', label: t.nav.about, icon: User },
        { href: '#mod-experience', label: t.nav.experience, icon: Briefcase },
        { href: '#mod-projects', label: t.nav.projects, icon: FolderGit2 },
        { href: '#mod-skills', label: t.nav.skills, icon: Cpu },
        { href: '#mod-education', label: t.nav.education, icon: GraduationCap },
    ];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex">
            {/* Collapsible Left Sidebar (Desktop) */}
            <aside
                className={`hidden md:flex flex-col sticky top-0 h-screen border-r border-border-subtle bg-bg-surface transition-all duration-200 shrink-0 ${
                    collapsed ? 'w-16' : 'w-60'
                }`}
            >
                <div className="h-16 px-4 border-b border-border-subtle flex items-center justify-between">
                    {!collapsed && (
                        <span className="font-heading font-extrabold text-lg text-text-heading">
                            KV<span className="text-accent-primary">.</span>
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => setCollapsed((p) => !p)}
                        className="p-2 rounded-lg text-text-secondary hover:text-text-heading hover:bg-bg-elevated cursor-pointer mx-auto md:mx-0"
                        aria-label="Toggle sidebar"
                    >
                        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                    </button>
                </div>

                <nav className="flex-1 p-2.5 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:text-text-heading hover:bg-bg-elevated transition-colors ${
                                    collapsed ? 'justify-center' : ''
                                }`}
                            >
                                <Icon size={18} className="text-accent-primary shrink-0" />
                                {!collapsed && <span className="truncate">{item.label}</span>}
                            </a>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-border-subtle pb-16">
                    <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        title={t.nav.contact}
                        className={`w-full py-2.5 rounded-xl bg-accent-primary text-accent-on font-mono text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                            collapsed ? 'px-0' : 'px-3'
                        }`}
                    >
                        <Mail size={15} />
                        {!collapsed && <span>{t.nav.contact}</span>}
                    </button>
                </div>
            </aside>

            {/* Right Main Portal Area */}
            <div className="flex-1 min-w-0 flex flex-col">
                {/* Fixed Contextual Header */}
                <header className="sticky top-0 z-30 h-16 bg-bg-surface/90 backdrop-blur-md border-b border-border-subtle px-5 sm:px-8 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="font-heading font-bold text-sm sm:text-base text-text-heading truncate">
                            {t.hero.name}
                        </p>
                        <p className="font-mono text-[11px] text-text-secondary truncate">
                            {t.experience.items[0].role}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="h-8 px-2.5 rounded-lg border border-border-subtle bg-bg-elevated font-mono text-xs text-text-secondary hover:text-text-heading cursor-pointer"
                        >
                            {language.toUpperCase()}
                        </button>
                        <ThemeSwitcher />
                        <a
                            href={CONTACT_INFO.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 px-3 rounded-lg bg-accent-primary text-accent-on font-mono text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                            <FileText size={13} />
                            <span>{t.nav.resume}</span>
                        </a>
                    </div>
                </header>

                {/* Modular Widgets Body */}
                <main className="max-w-5xl w-full mx-auto px-5 sm:px-8 py-8 space-y-10 pb-24">
                    {/* Profile Module */}
                    <section id="mod-profile" className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="lg:col-span-8 rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 flex flex-col justify-between gap-5">
                            <div className="space-y-3">
                                <span className="inline-block px-3 py-1 rounded-full bg-accent-soft text-accent-primary font-mono text-xs font-medium">
                                    {t.hero.badge}
                                </span>
                                <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-text-heading">
                                    {t.hero.headline}
                                </h1>
                                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                    {renderHighlightedText(t.about.p1)}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {t.hero.highlights.map((h) => (
                                    <span
                                        key={h.value}
                                        className="px-3 py-1 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                    >
                                        {h.value}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <ProfilePhotoSwitcher
                                className="w-full max-w-xs mx-auto lg:max-w-none aspect-[6/7] rounded-2xl"
                                showBadge={t.about.locationBadge}
                            />
                        </div>
                    </section>

                    {/* Experience Module */}
                    <section id="mod-experience" className="scroll-mt-20 space-y-5">
                        {t.experience.items.map((exp) => (
                            <div
                                key={`${exp.role}-${exp.period}`}
                                className="rounded-2xl border border-border-subtle bg-bg-surface p-6 sm:p-8 space-y-5"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border-subtle">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                                            {exp.role}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-text-secondary mt-0.5">{exp.company}</p>
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
                                                className="p-4 rounded-xl border border-border-subtle bg-bg-primary/60 flex items-start gap-3"
                                            >
                                                <span className="p-2 rounded-lg bg-accent-soft text-accent-primary shrink-0">
                                                    <Icon size={16} />
                                                </span>
                                                <div>
                                                    <h3 className="font-heading font-bold text-sm sm:text-base text-text-heading">
                                                        {pillar.title}
                                                    </h3>
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
                    </section>

                    {/* Projects Module */}
                    <section id="mod-projects" className="scroll-mt-20 space-y-4">
                        <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-heading">
                            {t.projects.title}
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {projects.map((project) => (
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
                                            onImageClick={(i) => {
                                                setSelectedImages(project.images);
                                                setModalIndex(i);
                                            }}
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-1 gap-3">
                                        <h3 className="font-heading font-bold text-base sm:text-lg text-text-heading">
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
                        </div>
                    </section>

                    {/* Skills & Education Modules */}
                    <section id="mod-skills" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t.skills.groups.map((group) => (
                            <div
                                key={group.title}
                                className="rounded-2xl border border-border-subtle bg-bg-surface p-5"
                            >
                                <h3 className="font-heading font-bold text-text-heading mb-3">{group.title}</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-1 rounded-lg bg-bg-elevated border border-border-subtle font-mono text-xs text-text-primary"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section id="mod-education" className="scroll-mt-20 rounded-2xl border border-border-subtle bg-bg-surface p-6 space-y-4">
                        <h2 className="text-lg font-heading font-bold text-text-heading">{t.education.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.education.items.map((edu, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-bg-primary/60 border border-border-subtle">
                                    <span className="font-mono text-xs text-accent-primary">
                                        {edu.date || t.education.defaultBadge}
                                    </span>
                                    <h3 className="font-heading font-bold text-sm text-text-heading mt-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-xs text-text-secondary">{edu.institution}</p>
                                </div>
                            ))}
                        </div>
                    </section>
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

export default ModularSidebarLayout;
