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
import { post, put } from "@/shared/libs/api/axios";
import AddressModal from "./AddressModal";
import API from "@/shared/libs/api/endpoints";

const Addresses = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [editData] = useState<Partial<IAddress> | undefined>(undefined);

    const saveAddress = async (data: IAddress) => {
        if (editData?._id) {
            const updated = await put(API.users.singleAddress(editData._id), data);
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
            <AddressModal open={modalOpen} onOpenChange={setModalOpen} defaultValues={editData} onSubmit={saveAddress} />

            <section className="flex w-full flex-1 flex-col items-center justify-center">
                <PageHeader title="آدرس ها">
                    <AddIcon
                        onClick={() => setModalOpen(true)}
                        className="stroke-secondary-600 h-auto w-6 cursor-pointer dark:stroke-white"
                    />
                </PageHeader>

                <div className={`flex w-full flex-1 flex-col ${!user?.addresses?.length ? "items-center justify-center" : ""}`}>
                    {user!.addresses.length ? (
                        <div className="flex w-full flex-1 flex-col items-start gap-4">
                            {user!.addresses.map((address) => {
                                return (
                                    <AddressItem
                                        key={String(address._id)}
                                        address={address}
                                        setIsAddAddress={setIsAddAddress}
                                        setEditAddress={setEditAddress}
                                        setAddressData={setAddressData}
                                        editAddress={editAddress}
                                        addressData={addressData}
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
