/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*"],
  theme: {
    extend: {
      colors: {
        "orange-ademicon" : "#CE2616",
        "orange-ademicon-light": "#ecb163"
      },
      fontFamily: {
        'sans': ['roboto-regular', 'sans-serif'],
      },

      height: {
        "4/6": "87%",
        "2/2": '70%',
        "1/1": "10%",
        "5/7": "90%",
        "5/8": "92%"
      },

      width: {
        "2/2": "27%",
        "110": "450px",
        "150": "600px",
        "5/7": "90%"
      }
    },
  },
  plugins: [],
}

