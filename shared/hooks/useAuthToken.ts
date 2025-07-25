import { useEffect, useState } from "react";
import { getTokenClient } from "../libs/axios";

export function useAuthToken() {
    const [token, setToken] = useState<string | null>(null);
    const access = getTokenClient()?.access;

    useEffect(() => {
        if (access) setToken(access);
    }, [access]);

    return token;
}
