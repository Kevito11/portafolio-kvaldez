import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <Section id="contact" className="text-center max-w-2xl mx-auto relative">
            <p className="text-gold-500 font-mono mb-4">{t.contact.subtitle}</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-6">{t.contact.title}</h2>
            <p className="text-slate-lighter text-lg leading-relaxed mb-12">
                {t.contact.text}
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="inline-block px-8 py-4 border-2 border-gold-500 text-gold-500 font-sans rounded hover:bg-gold-500/10 transition-colors text-lg"
            >
                {t.contact.cta}
            </motion.button>

            <div className="mt-32 mb-8">
                <p className="text-slate-lighter text-xs font-mono">
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
                            className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm z-50 transition-opacity"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-navy-800 p-8 rounded-lg shadow-2xl border border-gold-500 z-50 w-[90%] max-w-md"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-serif font-bold text-slate-100">{t.contact.modal.title}</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-lighter hover:text-gold-500 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-navy-900 rounded border border-navy-700 hover:border-gold-500 transition-colors group">
                                    <div className="p-3 bg-navy-800 rounded-full text-gold-500 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-lighter mb-1 font-mono">{t.contact.modal.email}</span>
                                        <a href="mailto:kevito.valdez@gmail.com" className="text-slate-100 font-semibold hover:text-gold-500 transition-colors break-all">
                                            kevito.valdez@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-navy-900 rounded border border-navy-700 hover:border-gold-500 transition-colors group">
                                    <div className="p-3 bg-navy-800 rounded-full text-gold-500 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-lighter mb-1 font-mono">{t.contact.modal.phone}</span>
                                        <a href="tel:+18094906319" className="text-slate-100 font-semibold hover:text-gold-500 transition-colors">
                                            +1 (809) 490-6319
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-sm text-slate-lighter hover:text-gold-500 underline decoration-1 underline-offset-4"
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
