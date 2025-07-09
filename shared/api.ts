const API = {
    auth: {
        login: () => `${process.env.API_BASE_URL}/auth/login`,
        register: () => `${process.env.API_BASE_URL}/auth/register`,
    },
    banners: {
        banners_list: () => `${process.env.API_BASE_URL}/banners`,
    },
    category: {
        categories_list: () => `${process.env.API_BASE_URL}/categories`,
    },
    notification: {
        create_notification: `${process.env.API_BASE_URL}/notifications/create-notification`,
        notifications_list: (user_id: string) => `${process.env.API_BASE_URL}/notifications?user_id=${user_id}`,
        single_notification: (id: string) => `${process.env.API_BASE_URL}/notifications/${id}`,
        allNotifications: () => `${process.env.API_BASE_URL}/notifications`,
    },
    product: {
        products_list: () => `${process.env.API_BASE_URL}/products  `,
        single_product: (id: string) => `${process.env.API_BASE_URL}/products/${id}`,
        reviews: (id: string) => `${process.env.API_BASE_URL}/reviews/${id}`,
    },
    orders: {
        orders_list: () => `${process.env.API_BASE_URL}/orders`,
        single_order: (id: string, user_id: string) => `${process.env.API_BASE_URL}/orders/${id}?user_id=${user_id}`,
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
        blogs_list: () => `${process.env.API_BASE_URL}/blogs`,
        singleShop: (name: string) => `${process.env.API_BASE_URL}/shop/${name}`,
        single_blog: (url: string) => `${process.env.API_BASE_URL}/blogs/${url}`,
        blog_author: (id: string) => `${process.env.API_BASE_URL}/blogs/users/${id}`,
    },
};

export default API;
