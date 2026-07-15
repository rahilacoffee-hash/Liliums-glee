import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import OrderTable from "./Ordertable";

const statusOptions = [
  "All",
  "Pending",
  "Confirmed",
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
  setOrders(data.data || []);
  setTotalPages(1);
} else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      setOrders([]);
      setError(
        error.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">
            Orders
          </h1>

          <p className="text-gray-500">
            Manage customer orders
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border px-4 py-2"
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
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center">
          Loading...
        </div>
      ) : (
        <>
          <OrderTable
            orders={orders}
            showCustomer
            basePath="/admin/orders"
          />

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`h-10 w-10 rounded-full ${
                    page === index + 1
                      ? "bg-[#C8A96A]"
                      : "border"
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