"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/shared/components/PageHeader";
import { handleRefreshAfterBack } from "@/shared/helper";
import API from "@/shared/libs/api/endpoints";
import toastMessage from "@/shared/toastMessage";
import { CreateProductDto } from "../interface/interface";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { get, post, put } from "@/shared/libs/api/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { ProductStatusEnum } from "../interface/enums";
import { Input } from "@/components/ui/input";

interface ProductFormProps {
    isEdit?: boolean;
    initialData?: CreateProductDto;
    productId?: string;
}

export const productSchema = yup.object({
    name: yup.string().required("نام محصول الزامی است"),
    slug: yup.string().required("لینک الزامی است"),
    description: yup.string().optional(),

    basePrice: yup.number().typeError("قیمت باید یک عدد باشد").min(0, "قیمت نمی‌تواند منفی باشد").optional(),

    baseQuantity: yup.number().typeError("تعداد باید یک عدد باشد").min(0, "تعداد نمی‌تواند کمتر از صفر باشد").optional(),

    images: yup.array().of(yup.string().required("آدرس عکس نمی‌تواند خالی باشد")).optional(),

    categories: yup.array().of(yup.string().required("دسته‌بندی نمی‌تواند خالی باشد")).optional(),

    brand: yup.string().optional(),

    tags: yup.array().of(yup.string().required("تگ نمی‌تواند خالی باشد")).optional(),

    services: yup.array().of(yup.string().required("خدمت نمی‌تواند خالی باشد")).optional(),

    status: yup.mixed<ProductStatusEnum>().oneOf(Object.values(ProductStatusEnum), "وضعیت نامعتبر است").optional(),

    relatedProducts: yup.array().of(yup.string().required("شناسه محصول مرتبط الزامی است")).optional(),

    attributes: yup
        .array()
        .of(
            yup.object({
                name: yup.string().required("نام ویژگی الزامی است"),
                slug: yup.string().required("اسلاگ ویژگی الزامی است"),
                values: yup
                    .array()
                    .of(yup.string().required("مقدار ویژگی الزامی است"))
                    .min(1, "حداقل یک مقدار باید وارد شود")
                    .required("مقادیر ویژگی الزامی است"),
            }),
        )
        .min(1, "حداقل یک ویژگی باید تعریف شود")
        .required("ویژگی‌ها الزامی هستند"),

    variations: yup
        .array()
        .of(
            yup.object({
                sku: yup.string().required("کد SKU الزامی است"),
                price: yup.number().required("قیمت ترکیب الزامی است"),
                quantity: yup.number().required("موجودی ترکیب الزامی است"),
                image: yup.string().optional(),
                attributes: yup.object().required("ویژگی‌های ترکیب الزامی است"),
            }),
        )
        .min(1, "حداقل یک ترکیب باید وارد شود")
        .required("ترکیب‌ها الزامی هستند"),
});

const AddAndEditProduct = ({ isEdit = false, initialData, productId }: ProductFormProps) => {
    const [, setMessage] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            basePrice: 0,
            baseQuantity: 0,
            attributes: [],
            variations: [],
        },
    });
    const { fields: attrFields, append: addAttr } = useFieldArray({ control, name: "attributes" });
    const { fields: varFields, append: addVariation } = useFieldArray({ control, name: "variations" });

    useEffect(() => {
        if (isEdit && initialData) {
            reset(initialData);
        }
    }, [isEdit, initialData, reset]);

    const onSubmit = async (data: CreateProductDto) => {
        try {
            if (isEdit && productId) {
                await put(API.product.single_product(productId), data);
                setMessage("✅ محصول با موفقیت ویرایش شد");
            } else {
                await post(API.product.products(), data);
                setMessage("✅ محصول با موفقیت ثبت شد");
                reset();
            }
        } catch (e) {
            console.error("❌ خطا در ذخیره محصول", e);
            setMessage("❌ خطا در ذخیره محصول");
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            const data = await get(API.product.products());
            return data;
        };

        getProducts();
    }, []);

    const deleteProductHandler = async () => {
        if (isEdit && productId) {
            const res = await fetch(API.product.single_product(productId), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success(toastMessage.product.deletedProductSuccessfully(watch("name")));
                router.back();
                handleRefreshAfterBack();
            } else {
                toast.success(toastMessage.product.deletedProductFailed(watch("name")));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
            <PageHeader title={isEdit ? `ویرایش محصول "${watch("name")}"` : "افزودن محصول"} />

            <div className="flex flex-col gap-4">
                <InputWithLabel label="نام" {...register("name")} />
                <InputWithLabel label="لینک" {...register("slug")} />
                <InputWithLabel label="برند" {...register("brand")} />
                <InputWithLabel label="قیمت" {...register("basePrice")} />
                <InputWithLabel label="تعداد" {...register("baseQuantity")} />

                <div>
                    <h3 className="font-bold">ویژگی‌ها</h3>
                    {attrFields.map((item, index) => (
                        <div key={item.id} className="mb-2 border p-2">
                            <Input {...register(`attributes.${index}.name`)} placeholder="نام ویژگی" />
                            <Input {...register(`attributes.${index}.slug`)} placeholder="slug ویژگی" />
                            <Input {...register(`attributes.${index}.values.0`)} placeholder="مقدار 1" />
                            <Input {...register(`attributes.${index}.values.1`)} placeholder="مقدار 2" />
                            {errors.attributes?.[index]?.name && (
                                <p className="text-sm text-red-500">{errors.attributes[index].name?.message}</p>
                            )}
                        </div>
                    ))}
                    <Button onClick={() => addAttr({ name: "", slug: "", values: [""] })} className="text-blue-600">
                        ➕ افزودن ویژگی
                    </Button>
                </div>

                {/* ترکیب‌ها */}
                <div>
                    <h3 className="font-bold">ترکیب‌ها</h3>
                    {varFields.map((item, index) => (
                        <div key={item.id} className="mb-2 border p-2">
                            <Input {...register(`variations.${index}.sku`)} placeholder="SKU" />
                            <Input type="number" {...register(`variations.${index}.price`)} placeholder="قیمت" />
                            <Input type="number" {...register(`variations.${index}.quantity`)} placeholder="موجودی" />
                            <Input {...register(`variations.${index}.attributes`)} placeholder="رنگ (اختیاری)" />
                            <Input {...register(`variations.${index}.attributes`)} placeholder="سایز (اختیاری)" />
                        </div>
                    ))}
                    <Button onClick={() => addVariation({ sku: "", price: 0, quantity: 0, attributes: {} })} className="text-blue-600">
                        ➕ افزودن ترکیب
                    </Button>
                </div>

                <InputWithLabel label="دسته بندی ها" {...register("categories")} />

                <InputWithLabel label="تگ ها" {...register("tags")} />
                <InputWithLabel label="خدمات" {...register("services")} />

                {/* <div className="flex flex-col gap-2">
                    <label className="dark:text-secondary-100">محصولات مرتبط</label>
                    <MultiSelect
                        defaultValues={
                            formData.relatedProducts
                                ? formData.relatedProducts.map((p: IProduct) => {
                                      return { id: String(p?._id), title: String(p?.name), image: p?.images ? p?.images[0] : "" };
                                  })
                                : undefined
                        }
                        options={allProducts.map((p) => {
                            return { id: String(p?._id), title: String(p?.name), image: p?.images ? p?.images[0] : "" };
                        })}
                        onChange={(selected) =>
                            setFormData({
                                ...formData,
                                relatedProducts: selected.map((item) => {
                                    return { ...item, _id: item.id };
                                }),
                            })
                        }
                    />
                </div> */}

                <Textarea label="توضیحات" {...register("description")} hint="حداقل باید 15 کاراکتر وارد کنید." className="min-h-80" />

                <div className="flex items-center justify-between gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "در حال ارسال..." : isEdit ? "ویرایش محصول" : "ثبت محصول"}
                    </Button>

                    {isEdit && (
                        <Button variant="secondary" onClick={deleteProductHandler} className="border-red-600 !text-red-600">
                            حذف
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default AddAndEditProduct;
