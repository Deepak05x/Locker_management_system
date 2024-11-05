/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: "#6366f1",
                },
                white: {
                    DEFAULT: "#ffffff",
                },
            },
            screens: {
                ssm: "320px",
            },
        },
    },
    plugins: [],
};
