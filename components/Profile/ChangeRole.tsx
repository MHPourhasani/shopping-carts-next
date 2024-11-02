"use client";
import { useState } from "react";
import SingleSelect from "../common/SingleSelect";
import { TOption, UserInterface, UserRoleEnum } from "@/interfaces/general";
import { toast } from "react-toastify";
import toastMessage from "@/utils/toastMessage";
import { covertUserRoleToPersian } from "@/utils/helper";

interface Props {
    user: UserInterface;
}

const ChangeRole = ({ user }: Props) => {
    const [selected, setSelected] = useState<TOption>({ title: covertUserRoleToPersian(user.role) });

    const changeRoleHandler = async (selectedItem: TOption) => {
        if (selectedItem.title) {
            setSelected(selectedItem);
            const res = await fetch(`/api/auth/users/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: selectedItem.title }),
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
