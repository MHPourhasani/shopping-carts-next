"use client";
import { covertUserRoleToPersian, covertUserRoleToUserRoleEnum, handleRefreshAfterBack } from "@/shared/utils/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SingleSelect from "@/shared/components/common/SingleSelect";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { IUser } from "@/features/Auth/interfaces";
import { UserRoleEnum } from "@/features/Auth/enums";
import { Controller, useForm } from "react-hook-form";
import API from "@/shared/libs/endpoints";
import { del, post, put } from "@/shared/libs/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "@/features/Auth/schemas/user.schema";
import { Switch } from "@/components/ui/switch";

interface Props {
    initialData?: IUser;
}

const AddAndEditUser = ({ initialData }: Props) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema, { context: { isEdit: !!initialData } }),
        defaultValues: {
            first_name: initialData?.first_name ?? "",
            last_name: initialData?.last_name ?? "",
            phone: initialData?.phone ?? "",
            email: initialData?.email ?? "",
            password: "",
            role: initialData?.role ?? UserRoleEnum.CUSTOMER,
            is_email_verified: initialData ? initialData.is_email_verified : false,
            is_phone_verified: initialData ? initialData.is_phone_verified : false,
            is_active: initialData ? initialData.is_active : true,
        },
    });

    const onSubmit = async (data: any) => {
        try {
            if (initialData) {
                await put(API.users.updateUserProfile(initialData._id), { ...data });
                toast.success("کاربر با موفقیت آپدیت شد.");
            } else {
                await post(API.auth.register(), { ...data });
                toast.success("کاربر با موفقیت ایجاد شد.");
            }

            router.back();
            handleRefreshAfterBack();
        } catch (error) {
            toast.error(`خطا در آپدیت پروفایل`);
        }
    };

    const deleteUserHandler = async () => {
        try {
            if (initialData) {
                const res = await del<{ success: boolean }>(API.users.singleUser(initialData._id));

                if (res.success) {
                    toast.success("کاربر با موفقیت حذف شد");
                    router.back();
                    handleRefreshAfterBack();
                } else {
                    toast.error("خطا در حذف کاربر");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-start gap-4 lg:gap-8">
            <div className="grid w-full grid-cols-2 gap-4">
                <InputWithLabel dir="auto" label="نام" {...register("first_name")} className="focus:border-primary-100" />
                <InputWithLabel dir="auto" label="نام خانوادگی" {...register("last_name")} className="focus:border-primary-100" />

                <InputWithLabel
                    dir="ltr"
                    type="tel"
                    label="شماره تماس"
                    {...register("phone")}
                    maxLength={11}
                    className="focus:border-primary-100"
                />

                <InputWithLabel dir="ltr" type="email" label="ایمیل" {...register("email")} className="focus:border-primary-100" />

                <InputWithLabel
                    dir="ltr"
                    label={initialData ? "رمز عبور جدید" : "رمز عبور"}
                    {...register("password")}
                    className="focus:border-primary-100"
                />

                <div className="flex w-full flex-col gap-2.5">
                    <label>نقش</label>
                    <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                            <SingleSelect
                                defaultValue={{ title: covertUserRoleToPersian(field.value) }}
                                options={Object.values(UserRoleEnum).map((item) => ({
                                    title: covertUserRoleToPersian(item),
                                }))}
                                onChange={(selected) => {
                                    const roleEnum = covertUserRoleToUserRoleEnum(selected.title);
                                    field.onChange(roleEnum);
                                }}
                                className="size-full"
                            />
                        )}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="is_email_verified">ایمیل تایید شده؟</label>

                    <Controller
                        control={control}
                        name="is_email_verified"
                        render={({ field }) => <Switch id="is_email_verified" checked={field.value} onCheckedChange={field.onChange} />}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="is_phone_verified">شماره موبایل تایید شده؟</label>

                    <Controller
                        control={control}
                        name="is_phone_verified"
                        render={({ field }) => <Switch id="is_phone_verified" checked={field.value} onCheckedChange={field.onChange} />}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="is_active">کاربر فعال است؟</label>

                    <Controller
                        control={control}
                        name="is_active"
                        render={({ field }) => <Switch id="is_active" checked={field.value} onCheckedChange={field.onChange} />}
                    />
                </div>
            </div>

            <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
                <Button disabled={isSubmitting} className="cursor-pointer">
                    {initialData ? "ویرایش" : "ایجاد"}
                </Button>

                {initialData && (
                    <Button
                        variant="secondary"
                        onClick={deleteUserHandler}
                        className="cursor-pointer border-red-600 text-red-600 hover:border-red-500 dark:border-red-500 dark:text-red-500"
                    >
                        حذف
                    </Button>
                )}
            </div>
        </form>
    );
};

export default AddAndEditUser;
