"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@/assets/icons/components/Add";
import receiptIcon from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/shared/components/EmptyState";
import { setUser } from "@/redux/slices/authSlice";
import AddressItem from "@/features/ProfilePage/components/AddressItem";
import PageHeader from "@/shared/components/PageHeader";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IAddress } from "@/features/auth/interfaces";

interface Props {
    addresses: IAddress[];
}

const Address = ({ addresses }: Props) => {
    const user = useAppSelector((state) => state.auth.user);
    const [isAddAddress, setIsAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState({ id: "", status: false });
    const [addressData, setAddressData] = useState({ address_title: "", address_value: "" });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUser({ ...user, addresses }));
    }, []);

    const addressChangeHandler = (e: any) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const addAddressHandler = async (e: any) => {
        e.preventDefault();

        if (user._id) {
            const res = await fetch(`/api/profile/address`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    addressData,
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                setIsAddAddress(false);
                dispatch(setUser({ ...user, addresses: [...user.addresses, data] }));
                setAddressData({ address_title: "", address_value: "" });
                toast.success(message);
            } else {
                toast.error(message);
            }
        }
    };

    const selectAddressHandler = async (addressId: string) => {
        const res = await fetch(`/api/profile/address/select-address/${addressId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });

        const { data } = await res.json();

        if (res.ok) {
            dispatch(setUser({ ...user, addresses: data }));
            toast.success(`${user.addresses.find((address: IAddress) => address._id === addressId).title} has been edited successfully`);
        } else {
            toast.error(`خطا در انتخاب آدرس`);
        }
    };

    const editAddressHandler = async (addressId: string) => {
        const res = await fetch(`/api/profile/address/update-address/${addressId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                addressData: addressData && addressData,
            }),
        });

        const { data } = await res.json();

        if (res.ok) {
            setEditAddress({ id: "", status: false });
            dispatch(setUser({ ...user, addresses: data }));
            setAddressData({ address_title: "", address_value: "" });
            toast.success(`${user.addresses.find((address: IAddress) => address._id === addressId).title} has been selected successfully`);
        } else {
            toast.error(`خطا در انتخاب آدرس`);
        }
    };

    const deleteAddressHandler = async (addressId: string) => {
        const res = await fetch(`/api/profile/address/delete-address/${addressId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user._id,
            }),
        });

        if (res.ok) {
            setIsAddAddress(false);
            dispatch(
                setUser({
                    ...user,
                    addresses: user.addresses.filter((address: IAddress) => address._id !== addressId),
                }),
            );
            toast.success(`${user.addresses.find((address: IAddress) => address._id === addressId).title} has been deleted successfully`);
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
                    className="stroke-secondary-600 h-auto w-6 cursor-pointer dark:stroke-white"
                />
            </PageHeader>

            <section className={`flex w-full flex-1 flex-col ${!user?.addresses?.length ? "items-center justify-center" : ""}`}>
                {isAddAddress ? (
                    <div className="mb-4 flex w-full flex-col items-start gap-4">
                        <span className="bg-bg-2 flex w-full flex-col items-end justify-between gap-2 rounded-2xl p-4 text-gray-500">
                            <InputWithLabel
                                name="address_title"
                                label="عنوان آدرس"
                                autoFocus
                                onChange={addressChangeHandler}
                                className="focus:border-primary-100"
                            />

                            <Textarea
                                rows={5}
                                name="address_value"
                                label="آدرس"
                                onChange={addressChangeHandler}
                                className="focus:border-primary-100 max-h-60"
                            />

                            <div className="flex w-full gap-4">
                                <Button variant="text" onClick={() => setIsAddAddress(false)} className="flex-1">
                                    انصراف
                                </Button>
                                <Button variant="text" onClick={addAddressHandler} className="flex-1">
                                    افزودن
                                </Button>
                            </div>
                        </span>
                    </div>
                ) : null}

                <>
                    {user?.addresses?.length ? (
                        <div className="flex w-full flex-1 flex-col items-start gap-4">
                            <div className="flex w-full flex-col gap-4">
                                {user.addresses.map((addressItem: IAddress) => {
                                    return (
                                        <AddressItem
                                            key={String(addressItem._id)}
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
