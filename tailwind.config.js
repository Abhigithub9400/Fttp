/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideInFromBottom: {
          '0%': { transform: 'translate(100%, 100%) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateY(50) scale(1)', opacity: '1' }
        }
      },
      animation: {
        slideInFromBottom: 'slideInFromBottom 0.5s ease-out forwards'
      },
      colors: {
        primaryRed: '#AA1410',
        customYellow: '#FDB022',
        disabledGray: '#B8B8B8',
        messageText: '#2A2A2A',
        pinkFrom: '#FFD7D7',
        pinkTo: '#F9E1E1s',
        userColor: '#FFF'
      },
      width: {
        'title-icon-width': '32px',
        'logo-width': '17.81px',
        'button-prev-width': '120px',
        'button-next-width': '85px',
        'card-width': '443px',
        'star-width': '12px',
        'star-review-width': '113px',
        'carousel-image-width': '46%',
        'map-width': '100%'
      },
      height: {
        'title-icon-height': '32px',
        'logo-height': '16px',
        'button-height': '28px',
        'card-height': '122px',
        'name-height': '17px',
        'star-height': '12px',
        'bubble-height': '56px',
        'map-height': '400px'
      },
      fontSize: {
        tiny: '18px',
        small: '14px',
        sm: '12px'
      },
      fontWeight: {
        'extra-bold': 600,
        light: 400
      },
      borderRadius: {
        'button-radius': '8px',
        'card-radius': '10px',
        'img-radius': '4.8px',
        'bubble-radius': '46px'
      },
      padding: {
        'btn-padding': '18px 12px',
        'card-padding': '8px, 10px, 8px, 8px'
      },
      gap: {
        'btn-gap': '6px',
        'card-gap': '10px'
      },
      lineHeight: {
        'name-height': '16.94px'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      left: {
        icon: '5px'
      },
      screens: {
        '773px': '773px',
        '643px': '643px'
      }
    }
  },
  plugins: []
};
