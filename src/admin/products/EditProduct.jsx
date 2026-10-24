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
  const [sizesText, setSizesText] = useState("");
  const [colors, setColors] = useState([]);

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
    isPreorder: false,
    preorderDescription: "",
    preorderDeliveryDays: "15",
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

      let product;

      try {
        // Use the dedicated admin endpoint when it is available.
        const { data } = await axiosInstance.get(`/products/id/${id}`);
        product = data.data;
      } catch {
        // This keeps editing functional if an older deployment does not yet
        // expose the admin lookup route, or browser auth cookies are blocked.
        const { data } = await axiosInstance.get("/products", {
          params: { limit: 1000 },
        });
        product = data.data?.products?.find((item) => item._id === id);
      }

      if (!product) {
        throw new Error("Product not found");
      }

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
        isPreorder: product.isPreorder || false,
        preorderDescription: product.preorderDescription || "",
        preorderDeliveryDays: product.preorderDeliveryDays || "15",
      });

      setExistingImages(product.images || []);
      setSizesText((product.sizes || []).join(", "));
      setColors((product.colors || []).map((color) => ({ ...color, file: null })));
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load product.");
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
  function updateColor(index, field, value) { setColors((prev) => prev.map((color, i) => i === index ? { ...color, [field]: value } : color)); }
  function selectColorImage(index, file) { if (file) setColors((prev) => prev.map((color, i) => i === index ? { ...color, file, image: null } : color)); }

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

    if (formData.isPreorder && !formData.preorderDescription.trim()) {
      toast.error("Add a preorder description");
      return false;
    }

    if (existingImages.length === 0 && images.length === 0) {
      toast.error(
        "Please upload at least one product image."
      );
      return false;
    }

    if (colors.some((color) => !color.name.trim())) {
      toast.error("Every colour needs a name");
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
      payload.append("sizes", JSON.stringify(sizesText.split(",").map((size) => size.trim()).filter(Boolean)));
      let uploadIndex = 0;
      payload.append("colors", JSON.stringify(colors.map((color) => ({ name: color.name, hex: color.hex, image: color.file ? null : color.image, uploadIndex: color.file ? uploadIndex++ : undefined }))));
      colors.forEach((color) => { if (color.file) payload.append("colorImages", color.file); });

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

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Sizes &amp; Colours</h2><p className="mb-5 text-sm text-gray-500">A colour image is optional and appears only on the details page when selected.</p>
            <label className="mb-5 block"><span className="mb-2 block font-medium">Sizes (comma separated)</span><input value={sizesText} onChange={(e) => setSizesText(e.target.value)} className="w-full rounded-xl border px-4 py-3" /></label>
            <div className="space-y-3">{colors.map((color, index) => <div key={color._id || index} className="grid gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_100px_1fr_auto]"><input value={color.name} onChange={(e) => updateColor(index, "name", e.target.value)} placeholder="Colour name" className="rounded-lg border px-3 py-2" /><input type="color" value={color.hex || "#C8A96A"} onChange={(e) => updateColor(index, "hex", e.target.value)} className="h-10 w-full rounded-lg border" /><label className="cursor-pointer rounded-lg border border-dashed px-3 py-2 text-sm">Upload optional image<input type="file" accept="image/*" className="hidden" onChange={(e) => selectColorImage(index, e.target.files?.[0])} /></label><button type="button" onClick={() => setColors((prev) => prev.filter((_, i) => i !== index))} className="text-sm text-red-600">Remove</button></div>)}</div>
            <button type="button" onClick={() => setColors((prev) => [...prev, { name: "", hex: "#C8A96A", image: null, file: null }])} className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium">+ Add colour</button>
          </div>

          {/* Existing Images */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Product gallery
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
              Add product or in-use images
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

              <label className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <h3 className="font-semibold">Available for preorder</h3>
                  <p className="text-sm text-gray-500">Shows a Pre-order badge and allows purchase before stock arrives.</p>
                </div>
                <input type="checkbox" name="isPreorder" checked={formData.isPreorder} onChange={handleChange} className="h-5 w-5" />
              </label>

              {formData.isPreorder && (
                <div className="space-y-5 rounded-xl border border-[#C8A96A]/40 bg-[#FDF9F1] p-4">
                  <div>
                    <label className="mb-2 block font-medium">Preorder description</label>
                    <textarea rows={3} name="preorderDescription" value={formData.preorderDescription} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium">Delivery time (working days)</label>
                    <input type="number" min="1" name="preorderDeliveryDays" value={formData.preorderDeliveryDays} onChange={handleChange} className="w-full rounded-xl border border-gray-300 px-4 py-3" />
                  </div>
                </div>
              )}
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
