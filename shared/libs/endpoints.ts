const API = {
    auth: {
        login: () => `${process.env.API_BASE_URL}/auth/login`,
        register: () => `${process.env.API_BASE_URL}/auth/register`,
        refresh: () => `${process.env.API_BASE_URL}/auth/refresh-token`,
        logout: () => "/api/auth/logout",
    },
    users: {
        list: () => `${process.env.API_BASE_URL}/users`,
        singleUser: (id: string) => `${process.env.API_BASE_URL}/users/${id}`,
        changePassword: () => `${process.env.API_BASE_URL}/users/change-password`,
        getProfile: () => `${process.env.API_BASE_URL}/users/get-profile`,
        updateProfile: () => `${process.env.API_BASE_URL}/users/update-profile`,
        updateUserProfile: (id: string) => `${process.env.API_BASE_URL}/users/update-profile/${id}`,
        addAddress: () => `${process.env.API_BASE_URL}/users/addresses`,
        addresses: () => `${process.env.API_BASE_URL}/users/addresses`,
        singleAddress: (id: string) => `${process.env.API_BASE_URL}/users/addresses/${id}`,
    },
    banners: {
        banners_list: () => `${process.env.API_BASE_URL}/banners`,
    },
    category: {
        categories_list: () => `${process.env.API_BASE_URL}/categories`,
    },
    notification: {
        list: () => `${process.env.API_BASE_URL}/notifications`,
        create_notification: `${process.env.API_BASE_URL}/notifications/create-notification`,
        singleNotification: (id: string) => `${process.env.API_BASE_URL}/notifications/${id}`,
        readSingleNotification: (id: string) => `${process.env.API_BASE_URL}/notifications/${id}/read`,
        allNotifications: () => `${process.env.API_BASE_URL}/notifications`,
    },
    product: {
        products: () => `${process.env.API_BASE_URL}/products`,
        singleProduct: (id: string) => `${process.env.API_BASE_URL}/products/${id}`,
        reviews: (id: string) => `${process.env.API_BASE_URL}/reviews/${id}`,
        attributes: () => `${process.env.API_BASE_URL}/attributes`,
    },
    orders: {
        list: () => `${process.env.API_BASE_URL}/orders`,
        single_order: (id: string) => `${process.env.API_BASE_URL}/orders/${id}`,
    },
    shop: {
        single_shop: (name: string) => `${process.env.API_BASE_URL}/shop/${name}`,
        single_order: (id: string) => `${process.env.API_BASE_URL}/orders/${id}`,
    },
    cart: {
        cart_products: (id: string) => `${process.env.API_BASE_URL}/carts/${id}`,
    },
    search: (query: string) => `${process.env.API_BASE_URL}/search?q=${query.toLowerCase()}`,
    blogs: {
        posts: () => `${process.env.API_BASE_URL}/posts`,
        singleShop: (name: string) => `${process.env.API_BASE_URL}/shop/${name}`,
        singlePostBySlug: (slug: string) => `${process.env.API_BASE_URL}/posts/${slug}`,
        singlePostById: (id: string) => `${process.env.API_BASE_URL}/posts/${id}`,
        blogAuthor: (id: string) => `${process.env.API_BASE_URL}/posts/author/${id}`,
    },
};

export default API;
