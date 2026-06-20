import React, { useEffect, useState } from "react";
import { getAdminOrders } from "../../Services/adminService";

const statusColors = {
  pending: "bg-orange-100 text-orange-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-[#DB4444]",
};

const paymentColors = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-orange-100 text-orange-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAdminOrders(page, 10);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [page]);

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Header */}
      <div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-black">
          Orders
        </h1>
        <p className="text-[13px] text-black/50 mt-[2px]">
          Manage all customer orders
        </p>
      </div>

      {/* Table */}
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
                      Order ID
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Customer
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Total
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Items
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Payment
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Status
                    </th>
                    <th className="text-left px-[20px] py-[12px] text-[12px] font-semibold text-black/40">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-[#F5F5F5]/50 transition-colors"
                    >
                      <td className="px-[20px] py-[14px] text-[13px] font-medium text-black">
                        #{order.id}
                      </td>
                      <td className="px-[20px] py-[14px]">
                        <div>
                          <p className="text-[13px] font-medium text-black">
                            {order.first_name} {order.last_name}
                          </p>
                          <p className="text-[11px] text-black/40">
                            {order.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-[20px] py-[14px] text-[13px] text-black">
                        ₦{Number(order.total).toLocaleString()}
                      </td>
                      <td className="px-[20px] py-[14px] text-[13px] text-black">
                        {order.item_count}
                      </td>
                      <td className="px-[20px] py-[14px]">
                        <span
                          className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${paymentColors[order.payment_status] || "bg-[#F5F5F5] text-black/40"}`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-[20px] py-[14px]">
                        <span
                          className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${statusColors[order.status] || "bg-[#F5F5F5] text-black/40"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-[20px] py-[14px] text-[12px] text-black/40">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col divide-y divide-black/5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-[16px] flex flex-col gap-[10px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-black">
                      Order #{order.id}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${statusColors[order.status] || "bg-[#F5F5F5] text-black/40"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-black">
                      {order.first_name} {order.last_name}
                    </p>
                    <span
                      className={`text-[11px] font-semibold px-[8px] py-[3px] rounded-full ${paymentColors[order.payment_status] || "bg-[#F5F5F5] text-black/40"}`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
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
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-[8px]">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-[16px] py-[8px] border border-black/20 rounded-[8px] text-[13px] text-black hover:border-[#DB4444] hover:text-[#DB4444] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-[13px] text-black/50 px-[8px]">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={orders.length < 10}
          className="px-[16px] py-[8px] border border-black/20 rounded-[8px] text-[13px] text-black hover:border-[#DB4444] hover:text-[#DB4444] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
