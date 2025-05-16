
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

interface EmailParams {
  name: string;
  email: string;
  message: string;
  to_email?: string;
  subject?: string;
}

// More robust email validation regex
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const sendContactEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    // Form validation with more robust checks
    const validationResult = validateForm(params);
    
    if (!validationResult.isValid) {
      toast.error(validationResult.errors[0]);
      return false;
    }
    
    // Show sending notification with a unique ID to allow dismissal
    const loadingToastId = toast.loading('Odesílání zprávy...', {
      id: 'sending-email',
      duration: 10000, // Set reasonable timeout
    });
    
    const templateParams = {
      from_name: params.name.trim(),
      reply_to: params.email.trim(),
      message: params.message.trim(),
      to_email: params.to_email || 'Snowax.dev@proton.me',
      subject: params.subject || 'Nová zpráva z kontaktního formuláře'
    };
    
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_contact_form',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    // Dismiss the loading toast and show success
    toast.dismiss('sending-email');
    toast.success('Zpráva byla úspěšně odeslána!');
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Dismiss the loading toast and show a detailed error
    toast.dismiss('sending-email');
    
    // More user-friendly error message
    toast.error('Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu později.');
    return false;
  }
};

export const initEmailJS = () => {
  if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      if (import.meta.env.DEV) {
        toast.warning('Problém při inicializaci EmailJS. Kontaktní formulář nemusí fungovat správně.');
      }
    }
  } else {
    console.warn('EmailJS public key not found. Contact form will not work correctly.');
    // Show warning notification only in development
    if (import.meta.env.DEV) {
      toast.warning('EmailJS veřejný klíč nebyl nalezen. Kontaktní formulář nebude fungovat správně.');
    }
  }
};

// Helper for form validation with more robust checks
export const validateForm = (params: Partial<EmailParams>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!params.name?.trim()) {
    errors.push('Prosím vyplňte vaše jméno');
  }
  
  if (!params.email?.trim()) {
    errors.push('Prosím vyplňte váš email');
  } else if (!EMAIL_REGEX.test(params.email.trim())) {
    errors.push('Prosím zadejte platný email');
  }
  
  if (!params.message?.trim()) {
    errors.push('Prosím napište vaši zprávu');
  } else if (params.message.trim().length < 10) {
    errors.push('Zpráva je příliš krátká. Napište prosím alespoň 10 znaků.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
