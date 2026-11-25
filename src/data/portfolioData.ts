import React from 'react';
import profileMain from '../assets/profile-main.jpg';
import profileNew from '../assets/profile-new.jpg';
import type { translations } from '../context/translations';

export type TranslationBundle = typeof translations.es;

export const PROFILE_PHOTOS = [profileMain, profileNew] as const;

export const CONTACT_INFO = {
    email: 'kevito.valdez@gmail.com',
    whatsappUrl: 'https://wa.me/18094906319',
    whatsappDisplay: '+1 (809) 490-6319',
    linkedinUrl: 'https://www.linkedin.com/in/kevin-l-valdez-garc%C3%ADa-4225a8165/',
    linkedinDisplay: 'Kevin Valdez',
    resumeUrl: '/resume.pdf',
} as const;

export interface ProjectItem {
    title: string;
    description: string;
    links: {
        github?: string;
        demo?: string | Record<string, string>;
    };
    images: string[];
    tech: string[];
}

export const getProjectsList = (t: TranslationBundle): ProjectItem[] => {
    const staticProjects: Array<{
        links: {
            github?: string;
            demo?: string | Record<string, string>;
        };
        images: string[];
        tech: string[];
    }> = [
        {
            // 0. Dashboard OPEX — E-Learning Script Tracker
            links: {},
            // TODO: agregar capturas en public/projects/opex-dashboard/
            images: [],
            tech: ['React 19', 'Tailwind v4', 'Node.js', 'Express', 'Zoho APIs', 'Gemini AI', 'Recharts'],
        },
        {
            // 1. Sistema de Gestión de Inventario TI & Bóveda (AccessGuard TI)
            links: {},
            // TODO: agregar capturas en public/projects/accessguard/
            images: [],
            tech: ['React 19', 'Tailwind v4', 'RBAC', 'AES-256 Vault', 'Zoho Catalyst', 'Zoho Flow'],
        },
        {
            // 2. Upper Room IBC — Conferencia Despierta 2026
            links: {},
            // TODO: agregar capturas en public/projects/upperroom-despierta/
            images: [],
            tech: ['React 19', 'Vite', 'React Router v7', 'QR Code', 'Offline-First', 'Google Apps Script'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/OneTwentyOne-kvaldez',
                demo: 'https://ministeriodejovenesicc.netlify.app/registro',
            },
            images: [
                'projects/onetwentyone/1.png',
                'projects/onetwentyone/2.png',
                'projects/onetwentyone/3.png',
                'projects/onetwentyone/4.png',
            ],
            tech: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/Votos-ICC-kvaldez',
                demo: {
                    [t.projects.demoAdmin]: 'https://votosicc-kvaldez.netlify.app/admin',
                    [t.projects.demoVoter]: 'https://votosicc-kvaldez.netlify.app/voter',
                },
            },
            images: [
                'projects/votosicc/1.png',
                'projects/votosicc/2.png',
                'projects/votosicc/3.png',
                'projects/votosicc/4.png',
                'projects/votosicc/5.png',
                'projects/votosicc/6.png',
                'projects/votosicc/7.png',
            ],
            tech: ['React', 'Vanilla CSS', 'Google Apps Script', 'Google Sheets API', 'ExcelJS', 'Vite'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/BarberShop-2-kvaldez',
                demo: 'https://barbershop-2-kvaldez.netlify.app/',
            },
            images: [
                'projects/barber/1.png',
                'projects/barber/2.png',
                'projects/barber/3.png',
                'projects/barber/4.png',
            ],
            tech: ['React', 'TypeScript', 'Firebase', 'Framer Motion', 'EmailJS'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/invitacion-de-bodas-kvaldez',
                demo: 'https://invitacion-de-bodas-kvaldez.netlify.app/',
            },
            images: ['project_wedding.png'],
            tech: ['React', 'TypeScript', 'Supabase', 'React Router', 'Lucide'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/FacturaPro-kvaldez',
                demo: 'https://facturapro-kvaldez.netlify.app/',
            },
            images: [
                'projects/facturapro/2.png',
                'projects/facturapro/1.png',
                'projects/facturapro/3.png',
            ],
            tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MSSQL', 'Tailwind CSS'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/gestordefinanzas-kvaldez',
                demo: 'https://gestordefinanzas-kvaldez.netlify.app/',
            },
            images: [
                'projects/finance/1.png',
                'projects/finance/2.png',
                'projects/finance/3.png',
            ],
            tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'TypeScript'],
        },
        {
            links: {
                github: 'https://github.com/Kevito11/buscador-de-gifs1-kvaldez',
                demo: 'https://buscador-de-gifs1-kvaldez.netlify.app/',
            },
            images: ['project_gifs.png'],
            tech: ['React', 'TypeScript', 'Axios', 'Vitest', 'Giphy API'],
        },
    ];

    return t.projects.list.map((proj, index) => ({
        ...proj,
        ...staticProjects[index],
    }));
};

export const renderHighlightedText = (text: string): React.ReactNode => {
    const parts = text.split(/<gold>(.*?)<\/gold>/g);
    return parts.map((part, index) =>
        index % 2 === 1
            ? React.createElement(
                  'span',
                  {
                      key: index,
                      className:
                          'text-text-heading font-semibold underline decoration-accent-primary/50 decoration-2 underline-offset-4',
                  },
                  part
              )
            : part
    );
};
