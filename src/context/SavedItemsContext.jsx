import { createContext, useContext, useEffect, useState } from "react";

const SavedItemsContext = createContext(null);

function readSavedItems(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function toggleItem(items, item) {
  const exists = items.some((savedItem) => savedItem._id === item._id);
  return exists ? items.filter((savedItem) => savedItem._id !== item._id) : [...items, item];
}

export function SavedItemsProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => readSavedItems("wishlist"));
  const [savedDesigns, setSavedDesigns] = useState(() => readSavedItems("saved-designs"));

  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("saved-designs", JSON.stringify(savedDesigns)), [savedDesigns]);

  const toggleWishlist = (product) => setWishlist((items) => toggleItem(items, product));
  const toggleSavedDesign = (project) => setSavedDesigns((items) => toggleItem(items, project));

  return (
    <SavedItemsContext.Provider value={{ wishlist, savedDesigns, toggleWishlist, toggleSavedDesign }}>
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) throw new Error("useSavedItems must be used within SavedItemsProvider");
  return context;
}
