import { useEffect, useState, useRef, useCallback } from "react";
import { IPaginatedResponse } from "../interfaces";
import { get } from "../libs/axios";

type Props = {
    url: string;
    ref: React.RefObject<HTMLElement>;
    params?: Record<string, any>;
};

export default function useAutoLazyLoad<T>({ url, ref, params }: Props) {
    const [list, setList] = useState<T[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchPage = useCallback(
        async (fetchUrl: string) => {
            setLoading(true);
            try {
                const res = await get<IPaginatedResponse<T>>(fetchUrl, params);
                setList((prev) => [...prev, ...res.results]);
                setNextUrl(res.next);
            } catch (err) {
                console.error("Pagination failed", err);
            } finally {
                setLoading(false);
            }
        },
        [params],
    );

    const reset = useCallback(() => {
        setList([]);
        setNextUrl(url);
    }, [url]);

    // درخواست اولیه
    useEffect(() => {
        reset(); // ← reset باعث fetch اولیه میشه
    }, [url, JSON.stringify(params)]);

    // lazy-load ادامه
    useEffect(() => {
        if (!ref.current || !nextUrl) return;

        observerRef.current?.disconnect();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading) {
                    fetchPage(nextUrl);
                }
            },
            { threshold: 1 },
        );

        observer.observe(ref.current);
        observerRef.current = observer;

        return () => observer.disconnect();
    }, [ref, nextUrl, loading, fetchPage]);

    return { list, loading, reset };
}
