
import { 
  Book, 
  Code2, 
  Cpu, 
  FileCode2, 
  Terminal, 
  Laptop, 
  Server, 
  Check, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Briefcase, 
  Users,
  Award,
  Image,
  CircleUser,
  BookOpen,
  Folder,
  Database,
  Layers
} from "lucide-react";

// Skill section data
export const frontendSkills = [
  { skill: 'React / Next.js', percentage: 85 },
  { skill: 'TypeScript', percentage: 80 },
  { skill: 'Tailwind CSS', percentage: 90 },
  { skill: 'Framer Motion', percentage: 75 },
];

export const backendSkills = [
  { skill: 'Node.js', percentage: 70 },
  { skill: 'MongoDB', percentage: 65 },
];

export const frameworks = [
  'Vue.js',
  'Svelte',
  'Astro',
  'Remix',
  'Gatsby',
  'Nuxt.js',
  'SvelteKit',
  'Vite',
  'Webpack',
  'Babel',
  'ESLint',
  'Prettier',
  'Git'
];

// Stats data
export const statsData = [
  { title: '2+', subtitle: 'Roky zkušeností', delay: 0 },
  { title: '10+', subtitle: 'Dokončených projektů', delay: 0.1 },
  { title: '5+', subtitle: 'Spokojených klientů', delay: 0.2 },
  { title: '3+', subtitle: 'Open source příspěvků', delay: 0.3 },
];

// Tech stack data
export const techStackData = [
  {
    title: 'Frontend',
    icon: FileCode2,
    items: 'React, TypeScript, Next.js, Tailwind CSS, Framer Motion',
    color: 'primary'
  },
  {
    title: 'Backend',
    icon: Terminal,
    items: 'Node.js, MongoDB',
    color: 'accent'
  },
  {
    title: 'Nástroje',
    icon: Laptop,
    items: 'Git, Figma, Linux, Bash, VS Code',
    color: 'primary'
  },
];

// Philosophy data
export const philosophyItems = [
  'Píšu čistý, modulární kód, který je snadné udržovat a škálovat.',
  'Upřednostňuji přístupnost a výkon ve všem, co vytvářím.',
  'Využívám moderní nástroje a technologie pro efektivní vývoj.',
  'Neustále se učím novým technologiím, abych zůstal v popředí webového vývoje.'
];

// Hobby data
export const hobbyItems = [
  'Home labbing - experimenty s domácími servery a sítěmi',
  'Automatizace pomocí skriptů a self-hosted aplikací',
  'Linux systémy a open source software',
  'Arduino a IoT projekty pro chytrou domácnost'
];

// Project data with enhanced information
export const projects = [
  {
    id: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    description: 'Komplexní administrační rozhraní pro správu produktů, objednávek a zákazníků vytvořené s React a Tailwind CSS.',
    longDescription: 'Tento e-commerce dashboard poskytuje majitelům obchodů výkonné nástroje pro správu jejich online podnikání. Dashboard zahrnuje analytiku v reálném čase, správu inventáře, zpracování objednávek a nástroje pro řízení vztahů se zákazníky.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'TailwindCSS', 'Redux', 'Chart.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: '12.03.2024',
    type: 'client',
    price: '45 000 Kč',
    clientNotes: 'Klient potřeboval řešení, které by zefektivnilo jeho e-commerce operace a poskytlo využitelné poznatky z jejich prodejních dat.',
    technicalDetails: [
      'Vytvořeno s React a TypeScript pro robustní typovou bezpečnost',
      'Správa stavu pomocí Redux pro předvídatelné aktualizace stavu',
      'Chart.js pro vizualizaci dat',
      'Responzivní UI vytvořené s Tailwind CSS',
      'Integrace REST API s backendem'
    ],
    challenges: [
      'Komplexní datové vztahy mezi produkty, objednávkami a zákazníky',
      'Aktualizace v reálném čase pro změny stavu objednávek',
      'Optimalizace výkonu pro velké datové sady'
    ],
    solutions: [
      'Implementována normalizovaná datová struktura pro efektivní správu stavu',
      'Použití WebSockets pro oznámení a aktualizace v reálném čase',
      'Přidání stránkování a virtualizace pro velké datové tabulky'
    ]
  },
  {
    id: 'task-management',
    title: 'Aplikace pro Správu Úkolů',
    description: 'Produktivní aplikace pro organizaci úkolů s funkcí drag-and-drop a aktualizacemi v reálném čase.',
    longDescription: 'Tato aplikace pro správu úkolů pomáhá týmům zůstat organizovanými díky intuitivním úkolovým nástěnkám, seznamům a kartám. Uživatelé mohou snadno přesouvat úkoly mezi různými fázemi, nastavovat termíny dokončení, přiřazovat úkoly členům týmu a sledovat pokrok v reálném čase.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=280&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Framer Motion'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: '05.02.2024',
    type: 'personal',
    price: null,
    technicalDetails: [
      'Next.js pro vykreslování na straně serveru a vylepšené SEO',
      'TypeScript pro typovou bezpečnost',
      'Prisma ORM pro databázové operace',
      'Framer Motion pro plynulé animace',
      'Aktualizace v reálném čase pomocí WebSockets'
    ],
    challenges: [
      'Implementace drag-and-drop s přechodem na mobilní zobrazení',
      'Udržování synchronizace mezi více uživateli v reálném čase',
      'Efektivní ukládání a načítání úkolových seznamů'
    ],
    solutions: [
      'Vlastní hook pro drag-and-drop s detekcí zařízení',
      'WebSocket komunikace pro okamžité aktualizace napříč klienty',
      'Optimalizované databázové dotazy s vrstvou mezipaměti'
    ]
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Mobilně responzivní aplikace pro sledování tréninků a výživy s vizualizací dat a sledováním pokroku.',
    longDescription: 'Fitness Tracker je komplexní aplikace, která umožňuje uživatelům sledovat jejich tréninky, nutriční příjem a celkový fitness pokrok. Aplikace nabízí přizpůsobitelné tréninky, podrobné statistiky výkonu a vizualizace dat pro lepší pochopení vašeho fitness vývoje.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop&q=80',
    tags: ['React Native', 'Firebase', 'Expo', 'D3.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: '18.04.2024',
    type: 'client',
    price: '38 500 Kč',
    clientNotes: 'Klient chtěl moderní fitness aplikaci, která by oslovila mladší publikum a poskytla pokročilé sledování pokroku s důrazem na dobrou vizuální prezentaci dat.',
    technicalDetails: [
      'React Native pro nativní mobilní vývoj',
      'Firebase pro backend, autentizaci a databázi v reálném čase',
      'D3.js pro pokročilé datové vizualizace a grafy',
      'Expo pro zjednodušení vývoje a distribuce',
      'Offline režim s lokálním ukládáním dat'
    ],
    challenges: [
      'Synchronizace dat mezi offline a online režimem',
      'Vytvoření přesných a užitečných vizualizací fitness dat',
      'Optimalizace výkonu na starších zařízeních'
    ],
    solutions: [
      'Implementace robustní synchronizační vrstvy s konfliktním řešením',
      'Vlastní D3.js komponenty pro interaktivní grafy a vizualizace',
      'Agresivní lazy loading a vylepšení výkonu pro starší zařízení'
    ]
  },
];

// Separate upcoming projects for better organization
export const upcomingProjects = [
  {
    id: 'ai-assistant',
    title: 'AI Asistent Platforma',
    description: 'Platforma AI asistenta, která pomáhá firmám automatizovat zákaznickou podporu pokročilým zpracováním přirozeného jazyka.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'Node.js', 'Machine Learning', 'WebSockets'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-08-15',
    type: 'personal',
    price: null,
    technicalDetails: [
      'React a TypeScript pro frontend',
      'Node.js a Express backend',
      'Integrace s OpenAI API pro zpracování přirozeného jazyka',
      'WebSocket pro real-time komunikaci',
      'MongoDB pro ukládání konverzací a zpětnou vazbu'
    ]
  },
  {
    id: 'virtual-classroom',
    title: 'Virtuální Učebna',
    description: 'Interaktivní platforma pro online vzdělávání s podporou živých lekcí, kvízů a sledování pokroku studentů.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'WebRTC', 'Firebase', 'Redux'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-10-30',
    type: 'client',
    price: null,
    technicalDetails: [
      'WebRTC pro živé video přenosy',
      'Firebase Realtime Database pro sdílení dat v reálném čase',
      'Redux pro správu stavu aplikace',
      'Analytické nástroje pro sledování pokroku studentů'
    ]
  },
  {
    id: 'crypto-dashboard',
    title: 'Krypto Dashboard',
    description: 'Analytický nástroj pro sledování kryptoměnových trhů s pokročilými grafy a alertovým systémem.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&h=280&fit=crop&q=80',
    tags: ['Next.js', 'D3.js', 'Web3', 'TailwindCSS'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-09-12',
    type: 'personal',
    price: null,
    technicalDetails: [
      'Next.js pro SSR a optimalizaci výkonu',
      'D3.js pro komplexní finanční grafy',
      'Web3.js pro interakci s blockchain sítěmi',
      'Websocket API pro aktualizace cen v reálném čase'
    ]
  },
  {
    id: 'smart-home',
    title: 'Smart Home Kontrolní Panel',
    description: 'Řídicí panel pro správu chytré domácnosti s podporou populárních IoT zařízení a hlasových asistentů.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'MQTT', 'Electron', 'Node.js'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-11-25',
    type: 'client',
    price: null,
    technicalDetails: [
      'React pro frontend aplikace',
      'MQTT protokol pro komunikaci s IoT zařízeními',
      'Electron pro multi-platformní desktop aplikaci',
      'Node.js backend s integracemi na různé služby a API'
    ]
  }
];

// Social links
export const socialLinks = [
  { name: 'Github', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Email', url: 'mailto:info@jannovak.cz', icon: Mail },
  { name: 'Phone', url: 'tel:+420123456789', icon: Phone }
];

// Section metadata
export const sectionMeta = {
  hero: {
    title: "Vytvářím digitální zážitky, které lidé milují",
    subtitle: "Frontend Vývojář & UI/UX Designer",
    description: "Vytvářím moderní webové aplikace s Reactem a Next.js, se zaměřením na výkon, přístupnost a skvělý uživatelský zážitek."
  },
  about: {
    title: "O Mně",
    subtitle: "Student s vášní pro webový vývoj a technologie",
    journey: "Moje Cesta",
    journeyText: [
      "Jako student experimentující s webovým vývojem mám velký zájem o vytváření moderních, přístupných a vizuálně atraktivních webových aplikací. Neustále se vzdělávám a hledám nové příležitosti k rozšíření svých dovedností.",
      "Momentálně hledám zákazníky pro své první komerční projekty, kde mohu aplikovat nabyté znalosti a dále růst jako vývojář. Mým cílem je poskytovat kvalitní webové služby za dostupné ceny, zejména pro začínající podnikatele a malé firmy.",
      "Když nekóduji, najdete mě při experimentování s novým hardwarem, konfigurací síťových služeb nebo při studiu odborné literatury. Vždy hledám nové výzvy a příležitosti k osobnímu i profesnímu růstu."
    ],
    codingPhilosophy: {
      title: "Moje Kódovací Filosofie",
      icon: Code2,
    },
    techHobbies: {
      title: "Moje IT Koníčky",
      icon: Server,
    },
    myStack: {
      title: "Můj Vývojový Stack",
      icon: Cpu,
    },
    contact: {
      ctaText: "Spolupracujme"
    }
  },
  skills: {
    title: "Moje Dovednosti",
    subtitle: "Technologie a nástroje, se kterými rád pracuji",
    frontend: {
      title: "Frontend Vývoj",
      icon: Code2
    },
    backend: {
      title: "Backend Vývoj",
      icon: Database
    },
    tools: {
      title: "Frameworky a Nástroje",
      icon: Layers
    }
  },
  projects: {
    title: "Moje Projekty",
    subtitle: "Podívejte se na některé mé nedávné práce",
    upcomingTitle: "Připravované Projekty",
    moreText: "Chcete vidět více mé práce?",
    githubText: "Navštivte Můj GitHub"
  },
  contact: {
    title: "Kontaktujte Mě",
    subtitle: "Pojďme společně vytvořit něco úžasného",
    ctaText: "Spolupracujme"
  },
  footer: {
    tagline: "Tvořím výjimečné digitální zážitky",
    copyright: "Všechna práva vyhrazena."
  }
};
