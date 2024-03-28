/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        Gambetta: ["Gambetta", "erif"],
        General : ["General Sans", "sans-serif"]
      }
    },
    backgroundImage: {
      'bg-img-1': "url('./assets/hero1.jpg')",
      'bg-img-2': "url('./assets/hero2.jpg')",
    }
  },
  plugins: [],
}