import Image from "next/image";
import logo from "@/public/icons/android/android-launchericon-512-512.png";

const PageLoader = () => {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-20">
            <Image src={logo} alt="logo" className="rounded-2xl" width={150} height={150} />
            <span className="loader"></span>;
        </div>
    );
};

export default PageLoader;
