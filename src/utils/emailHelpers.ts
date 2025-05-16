
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

interface EmailParams {
  name: string;
  email: string;
  message: string;
  to_email?: string;
  subject?: string;
}

export const sendContactEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // Form validation
    if (!params.name.trim()) {
      toast.error('Prosím vyplňte vaše jméno');
      return false;
    }
    
    if (!params.email.trim()) {
      toast.error('Prosím vyplňte váš email');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email)) {
      toast.error('Prosím zadejte platný email');
      return false;
    }
    
    if (!params.message.trim()) {
      toast.error('Prosím napište vaši zprávu');
      return false;
    }
    
    // Show sending notification
    toast.loading('Odesílání zprávy...');
    
    const templateParams = {
      from_name: params.name,
      reply_to: params.email,
      message: params.message,
      to_email: params.to_email || 'Snowax.dev@proton.me',
      subject: params.subject || 'Nová zpráva z kontaktního formuláře'
    };
    
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_contact_form',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    // Show success notification
    toast.success('Zpráva byla úspěšně odeslána!');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    // Show error notification
    toast.error('Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu později.');
    return false;
  }
};

export const initEmailJS = () => {
  if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } else {
    console.warn('EmailJS public key not found. Contact form will not work correctly.');
    // Show warning notification only in development
    if (import.meta.env.DEV) {
      toast.warning('EmailJS veřejný klíč nebyl nalezen. Kontaktní formulář nebude fungovat správně.');
    }
  }
};

// Helper for form validation
export const validateForm = (params: Partial<EmailParams>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!params.name?.trim()) {
    errors.push('Prosím vyplňte vaše jméno');
  }
  
  if (!params.email?.trim()) {
    errors.push('Prosím vyplňte váš email');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email)) {
    errors.push('Prosím zadejte platný email');
  }
  
  if (!params.message?.trim()) {
    errors.push('Prosím napište vaši zprávu');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
