import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  Wallet,
  CalendarDays,
} from "lucide-react";

import axiosInstance from "../../api/axiosInstance";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingConsultations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const { data } = await axiosInstance.get("/admin/dashboard");

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: "Revenue",
      value: `₦${Number(stats.totalRevenue).toLocaleString()}`,
      icon: Wallet,
      color: "bg-green-500",
    },
    {
      title: "Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-blue-500",
    },
    {
      title: "Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-orange-500",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Consultations",
      value: stats.pendingConsultations,
      icon: CalendarDays,
      color: "bg-red-500",
    },
  ];

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
              >
                <Icon
                  size={28}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCards;