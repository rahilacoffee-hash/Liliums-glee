import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../component/layout/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] pt-36">
        <div className="container mx-auto px-6 text-center">
          <ShoppingBag
            size={80}
            className="mx-auto mb-6 text-[#C8A96A]"
          />

          <h1 className="mb-4 font-serif text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mb-8 text-gray-600">
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/shop"
            className="rounded-full bg-[#C8A96A] px-8 py-4 font-semibold text-black"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
    <Navbar/>
    <main className="min-h-screen bg-[#F8F5F0] pt-36 pb-20">
      <div className="container mx-auto px-6">

        <div className="mb-12 flex items-center justify-between">
          <h1 className="font-serif text-5xl">
            Shopping Cart
          </h1>

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">

          {/* Cart Items */}

          <div className="space-y-6 lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow md:flex-row"
              >
                <img
                  src={
                    item.images?.length
                      ? item.images[0].url
                      : "https://placehold.co/200x200"
                  }
                  alt={item.name}
                  className="h-40 w-40 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col">

                  <h2 className="font-serif text-2xl">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {item.category}
                  </p>

                  <div className="mt-4 text-2xl font-semibold">
                    ₦{Number(item.price).toLocaleString()}
                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    {/* Quantity */}

                    <div className="flex items-center rounded-full border">

                      <button
                        onClick={() =>
                          decreaseQuantity(item._id)
                        }
                        className="p-3"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="px-4">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item._id)
                        }
                        className="p-3"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div className="rounded-3xl bg-white p-8 shadow h-fit">

            <h2 className="mb-8 font-serif text-3xl">
              Order Summary
            </h2>

            <div className="mb-4 flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="mb-6 flex justify-between">
              <span>Subtotal</span>

              <span className="font-semibold">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>

            <hr className="mb-6" />

            <div className="mb-8 flex justify-between text-2xl font-bold">
              <span>Total</span>

              <span>
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>

         <button
  onClick={() => navigate("/checkout")}
  className="w-full rounded-full bg-[#C8A96A] py-4 font-semibold"
>
  Proceed to Checkout
</button>

            <Link
              to="/shop"
              className="mt-4 block text-center text-[#C8A96A]"
            >
              Continue Shopping
            </Link>

          </div>

        </div>
      </div>
    </main>
    </>
  );
}

export default Cart;