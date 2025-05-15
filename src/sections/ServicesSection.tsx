
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, Clock, Check, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/services/ServiceCard';
import CompactServiceCard from '@/components/services/CompactServiceCard';

// Types
type ServiceCategory = 'websites' | 'design' | 'cloud' | 'maintenance';
type CustomerType = 'individual' | 'business';
type BillingType = 'oneTime' | 'subscription';

// Service pricing data
const servicePricingData = {
  websites: {
    individual: {
      title: "Webové stránky",
      description: "Profesionální webové stránky pro jednotlivce a malé firmy včetně responzivního designu a SEO optimalizace.",
      price: 9900,
      billingType: 'oneTime' as BillingType,
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
      billingType: 'oneTime' as BillingType,
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
      billingType: 'oneTime' as BillingType,
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
      billingType: 'oneTime' as BillingType,
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
      billingType: 'subscription' as BillingType,
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
      billingType: 'subscription' as BillingType,
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
      billingType: 'subscription' as BillingType,
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
      billingType: 'subscription' as BillingType,
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
      {/* Background effects */}
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
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Služby a Ceník" 
            subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
            className="mb-12"
          />
        </motion.div>
        
        {/* Service category tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-white/10 shadow-lg">
              <TabsTrigger value="websites" className="flex items-center gap-2 py-2 data-[state=active]:text-gold">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">Webové stránky</span>
                <span className="sm:hidden">Weby</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2 py-2 data-[state=active]:text-gold">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Design & UX</span>
                <span className="sm:hidden">Design</span>
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2 py-2 data-[state=active]:text-gold">
                <Cloud className="w-4 h-4" />
                <span className="hidden sm:inline">Cloud & RDP</span>
                <span className="sm:hidden">Cloud</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2 py-2 data-[state=active]:text-gold">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Údržba</span>
                <span className="sm:hidden">Údržba</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        
        {/* Customer type toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <ToggleGroup 
            type="single" 
            value={customerType} 
            onValueChange={(value) => {
              if (value) setCustomerType(value as CustomerType);
            }}
            className="inline-flex bg-card/50 p-1 rounded-full border border-white/10"
          >
            <ToggleGroupItem 
              value="individual" 
              aria-label="Jednotlivci & Malé firmy"
              className="rounded-full px-4 data-[state=on]:bg-gold data-[state=on]:text-primary-foreground"
            >
              Jednotlivci & Malé firmy
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="business" 
              aria-label="Střední & Velké firmy"
              className="rounded-full px-4 data-[state=on]:bg-gold data-[state=on]:text-primary-foreground"
            >
              Střední & Velké firmy
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>
        
        {/* Service pricing cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
        >
          {/* Individual/Small Business Card */}
          <ServiceCard
            title={servicePricingData[selectedCategory][customerType].title}
            description={servicePricingData[selectedCategory][customerType].description}
            price={servicePricingData[selectedCategory][customerType].price}
            billingType={servicePricingData[selectedCategory][customerType].billingType}
            features={servicePricingData[selectedCategory][customerType].features}
            isPopular={servicePricingData[selectedCategory][customerType].isPopular}
          />
          
          {/* Custom quote card for businesses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -8 }}
          >
            <motion.div
              className="relative h-full border rounded-lg border-dashed border-gold/40 bg-card/30 p-6 flex flex-col"
              whileHover={{ boxShadow: "0 0 30px rgba(212,175,55,0.15)" }}
              transition={{ duration: 0.5 }}
            >
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
              
              <div className="mt-auto">
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
        
        {/* Additional services section with enhanced animations */}
        <div className="mt-24">
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
            {additionalServices.map((service, index) => (
              <CompactServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                priceType={service.priceType}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;
