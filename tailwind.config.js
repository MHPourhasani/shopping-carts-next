/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./assets/**/*.{jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#E5D8F6",
                    100: "#9747FF",
                },
                secondary: {
                    50: "#F2F2F2",
                    100: "#DBDBDB",
                    300: "#595959",
                    400: "#4d4d4d",
                    500: "#434343",
                    600: "#3b3b3b",
                    700: "#252525",
                    800: "#121212",
                },
                bg: {
                    2: "#F4F4F4",
                },
                customBlack: {
                    50: "#3b3b3b",
                    100: "#272727",
                    200: "#1a1a1a",
                },
            },
            borderWidth: {
                1.5: "1.5px",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    variants: {
        display: ["responsive", "group", "group-hover", "group-focus"],
    },
    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
