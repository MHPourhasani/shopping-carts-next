"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Textarea from "@/components/common/Textarea";
import { ColorInterface, ProductInterface, ShopInterface } from "@/interfaces/general";
import PageHeader from "@/components/PageHeader/PageHeader";
import { handleRefreshAfterBack, sizes } from "@/utils/helper";
import MultiSelect from "../common/MultiSelect";
import ColorPicker from "../common/ColorPicker";
import { get } from "@/utils/scripts/api";
import API from "@/utils/api";
import toastMessage from "@/utils/toastMessage";
import { RequestTypeEnum } from "@/interfaces/enums";

interface Props {
    product?: ProductInterface;
    isEdit?: boolean;
}

const AddAndEditProduct = ({ product, isEdit = false }: Props) => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState<any>(
        isEdit
            ? product
            : {
                  name: "",
                  brand: "",
                  price: null,
                  discountedPrice: null,
                  sizes: "",
                  colors: [],
                  categories: "",
                  tags: "",
                  services: "",
                  description: "",
                  relatedProducts: [],
              },
    );
    const [, setShop] = useState<Partial<ShopInterface>>({ createdAt: new Date() });
    const [allProducts, setAllProducts] = useState<Partial<ProductInterface[]>>([]);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            (async () => {
                try {
                    const response = await fetch(`/api/shop?user_id=${session.user.userId!}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        cache: "no-store",
                    });
                    const data = await response.json();
                    setShop(data.shop);
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [session]);

    useEffect(() => {
        const getProducts = async () => {
            return get(API.product.products_list(RequestTypeEnum.CSR))
                .then((res) => {
                    return res.json();
                })
                .then(({ results }) => {
                    setAllProducts(results.filter((p: ProductInterface) => p._id !== formData._id));
                });
        };

        getProducts();
    }, []);

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addColorHandler = (selectedColors: ColorInterface[]) => {
        setFormData({ ...formData, colors: selectedColors });
    };

    const submitProductHandler = async () => {
        const { name, brand, price, discountedPrice, sizes, colors, categories, relatedProducts } = formData;

        if (!name.trim()) {
            toast.error("نام محصول را وارد کنید.");
        } else if (!brand.trim()) {
            toast.error("نام برند را وارد کنید.");
        } else if (!price) {
            toast.error("قیمت محصول را وارد کنید.");
        } else if (price <= 0) {
            toast.error("قیمت محصول نباید منفی باشد.");
        } else if (discountedPrice && discountedPrice >= price) {
            toast.error("قیمت تخفبف خورده نباید از قیمت اصلی بالاتر باشد.");
        } else if (!sizes.trim()) {
            toast.error("سایز(های) محصول را وارد کنید.");
        } else if (!colors.length) {
            toast.error("رنگ(های) محصول را وارد کنید.");
        } else {
            try {
                let res: any;
                if (isEdit) {
                    res = await fetch(API.product.single_product(formData._id.toString(), RequestTypeEnum.CSR), {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({ data: formData, relatedProducts: relatedProducts.map((p: ProductInterface) => p._id) }),
                    });
                } else {
                    res = await fetch("/api/products", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            product: formData,
                            relatedProducts: relatedProducts.map((p: ProductInterface) => p._id),
                        }),
                    });
                }

                const { message } = await res.json();

                if (res.ok) {
                    toast.success("محصول با موفقیت ثبت شد.");
                    router.back();
                    handleRefreshAfterBack();
                } else {
                    toast.error(message);
                }
            } catch (error: any) {
                console.error(error);
            }
        }
    };

    const deleteProductHandler = async () => {
        const res = await fetch(API.product.single_product(formData._id.toString(), RequestTypeEnum.CSR), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success(toastMessage.product.deletedProductSuccessfully(formData.name));
            router.back();
            handleRefreshAfterBack();
        } else {
            toast.success(toastMessage.product.deletedProductFailed(formData.name));
        }
    };

    return (
        <section className="flex w-full flex-col gap-4">
            <PageHeader title={isEdit ? `ویرایش محصول "${formData.name}"` : "افزودن محصول"} />

            <div className="flex flex-col gap-4">
                <Input name="name" label="نام" value={formData.name} onChange={changeHandler} />
                <Input name="brand" label="برند" value={formData.brand} onChange={changeHandler} />
                <Input name="price" label="قیمت" value={formData.price} type="number" onChange={changeHandler} />
                <Input
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    label="قیمت تخفیف خورده"
                    type="number"
                    onChange={changeHandler}
                />

                <div className="flex flex-col gap-2">
                    <label className="dark:text-secondary-100">سایز ها</label>
                    <MultiSelect
                        defaultValues={
                            formData.sizes.trim()
                                ? formData.sizes.split(", ").map((s: string) => {
                                      return { title: String(s) };
                                  })
                                : undefined
                        }
                        options={sizes.map((s) => {
                            return { title: String(s) };
                        })}
                        onChange={(selected) => setFormData({ ...formData, sizes: selected.map((s) => s.title).join(", ") })}
                    />
                </div>

                <ColorPicker defaultColors={formData.colors} onChange={addColorHandler} />

                <Input
                    name="categories"
                    label="دسته بندی ها"
                    value={formData.categories}
                    onChange={changeHandler}
                    hint="لطفا دسته بندی ها را با , از هم جدا کنید."
                />
                <Input name="tags" label="تگ ها" value={formData.tags} onChange={changeHandler} hint="لطفا تگ ها را با , از هم جدا کنید." />
                <Input
                    name="services"
                    label="خدمات"
                    value={formData.services}
                    onChange={changeHandler}
                    hint="لطفا خدمات را با , از هم جدا کنید."
                />

                <div className="flex flex-col gap-2">
                    <label className="dark:text-secondary-100">محصولات مرتبط</label>
                    <MultiSelect
                        defaultValues={
                            formData.relatedProducts
                                ? formData.relatedProducts.map((p: ProductInterface) => {
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
                </div>

                <Textarea
                    name="description"
                    label="توضیحات"
                    defaultValue={formData.description}
                    onChange={changeHandler}
                    hint="حداقل باید 15 کاراکتر وارد کنید."
                    textareaClassName="min-h-80"
                />

                <div className="flex items-center justify-between gap-4">
                    <Button variant="Primary" disabled={!formData} onClick={submitProductHandler}>
                        {isEdit ? "ویرایش" : "افزودن محصول"}
                    </Button>

                    {isEdit && (
                        <Button variant="Tertiary" onClick={deleteProductHandler} className="border-red-600 !text-red-600">
                            حذف
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AddAndEditProduct;
