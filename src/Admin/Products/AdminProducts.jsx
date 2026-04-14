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
      // Remove from local state immediately
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-[16px]">
        <div>
          <h1 className="text-[28px] font-bold text-black">Products</h1>
          <p className="text-[14px] text-black/50 mt-[4px]">
            {products.length} total products
          </p>
        </div>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-[8px] bg-[#DB4444] hover:bg-[#E07575] text-white text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center gap-[12px] bg-white border border-black/10 rounded-[8px] px-[16px] h-[44px] max-w-[400px]">
        <Search size={16} className="text-black/30 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-black/30"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] border border-black/5 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-[60px]">
            <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5] border-b border-black/5">
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Product
                  </th>
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Price
                  </th>
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Compare Price
                  </th>
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Stock
                  </th>
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Flash Sale
                  </th>
                  <th className="text-left px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
                    Status
                  </th>
                  <th className="text-right px-[24px] py-[14px] text-[13px] font-semibold text-black/50">
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
                      {/* Product */}
                      <td className="px-[24px] py-[16px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[44px] h-[44px] bg-[#F5F5F5] rounded-[8px] flex items-center justify-center shrink-0">
                            <img
                              src={
                                product.primary_image ||
                                "/images/placeholder.png"
                              }
                              alt={product.name}
                              className="w-[36px] h-[36px] object-contain"
                            />
                          </div>
                          <div>
                            <p className="text-[14px] font-medium text-black">
                              {product.name}
                            </p>
                            <p className="text-[12px] text-black/40">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-[24px] py-[16px] text-[14px] text-black">
                        ₦{product.price?.toLocaleString()}
                      </td>

                      {/* Compare Price */}
                      <td className="px-[24px] py-[16px] text-[14px] text-black/50 line-through">
                        ₦{product.compare_price?.toLocaleString()}
                      </td>

                      {/* Stock */}
                      <td className="px-[24px] py-[16px] text-[14px] text-black">
                        {product.stock}
                      </td>

                      {/* Flash Sale */}
                      <td className="px-[24px] py-[16px]">
                        <span
                          className={`text-[12px] font-semibold px-[10px] py-[4px] rounded-full ${
                            product.is_flash
                              ? "bg-orange-100 text-orange-700"
                              : "bg-[#F5F5F5] text-black/40"
                          }`}
                        >
                          {product.is_flash ? "Flash" : "Regular"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-[24px] py-[16px]">
                        <span
                          className={`text-[12px] font-semibold px-[10px] py-[4px] rounded-full ${
                            product.is_active === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-[#DB4444]"
                          }`}
                        >
                          {product.is_active === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-[24px] py-[16px]">
                        <div className="flex items-center justify-end gap-[8px]">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="w-[34px] h-[34px] flex items-center justify-center rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="w-[34px] h-[34px] flex items-center justify-center rounded-[8px] bg-red-50 text-[#DB4444] hover:bg-red-100 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-[24px] py-[60px] text-center text-[14px] text-black/40"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
