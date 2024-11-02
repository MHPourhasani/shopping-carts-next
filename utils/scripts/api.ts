export const get = async (url: string, options?: any) => {
    const authOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    };

    try {
        const response = await fetch(url, authOptions);
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const post = async (url: string, options?: any) => {
    const authOptions = {
        ...options,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    };

    try {
        const response = await fetch(url, authOptions);
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const del = async (url: string, options?: any) => {
    const authOptions = {
        ...options,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    };

    try {
        const response = await fetch(url, authOptions);
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};

export const patch = async (url: string, options?: any) => {
    const authOptions = {
        ...options,
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    };

    try {
        const response = await fetch(url, authOptions);
        return response;
    } catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
};
