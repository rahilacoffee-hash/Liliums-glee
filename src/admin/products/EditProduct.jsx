import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Existing Cloudinary images
  const [existingImages, setExistingImages] = useState([]);

  // Newly selected images
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    comparePrice: "",
    sku: "",
    badge: "",
    stock: "",
    status: "Active",
    isFeatured: false,
  });

  const categories = [
    "Wall Treatments",
    "Wallpapers",
    "Curtains",
    "Lighting",
    "Accessories",
    "Furniture",
    "Decor",
  ];

  // ====================================
  // Fetch Product
  // ====================================

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(`/products/${id}`);

      const product = data.data;

      setFormData({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        comparePrice: product.comparePrice || "",
        sku: product.sku || "",
        badge: product.badge || "",
        stock: product.stock || "",
        status: product.status || "Active",
        isFeatured: product.isFeatured || false,
      });

      setExistingImages(product.images || []);
    } catch (error) {
      toast.error("Unable to load product.");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  }

  // ====================================
  // Handle Inputs
  // ====================================

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // ====================================
  // Upload New Images
  // ====================================

  function handleImages(e) {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [
      ...prev,
      ...previews,
    ]);
  }

  // ====================================
  // Remove New Image
  // ====================================

  function removeNewImage(index) {
    const updatedImages = [...images];
    const updatedPreview = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreview.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreview);
  }

  // ====================================
  // Remove Existing Image
  // ====================================

  function removeExistingImage(index) {
    const updated = [...existingImages];

    updated.splice(index, 1);

    setExistingImages(updated);
  }

  // ====================================
  // Validation
  // ====================================

  function validateForm() {
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }

    if (!formData.category) {
      toast.error("Select a category");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (!formData.price) {
      toast.error("Enter product price");
      return false;
    }

    if (
      existingImages.length === 0 &&
      images.length === 0
    ) {
      toast.error(
        "Please upload at least one product image."
      );
      return false;
    }

    return true;
  }

  // ====================================
  // Submit Update
  // ====================================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      images.forEach((image) => {
        payload.append("images", image);
      });

      payload.append(
        "existingImages",
        JSON.stringify(existingImages)
      );

      const { data } = await axiosInstance.put(
        `/products/${id}`,
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  }  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Product
          </h1>

          <p className="mt-2 text-gray-500">
            Update your product information.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 transition hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* Product Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Product Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Existing Images */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Existing Images
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {existingImages.length > 0 ? (
                existingImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={image.url || image}
                      alt=""
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExistingImage(index)
                      }
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No images found.
                </p>
              )}
            </div>
          </div>

          {/* Upload New Images */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Upload New Images
            </h2>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="block w-full rounded-xl border border-dashed border-gray-300 p-5"
            />

            {previewImages.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                {previewImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={image}
                      alt=""
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(index)
                      }
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Pricing & Inventory
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Compare Price
                </label>

                <input
                  type="number"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Badge
                </label>

                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                >
                  <option value="Active">
                    Active
                  </option>
                  <option value="Draft">
                    Draft
                  </option>
                  <option value="Archived">
                    Archived
                  </option>
                </select>
              </div>

              <label className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <h3 className="font-semibold">
                    Featured Product
                  </h3>

                  <p className="text-sm text-gray-500">
                    Display on homepage
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Updating Product...
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;