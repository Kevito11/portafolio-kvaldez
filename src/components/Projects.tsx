import Section from './Section';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
    const { t } = useLanguage();

    // Static data with images and links
    const projectsData = [
        {
            links: { github: '#', external: 'https://invitacion-de-bodas-kvaldez.netlify.app/' },
            image: 'project_wedding.png',
            tech: ['React', 'Tailwind', 'Framer Motion']
        },
        {
            links: { github: '#', external: 'https://gestordefinanzas-kvaldez.netlify.app/' },
            image: 'project_finance.png',
            tech: ['React', 'CSS Modules', 'Chart.js']
        },
        {
            links: { github: '#', external: 'https://buscador-de-gifs1-kvaldez.netlify.app/' },
            image: 'project_gifs.png',
            tech: ['React', 'Giphy API', 'CSS']
        },
    ];

    const projects = t.projects.list.map((proj, index) => ({
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

            <ul className="space-y-24 max-w-5xl mx-auto">
                {projects.map((project, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative grid md:grid-cols-12 gap-4 items-center ${index % 2 !== 0 ? 'md:text-right' : ''}`}
                    >
                        {/* Project Image Area */}
                        <div className={`md:col-span-7 h-80 w-full relative group ${index % 2 !== 0 ? 'md:order-2 md:col-start-6' : 'md:col-start-1'}`}>
                            <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-transparent transition-all duration-300 z-10 rounded"></div>
                            {/* Real Image */}
                            <div className="w-full h-full rounded shadow-xl border border-navy-700 overflow-hidden">
                                <img
                                    src={`/${project.image}`}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Project Content Area */}
                        <div className={`md:col-span-5 relative z-20 ${index % 2 !== 0 ? 'md:order-1 md:col-start-1 text-left' : 'md:col-start-8 text-right'}`}>
                            <p className="text-gold-500 font-mono text-sm mb-2">{t.projects.featured}</p>
                            <h3 className="text-slate-100 font-bold text-2xl mb-4 hover:text-gold-500 transition-colors">
                                <a href={project.links.external} target="_blank" rel="noopener noreferrer">{project.title}</a>
                            </h3>

                            <div className="bg-navy-800 p-6 rounded shadow-xl text-slate-lighter text-sm leading-relaxed mb-4 z-20 relative hover:shadow-2xl transition-all">
                                {project.description}
                            </div>

                            <ul className={`flex flex-wrap gap-4 text-slate-400 font-mono text-xs mb-8 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                {project.tech.map((tech) => (
                                    <li key={tech} className="whitespace-nowrap">{tech}</li>
                                ))}
                            </ul>
                            <div className={`flex gap-4 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                                <a href={project.links.github} className="text-slate-lighter hover:text-gold-500 transition-colors"><Github size={20} /></a>
                                <a href={project.links.external} className="text-slate-lighter hover:text-gold-500 transition-colors"><ExternalLink size={20} /></a>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>

            <div className="mt-20 text-center">
                <a href="#" className="inline-block px-8 py-4 border border-gold-500 text-gold-500 rounded font-mono hover:bg-gold-500/10 transition-colors">
                    Ver Archivo Completo
                </a>
            </div>
        </Section>
    );
};

export default Projects;
