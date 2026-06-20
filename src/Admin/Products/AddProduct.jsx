import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, ImagePlus } from "lucide-react";
import { createProduct } from "../../Services/adminService";

const initialState = {
  name: "",
  description: "",
  short_description: "",
  price: "",
  compare_price: "",
  cost_price: "",
  stock: "",
  category_id: "",
  is_flash: false,
  is_active: "active",
};

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPG, PNG, WEBP)");
      return;
    }

    // Validate file size — max 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB");
      return;
    }

    setImageFile(file);
    setError("");

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Build FormData — required for file upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("short_description", formData.short_description);
      data.append("price", Number(formData.price));
      data.append("compare_price", Number(formData.compare_price));
      data.append("cost_price", Number(formData.cost_price));
      data.append("stock", Number(formData.stock));
      data.append("category_id", Number(formData.category_id));
      data.append("is_flash", formData.is_flash ? 1 : 0);
      data.append("is_active", formData.is_active);

      // Only append image if one was selected
      if (imageFile) {
        data.append("image", imageFile);
      }

      await createProduct(data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to create product:", err);
      setError(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#F5F5F5] rounded-[8px] px-[14px] py-[11px] text-[14px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all";
  const labelClass = "text-[12px] font-medium text-black/50 mb-[6px] block";

  return (
    <div className="flex flex-col gap-[20px] max-w-[860px]">
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-black">
          Add Product
        </h1>
        <p className="text-[13px] text-black/50 mt-[4px]">
          Fill in the details to add a new product
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-[#DB4444] text-[13px] px-[14px] py-[11px] rounded-[8px]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        {/* Image Upload */}
        <div className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[20px] md:p-[24px]">
          <h2 className="text-[15px] font-semibold text-black mb-[16px]">
            Product Image
          </h2>

          {imagePreview ? (
            // Preview
            <div className="relative w-full max-w-[240px]">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-[200px] object-contain bg-[#F5F5F5] rounded-[8px]"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-[8px] right-[8px] w-[28px] h-[28px] bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 hover:text-[#DB4444] transition-colors"
              >
                <X size={14} />
              </button>
              <p className="text-[11px] text-black/40 mt-[8px] truncate">
                {imageFile?.name}
              </p>
            </div>
          ) : (
            // Upload area
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-black/10 rounded-[8px] p-[32px] flex flex-col items-center gap-[12px] cursor-pointer hover:border-[#DB4444] hover:bg-[#F5F5F5] transition-colors"
            >
              <div className="w-[48px] h-[48px] bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <ImagePlus size={22} className="text-black/30" />
              </div>
              <div className="text-center">
                <p className="text-[14px] font-medium text-black">
                  Click to upload image
                </p>
                <p className="text-[12px] text-black/40 mt-[4px]">
                  JPG, PNG, WEBP — max 2MB
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[20px] md:p-[24px] flex flex-col gap-[16px]">
          <h2 className="text-[15px] font-semibold text-black">
            Basic Information
          </h2>

          <div>
            <label className={labelClass}>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. iPhone 15 Pro"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Full product description..."
              required
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Short Description</label>
            <input
              type="text"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Brief one-line description"
              className={inputClass}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[20px] md:p-[24px] flex flex-col gap-[16px]">
          <h2 className="text-[15px] font-semibold text-black">
            Pricing & Stock
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[14px]">
            <div>
              <label className={labelClass}>Price (₦) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Compare Price (₦)</label>
              <input
                type="number"
                name="compare_price"
                value={formData.compare_price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Cost Price (₦)</label>
              <input
                type="number"
                name="cost_price"
                value={formData.cost_price}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
            <div>
              <label className={labelClass}>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                required
                min="0"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category ID *</label>
              <input
                type="number"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                placeholder="e.g. 1"
                required
                min="1"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[20px] md:p-[24px] flex flex-col gap-[16px]">
          <h2 className="text-[15px] font-semibold text-black">Settings</h2>

          <div className="flex flex-wrap gap-[24px]">
            {/* Flash Sale toggle */}
            <label className="flex items-center gap-[10px] cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="is_flash"
                  checked={formData.is_flash}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-[42px] h-[22px] rounded-full transition-colors ${
                    formData.is_flash ? "bg-[#DB4444]" : "bg-black/20"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${
                      formData.is_flash
                        ? "translate-x-[22px]"
                        : "translate-x-[2px]"
                    }`}
                  />
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-black">Flash Sale</p>
                <p className="text-[11px] text-black/40">
                  Show in flash sales section
                </p>
              </div>
            </label>

            {/* Active toggle */}
            <label className="flex items-center gap-[10px] cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.is_active === "active"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked ? "active" : "inactive",
                    }))
                  }
                  className="sr-only"
                />
                <div
                  className={`w-[42px] h-[22px] rounded-full transition-colors ${
                    formData.is_active === "active"
                      ? "bg-green-500"
                      : "bg-black/20"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full shadow transition-transform ${
                      formData.is_active === "active"
                        ? "translate-x-[22px]"
                        : "translate-x-[2px]"
                    }`}
                  />
                </div>
              </div>
              <div>
                <p className="text-[13px] font-medium text-black">Active</p>
                <p className="text-[11px] text-black/40">
                  Show product in store
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[12px]">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[14px] font-medium px-[28px] py-[12px] rounded-[8px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border border-black/20 text-black text-[14px] font-medium px-[28px] py-[12px] rounded-[8px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
