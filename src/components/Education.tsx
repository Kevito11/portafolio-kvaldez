import Section from './Section';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Education = () => {
    const { t } = useLanguage();
    const educationList = t.education.items;

    return (
        <Section id="education" className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12 w-full">
                <span className="text-gold-500 font-mono text-xl mr-2">02.</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 whitespace-nowrap">{t.education.title}</h2>
                <div className="h-[1px] bg-navy-700 w-full ml-4"></div>
            </div>

            <div className="max-w-3xl mx-auto border-l-2 border-navy-700 pl-8 ml-4 md:ml-0 space-y-12">
                {educationList.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        {/* Timeline Dot */}
                        <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-2 border-gold-500 bg-navy-900"></span>

                        <h3 className="text-2xl font-bold text-slate-100 mb-1">{item.degree}</h3>
                        <span className="text-gold-500 font-mono text-sm mb-2 block">{item.institution}</span>
                        <span className="text-slate-lighter text-sm font-mono block">{item.date}</span>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Education;
