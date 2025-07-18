import { UserRoleEnum } from "./enums";

export interface IAddress {
    _id?: string;
    title: string | null;
    province: string;
    city: string;
    address: string;
    plaque: string;
    unit?: string;
    postalCode: string;
    isDefault: boolean;
}

export interface IUser {
    _id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    password: string;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    is_active: boolean;
    profile_image: string | null;
    phone: string | null;
    addresses: IAddress[];
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
}
