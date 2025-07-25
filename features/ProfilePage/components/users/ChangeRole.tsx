"use client";
import { useState } from "react";
import SingleSelect from "@/shared/components/common/SingleSelect";
import { TOption } from "@/interfaces/general";
import { toast } from "react-toastify";
import toastMessage from "@/shared/utils/toastMessage";
import { covertUserRoleToPersian, covertUserRoleToUserRoleEnum } from "@/shared/utils/utils";
import { IUser } from "@/features/auth/interfaces";
import { UserRoleEnum } from "@/features/auth/enums";
import { put } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";

interface Props {
    user: IUser;
}

const ChangeRole = ({ user }: Props) => {
    const [selected, setSelected] = useState<TOption>({ title: covertUserRoleToPersian(user.role) });

    const changeRoleHandler = async (selectedItem: TOption) => {
        try {
            if (selectedItem.title) {
                setSelected(selectedItem);
                await put(API.users.updateUserProfile(user._id), { role: covertUserRoleToUserRoleEnum(selectedItem.title) });

                toast.success(
                    toastMessage.dashboard.successfulChangedRole(user.first_name ? `${user?.first_name} ${user?.last_name}` : user.email),
                );
            }
        } catch (error) {
            toast.error(toastMessage.dashboard.failedChangedRole(user.first_name ? `${user?.first_name} ${user?.last_name}` : user.email));
        }
    };

    return (
        <SingleSelect
            defaultValue={selected}
            options={Object.values(UserRoleEnum).map((item) => {
                return { title: covertUserRoleToPersian(item) };
            })}
            onChange={(selected) => changeRoleHandler(selected)}
            className="w-32 min-w-32"
        />
    );
};

export default ChangeRole;
