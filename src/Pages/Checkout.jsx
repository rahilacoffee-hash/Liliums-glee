import { useEffect, useMemo, useState } from "react";
import { MapPin, Save } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/layout/Navbar/Navbar";

function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [addressLabel, setAddressLabel] = useState("Home");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Nigeria",
  });

  useEffect(() => {
    if (!user) return;
    setShippingAddress((current) => ({
      ...current,
      fullName: current.fullName || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.mobile || "",
    }));
  }, [user]);

  const isAbuja = /abuja|fct/i.test(`${shippingAddress.address} ${shippingAddress.city} ${shippingAddress.state}`);
  const hasPreorder = cartItems.some((item) => item.isPreorder);
  const deliveryEstimate = hasPreorder
    ? "Pre-order goods would be delivered within 15 working days."
    : isAbuja
      ? "Estimated delivery in Abuja: 3–5 working days."
      : "Estimated delivery outside Abuja: 7–10 working days.";
  const mapQuery = useMemo(
    () => [shippingAddress.address, shippingAddress.city, shippingAddress.state, shippingAddress.country].filter(Boolean).join(", "),
    [shippingAddress]
  );

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

    if (saveAddress && user) {
      const { data: savedAddressData } = await axiosInstance.post("/user/saved-addresses", {
        label: addressLabel,
        ...shippingAddress,
      });
      if (!savedAddressData.success) throw new Error(savedAddressData.message);
      setUser((current) => current ? { ...current, savedAddresses: savedAddressData.data } : current);
    }

    // Create Order
    const { data: orderData } = await axiosInstance.post("/order", {
      shippingAddress,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        selectedColor: item.selectedColor || "",
        selectedSize: item.selectedSize || "",
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
    <>
      <Navbar />
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

              {user?.savedAddresses?.length > 0 && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#333]">Saved address</label>
                  <select
                    defaultValue=""
                    onChange={(event) => {
                      const saved = user.savedAddresses.find((item) => item._id === event.target.value);
                      if (saved) setShippingAddress((current) => ({ ...current, ...saved, email: current.email || user.email || "" }));
                    }}
                    className="w-full rounded-xl border p-4"
                  >
                    <option value="">Choose a saved address</option>
                    {user.savedAddresses.map((item) => <option key={item._id} value={item._id}>{item.label} — {item.address}, {item.city}</option>)}
                  </select>
                </div>
              )}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border p-4"
              />

              {user && (
                <div className="rounded-2xl border border-[#E8E2D8] bg-[#FDF9F1] p-4">
                  <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#333]">
                    <input type="checkbox" checked={saveAddress} onChange={(event) => setSaveAddress(event.target.checked)} className="h-4 w-4" />
                    <Save size={16} className="text-[#A98446]" /> Save this address for next time
                  </label>
                  {saveAddress && <input type="text" value={addressLabel} onChange={(event) => setAddressLabel(event.target.value)} placeholder="Address label, e.g. Home" className="mt-3 w-full rounded-xl border bg-white p-3" />}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-[#E8E2D8]">
                <div className="flex items-center gap-2 bg-[#FDF9F1] px-4 py-3 text-sm font-semibold text-[#51483E]"><MapPin size={16} className="text-[#A98446]" /> Delivery location</div>
                <iframe title="Delivery address map" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery || "Abuja, Nigeria")}&output=embed`} loading="lazy" className="h-56 w-full border-0" />
              </div>

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
                  key={item.cartItemKey || item._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    {(item.selectedColor || item.selectedSize) && <p className="text-sm text-gray-500">{[item.selectedColor, item.selectedSize].filter(Boolean).join(" · ")}</p>}
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

            <div className="mt-6 rounded-2xl border border-[#C8A96A]/35 bg-[#FDF9F1] p-4 text-sm leading-6 text-[#51483E]">
              <p className="font-semibold text-[#171717]">Delivery estimate</p>
              <p className="mt-1">{deliveryEstimate}</p>
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
    </>
  );
}

export default Checkout;
