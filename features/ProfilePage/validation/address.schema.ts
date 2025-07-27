import { z } from "zod";

export const addressSchema = z.object({
    title: z.string().min(1, "عنوان آدرس الزامی است"),
    province: z.string().min(2, "استان الزامی است"),
    city: z.string().min(2, "شهر الزامی است"),
    address: z.string().min(5, "آدرس پستی الزامی است"),
    plaque: z.string().min(1, "پلاک الزامی است"),
    unit: z.string().optional(),
    postalCode: z.string().min(10, "کد پستی باید حداقل 10 رقم باشد").max(11, "کد پستی باید دقیقا 10 رقم باشد"),
});

export type AddressFormSchema = z.infer<typeof addressSchema>;
