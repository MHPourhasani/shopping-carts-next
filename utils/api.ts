import { RequestTypeEnum } from "@/interfaces/general";

const API = {
    auth: {
        login: () => "/auth/login",
        signup: () => "/auth/signup",
    },
    banners: {
        banners_list: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/banners",
    },
    category: {
        categories_list: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/categories",
    },
    notification: {
        create_notification: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/notifications/create-notification",
        notifications_list: (user_id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/notifications?user_id=${user_id}`,
        single_notification: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/notifications/${id}`,
        allNotifications: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/notifications",
    },
    product: {
        products_list: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/products",
        single_product: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/products/single-product/${id}`,
        reviews: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/reviews/${id}`,
    },
    orders: {
        orders_list: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/orders",
        single_order: (id: string, user_id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/orders/${id}?user_id=${user_id}`,
    },
    shop: {
        single_shop: (name: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/shop/${name}`,
        single_order: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/orders/${id}`,
    },
    cart: {
        cart_products: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/carts/${id}`,
    },
    search: (query: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
        (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/search?q=${query.toLowerCase()}`,
    blogs: {
        blogs_list: (mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + "/blogs",
        singleShop: (name: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/shop/${name}`,
        single_blog: (url: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/blogs/${url}`,
        blog_author: (id: string, mode: RequestTypeEnum = RequestTypeEnum.SSR) =>
            (mode === RequestTypeEnum.SSR ? process.env.API_BASE_URL : "/api") + `/blogs/users/${id}`,
    },
};

export default API;
