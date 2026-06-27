/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
        },
        accent: '#8B5CF6',
        secondary: '#0EA5E9',
        surface: '#FFFFFF',
        surfaceDark: '#0F172A',
        glass: 'rgba(255,255,255,0.72)',
      },
      boxShadow: {
        soft: '0 25px 80px rgba(15, 23, 42, 0.12)',
        glow: '0 0 60px rgba(139, 92, 246, 0.16)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.12), transparent 30%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
