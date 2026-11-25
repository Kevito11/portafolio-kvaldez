import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Layers,
    ArrowLeftRight,
    Mail,
    Phone,
    Linkedin,
    Copy,
    Check,
    Github,
    ExternalLink,
} from 'lucide-react';
import { CONTACT_INFO, PROFILE_PHOTOS, type ProjectItem } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

/* =========================================================
   Dual Profile Photo Switcher
   ========================================================= */
export const ProfilePhotoSwitcher = ({
    className = 'aspect-[6/7] w-full rounded-2xl',
    showBadge,
}: {
    className?: string;
    showBadge?: string;
}) => {
    const { t } = useLanguage();
    const [photoIndex, setPhotoIndex] = useState(0);

    const togglePhoto = () => {
        setPhotoIndex((prev) => (prev + 1) % PROFILE_PHOTOS.length);
    };

    return (
        <div
            onClick={togglePhoto}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePhoto();
                }
            }}
            aria-label={t.about.switchPhoto}
            className={`relative border border-border-subtle bg-bg-surface overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary ${className}`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.img
                    key={photoIndex}
                    src={PROFILE_PHOTOS[photoIndex]}
                    alt="Kevin Valdez"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </AnimatePresence>

            <div
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/15"
                onClick={(e) => e.stopPropagation()}
            >
                {PROFILE_PHOTOS.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setPhotoIndex(idx)}
                        aria-label={`${t.about.switchPhoto} ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            photoIndex === idx ? 'w-3.5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/80'
                        }`}
                    />
                ))}
                <button
                    type="button"
                    onClick={togglePhoto}
                    aria-label={t.about.switchPhoto}
                    title={t.about.switchPhoto}
                    className="text-white/85 hover:text-white transition-colors cursor-pointer pl-1 border-l border-white/20"
                >
                    <ArrowLeftRight size={12} />
                </button>
            </div>

            {showBadge && (
                <>
                    <div
                        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none"
                        aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-[11px]">
                            {showBadge}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

/* =========================================================
   Project Image Lightbox Modal
   ========================================================= */
export const ImageModal = ({
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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'ArrowRight') onNext();
            else if (e.key === 'ArrowLeft') onPrev();
            else if (e.key === 'Escape') onClose();
        };

        const handleWheel = (e: WheelEvent) => {
            if (!isOpen) return;
            if (e.ctrlKey) e.preventDefault();
            setZoomScale((prev) => {
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                return Math.min(Math.max(prev + delta, 1), 4);
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [isOpen, onNext, onPrev, onClose]);

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

    useEffect(() => {
        setZoomScale(1);
        setNaturalSize({ width: 0, height: 0 });
    }, [currentIndex]);

    const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

    useEffect(() => {
        if (containerRef.current && naturalSize.width > 0) {
            const { width: cW, height: cH } = containerRef.current.getBoundingClientRect();
            const imageRatio = naturalSize.width / naturalSize.height;
            const containerRatio = cW / cH;
            const vW1x = imageRatio > containerRatio ? cW : cH * imageRatio;
            const vH1x = imageRatio > containerRatio ? cW / imageRatio : cH;
            const xOffset = Math.max(0, vW1x * zoomScale - cW) / 2;
            const yOffset = Math.max(0, vH1x * zoomScale - cH) / 2;
            const margin = 100;
            setConstraints({
                left: -xOffset - margin,
                right: xOffset + margin,
                top: -yOffset - margin,
                bottom: yOffset + margin,
            });
        }
    }, [zoomScale, isOpen, currentIndex, naturalSize]);

    if (!isOpen || !images || images.length === 0) return null;

    const currentImage = images[currentIndex];
    const isZoomed = zoomScale > 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                <div className="absolute top-6 right-6 z-[110]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-zinc-100 hover:text-accent-primary transition-colors bg-zinc-900/90 rounded-full border border-zinc-700 cursor-pointer"
                        aria-label="Close preview"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="absolute bottom-6 right-6 flex items-center gap-2 z-[110] bg-zinc-900/90 p-2 rounded-full border border-zinc-700">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setZoomScale((p) => Math.max(p - 0.5, 1));
                        }}
                        disabled={zoomScale <= 1}
                        className={`p-1.5 rounded-full ${zoomScale <= 1 ? 'text-zinc-600' : 'text-zinc-100 hover:text-accent-primary cursor-pointer'}`}
                        aria-label="Zoom out"
                    >
                        <Maximize2 size={15} className="rotate-180" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setZoomScale((p) => (p > 1 ? 1 : 2));
                        }}
                        className="px-2 font-mono text-xs text-zinc-200 cursor-pointer"
                    >
                        {zoomScale.toFixed(1)}x
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setZoomScale((p) => Math.min(p + 0.5, 3));
                        }}
                        disabled={zoomScale >= 3}
                        className={`p-1.5 rounded-full ${zoomScale >= 3 ? 'text-zinc-600' : 'text-zinc-100 hover:text-accent-primary cursor-pointer'}`}
                        aria-label="Zoom in"
                    >
                        <Maximize2 size={15} />
                    </button>
                </div>

                {images.length > 1 && !isZoomed && (
                    <>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev();
                            }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700 hover:bg-accent-primary hover:text-accent-on z-[110] cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={26} />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700 hover:bg-accent-primary hover:text-accent-on z-[110] cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight size={26} />
                        </button>
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
                        animate={{ scale: zoomScale, opacity: 1, cursor: isZoomed ? 'grab' : 'default' }}
                        className="relative max-w-7xl max-h-[90vh] flex items-center justify-center rounded-xl shadow-2xl border border-zinc-700 bg-zinc-950"
                    >
                        <img
                            src={`/${currentImage}`}
                            onLoad={(e) =>
                                setNaturalSize({
                                    width: e.currentTarget.naturalWidth,
                                    height: e.currentTarget.naturalHeight,
                                })
                            }
                            alt="Project screenshot full view"
                            className="w-full h-full object-contain pointer-events-none select-none"
                        />
                    </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-200 font-mono text-xs bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-700">
                    {currentIndex + 1} / {images.length}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

/* =========================================================
   Reusable Project Carousel + Fallback Card
   ========================================================= */
export const ProjectCarousel = ({
    images,
    title,
    tech,
    fallbackLabel,
    onImageClick,
    compact = false,
}: {
    images: string[];
    title: string;
    tech: string[];
    fallbackLabel: string;
    onImageClick: (idx: number) => void;
    compact?: boolean;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className={`w-full h-full relative bg-bg-elevated flex flex-col justify-between text-left overflow-hidden ${compact ? 'p-4' : 'p-6'}`}>
                <div className="absolute inset-0 bg-architectural-grid opacity-70 pointer-events-none" aria-hidden="true" />
                <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-bg-surface border border-border-subtle text-accent-primary font-mono text-[10px] font-medium">
                        <Layers size={11} />
                        <span>{fallbackLabel}</span>
                    </span>
                </div>
                <div className="relative z-10 my-auto py-2">
                    <h4 className={`${compact ? 'text-sm' : 'text-lg'} font-heading font-bold text-text-heading leading-snug line-clamp-2`}>
                        {title}
                    </h4>
                </div>
                <div className="relative z-10 flex flex-wrap gap-1">
                    {tech.slice(0, compact ? 2 : 4).map((item) => (
                        <span
                            key={item}
                            className="px-2 py-0.5 text-[10px] font-mono rounded bg-bg-surface border border-border-subtle text-text-secondary"
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
                className="w-full h-full overflow-hidden relative group cursor-zoom-in bg-bg-elevated"
                onClick={() => onImageClick(0)}
            >
                <img
                    src={`/${images[0]}`}
                    alt={title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>
        );
    }

    return (
        <div className="w-full h-full overflow-hidden relative group bg-bg-elevated">
            <div className="w-full h-full cursor-zoom-in relative" onClick={() => onImageClick(currentIndex)}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={`/${images[currentIndex]}`}
                        alt={`${title} ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </AnimatePresence>
            </div>

            {!compact && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((p) => (p - 1 + images.length) % images.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-accent-primary cursor-pointer"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex((p) => (p + 1) % images.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-accent-primary cursor-pointer"
                        aria-label="Next image"
                    >
                        <ChevronRight size={16} />
                    </button>
                </>
            )}

            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-20 bg-black/55 px-2 py-1 rounded-full">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === currentIndex ? 'bg-white w-3.5' : 'w-1.5 bg-white/45'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

/* =========================================================
   Reusable Project Action Buttons
   ========================================================= */
export const ProjectActionLinks = ({ links }: { links: ProjectItem['links'] }) => {
    if (!links.github && !links.demo) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {links.demo &&
                (typeof links.demo === 'string' ? (
                    <a
                        href={links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary text-accent-on hover:bg-accent-hover transition-colors font-mono text-xs font-medium"
                    >
                        <ExternalLink size={13} />
                        <span>Demo</span>
                    </a>
                ) : (
                    Object.entries(links.demo).map(([key, url]) => (
                        <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-primary text-accent-on hover:bg-accent-hover transition-colors font-mono text-xs font-medium"
                        >
                            <ExternalLink size={13} />
                            <span>{key}</span>
                        </a>
                    ))
                ))}

            {links.github && (
                <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border-subtle text-text-heading hover:border-border-strong transition-colors font-mono text-xs font-medium"
                >
                    <Github size={13} />
                    <span>GitHub</span>
                </a>
            )}
        </div>
    );
};

/* =========================================================
   Reusable Contact Modal (with Copy Email)
   ========================================================= */
export const ContactModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const { t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_INFO.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Ignore clipboard errors
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-surface p-6 sm:p-7 rounded-2xl shadow-2xl border border-border-subtle z-[95] w-[92%] max-w-md text-left"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-heading font-bold text-text-heading">
                                {t.contact.modal.title}
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-heading hover:bg-bg-elevated cursor-pointer"
                                aria-label={t.contact.modal.close}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3 p-3.5 bg-bg-elevated/70 rounded-xl border border-border-subtle">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="p-2.5 bg-bg-surface rounded-lg text-accent-primary border border-border-subtle shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-[11px] text-text-secondary font-mono">
                                            {t.contact.modal.email}
                                        </span>
                                        <a
                                            href={`mailto:${CONTACT_INFO.email}`}
                                            className="block text-sm text-text-heading font-semibold hover:text-accent-primary truncate"
                                        >
                                            {CONTACT_INFO.email}
                                        </a>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
                                        copied
                                            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500'
                                            : 'border-border-subtle bg-bg-surface text-text-secondary hover:text-text-heading'
                                    }`}
                                >
                                    {copied ? <Check size={13} /> : <Copy size={13} />}
                                    <span>{copied ? t.contact.modal.copied : t.contact.modal.copy}</span>
                                </button>
                            </div>

                            <a
                                href={CONTACT_INFO.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5 p-3.5 bg-bg-elevated/70 rounded-xl border border-border-subtle hover:border-border-strong transition-colors group"
                            >
                                <div className="p-2.5 bg-bg-surface rounded-lg text-accent-primary border border-border-subtle shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <span className="block text-[11px] text-text-secondary font-mono">
                                        {t.contact.modal.phone}
                                    </span>
                                    <span className="text-sm text-text-heading font-semibold group-hover:text-accent-primary">
                                        {CONTACT_INFO.whatsappDisplay}
                                    </span>
                                </div>
                            </a>

                            <a
                                href={CONTACT_INFO.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5 p-3.5 bg-bg-elevated/70 rounded-xl border border-border-subtle hover:border-border-strong transition-colors group"
                            >
                                <div className="p-2.5 bg-bg-surface rounded-lg text-accent-primary border border-border-subtle shrink-0">
                                    <Linkedin size={18} />
                                </div>
                                <div>
                                    <span className="block text-[11px] text-text-secondary font-mono">
                                        {t.contact.modal.linkedin}
                                    </span>
                                    <span className="text-sm text-text-heading font-semibold group-hover:text-accent-primary">
                                        {CONTACT_INFO.linkedinDisplay}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
