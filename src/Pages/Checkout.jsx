import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  function handleChange(e) {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  }

async function handleCheckout() {
  try {
    setLoading(true);

    // Cart validation
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Shipping validation
    const {
      fullName,
      email,
      phone,
      address,
      city,
      state,
      country,
    } = shippingAddress;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !country.trim()
    ) {
      toast.error("Please fill in all shipping details.");
      return;
    }

    // Create Order
    const { data: orderData } = await axiosInstance.post("/order", {
      shippingAddress,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
    });

    if (!orderData.success) {
      toast.error(orderData.message);
      return;
    }

    const orderId = orderData.data._id;

    console.log("Created Order:", orderId);

    // Initialize Payment
    const { data: paymentData } =
      await axiosInstance.post("/payment/initialize", {
        orderId,
      });

    console.log(paymentData);

    if (!paymentData.success) {
      toast.error(paymentData.message);
      return;
    }

    const paymentUrl =
      paymentData.data.authorization_url;

    if (!paymentUrl) {
      toast.error("Unable to initialize payment.");
      return;
    }

    window.location.assign(paymentUrl);

  } catch (error) {
    console.error("Checkout Error:", error);

    toast.error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Checkout failed."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-[#F8F5F0] pt-36 pb-24">
      <div className="container mx-auto max-w-5xl px-6">

        <h1 className="mb-10 font-serif text-5xl">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Shipping */}

          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-semibold">
              Shipping Information
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={shippingAddress.email}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="rounded-xl border p-4"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="rounded-xl border p-4"
                />

              </div>

              <input
                type="text"
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

            </div>

          </div>

          {/* Summary */}

          <div className="rounded-3xl bg-white p-8 shadow h-fit">

            <h2 className="mb-6 text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span>
                    ₦
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              ))}

            </div>

            <div className="mt-8 flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span>
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              disabled={loading}
              onClick={handleCheckout}
              className="mt-8 w-full rounded-full bg-[#C8A96A] py-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Redirecting..."
                : "Pay with Paystack"}
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default Checkout;