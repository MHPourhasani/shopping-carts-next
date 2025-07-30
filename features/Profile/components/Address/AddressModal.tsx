import { ResponsiveDrawerDialog } from "@/components/ui/responsiveDrawerDialog";
import { IAddress } from "@/features/auth/interfaces";
import { useState } from "react";
import AddressForm from "./AddressForm";

interface IProps {
    open: boolean;
    onOpenChange: () => void;
    defaultValues?: IAddress;
    onSubmit: (data: IAddress) => Promise<void> | void;
}

export default function AddressDialog({ open, onOpenChange, defaultValues, onSubmit }: IProps) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: IAddress) => {
        try {
            setLoading(true);
            await onSubmit(data);
            onOpenChange();
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
