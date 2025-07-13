import api from "./axios";

export const get = async <T>(url: string, params?: any): Promise<T> => {
    const response = await api.get<T>(url, { params });
    return response.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
};

export const put = async <T>(url: string, data?: any): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
};
