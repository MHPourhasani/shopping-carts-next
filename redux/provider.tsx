"use client";
import { ThemeProviders } from "@/shared/providers/Theme";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProviders>{children}</ThemeProviders>
        </Provider>
    );
}
