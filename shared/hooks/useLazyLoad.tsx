import { useEffect, useState, useRef, useCallback } from "react";
import { IPaginatedResponse } from "../interfaces";
import { get } from "../libs/axios";

type Props<T> = {
    ref: React.RefObject<HTMLElement>;
    initialList: T[];
    nextUrl: string | null;
    params?: Record<string, any>;
    initialUrl: string;
};

export default function useLazyLoad<T>({ ref, initialList, nextUrl: initialNext, params, initialUrl }: Props<T>) {
    const [list, setList] = useState<T[]>(initialList);
    const [nextUrl, setNextUrl] = useState<string | null>(initialNext);
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

    const reset = useCallback(async () => {
        setLoading(true);
        try {
            const res = await get<IPaginatedResponse<T>>(initialUrl, params);
            setList(res.results);
            setNextUrl(res.next);
        } catch (err) {
            console.error("Reset failed", err);
        } finally {
            setLoading(false);
        }
    }, [initialUrl, params]);

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
