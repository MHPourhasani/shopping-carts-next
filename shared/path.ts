import { stringToSlug } from "./helper";

const PATH = {
    home: () => `/`,
    search: () => `/search`,
    banners: () => `/banners`,
    singleBanner: (name: string) => `/banners/${name}`,
    login: () => `/auth/login`,
    signup: () => `/auth/signup`,
    products: () => `/products`,
    blogs: () => `/blogs`,
    singleBlogAuthor: (id: string) => `/blogs/users/${id}`,
    singleBlog: (url: string) => `/blogs/${url}`,
    singleBrand: (brand: string) => `/brands/${brand}`,
    singleProduct: (id: string, name: string) => `/products/${id}/${stringToSlug(name)}`,
    compare: (pid1: string, pid2?: string) => `/compare?p1=${pid1}${pid2 ? `&p2=${pid2}` : ""}`,

    profile: {
        main: () => `/profile`,
        edit_personal: () => `/profile/edit-personal`,
        dashboard: () => `/profile/dashboard`,
        shop: () => `/profile/shop`,
        products: {
            main: () => `/profile/products`,
            add_product: () => `/profile/products/add-product`,
            edit_product: (id: string) => `/profile/products/edit-product/${id}`,
        },
        address: () => `/profile/address`,
        order: {
            orders: () => `/profile/orders`,
            single_order: (orderNo: string) => `/profile/orders/${orderNo}`,
        },
        notifications: () => `/profile/notifications`,
        favorites: () => `/profile/favorites`,
        settings: () => `/profile/settings`,
        blog: {
            blogs: () => `/profile/blogs`,
            single_blog: (url: string) => `/profile/blogs/${url}`,
            add_blog: () => `/profile/blogs/add-blog`,
            edit_blog: (url: string) => `/profile/blogs/edit-blog/${url}`,
        },
        users: {
            main: () => `/profile/users`,
            create_user: () => `/profile/users/create-user`,
            edit_user: (id: string) => `/profile/users/${id}`,
        },
        change_password: () => `/profile/change-password`,
        support: () => `/profile/support`,
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
