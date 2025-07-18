import { useEffect, useRef } from "react";
import { getTokenClient } from "@/shared/libs/api/axios";

export function useAccessTokenWatcher(onTokenChange: (accessToken: string | null) => void) {
    const lastTokenRef = useRef<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const tokenObj = getTokenClient();
            const currentAccess = tokenObj?.access ?? null;

            // اگر توکن جدید با قبلی فرق داشت، فراخوانی انجام بده
            if (lastTokenRef.current !== currentAccess) {
                lastTokenRef.current = currentAccess;
                onTokenChange(currentAccess);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onTokenChange]);
}
