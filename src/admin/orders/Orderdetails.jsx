import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  User,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import toast from "react-hot-toast";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped: "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  async function fetchOrder() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(`/order/${id}`);

      if (data.success) {
        setOrder(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load order"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [id]);

  async function handleStatusChange(status) {
    try {
      setUpdating(true);

      const { data } = await axiosInstance.put(
        `/order/${id}/status`,
        { status }
      );

      toast.success(data.message);

      fetchOrder();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-96 items-center justify-center">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] p-4 md:p-8">

      {/* Back */}

      <Link
        to="/admin/orders"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C8A96A]"
      >
        <ChevronLeft size={18} />
        Back to Orders
      </Link>

      {/* Header */}

      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="font-serif text-2xl md:text-4xl">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>

            <p className="mt-2 text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div
              className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </div>

          </div>

          <div className="w-full lg:w-64">

            <label className="mb-2 block text-sm font-medium">
              Update Status
            </label>

            <select
              value={order.status}
              disabled={updating}
              onChange={(e) =>
                handleStatusChange(e.target.value)
              }
              className="w-full rounded-xl border border-[#E8E2D9] bg-white p-3 outline-none focus:border-[#C8A96A]"
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="grid gap-6 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">
              <Package className="text-[#C8A96A]" />
              <h2 className="font-serif text-2xl">
                Order Items
              </h2>
            </div>

            <div className="space-y-5">

              {order.items.map((item, index) => (

                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-2xl border border-[#EFE8DD] p-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.image ||
                        "https://placehold.co/100x100"
                      }
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₦{item.price.toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="text-lg font-bold text-[#C8A96A]">
                    ₦
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-6">

              <span className="text-xl font-semibold">
                Total
              </span>

              <span className="font-serif text-3xl text-[#C8A96A]">
                ₦
                {order.totalAmount.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* Customer */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <User className="text-[#C8A96A]" />
              <h2 className="font-serif text-xl">
                Customer
              </h2>
            </div>

            <div className="space-y-3 text-sm">

              <p>
                <strong>Name:</strong>{" "}
                {order.user?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.user?.email}
              </p>

            </div>

          </div>

          {/* Shipping */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <MapPin className="text-[#C8A96A]" />
              <h2 className="font-serif text-xl">
                Shipping Address
              </h2>
            </div>

            <div className="space-y-2 text-sm leading-6">

              <p>{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.phone}</p>
              <p>{order.shippingAddress?.email}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>
              <p>{order.shippingAddress?.country}</p>

            </div>

          </div>

          {/* Payment */}

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">
              <CreditCard className="text-[#C8A96A]" />
              <h2 className="font-serif text-xl">
                Payment
              </h2>
            </div>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span>Method</span>
                <strong>
                  {order.paymentMethod}
                </strong>
              </div>

              <div className="flex justify-between">

                <span>Status</span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>

              </div>

              <div>

                <p className="mb-1 text-xs uppercase text-gray-500">
                  Reference
                </p>

                <p className="break-all rounded-lg bg-gray-100 p-2 text-xs">
                  {order.paymentReference ||
                    "Not available"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;