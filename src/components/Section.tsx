import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export const SectionHeader = ({
    eyebrow,
    title,
    subtitle,
    align = 'left',
}: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
}) => (
    <div className={`mb-12 md:mb-14 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
        <span className="inline-block font-mono uppercase text-xs tracking-widest text-accent-primary font-medium mb-3">
            {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-heading font-bold text-text-heading tracking-tight leading-tight">
            {title}
        </h2>
        {subtitle && (
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
                {subtitle}
            </p>
        )}
    </div>
);

const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
    return (
        <section id={id} className={`py-20 md:py-28 transition-colors duration-300 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
