import Cookies from "js-cookie";

export const authToken = {
    key: "MHP_SHOP_AUTH_TOKEN",

    get: function (): { access: string; refresh: string } | null {
        const data = Cookies.get(authToken.key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                authToken.remove();
            }
        }
        return null;
    },

    set: (value: { access: string; refresh: string }) => {
        Cookies.set(authToken.key, JSON.stringify(value));
    },

    remove(): void {
        Cookies.remove(authToken.key);
    },
};
