/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        boxShadow: {
            lg: "0.5rem 0.5rem  5rem  rgba(2, 15, 29, 0.7)",

            "2xl": "1rem 1rem 6rem  rgba(2, 15, 29, 1)",
        },
    },
    plugins: [],
};
