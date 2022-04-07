module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      fontFamily: {
        source: ['"Source Sans Pro"', "sans-serif"],
        merriweather: ['"Merriweather Sans"', "sans-serif"],
      },
      colors: {
        yellow: "#FBE8A6",
        orange: "#F4976C",
        darkblue: "#303C6C",
        lightblue: "#B4DFE5",
        lighterblue: "#D2FDFF",
        black: "#000000",
        white: "#f0f8ff",
        red: "#ef3038",
        green: "#228b22",
      },
    },
  },
  plugins: [],
};
