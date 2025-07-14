export interface IPaginatedResponse<T> {
    total: number;
    previous: string | null;
    next: string | null;
    results: T[];
}
