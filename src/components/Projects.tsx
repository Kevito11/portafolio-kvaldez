import { useState, useEffect } from 'react';
import Section from './Section';
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ImageModal = ({ isOpen, images, currentIndex, onNext, onPrev, onClose }: { 
    isOpen: boolean, 
    images: string[] | null, 
    currentIndex: number,
    onNext: () => void,
    onPrev: () => void,
    onClose: () => void 
}) => {
    const [isZoomed, setIsZoomed] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setIsZoomed(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !images) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-navy-950/95 backdrop-blur-md"
                onClick={onClose}
            >
                <div className="absolute top-6 right-6 flex gap-4 z-[110]">
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                        className={`p-2 rounded-full transition-colors ${isZoomed ? 'bg-gold-500 text-navy-950' : 'text-slate-100 hover:text-gold-500'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Zoom"
                    >
                        <Maximize2 size={24} />
                    </motion.button>
                    <motion.button
                        onClick={onClose}
                        className="p-2 text-slate-100 hover:text-gold-500 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X size={32} />
                    </motion.button>
                </div>

                {/* Navigation Arrows inside Modal */}
                {images.length > 1 && !isZoomed && (
                    <>
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-900/50 text-gold-500 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-900 z-[110] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft size={32} />
                        </motion.button>
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-900/50 text-gold-500 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-900 z-[110] transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight size={32} />
                        </motion.button>
                    </>
                )}
                
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                        scale: isZoomed ? 1.5 : 1, 
                        opacity: 1,
                        cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                    }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`relative max-w-7xl max-h-[90vh] flex items-center justify-center rounded-lg ${isZoomed ? 'overflow-auto' : 'overflow-hidden'} shadow-2xl border border-navy-700 bg-navy-900`}
                    onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                >
                    <img
                        src={`/${currentImage}`}
                        alt="Project screenshot full view"
                        className={`w-full h-full object-contain pointer-events-none select-none shadow-2xl transition-transform duration-300`}
                    />
                </motion.div>

                {/* Image Counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 font-mono text-sm bg-navy-900/50 px-4 py-2 rounded-full border border-navy-700">
                    {currentIndex + 1} / {images.length}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const ProjectCarousel = ({ images, title, onImageClick }: { images: string[], title: string, onImageClick: (idx: number) => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    if (!images || images.length === 0) return null;

    if (images.length === 1) {
        return (
            <div 
                className="w-full h-full rounded shadow-xl border border-navy-700 overflow-hidden relative group cursor-zoom-in bg-navy-900"
                onClick={() => onImageClick(0)}
            >
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                    <Maximize2 className="text-gold-500 drop-shadow-lg" size={32} />
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
        <div className="w-full h-full rounded shadow-xl border border-navy-700 overflow-hidden relative group bg-navy-900">
            <div 
                className="w-full h-full cursor-zoom-in relative"
                onClick={() => onImageClick(currentIndex)}
            >
                <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 pointer-events-none flex items-center justify-center">
                    <Maximize2 className="text-gold-500 drop-shadow-lg" size={32} />
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
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy-900/80 p-2 rounded-full text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity z-30 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-900"
                aria-label="Previous image"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy-900/80 p-2 rounded-full text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity z-30 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-900"
                aria-label="Next image"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setCurrentIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-gold-500 w-4' : 'bg-slate-400/50 hover:bg-slate-300'}`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    const { t } = useLanguage();
    const [selectedProjectImages, setSelectedProjectImages] = useState<string[] | null>(null);
    const [modalIndex, setModalIndex] = useState(0);

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

    // Static data with images and links
    const projectsData = [
        {
            links: {
                github: 'https://github.com/Kevito11/BarberShop-2-kvaldez',
                demo: 'https://barbershop-2-kvaldez.netlify.app/'
            },
            images: [
                'projects/barber/1.png',
                'projects/barber/2.png',
                'projects/barber/3.png',
                'projects/barber/4.png'
            ],
            tech: ['React', 'TypeScript', 'Firebase', 'Framer Motion', 'EmailJS']
        },
        {
            links: {
                github: 'https://github.com/Kevito11/invitacion-de-bodas-kvaldez',
                demo: 'https://invitacion-de-bodas-kvaldez.netlify.app/'
            },
            images: ['project_wedding.png'],
            tech: ['React', 'TypeScript', 'Supabase', 'React Router', 'Lucide']
        },
        {
            links: {
                github: 'https://github.com/Kevito11/FacturaPro-kvaldez',
                demo: '#'
            },
            images: [
                'projects/facturapro/2.png',
                'projects/facturapro/1.png',
                'projects/facturapro/3.png'
            ],
            tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MSSQL', 'Tailwind CSS']
        },
        {
            links: {
                github: 'https://github.com/Kevito11/gestordefinanzas-kvaldez',
                demo: 'https://gestordefinanzas-kvaldez.netlify.app/'
            },
            images: [
                'projects/finance/1.png',
                'projects/finance/2.png',
                'projects/finance/3.png'
            ],
            tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'TypeScript']
        },
        {
            links: {
                github: 'https://github.com/Kevito11/buscador-de-gifs1-kvaldez',
                demo: 'https://buscador-de-gifs1-kvaldez.netlify.app/'
            },
            images: ['project_gifs.png'],
            tech: ['React', 'TypeScript', 'Axios', 'Vitest', 'Giphy API']
        },
    ];

    const projects = t.projects.list.map((proj: any, index: number) => ({
        ...proj,
        ...projectsData[index]
    }));

    return (
        <Section id="projects">
            <div className="flex items-center mb-12 w-full max-w-4xl mx-auto">
                <span className="text-gold-500 font-mono text-xl mr-2">04.</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 whitespace-nowrap">{t.projects.title}</h2>
                <div className="h-[1px] bg-navy-700 w-full ml-4"></div>
            </div>

            <ul className="space-y-12 md:space-y-24 max-w-5xl mx-auto">
                {projects.map((project: any, index: number) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative grid md:grid-cols-12 gap-4 items-center ${index % 2 !== 0 ? 'md:text-right' : ''}`}
                    >
                        {/* Project Image Area */}
                        <div className={`md:col-span-7 h-80 w-full relative group ${index % 2 !== 0 ? 'md:order-2 md:col-start-6' : 'md:col-start-1'}`}>
                            {/* Overlay is now inside Carousel for better interaction */}
                            <ProjectCarousel 
                                images={project.images} 
                                title={project.title} 
                                onImageClick={(idx) => openModal(project.images, idx)}
                            />
                        </div>

                        {/* Project Content Area */}
                        <div className={`md:col-span-5 relative z-20 ${index % 2 !== 0 ? 'md:order-1 md:col-start-1 text-left' : 'md:col-start-8 text-right'}`}>
                            <p className="text-gold-500 font-mono text-sm mb-2">{t.projects.featured}</p>
                            <h3 className="text-slate-100 font-bold text-2xl mb-4">
                                {project.title}
                            </h3>

                            <div className="bg-navy-800 p-6 rounded shadow-xl text-slate-lighter text-sm leading-relaxed mb-4 z-20 relative hover:shadow-2xl transition-all">
                                {project.description}
                            </div>

                            <ul className={`flex flex-wrap gap-4 text-slate-400 font-mono text-xs mb-8 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                {project.tech.map((tech: string) => (
                                    <li key={tech} className="whitespace-nowrap">{tech}</li>
                                ))}
                            </ul>
                            <div className={`flex gap-4 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-500 rounded hover:bg-gold-500 hover:text-navy-900 transition-all font-mono text-sm"
                                    aria-label="GitHub Repo"
                                >
                                    <Github size={18} /> <span>GitHub</span>
                                </a>
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border border-gold-500 text-gold-500 rounded hover:bg-gold-500 hover:text-navy-900 transition-all font-mono text-sm"
                                        aria-label="Live Demo"
                                    >
                                        <ExternalLink size={18} /> <span>Demo</span>
                                    </a>
                                )}
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
