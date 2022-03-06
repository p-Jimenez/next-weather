module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        weather: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: '#1e40af',
          // secondary: '#0f172a',
          accent: '#ffc107',
          // neutral: '#212121',
          // "base-100": '#f5f5f5',

        }
      }
    ]
  },
}
