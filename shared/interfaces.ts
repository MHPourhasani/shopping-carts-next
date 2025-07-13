export interface IPaginatedResponse<T> {
    total: number;
    previos: string | null;
    next: string | null;
    results: T[];
}
