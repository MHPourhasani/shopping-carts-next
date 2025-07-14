import { AUTH_TOKEN_KEY } from "@/shared/constant";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

interface Tokens {
    access: string;
    refresh: string;
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
    params?: Record<string, any>;
    body?: any;
    headers?: Record<string, string>;
    server?: boolean;
}

function getTokenClient(): Tokens | null {
    const m = document.cookie.match(/(?:^|; )MHP_SHOP_AUTH_TOKEN=([^;]+)/);
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
}

async function getTokenServer(): Promise<Tokens | null> {
    const { cookies } = await import("next/headers");
    const val = cookies().get(AUTH_TOKEN_KEY)?.value;
    return val ? JSON.parse(val) : null;
}

const browserAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

browserAxios.interceptors.request.use((cfg) => {
    const tokens = getTokenClient(); // ⬅️ همگام
    if (tokens?.access) cfg.headers!.Authorization = `Bearer ${tokens.access}`;
    return cfg;
});

/* 401 → refresh */
let refreshing = false;
let waiters: Array<(t?: string) => void> = [];

browserAxios.interceptors.response.use(
    (r) => r,
    async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status !== 401 || original._retry) throw error;
        original._retry = true;

        return new Promise((resolve, reject) => {
            waiters.push((newToken) => {
                if (newToken) original.headers!.Authorization = `Bearer ${newToken}`;
                browserAxios(original).then(resolve).catch(reject);
            });
            if (!refreshing) refreshClientToken();
        });
    },
);

async function refreshClientToken() {
    refreshing = true;
    try {
        await browserAxios.post("/auth/refresh");
        const newAccess = getTokenClient()?.access; // ⬅️ همگام
        waiters.forEach((cb) => cb(newAccess));
    } catch {
        waiters.forEach((cb) => cb());
        window.location.href = "/login";
    } finally {
        waiters = [];
        refreshing = false;
    }
}

async function serverFetch<T>(url: URL, opt: RequestOptions = {}): Promise<T> {
    const tokens = await getTokenServer();

    const res = await fetch(url, {
        ...opt,
        method: opt.body ? "POST" : "GET",
        headers: {
            "Content-Type": "application/json",
            ...opt.headers,
            ...(tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}),
        },
        body: opt.body ? JSON.stringify(opt.body) : undefined,
        cache: "no-store",
    });

    if (res.status === 401 && tokens?.refresh) {
        const ref = await fetch(`${process.env.BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: { Cookie: `MHP_SHOP_AUTH_TOKEN=${encodeURIComponent(JSON.stringify(tokens))}` },
        });
        if (!ref.ok) throw new Error("UNAUTHORIZED");

        return serverFetch<T>(url, opt); // retry
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const isServer = typeof window === "undefined" || options.server;
    const url = new URL(endpoint, process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL);
    if (options.params) Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, String(v)));

    if (isServer) {
        return serverFetch<T>(url, options);
    }

    const { data } = await browserAxios.request<T>({
        url: endpoint,
        method: options.body ? "POST" : "GET",
        params: options.params,
        data: options.body,
        headers: options.headers,
    });
    return data;
}

export const get = <T>(u: string, p?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, params: p });
export const post = <T>(u: string, b?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, body: b, method: "POST" });
export const put = <T>(u: string, b?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, body: b, method: "PUT" });
export const del = <T>(u: string, p?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, params: p, method: "DELETE" });
