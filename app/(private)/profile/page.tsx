import { IOrder } from "@/features/Orders/interfaces";
import { IPaginatedResponse } from "@/shared/interfaces";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import PATH from "@/shared/utils/path";
import Link from "next/link";

const getOrders = async () => {
    const data = await get<IPaginatedResponse<IOrder>>(API.orders.list());
    return data.results;
};

const ProfilePage = async () => {
    const orders = await getOrders();

    const summary = [
        { title: "سفارشات", length: orders?.length || 0 },
        {
            title: "هزینه ها",
            length: 0,
        },
    ];

    return (
        <>
            <section className="flex w-full flex-1 flex-col gap-8">
                <h1 className="mb-5 text-3xl font-bold">خلاصه فعالیت ها</h1>

                <div className="grid gap-4 lg:grid-cols-3">
                    {summary.map((item) => (
                        <div key={item.title} className="flex flex-col gap-4 rounded-xl border p-4">
                            <span className="font-medium">{item.title}</span>
                            <span>{item.length}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-xl font-semibold">آخرین سفارشات</p>
                    {orders ? (
                        <div className="grid grid-cols-2 gap-4">
                            {orders.map((item) => (
                                <Link
                                    key={item._id}
                                    href={PATH.profile.order.single_order(item._id)}
                                    className="hover-transition hover:bg-bg-2 dark:hover:bg-secondary-600 flex flex-col gap-2 rounded-xl border p-4"
                                >
                                    <p className="truncate">سفارش #{item._id}</p>
                                    <span className="flex items-center justify-between">
                                        {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                                        {item.items.length}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        "سفارشی وجود ندارد."
                    )}
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
