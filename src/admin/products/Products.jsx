import { useEffect, useState } from "react";
import {
  Package,
  Star,
  Archive,
  Boxes,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";
import ProductTable from "./ProductTable";

function Products() {
  const [loading, setLoading] = useState(true);

  const [refreshKey, setRefreshKey] = useState(0);

  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    activeProducts: 0,
    archivedProducts: 0,
    lowStockProducts: 0,
  });

  // ======================================
  // Fetch Dashboard Statistics
  // ======================================

  async function fetchStatistics() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/products");

      const products = data.data.products || [];

      setStats({
        totalProducts: products.length,

        featuredProducts: products.filter(
          (item) => item.isFeatured
        ).length,

        activeProducts: products.filter(
          (item) => item.status === "Active"
        ).length,

        archivedProducts: products.filter(
          (item) => item.status === "Archived"
        ).length,

        lowStockProducts: products.filter(
          (item) => item.stock <= 5
        ).length,
      });
    } catch (error) {
      toast.error("Failed to load product statistics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatistics();
  }, [refreshKey]);

  function refreshPage() {
    setRefreshKey((prev) => prev + 1);
  }

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Featured",
      value: stats.featuredProducts,
      icon: Star,
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Active",
      value: stats.activeProducts,
      icon: Boxes,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Archived",
      value: stats.archivedProducts,
      icon: Archive,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your products, inventory and featured collections.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={refreshPage}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 transition hover:bg-gray-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <Link
            to="/admin/products/add"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-900"
          >
            <Plus size={18} />
            Add Product
          </Link>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {loading ? "--" : card.value}
                  </h2>

                </div>

                <div
                  className={`rounded-2xl p-4 ${card.bg}`}
                >
                  <Icon
                    className={card.iconColor}
                    size={28}
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>      {/* Low Stock Warning */}

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-orange-700">
              Low Stock Products
            </h2>

            <p className="mt-2 text-gray-600">
              Products with less than or equal to 5 items remaining.
            </p>

          </div>

          <div className="rounded-2xl bg-orange-100 p-4">

            <Package
              size={30}
              className="text-orange-600"
            />

          </div>

        </div>

        <div className="mt-6">

          <span className="text-5xl font-bold text-orange-700">
            {loading ? "--" : stats.lowStockProducts}
          </span>

        </div>

      </div>

      {/* Product Table */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Product Inventory
            </h2>

            <p className="mt-1 text-gray-500">
              View, edit and manage all products.
            </p>

          </div>

          <button
            onClick={refreshPage}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 transition hover:bg-gray-100"
          >
            <RefreshCw size={18} />
            Reload Products
          </button>

        </div>

        <ProductTable key={refreshKey} />

      </div>

      {/* Footer */}

      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-center md:flex-row md:text-left">

        <div>

          <h3 className="text-lg font-semibold">
            Inventory Overview
          </h3>

          <p className="mt-1 text-gray-500">
            Total Products:
            <span className="ml-2 font-semibold text-black">
              {stats.totalProducts}
            </span>

            <span className="mx-3">•</span>

            Active:
            <span className="ml-2 font-semibold text-green-600">
              {stats.activeProducts}
            </span>

            <span className="mx-3">•</span>

            Featured:
            <span className="ml-2 font-semibold text-yellow-600">
              {stats.featuredProducts}
            </span>

          </p>

        </div>

        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
        >
          <Plus size={18} />
          Add New Product
        </Link>

      </div>

    </div>
  );
}

export default Products;