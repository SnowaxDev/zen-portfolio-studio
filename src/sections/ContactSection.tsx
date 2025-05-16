
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Send, AlertCircle } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/use-reduced-motion';
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';
import AnimatedSection from '@/components/AnimatedSection';
import SectionTitle from '@/components/SectionTitle';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing again
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = 'Jméno je povinné';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email je povinný';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Neplatný formát emailu';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Zpráva je povinná';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Chyba formuláře",
        description: "Prosím vyplňte všechna povinná pole správně.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare data to send
    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      to_email: 'Snowax.dev@proton.me'
    };
    
    try {
      // Send email using EmailJS
      // Note: You'll need to replace these values with your actual EmailJS service ID, template ID, and public key
      await emailjs.send(
        'service_contact_form', // Replace with your EmailJS service ID
        'template_contact', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      // Show success message
      toast({
        title: "Zpráva odeslána",
        description: "Děkujeme za zprávu! Ozveme se vám co nejdříve.",
        variant: "default",
        action: (
          <div className="h-6 w-6 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-green-500" />
          </div>
        ),
      });
      
      // Clear form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show error message
      toast({
        title: "Chyba při odesílání",
        description: "Nepodařilo se odeslat zprávu. Zkuste to prosím později nebo nás kontaktujte přímo na email.",
        variant: "destructive",
        action: (
          <div className="h-6 w-6 bg-destructive/20 rounded-full flex items-center justify-center">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        ),
      });
    }
    
    setIsSubmitting(false);
  };

  const formWrapperVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const cardHoverVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(212, 175, 55, 0.05), 0 2px 4px -1px rgba(212, 175, 55, 0.03)" 
    },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.15), 0 8px 10px -6px rgba(212, 175, 55, 0.1)" 
    }
  };

  // Decoration elements
  const Decoration = ({ className }: { className?: string }) => (
    <motion.div 
      className={`absolute bg-gradient-to-br from-gold/20 to-purple/20 rounded-full blur-2xl ${className}`}
      animate={{
        opacity: [0.5, 0.3, 0.5],
        scale: [1, 1.05, 1],
      }}
      transition={{ 
        duration: prefersReducedMotion ? 0 : 5, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );

  return (
    <section id="contact" className="py-24 overflow-hidden relative">
      {/* Decorative elements */}
      <Decoration className="w-96 h-96 -top-48 -right-48 opacity-30" />
      <Decoration className="w-72 h-72 bottom-20 -left-36 opacity-20" />
      
      <div className="container-custom max-w-5xl relative z-10">
        <SectionTitle 
          title="Kontaktujte Mě" 
          subtitle="Máte projekt na mysli? Pojďme si o tom popovídat!" 
          alignment="center"
        />
        
        <AnimatedSection delay={0.3} direction="up" className="relative z-10">
          <motion.div 
            className="bg-card/70 backdrop-blur-md rounded-2xl border border-gold/10 shadow-xl overflow-hidden"
            variants={formWrapperVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Two-column layout */}
            <div className="grid md:grid-cols-5 gap-0">
              {/* FAQ Column */}
              <motion.div 
                className="md:col-span-2 bg-gradient-to-br from-background/95 to-background/80 p-6 md:p-8 lg:p-10"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold mb-6 text-gradient">
                  Často Kladené Otázky
                </h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="group"
                    variants={prefersReducedMotion ? {} : cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="bg-background/30 rounded-lg p-5 border border-gold/5 group-hover:border-gold/20 transition-all">
                      <h4 className="font-bold mb-2 text-gold-light">Jak dlouho trvá vytvořit web?</h4>
                      <p className="text-sm text-muted-foreground">
                        Časový plán závisí na složitosti. Základní weby dokončím do 2 týdnů, jednodušší aplikace do 3 týdnů. Komplexní projekty mohou trvat déle.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group"
                    variants={prefersReducedMotion ? {} : cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="bg-background/30 rounded-lg p-5 border border-gold/5 group-hover:border-gold/20 transition-all">
                      <h4 className="font-bold mb-2 text-gold-light">Nabízíte hosting?</h4>
                      <p className="text-sm text-muted-foreground">
                        Ano, poskytuji hostingová řešení přizpůsobená potřebám vašeho webu. Hostingové balíčky zahrnují úložiště, zálohy a bezpečnostní aktualizace.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group"
                    variants={prefersReducedMotion ? {} : cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="bg-background/30 rounded-lg p-5 border border-gold/5 group-hover:border-gold/20 transition-all">
                      <h4 className="font-bold mb-2 text-gold-light">Jaké technologie používáte?</h4>
                      <p className="text-sm text-muted-foreground">
                        Specializuji se na React, TypeScript, Tailwind CSS a Next.js pro frontend. Pro backend používám Node.js, PostgreSQL a různé cloudové služby.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="group"
                    variants={prefersReducedMotion ? {} : cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div className="bg-background/30 rounded-lg p-5 border border-gold/5 group-hover:border-gold/20 transition-all">
                      <h4 className="font-bold mb-2 text-gold-light">Nabízíte i jednorázové úpravy?</h4>
                      <p className="text-sm text-muted-foreground">
                        Ano, kromě kompletních projektů nabízím i jednorázové úpravy existujících webů, redesign, optimalizaci výkonu nebo implementaci nových funkcí.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Form Column */}
              <motion.div 
                className="md:col-span-3 p-6 md:p-8 lg:p-10 relative"
                variants={itemVariants}
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M0 0h4v4H0V0zm4 4h4v4H4V4zm4-4h4v4H8V0zm8 0h4v4h-4V0zm4 4h4v4h-4V4zm-4 4h4v4h-4V8zm8-8h4v4h-4V0zm0 8h4v4h-4V8zm0 8h4v4h-4v-4zm0 8h4v4h-4v-4zm-8-16h4v4h-4V8zm0 16h4v4h-4v-4zm-8-8h4v4H8v-4zm0 8h4v4H8v-4zm-8-8h4v4H0v-4zm0 8h4v4H0v-4z'/%3E%3C/g%3E%3C/svg%3E\")",
                }}/>
                
                <h3 className="text-xl font-bold mb-8 text-gradient-purple relative z-10">
                  Máte projekt na mysli? Pojďme si o tom popovídat!
                </h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gold/80">
                      Vaše Jméno <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jan Novák"
                      className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30 transition-all"
                      aria-invalid={!!formErrors.name}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-destructive mt-1">{formErrors.name}</p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gold/80">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jan@priklad.cz"
                      className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30 transition-all"
                      aria-invalid={!!formErrors.email}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive mt-1">{formErrors.email}</p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    variants={itemVariants}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gold/80">
                      Zpráva <span className="text-red-500">*</span>
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Napište detaily vašeho projektu..."
                      className="bg-background/30 border-gold/10 focus:border-gold/50 focus:ring-gold/30 min-h-[150px] resize-none transition-all"
                      aria-invalid={!!formErrors.message}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-destructive mt-1">{formErrors.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="pt-4"
                    variants={itemVariants}
                  >
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-gold-dark to-gold text-background py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-gold/30 active:translate-y-0.5 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold to-purple opacity-0 group-hover:opacity-20 transition-opacity" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Odesílání...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Odeslat Zprávu
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
