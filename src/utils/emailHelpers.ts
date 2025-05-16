
import emailjs from '@emailjs/browser';

interface EmailParams {
  name: string;
  email: string;
  message: string;
  to_email?: string;
}

export const sendContactEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: params.name,
      reply_to: params.email,
      message: params.message,
      to_email: params.to_email || 'Snowax.dev@proton.me'
    };
    
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_contact_form',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact',
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const initEmailJS = () => {
  if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('EmailJS public key not found. Contact form will not work correctly.');
  }
};
