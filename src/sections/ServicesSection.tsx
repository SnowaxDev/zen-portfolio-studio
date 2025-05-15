
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Zap, Cloud, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types
type ServiceCategory = 'websites' | 'design' | 'cloud' | 'maintenance';
type CustomerType = 'individual' | 'business';

const ServicesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('websites');
  const [customerType, setCustomerType] = useState<CustomerType>('individual');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Služby a Ceník</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Dostupné ceny za profesionální webový vývoj s důrazem na kvalitu
          </p>
        </div>
        
        {/* Service category tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center mb-8"
        >
          <div className="inline-flex bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-white/10 shadow-lg">
            <Button
              variant={selectedCategory === 'websites' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('websites')}
              className="px-4 py-2 text-sm"
            >
              <Layout className="w-4 h-4 mr-2" />
              Webové stránky
            </Button>
            <Button
              variant={selectedCategory === 'design' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('design')}
              className="px-4 py-2 text-sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              Design & UX
            </Button>
            <Button
              variant={selectedCategory === 'cloud' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('cloud')}
              className="px-4 py-2 text-sm"
            >
              <Cloud className="w-4 h-4 mr-2" />
              Cloud & RDP
            </Button>
            <Button
              variant={selectedCategory === 'maintenance' ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory('maintenance')}
              className="px-4 py-2 text-sm"
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
          <div className="inline-flex bg-card/50 p-1 rounded-full border border-white/10">
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
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-3">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Měsíčně
            </span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${billingCycle === 'yearly' ? 'bg-primary' : 'bg-muted'}`}
              aria-label={billingCycle === 'yearly' ? "Přepnout na měsíční platbu" : "Přepnout na roční platbu"}
            >
              <div 
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'}`}
              />
            </button>
            <div className="flex items-center">
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Ročně
              </span>
              {billingCycle === 'yearly' && (
                <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                  Sleva 20%
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Service cards will go here - hidden for now */}
        <div className="relative h-64 flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-card/70 to-secondary/30 backdrop-blur-sm">
          <p className="text-muted-foreground">Service pricing cards would be displayed here based on selections</p>
        </div>
        
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
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
