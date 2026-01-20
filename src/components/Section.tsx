import { motion } from 'framer-motion';

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
    return (
        <section id={id} className={`py-20 md:py-32 ${className}`}>
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
