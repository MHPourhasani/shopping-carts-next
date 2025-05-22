import CheckedIcon from "@/assets/icons/components/Checked";
import EmptySquareIcon from "@/assets/icons/svgs/empty-square.svg";
import EditIcon from "@/assets/icons/components/Edit";
import Image from "next/image";
import TrashIcon from "@/assets/icons/components/Trash";
import { IAddress } from "@/interfaces/general";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
    address: IAddress;
    selectAddressHandler: (a: any) => void;
    setIsAddAddress: any;
    setEditAddress: any;
    setAddressData: any;
    editAddress: { id: string; status: boolean };
    deleteAddressHandler: (a: any) => void;
    addressData: { address_title: string; address_value: string };
    addressChangeHandler: (a: any) => void;
    editAddressHandler: (a: any) => void;
}

const address = ({
    address,
    selectAddressHandler,
    setIsAddAddress,
    setEditAddress,
    setAddressData,
    editAddress,
    deleteAddressHandler,
    addressData,
    addressChangeHandler,
    editAddressHandler,
}: Props) => {
    return (
        <div
            key={address._id}
            className="bg-bg-2 text-secondary-600 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full flex-col gap-4 rounded-xl p-4 break-all"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-5 items-center gap-2 font-semibold">
                    <span
                        onClick={() => {
                            selectAddressHandler(address._id);
                        }}
                        className="cursor-pointer"
                    >
                        {address.isSelected ? (
                            <CheckedIcon className="w-auto" color="#16a34a" />
                        ) : (
                            <Image src={EmptySquareIcon} alt="checked" />
                        )}
                    </span>
                    <h4 className="dark:text-secondary-50 text-lg">{address.address_title}</h4>
                </div>

                <span className="flex h-6 items-center gap-3">
                    <EditIcon
                        onClick={() => {
                            setIsAddAddress(false);
                            setEditAddress({ id: address._id, status: !editAddress.status });
                            setAddressData({
                                address_title: address.address_title,
                                address_value: address.address_value,
                            });
                        }}
                        className="fill-customBlack-100 dark:fill-secondary-100 h-5 w-auto cursor-pointer"
                    />
                    <TrashIcon onClick={() => deleteAddressHandler(address._id)} className="h-full w-auto cursor-pointer fill-red-600" />
                </span>
            </div>

            {editAddress.id !== address._id && <p className="dark:text-secondary-100">{address.address_value}</p>}

            {editAddress.id === address._id && (
                <span className="bg-bg-2 flex w-full flex-col items-end justify-between gap-2 rounded-[28px] text-gray-500">
                    <InputWithLabel
                        label="نام"
                        name="address_title"
                        autoFocus
                        value={addressData.address_title || address.address_title}
                        onChange={addressChangeHandler}
                        className="focus:border-primary-100"
                    />

                    <Textarea
                        label="آدرس"
                        rows={5}
                        name="address_value"
                        value={addressData.address_value || address.address_value}
                        onChange={addressChangeHandler}
                        className="focus:border-primary-100 max-h-60"
                    />

                    <div className="flex w-full gap-4">
                        <Button variant="text" onClick={() => setEditAddress({ id: "", status: false })} className="flex-1">
                            انصراف
                        </Button>
                        <Button variant="text" onClick={() => editAddressHandler(address._id)} className="flex-1">
                            به روزرسانی
                        </Button>
                    </div>
                </span>
            )}
        </div>
    );
};

export default address;
