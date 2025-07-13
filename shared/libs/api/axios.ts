import axios, { AxiosError, AxiosRequestConfig } from "axios";
import API from "./endpoints";
import { authToken } from "@/shared/utils/token";
import PATH from "@/shared/path";

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = authToken.get()?.access;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes(API.auth.refresh())) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: any) => {
                            originalRequest.headers = {
                                ...originalRequest.headers,
                                Authorization: `Bearer ${token}`,
                            };
                            api(originalRequest).then(resolve).catch(reject);
                        },
                        reject,
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = authToken.get()?.refresh;
                if (!refreshToken) throw new Error("No refresh token found");

                const res = await axios.post(API.auth.refresh(), { refresh_token: refreshToken });

                const { access, refresh } = res.data;

                authToken.set({ access, refresh });

                processQueue(null, access);

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${access}`,
                };

                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                authToken.remove();
                window.location.href = PATH.login();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

export default api;
