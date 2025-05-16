import daisyui from 'daisyui'; // Use `import` instead of `require`

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // No need for `require()`, just use the import
};
