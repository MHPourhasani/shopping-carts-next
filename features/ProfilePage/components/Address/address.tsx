"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@/assets/icons/components/Add";
import receiptIcon from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/shared/components/EmptyState";
import { setUser } from "@/redux/slices/authSlice";
import AddressItem from "@/features/ProfilePage/components/Address/AddressItem";
import PageHeader from "@/shared/components/PageHeader";
import { IAddress } from "@/features/auth/interfaces";
import { post, put } from "@/shared/libs/axios";
import AddressDialog from "./AddressModal";
import API from "@/shared/libs/endpoints";

const Addresses = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [dialogStatus, setDialogStatus] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Partial<IAddress> | undefined>(undefined);

    const saveAddress = async (data: IAddress) => {
        if (selectedAddress?._id) {
            const updated = await put(API.users.singleAddress(selectedAddress._id), data);
            console.log(updated);
            dispatch(setUser({ ...user, addresses: "data" }));

            toast.success("آدرس با موفقیت ویرایش شد.");
        } else {
            const newAddress = await post(API.users.addAddress(), data);
            console.log(newAddress);
            toast.success("آدرس با موفقیت اضافه شد.");
        }
    };

    return (
        <>
            <AddressDialog open={dialogStatus} onOpenChange={setDialogStatus} defaultValues={selectedAddress} onSubmit={saveAddress} />

            <section className="flex w-full flex-1 flex-col items-center justify-center gap-4 lg:gap-8">
                <PageHeader title="آدرس ها">
                    <AddIcon
                        onClick={() => setDialogStatus(true)}
                        className="stroke-secondary-600 h-auto w-6 cursor-pointer dark:stroke-white"
                    />
                </PageHeader>

                <div className={`flex w-full flex-1 flex-col ${!user?.addresses?.length ? "items-center justify-center" : ""}`}>
                    {user && user.addresses.length ? (
                        <div className="flex w-full flex-1 flex-col items-start gap-4">
                            {user.addresses.map((address) => {
                                console.log(address._id);
                                return (
                                    <AddressItem
                                        key={address._id?.toString()}
                                        address={address}
                                        onSelect={(address) => setSelectedAddress(address)}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyState imgSrc={receiptIcon} description="هیچ آدرسی وجود دارد." className="flex-1" />
                    )}
                </div>
            </section>
        </>
    );
};

export default Addresses;
