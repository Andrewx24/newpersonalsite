// lib/config.ts
import { ThemeConfig } from "./types"

// Define our application configuration interface
interface AppConfig {
  // Basic information about the site owner
  name: string
  email: string
  role: string
  location: string

  // Theme configuration for consistent styling
  theme: ThemeConfig

  // External links and social media profiles
  links: {
    github: string
    linkedin: string
    medium: string
    startup: string
    email: string
  }

  // Navigation configuration for the site
  navigation: {
    main: Array<{
      name: string
      path: string
      external?: boolean
    }>
  }

  // Contact information and preferences
  contact: {
    availability: string
    preferredMethod: string
    response_time: string
  }
}

// Export our configuration with all the necessary values
export const appConfig: AppConfig = {
  // Personal information
  name: 'Andrew Aliaj',
  email: 'theunscriptedcoder@gmail.com',
  role: 'Software Engineer & Full Stack Developer',
  location: 'NY Tri-State Area',

  // Theme configuration
  theme: {
    radius: {
      default: '0.5rem',
      sm: '0.3rem',
      lg: '0.7rem',
    },
    colors: {
      primary: {
        default: '#21568a',
        hover: '#1a4571',
        light: '#3178c6',
        dark: '#152028',
      },
      background: {
        light: '#f4f3ee',
        dark: '#152028',
      },
      text: {
        light: '#1a1a1a',
        dark: '#ffffff',
      },
      accent: {
        light: '#3178c6',
        dark: '#1a2634',
      },
    },
    fonts: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
  },

  // Social and professional links
  links: {
    github: 'https://github.com/Andrewx24',
    linkedin: 'https://www.linkedin.com/in/andrewaliaj/',
    medium: 'https://medium.com/@andrewaliaj',
    startup: 'https://productivitysumo.com',
    email: 'mailto:theunscriptedcoder@gmail.com'
  },

  // Site navigation
  navigation: {
    main: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/#about' },
      { name: 'Skills', path: '/#skills' },
      { name: 'Contact', path: '/#contact' },
      { name: 'Blog', path: 'https://medium.com/@andrewaliaj', external: true },
      { name: 'My Startup', path: 'https://productivitysumo.com', external: true },
    ],
  },

  // Contact preferences and information
  contact: {
    availability: 'Available for remote work worldwide',
    preferredMethod: 'email',
    response_time: '24-48 hours'
  }
};