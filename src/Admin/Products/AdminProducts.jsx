import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { getAllProducts, deleteProduct } from "../../Services/adminService";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-[12px]">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-black">
            Products
          </h1>
          <p className="text-[13px] text-black/50 mt-[2px]">
            {products.length} total products
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-[6px] bg-[#DB4444] hover:bg-[#E07575] text-white text-[13px] font-medium px-[16px] py-[10px] rounded-[8px] transition-colors"
        >
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-[10px] bg-white border border-black/10 rounded-[8px] px-[14px] h-[42px] max-w-[360px]">
        <Search size={15} className="text-black/30 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-black/30"
        />
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-[12px] border border-black/5 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-[60px]">
            <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F5F5] border-b border-black/5">
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Product
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Price
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Stock
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Flash
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Status
                    </th>
                    <th className="text-right px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-[#F5F5F5]/50 transition-colors"
                      >
                        <td className="px-[20px] py-[14px]">
                          <div className="flex items-center gap-[12px]">
                            <div className="w-[42px] h-[42px] bg-[#F5F5F5] rounded-[8px] flex items-center justify-center shrink-0">
                              <img
                                src={
                                  product.primary_image ||
                                  "/images/placeholder.png"
                                }
                                alt={product.name}
                                className="w-[34px] h-[34px] object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-[13px] font-medium text-black">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-black/30">
                                {product.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-[20px] py-[14px] text-[13px] text-black">
                          ₦{product.price?.toLocaleString()}
                        </td>
                        <td className="px-[20px] py-[14px] text-[13px] text-black">
                          {product.stock}
                        </td>
                        <td className="px-[20px] py-[14px]">
                          <span
                            className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${
                              product.is_flash
                                ? "bg-orange-100 text-orange-700"
                                : "bg-[#F5F5F5] text-black/30"
                            }`}
                          >
                            {product.is_flash ? "Flash" : "Regular"}
                          </span>
                        </td>
                        <td className="px-[20px] py-[14px]">
                          <span
                            className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${
                              product.is_active === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-[#DB4444]"
                            }`}
                          >
                            {product.is_active}
                          </span>
                        </td>
                        <td className="px-[20px] py-[14px]">
                          <div className="flex items-center justify-end gap-[8px]">
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <Pencil size={14} />
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              disabled={deletingId === product.id}
                              className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] bg-red-50 text-[#DB4444] hover:bg-red-100 transition-colors disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-[20px] py-[60px] text-center text-[13px] text-black/30"
                      >
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col divide-y divide-black/5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-[16px] flex items-center gap-[12px]"
                  >
                    <div className="w-[48px] h-[48px] bg-[#F5F5F5] rounded-[8px] flex items-center justify-center shrink-0">
                      <img
                        src={product.primary_image || "/images/placeholder.png"}
                        alt={product.name}
                        className="w-[38px] h-[38px] object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-black truncate">
                        {product.name}
                      </p>
                      <p className="text-[12px] text-[#DB4444] mt-[2px]">
                        ₦{product.price?.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-[6px] mt-[4px]">
                        <span
                          className={`text-[10px] font-semibold px-[6px] py-[2px] rounded-full ${
                            product.is_active === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-[#DB4444]"
                          }`}
                        >
                          {product.is_active}
                        </span>
                        {product.is_flash && (
                          <span className="text-[10px] font-semibold px-[6px] py-[2px] rounded-full bg-orange-100 text-orange-700">
                            Flash
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] bg-blue-50 text-blue-600"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] bg-red-50 text-[#DB4444] disabled:opacity-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-[60px] text-center text-[13px] text-black/30">
                  No products found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
