// Types for theme configuration
export interface ThemeConfig {
    radius: {
      default: string
      sm: string
      lg: string
    }
    colors: {
      primary: {
        default: string
        hover: string
        light: string
        dark: string
      }
      background: {
        light: string
        dark: string
      }
      text: {
        light: string
        dark: string
      }
      accent: {
        light: string
        dark: string
      }
    }
    fonts: {
      sans: string
      mono: string
    }
  }