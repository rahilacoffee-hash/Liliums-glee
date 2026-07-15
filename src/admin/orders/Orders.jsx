import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import OrderTable from "./Ordertable";

const statusOptions = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 20,
      };

      if (statusFilter !== "All") {
        params.status = statusFilter;
      }

      const { data } = await axiosInstance.get("/order", {
        params,
      });

      console.log("Orders Response:", data);

      if (data.success) {
        setOrders(data.data.orders || []);
        setTotalPages(data.data.totalPages || 1);
      } else {
        setOrders([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error(error);

      setOrders([]);
      setTotalPages(1);

      setError(
        error.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#111111]">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-[#E8E2D9] bg-white px-4 py-3 text-sm outline-none focus:border-[#C8A96A]"
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

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center">
          Loading orders...
        </div>
      ) : (
        <>
          <OrderTable
            orders={orders}
            showCustomer={true}
            basePath="/admin/orders"
          />

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                    page === index + 1
                      ? "bg-[#C8A96A] text-black"
                      : "border border-[#E8E2D9] bg-white hover:border-[#C8A96A]"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;