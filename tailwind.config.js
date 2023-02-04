module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#036635",
          "secondary": "#b4ddc0",
          "accent": "#f67695",
          "neutral": "#3D4451",
          "base-100": "#f7f6f5",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: { 
      
    },
  },
  plugins: [require("daisyui")],
}
