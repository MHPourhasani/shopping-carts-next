import { IOrder } from "@/interfaces/general";
import PATH from "@/shared/path";
import Link from "next/link";

const getOrders = async (user_id: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/orders?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const data = await response.json();
            return data.orders;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const DashboardPage = async () => {
    const orders: IOrder[] = await getOrders(session?.user.userId!);

    const summary = [
        { title: "سفارشات", length: orders?.length || 0 },
        {
            title: "هزینه ها",
            length: 0,
        },
    ];

    return (
        <section className="flex w-full flex-1 flex-col gap-8">
            <h1 className="mb-5 text-3xl font-bold">داشبورد</h1>

            <div className="grid grid-cols-3 gap-4">
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
                                key={item.orderNo}
                                href={`${PATH.dashboard.order.orders()}/${item.orderNo}`}
                                className="hover-transition hover:bg-bg-2 dark:hover:bg-secondary-600 flex flex-col gap-2 rounded-xl border p-4"
                            >
                                <p className="truncate">سفارش #{item.orderNo}</p>
                                <span className="flex items-center justify-between">
                                    {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                                    {item.products.length}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    "سفارشی وجود ندارد."
                )}
            </div>
        </section>
    );
};

export default DashboardPage;
