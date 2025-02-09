"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import AddIcon from "@/assets/icons/components/Add";
import receiptIcon from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/components/EmptyState";
import { setUser } from "@/redux/slices/authSlice";
import { IAddress } from "@/interfaces/general";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { ObjectId } from "mongoose";
import Button from "@/components/common/Button";
import AddressItem from "@/components/Address/AddressItem";
import PageHeader from "@/components/PageHeader/PageHeader";

interface Props {
    addresses: IAddress[];
}

const Address = ({ addresses }: Props) => {
    const { data: session } = useSession();
    const userState = useAppSelector((state: any) => state.auth.user);
    const [isAddAddress, setIsAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState({ id: "", status: false });
    const [addressData, setAddressData] = useState({ address_title: "", address_value: "" });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser({ ...userState?.user, addresses: addresses }));
    }, []);

    const addressChangeHandler = (e: any) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const addAddressHandler = async (e: any) => {
        e.preventDefault();

        if (session?.user.userId) {
            const res = await fetch(`/api/profile/address`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session?.user.userId,
                    addressData,
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                setIsAddAddress(false);
                dispatch(setUser({ ...userState, addresses: [...userState.addresses, data] }));
                setAddressData({ address_title: "", address_value: "" });
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    };

    const selectAddressHandler = async (addressId: ObjectId | string) => {
        const res = await fetch(`/api/profile/address/select-address/${addressId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session?.user.userId,
            }),
        });

        const { data } = await res.json();

        if (res.ok) {
            dispatch(setUser({ ...userState, addresses: data }));
            toast.success(
                `${userState.addresses.find((address: IAddress) => address._id === addressId).address_title} has been edited successfully`,
            );
        } else {
            toast.error(`خطا در انتخاب آدرس`);
        }
    };

    const editAddressHandler = async (addressId: ObjectId | string) => {
        const res = await fetch(`/api/profile/address/update-address/${addressId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session?.user.userId,
                addressData: addressData && addressData,
            }),
        });

        const { data } = await res.json();

        if (res.ok) {
            setEditAddress({ id: "", status: false });
            dispatch(setUser({ ...userState, addresses: data }));
            setAddressData({ address_title: "", address_value: "" });
            toast.success(
                `${userState.addresses.find((address: IAddress) => address._id === addressId).address_title} has been selected successfully`,
            );
        } else {
            toast.error(`خطا در انتخاب آدرس`);
        }
    };

    const deleteAddressHandler = async (addressId: string) => {
        const res = await fetch(`/api/profile/address/delete-address/${addressId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session?.user.userId,
            }),
        });

        if (res.ok) {
            setIsAddAddress(false);
            dispatch(
                setUser({
                    ...userState,
                    addresses: userState.addresses.filter((address: IAddress) => address._id !== addressId),
                }),
            );
            toast.success(
                `${userState.addresses.find((address: IAddress) => address._id === addressId).address_title} has been deleted successfully`,
            );
        } else {
            toast.error(`خطا در حذف آدرس`);
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col items-center justify-center">
            <PageHeader title="آدرس ها">
                <AddIcon
                    onClick={() => {
                        setEditAddress({ id: "", status: false });
                        setIsAddAddress(true);
                    }}
                    className="h-auto w-6 cursor-pointer stroke-secondary-600 dark:stroke-white"
                />
            </PageHeader>

            <section className={`flex w-full flex-1 flex-col ${!userState?.addresses?.length ? "items-center justify-center" : ""}`}>
                {isAddAddress ? (
                    <div className="mb-4 flex w-full flex-col items-start gap-4">
                        <span className="flex w-full flex-col items-end justify-between gap-2 rounded-2xl bg-bg-2 p-4 text-gray-500">
                            <Input
                                name="address_title"
                                label="عنوان آدرس"
                                autoFocus
                                onChange={addressChangeHandler}
                                inputClassName="focus:border-primary-100"
                            />

                            <Textarea
                                rows={5}
                                name="address_value"
                                label="آدرس"
                                onChange={addressChangeHandler}
                                textareaClassName="max-h-60 focus:border-primary-100"
                            />

                            <div className="flex w-full gap-4">
                                <Button variant="Text" onClick={() => setIsAddAddress(false)} className="flex-1">
                                    انصراف
                                </Button>
                                <Button variant="Text" onClick={addAddressHandler} className="flex-1">
                                    افزودن
                                </Button>
                            </div>
                        </span>
                    </div>
                ) : null}

                <>
                    {userState?.addresses?.length ? (
                        <div className="flex w-full flex-1 flex-col items-start gap-4">
                            <div className="flex w-full flex-col gap-4">
                                {userState.addresses.map((addressItem: IAddress) => {
                                    return (
                                        <AddressItem
                                            key={addressItem._id}
                                            address={addressItem}
                                            selectAddressHandler={selectAddressHandler}
                                            setIsAddAddress={setIsAddAddress}
                                            setEditAddress={setEditAddress}
                                            setAddressData={setAddressData}
                                            editAddress={editAddress}
                                            deleteAddressHandler={deleteAddressHandler}
                                            addressData={addressData}
                                            addressChangeHandler={addressChangeHandler}
                                            editAddressHandler={editAddressHandler}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <EmptyState imgSrc={receiptIcon} description="هیچ آدرسی وجود دارد." className="flex-1" />
                    )}
                </>
            </section>
        </section>
    );
};

export default Address;
