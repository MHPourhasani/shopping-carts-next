import Image from "next/image";
import logo from "@/public/icons/android/android-launchericon-512-512.png";

const PageLoader = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-20">
            <Image src={logo} alt="logo" width={150} height={150} className="size-28 rounded-xl lg:size-40 lg:rounded-2xl" />
            <span className="loader"></span>
        </div>
    );
};

export default PageLoader;
