import { useEffect, useState } from "react";
import { AlertTriangle, Package } from "lucide-react";
import { Link } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

function LowStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  async function fetchLowStockProducts() {
    try {
      const { data } = await axiosInstance.get("/admin/low-stock");

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getStockColor(stock) {
    if (stock === 0) {
      return "bg-red-100 text-red-700";
    }

    if (stock <= 5) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <AlertTriangle className="text-orange-500" size={22} />
            Low Stock Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products that need inventory replenishment
          </p>
        </div>

        <Link
          to="/admin/products"
          className="font-medium text-[#C8A96A] hover:underline"
        >
          Manage Products
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Product
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Price
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                Stock
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                          <Package size={24} className="text-gray-400" />
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {product.sku || "No SKU"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ₦{Number(product.price).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 font-bold">
                    {product.stock}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStockColor(
                        product.stock
                      )}`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock <= 5
                        ? "Low Stock"
                        : "In Stock"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No low-stock products 🎉
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LowStock;