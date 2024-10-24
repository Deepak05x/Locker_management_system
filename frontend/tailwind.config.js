/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#6366f1",
                white: "#ffffff",
            },
        },
    },
    plugins: [],
};
