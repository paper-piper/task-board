/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Space Grotesk"', "sans-serif"],
                body: ['"Inter"', "system-ui", "sans-serif"],
            },
        },
    }, // TODO: insert this cool ass thing
    plugins: [],
};
