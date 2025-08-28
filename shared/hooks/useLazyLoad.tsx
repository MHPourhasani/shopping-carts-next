import { useEffect, useRef, useState } from "react";
import type { AxiosError } from "axios";
import { get } from "../libs/axios";
import { IPaginatedResponse } from "../interfaces";

interface UseLazyLoadProps<T> {
    url: string;
    params?: Record<string, any>;
    ref: React.RefObject<HTMLElement>;
    enabled?: boolean;
    initial?: IPaginatedResponse<T>;
}

export function useLazyLoad<T>({ url, params = {}, ref, enabled = true, initial }: UseLazyLoadProps<T>) {
    const [lists, setLists] = useState<T[]>(initial?.results || []);
    const [nextUrl, setNextUrl] = useState<string | null>(initial ? initial.next : url);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        if (!enabled || !ref.current) return;

        const el = ref.current;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextUrl && !isLoading) {
                    fetchNext();
                }
            },
            { threshold: 0.5 },
        );

        observer.current.observe(el);

        return () => {
            observer.current?.disconnect();
        };
    }, [ref, nextUrl, isLoading, enabled]);

    const fetchNext = async () => {
        if (!nextUrl || isLoading || nextUrl === url) return;

        setIsLoading(true);
        setError(null);

        try {
            abortController.current?.abort();
            const controller = new AbortController();
            abortController.current = controller;

            const res = await get<IPaginatedResponse<T>>(nextUrl, params, {
                signal: controller.signal,
            });

            setLists((prev) => [...prev, ...res.results]);
            setNextUrl(res.next);
        } catch (err: any) {
            if ((err as AxiosError)?.name !== "CanceledError") {
                setError((err as Error).message || "Unknown error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setLists([]);
        setNextUrl(url);
        setError(null);
    };

    return {
        lists,
        setLists,
        isLoading,
        error,
        reset,
    };
}
