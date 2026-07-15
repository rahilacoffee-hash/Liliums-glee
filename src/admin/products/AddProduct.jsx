import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  ImagePlus,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "../../api/axiosInstance";

function AddProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

  // ===============================
  // Handle Inputs
  // ===============================

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ===============================
  // Handle Images
  // ===============================

  function handleImages(e) {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [...prev, ...previews]);
  }

  // ===============================
  // Remove Image
  // ===============================

  function removeImage(index) {
    const updatedImages = [...images];
    const updatedPreview = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreview.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreview);
  }

  // ===============================
  // Validation
  // ===============================

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

    if (images.length === 0) {
      toast.error("Upload at least one image");
      return false;
    }

    return true;
  }

  // ===============================
  // Submit
  // ===============================

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("description", formData.description);
      payload.append("price", formData.price);
      payload.append("comparePrice", formData.comparePrice);
      payload.append("sku", formData.sku);
      payload.append("badge", formData.badge);
      payload.append("stock", formData.stock);
      payload.append("status", formData.status);
      payload.append("isFeatured", formData.isFeatured);

      images.forEach((image) => {
        payload.append("images", image);
      });

      const { data } = await axiosInstance.post(
        "/products",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create product."
      );
    } finally {
      setLoading(false);
    }
  }  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Product
          </h1>

          <p className="mt-2 text-gray-500">
            Create a new product for your store.
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

              {/* Product Name */}

              <div>
                <label className="mb-2 block font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Luxury Wallpaper"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Category */}

              <div>
                <label className="mb-2 block font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                >
                  <option value="">
                    Select Category
                  </option>

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

              {/* Description */}

              <div>
                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write product description..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

            </div>

          </div>

          {/* Pricing */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Pricing
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="45000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                  placeholder="55000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          {/* Inventory */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Inventory
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block font-medium">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="SKU-001"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                  placeholder="25"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

            </div>

          </div>

          {/* Product Settings */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Settings
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block font-medium">
                  Badge
                </label>

                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  placeholder="Best Seller"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
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

              <label className="flex cursor-pointer items-center justify-between rounded-xl border p-4">

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

          </div>          {/* Product Images */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Product Images
            </h2>

            <label
              htmlFor="images"
              className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition hover:border-black hover:bg-gray-50"
            >
              <ImagePlus
                size={48}
                className="mb-4 text-gray-400"
              />

              <p className="text-lg font-semibold text-gray-700">
                Upload Product Images
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Drag & drop or click to browse
              </p>

              <p className="mt-1 text-xs text-gray-400">
                JPG, PNG, WEBP • Max 10 Images
              </p>

              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="hidden"
              />
            </label>

            {/* Preview */}

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
                      className="h-36 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="
                        absolute
                        right-2
                        top-2
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        text-white
                        opacity-0
                        transition
                        group-hover:opacity-100
                      "
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </form>

      {/* Footer Buttons */}

      <div className="mt-10 flex justify-end gap-4">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-black
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-gray-900
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Uploading...
            </>
          ) : (
            <>
              <Upload size={20} />

              Create Product
            </>
          )}
        </button>

      </div>

    </div>
  );
}

export default AddProduct;