import Section from './Section';
import profileNew from '../assets/profile-new.jpg';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    const traits = [
        t.about.traits.analytical,
        t.about.traits.creative,
        t.about.traits.proactive
    ];

    // Helper to render text with <gold> tags as spans
    const renderText = (text: string) => {
        const parts = text.split(/<gold>(.*?)<\/gold>/g);
        return parts.map((part, index) =>
            index % 2 === 1 ? <span key={index} className="text-gold-500">{part}</span> : part
        );
    };

    return (
        <Section id="about" className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8 w-full">
                <span className="text-gold-500 font-mono text-xl mr-2">01.</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 whitespace-nowrap">{t.about.title}</h2>
                <div className="h-[1px] bg-navy-700 w-full ml-4"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <p className="text-slate-lighter text-lg leading-relaxed mb-6">
                        {renderText(t.about.p1)}
                    </p>
                    <p className="text-slate-lighter text-lg leading-relaxed mb-8">
                        {renderText(t.about.p2)}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        {traits.map((trait, index) => (
                            <div key={index} className="border border-navy-700 p-4 rounded hover:border-gold-500/50 transition-colors group">
                                <h4 className="text-gold-500 font-bold mb-2 group-hover:text-gold-400">{trait.title}</h4>
                                <p className="text-slate-400 text-sm">{trait.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-1 flex justify-center md:block relative h-[350px] sm:h-[400px]">
                    <div className="relative w-full max-w-xs mx-auto md:mx-0 h-full group">
                        <div className="absolute inset-0 transition-all duration-300 z-20 translate-x-0 translate-y-0 opacity-100">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-gold-500 rounded translate-x-3 translate-y-3"></div>
                                <div className="absolute inset-0 bg-navy-800 rounded border-2 border-gold-500 overflow-hidden">
                                    <img
                                        src={profileNew}
                                        alt="Kevin Valdez"
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
