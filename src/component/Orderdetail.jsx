import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

let statusStyles = {
  Pending: "bg-[#F0EDE6] text-[#666]",
  Confirmed: "bg-[#C8A96A]/15 text-[#8a6d3b]",
  Shipped: "bg-[#C8A96A]/25 text-[#7a5c28]",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

function OrderDetail() {
  let { id } = useParams();
  let [order, setOrder] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        let { data } = await axiosInstance.get(`/order/${id}`);
        setOrder(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="px-6 py-32 text-center text-sm text-[#777]">Loading order...</div>;
  }

  if (error || !order) {
    return <div className="px-6 py-32 text-center text-sm text-red-500">{error || "Order not found"}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-32">
      <Link to="/orders" className="mb-6 inline-flex items-center gap-1 text-sm text-[#777] hover:text-[#C8A96A]">
        <ChevronLeft size={16} />
        Back to My Orders
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>
          <p className="mt-1 text-sm text-[#777]">
            Placed {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <span className={`rounded-full px-4 py-1.5 text-sm font-medium ${statusStyles[order.status] || statusStyles.Pending}`}>
          {order.status}
        </span>
      </div>

      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6">
        <h2 className="mb-4 font-serif text-lg text-[#111111]">Items</h2>

        <div className="space-y-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b border-[#E8E2D9] pb-4 last:border-0 last:pb-0">
              <div>
                <p className="font-medium text-[#111111]">{item.name}</p>
                <p className="text-sm text-[#999]">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-[#111111]">₦{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#E8E2D9] pt-4">
          <span className="font-serif text-lg text-[#111111]">Total</span>
          <span className="font-serif text-xl text-[#C8A96A]">₦{order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="mt-6 rounded-2xl border border-[#E8E2D9] bg-white p-6">
          <h2 className="mb-3 font-serif text-lg text-[#111111]">Shipping Address</h2>
          <p className="text-sm leading-6 text-[#666]">{order.shippingAddress}</p>
        </div>
      )}
    </div>
  );
}

export default OrderDetail;