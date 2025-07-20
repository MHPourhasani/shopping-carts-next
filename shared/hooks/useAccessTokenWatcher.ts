import { useEffect, useRef } from "react";
import { getTokenClient } from "../libs/api/axios";

export function useAccessTokenWatcher(onTokenChange: (accessToken: string | null) => void) {
    const lastTokenRef = useRef<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const tokenObj = getTokenClient();
            console.log("tokenObj", tokenObj);
            const currentAccess = tokenObj?.access ?? null;

            if (lastTokenRef.current !== currentAccess) {
                lastTokenRef.current = currentAccess;
                onTokenChange(currentAccess);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onTokenChange]);
}
