import { redirect } from "next/navigation";
import { get } from "@/shared/libs/api/axios";
import PATH from "@/shared/utils/path";

export async function secureGet<T>(endpoint: string, params?: any) {
    try {
        return await get<T>(endpoint, params, { server: true });
    } catch (err: any) {
        if (err.message === "UNAUTHORIZED" || err.message.includes("401")) {
            redirect(PATH.login());
        }
        throw err;
    }
}
