import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();
    const { theme } = useTheme();

    const isBento = theme === 'bento';
    const isEditorial = theme === 'editorial';

    return (
        <Section id="contact" className="text-center max-w-2xl mx-auto relative">
            <p className="text-accent-primary font-mono mb-4">{t.contact.subtitle}</p>
            <h2
                className={`font-serif font-bold text-text-heading mb-6 ${
                    isEditorial ? 'text-5xl md:text-6xl tracking-tight' : 'text-4xl md:text-5xl'
                }`}
            >
                {t.contact.title}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-12">
                {t.contact.text}
            </p>

            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsModalOpen(true)}
                className={
                    isEditorial
                        ? 'inline-block px-9 py-4 bg-accent-primary text-accent-on border border-accent-primary font-mono text-sm uppercase tracking-wider hover:bg-transparent hover:text-accent-primary transition-colors cursor-pointer'
                        : isBento
                          ? 'inline-block px-8 py-4 border border-accent-primary/70 bg-bg-surface text-accent-primary font-mono rounded-xl hover:bg-accent-primary hover:text-accent-on hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] transition-all text-base cursor-pointer'
                          : 'inline-block px-8 py-4 border-2 border-accent-primary text-accent-primary font-sans rounded hover:bg-accent-primary/10 transition-colors text-lg cursor-pointer'
                }
            >
                {t.contact.cta}
            </motion.button>

            <div className="mt-32 mb-8">
                <p className="text-text-secondary text-xs font-mono">
                    {t.contact.footer}
                </p>
            </div>

            {/* Modal Backdrop & Content */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-surface p-8 shadow-2xl border border-accent-primary z-50 w-[90%] max-w-md text-left ${
                                isBento ? 'rounded-2xl' : isEditorial ? 'rounded-xs' : 'rounded-lg'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-serif font-bold text-text-heading">
                                    {t.contact.modal.title}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-text-secondary hover:text-accent-primary transition-colors cursor-pointer"
                                    aria-label={t.contact.modal.close}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-bg-elevated rounded-lg border border-border-subtle hover:border-accent-primary transition-colors group">
                                    <div className="p-3 bg-bg-surface rounded-full text-accent-primary border border-border-subtle group-hover:scale-110 transition-transform">
                                        <Mail size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block text-xs text-text-secondary mb-1 font-mono">
                                            {t.contact.modal.email}
                                        </span>
                                        <a
                                            href="mailto:kevito.valdez@gmail.com"
                                            className="text-text-heading font-semibold hover:text-accent-primary transition-colors break-all"
                                        >
                                            kevito.valdez@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-bg-elevated rounded-lg border border-border-subtle hover:border-accent-primary transition-colors group">
                                    <div className="p-3 bg-bg-surface rounded-full text-accent-primary border border-border-subtle group-hover:scale-110 transition-transform">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-text-secondary mb-1 font-mono">
                                            {t.contact.modal.phone}
                                        </span>
                                        <a
                                            href="https://wa.me/18094906319"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-text-heading font-semibold hover:text-accent-primary transition-colors"
                                        >
                                            +1 (809) 490-6319 (WhatsApp)
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-bg-elevated rounded-lg border border-border-subtle hover:border-accent-primary transition-colors group">
                                    <div className="p-3 bg-bg-surface rounded-full text-accent-primary border border-border-subtle group-hover:scale-110 transition-transform">
                                        <Linkedin size={22} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-text-secondary mb-1 font-mono">
                                            {t.contact.modal.linkedin}
                                        </span>
                                        <a
                                            href="https://www.linkedin.com/in/kevin-l-valdez-garc%C3%ADa-4225a8165/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-text-heading font-semibold hover:text-accent-primary transition-colors"
                                        >
                                            Kevin Valdez
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-sm text-text-secondary hover:text-accent-primary underline decoration-1 underline-offset-4 cursor-pointer"
                                >
                                    {t.contact.modal.close}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Contact;
