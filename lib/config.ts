// lib/config.ts
import { ThemeConfig } from "./types"

interface AppConfig {
  name: string
  theme: ThemeConfig
  links: {
    github: string
    linkedin: string
    medium: string
    startup: string
  }
  navigation: {
    main: Array<{
      name: string
      path: string
      external?: boolean
    }>
  }
}

export const appConfig: AppConfig = {
  name: 'Andrew Aliaj',
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
  links: {
    github: 'https://github.com/Andrewx24',
    linkedin: 'https://www.linkedin.com/in/andrewaliaj/',
    medium: 'https://medium.com/@andrewaliaj',
    startup: 'https://productivitysumo.com',
  },
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
}

