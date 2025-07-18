import { ResponsiveDrawerDialog } from "@/components/ui/responsiveDrawerDialog";
import { IAddress } from "@/features/auth/interfaces";
import { useState } from "react";
import AddressForm from "./AddressForm";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    defaultValues?: Partial<IAddress>;
    onSubmit: (data: IAddress) => Promise<void> | void;
};

export default function AddressModal({ open, onOpenChange, defaultValues, onSubmit }: Props) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: IAddress) => {
        try {
            setLoading(true);
            await onSubmit(data);
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResponsiveDrawerDialog open={open} onOpenChange={onOpenChange} title={defaultValues ? "ویرایش آدرس" : "افزودن آدرس"}>
            <AddressForm defaultValues={defaultValues} onSubmit={handleSubmit} />

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20">
                    <span className="animate-pulse text-white">در حال ذخیره...</span>
                </div>
            )}
        </ResponsiveDrawerDialog>
    );
}
