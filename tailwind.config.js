/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      minWidth: {
        vw: '100vw',
      },
      minHeight: {
        'vh-50px': 'calc(100vh - 50px)',
      },
      transitionDuration: {
        175: '175ms',
        600: '600ms',
      },
      colors: {
        'btn-blue': '#1385e6',
        'light-blue': '#757ce8',
        'medium-blue': '#3f50b5',
        'dark-blue': '#002884',
        'white': '#fff',
        'light-red': '#ff7961',
        'medium-red': '#f44336',
        'dark-red': '#ba000d',
        'black': '#000',
      },
    },
  },
  plugins: [],
};
