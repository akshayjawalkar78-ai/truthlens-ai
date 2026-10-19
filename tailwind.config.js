export default {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#123C32",
          emerald: "#176B52",
          mint: "#DDF3E7",
          ivory: "#FAF9F6",
          ink: "#202923",
          muted: "#6F7C74",
          sage: "#E8EDE7",
          amber: "#E8B65A",
        },
        primary: {
          50: "#F4FAF7",
          100: "#DDF3E7",
          500: "#176B52",
          600: "#123C32",
          700: "#123C32",
        },
        accent: {
          500: "#E8B65A",
          600: "#D4992A",
        },
        background: "#FAF9F6",
        foreground: "#202923",
      },
      boxShadow: {
        soft: "0 14px 34px rgba(18, 60, 50, 0.08)",
      },
    },
  },
  plugins: [],
};
