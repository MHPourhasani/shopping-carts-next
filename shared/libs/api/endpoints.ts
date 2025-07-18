const API = {
    auth: {
        login: () => `${process.env.API_BASE_URL}/auth/login`,
        register: () => `${process.env.API_BASE_URL}/auth/register`,
        refresh: () => `${process.env.API_BASE_URL}/auth/refresh-token`,
    },
    users: {
        list: () => `${process.env.API_BASE_URL}/users`,
        singleUser: (id: string) => `${process.env.API_BASE_URL}/users/${id}`,
        getProfile: () => `${process.env.API_BASE_URL}/users/get-profile`,
        updateProfile: () => `${process.env.API_BASE_URL}/users/update-profile`,
        addAddress: () => `${process.env.API_BASE_URL}/users/addresses`,
        addressess: () => `${process.env.API_BASE_URL}/users/addresses`,
        singleAddress: (id: string) => `${process.env.API_BASE_URL}/users/addresses/${id}`,
    },
    banners: {
        banners_list: () => `${process.env.API_BASE_URL}/banners`,
    },
    category: {
        categories_list: () => `${process.env.API_BASE_URL}/categories`,
    },
    notification: {
        create_notification: `${process.env.API_BASE_URL}/notifications/create-notification`,
        notifications_list: () => `${process.env.API_BASE_URL}/notifications`,
        single_notification: (id: string) => `${process.env.API_BASE_URL}/notifications/${id}`,
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
        singlePost: (slug: string) => `${process.env.API_BASE_URL}/posts/${slug}`,
        blog_author: (id: string) => `${process.env.API_BASE_URL}/posts/users/${id}`,
    },
};

export default API;
