import { stringToSlug } from "./helper";

const PATH = {
    home: () => `/`,
    search: () => `/search`,
    banners: () => `/banners`,
    singleBanner: (name: string) => `/banners/${name}`,
    login: () => `/auth/login`,
    register: () => `/auth/register`,
    products: () => `/products`,
    blogs: () => `/blogs`,
    singleBlogAuthor: (id: string) => `/blogs/users/${id}`,
    singleBlog: (url: string) => `/blogs/${url}`,
    singleBrand: (brand: string) => `/brands/${brand}`,
    singleProduct: (id: string, name: string) => `/products/${id}/${stringToSlug(name)}`,
    compare: (pid1: string, pid2?: string) => `/compare?p1=${pid1}${pid2 ? `&p2=${pid2}` : ""}`,

    dashboard: {
        main: () => `/dashboard`,
        edit_personal: () => `/dashboard/edit-personal`,
        profile: () => `/dashboard/profile`,
        shop: () => `/dashboard/shop`,
        products: {
            main: () => `/dashboard/products`,
            add_product: () => `/dashboard/products/add-product`,
            edit_product: (id: string) => `/dashboard/products/edit-product/${id}`,
        },
        address: () => `/dashboard/address`,
        order: {
            orders: () => `/dashboard/orders`,
            single_order: (orderNo: string) => `/dashboard/orders/${orderNo}`,
        },
        notifications: () => `/dashboard/notifications`,
        favorites: () => `/dashboard/favorites`,
        settings: () => `/dashboard/settings`,
        blog: {
            blogs: () => `/dashboard/blogs`,
            single_blog: (url: string) => `/dashboard/blogs/${url}`,
            add_blog: () => `/dashboard/blogs/add-blog`,
            edit_blog: (url: string) => `/dashboard/blogs/edit-blog/${url}`,
        },
        users: {
            main: () => `/dashboard/users`,
            create_user: () => `/dashboard/users/create-user`,
            edit_user: (id: string) => `/dashboard/users/${id}`,
        },
        change_password: () => `/dashboard/change-password`,
        support: () => `/dashboard/support`,
    },

    carts: () => `/carts`,
    checkout: () => `/checkout`,
    payment: () => `/payment`,
    support: () => `/support`,
    fag: () => `/fag`,
    terms: () => `/terms`,
    privacy: () => `/privacy`,
    bugReport: () => `/bug-report`,
    contactUs: () => `/contact-us`,
    aboutUs: () => `/about-us`,
};

export default PATH;
