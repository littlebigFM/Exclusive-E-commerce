import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "../Context/AdminContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, path: "/admin/orders" },
];

const AdminLayout = ({ children }) => {
  const { admin, logoutAdmin } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const isActive = (path) =>
    path === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* ── Mobile backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-white
          border-r border-black/10 z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="h-[70px] flex items-center justify-between px-[24px] border-b border-black/10 shrink-0">
          <Link to="/" className="font-bold text-[20px] text-black">
            Exclusive
            <span className="text-[#DB4444] ml-[6px] text-[11px] font-semibold bg-[#DB4444]/10 px-[8px] py-[2px] rounded-full">
              Admin
            </span>
          </Link>
          <button
            className="lg:hidden p-[4px] text-black/50 hover:text-black"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-[12px] py-[24px] flex flex-col gap-[4px] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center justify-between px-[16px] py-[12px]
                  rounded-[8px] transition-colors group
                  ${
                    active
                      ? "bg-[#DB4444] text-white"
                      : "text-black/60 hover:bg-[#F5F5F5] hover:text-black"
                  }
                `}
              >
                <div className="flex items-center gap-[12px]">
                  <Icon size={18} />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </div>
                <ChevronRight
                  size={14}
                  className={
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                  }
                />
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-[12px] py-[20px] border-t border-black/10 shrink-0">
          <div className="flex items-center gap-[10px] px-[12px] py-[10px] bg-[#F5F5F5] rounded-[8px] mb-[8px]">
            <div className="w-[34px] h-[34px] rounded-full bg-[#DB4444] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
              {admin?.first_name?.[0]}
              {admin?.last_name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-black truncate">
                {admin?.first_name} {admin?.last_name}
              </p>
              <p className="text-[11px] text-black/40 truncate">
                {admin?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-[10px] px-[12px] py-[10px] rounded-[8px] text-black/50 hover:bg-red-50 hover:text-[#DB4444] transition-colors"
          >
            <LogOut size={16} />
            <span className="text-[13px] font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header */}
        <header className="h-[70px] bg-white border-b border-black/10 flex items-center justify-between px-[16px] md:px-[24px] sticky top-0 z-30 shrink-0">
          <button
            className="lg:hidden p-[8px] rounded-[8px] hover:bg-[#F5F5F5] transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-[8px] text-[13px] text-black/40">
            <span>Admin</span>
            <ChevronRight size={12} />
            <span className="text-black font-medium">
              {navItems.find((n) => isActive(n.path))?.label || "Dashboard"}
            </span>
          </div>

          <Link
            to="/"
            className="text-[13px] text-black/40 hover:text-[#DB4444] transition-colors whitespace-nowrap"
          >
            View Store →
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-[16px] md:p-[24px] lg:p-[32px] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
