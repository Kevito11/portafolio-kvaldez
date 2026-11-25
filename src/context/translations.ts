export const translations = {
    es: {
        nav: {
            home: 'Inicio',
            about: 'Sobre Mí',
            experience: 'Experiencia',
            education: 'Educación',
            skills: 'Habilidades',
            projects: 'Proyectos',
            contact: 'Contacto',
            resume: 'Currículum'
        },
        theme: {
            label: 'Estilo visual',
            buttonAria: 'Cambiar estilo visual',
            options: {
                classic: {
                    name: 'Clásico',
                    desc: 'Navy & Dorado elegante'
                },
                bento: {
                    name: 'Bento Tech',
                    desc: 'Grafito minimalista & cian'
                },
                editorial: {
                    name: 'Editorial',
                    desc: 'Papel cálido & alto contraste'
                }
            }
        },
        hero: {
            greeting: 'HOLA, MI NOMBRE ES',
            role: 'Ingeniero Desarrollador de Software.',
            description: 'Especializado en arquitectura Full-Stack, APIs escalables (estándar LTI), integración de Inteligencia Artificial, automatización interplataforma e infraestructura DevOps orientada a resultados.',
            cta: 'Ver mis Proyectos'
        },
        about: {
            title: 'Sobre Mí',
            p1: '¡Hola! Soy Kevin, <gold>Ingeniero en Sistemas</gold> con gran pasión por el desarrollo de software y la resolución de problemas técnicos. Me destaco por mi capacidad de aprender rápido, adaptarme a equipos de trabajo dinámicos y aportar soluciones funcionales desde el primer día.',
            p2: 'Con base en <gold>República Dominicana</gold>, mi interés va desde el desarrollo web hasta aplicaciones móviles. Me encuentro preparado para integrarme a equipos de alto rendimiento como <gold>Desarrollador</gold>, aportando valor y creciendo profesionalmente en cada proyecto.',
            traits: {
                analytical: { title: 'Analítico', desc: 'Descompongo problemas complejos en soluciones lógicas.' },
                creative: { title: 'Creativo', desc: 'Diseño experiencias memorables y visualmente atractivas.' },
                proactive: { title: 'Proactivo', desc: 'Siempre buscando nuevas tecnologías y mejores prácticas.' }
            }
        },
        experience: {
            title: 'Experiencia',
            presentBadge: 'Actualidad',
            items: [
                {
                    role: 'Ingeniero Desarrollador de Software',
                    period: 'Actualidad',
                    isCurrent: true,
                    pillars: [
                        {
                            icon: 'code' as const,
                            title: 'Desarrollo Full-Stack & APIs',
                            desc: 'Diseño e implementación de soluciones web y APIs robustas y escalables (estándar LTI) utilizando Node.js, JavaScript, PHP y Python.'
                        },
                        {
                            icon: 'ai' as const,
                            title: 'Integración de IA & Automatización',
                            desc: 'Automatización de flujos de trabajo interplataforma e integración de capacidades de Inteligencia Artificial cumpliendo rigurosos estándares de ciberseguridad.'
                        },
                        {
                            icon: 'server' as const,
                            title: 'Infraestructura & DevOps',
                            desc: 'Arquitectura y administración de servidores de alta disponibilidad, configuración de entornos (dev, staging, prod), políticas de backups y diseño de scripts para QA.'
                        },
                        {
                            icon: 'briefcase' as const,
                            title: 'Gestión de Proyectos & Clientes',
                            desc: 'Liderazgo técnico en el ciclo completo de entrega, asegurando el cumplimiento de requerimientos del cliente, calidad de código y entrega oportuna.'
                        },
                        {
                            icon: 'wrench' as const,
                            title: 'Soporte & Mejora Continua',
                            desc: 'Mantenimiento preventivo, soporte técnico a incidencias críticas y optimización de procesos internos para maximizar la eficiencia operativa.'
                        }
                    ]
                }
            ]
        },
        education: {
            title: 'Educación',
            items: [
                {
                    institution: 'Universidad Dominicana O&M',
                    degree: 'Ingeniería en Sistemas y Computación',
                    date: '2021'
                },
                {
                    institution: 'Talento Digital',
                    degree: 'Desarrollo Web Full Stack',
                    date: ''
                },
                {
                    institution: 'UDEMY',
                    degree: 'Flutter y Desarrollo Móvil',
                    date: ''
                },
                {
                    institution: 'UDEMY',
                    degree: 'React',
                    date: ''
                }
            ]
        },
        skills: {
            title: 'Habilidades Técnicas',
            groups: [
                {
                    title: 'Backend & APIs',
                    items: ['Node.js', 'Express', 'Python', 'PHP', 'Estándar LTI', 'C#']
                },
                {
                    title: 'Frontend',
                    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Flutter']
                },
                {
                    title: 'IA, Automatización & Cloud/DevOps',
                    items: [
                        'Integración de IA (Gemini/LLMs)',
                        'Automatización de Flujos',
                        'Linux / Servidores Alta Disponibilidad',
                        'Entornos CI/QA & Backups'
                    ]
                },
                {
                    title: 'Bases de Datos & ERP',
                    items: ['SQL Server', 'Supabase', 'Firebase', 'SAP Business One', 'Git & GitHub']
                }
            ]
        },
        projects: {
            title: 'Mis proyectos',
            featured: 'Proyecto Destacado',
            viewArchive: 'Ver Archivo Completo',
            demoAdmin: 'Demo Admin',
            demoVoter: 'Demo Votante',
            previewFallback: 'Vista previa técnica',
            list: [
                {
                    title: 'Dashboard OPEX — E-Learning Script Tracker',
                    description: 'Plataforma ejecutiva para monitorear un pipeline de producción e-learning en 5 fases (Planificación, Redacción/QC, Sonido, Gráficos y SCORM), con integración a Zoho WorkDrive/Projects y un asesor pedagógico impulsado por Google Gemini AI.'
                },
                {
                    title: 'Sistema de Gestión de Inventario TI & Bóveda (AccessGuard TI)',
                    description: 'Plataforma corporativa SaaS de alta densidad para gestión jerárquica de activos de hardware, control de acceso por roles (RBAC), bóveda de credenciales cifradas (AES-256), deep linking con sincronización entre pestañas e integración serverless con Zoho Catalyst/Flow.'
                },
                {
                    title: 'Upper Room IBC — Conferencia Despierta 2026',
                    description: 'Plataforma web de eventos offline-first con registro guiado, generación automática de boletas con código QR, catálogo interactivo de mercancía y panel de Check-In en puerta con escaneo por cámara y sincronización bidireccional con Google Sheets.'
                },
                {
                    title: 'Ministerio de Jóvenes - ICC',
                    description: 'Sitio web oficial y plataforma de registro para el ministerio de jóvenes de la Iglesia Convertidos a Cristo (ICC). Cuenta con un diseño premium minimalista, cuenta regresiva, cronograma interactivo de actividades y generación de boletos digitales con códigos QR para el evento.'
                },
                {
                    title: 'Sistema de Votaciones - ICC',
                    description: 'Plataforma web de votación electrónica para la admisión de membresía en la Iglesia Cristiana de Confraternidad (ICC). Permite votar de forma segura y en tiempo real, conectada a Google Sheets mediante Apps Script, con un panel de administración para gestionar candidatos y un panel del votante optimizado para móviles.'
                },
                {
                    title: 'Barber Shop - Landing Page',
                    description: 'Una página web moderna para una barbería, diseñada para mostrar servicios, precios y horarios. Totalmente responsiva y optimizada para una experiencia de usuario fluida.'
                },
                {
                    title: 'BodaDigital - Invitación Interactiva',
                    description: 'Una plataforma digital interactiva para crear y gestionar invitaciones de boda personalizadas con un diseño elegante y moderno. Facilita la confirmación de asistencia y la ubicación del evento.'
                },
                {
                    title: 'FacturaPro - ERP System',
                    description: 'Sistema de Gestión Empresarial (ERP) de nivel "Enterprise" para facturación, inventario y CRM. Diseño premium con Glassmorphism, gráficas interactivas y una experiencia de usuario inmersiva. (Proyecto actualmente en desarrollo)'
                },
                {
                    title: 'Gestor de Finanzas Personales',
                    description: 'Aplicación intuitiva para el control inteligente de ingresos y gastos. Permite a los usuarios visualizar su flujo de dinero mediante gráficos y categorías personalizables. Proyecto desarrollado como parte de un curso.'
                },
                {
                    title: 'Buscador de Gifs',
                    description: 'Aplicación dinámica que permite buscar y descubrir GIFs animados en tiempo real conectándose a la API de Giphy. Incluye carga perezosa (lazy loading) para mejor rendimiento. Proyecto desarrollado como requisito de un curso.'
                }
            ]
        },
        contact: {
            subtitle: '06. ¿Qué sigue?',
            title: 'Ponte en Contacto',
            text: 'Siempre estoy interesado en conectar con otros profesionales y explorar nuevas colaboraciones tecnológicas. Si tienes una propuesta o simplemente quieres saludar, ¡será un gusto conversar!',
            cta: 'Contáctame',
            footer: 'Diseñado & Construido por Kevin Valdez',
            modal: {
                title: 'Información de Contacto',
                email: 'Correo Electrónico',
                phone: 'Teléfono',
                linkedin: 'LinkedIn',
                close: 'Cerrar'
            }
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            experience: 'Experience',
            education: 'Education',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact',
            resume: 'Resume'
        },
        theme: {
            label: 'Visual style',
            buttonAria: 'Switch visual style',
            options: {
                classic: {
                    name: 'Classic',
                    desc: 'Refined Navy & Gold'
                },
                bento: {
                    name: 'Bento Tech',
                    desc: 'Minimalist graphite & cyan'
                },
                editorial: {
                    name: 'Editorial',
                    desc: 'Warm paper & high contrast'
                }
            }
        },
        hero: {
            greeting: 'HI, MY NAME IS',
            role: 'Software Development Engineer.',
            description: 'Specialized in Full-Stack architecture, scalable APIs (LTI standard), Artificial Intelligence integration, cross-platform automation, and results-driven DevOps infrastructure.',
            cta: 'Check out my work'
        },
        about: {
            title: 'About Me',
            p1: 'Hello! I\'m Kevin, a <gold>Systems Engineer</gold> with a passion for software development and technical problem solving. I stand out for my ability to learn quickly, adapt to dynamic teams, and deliver functional solutions from day one.',
            p2: 'Based in the <gold>Dominican Republic</gold>, my interest ranges from web development to mobile apps. I am ready to join high-performance teams as a <gold>Developer</gold>, adding value and growing professionally in every project.',
            traits: {
                analytical: { title: 'Analytical', desc: 'I break down complex problems into logical solutions.' },
                creative: { title: 'Creative', desc: 'I design memorable and visually appealing experiences.' },
                proactive: { title: 'Proactive', desc: 'Always looking for new technologies and best practices.' }
            }
        },
        experience: {
            title: 'Experience',
            presentBadge: 'Present',
            items: [
                {
                    role: 'Software Development Engineer',
                    period: 'Present',
                    isCurrent: true,
                    pillars: [
                        {
                            icon: 'code' as const,
                            title: 'Full-Stack Development & APIs',
                            desc: 'Design and implementation of robust, scalable web solutions and APIs (LTI standard) using Node.js, JavaScript, PHP, and Python.'
                        },
                        {
                            icon: 'ai' as const,
                            title: 'AI Integration & Automation',
                            desc: 'Cross-platform workflow automation and integration of Artificial Intelligence capabilities under strict cybersecurity standards.'
                        },
                        {
                            icon: 'server' as const,
                            title: 'Infrastructure & DevOps',
                            desc: 'Architecture and administration of high-availability servers, environment setup (dev, staging, prod), backup policies, and QA scripting.'
                        },
                        {
                            icon: 'briefcase' as const,
                            title: 'Project & Client Management',
                            desc: 'Technical leadership across the full delivery lifecycle, ensuring client requirement alignment, code quality, and on-time delivery.'
                        },
                        {
                            icon: 'wrench' as const,
                            title: 'Support & Continuous Improvement',
                            desc: 'Preventive maintenance, technical support for critical incidents, and internal process optimization to maximize operational efficiency.'
                        }
                    ]
                }
            ]
        },
        education: {
            title: 'Education',
            items: [
                {
                    institution: 'Dominican University O&M',
                    degree: 'Systems and Computing Engineering',
                    date: '2021'
                },
                {
                    institution: 'Talento Digital',
                    degree: 'Full Stack Web Development',
                    date: ''
                },
                {
                    institution: 'UDEMY',
                    degree: 'Flutter & Mobile Development',
                    date: ''
                },
                {
                    institution: 'UDEMY',
                    degree: 'React',
                    date: ''
                }
            ]
        },
        skills: {
            title: 'Technical Skills',
            groups: [
                {
                    title: 'Backend & APIs',
                    items: ['Node.js', 'Express', 'Python', 'PHP', 'LTI Standard', 'C#']
                },
                {
                    title: 'Frontend',
                    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Flutter']
                },
                {
                    title: 'AI, Automation & Cloud/DevOps',
                    items: [
                        'AI Integration (Gemini/LLMs)',
                        'Workflow Automation',
                        'Linux / High-Availability Servers',
                        'CI/QA Environments & Backups'
                    ]
                },
                {
                    title: 'Databases & ERP',
                    items: ['SQL Server', 'Supabase', 'Firebase', 'SAP Business One', 'Git & GitHub']
                }
            ]
        },
        projects: {
            title: 'My Projects',
            featured: 'Featured Project',
            viewArchive: 'View Full Archive',
            demoAdmin: 'Admin Demo',
            demoVoter: 'Voter Demo',
            previewFallback: 'Technical Preview',
            list: [
                {
                    title: 'OPEX Dashboard — E-Learning Script Tracker',
                    description: 'Executive platform to monitor a 5-stage e-learning production pipeline (Planning, Scripting/QC, Audio, Graphics, and SCORM), integrated with Zoho WorkDrive/Projects and a pedagogical advisor powered by Google Gemini AI.'
                },
                {
                    title: 'IT Inventory Management & Vault System (AccessGuard TI)',
                    description: 'High-density corporate SaaS platform for hierarchical hardware asset management, role-based access control (RBAC), encrypted credential vault (AES-256), deep linking with cross-tab sync, and serverless integration with Zoho Catalyst/Flow.'
                },
                {
                    title: 'Upper Room IBC — Despierta 2026 Conference',
                    description: 'Offline-first event web platform featuring guided registration, automated QR ticket generation, interactive merchandise catalog, and a door Check-In panel with camera scanning and bidirectional Google Sheets sync.'
                },
                {
                    title: 'Youth Ministry - ICC',
                    description: 'Official website and registration platform for the youth ministry of the Iglesia Convertidos a Cristo (ICC). Features a premium minimalist design, live countdown, interactive activity schedule, and digital ticket generation with QR codes for the event.'
                },
                {
                    title: 'ICC Voting System',
                    description: 'Electronic voting web platform for membership admission at Iglesia Cristiana de Confraternidad (ICC). Enables members to vote securely and in real-time, integrated with Google Sheets via Apps Script, featuring an admin panel and a mobile-optimized voter interface.'
                },
                {
                    title: 'Barber Shop - Landing Page',
                    description: 'A modern landing page for a barbershop, designed to showcase services, pricing, and hours. Fully responsive and optimized for a smooth user experience.'
                },
                {
                    title: 'BodaDigital - Interactive Invitation',
                    description: 'An interactive digital platform to create and manage personalized wedding invitations with an elegant and modern design. Facilitates RSVP and event location.'
                },
                {
                    title: 'FacturaPro - ERP System',
                    description: 'Enterprise-level ERP system for billing, inventory, and CRM. Premium design featuring Glassmorphism, interactive charts, and an immersive user experience. (Currently under development)'
                },
                {
                    title: 'Personal Finance Manager',
                    description: 'Intuitive application for intelligent control of income and expenses. Allows users to visualize their money flow through charts and customizable categories. Project developed as part of a course.'
                },
                {
                    title: 'Gif Searcher',
                    description: 'Dynamic application that allows searching and discovering animated GIFs in real-time by connecting to the Giphy API. Includes lazy loading for better performance. Project developed as a requirement of a course.'
                }
            ]
        },
        contact: {
            subtitle: '06. What\'s Next?',
            title: 'Get In Touch',
            text: 'I\'m always interested in connecting with other professionals and exploring new tech collaborations. Whether you have a proposal or just want to say hi, I\'ll be happy to chat!',
            cta: 'Contact Me',
            footer: 'Designed & Built by Kevin Valdez',
            modal: {
                title: 'Contact Information',
                email: 'Email Address',
                phone: 'Phone',
                linkedin: 'LinkedIn',
                close: 'Close'
            }
        }
    }
};
