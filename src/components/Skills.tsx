import Section from './Section';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { t } = useLanguage();

    const skills = [
        { name: 'React JS', category: 'Frontend' },
        { name: 'TypeScript', category: 'Frontend' },
        { name: 'Flutter', category: 'Mobile' },
        { name: 'C#', category: 'Backend' },
        { name: 'SQL Server', category: 'Base de Datos' }, // 'Database' in English
        { name: 'SAP Business One', category: 'Enterprise' },
    ];

    return (
        <Section id="skills" className="max-w-4xl mx-auto">
            <div className="flex items-center mb-12 w-full">
                <span className="text-gold-500 font-mono text-xl mr-2">03.</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 whitespace-nowrap">{t.skills.title}</h2>
                <div className="h-[1px] bg-navy-700 w-full ml-4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-navy-900 p-6 rounded shadow-lg border-b-2 border-transparent hover:border-gold-500 transition-all duration-300"
                    >
                        <span className="block text-xs text-gold-500 font-mono mb-2">{skill.category}</span>
                        <h3 className="text-lg font-semibold text-slate-100">{skill.name}</h3>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Skills;
