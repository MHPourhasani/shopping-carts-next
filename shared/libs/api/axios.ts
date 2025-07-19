import { AUTH_TOKEN_KEY } from "@/shared/constants/auth";
import { IToken } from "@/shared/interfaces";
import PATH from "@/shared/utils/path";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { parse } from "cookie";

export interface RequestOptions extends Omit<RequestInit, "body"> {
    params?: Record<string, any>;
    body?: any;
    headers?: Record<string, string>;
    server?: boolean;
}

export function getTokenClient(): IToken | null {
    if (typeof window === "undefined") return null;
    const m = document.cookie.match(new RegExp(`(?:^|; )${AUTH_TOKEN_KEY}=([^;]+)`));
    return m ? JSON.parse(decodeURIComponent(m[1])) : null;
}

export async function getTokenServer(): Promise<IToken | null> {
    const { cookies } = await import("next/headers");
    const val = cookies().get(AUTH_TOKEN_KEY)?.value;
    return val ? JSON.parse(val) : null;
}

const browserAxios = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});

browserAxios.interceptors.request.use((cfg) => {
    const tokens = getTokenClient();
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
        const { data } = await browserAxios.post("/api/auth/refresh");
        const newAccess = data?.access;
        waiters.forEach((cb) => cb(newAccess));
    } catch {
        waiters.forEach((cb) => cb());
        window.location.href = PATH.login();
    } finally {
        waiters = [];
        refreshing = false;
    }
}

async function serverFetch<T>(url: URL, opt: RequestOptions = {}, hasRetried = false): Promise<T> {
    const tokens = await getTokenServer();
    const { cookies } = await import("next/headers");
    const cookieHeader = decodeURIComponent(cookies().toString());

    const res = await fetch(url, {
        ...opt,
        method: opt.method ?? (opt.body ? "POST" : "GET"),
        headers: {
            "Content-Type": "application/json",
            ...opt.headers,
            ...(tokens?.access ? { Authorization: `Bearer ${tokens.access}` } : {}),
            Cookie: cookieHeader,
        },
        body: opt.body ? JSON.stringify(opt.body) : undefined,
        cache: "no-store",
    });

    if (res.status === 401 && tokens?.refresh && !hasRetried) {
        const ref = await fetch(`${process.env.BASE_URL}/api/auth/refresh`, {
            method: "POST",
            headers: {
                Cookie: cookieHeader,
            },
        });

        if (!ref.ok) {
            await fetch(`${process.env.BASE_URL}/api/auth/logout`, {
                method: "POST",
                headers: { Cookie: cookieHeader },
            });
            throw new Error("UNAUTHORIZED");
        }

        // ⬇️ دستی توکن جدید رو از Set-Cookie بگیر
        const setCookieHeader = ref.headers.get("set-cookie");
        if (!setCookieHeader) throw new Error("No Set-Cookie in refresh response");

        // ⬇️ کوکی رو پارس کن
        const parsedCookies = parse(setCookieHeader);
        const newTokenString = parsedCookies[AUTH_TOKEN_KEY];
        if (!newTokenString) throw new Error("No auth token found in new cookie");

        const newToken: IToken = JSON.parse(decodeURIComponent(newTokenString));

        // 🔁 دوباره درخواست بفرست ولی با توکن جدید
        return fetch(url, {
            ...opt,
            method: opt.method ?? (opt.body ? "POST" : "GET"),
            headers: {
                "Content-Type": "application/json",
                ...opt.headers,
                Authorization: `Bearer ${newToken.access}`,
                Cookie: `MHP_SHOP_AUTH_TOKEN=${encodeURIComponent(newTokenString)}`, // کوکی جدید
            },
            body: opt.body ? JSON.stringify(opt.body) : undefined,
            cache: "no-store",
        }).then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        });
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const isServer = typeof window === "undefined" || options.server;
    const url = new URL(endpoint, process.env.API_BASE_URL ?? process.env.BASE_URL);
    if (options.params) Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, String(v)));

    if (isServer) {
        return serverFetch<T>(url, options);
    }

    const { data } = await browserAxios.request<T>({
        url: endpoint,
        method: options.method ?? (options.body ? "POST" : "GET"),
        params: options.params,
        data: options.body,
        headers: options.headers,
    });
    return data;
}

export const get = <T>(u: string, p?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, params: p });
export const post = <T>(u: string, b?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, body: b, method: "POST" });
export const put = <T>(u: string, b?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, body: b, method: "PUT" });
export const patch = <T>(u: string, b?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, body: b, method: "PATCH" });
export const del = <T>(u: string, p?: any, o?: RequestOptions) => apiRequest<T>(u, { ...o, params: p, method: "DELETE" });
