
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Code2, Palette, Wrench, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import ScrollReveal from '../components/ScrollReveal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { sectionMeta } from '../lib/section-data';

const serviceFeatures = {
  basic: [
    'Responzivní design',
    'SEO optimalizace',
    'Kontaktní formulář',
    '1 revize zdarma',
    'Optimalizace rychlosti',
  ],
  standard: [
    'Vše z Basic balíčku',
    'CMS integrace',
    'Pokročilá analytika',
    '3 revize zdarma',
    'Blog/novinky sekce',
    'Sociální sítě integrace',
  ],
  premium: [
    'Vše ze Standard balíčku',
    'E-commerce funkce',
    'Vlastní administrace',
    'Neomezené revize',
    'Chatbot integrace',
    'Vícejazyčná podpora',
    '3 měsíce údržby zdarma',
  ],
};

const pricingPlans = {
  monthly: {
    basic: '6,900 Kč',
    standard: '12,900 Kč',
    premium: '24,900 Kč',
  },
  yearly: {
    basic: '74,900 Kč',
    standard: '139,900 Kč',
    premium: '269,900 Kč',
  },
};

const serviceTypes = [
  { id: 'web', icon: Code2, label: 'Webové aplikace' },
  { id: 'design', icon: Palette, label: 'UI/UX Design' },
  { id: 'maintenance', icon: Wrench, label: 'Údržba a podpora' },
];

const ServicesSection: React.FC = () => {
  const [serviceType, setServiceType] = useState<string>('web');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [customerType, setCustomerType] = useState<string>('all');
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="services" className="section py-20">
      <div className="container-custom">
        <ScrollReveal direction="up" className="w-full">
          <SectionTitle 
            title="Moje Služby" 
            subtitle="Vyberte si balíček, který nejlépe odpovídá vašim potřebám"
          />
        </ScrollReveal>
        
        {/* Service Type Selector */}
        <ScrollReveal direction="up" delay={0.1} className="mb-8">
          <div className="flex justify-center mb-10">
            <Tabs defaultValue="web" value={serviceType} onValueChange={setServiceType} className="w-full max-w-3xl">
              <TabsList className="grid grid-cols-3 mb-2">
                {serviceTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <TabsTrigger 
                      key={type.id} 
                      value={type.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {type.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </ScrollReveal>

        {/* Billing Period Toggle */}
        <ScrollReveal direction="up" delay={0.2} className="mb-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Měsíčně
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingPeriod === 'yearly'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Ročně <span className="text-xs opacity-80">(2 měsíce zdarma)</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" onClick={() => setCustomerType('all')} 
                className={`cursor-pointer px-3 py-1 hover:bg-primary/10 ${customerType === 'all' ? 'bg-primary/20 border-primary' : ''}`}>
                Všichni klienti
              </Badge>
              <Badge variant="outline" onClick={() => setCustomerType('individual')} 
                className={`cursor-pointer px-3 py-1 hover:bg-primary/10 ${customerType === 'individual' ? 'bg-primary/20 border-primary' : ''}`}>
                Jednotlivci
              </Badge>
              <Badge variant="outline" onClick={() => setCustomerType('business')} 
                className={`cursor-pointer px-3 py-1 hover:bg-primary/10 ${customerType === 'business' ? 'bg-primary/20 border-primary' : ''}`}>
                Firmy
              </Badge>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Basic Plan */}
          <ScrollReveal direction="up" delay={0.3} className="h-full">
            <motion.div
              className="h-full" 
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                <CardHeader className="pb-2 relative">
                  <CardTitle className="text-2xl">Basic</CardTitle>
                  <CardDescription>Pro začínající projekty</CardDescription>
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full" />
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{pricingPlans[billingPeriod].basic}</span>
                    {billingPeriod === 'monthly' ? (
                      <span className="text-muted-foreground text-sm ml-2">/ jednorázově</span>
                    ) : (
                      <span className="text-muted-foreground text-sm ml-2">/ ročně</span>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {serviceFeatures.basic.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Vybrat balíček
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </ScrollReveal>
          
          {/* Standard Plan */}
          <ScrollReveal direction="up" delay={0.4} className="h-full">
            <motion.div
              className="h-full" 
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <Card className="h-full bg-primary text-primary-foreground border-primary/50 relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full" />
                
                <div className="absolute top-5 right-5">
                  <Badge className="bg-white text-primary">Nejoblíbenější</Badge>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Standard</CardTitle>
                  <CardDescription className="text-primary-foreground/70">Pro rostoucí podnikání</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2 relative z-10">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{pricingPlans[billingPeriod].standard}</span>
                    {billingPeriod === 'monthly' ? (
                      <span className="text-primary-foreground/70 text-sm ml-2">/ jednorázově</span>
                    ) : (
                      <span className="text-primary-foreground/70 text-sm ml-2">/ ročně</span>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {serviceFeatures.standard.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="relative z-10">
                  <Button className="w-full" variant="secondary">
                    Vybrat balíček
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </ScrollReveal>
          
          {/* Premium Plan */}
          <ScrollReveal direction="up" delay={0.5} className="h-full">
            <motion.div
              className="h-full" 
              variants={cardHover}
              initial="rest"
              whileHover="hover"
            >
              <Card className="h-full bg-card/80 backdrop-blur-sm border border-white/10 overflow-hidden">
                <CardHeader className="pb-2 relative">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <CardDescription>Pro náročné projekty</CardDescription>
                  <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-accent/10 rounded-full" />
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{pricingPlans[billingPeriod].premium}</span>
                    {billingPeriod === 'monthly' ? (
                      <span className="text-muted-foreground text-sm ml-2">/ jednorázově</span>
                    ) : (
                      <span className="text-muted-foreground text-sm ml-2">/ ročně</span>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {serviceFeatures.premium.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Vybrat balíček
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </ScrollReveal>
        </motion.div>

        {/* Custom Project CTA */}
        <ScrollReveal direction="up" delay={0.6} className="mt-16">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
            <h3 className="text-2xl font-bold mb-2">Potřebujete řešení na míru?</h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Každý projekt je jedinečný. Kontaktujte mě pro nezávaznou konzultaci a společně vytvoříme
              řešení přesně podle vašich požadavků.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Nezávazná konzultace
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicesSection;
