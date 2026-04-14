import React, { useEffect, useState } from "react";
import { Package, TrendingUp, AlertCircle } from "lucide-react";
import { getAllProducts } from "../Services/adminService";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const flashSale = products.filter((p) => p.is_flash).length;

  const stats = [
    {
      id: 1,
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      label: "In Stock",
      value: inStock,
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      id: 3,
      label: "Out of Stock",
      value: outOfStock,
      icon: AlertCircle,
      color: "bg-red-50 text-[#DB4444]",
    },
    {
      id: 4,
      label: "Flash Sale",
      value: flashSale,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="flex flex-col gap-[32px]">
      {/* Page title */}
      <div>
        <h1 className="text-[28px] font-bold text-black">Dashboard</h1>
        <p className="text-[14px] text-black/50 mt-[4px]">
          Welcome back! Here's what's happening in your store.
        </p>
      </div>

      {/* Stats grid */}
      {loading ? (
        <div className="flex items-center justify-center py-[60px]">
          <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-[12px] p-[24px] flex flex-col gap-[16px] border border-black/5 shadow-sm"
              >
                <div
                  className={`w-[48px] h-[48px] rounded-[10px] flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-[28px] font-bold text-black">
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-black/50 mt-[2px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick actions */}
      <div className="bg-white rounded-[12px] p-[24px] border border-black/5 shadow-sm">
        <h2 className="text-[18px] font-semibold text-black mb-[16px]">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-[12px]">
          <Link
            to="/admin/products/add"
            className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/products"
            className="border border-black/20 text-black text-[14px] font-medium px-[20px] py-[10px] rounded-[8px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Recent products table */}
      <div className="bg-white rounded-[12px] border border-black/5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-black/5">
          <h2 className="text-[18px] font-semibold text-black">
            Recent Products
          </h2>
          <Link
            to="/admin/products"
            className="text-[13px] text-[#DB4444] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="text-left px-[24px] py-[12px] text-[13px] font-semibold text-black/50">
                  Product
                </th>
                <th className="text-left px-[24px] py-[12px] text-[13px] font-semibold text-black/50">
                  Price
                </th>
                <th className="text-left px-[24px] py-[12px] text-[13px] font-semibold text-black/50">
                  Stock
                </th>
                <th className="text-left px-[24px] py-[12px] text-[13px] font-semibold text-black/50">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {products.slice(0, 5).map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F5F5F5]/50 transition-colors"
                >
                  <td className="px-[24px] py-[16px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="w-[40px] h-[40px] bg-[#F5F5F5] rounded-[8px] flex items-center justify-center shrink-0">
                        <img
                          src={
                            product.primary_image || "/images/placeholder.png"
                          }
                          alt={product.name}
                          className="w-[32px] h-[32px] object-contain"
                        />
                      </div>
                      <p className="text-[14px] font-medium text-black">
                        {product.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-[24px] py-[16px] text-[14px] text-black">
                    ₦{product.price?.toLocaleString()}
                  </td>
                  <td className="px-[24px] py-[16px] text-[14px] text-black">
                    {product.stock}
                  </td>
                  <td className="px-[24px] py-[16px]">
                    <span
                      className={`text-[12px] font-semibold px-[10px] py-[4px] rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-[#DB4444]"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
