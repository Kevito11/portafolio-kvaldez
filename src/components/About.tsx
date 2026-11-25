import Section from './Section';
import profileNew from '../assets/profile-new.jpg';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { t } = useLanguage();
    const { theme } = useTheme();

    const isBento = theme === 'bento';
    const isEditorial = theme === 'editorial';

    const traits = [
        t.about.traits.analytical,
        t.about.traits.creative,
        t.about.traits.proactive,
    ];

    // Helper to render text with <gold> tags as highlighted spans
    const renderText = (text: string) => {
        const parts = text.split(/<gold>(.*?)<\/gold>/g);
        return parts.map((part, index) =>
            index % 2 === 1 ? (
                <span key={index} className="text-accent-primary font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <Section id="about" className="max-w-4xl mx-auto">
            <div
                className={`flex items-center mb-10 w-full ${
                    isEditorial ? 'border-b-2 border-text-heading/15 pb-4' : ''
                }`}
            >
                <span className="text-accent-primary font-mono text-xl mr-2">01.</span>
                <h2
                    className={`font-bold text-text-heading whitespace-nowrap ${
                        isEditorial
                            ? 'text-4xl md:text-5xl font-serif tracking-tight'
                            : 'text-3xl md:text-4xl font-serif'
                    }`}
                >
                    {t.about.title}
                </h2>
                {!isEditorial && <div className="h-[1px] bg-border-subtle w-full ml-4"></div>}
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2">
                    <p className="text-text-secondary text-lg leading-relaxed mb-6">
                        {renderText(t.about.p1)}
                    </p>
                    <p className="text-text-secondary text-lg leading-relaxed mb-8">
                        {renderText(t.about.p2)}
                    </p>

                    <div className={`grid grid-cols-1 sm:grid-cols-3 ${isBento ? 'gap-3 mt-6' : 'gap-4 mt-8'}`}>
                        {traits.map((trait, index) => (
                            <div
                                key={index}
                                className={
                                    isBento
                                        ? 'bg-bg-surface border border-border-subtle p-4 rounded-2xl hover:border-accent-primary/70 hover:bg-bg-elevated hover:shadow-[0_0_20px_rgba(34,211,238,0.12)] transition-all duration-300 group'
                                        : isEditorial
                                          ? 'bg-bg-surface border border-border-subtle p-4 rounded-xs hover:border-accent-primary transition-colors group shadow-xs'
                                          : 'border border-border-subtle bg-bg-surface/40 p-4 rounded-lg hover:border-accent-primary/60 transition-colors group'
                                }
                            >
                                <h4 className="text-accent-primary font-bold mb-1.5 group-hover:text-accent-secondary transition-colors">
                                    {trait.title}
                                </h4>
                                <p className="text-text-secondary text-sm leading-relaxed">{trait.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-1 flex justify-center md:block relative h-[350px] sm:h-[400px]">
                    <div className="relative w-full max-w-xs mx-auto md:mx-0 h-full group">
                        <div className="absolute inset-0 transition-all duration-300 z-20 translate-x-0 translate-y-0 opacity-100">
                            <div className="relative w-full h-full">
                                {!isBento && (
                                    <div
                                        className={`absolute inset-0 translate-x-3 translate-y-3 transition-colors duration-300 ${
                                            isEditorial
                                                ? 'border-2 border-accent-primary bg-accent-primary/10 rounded-xs'
                                                : 'bg-accent-primary rounded'
                                        }`}
                                    ></div>
                                )}
                                <div
                                    className={`absolute inset-0 bg-bg-surface overflow-hidden transition-all duration-300 ${
                                        isBento
                                            ? 'rounded-2xl border border-border-subtle group-hover:border-accent-primary/70 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.15)]'
                                            : isEditorial
                                              ? 'rounded-xs border border-border-subtle shadow-md'
                                              : 'rounded border-2 border-accent-primary'
                                    }`}
                                >
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
