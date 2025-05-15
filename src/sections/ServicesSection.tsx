
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Layout, Cpu, Code, ChevronDown, ChevronUp, 
  Zap, Shield, Server, Database, Cloud, Rocket,
  ArrowRight, Package
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

// Types
type Plan = 'monthly' | 'yearly';
type ServiceCategory = 'websites' | 'design' | 'maintenance' | 'cloud';
type CustomerType = 'individual' | 'business';

const ServicesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [pricingPlan, setPricingPlan] = useState<Plan>('monthly');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Service data
  const services = {
    websites: [
      {
        title: "Základní Web",
        icon: Layout,
        price: "4 999 Kč",
        yearlyPrice: "49 990 Kč",
        description: "Ideální pro jednotlivce a začínající podnikatele, kteří potřebují profesionální webovou prezentaci.",
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
        icon: Code,
        price: "9 999 Kč",
        yearlyPrice: "99 990 Kč",
        description: "Ideální pro menší firmy, které potřebují více funkcí a vlastních prvků.",
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
        icon: Rocket,
        price: "Od 19 999 Kč",
        yearlyPrice: "Od 199 990 Kč",
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
        title: "UX Audit",
        icon: Zap,
        price: "1 999 Kč",
        yearlyPrice: "19 990 Kč",
        description: "Kompletní analýza vašeho současného webu se zaměřením na uživatelský zážitek.",
        features: [
          "Analýza použitelnosti",
          "Identifikace problémových míst",
          "Testování s reálnými uživateli",
          "Zpráva s doporučeními",
          "30-minutová konzultace",
          "Seznam prioritních úprav"
        ],
        callToAction: "Objednat Audit"
      },
      {
        title: "UI Design",
        icon: Package,
        price: "4 999 Kč",
        yearlyPrice: "49 990 Kč",
        description: "Vizuální identita pro vaši digitální přítomnost vytvořená na míru.",
        features: [
          "Vizuální styl a stylový průvodce",
          "Design systém s komponentami",
          "Mobilní a desktop návrhy",
          "Interaktivní prototypy",
          "Zdrojové soubory (Figma)",
          "2 kola revizí"
        ],
        isPopular: true,
        callToAction: "Objednat"
      }
    ],
    maintenance: [
      {
        title: "Základní Údržba",
        icon: Shield,
        price: "499 Kč",
        yearlyPrice: "4 990 Kč",
        description: "Měsíční údržba zajišťující bezpečnost a funkčnost vašeho webu.",
        features: [
          "Bezpečnostní aktualizace",
          "Zálohování dat",
          "Monitoring dostupnosti",
          "Základní technická podpora",
          "Měsíční report stavu",
          "Reakční doba do 48 hodin"
        ],
        callToAction: "Aktivovat"
      },
      {
        title: "Pokročilá Správa",
        icon: Server,
        price: "999 Kč",
        yearlyPrice: "9 990 Kč",
        description: "Kompletní správa vašeho webu včetně technické podpory a aktualizací obsahu.",
        features: [
          "Vše ze základní údržby",
          "Proaktivní monitoring výkonu",
          "Aktualizace pluginů a CMS",
          "SEO monitoring",
          "Prioritní technická podpora",
          "Reakční doba do 24 hodin"
        ],
        isPopular: true,
        callToAction: "Aktivovat"
      }
    ],
    cloud: [
      {
        title: "Cloud Hosting",
        icon: Cloud,
        price: "299 Kč",
        yearlyPrice: "2 990 Kč",
        description: "Spolehlivý cloud hosting pro vaše webové projekty s garantovanou dostupností.",
        features: [
          "10 GB SSD úložiště",
          "Neomezený přenos dat",
          "SSL certifikát zdarma",
          "Denní zálohy",
          "99.9% garantovaná dostupnost",
          "Technická podpora"
        ],
        callToAction: "Objednat"
      },
      {
        title: "RDP Server",
        icon: Cpu,
        price: "599 Kč",
        yearlyPrice: "5 990 Kč",
        description: "Vzdálený přístup k Windows serveru pro vaše podnikání a vývojové potřeby.",
        features: [
          "2 vCPU jádra",
          "4 GB RAM",
          "50 GB SSD",
          "Neomezený přenos dat",
          "Windows Server 2022",
          "Základní konfigurace a zabezpečení"
        ],
        isPopular: true,
        callToAction: "Aktivovat"
      },
      {
        title: "Databázový Server",
        icon: Database,
        price: "399 Kč",
        yearlyPrice: "3 990 Kč",
        description: "Spravovaná databázová služba pro vaše aplikace s vysokým výkonem.",
        features: [
          "PostgreSQL/MySQL",
          "5 GB úložiště",
          "Automatické zálohy",
          "Monitoring a alerty",
          "Škálovatelnost dle potřeby",
          "Technická podpora"
        ],
        callToAction: "Objednat"
      }
    ]
  };

  // Additional services data
  const additionalServices = [
    {
      icon: Layout,
      title: "Redesign webu",
      description: "Oživte svůj stávající web moderním designem, který zvýší konverze."
    },
    {
      icon: Zap,
      title: "Optimalizace rychlosti",
      description: "Zrychlete svůj web pro lepší uživatelský zážitek a vyšší pozice ve vyhledávačích."
    },
    {
      icon: Shield,
      title: "Zabezpečení webu",
      description: "Ochraňte svůj web před útoky a zajistěte bezpečnost pro návštěvníky."
    },
    {
      icon: Cloud,
      title: "Migrace na cloud",
      description: "Bezpečná migrace vašeho webu na rychlou a spolehlivou cloudovou infrastrukturu."
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Jak dlouho trvá vytvořit web?",
      answer: "Základní weby dokončím do 1-2 týdnů, pokročilé weby do 2-3 týdnů. Komplexní projekty mohou trvat 3-5 týdnů v závislosti na požadavcích."
    },
    {
      question: "Jaké technologie používáte?",
      answer: "Specializuji se na React, TypeScript a Tailwind CSS pro frontend. Pro backend používám Node.js a různé cloudové služby podle potřeb projektu."
    },
    {
      question: "Nabízíte i jednorázové úpravy?",
      answer: "Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign nebo implementaci nových funkcí."
    }
  ];
  
  // Get active services based on selected category
  const activeServices = services[selectedCategory];

  return (
    <section id="services" className="section py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container-custom z-10 relative">
        <SectionTitle
          title="Služby a Ceník"
          subtitle="Dostupné ceny za profesionální webový vývoj s důrazem na kvalitu"
          className="mb-12"
        />
        
        {/* Service category tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-border/50 shadow-sm">
            <Button
              variant={selectedCategory === 'websites' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('websites')}
              className="px-3 py-1.5 text-sm"
            >
              <Layout className="w-4 h-4 mr-2" />
              Webové stránky
            </Button>
            <Button
              variant={selectedCategory === 'design' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('design')}
              className="px-3 py-1.5 text-sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Design & UX
            </Button>
            <Button
              variant={selectedCategory === 'cloud' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('cloud')}
              className="px-3 py-1.5 text-sm"
            >
              <Cloud className="w-4 h-4 mr-2" />
              Cloud & RDP
            </Button>
            <Button
              variant={selectedCategory === 'maintenance' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('maintenance')}
              className="px-3 py-1.5 text-sm"
            >
              <Shield className="w-4 h-4 mr-2" />
              Údržba
            </Button>
          </div>
        </motion.div>
        
        {/* Customer type toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex bg-card/50 p-1 rounded-full border border-border/30">
            <Button
              variant={customerType === 'individual' ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setCustomerType('individual')}
            >
              Jednotlivci & Malé firmy
            </Button>
            <Button
              variant={customerType === 'business' ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setCustomerType('business')}
            >
              Střední & Velké firmy
            </Button>
          </div>
        </motion.div>
        
        {/* Billing cycle toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-3">
            <span className={`text-sm ${pricingPlan === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Měsíčně
            </span>
            <button 
              onClick={() => setPricingPlan(pricingPlan === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${pricingPlan === 'yearly' ? 'bg-primary' : 'bg-muted'}`}
              aria-label={pricingPlan === 'yearly' ? "Přepnout na měsíční platbu" : "Přepnout na roční platbu"}
            >
              <div 
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${pricingPlan === 'yearly' ? 'translate-x-8' : 'translate-x-1'}`}
              />
            </button>
            <div className="flex items-center">
              <span className={`text-sm ${pricingPlan === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Ročně
              </span>
              {pricingPlan === 'yearly' && (
                <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                  Sleva 20%
                </span>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Pricing cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          <AnimatePresence mode="wait">
            {activeServices.map((service, index) => (
              <motion.div
                key={`${selectedCategory}-${service.title}`}
                variants={itemVariants}
                exit={{ opacity: 0, y: 20 }}
                className={`relative rounded-xl transition-all duration-500 h-full border ${
                  service.isPopular 
                    ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20" 
                    : "bg-card border-border/50"
                } hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30`}
              >
                {service.isPopular && (
                  <div className="absolute -top-3 right-4 bg-accent/90 px-3 py-1 rounded-full text-xs font-medium shadow-lg text-white">
                    Nejoblíbenější
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${
                      service.isPopular ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <service.icon className={`h-5 w-5 ${service.isPopular ? "text-primary" : "text-foreground/80"}`} />
                    </div>
                    <h3 className="text-xl font-medium">{service.title}</h3>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">
                        {pricingPlan === 'monthly' ? service.price : service.yearlyPrice}
                      </span>
                      {service.price !== "Dle nabídky" && service.price !== "Od 19 999 Kč" && (
                        <span className="text-sm text-muted-foreground ml-1">
                          {pricingPlan === 'monthly' ? "/měsíc" : "/rok"}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-5">{service.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex text-sm items-center gap-2">
                        <Check className="min-w-5 h-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      service.isPopular 
                        ? "bg-primary text-white hover:bg-primary/90" 
                        : "bg-secondary hover:bg-secondary/90"
                    } transition-all group`}
                  >
                    {service.callToAction}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional services */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Další služby
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-5 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="mb-4 bg-muted/50 w-12 h-12 rounded-lg flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-medium mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">Často kladené otázky</h3>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <Collapsible
                key={index}
                open={activeIndex === index}
                onOpenChange={() => setActiveIndex(activeIndex === index ? null : index)}
                className="bg-card rounded-lg border border-border/50 overflow-hidden"
              >
                <CollapsibleTrigger className="flex w-full justify-between items-center p-4 text-left">
                  <h4 className="font-medium">{faq.question}</h4>
                  {activeIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/50">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Připraveni začít?</h3>
          <p className="max-w-lg mx-auto mb-6 text-muted-foreground">
            Nezáleží na tom, jak velký je váš projekt. Společně vytvoříme řešení odpovídající vašim potřebám a rozpočtu.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/90 px-8 group"
          >
            Kontaktujte mě
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
