import * as yup from "yup";

export const addressSchema = yup.object().shape({
    title: yup.string().nullable().required("عنوان آدرس الزامی است"),
    province: yup.string().required("استان الزامی است"),
    city: yup.string().required("شهر الزامی است"),
    address: yup.string().required("آدرس پستی الزامی است"),
    plaque: yup.string().required("پلاک الزامی است"),
    unit: yup.string().optional(),
    postalCode: yup.string().required("کد پستی الزامی است"),
    isDefault: yup.boolean(),
});
