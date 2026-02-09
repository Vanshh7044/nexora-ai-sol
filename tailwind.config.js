/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Nexora colors
        nexora: {
          black: '#0D0D0D',
          charcoal: '#0B0B15',
          violet: '#7C3AED',
          'violet-light': '#A78BFA',
          'violet-dark': '#2E1065',
          cyan: '#22D3EE',
          magenta: '#E879F9',
          lime: '#A3E635',
          amber: '#F59E0B',
          white: '#F4F4F5',
          gray: '#A1A1AA',
        },
      },
      fontFamily: {
        // Global typography aligned with Inter
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(44px, 5.2vw, 78px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'h2': ['clamp(34px, 3.6vw, 56px)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'h3': ['clamp(24px, 2.4vw, 36px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'body': ['clamp(16px, 1.2vw, 18px)', { lineHeight: '1.55' }],
        'micro': ['12px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      borderRadius: {
        '4xl': '28px',
        '3xl': '22px',
        '2xl': '18px',
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 28px 80px rgba(0, 0, 0, 0.55)',
        'glow-violet': '0 0 120px rgba(124, 58, 237, 0.35), 0 0 60px rgba(124, 58, 237, 0.2)',
        'glow-cyan': '0 0 80px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'orb': 'radial-gradient(circle at 30% 30%, #A78BFA 0%, #7C3AED 40%, #2E1065 100%)',
        'card-glow': 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(34,211,238,0.18))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
