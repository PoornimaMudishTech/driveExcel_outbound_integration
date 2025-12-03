/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  important: '#driver-bot-root', // ⭐ ADD THIS - Scope to widget
  prefix: 'db-', // ⭐ ADD THIS - Prefix all classes
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['DM Sans"', 'sans-serif'],
        poppins: ['Poppins"', 'sans-serif'],
        publicsans: ['Public Sans"', 'sans-serif'],
        intersans: ['Inter"', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        third: '#25274D',
        brand: '#F5F5F5',
        brandBorder: '#DBDADE',
        link: '#0F60FF',
        dark: {
          DEFAULT: '#202224',
          darker: '#23272E',
          light: '#4B4C4D',
          lighter: '#4C5155',
          lightBlack: '#030229'
        },
        tablelink: '#23272E',
        background: 'hsl(var(--background))',
        heading: '#141516',
        profileBg: '#D8D8D8',
        gray: {
          DEFAULT: '#99A0AE',
          light: '#E9E9E9',
          lighter: '#F4F4F4',
          lightgray: '#FAFAFB',
          darker: '#2F4160'
        },
        pagination: {
          background: '#F1F2F6',
          active: '#25274D',
          text: '#8B909A'
        },
        status: {
          new: '#22a16c',
          progress: '#f2eade',
          info: '#fca800',
          success: '#28C76F',
          overdue: '#25274D',
          review: '#1559bf',
          rejected: '#c9372c'
        },
        'redState-links': {
          link: '#4C5155'
        },
        button: {
          primary: '#25274D',
          secondary: '#DEE0E7',
          danger: '#FB3748'
        },
        success: '#28C76F',
        warning: '#FFC600',
        white: '#FFFFFF',
        danger: '#FF0000',
        lightRed: '#FAEDEE',
        errorText: '#8D8D8D',
        dropdownArrow: '#4C5155',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: false, // ⭐ ADD THIS - Don't reset host site styles
  },
}