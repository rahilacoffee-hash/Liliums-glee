import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#111111",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}
      />
      <App />
    </CartProvider>
  </StrictMode>
);