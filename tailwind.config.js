export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#0E7C7B",
          600: "#0A6A69",
        },
        accent: {
          500: "#F9A825",
          600: "#C7911F",
        },
        background: "#F9FAFB",
        foreground: "#1F2937",
      },
    },
  },
  plugins: [],
};
