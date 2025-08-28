import { z } from "zod";
import { ProductStatusEnum } from "../interface/enums";

export const attributeSchema = z.object({
    name: z.string().min(1, "نام ویژگی الزامی است"),
    slug: z.string().min(1, "اسلاگ ویژگی الزامی است"),
    values: z.array(z.string().min(1, "مقدار ویژگی الزامی است")).min(1, "حداقل یک مقدار باید وارد شود"),
});

export const variationSchema = z.object({
    sku: z.string().min(1, "کد SKU الزامی است"),
    price: z.number().min(0, { message: "قیمت ترکیب الزامی است" }),
    quantity: z.number().min(0, { message: "موجودی ترکیب الزامی است" }),
    image: z.string().optional(), // اگر فایل باشد، بعداً باید `z.any()` استفاده شود
    attributes: z.record(z.string(), z.string()), // نمی‌تونیم message برای z.record تعریف کنیم
});

export const productSchema = z.object({
    name: z.string().min(1, "نام محصول الزامی است"),
    slug: z.string().min(1, "لینک الزامی است"),
    description: z.string().optional(),
    basePrice: z.number().min(0, "قیمت نمی‌تواند منفی باشد").optional(),
    baseQuantity: z.number().min(0, "تعداد نمی‌تواند کمتر از صفر باشد").optional(),
    images: z.array(z.string().min(1, "آدرس عکس نمی‌تواند خالی باشد")).optional(),
    categories: z.array(z.string().min(1, "دسته‌بندی نمی‌تواند خالی باشد")).optional(),
    brand: z.string().optional(),
    tags: z.array(z.string().min(1, "تگ نمی‌تواند خالی باشد")).optional(),
    services: z.array(z.string().min(1, "خدمت نمی‌تواند خالی باشد")).optional(),
    status: z.nativeEnum(ProductStatusEnum).optional(),
    relatedProducts: z.array(z.string()).optional(),

    attributes: z.array(
        z.object({
            attributeDef: z.string().min(1, "ویژگی الزامی است"),
            value: z.string().min(1, "مقدار ویژگی الزامی است"),
            newValue: z.string().optional(),
        }),
    ),

    variations: z.array(
        z.object({
            sku: z.string(),
            price: z.number(),
            quantity: z.number(),
            image: z.string().optional(),
            attributes: z.array(
                z.object({
                    attributeDef: z.string(),
                    value: z.string(),
                    newValue: z.string().optional(),
                }),
            ),
        }),
    ),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type CreateProductDto = z.infer<typeof productSchema>;
