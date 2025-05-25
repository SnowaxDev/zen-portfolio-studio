
// Centralized Design System Configuration
export const designSystem = {
  // Typography Scale
  typography: {
    fontFamily: {
      primary: ['Space Grotesk', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem',      // 64px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Color Palette
  colors: {
    primary: {
      gold: '#D4AF37',
      'gold-light': '#F8D568',
      'gold-dark': '#A67C00',
    },
    accent: {
      purple: '#8B5CF6',
      'purple-light': '#A78BFA',
      'purple-dark': '#6D28D9',
      blue: '#3B82F6',
      'blue-light': '#60A5FA',
      'blue-dark': '#1D4ED8',
    },
    neutral: {
      black: '#000000',
      'gray-900': '#111827',
      'gray-800': '#1F2937',
      'gray-700': '#374151',
      'gray-600': '#4B5563',
      'gray-500': '#6B7280',
      'gray-400': '#9CA3AF',
      'gray-300': '#D1D5DB',
      'gray-200': '#E5E7EB',
      'gray-100': '#F3F4F6',
      white: '#FFFFFF',
    },
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    gold: '0 0 20px rgba(212, 175, 55, 0.3)',
    'gold-lg': '0 0 30px rgba(212, 175, 55, 0.5)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
    'purple-lg': '0 0 30px rgba(139, 92, 246, 0.5)',
  },

  // Animation Presets
  animations: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Component Variants
  components: {
    card: {
      base: 'bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden transition-all duration-300 shadow-xl',
      hover: 'hover:border-gold/30 hover:shadow-gold/20',
      interactive: 'cursor-pointer transform hover:-translate-y-1',
    },
    button: {
      primary: 'bg-gradient-to-r from-gold to-gold-light text-black font-medium px-6 py-3 rounded-lg hover:shadow-gold transition-all duration-300',
      secondary: 'bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 px-6 py-3 rounded-lg',
      ghost: 'text-gold hover:text-gold-light transition-colors duration-300',
    },
    text: {
      heading: 'font-bold text-white',
      subheading: 'font-medium text-gray-300',
      body: 'text-gray-400',
      accent: 'text-gold',
      gradient: 'bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent',
    },
  },
};

// Utility functions for consistent styling
export const getSpacing = (size: keyof typeof designSystem.spacing) => designSystem.spacing[size];
export const getColor = (color: string) => {
  const [category, shade] = color.split('-');
  if (shade) {
    return designSystem.colors[category as keyof typeof designSystem.colors]?.[shade as any];
  }
  return designSystem.colors[category as keyof typeof designSystem.colors];
};

export const getShadow = (type: keyof typeof designSystem.shadows) => designSystem.shadows[type];
export const getAnimation = (property: 'duration' | 'easing', value: string) => 
  designSystem.animations[property][value as keyof typeof designSystem.animations[typeof property]];
