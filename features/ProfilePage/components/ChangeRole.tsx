"use client";
import { useState } from "react";
import SingleSelect from "@/shared/components/common/SingleSelect";
import { TOption, IUser } from "@/interfaces/general";
import { toast } from "react-toastify";
import toastMessage from "@/shared/toastMessage";
import { covertUserRoleToPersian, covertUserRoleToUserRoleEnum } from "@/shared/helper";
import { UserRoleEnum } from "@/interfaces/enums";

interface Props {
    user: IUser;
}

const ChangeRole = ({ user }: Props) => {
    const [selected, setSelected] = useState<TOption>({ title: covertUserRoleToPersian(user.role) });

    const changeRoleHandler = async (selectedItem: TOption) => {
        if (selectedItem.title) {
            setSelected(selectedItem);
            const res = await fetch(`/api/auth/users/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: covertUserRoleToUserRoleEnum(selectedItem.title) }),
            });

            if (res.ok) {
                toast.success(
                    toastMessage.profile.successfulChangedRole(user.first_name ? `${user?.first_name} ${user?.last_name}` : user.email),
                );
            } else {
                toast.error(
                    toastMessage.profile.failedChangedRole(user.first_name ? `${user?.first_name} ${user?.last_name}` : user.email),
                );
            }
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
