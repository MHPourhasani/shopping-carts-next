const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    purge: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./features/**/*.{js,ts,jsx,tsx,mdx}",
        "./shared/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./assets/**/*.{jsx,tsx}",
    ],
    swcMinify: true,
    env: {
        API_BASE_URL: "https://mhp-shop-backend-nest.onrender.com/api",
        MONGODB_URI: "mongodb+srv://srmhp1381:mhpmongo110..@shop.rubrrh7.mongodb.net/mhp-shop",
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "Yz7v+ZdjHWFXwnTm+cAIlQPNAKuwVACL/6lh6ug9Uqs=",
        GITHUB_ID: "16d86c5991c8a9f397ae",
        GITHUB_SECRET: "b12e58ae4fe0fa8a7e1883556c79764c8bbf8285",
        TAX_PERCENT: 9,
        shop_name: "فروشگاه MHP",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "abrehamrahi.ir",
                port: "",
                pathname: "/o/public/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/robots.txt",
                destination: "/app/robots",
            },
        ];
    },
    experimental: {
        optimizeCss: true,
        optimizeFonts: true,
    },
};

module.exports = withPWA(nextConfig);
