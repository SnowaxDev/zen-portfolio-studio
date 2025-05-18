import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield } from 'lucide-react';
import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/services/ServiceCard';
import CompactServiceCard from '@/components/services/CompactServiceCard';
import AnimatedSection from '@/components/AnimatedSection';
import { useMobileUtils } from '@/hooks/use-mobile-utils';

// Types
type ServiceCategory = 'websites' | 'design' | 'cloud' | 'maintenance';
type CustomerType = 'individual' | 'business' | 'budget';

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  const { isMobile, getMobileSpacing } = useMobileUtils();

  // Tab configuration
  const tabsConfig = [
    { value: 'websites', icon: Layout, label: 'Webové stránky', shortLabel: 'Weby' },
    { value: 'design', icon: Zap, label: 'Design & UX', shortLabel: 'Design' },
    { value: 'cloud', icon: Cloud, label: 'Cloud & RDP', shortLabel: 'Cloud' },
    { value: 'maintenance', icon: Shield, label: 'Údržba', shortLabel: 'Údržba' },
  ];

  // Service pricing data
  const servicePricingData = {
    websites: {
      budget: {
        title: "Bio Stránka",
        description: "Jednoduchá osobní stránka či vizitka s responsivním designem za dostupnou cenu.",
        price: 3900,
        billingType: 'oneTime' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'subscription' as const,
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
        billingType: 'subscription' as const,
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
        billingType: 'subscription' as const,
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
        billingType: 'oneTime' as const,
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
        billingType: 'subscription' as const,
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
        billingType: 'subscription' as const,
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="services"
      className={`py-${isMobile ? '16' : '24'} bg-background relative overflow-hidden`}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 right-0 bottom-0 
                          bg-[linear-gradient(rgba(212,175,55,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.1)_1px,transparent_1px)]
                          bg-[size:60px_60px]">
          </div>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <AnimatedSection className="mb-12">
          <SectionTitle 
            title="Služby a Ceník" 
            subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
            alignment="center"
            accentColor="gold"
          />
        </AnimatedSection>
        
        {/* Service category tabs - Simplified design */}
        <AnimatedSection className="mb-12">
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
              {tabsConfig.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className="flex items-center justify-center gap-2 py-2 md:py-3 px-1 relative overflow-hidden transition-all duration-300"
                  >
                    <TabIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden xs:inline sm:inline md:inline">{tab.label}</span>
                    <span className="xs:hidden sm:hidden md:hidden">{tab.shortLabel}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </AnimatedSection>
        
        {/* Customer type toggle - Simplified */}
        <AnimatedSection className="mb-12">
          <div className="flex justify-center">
            <div className="bg-card/30 p-1 rounded-full border border-white/10 shadow-lg overflow-hidden">              
              <ToggleGroup 
                type="single" 
                value={customerType} 
                onValueChange={(value) => {
                  if (value) setCustomerType(value as CustomerType);
                }}
                className="grid grid-cols-3"
              >
                <ToggleGroupItem 
                  value="budget" 
                  aria-label="Nízký rozpočet"
                  className={`rounded-full px-2 md:px-6 py-1.5 md:py-2 transition-all duration-300 ${isMobile ? 'text-xs' : ''}`}
                >
                  {isMobile ? 'Nízký' : 'Nízký rozpočet'}
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="individual" 
                  aria-label="Jednotlivci & Malé firmy"
                  className={`rounded-full px-2 md:px-6 py-1.5 md:py-2 transition-all duration-300 ${isMobile ? 'text-xs' : ''}`}
                >
                  Jednotlivci
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="business" 
                  aria-label="Střední & Velké firmy"
                  className={`rounded-full px-2 md:px-6 py-1.5 md:py-2 transition-all duration-300 ${isMobile ? 'text-xs' : ''}`}
                >
                  Firmy
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Service pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <motion.div variants={itemVariants}>
            <ServiceCard
              title={servicePricingData[selectedCategory][customerType].title}
              description={servicePricingData[selectedCategory][customerType].description}
              price={servicePricingData[selectedCategory][customerType].price}
              billingType={servicePricingData[selectedCategory][customerType].billingType}
              features={servicePricingData[selectedCategory][customerType].features}
              isPopular={servicePricingData[selectedCategory][customerType].isPopular}
            />
          </motion.div>
          
          {/* Custom quote card */}
          <motion.div variants={itemVariants}>
            <div className="relative h-full border rounded-lg border-dashed border-gold/40 bg-gradient-to-b from-card to-black/80 p-4 md:p-6 flex flex-col">
              <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-gold">Individuální řešení</h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
                Potřebujete komplexní řešení přesně podle vašich potřeb? Kontaktujte nás pro nezávaznou konzultaci.
              </p>
              
              <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 flex-grow">
                <li className="flex items-center text-xs md:text-sm">
                  <span className="mr-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold/10 text-gold flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Bezplatná úvodní konzultace</span>
                </li>
                <li className="flex items-center text-xs md:text-sm">
                  <span className="mr-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold/10 text-gold flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Detailní analýza potřeb</span>
                </li>
                <li className="flex items-center text-xs md:text-sm">
                  <span className="mr-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold/10 text-gold flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Návrh řešení na míru</span>
                </li>
                <li className="flex items-center text-xs md:text-sm">
                  <span className="mr-2 w-5 h-5 flex items-center justify-center rounded-full bg-gold/10 text-gold flex-shrink-0">✓</span>
                  <span className="text-foreground/80">Transparentní cenová nabídka</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <motion.button
                  className="w-full bg-transparent border-2 border-gold/50 text-gold hover:border-gold transition-colors py-1.5 md:py-2 rounded-md font-medium text-sm md:text-base"
                  whileHover={{ scale: isMobile ? 1.02 : 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Nezávazná konzultace
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Additional services section */}
        <AnimatedSection className="mt-16 md:mt-24" staggerChildren={true}>
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-dark via-gold to-gold-light">
                Další služby
              </span>
            </h3>
            
            <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-4">
              Doplňkové služby pro vylepšení vašeho webu a online podnikání
            </p>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: isMobile ? "4rem" : "5rem" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple/50 via-gold/50 to-purple/50 mx-auto rounded-full my-4"
              viewport={{ once: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;
