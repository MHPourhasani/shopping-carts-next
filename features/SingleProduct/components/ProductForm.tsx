"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "@/shared/components/PageHeader";
import { handleRefreshAfterBack } from "@/shared/utils/utils";
import API from "@/shared/libs/endpoints";
import toastMessage from "@/shared/utils/toastMessage";
import { IAttribute, IProduct } from "../interface/interface";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { put, post, del } from "@/shared/libs/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductDto, ProductFormValues, productSchema } from "../validation/product.schema";
import MultiSelect from "@/shared/components/common/MultiSelect";
import { useLazyLoad } from "@/shared/hooks/useLazyLoad";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttributeSelector } from "./AttributeSelector";
import TextEditor from "@/shared/components/common/TextEditor";

interface ProductFormProps {
    initialData?: Partial<IProduct>;
}

const ProductForm = ({ initialData }: ProductFormProps) => {
    const router = useRouter();
    const attributeRef = useRef<HTMLDivElement>(null);
    const [showNewValueInput, setShowNewValueInput] = useState<Record<number, boolean>>({});

    const { lists: attributes } = useLazyLoad<IAttribute>({
        url: API.product.attributes(),
        ref: attributeRef,
    });

    const { lists: products } = useLazyLoad<IProduct>({
        url: API.product.products(),
        ref: attributeRef,
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  attributes:
                      initialData.attributes?.map((attr) => ({
                          attributeDef: attr._id,
                          value: attr.values?.[0]?.slug || "",
                      })) || [],
                  relatedProducts: initialData.relatedProducts?.map((p) => p._id) ?? [],
              }
            : {
                  name: "",
                  slug: "",
                  brand: "",
                  basePrice: 0,
                  baseQuantity: 0,
                  attributes: [],
                  variations: [],
                  categories: [],
                  tags: [],
                  services: [],
                  relatedProducts: [],
                  description: "",
              },
    });

    const { fields: attrFields, append: addAttr } = useFieldArray({
        control,
        name: "attributes",
    });

    const { fields: variationFields, append: appendVariation } = useFieldArray({
        control,
        name: "variations",
    });

    useEffect(() => {
        if (initialData) {
            const transformedData: ProductFormValues = {
                ...initialData,
                relatedProducts: initialData.relatedProducts?.map((p) => p._id) ?? [],
            };
            reset(transformedData);
        }
    }, [initialData, reset]);

    useEffect(() => {
        if (attrFields.length === 0 && attributes.length > 0) {
            addAttr({ attributeDef: attributes[0]._id, value: "" });
        }
    }, [attributes, attrFields.length, addAttr]);

    const onSubmit = async (data: CreateProductDto) => {
        try {
            if (initialData?._id) {
                await put(API.product.singleProduct(initialData._id), data);
                toast.success("محصول با موفقیت ویرایش شد");
            } else {
                await post(API.product.products(), data);
                toast.success("محصول با موفقیت ثبت شد");
                reset();
            }
        } catch (e) {
            toast.error("خطا در ذخیره محصول");
        }
    };

    const deleteProductHandler = async () => {
        if (initialData?._id) {
            const res = await del<{ success: boolean }>(API.product.singleProduct(initialData._id));

            if (res.success) {
                toast.success(toastMessage.product.deletedProductSuccessfully(watch("name")));
                router.back();
                handleRefreshAfterBack();
            } else {
                toast.error(toastMessage.product.deletedProductFailed(watch("name")));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
            <PageHeader title={initialData?._id ? `ویرایش محصول "${watch("name")}"` : "افزودن محصول"} />

            <div className="flex flex-col gap-4">
                <InputWithLabel dir="auto" label="نام" {...register("name")} />
                <InputWithLabel dir="auto" label="لینک" {...register("slug")} />
                <InputWithLabel dir="auto" label="برند" {...register("brand")} />
                <InputWithLabel dir="auto" label="قیمت" {...register("basePrice")} />
                <InputWithLabel dir="auto" label="تعداد" {...register("baseQuantity")} />

                <div>
                    {attrFields.map((field, index) => {
                        const attrId = watch(`attributes.${index}.attributeDef`);
                        const selectedAttr = attributes.find((a) => a._id === attrId);

                        if (!selectedAttr) return null;

                        return (
                            <AttributeSelector
                                key={field.id}
                                attribute={selectedAttr}
                                value={watch(`attributes.${index}.value`) || ""}
                                onChange={(val) => setValue(`attributes.${index}.value`, val)}
                                onAddValue={(attrId, newVal) => {
                                    const attr = attributes.find((a) => a._id === attrId);
                                    if (attr && !attr.values.some((v) => v.slug === newVal.slug)) {
                                        attr.values.push(newVal);
                                    }
                                }}
                            />
                        );
                    })}
                </div>

                {/* ترکیب‌ها */}
                <div>
                    <h3 className="mt-4 font-bold">ترکیب‌ها</h3>
                    {variationFields.map((field, index) => (
                        <div key={field.id} className="mb-2 rounded-md border p-3">
                            <Input placeholder="کد SKU" {...register(`variations.${index}.sku`)} />
                            <Input type="number" placeholder="قیمت" {...register(`variations.${index}.price`, { valueAsNumber: true })} />
                            <Input
                                type="number"
                                placeholder="موجودی"
                                {...register(`variations.${index}.quantity`, { valueAsNumber: true })}
                            />

                            {attributes.map((attr) => (
                                <div key={attr.slug} className="mt-2">
                                    <label className="font-semibold">{attr.name}</label>
                                    <Controller
                                        control={control}
                                        name={`variations.${index}.attributes`}
                                        render={({ field }) => {
                                            const selectedValue = field.value?.find((v) => v.attributeDef === attr.slug)?.value || "";
                                            return (
                                                <>
                                                    <Select
                                                        value={selectedValue}
                                                        onValueChange={(val) => {
                                                            if (val === "__add_new__") {
                                                                setShowNewValueInput((prev) => ({ ...prev, [index]: true }));
                                                            } else {
                                                                setShowNewValueInput((prev) => ({ ...prev, [index]: false }));
                                                                const updated = [...(field.value || [])];
                                                                const idx = updated.findIndex((v) => v.attributeDef === attr.slug);
                                                                if (idx >= 0) updated[idx].value = val;
                                                                else updated.push({ attributeDef: attr.slug, value: val });
                                                                field.onChange(updated);
                                                            }
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="انتخاب مقدار" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {attr.values.map((v) => (
                                                                <SelectItem key={v.slug} value={v.slug}>
                                                                    {v.name}
                                                                </SelectItem>
                                                            ))}
                                                            <SelectItem value="__add_new__">➕ افزودن مقدار جدید</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    {showNewValueInput[index] && (
                                                        <Input
                                                            placeholder="مقدار جدید..."
                                                            onBlur={(e) => {
                                                                const newVal = e.target.value;
                                                                if (!newVal) return;
                                                                const updated = [...(field.value || [])];
                                                                const idx = updated.findIndex((v) => v.attributeDef === attr.slug);
                                                                if (idx >= 0) updated[idx].value = newVal;
                                                                else updated.push({ attributeDef: attr.slug, value: newVal });
                                                                field.onChange(updated);
                                                                setShowNewValueInput((prev) => ({ ...prev, [index]: false }));
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            );
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}

                    <Button type="button" onClick={() => appendVariation({ sku: "", price: 0, quantity: 0, attributes: [] })}>
                        ➕ افزودن ترکیب
                    </Button>
                </div>

                <InputWithLabel label="دسته بندی‌ها" {...register("categories")} />
                <InputWithLabel label="تگ‌ها" {...register("tags")} />
                <InputWithLabel label="خدمات" {...register("services")} />

                {/* محصولات مرتبط */}
                <div className="flex flex-col gap-2">
                    <label className="dark:text-secondary-100">محصولات مرتبط</label>
                    <MultiSelect
                        defaultValues={initialData?.relatedProducts?.map((p) => ({
                            id: p._id,
                            title: p.name,
                        }))}
                        options={products}
                        onChange={(selected) => {
                            const ids = selected.map((s) => String(s.id));
                            setValue("relatedProducts", ids);
                        }}
                    />
                </div>

                <TextEditor label="توضیحات" {...register("description")} value={watch("description") ?? ""} />

                <div className="flex items-center gap-4 self-end">
                    <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                        {isSubmitting ? "در حال ارسال..." : initialData?._id ? "ویرایش محصول" : "انتشار محصول"}
                    </Button>

                    {initialData?._id && (
                        <Button variant="secondary" onClick={deleteProductHandler} className="cursor-pointer border-red-600 !text-red-600">
                            حذف
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ProductForm;
