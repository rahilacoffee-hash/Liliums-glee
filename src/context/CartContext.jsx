import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item
  const addToCart = (product, quantity = 1) => {
    const stock = Number(product.stock) || 0;
    if (stock <= 0) return;

    setCartItems((prev) => {
      const variantKey = `${product._id}:${product.selectedColor || ""}:${product.selectedSize || ""}`;
      const existing = prev.find((item) => item.cartItemKey === variantKey);

      if (existing) {
        return prev.map((item) =>
          item.cartItemKey === variantKey
            ? {
                ...item,
                quantity: Math.min(stock, item.quantity + quantity),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartItemKey: variantKey,
          quantity,
        },
      ];
    });
  };

  // Remove Item
  const removeFromCart = (cartItemKey) => {
    setCartItems((prev) =>
      prev.filter((item) => (item.cartItemKey || item._id) !== cartItemKey)
    );
  };

  // Increase Quantity
  const increaseQuantity = (cartItemKey) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item.cartItemKey || item._id) === cartItemKey
          ? { ...item, quantity: Math.min(Number(item.stock) || item.quantity, item.quantity + 1) }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (cartItemKey) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          (item.cartItemKey || item._id) === cartItemKey
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Items
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
