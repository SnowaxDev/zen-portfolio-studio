import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, Clock, Check, Info, Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/services/ServiceCard';
import CompactServiceCard from '@/components/services/CompactServiceCard';
import TextWithGlow from '@/components/TextWithGlow';
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
  
  // Helper function to get billing type label
  const getBillingTypeLabel = (category: ServiceCategory) => {
    const billingType = servicePricingData[category][customerType].billingType;
    return billingType === 'oneTime' ? 'jednorázově' : 'měsíčně';
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section
      id="services"
      className={`py-${isMobile ? '16' : '24'} bg-background relative overflow-hidden`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left blob */}
        <motion.div 
          className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-purple/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Right blob */}
        <motion.div 
          className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Diagonal accent line */}
        <motion.div 
          className="absolute top-40 -right-20 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent transform rotate-[35deg]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Asymmetric grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 bottom-0 
                          bg-[linear-gradient(rgba(212,175,55,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.1)_1px,transparent_1px)]
                          bg-[size:60px_60px]">
          </div>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-${isMobile ? '8' : '12'}`}
        >
          <SectionTitle 
            title="Služby a Ceník" 
            subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
            alignment="center"
            accentColor="gold"
          />
        </motion.div>
        
        {/* Service category tabs - Enhanced tab design with symmetrical layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`flex flex-wrap justify-center mb-${isMobile ? '10' : '16'}`}
        >
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto relative"
          >
            {/* Tab container with enhanced styling */}
            <div className="relative">
              {/* Decorative underline with symmetrical gradient */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple/30 via-gold/50 to-purple/30 rounded-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1.5 rounded-xl border border-white/10 shadow-lg">
                {tabsConfig.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = selectedCategory === tab.value;
                  
                  return (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className={`
                        flex items-center justify-center gap-2 py-${isMobile ? '2' : '3'} px-1
                        relative overflow-hidden transition-all duration-300 rounded-lg
                        ${isActive ? 'text-gold font-medium' : 'text-muted-foreground hover:text-muted-foreground/80'}
                      `}
                    >
                      {/* Symmetrical background glow effect for active tab */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 rounded-lg"
                          layoutId="activeTabBackground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      
                      {/* Animated icon */}
                      <motion.div
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          transition: { duration: 0.5, repeat: 0 }
                        } : {}}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-0.5 ${isActive ? 'bg-gold/10 rounded-md' : ''}`}
                      >
                        <TabIcon className={`w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'} ${isActive ? 'text-gold' : ''}`} />
                      </motion.div>
                      
                      <span className={`hidden ${isMobile ? 'xs:inline' : 'sm:inline'}`}>{tab.label}</span>
                      <span className={`${isMobile ? 'xs:hidden' : 'sm:hidden'}`}>{tab.shortLabel}</span>
                      
                      {/* Symmetrical animated underline for active tab */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50"
                          layoutId="activeTabIndicator"
                          initial={{ opacity: 0, scaleX: 0 }}
                          animate={{ opacity: 1, scaleX: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </Tabs>
        </motion.div>
        
        {/* Customer type toggle - With symmetrical design and enhanced animations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`flex justify-center mb-${isMobile ? '10' : '16'}`}
        >
          <div className="relative bg-card/30 p-1 rounded-full border border-white/10 shadow-lg overflow-hidden">
            {/* Animated background for selected toggle */}
            <motion.div
              className="absolute h-full top-0 rounded-full bg-gradient-to-r from-gold/90 via-gold to-gold-light/90"
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
                className={`rounded-full px-${isMobile ? '2' : '6'} py-${isMobile ? '1.5' : '2'} transition-all duration-300 data-[state=on]:text-primary-foreground data-[state=off]:text-foreground/70 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  {isMobile ? 'Nízký' : 'Nízký rozpočet'}
                </TextWithGlow>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="individual" 
                aria-label="Jednotlivci & Malé firmy"
                className={`rounded-full px-${isMobile ? '2' : '6'} py-${isMobile ? '1.5' : '2'} transition-all duration-300 data-[state=on]:text-primary-foreground data-[state=off]:text-foreground/70 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Jednotlivci
                </TextWithGlow>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="business" 
                aria-label="Střední & Velké firmy"
                className={`rounded-full px-${isMobile ? '2' : '6'} py-${isMobile ? '1.5' : '2'} transition-all duration-300 data-[state=on]:text-primary-foreground data-[state=off]:text-foreground/70 ${isMobile ? 'text-xs' : ''}`}
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Firmy
                </TextWithGlow>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </motion.div>
        
        {/* Service pricing cards with symmetrical layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`grid grid-cols-1 ${isMobile ? 'gap-5' : 'md:grid-cols-2 gap-8'} max-w-4xl mx-auto mb-${isMobile ? '16' : '20'}`}
        >
          {/* Main service card - Symmetrically positioned */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ServiceCard
              title={servicePricingData[selectedCategory][customerType].title}
              description={servicePricingData[selectedCategory][customerType].description}
              price={servicePricingData[selectedCategory][customerType].price}
              billingType={servicePricingData[selectedCategory][customerType].billingType}
              features={servicePricingData[selectedCategory][customerType].features}
              isPopular={servicePricingData[selectedCategory][customerType].isPopular}
            />
          </motion.div>
          
          {/* Custom quote card with enhanced design - For mobile, display conditionally or with different styling */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: isMobile ? 0 : -8 }}
          >
            <motion.div
              className={`relative h-full border rounded-lg border-dashed border-gold/40 bg-gradient-to-b from-card to-black/80 p-${isMobile ? '4' : '6'} flex flex-col overflow-hidden`}
              whileHover={{ 
                boxShadow: "0 0 30px rgba(212,175,55,0.15)",
                borderColor: "rgba(212,175,55,0.6)"
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Symmetrical accent elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gold/5 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gold/5 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              />
              
              {/* Premium badge */}
              <motion.div 
                className={`absolute -top-3 ${isMobile ? 'right-2' : 'right-5'}`}
                initial={{ opacity: 0, y: -10, rotate: -15 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <TextWithGlow 
                  intensity="strong" 
                  className={`bg-purple text-primary-foreground ${isMobile ? 'text-xs' : 'text-xs'} font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1`}
                >
                  <Star className={`h-${isMobile ? '2.5' : '3'} w-${isMobile ? '2.5' : '3'}`} /> Premium
                </TextWithGlow>
              </motion.div>
              
              <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'} text-gold`}>Individuální řešení</h3>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs mb-3' : 'text-sm mb-4'}`}>
                Potřebujete komplexní řešení přesně podle vašich potřeb? Kontaktujte nás pro nezávaznou konzultaci.
              </p>
              
              <ul className={`space-y-${isMobile ? '1.5' : '2'} mb-${isMobile ? '4' : '6'} flex-grow`}>
                <motion.li 
                  className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Clock className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2 flex-shrink-0 text-gold`} />
                  <span className="text-foreground/80">Bezplatná úvodní konzultace</span>
                </motion.li>
                <motion.li 
                  className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2 flex-shrink-0 text-gold`} />
                  <span className="text-foreground/80">Detailní analýza potřeb</span>
                </motion.li>
                <motion.li 
                  className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2 flex-shrink-0 text-gold`} />
                  <span className="text-foreground/80">Návrh řešení na míru</span>
                </motion.li>
                <motion.li 
                  className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} mr-2 flex-shrink-0 text-gold`} />
                  <span className="text-foreground/80">Transparentní cenová nabídka</span>
                </motion.li>
              </ul>
              
              <div className="mt-auto relative z-10">
                <motion.button
                  className={`w-full relative overflow-hidden bg-transparent border-2 border-gold/50 text-gold hover:border-gold transition-colors py-${isMobile ? '1.5' : '2'} rounded-md font-medium ${isMobile ? 'text-sm' : ''}`}
                  whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 1.2 }}
                  />
                  Nezávazná konzultace
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Additional services section with symmetrical layout */}
        <div className={`mt-${isMobile ? '16' : '24'} relative`}>
          {/* Symmetrical decorative elements */}
          <motion.div
            className="absolute -top-20 left-1/4 w-40 h-40 rounded-full bg-purple/5 blur-3xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -top-20 right-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl opacity-40"
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-center mb-${isMobile ? '10' : '16'}`}
          >
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-2`}>
              <motion.span 
                initial={{ backgroundPosition: "0% 0%" }}
                whileInView={{ backgroundPosition: "100% 0%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              >
                Další služby
              </motion.span>
            </h3>
            
            <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''} max-w-lg mx-auto mb-4`}>
              Doplňkové služby pro vylepšení vašeho webu a online podnikání
            </p>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? "4rem" : "5rem" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple/50 via-gold/50 to-purple/50 mx-auto rounded-full my-4"
            />
          </motion.div>
          
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
            {additionalServices.map((service, index) => (
              <CompactServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                priceType={service.priceType}
                className={service.highlight ? "border-gold/30" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
