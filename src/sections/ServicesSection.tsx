
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { cn } from '@/lib/utils';
import ModernServiceCard from '@/components/services/ModernServiceCard';
import CompactServiceCardV2 from '@/components/services/CompactServiceCardV2';
import ServiceTabs from '@/components/services/ServiceTabs';
import CustomerTypeSelector from '@/components/services/CustomerTypeSelector';

// Types and data imports
import { ServiceCategory, CustomerType, servicePricingData, additionalServices } from '@/lib/services-data';

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

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  
  // Service data for the current selection
  const currentService = servicePricingData[selectedCategory][customerType];
  
  return (
    <section id="services" className="bg-zinc-950 py-20 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 inset-0 pointer-events-none">
        {/* Grid pattern with subtle animation */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(rgba(255,215,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </motion.div>
        
        {/* Enhanced glow effects */}
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with improved animation */}
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
        
        {/* Service Categories with improved tab design */}
        <AnimatedSection delay={0.2} direction="up" className="mb-12">
          <ServiceTabs 
            tabs={tabsConfig} 
            selectedValue={selectedCategory} 
            onValueChange={(value) => setSelectedCategory(value as ServiceCategory)}
          />
        
          {/* Customer Type Selector with improved design */}
          <AnimatedSection delay={0.3} direction="up" className="mb-12">
            <CustomerTypeSelector
              options={customerTypeConfig}
              selectedValue={customerType}
              onChange={(value) => setCustomerType(value as CustomerType)}
            />
          </AnimatedSection>
          
          {/* Service Cards with improved animation */}
          <AnimatedSection delay={0.4} direction="up" className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ModernServiceCard
                title={currentService.title}
                description={currentService.description}
                price={currentService.price}
                isOneTime={currentService.billingType === 'oneTime'}
                features={currentService.features}
                isPrimary={currentService.isPopular}
              />
              
              <ModernServiceCard
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
        </AnimatedSection>
        
        {/* Additional Services with improved divider */}
        <div className="mt-12 relative">
          {/* Enhanced decorative line */}
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
              <CompactServiceCardV2
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                priceType="jednorázově"
                highlight={service.highlight}
                buttonText={service.buttonText}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
