/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx'],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin'), 'node_modules/flowbite-react'],
}
