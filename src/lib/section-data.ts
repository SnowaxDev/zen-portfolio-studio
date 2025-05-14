
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
  BriefCase, 
  Users,
  Award,
  Image,
  CircleUser,
  BookOpen,
  Folder
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

// Project data
export const projects = [
  {
    id: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    description: 'Komplexní administrační rozhraní pro správu produktů, objednávek a zákazníků vytvořené s React a Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'TailwindCSS', 'Redux', 'Chart.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'client'
  },
  {
    id: 'task-management',
    title: 'Aplikace pro Správu Úkolů',
    description: 'Produktivní aplikace pro organizaci úkolů s funkcí drag-and-drop a aktualizacemi v reálném čase.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=280&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Framer Motion'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'personal'
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Mobilně responzivní aplikace pro sledování tréninků a výživy s vizualizací dat a sledováním pokroku.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=280&fit=crop&q=80',
    tags: ['React Native', 'Firebase', 'Expo', 'D3.js'],
    link: '#',
    github: '#',
    isUpcoming: false,
    launchDate: null,
    type: 'client'
  },
  {
    id: 'ai-assistant',
    title: 'AI Asistent Platforma',
    description: 'Připravovaná platforma AI asistenta, která pomáhá firmám automatizovat zákaznickou podporu pokročilým zpracováním přirozeného jazyka.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=280&fit=crop&q=80',
    tags: ['React', 'Node.js', 'Machine Learning', 'WebSockets'],
    link: null,
    github: null,
    isUpcoming: true,
    launchDate: '2025-08-15',
    type: 'personal'
  },
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
      icon: CodeIcon,
    },
    techHobbies: {
      title: "Moje IT Koníčky",
      icon: Server,
    },
    myStack: {
      title: "Můj Vývojový Stack",
      icon: Cpu,
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
