
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, Clock, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SectionTitle from '@/components/SectionTitle';
import ModernServiceCard from '@/components/services/ModernServiceCard';
import ModernCompactServiceCard from '@/components/services/ModernCompactServiceCard';
import TextWithGlow from '@/components/TextWithGlow';
import AnimatedSection from '@/components/AnimatedSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMobileUtils } from '@/hooks/use-mobile-utils';

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

// Service pricing data with explicit typing
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
const additionalServices = [
  {
    icon: Layout,
    title: "Redesign webu",
    description: "Oživte svůj stávající web moderním designem, který zvýší konverze a vylepší uživatelský zážitek.",
    price: "od 3 900 Kč",
    priceType: "jednorázově",
    highlight: true
  },
  {
    icon: Zap,
    title: "Optimalizace rychlosti",
    description: "Zrychlete svůj web pro lepší uživatelský zážitek, vyšší konverze a lepší pozice ve vyhledávačích.",
    price: "od 1 500 Kč",
    priceType: "jednorázově",
    highlight: false
  },
  {
    icon: Shield,
    title: "Zabezpečení webu",
    description: "Ochraňte svůj web před útoky a zajistěte bezpečnost pro návštěvníky i vaše citlivá data.",
    price: "od 2 500 Kč",
    priceType: "jednorázově",
    highlight: false
  },
  {
    icon: Cloud,
    title: "Migrace na cloud",
    description: "Bezpečná migrace vašeho webu na rychlou a spolehlivou cloudovou infrastrukturu s minimálním výpadkem.",
    price: "od 3 000 Kč",
    priceType: "jednorázově",
    highlight: false
  }
];

// Tab icons and labels configuration
const tabsConfig = [
  { value: 'websites', icon: Layout, label: 'Webové stránky', shortLabel: 'Weby' },
  { value: 'design', icon: Zap, label: 'Design & UX', shortLabel: 'Design' },
  { value: 'cloud', icon: Cloud, label: 'Cloud & RDP', shortLabel: 'Cloud' },
  { value: 'maintenance', icon: Shield, label: 'Údržba', shortLabel: 'Údržba' },
];

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  const isMobile = useIsMobile();
  const { getMobileSpacing } = useMobileUtils();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section
      id="services"
      className="service-section bg-zinc-950"
    >
      {/* Dynamic background elements */}
      <div className="service-section-background">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        </div>
        
        <motion.div 
          className="decorative-blob top-20 -left-32 w-64 h-64 bg-yellow-500/5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="decorative-blob bottom-20 -right-32 w-72 h-72 bg-yellow-500/5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 
                      bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)]
                      bg-[size:50px_50px]">
          </div>
        </div>
      </div>
      
      <div className="service-section-content">
        <AnimatedSection delay={0.1} className="mb-10" direction="up">
          <SectionTitle 
            title="Služby a Ceník" 
            subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
            alignment="center"
            accentColor="gold"
          />
        </AnimatedSection>
        
        {/* Service category tabs with improved design */}
        <AnimatedSection delay={0.2} direction="up" className="mb-8">
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="relative mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-zinc-900/80 backdrop-blur-sm p-1 rounded-xl border border-zinc-800 shadow-lg">
                {tabsConfig.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = selectedCategory === tab.value;
                  
                  return (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className={`
                        flex items-center justify-center gap-2 py-${isMobile ? '2' : '3'} px-1
                        relative overflow-hidden transition-all duration-200 rounded-lg
                        ${isActive ? 'text-yellow-400 font-medium' : 'text-zinc-400 hover:text-zinc-300'}
                      `}
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-yellow-500/10 rounded-lg"
                          layoutId="activeTabBackground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", duration: 0.3 }}
                        />
                      )}
                      
                      <motion.div
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          transition: { duration: 0.3 }
                        } : {}}
                        whileHover={{ scale: 1.1 }}
                        className={`p-0.5 ${isActive ? 'bg-yellow-500/10 rounded-md' : ''}`}
                      >
                        <TabIcon className={`w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'} ${isActive ? 'text-yellow-400' : ''}`} />
                      </motion.div>
                      
                      <span className={`hidden ${isMobile ? 'xs:inline' : 'sm:inline'}`}>{tab.label}</span>
                      <span className={`${isMobile ? 'xs:hidden' : 'sm:hidden'}`}>{tab.shortLabel}</span>
                      
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-yellow-500/50 via-yellow-400 to-yellow-500/50"
                          layoutId="activeTabIndicator"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ type: "spring", duration: 0.3 }}
                        />
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </Tabs>
        </AnimatedSection>
        
        {/* Customer type selector with improved design */}
        <AnimatedSection delay={0.3} direction="up" className="mb-10">
          <div className="relative bg-zinc-900/60 p-1 rounded-full border border-zinc-800 shadow-lg overflow-hidden max-w-md mx-auto">
            {/* Animated background for selected toggle */}
            <motion.div
              className="absolute h-full top-0 rounded-full bg-gradient-to-r from-yellow-500/90 via-yellow-400 to-yellow-500/90"
              initial={{ width: '33.33%', x: 0 }}
              animate={{ 
                x: customerType === 'budget' 
                  ? 0 
                  : customerType === 'individual' 
                  ? '100%' 
                  : '200%'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            
            <ToggleGroup 
              type="single" 
              value={customerType} 
              onValueChange={(value) => {
                if (value) setCustomerType(value as CustomerType);
              }}
              className="relative z-10 grid grid-cols-3"
            >
              <ToggleGroupItem 
                value="budget" 
                aria-label="Nízký rozpočet"
                className={`rounded-full px-${isMobile ? '2' : '4'} py-${isMobile ? '1.5' : '2'} transition-all duration-200 data-[state=on]:text-black data-[state=off]:text-zinc-400 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  {isMobile ? 'Nízký' : 'Nízký rozpočet'}
                </TextWithGlow>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="individual" 
                aria-label="Jednotlivci & Malé firmy"
                className={`rounded-full px-${isMobile ? '2' : '4'} py-${isMobile ? '1.5' : '2'} transition-all duration-200 data-[state=on]:text-black data-[state=off]:text-zinc-400 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Jednotlivci
                </TextWithGlow>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="business" 
                aria-label="Střední & Velké firmy"
                className={`rounded-full px-${isMobile ? '2' : '4'} py-${isMobile ? '1.5' : '2'} transition-all duration-200 data-[state=on]:text-black data-[state=off]:text-zinc-400 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Firmy
                </TextWithGlow>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </AnimatedSection>
        
        {/* Service cards with new modern design */}
        <AnimatedSection delay={0.4} direction="up" className="mb-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <ModernServiceCard
              title={servicePricingData[selectedCategory][customerType].title}
              description={servicePricingData[selectedCategory][customerType].description}
              price={servicePricingData[selectedCategory][customerType].price}
              isOneTime={servicePricingData[selectedCategory][customerType].billingType === 'oneTime'}
              features={servicePricingData[selectedCategory][customerType].features}
              isPrimary={servicePricingData[selectedCategory][customerType].isPopular}
            />
            
            {/* Custom quote card with modern design */}
            <ModernServiceCard
              title="Individuální řešení"
              description="Potřebujete komplexní řešení přesně podle vašich potřeb? Kontaktujte nás pro nezávaznou konzultaci."
              price={0}
              isOneTime={true}
              features={[
                "Bezplatná úvodní konzultace",
                "Detailní analýza potřeb",
                "Návrh řešení na míru",
                "Transparentní cenová nabídka",
                "Prioritní realizace"
              ]}
              highlighted={true}
              ctaText="Nezávazná konzultace"
            />
          </motion.div>
        </AnimatedSection>
        
        {/* Additional services section with improved design */}
        <div className="mt-24 relative">
          <motion.div 
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 h-px w-1/3"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.3), transparent)'
            }}
          />
          
          <AnimatedSection delay={0.3} direction="up" className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">
              <motion.span 
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "100% 0%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-500"
              >
                Další služby
              </motion.span>
            </h3>
            
            <p className="text-zinc-400 max-w-lg mx-auto mb-4">
              Doplňkové služby pro vylepšení vašeho webu a online podnikání
            </p>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? "3rem" : "4rem" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-1 bg-gradient-to-r from-yellow-600/20 via-yellow-400 to-yellow-600/20 mx-auto rounded-full my-4"
            />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <AnimatedSection 
                key={index}
                delay={0.1 + index * 0.08}
                direction="up"
                distance={15}
              >
                <ModernCompactServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  priceType={service.priceType}
                  highlight={service.highlight}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
