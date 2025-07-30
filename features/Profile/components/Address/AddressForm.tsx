import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddressFormSchema, addressSchema } from "../../validation/address.schema";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { IAddress } from "@/features/auth/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
    defaultValues?: IAddress;
    onSubmit: (data: IAddress) => void;
}

const AddressForm = ({ defaultValues, onSubmit }: IProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressFormSchema>({
        resolver: zodResolver(addressSchema),
        defaultValues: defaultValues || {},
    });

    return (
        <div className="flex w-full flex-col items-start gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-end justify-between gap-2 text-gray-500 lg:gap-4">
                <div className="grid w-full gap-4 lg:grid-cols-2">
                    <InputWithLabel
                        label="عنوان آدرس"
                        {...register("title")}
                        error={errors.title?.message}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel
                        label="استان"
                        {...register("province")}
                        error={errors.province?.message}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel label="شهر" {...register("city")} error={errors.city?.message} className="focus:border-primary-100" />
                    <InputWithLabel
                        label="آدرس پستی"
                        {...register("address")}
                        error={errors.address?.message}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel
                        label="پلاک"
                        {...register("plaque")}
                        error={errors.plaque?.message}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel label="واحد" {...register("unit")} error={errors.unit?.message} className="focus:border-primary-100" />
                    <InputWithLabel
                        label="کد پستی"
                        {...register("postalCode")}
                        error={errors.postalCode?.message}
                        className="focus:border-primary-100"
                    />
                </div>

                <div className="flex w-full gap-4">
                    <Button type="submit" variant="text" className="flex-1 cursor-pointer">
                        افزودن
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
