import CheckedIcon from "@/assets/icons/components/Checked";
import EmptySquareIcon from "@/assets/icons/svgs/empty-square.svg";
import EditIcon from "@/assets/icons/components/Edit";
import Image from "next/image";
import TrashIcon from "@/assets/icons/components/Trash";
import { IAddress } from "@/features/Auth/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/authSlice";
import { del } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";

interface IProps {
    address: IAddress;
    onSelect: (address: IAddress) => void;
}

const AddressItem = ({ address, onSelect }: IProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    const deleteAddressHandler = async () => {
        try {
            const addrId = address._id!.toString();
            console.log(addrId);
            const res = await del(API.users.singleAddress(addrId));
            console.log(res);

            dispatch(
                setUser({
                    ...user,
                    addresses: user?.addresses.filter((address: IAddress) => address._id !== addrId),
                }),
            );
            toast.success(`${address.title} با موفقیت خذف شد`);
        } catch (error) {
            console.error(error);
            toast.error(`خطا در حذف آدرس`);
        }
    };

    return (
        <div
            key={address._id}
            className="bg-bg-2 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full flex-col gap-4 rounded-xl p-4 break-all"
        >
            <div className="flex items-center justify-between">
                <div className="flex h-5 items-center gap-2 font-semibold">
                    <span className="cursor-pointer">
                        {address.isDefault ? (
                            <CheckedIcon className="w-auto" color="#16a34a" />
                        ) : (
                            <Image src={EmptySquareIcon} alt="checked" />
                        )}
                    </span>
                    <h4 className="dark:text-secondary-50 text-lg">{address.title}</h4>
                </div>

                <span className="flex h-6 items-center gap-3">
                    <EditIcon
                        onClick={() => onSelect(address)}
                        className="fill-customBlack-100 dark:fill-secondary-100 h-5 w-auto cursor-pointer"
                    />
                    <TrashIcon onClick={deleteAddressHandler} className="h-full w-auto cursor-pointer fill-red-600" />
                </span>
            </div>

            <p className="text-gray-400 dark:text-gray-100">
                {address.province}، {address.city}، {address.address}، {address.plaque}، {address?.unit}
            </p>
        </div>
    );
};

export default AddressItem;
