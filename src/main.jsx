import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { SavedItemsProvider } from "./context/SavedItemsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <CartProvider>
        <SavedItemsProvider>
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
        </SavedItemsProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
