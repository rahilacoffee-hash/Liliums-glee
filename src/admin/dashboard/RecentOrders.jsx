import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { data } = await axiosInstance.get(
        "/admin/recent-orders"
      );

      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusClass(status) {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest customer purchases
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="font-medium text-[#C8A96A] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Order ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Date
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Total
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order.orderNumber}
                  </td>

                  <td className="px-6 py-4">
                    {order.customerName}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₦
                    {Number(order.totalAmount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="inline-flex rounded-lg bg-gray-100 p-2 transition hover:bg-[#C8A96A] hover:text-white"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;