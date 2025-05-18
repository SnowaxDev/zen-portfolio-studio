
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

// Types
type ServiceCategory = 'websites' | 'design' | 'cloud' | 'maintenance';
type CustomerType = 'individual' | 'business' | 'budget';
type BillingType = 'oneTime' | 'subscription';

interface ServiceData {
  title: string;
  description: string;
  price: number;
  billingType: BillingType;
  isPopular: boolean;
  features: string[];
}

interface ServiceCardProps {
  title: string;
  description: string;
  price: number | null;
  isOneTime: boolean;
  features: string[];
  isPrimary?: boolean;
  isCustom?: boolean;
  onButtonClick?: () => void;
}

interface AdditionalService {
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  buttonText: string;
  highlight?: boolean;
}

// Service pricing data
const servicePricingData: Record<ServiceCategory, Record<CustomerType, ServiceData>> = {
  websites: {
    budget: {
      title: "Bio Stránka",
      description: "Jednoduchá osobní stránka či vizitka s responsivním designem za dostupnou cenu.",
      price: 3900,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "Jednoduchý responsivní design",
        "1-3 sekce dle potřeby",
        "Kontaktní formulář",
        "SEO základy",
        "14 dní zdarma údržba"
      ]
    },
    individual: {
      title: "Webové stránky",
      description: "Profesionální webové stránky pro jednotlivce a malé firmy včetně responzivního designu a SEO optimalizace.",
      price: 9900,
      billingType: 'oneTime',
      isPopular: true,
      features: [
        "Responzivní design",
        "SEO optimalizace",
        "Kontaktní formulář",
        "Google Analytics",
        "Základní údržba (1 měsíc zdarma)"
      ]
    },
    business: {
      title: "Webové stránky Pro",
      description: "Pokročilé webové řešení pro střední a velké firmy s vícejazyčnou podporou a pokročilými funkcemi.",
      price: 29900,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "Vše z balíčku pro jednotlivce",
        "Vícejazyčná podpora",
        "Pokročilé analytické nástroje",
        "Integrace s CRM systémy",
        "Prioritní podpora (3 měsíce zdarma)"
      ]
    }
  },
  design: {
    budget: {
      title: "UI Konzultace",
      description: "Základní konzultace k vašemu UI návrhu s tipy pro zlepšení uživatelského zážitku.",
      price: 2500,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "2 hodiny konzultace",
        "Základní UI audit",
        "Tipy pro zlepšení",
        "Návrh barevné palety",
        "Seznam doporučení"
      ]
    },
    individual: {
      title: "UI/UX Design",
      description: "Uživatelsky přívětivý design pro vaše projekty s prototypováním a testováním použitelnosti.",
      price: 7900,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "Návrh uživatelského rozhraní",
        "Prototypování",
        "Testování použitelnosti",
        "Responzivní design",
        "2 revize"
      ]
    },
    business: {
      title: "Kompletní Brand Design",
      description: "Komplexní designové služby pro vaši značku včetně brand identity a marketingových materiálů.",
      price: 24900,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "Vše z UI/UX balíčku",
        "Brand identity",
        "Logo a vizuální styl",
        "Marketingové materiály",
        "Neomezené revize"
      ]
    }
  },
  cloud: {
    budget: {
      title: "Základní Hosting",
      description: "Jednoduchý a spolehlivý hosting pro osobní projekty a malé weby.",
      price: 99,
      billingType: 'subscription',
      isPopular: false,
      features: [
        "1GB prostoru",
        "SSL certifikát zdarma",
        "Týdenní zálohy",
        "1 emailová adresa",
        "Základní podpora"
      ]
    },
    individual: {
      title: "Cloud Hosting",
      description: "Spolehlivý hosting pro vaše projekty s denními zálohami a technickou podporou.",
      price: 390,
      billingType: 'subscription',
      isPopular: false,
      features: [
        "5GB prostoru",
        "SSL certifikát",
        "Denní zálohy",
        "Emailová schránka",
        "Technická podpora"
      ]
    },
    business: {
      title: "Cloud & RDP řešení",
      description: "Pokročilá cloudová infrastruktura pro firmy s dedikovaným serverem a nepřetržitou podporou.",
      price: 1990,
      billingType: 'subscription',
      isPopular: false,
      features: [
        "Neomezený prostor",
        "Dedikovaný server",
        "RDP přístup",
        "Pokročilé zabezpečení",
        "24/7 technická podpora"
      ]
    }
  },
  maintenance: {
    budget: {
      title: "Jednorázová údržba",
      description: "Jednorázová údržba a aktualizace vašeho webu dle potřeby bez měsíčních závazků.",
      price: 990,
      billingType: 'oneTime',
      isPopular: false,
      features: [
        "Jednorázová aktualizace",
        "Kontrola zabezpečení",
        "Aktualizace pluginů/knihoven",
        "Základní optimalizace",
        "7 dní email podpora"
      ]
    },
    individual: {
      title: "Základní údržba",
      description: "Pravidelná údržba pro bezproblémový chod vašeho webu včetně měsíčních aktualizací a monitoringu.",
      price: 490,
      billingType: 'subscription',
      isPopular: false,
      features: [
        "Měsíční aktualizace",
        "Bezpečnostní kontroly",
        "Monitoring dostupnosti",
        "Základní optimalizace",
        "Email podpora"
      ]
    },
    business: {
      title: "Prémiová údržba",
      description: "Komplexní údržba a podpora pro firemní řešení s týdenními aktualizacemi a prioritní podporou.",
      price: 1490,
      billingType: 'subscription',
      isPopular: false,
      features: [
        "Týdenní aktualizace",
        "Pokročilé bezpečnostní audity",
        "Optimalizace výkonu",
        "Monitoring 24/7",
        "Prioritní telefonická podpora"
      ]
    }
  }
};

// Additional services data
const additionalServices: AdditionalService[] = [
  {
    icon: Layout,
    title: "Redesign webu",
    description: "Oživte svůj stávající web moderním designem, který zvýší konverze a vylepší uživatelský zážitek.",
    price: "od 3 900 Kč",
    buttonText: "Více informací",
    highlight: true
  },
  {
    icon: Zap,
    title: "Optimalizace rychlosti",
    description: "Zrychlete svůj web pro lepší uživatelský zážitek, vyšší konverze a lepší pozice ve vyhledávačích.",
    price: "od 1 500 Kč",
    buttonText: "Více informací"
  },
  {
    icon: Shield,
    title: "Zabezpečení webu",
    description: "Ochraňte svůj web před útoky a zajistěte bezpečnost pro návštěvníky i vaše citlivá data.",
    price: "od 2 500 Kč",
    buttonText: "Více informací"
  },
  {
    icon: Cloud,
    title: "Migrace na cloud",
    description: "Bezpečná migrace vašeho webu na rychlou a spolehlivou cloudovou infrastrukturu s minimálním výpadkem.",
    price: "od 3 000 Kč",
    buttonText: "Více informací"
  }
];

// Tab configuration
const tabsConfig = [
  { value: 'websites', icon: Layout, label: 'Webové stránky' },
  { value: 'design', icon: Zap, label: 'Design & UX' },
  { value: 'cloud', icon: Cloud, label: 'Cloud & RDP' },
  { value: 'maintenance', icon: Shield, label: 'Údržba' },
];

// Customer type config
const customerTypeConfig = [
  { value: 'budget', label: 'Nízký rozpočet' },
  { value: 'individual', label: 'Jednotlivci' },
  { value: 'business', label: 'Firmy' },
];

// Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  isOneTime, 
  features, 
  isPrimary = false,
  isCustom = false,
  onButtonClick 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className={cn(
        "relative h-full flex flex-col rounded-2xl border-2 p-6 bg-black overflow-hidden",
        isPrimary 
          ? "border-yellow-500/70" 
          : isCustom 
            ? "border-purple-500/50" 
            : "border-zinc-800"
      )}>
        {/* Header with optional badge */}
        <div className="mb-5">
          {isPrimary && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-3 right-6"
            >
              <Badge className="bg-yellow-500 text-black font-medium">
                Nejoblíbenější
              </Badge>
            </motion.div>
          )}
          {isCustom && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-3 right-6"
            >
              <Badge className="bg-purple-500 text-white font-medium">
                Doporučeno
              </Badge>
            </motion.div>
          )}
          
          <h3 className={cn(
            "text-xl md:text-2xl font-bold mb-2",
            isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-white"
          )}>
            {title}
          </h3>
          
          <p className="text-zinc-400 text-sm">
            {description}
          </p>
        </div>
        
        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className={cn(
              "text-3xl md:text-4xl font-bold",
              isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-white"
            )}>
              {price === null ? "0" : price.toLocaleString()}
            </span>
            <span className="text-zinc-400 ml-2 text-sm">
              Kč {isOneTime ? 'jednorázově' : 'měsíčně'}
            </span>
          </div>
          
          <div className="mt-1">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              isOneTime 
                ? "bg-blue-500/20 text-blue-300" 
                : "bg-green-500/20 text-green-300"
            )}>
              {isOneTime ? 'Jednorázová platba' : 'Měsíční platba'}
            </span>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm text-zinc-300 font-medium mb-3">
            Co je zahrnuto:
          </h4>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-2"
              >
                <div className={cn(
                  "mt-1 p-1 rounded-full flex-shrink-0",
                  isPrimary ? "bg-yellow-500/20" : isCustom ? "bg-purple-500/20" : "bg-zinc-800"
                )}>
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className={cn(
                      "h-3 w-3",
                      isPrimary ? "text-yellow-500" : isCustom ? "text-purple-400" : "text-zinc-400"
                    )} />
                  </motion.div>
                </div>
                <span className="text-sm text-zinc-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Button */}
        <div className="mt-auto pt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className={cn(
                "w-full font-medium relative overflow-hidden",
                isPrimary 
                  ? "bg-yellow-500 hover:bg-yellow-400 text-black border-yellow-600" 
                  : isCustom
                    ? "bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 border border-purple-500/50"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
              )}
              onClick={onButtonClick}
            >
              <motion.span
                className={cn(
                  "absolute inset-0 opacity-0",
                  isPrimary 
                    ? "bg-gradient-to-r from-yellow-400/0 via-white/30 to-yellow-400/0" 
                    : isCustom
                      ? "bg-gradient-to-r from-purple-500/0 via-white/20 to-purple-500/0"
                      : "bg-gradient-to-r from-zinc-700/0 via-white/10 to-zinc-700/0"
                )}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              {isCustom ? "Nezávazná konzultace" : "Objednat"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// AdditionalServiceCard Component
const AdditionalServiceCard: React.FC<{service: AdditionalService}> = ({ service }) => {
  const { icon: Icon, title, description, price, buttonText, highlight } = service;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className={cn(
        "h-full rounded-2xl border-2 bg-black p-5 flex flex-col relative overflow-hidden",
        highlight ? "border-yellow-500/40" : "border-zinc-800"
      )}>
        <motion.div
          whileHover={{ 
            rotate: [0, -10, 10, -5, 0], 
            scale: 1.05,
            transition: { duration: 0.5 }
          }}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
            highlight ? "bg-yellow-500/20" : "bg-zinc-800"
          )}
        >
          <Icon className={cn(
            "w-6 h-6",
            highlight ? "text-yellow-500" : "text-zinc-300"
          )} />
        </motion.div>
        
        <h3 className={cn(
          "text-xl font-bold mb-2",
          highlight ? "text-yellow-500" : "text-white"
        )}>
          {title}
        </h3>
        
        <p className="text-zinc-400 text-sm mb-4 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-baseline mb-3">
            <span className={cn(
              "text-2xl font-bold",
              highlight ? "text-yellow-500" : "text-white"
            )}>
              {price}
            </span>
            <span className="text-zinc-400 text-xs ml-2">jednorázově</span>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className={cn(
                "w-full border relative overflow-hidden",
                highlight 
                  ? "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10" 
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              )}
            >
              <motion.span
                className={cn(
                  "absolute inset-0 opacity-0",
                  highlight 
                    ? "bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0" 
                    : "bg-gradient-to-r from-zinc-700/0 via-zinc-700/30 to-zinc-700/0"
                )}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              {buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  const isMobile = useIsMobile();
  
  // Service data for the current selection
  const currentService = servicePricingData[selectedCategory][customerType];
  const isSubscription = currentService.billingType === 'subscription';
  
  return (
    <section id="services" className="bg-zinc-950 py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        {/* Glow effects */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection delay={0.1} direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 relative inline-block">
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Služby a Ceník
            </span>
            <motion.span 
              className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-yellow-500/50 via-yellow-400 to-yellow-500/50 rounded"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </h2>
          
          <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
            Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků
          </p>
        </AnimatedSection>
        
        {/* Service Categories */}
        <AnimatedSection delay={0.2} direction="up" className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {tabsConfig.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = selectedCategory === tab.value;
              
              return (
                <motion.button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value as ServiceCategory)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl transition-all relative overflow-hidden",
                    isActive 
                      ? "text-black font-medium" 
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active background */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-yellow-500 rounded-xl"
                      layoutId="activeServiceTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <span className="relative z-10">
                    <TabIcon className={cn(
                      "w-5 h-5", 
                      isActive ? "text-black" : "text-zinc-400"
                    )} />
                  </span>
                  
                  <span className="relative z-10">
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>
        
        {/* Customer Type Selector */}
        <AnimatedSection delay={0.3} direction="up" className="mb-12">
          <div className="bg-zinc-900/60 rounded-2xl p-1.5 flex max-w-sm mx-auto relative">
            {/* Moving background */}
            <motion.div 
              className="absolute h-full top-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl"
              style={{ 
                width: `${100 / customerTypeConfig.length}%` 
              }}
              animate={{ 
                left: `${customerTypeConfig.findIndex(c => c.value === customerType) * (100 / customerTypeConfig.length)}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            {customerTypeConfig.map((type) => (
              <motion.button
                key={type.value}
                onClick={() => setCustomerType(type.value as CustomerType)}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors relative z-10",
                  customerType === type.value ? "text-black" : "text-zinc-400"
                )}
                whileTap={{ scale: 0.95 }}
              >
                {type.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Services Cards */}
        <AnimatedSection delay={0.4} direction="up" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard
              title={currentService.title}
              description={currentService.description}
              price={currentService.price}
              isOneTime={currentService.billingType === 'oneTime'}
              features={currentService.features}
              isPrimary={currentService.isPopular}
            />
            
            <ServiceCard
              title="Individuální řešení"
              description="Potřebujete komplexní řešení přesně podle vašich potřeb? Kontaktujte nás pro nezávaznou konzultaci."
              price={null}
              isOneTime={true}
              features={[
                "Bezplatná úvodní konzultace",
                "Detailní analýza potřeb",
                "Návrh řešení na míru",
                "Transparentní cenová nabídka",
                "Prioritní realizace"
              ]}
              isCustom={true}
            />
          </div>
        </AnimatedSection>
        
        {/* Additional Services */}
        <div className="mt-12 relative">
          {/* Decorative line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-px overflow-hidden">
            <motion.div 
              className="w-full h-full bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
          
          <AnimatedSection delay={0.3} direction="up" className="text-center mb-12 pt-16">
            <h3 className="text-3xl font-bold mb-3 relative inline-block">
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Další služby
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-yellow-500/50 via-yellow-300 to-yellow-500/50 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />
            </h3>
            
            <p className="text-zinc-400 max-w-lg mx-auto mt-3">
              Doplňkové služby pro vylepšení vašeho webu a online podnikání
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <AdditionalServiceCard 
                key={index} 
                service={service} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
