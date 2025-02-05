/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        thin: ["Poppins-Thin", "sans-serif"],
        thinItalic: ["Poppins-ThinItalic", "sans-serif"],
        light: ["Poppins-Light", "sans-serif"],
        lightItalic: ["Poppins-LightItalic", "sans-serif"],
        medium: ["Poppins-Medium", "sans-serif"],
        mediumItalic: ["Poppins-MediumItalic", "sans-serif"],
        semiBold: ["Poppins-SemiBold", "sans-serif"],
        semiBoldItalic: ["Poppins-SemiBoldItalic", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
        boldItalic: ["Poppins-BoldItalic", "sans-serif"],
        extraLight: ["Poppins-ExtraLight", "sans-serif"],
        extraLightItalic: ["Poppins-ExtraLightItalic", "sans-serif"],
        extraBold: ["Poppins-ExtraBold", "sans-serif"],
        extraBoldItalic: ["Poppins-ExtraBoldItalic", "sans-serif"],
        black: ["Poppins-Black", "sans-serif"],
        blackItalic: ["Poppins-BlackItalic", "sans-serif"],
        italic: ["Poppins-Italic", "sans-serif"],
        regular: ["Poppins-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
}