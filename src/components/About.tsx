import { useState } from 'react';
import Section from './Section';
import profileOriginal from '../assets/profile-original.jpg';
import profileNew from '../assets/profile-new.jpg';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    const [showLegacyPhoto, setShowLegacyPhoto] = useState(false);

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

            <div className="grid md:grid-cols-3 gap-12">
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
                    {/* Container for the deck */}
                    <div
                        className="relative w-full max-w-xs mx-auto md:mx-0 h-full cursor-pointer group"
                        onClick={() => setShowLegacyPhoto(!showLegacyPhoto)}
                    >

                        {/* New Photo (Active or Back) */}
                        <div
                            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                ${!showLegacyPhoto
                                    ? 'z-20 scale-100 rotate-0 translate-x-0 translate-y-0 opacity-100'
                                    : 'z-10 scale-95 rotate-6 translate-x-6 translate-y-6 opacity-60 group-hover:opacity-80 grayscale'
                                }
                            `}
                        >
                            <div className="relative w-full h-full">
                                <div className={`absolute inset-0 bg-gold-500 rounded transition-transform duration-500 ${!showLegacyPhoto ? 'translate-x-3 translate-y-3' : 'translate-x-1 translate-y-1'}`}></div>
                                <div className="absolute inset-0 bg-navy-800 rounded border-2 border-gold-500 overflow-hidden">
                                    <img
                                        src={profileNew}
                                        alt="Kevin Valdez"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Original Photo (Active or Back) */}
                        <div
                            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                                ${showLegacyPhoto
                                    ? 'z-20 scale-100 rotate-0 translate-x-0 translate-y-0 opacity-100'
                                    : 'z-10 scale-95 -rotate-6 -translate-x-4 -translate-y-4 opacity-60 group-hover:opacity-80 grayscale'
                                }
                            `}
                        >
                            <div className="relative w-full h-full">
                                <div className={`absolute inset-0 bg-gold-500 rounded transition-transform duration-500 ${showLegacyPhoto ? 'translate-x-3 translate-y-3' : 'translate-x-1 translate-y-1'}`}></div>
                                <div className="absolute inset-0 bg-navy-800 rounded border-2 border-gold-500 overflow-hidden">
                                    <img
                                        src={profileOriginal}
                                        alt="Kevin Valdez Legacy"
                                        className="w-full h-full object-cover"
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
