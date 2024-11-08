import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "@/redux/provider";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import React, { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProviders } from "@/providers/Theme";
import Wrapper from "./_wrapper";
import Toast from "@/components/Toast";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Loading from "./loading";

const title = process.env.shop_name!;
const description = "این یک پروژه فروشگاهی حرفه ای است.";
const url = "https://mhp-shop.vercel.app";

export const metadata: Metadata = {
    title: {
        default: title,
        template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    appleWebApp: {
        capable: true,
        title: title,
        statusBarStyle: "default",
        startupImage: [
            {
                url: "/images/png/splash_screens/iPhone_16_Pro_Max_portrait.png",
                media: "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_16_Pro_portrait.png",
                media: "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
                media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
                media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
                media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
                media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
                media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
                media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_11__iPhone_XR_portrait.png",
                media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
                media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
                media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
                media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/13__iPad_Pro_M4_portrait.png",
                media: "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/12.9__iPad_Pro_portrait.png",
                media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/11__iPad_Pro_M4_portrait.png",
                media: "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
                media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/10.9__iPad_Air_portrait.png",
                media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/10.5__iPad_Air_portrait.png",
                media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/10.2__iPad_portrait.png",
                media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
                media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
            {
                url: "/images/png/splash_screens/8.3__iPad_Mini_portrait.png",
                media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
            },
        ],
    },
    manifest: "/manifest.json",
    alternates: { canonical: url },
    authors: [{ name: "MH Pourhasani", url: "https://mh-pourhasani.vercel.app/" }],
    keywords: ["Shopping Cart", "MHP Shop", "shoes", "shop", "shoe", "adidas", "nike", "ecco", "reebok"],
    icons: { icon: "/icons/android/android-launchericon-512-512.png" },
    openGraph: {
        title: title,
        description: description,
        url: url,
        siteName: title,
    },
    twitter: { title: title, description: description, site: url },
    other: {
        "twitter:url": url,
        "revisit-after": "7 days",
        "mobile-web-app-capable": "yes",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#9747FF" },
        { media: "(prefers-color-scheme: dark)", color: "#9747FF" },
    ],
};

const iranSans = localFont({
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
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
            <Suspense fallback={<Loading />}>
                <body
                    className={`flex min-h-screen w-full max-w-full flex-col items-center justify-start overflow-x-hidden bg-white dark:bg-secondary-800 ${iranSans.className}`}
                >
                    <Providers>
                        <NextAuthSessionProvider>
                            <ThemeProviders>
                                <Toast />

                                <Wrapper>
                                    {children}
                                    <Navbar />
                                    <SpeedInsights />
                                </Wrapper>

                                <div id="shop-modal" />
                            </ThemeProviders>
                        </NextAuthSessionProvider>
                    </Providers>
                </body>
            </Suspense>
        </html>
    );
}
