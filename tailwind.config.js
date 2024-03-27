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
  },
  plugins: [],
}