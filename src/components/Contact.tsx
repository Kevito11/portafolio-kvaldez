import { useState } from 'react';
import Section from './Section';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Linkedin, Copy, Check, ArrowUp, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EMAIL = 'kevito.valdez@gmail.com';

const Contact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const { t } = useLanguage();

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback ignored if clipboard permission denied
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Section id="contact" className="pb-12 md:pb-16">
                {/* Closing CTA Card */}
                <div className="relative rounded-3xl border border-border-subtle bg-bg-surface p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-xs">
                    <div
                        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[380px] h-[160px] rounded-full bg-accent-primary/10 blur-[80px]"
                        aria-hidden="true"
                    />

                    <div className="relative z-10 max-w-xl mx-auto">
                        <span className="inline-block font-mono uppercase text-xs tracking-widest text-accent-primary font-medium mb-3">
                            {t.contact.eyebrow}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text-heading tracking-tight mb-4">
                            {t.contact.title}
                        </h2>
                        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-9">
                            {t.contact.text}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3.5">
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-accent-on font-medium text-sm sm:text-base hover:bg-accent-hover transition-colors shadow-xs cursor-pointer"
                            >
                                <Mail size={16} />
                                <span>{t.contact.cta}</span>
                            </motion.button>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-elevated border border-border-subtle text-text-heading font-medium text-sm sm:text-base hover:border-border-strong transition-colors"
                            >
                                <FileText size={16} className="text-text-secondary" />
                                <span>{t.contact.ctaResume}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Minimal Single-Row Footer */}
            <footer className="border-t border-border-subtle py-8">
                <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-mono text-text-secondary text-center sm:text-left">
                        {t.contact.footer}
                    </p>

                    <div className="flex items-center gap-5">
                        <a
                            href="#about"
                            className="text-xs font-medium text-text-secondary hover:text-text-heading transition-colors"
                        >
                            {t.nav.about}
                        </a>
                        <a
                            href="#experience"
                            className="text-xs font-medium text-text-secondary hover:text-text-heading transition-colors"
                        >
                            {t.nav.experience}
                        </a>
                        <a
                            href="#projects"
                            className="text-xs font-medium text-text-secondary hover:text-text-heading transition-colors"
                        >
                            {t.nav.projects}
                        </a>
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle bg-bg-surface text-xs font-mono text-text-secondary hover:text-text-heading hover:border-border-strong transition-colors cursor-pointer"
                            aria-label={t.contact.backToTop}
                        >
                            <ArrowUp size={13} />
                            <span className="hidden sm:inline">{t.contact.backToTop}</span>
                        </button>
                    </div>
                </div>
            </footer>

            {/* Contact Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 12 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-surface p-6 sm:p-7 rounded-2xl shadow-2xl border border-border-subtle z-50 w-[92%] max-w-md text-left"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-heading font-bold text-text-heading">
                                    {t.contact.modal.title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-heading hover:bg-bg-elevated transition-colors cursor-pointer"
                                    aria-label={t.contact.modal.close}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {/* Email with Copy Button */}
                                <div className="flex items-center justify-between gap-3 p-3.5 bg-bg-elevated/70 rounded-xl border border-border-subtle hover:border-border-strong transition-colors">
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="p-2.5 bg-bg-surface rounded-lg text-accent-primary border border-border-subtle shrink-0">
                                            <Mail size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[11px] text-text-secondary font-mono">
                                                {t.contact.modal.email}
                                            </span>
                                            <a
                                                href={`mailto:${EMAIL}`}
                                                className="block text-sm text-text-heading font-semibold hover:text-accent-primary transition-colors truncate"
                                            >
                                                {EMAIL}
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCopyEmail}
                                        className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono text-xs transition-colors cursor-pointer ${
                                            copied
                                                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500'
                                                : 'border-border-subtle bg-bg-surface text-text-secondary hover:text-text-heading hover:border-border-strong'
                                        }`}
                                    >
                                        {copied ? <Check size={13} /> : <Copy size={13} />}
                                        <span>{copied ? t.contact.modal.copied : t.contact.modal.copy}</span>
                                    </button>
                                </div>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/18094906319"
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
                                        <span className="text-sm text-text-heading font-semibold group-hover:text-accent-primary transition-colors">
                                            +1 (809) 490-6319
                                        </span>
                                    </div>
                                </a>

                                {/* LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/kevin-l-valdez-garc%C3%ADa-4225a8165/"
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
                                        <span className="text-sm text-text-heading font-semibold group-hover:text-accent-primary transition-colors">
                                            Kevin Valdez
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Contact;
