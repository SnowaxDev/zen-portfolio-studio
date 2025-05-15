
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SectionTitle from '@/components/SectionTitle';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
      transition: { staggerChildren: 0.1 }
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
    <section id="services" className="py-24 bg-background">
      <div className="container-custom">
        <SectionTitle 
          title="Služby a Ceník" 
          subtitle="Profesionální webový vývoj s transparentními cenami a bez skrytých poplatků"
          className="mb-12"
        />
        
        {/* Service category tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <Tabs 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
            className="w-full max-w-3xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-white/10 shadow-lg">
              <TabsTrigger value="websites" className="flex items-center gap-2 py-2">
                <Layout className="w-4 h-4" />
                <span className="hidden sm:inline">Webové stránky</span>
              </TabsTrigger>
              <TabsTrigger value="design" className="flex items-center gap-2 py-2">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Design & UX</span>
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2 py-2">
                <Cloud className="w-4 h-4" />
                <span className="hidden sm:inline">Cloud & RDP</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2 py-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Údržba</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
        
        {/* Customer type toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
              className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Jednotlivci & Malé firmy
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="business" 
              aria-label="Střední & Velké firmy"
              className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              Střední & Velké firmy
            </ToggleGroupItem>
          </ToggleGroup>
        </motion.div>

        {/* Service pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-card/70 to-secondary/30 backdrop-blur-sm">
            <div className="p-8 relative">
              <div className="absolute top-4 right-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Více informací</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        {servicePricingData[selectedCategory][customerType].billingType === 'oneTime' 
                          ? 'Jednorázová platba za kompletní dodání služby' 
                          : 'Opakovaná měsíční platba za průběžné poskytování služby'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {servicePricingData[selectedCategory][customerType].title}
                </h3>
                <p className="text-muted-foreground max-w-xl">
                  {servicePricingData[selectedCategory][customerType].description}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-bold">
                      {servicePricingData[selectedCategory][customerType].price} 
                    </span>
                    <span className="text-muted-foreground ml-2">Kč {getBillingTypeLabel(selectedCategory)}</span>
                  </div>
                  <div className="mt-1 inline-flex items-center">
                    <div className={`px-2 py-0.5 text-xs rounded-full ${
                      servicePricingData[selectedCategory][customerType].billingType === 'oneTime' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {servicePricingData[selectedCategory][customerType].billingType === 'oneTime' 
                        ? 'Jednorázová platba' 
                        : 'Měsíční platba'}
                    </div>
                  </div>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90">
                  Objednat
                </Button>
              </div>
            </div>
            
            <div className="p-6 bg-card/40">
              <h4 className="font-medium mb-3">Co je zahrnuto:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {servicePricingData[selectedCategory][customerType].features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Additional services section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Další služby
            </span>
          </h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="mb-4 bg-muted/80 w-12 h-12 rounded-lg flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-medium mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center">
                  <p className="font-medium text-primary">{service.price}</p>
                  <span className="text-xs text-muted-foreground ml-1">{service.priceType}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
