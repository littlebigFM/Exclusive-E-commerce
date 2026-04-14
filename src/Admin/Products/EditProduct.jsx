import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../Services/adminService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProduct(id);
        const p = res.data;
        setFormData({
          name: p.name || "",
          description: p.description || "",
          short_description: p.short_description || "",
          price: p.price || "",
          compare_price: p.compare_price || "",
          cost_price: p.cost_price || "",
          stock: p.stock || "",
          is_flash: p.is_flash || false,
          is_active: p.is_active || "active",
          category_id: p.category_id || "",
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
        compare_price: Number(formData.compare_price),
        cost_price: Number(formData.cost_price),
        stock: Number(formData.stock),
        category_id: Number(formData.category_id),
      });
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to update product:", err);
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-[#F5F5F5] rounded-[8px] px-[16px] py-[12px] text-[14px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all";
  const labelClass = "text-[13px] font-medium text-black/60 mb-[6px] block";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="text-center py-[80px]">
        <p className="text-[18px] text-black/50">Product not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px] max-w-[800px]">
      <div>
        <h1 className="text-[28px] font-bold text-black">Edit Product</h1>
        <p className="text-[14px] text-black/50 mt-[4px]">
          Update the product details below
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-[#DB4444] text-[14px] px-[16px] py-[12px] rounded-[8px]">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[32px] flex flex-col gap-[24px]"
      >
        <div>
          <label className={labelClass}>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
          <div>
            <label className={labelClass}>Price (₦) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
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
              min="0"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
          <div>
            <label className={labelClass}>Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
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
              required
              min="1"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-[24px]">
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
                className={`w-[44px] h-[24px] rounded-full transition-colors ${formData.is_flash ? "bg-[#DB4444]" : "bg-black/20"}`}
              >
                <div
                  className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full shadow transition-transform ${formData.is_flash ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                />
              </div>
            </div>
            <span className="text-[14px] font-medium text-black">
              Flash Sale
            </span>
          </label>

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
                className={`w-[44px] h-[24px] rounded-full transition-colors ${formData.is_active === "active" ? "bg-green-500" : "bg-black/20"}`}
              >
                <div
                  className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full shadow transition-transform ${formData.is_active === "active" ? "translate-x-[22px]" : "translate-x-[2px]"}`}
                />
              </div>
            </div>
            <span className="text-[14px] font-medium text-black">Active</span>
          </label>
        </div>

        <div className="flex items-center gap-[12px] pt-[8px] border-t border-black/5">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[14px] font-medium px-[32px] py-[12px] rounded-[8px] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border border-black/20 text-black text-[14px] font-medium px-[32px] py-[12px] rounded-[8px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
