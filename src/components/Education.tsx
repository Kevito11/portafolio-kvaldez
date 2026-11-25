import Section from './Section';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Education = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const educationList = t.education.items;

    const isEditorial = theme === 'editorial';

    return (
        <Section id="education" className="max-w-4xl mx-auto">
            <div
                className={`flex items-center mb-12 w-full ${
                    isEditorial ? 'border-b-2 border-text-heading/15 pb-4' : ''
                }`}
            >
                <span className="text-accent-primary font-mono text-xl mr-2">03.</span>
                <h2
                    className={`font-bold text-text-heading whitespace-nowrap ${
                        isEditorial
                            ? 'text-4xl md:text-5xl font-serif tracking-tight'
                            : 'text-3xl md:text-4xl font-serif'
                    }`}
                >
                    {t.education.title}
                </h2>
                {!isEditorial && <div className="h-[1px] bg-border-subtle w-full ml-4"></div>}
            </div>

            <div className="max-w-3xl mx-auto border-l-2 border-border-subtle pl-8 ml-4 md:ml-0 space-y-12">
                {educationList.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Timeline Dot */}
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-accent-primary bg-bg-primary transition-colors duration-300"></span>

                        <h3 className="text-2xl font-bold text-text-heading mb-1">{item.degree}</h3>
                        <span className="text-accent-primary font-mono text-sm mb-2 block">{item.institution}</span>
                        {item.date && <span className="text-text-secondary text-sm font-mono block">{item.date}</span>}
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Education;
