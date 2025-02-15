"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
    const { resolvedTheme } = useTheme();
    const [isStacked, setIsStacked] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsStacked(true);
        }
    }, []);

    return (
        <ToastContainer
            rtl={true}
            stacked={isStacked}
            autoClose={3000}
            position="bottom-right"
            theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
    );
};

export default Toast;
