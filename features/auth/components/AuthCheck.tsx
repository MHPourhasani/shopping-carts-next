import { useSession } from "next-auth/react";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return <>{children}</>;
    } else {
        return <>iklijii</>;
    }
};

export default AuthCheck;
