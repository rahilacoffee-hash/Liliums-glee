import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verify() {
      try {
        const reference = searchParams.get("reference");

        if (!reference) {
          toast.error("Invalid payment reference.");
          navigate("/cart");
          return;
        }

        const { data } = await axiosInstance.get(
          `/payment/verify/${reference}`
        );

        if (!data.success) {
          toast.error(data.message);
          navigate("/cart");
          return;
        }

        clearCart();

        setVerified(true);

        toast.success("Payment successful!");

        setTimeout(() => {
          navigate("/orders");
        }, 3000);

      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
            "Payment verification failed"
        );

        navigate("/cart");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F5F0]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#C8A96A] border-t-transparent"></div>

          <p className="text-lg">
            Verifying payment...
          </p>
        </div>
      </main>
    );
  }

  if (!verified) return null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F5F0] px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">

        <CheckCircle
          size={90}
          className="mx-auto mb-6 text-green-500"
        />

        <h1 className="mb-4 font-serif text-4xl">
          Payment Successful
        </h1>

        <p className="mb-8 text-gray-600">
          Thank you for shopping with
          <span className="font-semibold">
            {" "}Lilium's Glee
          </span>.
          <br />
          Your order has been confirmed.
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="w-full rounded-full bg-[#C8A96A] py-4 font-semibold transition hover:opacity-90"
        >
          View My Orders
        </button>

      </div>
    </main>
  );
}

export default PaymentSuccess;