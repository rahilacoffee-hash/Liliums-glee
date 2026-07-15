import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  Package,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

function ProductTable() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [status, setStatus] = useState("All");

  const [page, setPage] = useState(1);

  const limit = 10;

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All",
    "Wall Treatments",
    "Wallpapers",
    "Curtains",
    "Lighting",
    "Accessories",
    "Furniture",
    "Decor",
  ];

  const statuses = [
    "All",
    "Active",
    "Draft",
    "Archived",
  ];

  // =============================
  // Fetch Products
  // =============================

  async function fetchProducts() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get("/products");

      setProducts(data.data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // =============================
  // Filter Products
  // =============================

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    if (status !== "All") {
      filtered = filtered.filter(
        (item) => item.status === status
      );
    }

    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [products, search, category, status]);

  // =============================
  // Pagination
  // =============================

  const totalPages = Math.ceil(
    filteredProducts.length / limit
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  useEffect(() => {
    setPage(1);
  }, [search, category, status]);

  // =============================
  // Delete Product
  // =============================

  function handleDelete(product) {
    setSelectedProduct(product);
    setDeleteModal(true);
  }

  async function confirmDelete() {
    if (!selectedProduct) return;

    try {
      await axiosInstance.delete(
        `/products/${selectedProduct._id}`
      );

      toast.success("Product deleted");

      fetchProducts();

      setDeleteModal(false);

      setSelectedProduct(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete product."
      );
    }
  }return (
  <div className="space-y-6">

    {/* Header */}

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Products
        </h1>

        <p className="mt-1 text-gray-500">
          Manage all products in your store.
        </p>
      </div>

      <Link
        to="/admin/products/add"
        className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-900"
      >
        <Plus size={18} />
        Add Product
      </Link>

    </div>

    {/* Filters */}

    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-black"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

    </div>

    {/* Table */}

    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      {loading ? (

        <div className="flex h-80 items-center justify-center">

          <Loader2
            size={36}
            className="animate-spin"
          />

        </div>

      ) : currentProducts.length === 0 ? (

        <div className="flex h-80 flex-col items-center justify-center">

          <Package
            size={50}
            className="text-gray-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Products Found
          </h3>

          <p className="mt-2 text-gray-500">
            Add your first product.
          </p>

        </div>

      ) : (

        <>
          {/* Desktop */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left">

                  <th className="px-6 py-4">
                    Product
                  </th>

                  <th className="px-6 py-4">
                    Category
                  </th>

                  <th className="px-6 py-4">
                    Price
                  </th>

                  <th className="px-6 py-4">
                    Stock
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Featured
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t"
                  >

                    {/* Product */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            product.images?.[0]?.url ||
                            product.images?.[0] ||
                            product.image
                          }
                          alt={product.name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="font-semibold">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {product.badge || "-"}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">
                      {product.category}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      ₦{Number(product.price).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      {product.stock}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      {product.isFeatured ? (
                        <Star
                          className="fill-yellow-400 text-yellow-400"
                          size={18}
                        />
                      ) : (
                        "-"
                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-2">

                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(product)
                          }
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>          {/* Mobile Cards */}

          <div className="space-y-4 p-4 lg:hidden">

            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <img
                    src={
                      product.images?.[0]?.url ||
                      product.images?.[0] ||
                      product.image
                    }
                    alt={product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>

                    <p className="mt-2 font-semibold">
                      ₦{Number(product.price).toLocaleString()}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Draft"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.status}
                      </span>

                      {product.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                          Featured
                        </span>
                      )}

                    </div>

                    <p className="mt-3 text-sm">
                      Stock:
                      <span className="ml-2 font-semibold">
                        {product.stock}
                      </span>
                    </p>

                    <div className="mt-4 flex gap-3">

                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="rounded-lg bg-blue-50 p-3 text-blue-600"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product)}
                        className="rounded-lg bg-red-50 p-3 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </>
      )}

    </div>

    {/* Pagination */}

    {totalPages > 1 && (
      <div className="flex items-center justify-center gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`h-10 w-10 rounded-lg ${
              page === index + 1
                ? "bg-black text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>

      </div>
    )}

    {/* Delete Modal */}

    {deleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

        <div className="w-full max-w-md rounded-2xl bg-white p-6">

          <h2 className="text-2xl font-bold">
            Delete Product
          </h2>

          <p className="mt-3 text-gray-600">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {selectedProduct?.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-500">
            This action cannot be undone.
          </p>

          <div className="mt-8 flex justify-end gap-3">

            <button
              onClick={() => setDeleteModal(false)}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700"
            >
              Delete Product
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
);
}

export default ProductTable;