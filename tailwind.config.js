/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          alabaster: '#F6F4F0',
          wall: '#F3EFEA',
          paper: '#EFECE6',
          matting: '#E8E4DC',
          hairline: '#DCD8D0',
          darkhairline: '#2A2A2A',
          bronze: '#8C7355',
          bronzelight: '#B3936E',
          bronzedark: '#5A4A36',
          obsidian: '#121212',
          wing: '#141414',
          charcoal: '#1A1A1A',
          card: '#1E1E1E',
          muted: '#7E766D',
          darkmuted: '#A29D94',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        monumental: '0.22em',
        widest: '0.15em',
        curatorial: '0.12em',
      },
      boxShadow: {
        'gallery-subtle': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 20px 40px -15px rgba(0, 0, 0, 0.04)',
        'gallery-elevated': '0 25px 60px -15px rgba(0, 0, 0, 0.16), 0 10px 20px -5px rgba(0, 0, 0, 0.08)',
        'spotlight': '0 0 120px 20px rgba(140, 115, 85, 0.18)',
        'inner-frame': 'inset 0 0 0 1px rgba(140, 115, 85, 0.3), inset 0 2px 8px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
