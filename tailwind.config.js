/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#CF8934",
        secondary: "#CDAB3F",
        tertiary: "#614319",
        accent: "#003500",
        primarybackground: "#D9D9D9",
        secondarybackground: "#737373",
        tertiarybackground: "#FFFAFF",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem", // 10px
        xs: "0.60rem", // 12px
        sm: "0.75rem", // 14px
        base: ".90rem", // 16px
        lg: "1.1rem", // 18px
        xl: "1.2rem", // 20px
        "2xl": "1.3rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
      },
    },
  },
  plugins: [],
};
