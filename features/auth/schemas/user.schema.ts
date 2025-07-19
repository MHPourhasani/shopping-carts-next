import * as yup from "yup";
import { UserRoleEnum } from "../enums";

export const userSchema = yup.object({
    first_name: yup.string().required("نام الزامی است").min(2, "نام باید حداقل ۲ کاراکتر باشد"),

    last_name: yup.string().required("نام خانوادگی الزامی است").min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),

    phone: yup
        .string()
        .nullable()
        .matches(/^(\d{11})?$/, "شماره تماس باید ۱۱ رقم باشد"),

    email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),

    password: yup
        .string()
        .transform((value) => (value === "" ? undefined : value)) // خالی رو به undefined تبدیل کن
        .when([], {
            is: (_: any, schema: yup.StringSchema) => {
                return schema?.describe()?.meta?.isEdit;
            },
            then: (schema) => schema.optional(),
            otherwise: (schema) => schema.required("رمز عبور الزامی است").min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
        }),

    role: yup.mixed<UserRoleEnum>().oneOf(Object.values(UserRoleEnum)).required("نقش کاربر الزامی است"),

    is_email_verified: yup.boolean().required("وضعیت تایید ایمیل الزامی است"),
    is_phone_verified: yup.boolean().required("وضعیت تایید شماره تماس الزامی است"),
    is_active: yup.boolean().required("وضعیت فعال بودن کاربر الزامی است"),
});
