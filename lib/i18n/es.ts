import type { Dictionary } from "./types";
import { portfolio } from "@/config/portfolio";

export const es: Dictionary = {
  profile: {
    firstName: portfolio.author.firstName,
    lastName: portfolio.author.lastName,
    jobTitle: portfolio.author.jobTitle,
    email: portfolio.author.email,
    phone: portfolio.author.phone,
    github: portfolio.social.github,
    linkedin: portfolio.social.linkedin,
    website: portfolio.social.website,
    location: portfolio.author.location,
  },

  nav: {
    experience: "Experiencia",
    skills: "Habilidades",
    education: "Educaci\u00f3n",
    projects: "Proyectos",
    demos: "Demos",
    contact: "Contacto",
    timeline: "L\u00ednea de Tiempo",
    toggleMenu: "Abrir men\u00fa",
    langLabel: "ES",
  },

  hero: {
    imgAlt: "Ivan Pacheco \u2014 Ingeniero de Software",
    subtitle: "Ingeniero de Software en Microsoft",
    firstName: "Ivan",
    lastName: "Ibarra Pacheco",
    bio: "Ingeniero de Software en Microsoft. Maestro en Ciberseguridad por el Tec de Monterrey, con más de 8 años de experiencia desarrollando aplicaciones web con React, TypeScript, Python, Node.js y AWS, creciendo desde una empresa pequeña en León hasta empresas tecnológicas medianas y grandes antes de llegar a Microsoft.",
    location: "Redmond, WA \u00b7 Originario de León, México",
    birthLine: "Nacido en 1996 en León, Guanajuato, México",
    showBirthLine: true,
    cta: "Cont\u00e1ctame",
  },

  experience: {
    sectionLabel: "Carrera",
    heading: "Experiencia Laboral",
    viewFullTimeline: "Ver Línea de Tiempo Completa",
    jobs: [
      {
        title: "Ingeniero de Software",
        company: "Microsoft",
        location: "Redmond, WA",
        period: "Ago 2026 \u2013 Presente",
        logo: "microsoft",
        bullets: [
          "Regresé de tiempo completo después de la pasantía de maestría en Ingeniería de Software de 2025.",
        ],
        tags: [],
      },
      {
        title: "Ingeniero de Software Senior / L\u00edder Frontend",
        company: "C Infinity Solutions",
        location: "Remoto, M\u00e9xico",
        period: "Sep 2025 \u2013 Ago 2026",
        logo: "cinfinity",
        logoBg: "#0f1218",
        bullets: [
          "Regres\u00e9 despu\u00e9s de la pasant\u00eda en Microsoft para liderar la arquitectura frontend de un CMS SaaS basado en React que atiende a clientes empresariales con integraciones de Dynamics 365.",
          "Mentor\u00e9 y gui\u00e9 a 3\u20134 ingenieros frontend a trav\u00e9s de revisiones de c\u00f3digo, direcci\u00f3n t\u00e9cnica y mejores pr\u00e1cticas en rendimiento y mantenibilidad.",
          "Responsable del c\u00f3digo frontend, colaborando con equipos de producto, dise\u00f1o y backend para entregar funcionalidades de alto impacto.",
        ],
        tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"],
      },
      {
        title: "Pasant\u00eda de Maestr\u00eda en Ingenier\u00eda de Software",
        company: "Microsoft",
        location: "Redmond, WA",
        period: "Jun 2025 \u2013 Sep 2025",
        logo: "microsoft",
        bullets: [
          "Desarroll\u00e9 una aplicaci\u00f3n en Dynamics 365 para digitalizar un proceso legal/empresarial, mejorando la eficiencia e integridad de datos.",
          "Cre\u00e9 plugins personalizados y l\u00f3gica de negocio en JavaScript y C#; colabor\u00e9 con stakeholders para alinear requerimientos.",
        ],
        tags: ["Dynamics 365", "JavaScript", "C#", "Power Platform"],
      },
      {
        title: "Ingeniero de Software Senior / L\u00edder Frontend",
        company: "C Infinity Solutions",
        location: "Remoto, M\u00e9xico",
        period: "Oct 2024 \u2013 May 2025",
        logo: "cinfinity",
        logoBg: "#0f1218",
        bullets: [
          "Lider\u00e9 la arquitectura frontend de un CMS SaaS basado en React, definiendo patrones escalables, manejo de estado y componentes reutilizables.",
          "Mentor\u00e9 y gui\u00e9 a 3\u20134 ingenieros frontend a trav\u00e9s de revisiones de c\u00f3digo, direcci\u00f3n t\u00e9cnica y mejores pr\u00e1cticas en rendimiento y mantenibilidad.",
          "Responsable del c\u00f3digo frontend, colaborando con equipos de producto, dise\u00f1o y backend para entregar funcionalidades de alto impacto.",
        ],
        tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"],
      },
      {
        title: "Ingeniero de Software Senior",
        company: "Drift",
        location: "Guadalajara, M\u00e9xico",
        period: "Mar 2023 \u2013 Nov 2024",
        logo: "drift",
        logoBg: "#ffffff",
        bullets: [
          "Mantuve y mejor\u00e9 la librer\u00eda del Sistema de Dise\u00f1o, asegurando consistencia y experiencias de usuario de alta calidad en toda la plataforma.",
          "Colabor\u00e9 con el equipo de Analytics para crear, mejorar y refinar reportes usando Highcharts, Cube, React, TypeScript y la librer\u00eda interna del Sistema de Dise\u00f1o.",
          "Desarroll\u00e9 componentes personalizados desde cero, incluyendo diagramas de Gantt y otras visualizaciones avanzadas, para entregar reportes anal\u00edticos detallados y pulidos.",
        ],
        tags: ["React", "TypeScript", "Highcharts", "Cube", "Design System", "Jest", "Agile/Scrum"],
      },
      {
        title: "Ingeniero de Software III",
        company: "Wizeline",
        location: "Guadalajara, M\u00e9xico",
        period: "Jun 2022 \u2013 Mar 2023",
        logo: "wizeline",
        bullets: [
          "Fung\u00ed como Tech Lead en el lanzamiento greenfield de Arc XP para The Baltimore Banner, un startup de noticias sin fines de lucro reconocido a nivel nacional ($50M+ en fondos).",
          "Coordin\u00e9 entre equipos de dise\u00f1o, gesti\u00f3n y desarrollo como l\u00edder frontend; la publicaci\u00f3n creci\u00f3 a m\u00e1s de 30,000 suscriptores de pago en su primer a\u00f1o.",
        ],
        tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"],
      },
      {
        title: "Ingeniero de Software II",
        company: "Wizeline",
        location: "Guadalajara, M\u00e9xico",
        period: "Oct 2021 \u2013 Jun 2022",
        logo: "wizeline",
        bullets: [
          "Contratado para una importante empresa de noticias en EE.UU., entregando soluciones frontend y desarrollando componentes en React para clientes ubicados principalmente en EE.UU. y Canad\u00e1.",
          "Configur\u00e9, mantuve y a\u00f1ad\u00ed funcionalidades a plataformas basadas en Arc XP, asegurando integraciones CMS de alta calidad y experiencias de usuario responsivas.",
        ],
        tags: ["React", "Arc XP", "SCSS", "TypeScript", "CMS"],
      },
      {
        title: "Ingeniero de Software I",
        company: "Wizeline",
        location: "Guadalajara, M\u00e9xico",
        period: "Oct 2020 \u2013 Sep 2021",
        logo: "wizeline",
        bullets: [
          "Migr\u00e9 WPLG Local10.com (el sitio #1 de ABC en Miami, 5\u201310M visitantes mensuales) de un CMS legacy a Arc XP, desarrollando login social (OAuth), optimizaciones SEO y mejoras en Core Web Vitals.",
          "Particip\u00e9 en bootcamps de Wizeline y proyectos de herramientas internas; contribu\u00ed como contractor para la plataforma Arc XP del Washington Post.",
        ],
        tags: ["React", "Arc XP", "SEO", "OAuth", "JavaScript", "Go"],
      },
      {
        title: "Desarrollador Frontend",
        company: "GPAC",
        location: "Remoto, M\u00e9xico",
        period: "Abr 2020 \u2013 Oct 2020",
        logo: "gpac",
        logoBg: "#ffffff",
        bullets: [
          "Desarroll\u00e9 el proyecto \u201cFortPAC\u201d, un sistema web a medida que automatiza el proceso de reclutamiento y reemplaz\u00f3 el sistema legacy \u201cPCR\u201d, mejorando la productividad de los reclutadores.",
          "Constru\u00ed componentes escalables en React siguiendo principios de Atomic Design con manejo de estado Redux, Material UI y testing con Enzyme.",
        ],
        tags: ["React", "Redux", "Material UI", "Enzyme", "Atomic Design", "Azure DevOps"],
      },
      {
        title: "Desarrollador de Software",
        company: "CBQA Solutions",
        location: "Le\u00f3n, M\u00e9xico",
        period: "Sep 2018 \u2013 Abr 2020",
        logo: "cbqa",
        logoBg: "#ffffff",
        bullets: [
          "Desarroll\u00e9 el sitio web de CBQA Solutions (React, SASS, Material UI) y una aplicaci\u00f3n m\u00f3vil multiplataforma (React Native, Enzyme, Jest).",
          "Redise\u00f1\u00e9 y compil\u00e9 billeteras de criptomonedas (PAC Coin / PAC Global y XOAT Coin) para Windows, Linux y macOS usando C++, Qt5 y Gitian Builder.",
          "Constru\u00ed un dashboard interno con Smashing para las pantallas de la empresa usando Ruby, CoffeeScript y APIs de Google Calendar.",
        ],
        tags: ["React", "React Native", "C++", "Qt5", "Ruby", "SASS", "Material UI", "Jest"],
      },
    ],
  },

  skills: {
    sectionLabel: "Stack",
    heading: "Habilidades y Tecnolog\u00edas",
    categories: [
      {
        label: "Frontend",
        skills: ["React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS/SCSS", "React Native"],
      },
      {
        label: "Backend y Cloud",
        skills: ["Node.js", "Nest.js", "Express", "Python", "Go", "AWS", "MySQL"],
      },
      {
        label: "Experiencia Especializada",
        skills: ["Arc XP", "Dynamics 365", "Highcharts", "Cube", "Material UI", "Sistemas de Dise\u00f1o"],
      },
      {
        label: "Testing",
        skills: ["React Testing Library", "Jest", "Pruebas Unitarias", "Pruebas de Integraci\u00f3n"],
      },
      {
        label: "Herramientas y Pr\u00e1cticas",
        skills: ["Git", "Figma", "CI/CD", "Docker", "Unix", "Agile/Scrum"],
      },
      {
        label: "Herramientas de IA",
        skills: ["Claude", "ChatGPT", "GitHub Copilot", "Gemini", "Cursor"],
      },
      {
        label: "\u00c1reas de Enfoque",
        skills: ["Desarrollo Web y M\u00f3vil", "Sistemas de Dise\u00f1o", "Desarrollo de APIs", "Cloud", "UI/UX", "Ciberseguridad"],
      },
      {
        label: "Habilidades Blandas",
        skills: ["Liderazgo", "Resoluci\u00f3n de Problemas", "Mentor\u00eda", "Colaboraci\u00f3n"],
      },
    ],
  },

  education: {
    sectionLabel: "Educaci\u00f3n",
    heading: "Formaci\u00f3n Acad\u00e9mica",
    schools: [
      {
        school: "Instituto Tecnol\u00f3gico y de Estudios Superiores de Monterrey (ITESM)",
        degree: "Maestr\u00eda en Ciberseguridad",
        detail: "Graduado en 2026",
        location: "M\u00e9xico",
        logo: "itesm",
        sortDate: "2024-08",
        timelineType: "education",
      },
      {
        school: "Universidad de La Salle Baj\u00edo",
        degree: "Licenciatura en Ingenier\u00eda de Software y Computaci\u00f3n",
        detail: "Graduado en julio 2020",
        location: "M\u00e9xico",
        logo: "lasalle",
        sortDate: "2016-08",
        timelineType: "education",
      },
      {
        school: "University of Regina",
        degree: "Intercambio Acad\u00e9mico en Ciencias de la Computaci\u00f3n",
        detail: "Oto\u00f1o 2017 \u2013 Invierno 2018",
        location: "Canad\u00e1",
        logo: "uofregina",
        sortDate: "2017-09",
        timelineType: "exchange",
      },
      {
        school: "Dongseo University",
        degree: "Beca GKS para Programa LATAM en Tecnolog\u00eda",
        detail: "Verano 2019",
        location: "Corea del Sur",
        logo: "dongseo",
        sortDate: "2019-06",
        timelineType: "exchange",
      },
    ],
    award: {
      title: "Premio de Excelencia \u2014 Beca Global Coreana",
      org: "Instituto Nacional de Educaci\u00f3n Internacional (NIIED), Corea del Sur \u00b7 Ago 2019",
      description: "Premiado por la mejor presentaci\u00f3n de proyecto durante el Programa Final GKS en Dongseo University.",
    },
    languagesHeading: "Idiomas",
    languages: [
      { name: "Ingl\u00e9s", detail: "Duolingo English Test CEFR C1 (2025) \u00b7 IELTS (2025)" },
      { name: "Espa\u00f1ol", detail: "Nativo" },
    ],
  },

  diplomas: {
    heading: "Diplomas y Certificados",
    items: [
      {
        title: "Diploma de Licenciatura",
        description: "Lic. en Ingenier\u00eda de Software y Computaci\u00f3n \u2014 Universidad de La Salle Baj\u00edo (Traducci\u00f3n Oficial al Ingl\u00e9s)",
        file: "/diplomas/Bachelors_Degree_Diploma.pdf",
      },
      {
        title: "Premio de Excelencia \u2014 GKS",
        description: "Beca Global Coreana \u2014 Mejor Presentaci\u00f3n de Proyecto, Dongseo University, Corea del Sur, 2019",
        file: "/diplomas/Award_of_Excellence_GKS.pdf",
      },
      {
        title: "Diploma de Bootcamp de Go",
        description: "Certificaci\u00f3n de bootcamp de programaci\u00f3n en Golang",
        file: "/diplomas/Go_Bootcamp_Diploma.pdf",
      },
      {
        title: "Certificado IELTS",
        description: "Sistema Internacional de Evaluaci\u00f3n del Idioma Ingl\u00e9s \u2014 2025",
        file: "/diplomas/IELTS_Certificate_2025.pdf",
      },
      {
        title: "Duolingo English Test \u2014 CEFR C1",
        description: "Duolingo English Test \u2014 Certificado CEFR C1, 2025",
        file: "/diplomas/Duolingo_English_Test_C1.pdf",
      },
    ],
    viewDocument: "Ver Documento",
    download: "Descargar",
    documentViewer: "Visor de Documentos",
    pdfViewer: "Visor de PDF",
    prevAriaLabel: "Diploma anterior",
    nextAriaLabel: "Siguiente diploma",
    goToAriaLabel: "Ir al diploma",
  },

  projects: {
    sectionLabel: "Proyectos",
    heading: "Proyectos Destacados",
    items: [
      {
        title: "VerifiA — Verificación Criptográfica de Presencia",
        role: "Tesis de Maestría · Tec de Monterrey",
        period: "2025 – 2026",
        description:
          "Plataforma de verificación que emite una “credencial de presencia” criptográfica de corta duración, que prueba que una persona estuvo físicamente presente, pasó una prueba de vida 3D certificada (FaceTec, iBeta ISO 30107-3 Niveles 1 y 2) y autorizó con Face ID mediante Passkeys en hardware Apple genuino (App Attest). Diseñada para combatir fraudes asistidos por IA como deepfakes y clonación de voz. Un portal web muestra un código QR con un nonce de un solo uso, la app de iOS lo escanea y ejecuta las verificaciones de seguridad, y el backend emite un JWT ES256 de un solo uso que el portal valida.",
        tags: ["Ciberseguridad", "Passkeys", "App Attest", "JWT (ES256)", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "React", "Flutter"],
        github: "https://github.com/Ciip1996/VerifiA",
        featured: true,
        status: "Completed" as const,
        metrics: "Credencial válida 2–5 min · 4 capas de seguridad",
      },
      {
        title: "Christie\u2019s International Real Estate",
        role: "Tech Lead @ Wizeline",
        period: "2021 \u2013 2023",
        description:
          "Lider\u00e9 el desarrollo frontend para Christie\u2019s \u2014 la casa de subastas m\u00e1s antigua del mundo (fundada en 1766) \u2014 construyendo una plataforma de bienes ra\u00edces de lujo en Arc XP (CMS del Washington Post). Dise\u00f1\u00e9 y ejecut\u00e9 un sistema de dise\u00f1o completo con React y Arc Themes. Constru\u00ed plantillas personalizadas, layouts y bloques de componentes reutilizables, integrando b\u00fasqueda Queryly y feeds de datos de propiedades en m\u00e1s de 940 oficinas afiliadas en m\u00e1s de 48 pa\u00edses.",
        tags: ["React", "Arc XP", "Sistemas de Dise\u00f1o", "SCSS/BEM", "Queryly", "TypeScript"],
        featured: true,
        status: "Completed" as const,
        metrics: "940+ oficinas afiliadas en 48+ pa\u00edses",
      },
      {
        title: "WPLG Local10.com",
        role: "Ingeniero de Software @ Wizeline",
        period: "2020 \u2013 2022",
        description:
          "Migr\u00e9 el sitio de noticias #1 de ABC en Miami (5\u201310M visitantes mensuales) de un CMS legacy a Arc XP. Desarroll\u00e9 login social (OAuth), optimizaciones SEO y mejoras en Core Web Vitals que impactaron directamente los rankings de Google Search e ingresos publicitarios. Integr\u00e9 feeds de noticias de Associated Press para entrega de noticias de \u00faltima hora en tiempo real.",
        tags: ["React", "Arc XP", "SEO", "Core Web Vitals", "AP Data Feeds", "OAuth"],
        link: "https://www.local10.com",
        demo: "https://www.local10.com",
        status: "Completed" as const,
        metrics: "5\u201310M visitantes mensuales \u00b7 #1 afiliada ABC en Miami",
      },
      {
        title: "The Baltimore Banner",
        role: "Tech Lead @ Wizeline",
        period: "2022 \u2013 2023",
        description:
          "Lider\u00e9 el lanzamiento greenfield en Arc XP para este startup de noticias sin fines de lucro reconocido a nivel nacional ($50M+ en fondos). Coordin\u00e9 entre equipos de dise\u00f1o, gesti\u00f3n y desarrollo como l\u00edder frontend. La publicaci\u00f3n creci\u00f3 a m\u00e1s de 30,000 suscriptores de pago en su primer a\u00f1o, recibiendo cobertura del New York Times y NPR.",
        tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"],
        status: "Completed" as const,
        metrics: "30,000+ suscriptores de pago en el primer a\u00f1o \u00b7 $50M+ en fondos",
      },
      {
        title: "Tracker me",
        role: "Cofundador · Startup Estudiantil",
        period: "2017",
        description:
          "Sistema de geolocalización vehicular que permitía ver en tiempo real la ubicación y el estado de seguridad del auto —como un vidrio roto, la alarma activada o el encendido del motor— y apagarlo a distancia. Desarrollado con dos compañeros y presentado ante inversionistas semilla en el 5° Demo Day “Now” del Tec de Monterrey León.",
        tags: ["iOS", "GPS", "IoT", "Startup"],
        github: "https://github.com/Ciip1996/TrackerMe",
        status: "Archived" as const,
        metrics: "Publicado en Periódico AM (2017)",
      },
    ],
    visitAriaLabel: "Visitar",
    githubAriaLabel: "Ver en GitHub",
    demoAriaLabel: "Ver demo en vivo",
  },

  freelance: {
    sectionLabel: "Freelance",
    heading: "Proyectos Freelance",
    subtitle: "Proyectos independientes construidos de principio a fin como ingeniero freelance.",
    visitAriaLabel: "Visitar",
    items: [
      {
        title: "Picolin Store",
        description:
          "Diseñé y desarrollé el sistema completo (frontend en React, APIs backend en Node.js, base de datos MySQL) y administré recursos cloud en AWS. Lideré el ciclo completo del proyecto desde diseño (mockups UI/UX) hasta desarrollo, despliegue (CI/CD) y mantenimiento post-lanzamiento.",
        tags: ["React", "Node.js", "MySQL", "AWS", "UI/UX", "CI/CD"],
        link: "https://demo.picolinstore.com",
      },
      {
        title: "Dr. Diego Azpeitia",
        description:
          "Diseñé y desarrollé un sitio web médico profesional para el Dr. Diego Azpeitia, con agendamiento de citas, información de servicios y una interfaz moderna y responsiva optimizada para la interacción del paciente y SEO.",
        tags: ["Desarrollo Web", "UI/UX", "SEO", "Diseño Responsivo"],
        link: "https://drdiegoazpeitia.com",
      },
    ],
  },

  demos: {
    sectionLabel: "Demos",
    heading: "Demos de Trabajo",
    subtitle: "Recorridos visuales de contribuciones reales en empresas anteriores, compartidos dentro de los l\u00edmites de confidencialidad (NDA).",
    items: [
      {
        title: "Drift \u2014 Recorrido de Contribuciones (Parte 1)",
        description:
          "Un recorrido visual de funcionalidades clave y contribuciones realizadas en Drift, incluyendo dashboards anal\u00edticos en React, visualizaciones de datos con Highcharts y componentes del sistema de dise\u00f1o utilizados en todo el producto.",
        video: "/demos/drift-demo-part-1.mp4",
        poster: "/demos/drift-demo-part-1-poster.jpg",
        duration: "19 min",
        company: "Drift",
        period: "2023 \u2013 2024",
        tags: ["React", "TypeScript", "Highcharts", "Sistema de Dise\u00f1o"],
      },
      {
        title: "Drift \u2014 Recorrido de Contribuciones (Parte 2)",
        description:
          "Continuaci\u00f3n del recorrido cubriendo funcionalidades adicionales, arquitectura de componentes y patrones de UI entregados durante el proyecto en Drift.",
        video: "/demos/drift-demo-part-2.mp4",
        poster: "/demos/drift-demo-part-2-poster.jpg",
        duration: "4 min",
        company: "Drift",
        period: "2023 \u2013 2024",
        tags: ["React", "TypeScript", "Analytics", "UI/UX"],
      },
    ],
    playVideo: "Reproducir video",
    pause: "Pausar",
    play: "Reproducir",
    unmute: "Activar sonido",
    mute: "Silenciar",
    fullscreen: "Pantalla completa",
    close: "Cerrar",
  },

  contact: {
    sectionLabel: "Contacto",
    heading: "Conectemos",
    subtitle: "Disponible para colaboraciones, charlas y entrevistas con medios. ¡No dudes en contactarme!",
  },

  footer: {
    copyright: "Ivan Pacheco. Todos los derechos reservados.",
  },

  press: {
    sectionLabel: "Prensa",
    heading: "En los Medios",
    subtitle:
      "Premios, reconocimientos y menciones en publicaciones de terceros.",
    readArticle: "Leer Art\u00edculo",
    featuredIn: "Publicado En",
    items: [
      {
        title: "Ingeniero mexicano convirtió más de 200 rechazos en una oportunidad con Microsoft",
        source: "Latino Herald",
        date: "Oct 2026",
        excerpt:
          "Perfil y entrevista de Latino Herald (Seattle) sobre su camino desde León, Guanajuato, hasta un puesto de tiempo completo como ingeniero de software en Microsoft, incluyendo sus becas en Canadá y Corea del Sur y su maestría en el Tec de Monterrey.",
        url: "https://latinoherald.com/2026/10/28/ingeniero-mexicano-microsoft-200-rechazos/",
        lang: "ES",
      },
      {
        title: "Ingeniero mexicano logra empleo en Microsoft tras más de 200 rechazos",
        source: "El Congresista",
        date: "Oct 2026",
        excerpt:
          "Medio de Guanajuato que retoma su camino desde León hasta un puesto de ingeniero de software en Microsoft, incluyendo sus estudios en el extranjero.",
        url: "https://elcongresista.mx/politica/guanajuato/ingeniero-mexicano-empleo-microsoft",
        lang: "ES",
      },
      {
        title: "La Beca Global de Corea 2019 para Estudiantes Universitarios de África y América Latina Culmina con Éxito",
        source: "Dongseo University",
        date: "Ago 2019",
        excerpt:
          "\"El equipo ganador … estuvo conformado por … Carlos Ivan Ibarra Pacheco …\" — Artículo universitario cubriendo la ceremonia de premios de excelencia del programa GKS en Dongseo University, Busán, Corea del Sur.",
        url: "https://uni.dongseo.ac.kr/eng/index.php?CgCode=news&idx=370&mode=view&pCode=dsunews&pg=3",
        lang: "EN",
      },
      {
        title: "Lasallista se lleva la excelencia en proyecto de innovación en Corea del Sur",
        source: "Universidad de La Salle Bajío",
        date: "Ago 2019",
        excerpt:
          "\"Carlos Iván Ibarra Pacheco … recibe premio de excelencia …\" — Nota institucional sobre el premio recibido durante el programa de innovación GKS en Corea del Sur.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2537",
        lang: "ES",
      },
      {
        title: "Alumnos de Tecnologías ganan convocatoria de innovación",
        source: "Universidad de La Salle Bajío",
        date: "May 2019",
        excerpt:
          "\"Gonzalo Aldana Chávez y Carlos Iván Ibarra Pacheco … fueron 2 de los 20 ganadores …\" — Nota institucional reconociendo la selección para la Beca Global Coreana entre 20 ganadores.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2491",
        lang: "ES",
      },
      {
        title: "Comparten conocimiento en Concursos de investigación",
        source: "Universidad de La Salle Bajío",
        date: "2019",
        excerpt:
          "Carlos Iván Ibarra Pacheco destacado por sus contribuciones y participación en concursos de investigación académica a nivel universitario.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2924",
        lang: "ES",
      },
      {
        title: "Invierten en 'start up' — 'Now' Demo Day en el Tec de Monterrey",
        source: "Periódico AM",
        date: "Jun 2017",
        excerpt:
          "\"Uriel Hernández, Iván Ibarra y David Alcaraz desarrollaron 'Tracker me', un sistema de geolocalización vehicular…\" — Cobertura del periódico regional sobre el 5° 'Now' Demo Day en el Tec de Monterrey León, donde el equipo presentó su proyecto ante inversionistas semilla.",
        url: "https://www.am.com.mx/news/2017/06/06/invierten-en-start-up-291518.html",
        lang: "ES",
      },
    ],
  },

  social: {
    enabled: true,
    sectionLabel: "Redes",
    heading: "Sigue Mi Camino",
    subtitle:
      "La vida de un ingeniero de software mexicano en Microsoft: consejos de carrera, becas, estudiar en el extranjero y tecnología.",
    followLabel: "Seguir",
    links: [
      {
        platform: "instagram",
        handle: "@ivani.dev",
        url: "https://www.instagram.com/ivani.dev/",
        description: "Consejos de carrera, becas y vida en Seattle.",
      },
      {
        platform: "tiktok",
        handle: "@ivani.dev",
        url: "https://www.tiktok.com/@ivani.dev",
        description: "Videos cortos sobre tecnología, gadgets y trabajar en Microsoft.",
      },
    ],
  },

  notFound: {
    body: "Esta p\u00e1gina no existe.",
    back: "Volver al Inicio",
  },

  timelinePage: {
    title: "Mi Trayectoria",
    subtitle:
      "Una l\u00ednea de tiempo cronol\u00f3gica completa de mi carrera, educaci\u00f3n, logros acad\u00e9micos y certificaciones.",
    backToHome: "Volver al Inicio",
    filters: {
      all: "Todos",
      work: "Trabajo",
      education: "Educaci\u00f3n",
      milestones: "Logros",
      press: "Prensa",
    },
    typeLabels: {
      work: "Trabajo",
      education: "Educaci\u00f3n",
      award: "Premio",
      certification: "Certificaci\u00f3n",
      exchange: "Intercambio",
      press: "Prensa",
    },
    events: [
      { type: "press", title: "Ingeniero mexicano convirtió más de 200 rechazos en una oportunidad con Microsoft", subtitle: "Latino Herald", location: "Seattle, WA", period: "Oct 2026", startDate: "2026-10", description: "Perfil y entrevista sobre su camino desde León, Guanajuato, hasta un puesto de tiempo completo como ingeniero de software en Microsoft.", tags: ["Medios", "Entrevista"] },
      { type: "work", title: "Ingeniero de Software", subtitle: "Microsoft", location: "Redmond, WA", period: "Ago 2026 – Presente", startDate: "2026-08", endDate: "present", bullets: ["Regresé de tiempo completo después de la pasantía de maestría en Ingeniería de Software de 2025."], tags: [], logo: "microsoft" },
      { type: "education", title: "Graduación — Maestría en Ciberseguridad", subtitle: "Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)", location: "México", period: "2026", startDate: "2026-07", description: "Maestría en Ciberseguridad completada.", tags: ["Ciberseguridad", "Redes", "Criptografía"], logo: "itesm" },
      { type: "work", title: "Ingeniero de Software Senior / Líder Frontend", subtitle: "C Infinity Solutions", location: "Remoto, México", period: "Sep 2025 – Ago 2026", startDate: "2025-09", endDate: "2026-08", bullets: ["Regresé después de la pasantía en Microsoft para liderar la arquitectura frontend de un CMS SaaS basado en React que atiende a clientes empresariales con integraciones de Dynamics 365.", "Mentoré y guié a 3–4 ingenieros frontend a través de revisiones de código, dirección técnica y mejores prácticas en rendimiento y mantenibilidad.", "Responsable del código frontend, colaborando con equipos de producto, diseño y backend para entregar funcionalidades de alto impacto."], tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"], logo: "cinfinity", logoBg: "#0f1218" },
      { type: "work", title: "Pasantía de Maestría en Ingeniería de Software", subtitle: "Microsoft", location: "Redmond, WA", period: "Jun 2025 – Sep 2025", startDate: "2025-06", endDate: "2025-09", bullets: ["Desarrollé una aplicación en Dynamics 365 para digitalizar un proceso legal/empresarial, mejorando la eficiencia e integridad de datos.", "Creé plugins personalizados y lógica de negocio en JavaScript y C#; colaboré con stakeholders para alinear requerimientos."], tags: ["Dynamics 365", "JavaScript", "C#", "Power Platform"], logo: "microsoft" },
      { type: "certification", title: "Duolingo English Test — CEFR C1", subtitle: "Duolingo", location: "", period: "2025", startDate: "2025-02", description: "Certificación de dominio del inglés nivel CEFR C1 mediante Duolingo English Test.", tags: ["Inglés", "CEFR C1"] },
      { type: "certification", title: "Certificado IELTS", subtitle: "International English Language Testing System", location: "", period: "2025", startDate: "2025-01", description: "Certificación internacional de dominio del inglés.", tags: ["Inglés", "IELTS"] },
      { type: "work", title: "Ingeniero de Software Senior / Líder Frontend", subtitle: "C Infinity Solutions", location: "Remoto, México", period: "Oct 2024 – May 2025", startDate: "2024-10", endDate: "2025-05", bullets: ["Lideré la arquitectura frontend de un CMS SaaS basado en React, definiendo patrones escalables, manejo de estado y componentes reutilizables.", "Mentoré y guié a 3–4 ingenieros frontend a través de revisiones de código, dirección técnica y mejores prácticas en rendimiento y mantenibilidad.", "Responsable del código frontend, colaborando con equipos de producto, diseño y backend para entregar funcionalidades de alto impacto."], tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"], logo: "cinfinity", logoBg: "#0f1218" },
      { type: "education", title: "Inicio de Maestría en Ciberseguridad", subtitle: "Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)", location: "México", period: "Ago 2024 – 2026", startDate: "2024-08", description: "Maestría en Ciberseguridad de dos años, completada en 2026.", tags: ["Ciberseguridad", "Redes", "Criptografía"], logo: "itesm" },
      { type: "work", title: "Ingeniero de Software Senior", subtitle: "Drift", location: "Guadalajara, México", period: "Mar 2023 – Nov 2024", startDate: "2023-03", endDate: "2024-11", bullets: ["Mantuve y mejoré la librería del Sistema de Diseño, asegurando consistencia y experiencias de usuario de alta calidad en toda la plataforma.", "Colaboré con el equipo de Analytics para crear, mejorar y refinar reportes usando Highcharts, Cube, React, TypeScript y la librería interna del Sistema de Diseño.", "Desarrollé componentes personalizados desde cero, incluyendo diagramas de Gantt y otras visualizaciones avanzadas, para entregar reportes analíticos detallados y pulidos."], tags: ["React", "TypeScript", "Highcharts", "Cube", "Design System", "Jest", "Agile/Scrum"], logo: "drift", logoBg: "#ffffff" },
      { type: "work", title: "Ingeniero de Software III", subtitle: "Wizeline", location: "Guadalajara, México", period: "Jun 2022 – Mar 2023", startDate: "2022-06", endDate: "2023-03", bullets: ["Fungí como Tech Lead en el lanzamiento greenfield de Arc XP para The Baltimore Banner, un startup de noticias sin fines de lucro reconocido a nivel nacional ($50M+ en fondos).", "Coordiné entre equipos de diseño, gestión y desarrollo como líder frontend; la publicación creció a más de 30,000 suscriptores de pago en su primer año."], tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"], logo: "wizeline" },
      { type: "work", title: "Ingeniero de Software II", subtitle: "Wizeline", location: "Guadalajara, México", period: "Oct 2021 – Jun 2022", startDate: "2021-10", endDate: "2022-06", bullets: ["Contratado para una importante empresa de noticias en EE.UU., entregando soluciones frontend y desarrollando componentes en React para clientes ubicados principalmente en EE.UU. y Canadá.", "Configuré, mantuve y añadí funcionalidades a plataformas basadas en Arc XP, asegurando integraciones CMS de alta calidad y experiencias de usuario responsivas."], tags: ["React", "Arc XP", "SCSS", "TypeScript", "CMS"], logo: "wizeline" },
      { type: "work", title: "Ingeniero de Software I", subtitle: "Wizeline", location: "Guadalajara, México", period: "Oct 2020 – Sep 2021", startDate: "2020-10", endDate: "2021-09", bullets: ["Migré WPLG Local10.com (el sitio #1 de ABC en Miami, 5–10M visitantes mensuales) de un CMS legacy a Arc XP, desarrollando login social (OAuth), optimizaciones SEO y mejoras en Core Web Vitals.", "Participé en bootcamps de Wizeline y proyectos de herramientas internas; contribuí como contractor para la plataforma Arc XP del Washington Post."], tags: ["React", "Arc XP", "SEO", "OAuth", "JavaScript", "Go"], logo: "wizeline" },
      { type: "education", title: "Graduación — Licenciatura en Ingeniería de Software y Computación", subtitle: "Universidad de La Salle Bajío", location: "México", period: "Jul 2020", startDate: "2020-07", description: "Licenciatura en Ingeniería de Software y Computación completada.", tags: ["Ingeniería de Software", "Ciencias de la Computación"], logo: "lasalle" },
      { type: "work", title: "Desarrollador Frontend", subtitle: "GPAC", location: "Remoto, México", period: "Abr 2020 – Oct 2020", startDate: "2020-04", endDate: "2020-10", bullets: ["Desarrollé el proyecto \u201cFortPAC\u201d, un sistema web a medida que automatiza el proceso de reclutamiento y reemplazó el sistema legacy \u201cPCR\u201d, mejorando la productividad de los reclutadores.", "Construí componentes escalables en React siguiendo principios de Atomic Design con manejo de estado Redux, Material UI y testing con Enzyme."], tags: ["React", "Redux", "Material UI", "Enzyme", "Atomic Design", "Azure DevOps"], logo: "gpac", logoBg: "#ffffff" },
      { type: "award", title: "Premio de Excelencia — Beca Global Coreana", subtitle: "Instituto Nacional de Educación Internacional (NIIED)", location: "Corea del Sur", period: "Ago 2019", startDate: "2019-08", description: "Premiado por la mejor presentación de proyecto durante el Programa Final GKS en Dongseo University.", tags: ["GKS", "Investigación", "Presentación"], logo: "dongseo" },
      { type: "press", title: "Programa GKS Culmina con Éxito", subtitle: "Dongseo University", location: "Corea del Sur", period: "Ago 2019", startDate: "2019-08", description: "Artículo universitario cubriendo la ceremonia de premios de excelencia del programa GKS, mencionando a los miembros del equipo ganador.", tags: ["GKS", "Noticias Universitarias"], logo: "dongseo" },
      { type: "press", title: "Lasallista Gana Premio de Excelencia en Corea del Sur", subtitle: "Universidad de La Salle Bajío", location: "México", period: "Ago 2019", startDate: "2019-08", description: "Nota institucional sobre el premio de excelencia recibido durante el programa de innovación GKS en Corea del Sur.", tags: ["GKS", "Noticias Universitarias"], logo: "lasalle" },
      { type: "exchange", title: "Beca GKS para Programa LATAM en Tecnología", subtitle: "Dongseo University", location: "Corea del Sur", period: "Jun 2019 – Ago 2019", startDate: "2019-06", endDate: "2019-08", description: "Programa internacional de becas en tecnología para estudiantes latinoamericanos en Dongseo University, Busán.", tags: ["GKS", "Tecnología", "Internacional"], logo: "dongseo" },
      { type: "press", title: "Alumnos de Tecnologías Ganan Convocatoria de Innovación", subtitle: "Universidad de La Salle Bajío", location: "México", period: "May 2019", startDate: "2019-05", description: "Nota institucional reconociendo la selección para la Beca Global Coreana entre 20 ganadores a nivel nacional.", tags: ["GKS", "Noticias Universitarias"], logo: "lasalle" },
      { type: "press", title: "Comparten Conocimiento en Concursos de Investigación", subtitle: "Universidad de La Salle Bajío", location: "México", period: "2019", startDate: "2019-01", description: "Destacado por contribuciones y participación en concursos de investigación académica a nivel universitario.", tags: ["Investigación", "Noticias Universitarias"], logo: "lasalle" },
      { type: "work", title: "Desarrollador de Software", subtitle: "CBQA Solutions", location: "León, México", period: "Sep 2018 – Abr 2020", startDate: "2018-09", endDate: "2020-04", bullets: ["Desarrollé el sitio web de CBQA Solutions (React, SASS, Material UI) y una aplicación móvil multiplataforma (React Native, Enzyme, Jest).", "Rediseñé y compilé billeteras de criptomonedas (PAC Coin / PAC Global y XOAT Coin) para Windows, Linux y macOS usando C++, Qt5 y Gitian Builder.", "Construí un dashboard interno con Smashing para las pantallas de la empresa usando Ruby, CoffeeScript y APIs de Google Calendar."], tags: ["React", "React Native", "C++", "Qt5", "Ruby", "SASS", "Material UI", "Jest"], logo: "cbqa", logoBg: "#ffffff" },
      { type: "exchange", title: "Intercambio Académico en Ciencias de la Computación", subtitle: "University of Regina", location: "Canadá", period: "Sep 2017 – Abr 2018", startDate: "2017-09", endDate: "2018-04", description: "Programa de intercambio académico internacional en Ciencias de la Computación en la University of Regina, Saskatchewan, Canadá.", tags: ["Ciencias de la Computación", "Intercambio", "Internacional"], logo: "uofregina" },
      { type: "press", title: "Invierten en Start-ups — Demo Day 'Now' en el Tec de Monterrey", subtitle: "Periódico AM", location: "México", period: "Jun 2017", startDate: "2017-06", description: "Cobertura del periódico regional sobre el 5° Demo Day 'Now' en el Tec de Monterrey León, donde el equipo presentó 'Tracker me', un sistema de geolocalización vehicular, ante inversionistas semilla.", tags: ["Startup", "Demo Day", "Medios"], logo: "itesm" },
      { type: "education", title: "Inicio de Licenciatura en Ingeniería de Software y Computación", subtitle: "Universidad de La Salle Bajío", location: "México", period: "Ago 2016", startDate: "2016-08", description: "Inicio de la Licenciatura en Ingeniería de Software y Computación.", tags: ["Ingeniería de Software", "Ciencias de la Computación"], logo: "lasalle" },
    ],
  },
};
