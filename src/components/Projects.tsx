import { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Maximize2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const ImageModal = ({
    isOpen,
    images,
    currentIndex,
    onNext,
    onPrev,
    onClose,
}: {
    isOpen: boolean;
    images: string[] | null;
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
}) => {
    const [zoomScale, setZoomScale] = useState(1);
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Keyboard navigation and Scroll Zoom
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowRight') {
                onNext();
            } else if (e.key === 'ArrowLeft') {
                onPrev();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (!isOpen) return;
            if (e.ctrlKey) e.preventDefault();

            setZoomScale((prev) => {
                const zoomSpeed = 0.1;
                const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
                const newScale = prev + delta;
                return Math.min(Math.max(newScale, 1), 4);
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isOpen, onNext, onPrev, onClose]);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setZoomScale(1);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset zoom and position when image changes
    useEffect(() => {
        setZoomScale(1);
        setNaturalSize({ width: 0, height: 0 });
    }, [currentIndex]);

    const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

    // Calculate dynamic constraints based on zoom level and image aspect ratio
    useEffect(() => {
        if (containerRef.current && naturalSize.width > 0) {
            const { width: cW, height: cH } = containerRef.current.getBoundingClientRect();

            const imageRatio = naturalSize.width / naturalSize.height;
            const containerRatio = cW / cH;

            let vW1x: number;
            let vH1x: number;
            if (imageRatio > containerRatio) {
                vW1x = cW;
                vH1x = cW / imageRatio;
            } else {
                vH1x = cH;
                vW1x = cH * imageRatio;
            }

            const vW = vW1x * zoomScale;
            const vH = vH1x * zoomScale;

            const xOffset = Math.max(0, vW - cW) / 2;
            const yOffset = Math.max(0, vH - cH) / 2;

            const margin = 100;

            setConstraints({
                left: -xOffset - margin,
                right: xOffset + margin,
                top: -yOffset - margin,
                bottom: yOffset + margin,
            });
        }
    }, [zoomScale, isOpen, currentIndex, naturalSize]);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        setNaturalSize({ width: naturalWidth, height: naturalHeight });
    };

    if (!isOpen || !images) return null;

    const currentImage = images[currentIndex];
    const isZoomed = zoomScale > 1;

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoomScale((prev) => Math.min(prev + 0.5, 3));
    };

    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoomScale((prev) => Math.max(prev - 0.5, 1));
    };

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation();
        setZoomScale((prev) => (prev > 1 ? 1 : 2));
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                {/* Top Controls */}
                <div className="absolute top-6 right-6 z-[110]">
                    <motion.button
                        onClick={onClose}
                        className="p-2 text-zinc-100 hover:text-accent-primary transition-colors bg-zinc-900/90 rounded-full border border-zinc-700 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Close image preview"
                    >
                        <X size={28} />
                    </motion.button>
                </div>

                {/* Bottom Controls (Zoom) */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 z-[110] bg-zinc-900/90 p-2 rounded-full border border-zinc-700 backdrop-blur-sm shadow-xl">
                    <button
                        onClick={handleZoomOut}
                        disabled={zoomScale <= 1}
                        className={`p-2 rounded-full transition-all ${
                            zoomScale <= 1
                                ? 'text-zinc-600 cursor-not-allowed'
                                : 'text-zinc-100 hover:text-accent-primary hover:bg-zinc-800 cursor-pointer'
                        }`}
                        aria-label="Zoom out"
                    >
                        <Maximize2 size={18} className="rotate-180" />
                    </button>

                    <div className="h-4 w-[1px] bg-zinc-700 mx-1"></div>

                    <button
                        onClick={toggleZoom}
                        className={`px-3 py-1 font-mono text-xs rounded transition-all cursor-pointer ${
                            isZoomed ? 'text-accent-primary bg-zinc-800' : 'text-zinc-300 hover:text-white'
                        }`}
                    >
                        {zoomScale.toFixed(1)}x
                    </button>

                    <div className="h-4 w-[1px] bg-zinc-700 mx-1"></div>

                    <button
                        onClick={handleZoomIn}
                        disabled={zoomScale >= 3}
                        className={`p-2 rounded-full transition-all ${
                            zoomScale >= 3
                                ? 'text-zinc-600 cursor-not-allowed'
                                : 'text-zinc-100 hover:text-accent-primary hover:bg-zinc-800 cursor-pointer'
                        }`}
                        aria-label="Zoom in"
                    >
                        <Maximize2 size={18} />
                    </button>
                </div>

                {/* Navigation Arrows inside Modal */}
                {images.length > 1 && !isZoomed && (
                    <>
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev();
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700 hover:bg-accent-primary hover:text-accent-on hover:border-accent-primary z-[110] transition-all cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={32} />
                        </motion.button>
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700 hover:bg-accent-primary hover:text-accent-on hover:border-accent-primary z-[110] transition-all cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Next image"
                        >
                            <ChevronRight size={32} />
                        </motion.button>
                    </>
                )}

                <div
                    ref={containerRef}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.div
                        key={currentIndex}
                        drag={isZoomed}
                        dragConstraints={constraints}
                        dragElastic={0.1}
                        dragMomentum={true}
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{
                            scale: zoomScale,
                            opacity: 1,
                            cursor: isZoomed ? 'grab' : 'default',
                        }}
                        whileTap={{ cursor: isZoomed ? 'grabbing' : 'default' }}
                        exit={{ opacity: 0 }}
                        transition={{
                            scale: { type: 'spring', damping: 25, stiffness: 300 },
                            opacity: { duration: 0.3 },
                        }}
                        className="relative max-w-7xl max-h-[90vh] flex items-center justify-center rounded-lg shadow-2xl border border-zinc-700 bg-zinc-950"
                    >
                        <img
                            src={`/${currentImage}`}
                            onLoad={handleImageLoad}
                            alt="Project screenshot full view"
                            className="w-full h-full object-contain pointer-events-none select-none shadow-2xl transition-transform duration-300"
                        />
                    </motion.div>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-200 font-mono text-sm bg-zinc-900/90 px-4 py-2 rounded-full border border-zinc-700 backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const ProjectCarousel = ({
    images,
    title,
    tech,
    fallbackLabel,
    onImageClick,
}: {
    images: string[];
    title: string;
    tech: string[];
    fallbackLabel: string;
    onImageClick: (idx: number) => void;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { theme } = useTheme();

    const frameRadius =
        theme === 'bento' ? 'rounded-2xl' : theme === 'editorial' ? 'rounded-xs' : 'rounded';

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (
            <div
                className={`w-full h-full ${frameRadius} shadow-xl border border-border-subtle overflow-hidden relative bg-bg-surface p-6 md:p-8 flex flex-col justify-between text-left transition-all duration-300 group hover:border-accent-primary/60`}
            >
                {/* Decorative subtle grid background */}
                <div
                    className="absolute inset-0 opacity-[0.07] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                    aria-hidden="true"
                />

                <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary border border-border-subtle text-accent-primary font-mono text-xs">
                        <Layers size={14} />
                        <span>{fallbackLabel}</span>
                    </span>
                    <span className="flex gap-1.5" aria-hidden="true">
                        <span className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                        <span className="w-2.5 h-2.5 rounded-full bg-border-subtle" />
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-primary/70" />
                    </span>
                </div>

                <div className="relative z-10 my-auto py-4">
                    <h4 className="text-xl md:text-2xl font-serif font-bold text-text-heading leading-snug mb-2">
                        {title}
                    </h4>
                    <div className="w-12 h-[2px] bg-accent-primary" />
                </div>

                <div className="relative z-10 flex flex-wrap gap-2">
                    {tech.slice(0, 5).map((item) => (
                        <span
                            key={item}
                            className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-bg-primary/90 border border-border-subtle text-text-secondary"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    if (images.length === 1) {
        return (
            <div
                className={`w-full h-full ${frameRadius} shadow-xl border border-border-subtle overflow-hidden relative group cursor-zoom-in bg-bg-surface transition-colors duration-300`}
                onClick={() => onImageClick(0)}
            >
                <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                    <Maximize2 className="text-accent-primary drop-shadow-lg" size={32} />
                </div>
                <img
                    src={`/${images[0]}`}
                    alt={title}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-[1.02]"
                />
            </div>
        );
    }

    return (
        <div
            className={`w-full h-full ${frameRadius} shadow-xl border border-border-subtle overflow-hidden relative group bg-bg-surface transition-colors duration-300`}
        >
            <div className="w-full h-full cursor-zoom-in relative" onClick={() => onImageClick(currentIndex)}>
                <div className="absolute inset-0 bg-accent-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                    <Maximize2 className="text-accent-primary drop-shadow-lg" size={32} />
                </div>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={`/${images[currentIndex]}`}
                        alt={`${title} ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg-primary/90 p-2 rounded-full text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity z-30 border border-accent-primary/40 hover:bg-accent-primary hover:text-accent-on cursor-pointer"
                aria-label="Previous image"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg-primary/90 p-2 rounded-full text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity z-30 border border-accent-primary/40 hover:bg-accent-primary hover:text-accent-on cursor-pointer"
                aria-label="Next image"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-bg-primary/70 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-border-subtle/70">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentIndex
                                ? 'bg-accent-primary w-4'
                                : 'w-2 bg-text-secondary/50 hover:bg-text-primary'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

interface ProjectItemData {
    title: string;
    description: string;
    links: {
        github?: string;
        demo?: string | Record<string, string>;
    };
    images: string[];
    tech: string[];
}

const Projects = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [selectedProjectImages, setSelectedProjectImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);

    const isBento = theme === 'bento';
    const isEditorial = theme === 'editorial';

    const openModal = (images: string[], index: number) => {
        setSelectedProjectImages(images);
        setModalIndex(index);
    };

    const nextModalImage = () => {
        if (selectedProjectImages) {
            setModalIndex((prev) => (prev + 1) % selectedProjectImages.length);
        }
    };

    const prevModalImage = () => {
        if (selectedProjectImages) {
            setModalIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length);
        }
    };

    // Static data with images and links (index-aligned with t.projects.list)
    const projectsData: Array<{
        links: {
            github?: string;
            demo?: string | Record<string, string>;
        };
        images: string[];
        tech: string[];
    }> = [
        {
            // 0. Dashboard OPEX — E-Learning Script Tracker
            links: {},
            // TODO: agregar capturas en public/projects/opex-dashboard/ (ej: 'projects/opex-dashboard/1.png', 'projects/opex-dashboard/2.png')
            images: [],
            tech: ['React 19', 'Tailwind v4', 'Node.js', 'Express', 'Zoho APIs', 'Gemini AI', 'Recharts'],
        },
        {
            // 1. Sistema de Gestión de Inventario TI & Bóveda (AccessGuard TI)
            links: {},
            // TODO: agregar capturas en public/projects/accessguard/ (ej: 'projects/accessguard/1.png', 'projects/accessguard/2.png')
            images: [],
            tech: ['React 19', 'Tailwind v4', 'RBAC', 'AES-256 Vault', 'Zoho Catalyst', 'Zoho Flow'],
        },
        {
            // 2. Upper Room IBC — Conferencia Despierta 2026
            links: {},
            // TODO: agregar capturas en public/projects/upperroom-despierta/ (ej: 'projects/upperroom-despierta/1.png', 'projects/upperroom-despierta/2.png')
            images: [],
            tech: ['React 19', 'Vite', 'React Router v7', 'QR Code', 'Offline-First', 'Google Apps Script'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/OneTwentyOne-kvaldez',
                demo: 'https://ministeriodejovenesicc.netlify.app/registro',
            },
            images: [
                'projects/onetwentyone/1.png',
                'projects/onetwentyone/2.png',
                'projects/onetwentyone/3.png',
                'projects/onetwentyone/4.png',
            ],
            tech: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/Votos-ICC-kvaldez',
                demo: {
                    [t.projects.demoAdmin]: 'https://votosicc-kvaldez.netlify.app/admin',
                    [t.projects.demoVoter]: 'https://votosicc-kvaldez.netlify.app/voter',
                },
            },
            images: [
                'projects/votosicc/1.png',
                'projects/votosicc/2.png',
                'projects/votosicc/3.png',
                'projects/votosicc/4.png',
                'projects/votosicc/5.png',
                'projects/votosicc/6.png',
                'projects/votosicc/7.png',
            ],
            tech: ['React', 'Vanilla CSS', 'Google Apps Script', 'Google Sheets API', 'ExcelJS', 'Vite'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/BarberShop-2-kvaldez',
                demo: 'https://barbershop-2-kvaldez.netlify.app/',
            },
            images: [
                'projects/barber/1.png',
                'projects/barber/2.png',
                'projects/barber/3.png',
                'projects/barber/4.png',
            ],
            tech: ['React', 'TypeScript', 'Firebase', 'Framer Motion', 'EmailJS'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/invitacion-de-bodas-kvaldez',
                demo: 'https://invitacion-de-bodas-kvaldez.netlify.app/',
            },
            images: ['project_wedding.png'],
            tech: ['React', 'TypeScript', 'Supabase', 'React Router', 'Lucide'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/FacturaPro-kvaldez',
                demo: 'https://facturapro-kvaldez.netlify.app/',
            },
            images: [
                'projects/facturapro/2.png',
                'projects/facturapro/1.png',
                'projects/facturapro/3.png',
            ],
            tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MSSQL', 'Tailwind CSS'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/gestordefinanzas-kvaldez',
                demo: 'https://gestordefinanzas-kvaldez.netlify.app/',
            },
            images: [
                'projects/finance/1.png',
                'projects/finance/2.png',
                'projects/finance/3.png',
            ],
            tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'TypeScript'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/buscador-de-gifs1-kvaldez',
                demo: 'https://buscador-de-gifs1-kvaldez.netlify.app/',
            },
            images: ['project_gifs.png'],
            tech: ['React', 'TypeScript', 'Axios', 'Vitest', 'Giphy API'],
        },
    ];

    const projects: ProjectItemData[] = t.projects.list.map((proj, index) => ({
        ...proj,
        ...projectsData[index],
    }));

    const buttonShape = isBento ? 'rounded-xl' : isEditorial ? 'rounded-xs' : 'rounded';

    return (
        <Section id="projects">
            <div
                className={`flex items-center mb-12 w-full max-w-4xl mx-auto ${
                    isEditorial ? 'border-b-2 border-text-heading/15 pb-4' : ''
                }`}
            >
                <span className="text-accent-primary font-mono text-xl mr-2">05.</span>
                <h2
                    className={`font-bold text-text-heading whitespace-nowrap ${
                        isEditorial
                            ? 'text-4xl md:text-5xl font-serif tracking-tight'
                            : 'text-3xl md:text-4xl font-serif'
                    }`}
                >
                    {t.projects.title}
                </h2>
                {!isEditorial && <div className="h-[1px] bg-border-subtle w-full ml-4"></div>}
            </div>

            <ul className="space-y-12 md:space-y-24 max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <motion.li
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative grid md:grid-cols-12 gap-4 items-center ${
                            index % 2 !== 0 ? 'md:text-right' : ''
                        }`}
                    >
                        {/* Project Image Area */}
                        <div
                            className={`md:col-span-7 h-80 w-full relative group ${
                                index % 2 !== 0 ? 'md:order-2 md:col-start-6' : 'md:col-start-1'
                            }`}
                        >
                            <ProjectCarousel
                                images={project.images}
                                title={project.title}
                                tech={project.tech}
                                fallbackLabel={t.projects.previewFallback}
                                onImageClick={(idx) => openModal(project.images, idx)}
                            />
                        </div>

                        {/* Project Content Area */}
                        <div
                            className={`md:col-span-5 relative z-20 ${
                                index % 2 !== 0 ? 'md:order-1 md:col-start-1 text-left' : 'md:col-start-8 text-right'
                            }`}
                        >
                            <p className="text-accent-primary font-mono text-sm mb-2">{t.projects.featured}</p>
                            <h3 className="text-text-heading font-bold text-2xl mb-4">{project.title}</h3>

                            <div
                                className={`bg-bg-surface p-6 text-text-secondary text-sm leading-relaxed mb-4 z-20 relative border border-border-subtle transition-all duration-300 ${
                                    isBento
                                        ? 'rounded-2xl shadow-lg hover:border-accent-primary/50'
                                        : isEditorial
                                          ? 'rounded-xs shadow-sm'
                                          : 'rounded shadow-xl hover:shadow-2xl'
                                }`}
                            >
                                {project.description}
                            </div>

                            <ul
                                className={`flex flex-wrap gap-3 text-text-secondary font-mono text-xs mb-8 ${
                                    index % 2 !== 0 ? 'justify-start' : 'justify-end'
                                }`}
                            >
                                {project.tech.map((tech) => (
                                    <li
                                        key={tech}
                                        className={
                                            isBento
                                                ? 'whitespace-nowrap px-2.5 py-1 rounded-md bg-bg-surface border border-border-subtle text-text-primary'
                                                : 'whitespace-nowrap'
                                        }
                                    >
                                        {tech}
                                    </li>
                                ))}
                            </ul>

                            <div className={`flex flex-wrap gap-4 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 px-4 py-2 border border-accent-primary text-accent-primary ${buttonShape} hover:bg-accent-primary hover:text-accent-on transition-all font-mono text-sm`}
                                        aria-label="GitHub Repo"
                                    >
                                        <Github size={18} /> <span>GitHub</span>
                                    </a>
                                )}
                                {project.links.demo &&
                                    (typeof project.links.demo === 'string' ? (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-4 py-2 border border-accent-primary text-accent-primary ${buttonShape} hover:bg-accent-primary hover:text-accent-on transition-all font-mono text-sm`}
                                            aria-label="Live Demo"
                                        >
                                            <ExternalLink size={18} /> <span>Demo</span>
                                        </a>
                                    ) : (
                                        Object.entries(project.links.demo).map(([key, url]) => (
                                            <a
                                                key={key}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center gap-2 px-4 py-2 border border-accent-primary text-accent-primary ${buttonShape} hover:bg-accent-primary hover:text-accent-on transition-all font-mono text-sm`}
                                                aria-label={`Live Demo ${key}`}
                                            >
                                                <ExternalLink size={18} /> <span>{key}</span>
                                            </a>
                                        ))
                                    ))}
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>

            <ImageModal
                isOpen={!!selectedProjectImages}
                images={selectedProjectImages}
                currentIndex={modalIndex}
                onNext={nextModalImage}
                onPrev={prevModalImage}
                onClose={() => setSelectedProjectImages(null)}
            />
        </Section>
    );
};

export default Projects;
