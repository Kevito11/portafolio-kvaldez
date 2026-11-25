import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
    const { theme } = useTheme();

    const spacingClass =
        theme === 'editorial'
            ? 'py-16 md:py-28'
            : theme === 'bento'
              ? 'py-12 md:py-20'
              : 'py-12 md:py-24';

    return (
        <section id={id} className={`${spacingClass} transition-colors duration-300 ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="container mx-auto px-6 md:px-12 max-w-6xl"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
