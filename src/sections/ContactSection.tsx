
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../hooks/use-toast';
import SectionTitle from '../components/SectionTitle';
import { AspectRatio } from '../components/ui/aspect-ratio';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import ScrollReveal from '../components/ScrollReveal';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Zpráva odeslána!",
        description: "Děkuji za vaši zprávu. Ozvu se vám co nejdříve.",
      });
      
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };
  
  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.2, y: -5 }
  };

  const faqItems = [
    {
      question: "Jak dlouho trvá vytvořit web?",
      answer: "Časový plán závisí na složitosti: Základní weby dokončím do 2 týdnů, jednodušší weby a jednoduší aplikace do 3 týdnů. Komplexní projekty mohou trvat déle."
    },
    {
      question: "Nabízíte hosting?",
      answer: "Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují údržbu, zálohy a bezpečnostní aktualizace."
    },
    {
      question: "Jaké technologie používáte?",
      answer: "Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby."
    },
    {
      question: "Nabízíte i jednorázové úpravy?",
      answer: "Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí."
    }
  ];

  return (
    <section id="contact" className="section pb-24">
      <div className="container-custom max-w-6xl">
        <ScrollReveal direction="up" className="w-full" threshold={0.2}>
          <SectionTitle 
            title="Kontaktujte Mě" 
            subtitle="Máte projekt na mysli? Pojďme si o tom popovídat!"
          />
        </ScrollReveal>
        
        {/* FAQ Section - Above Contact Form */}
        <ScrollReveal direction="up" className="w-full mb-16" delay={0.1} distance={30}>
          <div className="bg-card/80 shadow-lg rounded-xl backdrop-blur-sm border border-white/10 overflow-hidden mb-16">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-gradient">Často Kladené Otázky</h3>
              
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10">
                    <AccordionTrigger className="text-left text-lg py-4 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <ScrollReveal direction="right" className="lg:w-3/5 w-full" delay={0.2}>
            <div className="bg-card/80 backdrop-blur-sm border border-white/10 shadow-lg rounded-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Máte projekt na mysli? Pojďme si o tom popovídat!</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/80">Vaše Jméno</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-secondary/30 border-white/10 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/80">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-secondary/30 border-white/10 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground/80">Zpráva</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-secondary/30 border border-white/10 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Odesílám...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Odeslat Zprávu
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Contact Information */}
          <ScrollReveal direction="left" className="lg:w-2/5 w-full" delay={0.3}>
            <div className="h-full bg-primary text-white rounded-xl overflow-hidden shadow-lg">
              <AspectRatio ratio={5/6} className="h-full">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-2xl font-bold mb-8">Kontaktní Informace</h3>
                    
                    <motion.div 
                      className="space-y-6"
                      variants={contactInfoVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.div variants={contactItemVariants} className="flex items-start">
                        <Mail className="mr-3 h-5 w-5 mt-0.5 text-white/80" />
                        <div>
                          <p className="text-white/70 text-sm">Email</p>
                          <p className="font-medium">info@jan-novak.cz</p>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={contactItemVariants} className="flex items-start">
                        <Phone className="mr-3 h-5 w-5 mt-0.5 text-white/80" />
                        <div>
                          <p className="text-white/70 text-sm">Telefon</p>
                          <p className="font-medium">+420 777 123 456</p>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={contactItemVariants} className="flex items-start">
                        <MapPin className="mr-3 h-5 w-5 mt-0.5 text-white/80" />
                        <div>
                          <p className="text-white/70 text-sm">Lokalita</p>
                          <p className="font-medium">Praha, Česká republika</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-white/70 mb-3">Sledujte mě</p>
                    <div className="flex space-x-5">
                      <motion.a 
                        href="#" 
                        className="text-white hover:text-white/80"
                        variants={socialIconVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <Github className="h-6 w-6" />
                      </motion.a>
                      
                      <motion.a 
                        href="#" 
                        className="text-white hover:text-white/80"
                        variants={socialIconVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <Linkedin className="h-6 w-6" />
                      </motion.a>
                      
                      <motion.a 
                        href="#" 
                        className="text-white hover:text-white/80"
                        variants={socialIconVariants}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                      >
                        <Twitter className="h-6 w-6" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
