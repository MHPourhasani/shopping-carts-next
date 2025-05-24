import localFont from "next/font/local";

export const iranSans = localFont({
    src: [
        {
            style: "normal",
            weight: "900",
            path: "../assets/fonts/IRANSansWeb(FaNum)_Black.ttf",
        },
        {
            style: "normal",
            weight: "bold",
            path: "../assets/fonts/IRANSansWeb(FaNum)_Bold.ttf",
        },
        {
            style: "normal",
            weight: "500",
            path: "../assets/fonts/IRANSansWeb(FaNum)_Medium.ttf",
        },
        {
            style: "normal",
            weight: "300",
            path: "../assets/fonts/IRANSansWeb(FaNum)_Light.ttf",
        },
        {
            style: "normal",
            weight: "200",
            path: "../assets/fonts/IRANSansWeb(FaNum)_UltraLight.ttf",
        },
        {
            style: "normal",
            weight: "normal",
            path: "../assets/fonts/IRANSansWeb(FaNum).ttf",
        },
    ],
    variable: "--font-iranSans",
});
