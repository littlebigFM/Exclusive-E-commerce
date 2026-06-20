import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { getDashboardStats } from "../Services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const statCards = stats
    ? [
        {
          id: 1,
          label: "Total Orders",
          value: stats.total_orders,
          icon: ShoppingBag,
          color: "bg-blue-50 text-blue-600",
        },
        {
          id: 2,
          label: "Total Revenue",
          value: `₦${Number(stats.total_revenue).toLocaleString()}`,
          icon: TrendingUp,
          color: "bg-green-50 text-green-600",
        },
        {
          id: 3,
          label: "Pending Orders",
          value: stats.pending_orders,
          icon: Clock,
          color: "bg-orange-50 text-orange-600",
        },
        {
          id: 4,
          label: "Delivered Orders",
          value: stats.delivered_orders,
          icon: Package,
          color: "bg-purple-50 text-purple-600",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#DB4444] text-[16px]">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Title */}
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-black">
          Dashboard
        </h1>
        <p className="text-[13px] text-black/50 mt-[4px]">
          Welcome back! Here's your store overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-[12px] p-[20px] md:p-[24px] flex flex-col gap-[16px] border border-black/5 shadow-sm"
            >
              <div
                className={`w-[44px] h-[44px] rounded-[10px] flex items-center justify-center ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-[22px] md:text-[28px] font-bold text-black leading-none">
                  {stat.value}
                </p>
                <p className="text-[12px] text-black/50 mt-[4px]">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-[12px] p-[20px] md:p-[24px] border border-black/5 shadow-sm">
        <h2 className="text-[16px] font-semibold text-black mb-[16px]">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-[12px]">
          <Link
            to="/admin/products/add"
            className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[13px] font-medium px-[16px] py-[10px] rounded-[8px] transition-colors"
          >
            + Add New Product
          </Link>
          <Link
            to="/admin/products"
            className="border border-black/20 text-black text-[13px] font-medium px-[16px] py-[10px] rounded-[8px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            View All Products
          </Link>
          <Link
            to="/admin/orders"
            className="border border-black/20 text-black text-[13px] font-medium px-[16px] py-[10px] rounded-[8px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-[12px] border border-black/5 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-[20px] md:px-[24px] py-[16px] md:py-[20px] border-b border-black/5">
          <h2 className="text-[16px] font-semibold text-black">
            Recent Orders
          </h2>
          <Link
            to="/admin/orders"
            className="text-[13px] text-[#DB4444] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Order ID
                </th>
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Customer
                </th>
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Total
                </th>
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Payment
                </th>
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Status
                </th>
                <th className="text-left px-[24px] py-[12px] text-[12px] font-semibold text-black/40">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {stats?.recent_orders?.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#F5F5F5]/50 transition-colors"
                >
                  <td className="px-[24px] py-[14px] text-[13px] font-medium text-black">
                    #{order.id}
                  </td>
                  <td className="px-[24px] py-[14px]">
                    <div>
                      <p className="text-[13px] font-medium text-black">
                        {order.first_name} {order.last_name}
                      </p>
                      <p className="text-[11px] text-black/40">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-[24px] py-[14px] text-[13px] text-black">
                    ₦{Number(order.total).toLocaleString()}
                  </td>
                  <td className="px-[24px] py-[14px]">
                    <span
                      className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="px-[24px] py-[14px]">
                    <span
                      className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-[24px] py-[14px] text-[12px] text-black/40">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col divide-y divide-black/5">
          {stats?.recent_orders?.map((order) => (
            <div key={order.id} className="p-[16px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-black">
                  Order #{order.id}
                </span>
                <span
                  className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-[13px] text-black">
                {order.first_name} {order.last_name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#DB4444]">
                  ₦{Number(order.total).toLocaleString()}
                </span>
                <span className="text-[11px] text-black/40">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
