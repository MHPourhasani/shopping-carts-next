"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "@/assets/icons/components/Sun";
import MoonIcon from "@/assets/icons/components/Moon";
import LoadingIcon from "@/assets/icons/components/Loading";

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <LoadingIcon className="animate-spin fill-customBlack-100 stroke-customBlack-100" />;

    if (resolvedTheme === "dark") {
        return <SunIcon onClick={() => setTheme("light")} className="size-6 cursor-pointer fill-white" />;
    }

    if (resolvedTheme === "light") {
        return <MoonIcon onClick={() => setTheme("dark")} className="size-7 rotate-90 cursor-pointer fill-customBlack-200" />;
    }
}
