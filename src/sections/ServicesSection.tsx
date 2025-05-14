
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Rocket, Crown, Clock, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  callToAction = "Get Started"
}: { 
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  callToAction?: string;
}) => (
  <motion.div 
    className={`relative rounded-xl p-6 shadow-lg transition-all duration-300 ${
      isPopular 
        ? "bg-gradient-to-br from-primary/90 to-accent/90 text-white border-0" 
        : "bg-card border border-border hover:border-accent/50"
    }`}
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {isPopular && (
      <div className="absolute -top-4 right-4 bg-accent px-3 py-1 rounded-full text-xs font-bold">
        Most Popular
      </div>
    )}
    
    <div className="flex items-center mb-4">
      {isPopular ? <Crown className="mr-2 h-6 w-6" /> : <Package className="mr-2 h-6 w-6" />}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    
    <div className="mb-4">
      <span className="text-3xl font-bold">{price}</span>
      {price !== "Custom" && <span className="text-sm opacity-80 ml-1">/project</span>}
    </div>
    
    <p className="text-sm mb-6 opacity-90">{description}</p>
    
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex text-sm">
          <Check className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    <button 
      className={`w-full py-2 px-4 rounded-md flex items-center justify-center transition-all ${
        isPopular 
          ? "bg-white text-accent hover:bg-white/90" 
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      {callToAction} <ArrowRight className="ml-2 h-4 w-4" />
    </button>
  </motion.div>
);

const TimelineItem = ({
  title,
  description,
  duration
}: {
  title: string;
  description: string;
  duration: string;
}) => (
  <motion.div 
    className="flex gap-4"
    initial={{ x: -50, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col items-center">
      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
        <Clock className="h-5 w-5" />
      </div>
      <div className="w-0.5 grow bg-border mt-2"></div>
    </div>
    <div className="pb-10">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="text-sm bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mb-2">
        {duration}
      </span>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="container-custom">
        <SectionTitle
          title="Services & Pricing"
          subtitle="Transparent pricing for quality web development services"
        />
        
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              title="Basic Website"
              price="$1,299"
              description="Perfect for small businesses looking to establish an online presence."
              features={[
                "5-page responsive website",
                "Mobile-friendly design",
                "Basic SEO optimization",
                "Contact form",
                "Social media integration",
                "2 rounds of revisions"
              ]}
            />
            
            <PricingCard
              title="Advanced Website"
              price="$2,499"
              description="Ideal for businesses that need more functionality and custom features."
              features={[
                "10-page responsive website",
                "Advanced UI/UX design",
                "Content management system",
                "Advanced SEO package",
                "Analytics integration",
                "Performance optimization",
                "3 rounds of revisions"
              ]}
              isPopular={true}
            />
            
            <PricingCard
              title="Custom Web App"
              price="Custom"
              description="For businesses requiring tailored solutions with advanced functionality."
              features={[
                "Custom web application",
                "User authentication",
                "Database integration",
                "Third-party API integration",
                "Admin dashboard",
                "Maintenance package",
                "Unlimited revisions"
              ]}
              callToAction="Request Quote"
            />
          </div>
        </div>
        
        <div className="bg-card shadow-lg rounded-lg p-8 mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Development Process</h3>
          
          <div className="space-y-2">
            <TimelineItem
              title="Discovery & Planning"
              description="We begin with a thorough consultation to understand your business goals, target audience, and project requirements. Then we create a detailed roadmap for your project."
              duration="1-2 weeks"
            />
            
            <TimelineItem
              title="Design & Prototyping"
              description="Based on the requirements, we create wireframes and visual designs for your approval. You'll get interactive prototypes to visualize the final product."
              duration="2-3 weeks"
            />
            
            <TimelineItem
              title="Development"
              description="Our team builds your website or application using modern technologies. Regular updates keep you informed of progress."
              duration="2-8 weeks"
            />
            
            <TimelineItem
              title="Testing & Deployment"
              description="We thoroughly test across devices and browsers before launching. After your approval, we deploy to production servers."
              duration="1-2 weeks"
            />
            
            <motion.div 
              className="flex gap-4"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <Rocket className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Support & Maintenance</h3>
                <span className="text-sm bg-accent/20 text-accent px-2 py-0.5 rounded-full inline-block mb-2">
                  Ongoing
                </span>
                <p className="text-muted-foreground">We provide continued support and maintenance to ensure your website or application runs smoothly and stays updated.</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-16 p-8 bg-muted rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-bold mb-2">How long does it take to complete a website?</h4>
              <p className="text-muted-foreground">The timeline depends on complexity. Basic websites take 2-4 weeks, while custom web applications may take 2-3 months from concept to launch.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-bold mb-2">Do you offer hosting services?</h4>
              <p className="text-muted-foreground">Yes, we provide hosting solutions tailored to your website's needs. Our hosting packages include maintenance, backups, and security updates.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold mb-2">What technologies do you use?</h4>
              <p className="text-muted-foreground">We specialize in React, TypeScript, Tailwind CSS, and Next.js for frontend development. For backend, we use Node.js, PostgreSQL, and various cloud services.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold mb-2">Do you offer maintenance after launch?</h4>
              <p className="text-muted-foreground">Yes, we offer various maintenance packages to keep your site secure, updated, and performing optimally. Ask about our monthly maintenance plans.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
