
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, Clock, Check, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/services/ServiceCard';
import CompactServiceCard from '@/components/services/CompactServiceCard';
import TextWithGlow from '@/components/TextWithGlow';

// Types
type ServiceCategory = 'websites' | 'design' | 'cloud' | 'maintenance';
type CustomerType = 'individual' | 'business';
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
    priceType: "jednorázově"
  },
  {
    icon: Zap,
    title: "Optimalizace rychlosti",
    description: "Zrychlete svůj web pro lepší uživatelský zážitek, vyšší konverze a lepší pozice ve vyhledávačích.",
    price: "od 1 500 Kč",
    priceType: "jednorázově"
  },
  {
    icon: Shield,
    title: "Zabezpečení webu",
    description: "Ochraňte svůj web před útoky a zajistěte bezpečnost pro návštěvníky i vaše citlivá data.",
    price: "od 2 500 Kč",
    priceType: "jednorázově"
  },
  {
    icon: Cloud,
    title: "Migrace na cloud",
    description: "Bezpečná migrace vašeho webu na rychlou a spolehlivou cloudovou infrastrukturu s minimálním výpadkem.",
    price: "od 3 000 Kč",
    priceType: "jednorázově"
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
      className="py-24 bg-background relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Asymmetric background elements */}
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
          className="mb-12"
        >
          <SectionTitle 
            title="Služby a Ceník" 
            subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
            alignment="center"
            accentColor="gold"
          />
        </motion.div>
        
        {/* Service category tabs - Enhanced tab design with asymmetric elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-16"
        >
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto relative"
          >
            {/* Asymmetric accent element */}
            <motion.div
              className="absolute -top-8 right-10 h-10 w-20 bg-gradient-to-br from-gold/10 to-purple/10 blur-xl rounded-full"
              animate={{ 
                x: [0, 10, 0], 
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            <div className="relative">
              {/* Decorative underline that animates with tab selection */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple/20 via-gold/40 to-purple/20 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
              
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1 rounded-xl border border-white/10 shadow-lg transform -rotate-[0.5deg]">
                {tabsConfig.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = selectedCategory === tab.value;
                  
                  return (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className={`
                        flex items-center justify-center gap-2 py-3 px-1
                        relative overflow-hidden transition-all duration-300 rounded-lg
                        ${isActive ? 'text-gold font-medium' : 'text-muted-foreground'}
                      `}
                    >
                      {/* Background glow effect for active tab */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gold/5 rounded-lg"
                          layoutId="activeTabBackground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      
                      {/* Asymmetric icon positioning */}
                      <motion.div
                        animate={isActive ? {
                          rotateZ: [0, 5, 0],
                          transition: { duration: 1, repeat: Infinity, repeatDelay: 3 }
                        } : {}}
                      >
                        <TabIcon className={`w-5 h-5 ${isActive ? 'text-gold' : ''}`} />
                      </motion.div>
                      
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      
                      {/* Animated underline for active tab */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gold"
                          layoutId="activeTabIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
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
        
        {/* Customer type toggle - Enhanced asymmetric design */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="relative bg-card/30 p-1 rounded-full border border-white/10 shadow-lg overflow-hidden transform rotate-[0.7deg]">
            {/* Animated background for selected toggle */}
            <motion.div
              className="absolute h-full top-0 rounded-full bg-gradient-to-r from-gold/90 to-gold-light/90"
              initial={{ x: 0, width: '50%' }}
              animate={{ 
                x: customerType === 'individual' ? 0 : '100%', 
                width: customerType === 'individual' ? '50%' : '50%',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ x: customerType === 'individual' ? 0 : '50%' }}
            />
            
            <ToggleGroup 
              type="single" 
              value={customerType} 
              onValueChange={(value) => {
                if (value) setCustomerType(value as CustomerType);
              }}
              className="relative z-10"
            >
              <ToggleGroupItem 
                value="individual" 
                aria-label="Jednotlivci & Malé firmy"
                className="rounded-full px-6 py-2 transition-all duration-300 data-[state=on]:text-primary-foreground data-[state=off]:text-foreground/70"
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Jednotlivci & Malé firmy
                </TextWithGlow>
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="business" 
                aria-label="Střední & Velké firmy"
                className="rounded-full px-6 py-2 transition-all duration-300 data-[state=on]:text-primary-foreground data-[state=off]:text-foreground/70"
              >
                <TextWithGlow intensity="light" color="rgba(255, 255, 255, 0.9)" pulsate={false}>
                  Střední & Velké firmy
                </TextWithGlow>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </motion.div>
        
        {/* Service pricing cards with asymmetric layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
        >
          {/* Main service card - Asymmetrically positioned */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:translate-y-4"
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
          
          {/* Custom quote card for businesses - With asymmetric elements */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="md:-translate-y-4"
          >
            <motion.div
              className="relative h-full border rounded-lg border-dashed border-gold/40 bg-card/30 p-6 flex flex-col transform rotate-[0.3deg] overflow-hidden"
              whileHover={{ boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
              transition={{ duration: 0.5 }}
            >
              {/* Asymmetric accent element */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gold/5 blur-xl"
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
              
              <h3 className="text-xl font-bold mb-2 text-gold">Individuální řešení</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Potřebujete komplexní řešení přesně podle vašich potřeb? Kontaktujte nás pro nezávaznou konzultaci.
              </p>
              
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0 text-gold" />
                  <span className="text-foreground/80">Bezplatná úvodní konzultace</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-gold" />
                  <span className="text-foreground/80">Detailní analýza potřeb</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-gold" />
                  <span className="text-foreground/80">Návrh řešení na míru</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 flex-shrink-0 text-gold" />
                  <span className="text-foreground/80">Transparentní cenová nabídka</span>
                </li>
              </ul>
              
              <div className="mt-auto relative z-10">
                <motion.button
                  className="w-full border-2 border-gold/50 text-gold hover:bg-gold/5 transition-colors py-2 rounded-md font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Nezávazná konzultace
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Additional services section with asymmetric layout */}
        <div className="mt-24 relative">
          {/* Asymmetric decorative element */}
          <motion.div
            className="absolute -top-20 left-1/3 w-40 h-40 rounded-full bg-purple/5 blur-3xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl font-bold">
              <motion.span 
                initial={{ backgroundPosition: "0% 0%" }}
                whileInView={{ backgroundPosition: "100% 0%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-gold-dark via-gold to-gold-light"
              >
                Další služby
              </motion.span>
            </h3>
            
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "5rem" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-purple/50 to-gold/50 mx-auto rounded-full my-4"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              // Create asymmetric layout by applying different transforms
              const isEven = index % 2 === 0;
              const isLast = index === additionalServices.length - 1;
              const transform = isEven 
                ? `rotate-[-0.5deg] ${isLast ? 'translate-y-2' : ''}` 
                : `rotate-[0.5deg] ${isLast ? '-translate-y-2' : ''}`;
                
              return (
                <CompactServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  priceType={service.priceType}
                  className={transform}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
