import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import OrderTable from "../admin/orders/Ordertable";
import Navbar from "../component/layout/Navbar/Navbar";
import Footer from "../component/layout/Footer/Footer";

function MyOrders() {
  let [orders, setOrders] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        let { data } = await axiosInstance.get("/order/my-orders");
        setOrders(data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load your orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="mx-auto max-w-5xl px-6 py-32">
      <h1 className="mb-2 font-serif text-3xl text-[#111111] md:text-4xl">My Orders</h1>
      <p className="mb-10 text-sm text-[#777]">Track the status of everything you've ordered.</p>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {loading ? (
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center text-sm text-[#777]">
          Loading your orders...
        </div>
      ) : (
        <OrderTable orders={orders} showCustomer={false} basePath="/orders" />
      )}
    </div>
    <Footer/>
    </>
  );
}

export default MyOrders;