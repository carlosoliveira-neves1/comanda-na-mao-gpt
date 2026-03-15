export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 22px 70px rgba(255, 170, 190, 0.18)",
        card: "0 12px 35px rgba(15, 23, 42, 0.08)",
        panel: "0 14px 30px rgba(15, 23, 42, 0.06)"
      },
      colors: {
        brand: {
          peach: "#ffbe78",
          pink: "#ff8fb1",
          sky: "#6fd3ff",
          violet: "#bba5ff"
        }
      }
    }
  },
  plugins: []
}
