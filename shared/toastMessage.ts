const toastMessage = {
    auth: {
        login: { successfulLogin: "خوش آمدید." },
    },
    profile: {
        successfulChangedRole: (name: string) => `نقش ${name} تغییر کرد.`,
        failedChangedRole: (name: string) => `تغییر نقش ${name} با خطا مواجه شد.`,
        successfulDeleteUser: (name: string) => `${name} با موفقیت حذف شد.`,
        failedDeleteUser: "حذف کاربر با خطا مواجه شد.",
        failedDeleteAccount: "حذف اکانت با خطا مواجه شد.",
    },
    product: {
        successUpdated: (name?: string) => `${name ? name : "محصول"} با موفقیت آپدیت شد.`,
        deletedAllSuccessfully: "همه محصولات با موفقیت حذف شد.",
        deletedProductSuccessfully: (name?: string) => `${name ? name : "محصول"} با موفقیت حذف شد`,
        deletedProductFailed: (name?: string) => `حذف ${name ? name : "محصول"} با خطا مواجه شد.`,
        failedAddedToCart: "خطا در اضافه کردن محصول به سبد خرید",
    },
    notification: {
        successfullyDeleted: "پیام با موفقیت حذف شد.",
        failedDeleted: "حذف پیام با خطا مواجه شد.",
    },
    blog: {
        successfullyEdit: "بلاگ با موفقیت ویرایش شد.",
        successfullyDelete: "بلاگ با موفقیت حذف شد.",
        failedDeleted: "حذف بلاگ با خطا مواجه شد.",
    },
};

export default toastMessage;
