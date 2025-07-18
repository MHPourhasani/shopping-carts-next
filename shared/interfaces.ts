export interface IToken {
    access: string;
    refresh: string;
}

export interface IPaginatedResponse<T> {
    total: number;
    previous: string | null;
    next: string | null;
    results: T[];
}

export interface IIconProps {
    className?: string;
    color?: string;
    style?: any;
    onClick?: any;
}
