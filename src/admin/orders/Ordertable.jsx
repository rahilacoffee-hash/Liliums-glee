import { useNavigate } from "react-router-dom";

const statusStyles = {
  Pending: "bg-[#F0EDE6] text-[#666]",
  Confirmed: "bg-[#C8A96A]/15 text-[#8a6d3b]",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-[#C8A96A]/25 text-[#7a5c28]",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

function OrderTable({
  orders = [],
  showCustomer = true,
  basePath = "/admin/orders",
}) {
  const navigate = useNavigate();

  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
        No orders found.
      </div>
    );
  }

  return (
    <>
      {/* ================= Desktop Table ================= */}

      <div className="hidden overflow-x-auto rounded-2xl border border-[#E8E2D9] bg-white lg:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E2D9] text-xs uppercase tracking-[1px] text-[#999]">
              <th className="px-5 py-4">Order</th>

              {showCustomer && (
                <th className="px-5 py-4">Customer</th>
              )}

              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Items</th>
              <th className="px-5 py-4">Total</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() =>
                  navigate(`${basePath}/${order._id}`)
                }
                className="cursor-pointer border-b border-[#E8E2D9] hover:bg-[#F8F5F0]"
              >
                <td className="px-5 py-4 font-medium">
                  #{order._id.slice(-8).toUpperCase()}
                </td>

                {showCustomer && (
                  <td className="px-5 py-4">
                    <p>{order.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {order.user?.email}
                    </p>
                  </td>
                )}

                <td className="px-5 py-4">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  {order.items?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}{" "}
                  item(s)
                </td>

                <td className="px-5 py-4 font-semibold">
                  ₦{order.totalAmount.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-right text-[#C8A96A]">
                  View →
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Mobile Cards ================= */}

      <div className="space-y-4 lg:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            onClick={() =>
              navigate(`${basePath}/${order._id}`)
            }
            className="cursor-pointer rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">
                #{order._id.slice(-8).toUpperCase()}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  statusStyles[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>

            {showCustomer && (
              <div className="mb-3">
                <p className="font-medium">
                  {order.user?.name}
                </p>

                <p className="text-sm text-gray-500">
                  {order.user?.email}
                </p>
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Date</span>

                <span>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Items</span>

                <span>
                  {order.items?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between font-semibold text-black">
                <span>Total</span>

                <span>
                  ₦
                  {order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="mt-5 w-full rounded-full bg-[#C8A96A] py-3 font-medium text-black">
              View Order
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderTable;