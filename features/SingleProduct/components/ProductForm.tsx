"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/shared/components/PageHeader";
import { handleRefreshAfterBack } from "@/shared/utils/utils";
import API from "@/shared/libs/endpoints";
import toastMessage from "@/shared/utils/toastMessage";
import { IProduct } from "../interface/interface";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { get, put, post } from "@/shared/libs/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductDto, ProductFormValues, productSchema } from "../validation/product.schema";
import MultiSelect from "@/shared/components/common/MultiSelect";

interface ProductFormProps {
    isEdit?: boolean;
    initialData?: IProduct;
    productId?: string;
}

const ProductForm = ({ isEdit = false, initialData, productId }: ProductFormProps) => {
    const [, setMessage] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
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
            const transformedData: ProductFormValues = {
                ...initialData,
                relatedProducts: initialData.relatedProducts?.map((p) => p._id) ?? [],
            };
            reset(transformedData);
        }
    }, [isEdit, initialData, reset]);

    const onSubmit = async (data: CreateProductDto) => {
        try {
            if (isEdit && productId) {
                await put(API.product.singleProduct(productId), data);
                setMessage("✅ محصول با موفقیت ویرایش شد");
            } else {
                await post(API.product.products(), data);
                toast.success("✅ محصول با موفقیت ثبت شد");
                reset();
            }
        } catch (e) {
            toast.error("❌ خطا در ذخیره محصول");
        }
    };

    useEffect(() => {
        const getProducts = async () => {
            const data = await get(API.product.products());
            return data;
        };

        getProducts();
        getAttributes();
    }, []);

    const getAttributes = async () => {
        const data = await get(API.product.attributes());
        return data;
    };

    const deleteProductHandler = async () => {
        if (isEdit && productId) {
            const res = await fetch(API.product.singleProduct(productId), {
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

                <div className="flex flex-col gap-2">
                    <label className="dark:text-secondary-100">محصولات مرتبط</label>
                    <MultiSelect
                        defaultValues={initialData?.relatedProducts.map((p) => ({ id: p._id, title: p.name }))}
                        options={[]}
                        onChange={(selected) => {
                            const ids = selected.map((s) => String(s.id));
                            setValue("relatedProducts", ids);
                        }}
                    />
                </div>

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

export default ProductForm;
