import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

function ConsultationPaymentCallback() {
  let [searchParams] = useSearchParams();
  let reference = searchParams.get("reference");

  let [status, setStatus] = useState("verifying"); // verifying | success | failed
  let [error, setError] = useState("");

  useEffect(() => {
    async function verify() {
      if (!reference) {
        setStatus("failed");
        setError("No payment reference found.");
        return;
      }

      try {
        let { data } = await axiosInstance.get(`/consultation/pay/verify/${reference}`);
        setStatus(data.data.paymentStatus === "Paid" ? "success" : "failed");
      } catch (err) {
        setStatus("failed");
        setError(err.response?.data?.message || "We couldn't verify your payment.");
      }
    }

    verify();
  }, [reference]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F5F0] px-6 py-32">
      <div className="w-full max-w-md rounded-2xl border border-[#E8E2D9] bg-white p-10 text-center">

        {status === "verifying" && (
          <>
            <Loader2 size={40} className="mx-auto mb-4 animate-spin text-[#C8A96A]" />
            <h1 className="mb-2 font-serif text-2xl text-[#111111]">Verifying Payment...</h1>
            <p className="text-sm text-[#666]">Please wait while we confirm your payment with Paystack.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={40} className="mx-auto mb-4 text-[#C8A96A]" />
            <h1 className="mb-2 font-serif text-2xl text-[#111111]">Consultation Booked!</h1>
            <p className="mb-6 text-sm leading-6 text-[#666]">
              Your payment was successful and your consultation request has been received.
              We'll be in touch within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-block rounded-full bg-[#C8A96A] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Back to Home
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle size={40} className="mx-auto mb-4 text-red-500" />
            <h1 className="mb-2 font-serif text-2xl text-[#111111]">Payment Not Confirmed</h1>
            <p className="mb-6 text-sm leading-6 text-[#666]">
              {error || "We couldn't confirm your payment. If you were charged, please contact us and we'll sort it out."}
            </p>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-[#111111] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#C8A96A] hover:text-[#C8A96A]"
            >
              Back to Contact Page
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ConsultationPaymentCallback;