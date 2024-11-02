import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/dashboard", "/dashboard/*", "/profile", "/profile/*"],
        },
        sitemap: "https://mhp-shop.vercel.app",
    };
}
