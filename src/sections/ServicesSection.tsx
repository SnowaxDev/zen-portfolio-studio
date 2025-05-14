
import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Package, Rocket, Crown, Clock, ArrowRight,
  Layout, Zap, Code, ChevronDown, ChevronUp, Laptop,
  ArrowLeft, Plus, Shield, Briefcase, Sparkles, Palette,
  Database, Search, Server, Smartphone
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../components/ScrollReveal';
import { Card, CardContent } from '../components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '../components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

type Plan = 'monthly' | 'yearly';
type PricingTab = 'individual' | 'business';
type ServiceTab = 'web' | 'design' | 'maintenance';

// Enhanced pricing card with more features and animations
const PricingCard = ({ 
  title, 
  price,
  yearlyPrice,
  description, 
  features, 
  isPopular = false,
  icon: Icon = Package,
  callToAction = "Objednat",
  plan,
  isBusiness = false,
  category = 'web',
  compareFeature,
}: { 
  title: string;
  price: string;
  yearlyPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  icon?: React.ElementType;
  callToAction?: string;
  plan: Plan;
  isBusiness?: boolean;
  category?: string;
  compareFeature?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`relative rounded-xl shadow-lg transition-all duration-500 h-full ${
        isPopular 
          ? "bg-gradient-to-br from-primary/90 to-accent/90 text-white border-0 shadow-xl shadow-primary/20" 
          : "bg-card border border-border hover:border-accent/50 dark:bg-card/60 dark:backdrop-blur-sm"
      }`}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {isPopular && (
        <div 
          className="absolute -top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        >
          <motion.div
            animate={{ scale: isHovered ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
          >
            Nejoblíbenější
          </motion.div>
        </div>
      )}
      
      <div className="p-7">
        <div className="flex items-center mb-4">
          <motion.div 
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full mr-3",
              isPopular ? "bg-white/20" : "bg-primary/10"
            )}
            animate={{ 
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 1.5 }}
          >
            <Icon className={cn("h-6 w-6", isPopular ? "text-white" : "text-primary")} />
          </motion.div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex items-end">
            <span className="text-3xl font-bold">{plan === 'monthly' ? price : yearlyPrice || price}</span>
            <span className="text-sm opacity-80 ml-1">
              {price !== "Dle nabídky" && (
                plan === 'monthly' ? "/měsíc" : "/rok"
              )}
            </span>
          </div>
          {plan === 'yearly' && price !== "Dle nabídky" && (
            <p className="text-xs mt-1 text-emerald-400">
              <span className="font-bold">Ušetříte 20%</span> oproti měsíční platbě
            </p>
          )}
        </div>
        
        <p className="text-sm mb-6 opacity-90">{description}</p>
        
        <motion.ul 
          className="space-y-3 mb-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            },
            hidden: {}
          }}
        >
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex text-sm items-start gap-2"
              variants={{
                visible: { 
                  opacity: 1,
                  y: 0,
                },
                hidden: { 
                  opacity: 0,
                  y: 10,
                }
              }}
              transition={{
                duration: 0.3
              }}
            >
              <Check className="mr-1 h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <button 
            className={`w-full py-2.5 px-4 rounded-md flex items-center justify-center transition-all ${
              isPopular 
                ? "bg-white text-accent hover:bg-white/90" 
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {callToAction} 
            <motion.div
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
        
        {compareFeature && (
          <motion.div
            className="mt-4 text-xs text-center opacity-70 italic"
            animate={{ 
              opacity: isHovered ? 0.9 : 0.7 
            }}
          >
            {compareFeature}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced process step with animations and more details
const ProcessStep = ({
  number,
  title,
  duration,
  description,
  isLast = false
}: {
  number: number;
  title: string;
  duration: string;
  description: string;
  isLast?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <ScrollReveal 
      direction="left"
      className="flex gap-4 relative"
      delay={number * 0.1}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white z-10 shadow-lg shadow-primary/30"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 15px 0 rgba(111, 76, 255, 0.5)"
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <span className="font-bold text-lg">{number}</span>
        </motion.div>
        {!isLast && (
          <motion.div 
            className="w-1 grow bg-gradient-to-b from-primary/50 to-accent/30 mt-2 rounded-full"
            animate={{ 
              height: isHovered ? '100%' : '100%',
              opacity: isHovered ? 1 : 0.5
            }}
          ></motion.div>
        )}
      </div>
      <div className="pb-10 pt-1">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold mr-2">{title}</h3>
          <motion.span 
            className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full inline-block"
            animate={{ 
              scale: isHovered ? 1.05 : 1,
              backgroundColor: isHovered ? "rgba(255, 120, 240, 0.3)" : "rgba(255, 120, 240, 0.2)"
            }}
          >
            <Clock className="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" />
            {duration}
          </motion.span>
        </div>
        <motion.p 
          className="text-muted-foreground"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)"
          }}
        >
          {description}
        </motion.p>
      </div>
    </ScrollReveal>
  );
};

// Enhanced service card with hover effects and animations
const AdditionalServiceCard = ({
  icon: Icon,
  title,
  description,
  index = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div 
        className="overflow-hidden rounded-xl border border-border/30 dark:border-white/5 bg-card hover:shadow-xl transition-all duration-500 h-full group"
        whileHover={{ 
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderColor: "rgba(111, 76, 255, 0.3)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="p-6 h-full flex flex-col">
          <motion.div 
            className="mb-4 bg-gradient-to-br from-primary/20 to-accent/20 w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden"
            animate={{ 
              backgroundColor: isHovered ? "rgba(111, 76, 255, 0.3)" : "rgba(111, 76, 255, 0.1)",
              rotate: isHovered ? 5 : 0
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100"
              animate={{
                scale: isHovered ? [1, 1.5, 1] : 1
              }}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
            />
            <Icon className="h-7 w-7 text-primary group-hover:text-primary" />
          </motion.div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

// FAQ component with accordion functionality
const FaqItem = ({ question, answer, index = 0 }: { question: string; answer: string; index?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className={`bg-card transition-all duration-300 rounded-lg overflow-hidden border border-border/30 mb-4 ${isOpen ? 'shadow-lg' : 'hover:shadow-md'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button 
            className="flex justify-between items-center w-full p-6 text-left font-medium focus:outline-none"
          >
            <h4 className="font-bold text-lg">{question}</h4>
            <div className="flex-shrink-0 ml-2">
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-accent" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary" />
              )}
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div 
            className="px-6 pb-6 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {answer}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

// Enhanced ServicesSection component with more features and improved UI/UX
const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<ServiceTab>('web');
  const [pricingPlan, setPricingPlan] = useState<Plan>('monthly');
  const [pricingTab, setPricingTab] = useState<PricingTab>('individual');
  
  // Service data organized in a more structured way
  const serviceData = useMemo(() => ({
    pricing: {
      individual: {
        web: [
          {
            title: "Základní Web",
            icon: Layout,
            price: "9 999 Kč",
            yearlyPrice: "95 990 Kč",
            description: "Perfektní pro malé firmy, které chtějí vytvořit profesionální online přítomnost.",
            features: [
              "5-stránkový responzivní web",
              "Design optimalizovaný pro mobily",
              "Základní SEO optimalizace",
              "Kontaktní formulář",
              "Propojení se sociálními sítěmi",
              "2 kola revizí",
              "Základní analytika návštěvnosti"
            ],
            callToAction: "Objednat"
          },
          {
            title: "Pokročilý Web",
            icon: Rocket,
            price: "19 999 Kč",
            yearlyPrice: "191 990 Kč",
            description: "Ideální pro firmy, které potřebují více funkcí a vlastních prvků.",
            features: [
              "10-stránkový responzivní web",
              "Pokročilý UI/UX design",
              "Systém správy obsahu (CMS)",
              "Pokročilý SEO balíček",
              "Integrace analytiky",
              "Optimalizace výkonu",
              "3 kola revizí"
            ],
            isPopular: true,
            callToAction: "Objednat"
          },
          {
            title: "Vlastní Webová Aplikace",
            icon: Code,
            price: "Dle nabídky",
            description: "Pro firmy vyžadující řešení na míru s pokročilými funkcemi.",
            features: [
              "Vlastní webová aplikace",
              "Uživatelská autentizace",
              "Integrace databáze",
              "Integrace API třetích stran",
              "Administrátorský dashboard",
              "Balíček údržby",
              "Neomezené revize"
            ],
            callToAction: "Vyžádat nabídku"
          }
        ],
        design: [
          {
            title: "UX Design Audit",
            icon: Palette,
            price: "4 999 Kč",
            yearlyPrice: "47 990 Kč",
            description: "Kompletní analýza vašeho současného webu se zaměřením na uživatelský zážitek.",
            features: [
              "Detailní analýza použitelnosti",
              "Identifikace problémových míst",
              "Heatmapy a analýza pohybu",
              "Testování s reálnými uživateli",
              "Podrobná zpráva s doporučeními",
              "30-minutová konzultace",
              "Prioritizovaný seznam úprav"
            ],
            callToAction: "Objednat Audit"
          },
          {
            title: "UI Design Balíček",
            icon: Sparkles,
            price: "12 999 Kč",
            yearlyPrice: "124 790 Kč",
            description: "Kompletní vizuální identita pro vaši digitální přítomnost vytvořená na míru.",
            features: [
              "Vizuální styl a stylový průvodce",
              "Design systém s komponentami",
              "Mobilní a desktop návrhy",
              "Interaktivní prototypy",
              "Zdrojové soubory (Figma)",
              "Neomezené iterace návrhu",
              "Brand identity konzultace"
            ],
            isPopular: true,
            callToAction: "Objednat Design"
          },
          {
            title: "Kompletní Redesign",
            icon: Zap,
            price: "24 999 Kč",
            yearlyPrice: "239 990 Kč",
            description: "Komplexní přepracování vašeho webu včetně UX výzkumu a implementace.",
            features: [
              "UX výzkum a analýza",
              "Návrh nové informační architektury",
              "Kompletní UI design",
              "Responzivní design pro všechna zařízení",
              "Implementace v HTML/CSS/JS",
              "Optimalizace konverzního poměru",
              "Testování s uživateli po redesignu"
            ],
            callToAction: "Objednat Redesign"
          }
        ],
        maintenance: [
          {
            title: "Základní Údržba",
            icon: Shield,
            price: "999 Kč",
            yearlyPrice: "9 590 Kč",
            description: "Měsíční údržba zajišťující bezpečnost a funkčnost vašeho webu.",
            features: [
              "Bezpečnostní aktualizace",
              "Zálohování dat",
              "Monitoring dostupnosti",
              "Základní technická podpora",
              "Měsíční report stavu",
              "Reakční doba do 48 hodin",
              "1 hodina drobných úprav měsíčně"
            ],
            callToAction: "Aktivovat"
          },
          {
            title: "Pokročilá Správa",
            icon: Server,
            price: "2 499 Kč",
            yearlyPrice: "23 990 Kč",
            description: "Kompletní správa vašeho webu včetně technické podpory a aktualizací obsahu.",
            features: [
              "Vše ze základní údržby",
              "Proaktivní monitoring výkonu",
              "Aktualizace pluginů a CMS",
              "SEO monitoring a optimalizace",
              "Prioritní technická podpora",
              "Reakční doba do 24 hodin",
              "3 hodiny úprav obsahu měsíčně"
            ],
            isPopular: true,
            callToAction: "Aktivovat"
          },
          {
            title: "Prémiová Péče",
            icon: Crown,
            price: "4 999 Kč",
            yearlyPrice: "47 990 Kč",
            description: "Kompletní VIP servis pro kritické webové projekty s garantovanou dostupností.",
            features: [
              "Vše z pokročilé správy",
              "Dedikovaný správce webu",
              "Garantovaná dostupnost 99.9%",
              "24/7 pohotovostní linka",
              "Reakční doba do 2 hodin",
              "8 hodin úprav obsahu měsíčně",
              "Měsíční konzultace a strategické plánování"
            ],
            callToAction: "Aktivovat VIP"
          }
        ]
      },
      business: {
        web: [
          {
            title: "Firemní Prezentace",
            icon: Briefcase,
            price: "29 999 Kč",
            yearlyPrice: "287 990 Kč",
            description: "Profesionální firemní web pro střední a velké společnosti s důrazem na konverze.",
            features: [
              "15-stránkový responzivní web",
              "Premium UI/UX design",
              "Pokročilý CMS systém",
              "Integrace CRM systémů",
              "Kompletní SEO optimalizace",
              "Vícejazyčná podpora",
              "Školení pro zaměstnance"
            ],
            callToAction: "Vyžádat nabídku"
          },
          {
            title: "E-commerce Řešení",
            icon: Package,
            price: "49 999 Kč",
            yearlyPrice: "479 990 Kč",
            description: "Komplexní e-shop na míru s pokročilými funkcemi pro maximalizaci prodejů.",
            features: [
              "Neomezený počet produktů",
              "Integrovaný platební systém",
              "Napojení na účetní software",
              "Správa skladových zásob",
              "Automatizace marketingu",
              "Věrnostní program",
              "Analýza nákupního chování"
            ],
            isPopular: true,
            callToAction: "Vyžádat nabídku"
          },
          {
            title: "Enterprise Portál",
            icon: Database,
            price: "Od 99 999 Kč",
            yearlyPrice: "Od 959 990 Kč",
            description: "Komplexní podnikové řešení pro interní systémy a digitalizaci procesů.",
            features: [
              "Analýza a optimalizace procesů",
              "Intranet / Extranet řešení",
              "Role-based přístupový systém",
              "Integrace s podnikovými systémy",
              "Business Intelligence dashboardy",
              "Automatizace workflow",
              "Dedikovaný vývojový tým"
            ],
            callToAction: "Domluvit konzultaci"
          }
        ]
      }
    },
    additionalServices: [
      {
        icon: Layout,
        title: "Redesign webu",
        description: "Oživte svůj stávající web moderním designem, který zvýší konverze a zapůsobí na návštěvníky."
      },
      {
        icon: Zap,
        title: "Optimalizace rychlosti",
        description: "Zrychlete svůj web pro lepší uživatelský zážitek a vyšší pozice ve vyhledávačích."
      },
      {
        icon: Search,
        title: "SEO konzultace",
        description: "Analýza a implementace strategií pro lepší viditelnost ve vyhledávačích."
      },
      {
        icon: Code,
        title: "Jednorázové úpravy",
        description: "Potřebujete rychlou změnu nebo opravu na vašem webu? Nabízím i jednorázové úpravy."
      },
      {
        icon: Smartphone,
        title: "Mobilní optimalizace",
        description: "Přizpůsobení vašeho webu pro dokonalé zobrazení na mobilních telefonech a tabletech."
      },
      {
        icon: Server,
        title: "Migrace a hosting",
        description: "Bezpečná migrace vašeho stávajícího webu na rychlejší a spolehlivější hosting."
      },
    ],
    developmentProcess: [
      {
        number: 1,
        title: "Objevování a Plánování",
        duration: "2-3 dny",
        description: "Začínáme důkladnou konzultací, abychom pochopili vaše obchodní cíle, cílovou skupinu a požadavky projektu. Poté vytvoříme podrobný plán pro váš projekt."
      },
      {
        number: 2,
        title: "Design a Prototypování",
        duration: "3-5 dnů",
        description: "Na základě požadavků vytvoříme wireframy a vizuální návrhy ke schválení. Dostanete interaktivní prototypy pro vizualizaci finálního produktu."
      },
      {
        number: 3,
        title: "Vývoj",
        duration: "7-10 dnů",
        description: "Náš tým vytvoří váš web nebo aplikaci pomocí moderních technologií. Pravidelné aktualizace vás budou informovat o postupu."
      },
      {
        number: 4,
        title: "Testování a Nasazení",
        duration: "2-3 dny",
        description: "Důkladně testujeme na různých zařízeních a prohlížečích před spuštěním. Po vašem schválení nasadíme na produkční servery."
      },
      {
        number: 5,
        title: "Podpora a Údržba",
        duration: "Průběžně",
        description: "Poskytujeme průběžnou podporu a údržbu, aby váš web nebo aplikace fungovaly hladce a zůstaly aktuální.",
        isLast: true
      }
    ],
    faq: [
      {
        question: "Jak dlouho trvá vytvořit web?",
        answer: "Časový plán závisí na složitosti. Základní weby dokončím do 2 týdnů, pokročilé weby a jednodušší aplikace do 3 týdnů. Komplexní projekty mohou trvat 4-8 týdnů v závislosti na rozsahu a požadavcích."
      },
      {
        question: "Nabízíte hosting?",
        answer: "Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují údržbu, zálohy a bezpečnostní aktualizace. Preferuji cloudové řešení pro maximální spolehlivost a výkon."
      },
      {
        question: "Jaké technologie používáte?",
        answer: "Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby. Pro e-commerce projekty využívám specializované platformy jako Shopify, WooCommerce nebo vlastní řešení podle potřeb klienta."
      },
      {
        question: "Nabízíte i jednorázové úpravy?",
        answer: "Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí. Účtuji hodinovou sazbu nebo paušální částku podle rozsahu projektu."
      },
      {
        question: "Co když nejsem spokojený s výsledkem?",
        answer: "Spokojenost klienta je mou prioritou. Během procesu vývoje máte několik příležitostí k poskytnutí zpětné vazby a požadavků na změny. Pokud nejste spokojeni s finálním produktem, pracuji na úpravách, dokud nedosáhneme výsledku, se kterým budete spokojeni."
      },
      {
        question: "Jak probíhá platba za projekty?",
        answer: "U standardních projektů požaduji 50% zálohu před zahájením práce a zbývajících 50% po dokončení a schválení projektu. U větších projektů můžeme dohodnout platební plán rozdělený do několika fází podle milníků projektu."
      }
    ]
  }), []);
  
  // Get the appropriate pricing data based on active tabs
  const pricingData = useMemo(() => {
    if (pricingTab === 'business') {
      return serviceData.pricing.business[activeTab] || serviceData.pricing.business.web;
    }
    return serviceData.pricing.individual[activeTab];
  }, [serviceData, activeTab, pricingTab]);

  return (
    <section id="services" className="section py-20 md:py-28 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-30" />
      </div>
      
      <div className="container-custom relative z-10">
        <SectionTitle
          title="Služby a Ceník"
          subtitle="Transparentní ceny za kvalitní webový vývoj s důrazem na výkon a design"
        />
        
        {/* New service type tabs */}
        <motion.div 
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex bg-muted/50 backdrop-blur-sm p-1.5 rounded-lg border border-border">
            {(['web', 'design', 'maintenance'] as ServiceTab[]).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className={`px-5 py-2 ${activeTab === tab ? 'shadow-lg' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'web' && <Layout className="w-4 h-4 mr-2" />}
                {tab === 'design' && <Palette className="w-4 h-4 mr-2" />}
                {tab === 'maintenance' && <Shield className="w-4 h-4 mr-2" />}
                {tab === 'web' && 'Webové stránky'}
                {tab === 'design' && 'Design & UX'}
                {tab === 'maintenance' && 'Servis & Údržba'}
              </Button>
            ))}
          </div>
        </motion.div>
        
        {/* Customer type toggle */}
        <motion.div 
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="inline-flex bg-muted/30 p-1 rounded-full border border-border/30">
            <Button
              variant={pricingTab === 'individual' ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 ${pricingTab === 'individual' ? 'shadow-md' : ''}`}
              onClick={() => setPricingTab('individual')}
            >
              Jednotlivci & Malé firmy
            </Button>
            <Button
              variant={pricingTab === 'business' ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-4 ${pricingTab === 'business' ? 'shadow-md' : ''}`}
              onClick={() => setPricingTab('business')}
            >
              Střední & Velké firmy
            </Button>
          </div>
        </motion.div>
        
        {/* Billing cycle toggle */}
        <motion.div 
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <span className={`text-sm ${pricingPlan === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Měsíčně</span>
            <button 
              onClick={() => setPricingPlan(pricingPlan === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${pricingPlan === 'yearly' ? 'bg-primary' : 'bg-muted'}`}
            >
              <div 
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${pricingPlan === 'yearly' ? 'translate-x-8' : 'translate-x-1'}`}
              />
            </button>
            <div className="flex items-center">
              <span className={`text-sm ${pricingPlan === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>Ročně</span>
              {pricingPlan === 'yearly' && (
                <span className="ml-2 bg-green-500/20 text-green-500 text-xs px-2 py-0.5 rounded-full">
                  Sleva 20%
                </span>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <AnimatePresence mode="wait">
            {pricingData.map((pricing, index) => (
              <PricingCard
                key={`${activeTab}-${pricing.title}-${index}`}
                title={pricing.title}
                price={pricing.price}
                yearlyPrice={pricing.yearlyPrice}
                description={pricing.description}
                icon={pricing.icon}
                features={pricing.features}
                isPopular={pricing.isPopular}
                callToAction={pricing.callToAction}
                plan={pricingPlan}
                isBusiness={pricingTab === 'business'}
                category={activeTab}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Additional services section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="md:col-span-3">
            <ScrollReveal>
              <h3 className="text-2xl font-bold mb-6">
                <motion.span 
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  Další služby
                </motion.span>
              </h3>
            </ScrollReveal>
          </div>
          
          {serviceData.additionalServices.map((service, index) => (
            <AdditionalServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Development process section */}
        <div className="bg-card/40 backdrop-blur-sm shadow-lg rounded-xl p-8 mt-24 overflow-hidden border border-white/5">
          <ScrollReveal>
            <motion.h3 
              className="text-2xl font-bold mb-6 text-center"
              animate={{ 
                color: ['hsl(230, 100%, 67%)', 'hsl(280, 100%, 70%)', 'hsl(230, 100%, 67%)']
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Proces Vývoje
            </motion.h3>
            <p className="text-center text-muted-foreground mb-10">
              Maximální doba realizace: <motion.span 
                className="text-primary font-bold"
                animate={{ 
                  textShadow: ['0 0 0px rgba(111, 76, 255, 0.2)', '0 0 8px rgba(111, 76, 255, 0.8)', '0 0 0px rgba(111, 76, 255, 0.2)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                3 týdny
              </motion.span> (závisí na rozsahu projektu)
            </p>
          </ScrollReveal>
          
          <div className="space-y-2 relative">
            {serviceData.developmentProcess.map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                duration={step.duration}
                description={step.description}
                isLast={step.isLast || false}
              />
            ))}
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="mt-24 p-8 bg-muted/50 backdrop-blur-sm rounded-xl border border-white/5">
          <ScrollReveal>
            <motion.h3 
              className="text-2xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="relative">
                Často Kladené Otázky
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0"
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.span>
              </span>
            </motion.h3>
          </ScrollReveal>
          
          <div className="max-w-3xl mx-auto">
            {serviceData.faq.map((item, index) => (
              <FaqItem 
                key={index} 
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>
        </div>
        
        {/* CTA section */}
        <ScrollReveal delay={0.3}>
          <motion.div 
            className="mt-24 p-10 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 text-center"
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(111, 76, 255, 0.25)",
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-4"
              animate={{ 
                scale: [1, 1.03, 1],
                color: ['hsl(230, 100%, 75%)', 'hsl(280, 100%, 80%)', 'hsl(230, 100%, 75%)']
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Připraveni na spolupráci?
            </motion.h3>
            <p className="max-w-xl mx-auto mb-8 text-foreground/70">
              Nezáleží na tom, zda potřebujete jednoduchý web nebo komplexní aplikaci, 
              společně najdeme řešení, které odpovídá vašim potřebám a rozpočtu.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white px-8 py-6 h-auto text-lg group"
                size="lg"
              >
                Kontaktujte mě
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
