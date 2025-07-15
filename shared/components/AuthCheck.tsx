const AuthCheck = ({ children }: { children: React.ReactNode }) => {
    if ("authenticated" === "authenticated") {
        return <>{children}</>;
    } else {
        return <>iklijii</>;
    }
};

export default AuthCheck;
