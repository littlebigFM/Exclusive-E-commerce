import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useAdmin } from "../Context/AdminContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
];

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  const { admin, logoutAdmin } = useAdmin();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-white border-r border-black/10 z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-[70px] flex items-center px-[24px] border-b border-black/10">
          <Link to="/" className="font-bold text-[22px] text-black">
            Exclusive
            <span className="text-[#DB4444] ml-[4px] text-[12px] font-semibold bg-[#DB4444]/10 px-[8px] py-[2px] rounded-full">
              Admin
            </span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-[16px] py-[24px] flex flex-col gap-[4px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-[16px] py-[12px] rounded-[8px] transition-colors group ${
                  isActive
                    ? "bg-[#DB4444] text-white"
                    : "text-black/60 hover:bg-[#F5F5F5] hover:text-black"
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  <Icon size={20} />
                  <span className="text-[15px] font-medium">{item.label}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-50"
                  }
                />
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="px-[16px] py-[24px] border-t border-black/10">
          <div className="flex items-center gap-[12px] px-[16px] py-[12px] bg-[#F5F5F5] rounded-[8px] mb-[8px]">
            <div className="w-[36px] h-[36px] rounded-full bg-[#DB4444] flex items-center justify-center text-white font-bold text-[14px] shrink-0">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-semibold text-black truncate">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-[12px] text-black/50 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-[12px] px-[16px] py-[12px] rounded-[8px] text-black/60 hover:bg-red-50 hover:text-[#DB4444] transition-colors"
          >
            <LogOut size={18} />
            <span className="text-[14px] font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-[70px] bg-white border-b border-black/10 flex items-center justify-between px-[24px] sticky top-0 z-30">
          <button
            className="lg:hidden p-[8px] rounded-[8px] hover:bg-[#F5F5F5] transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-[8px] text-[14px] text-black/50">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-black font-medium">
              {navItems.find(
                (n) =>
                  location.pathname === n.path ||
                  (n.path !== "/admin" && location.pathname.startsWith(n.path)),
              )?.label || "Dashboard"}
            </span>
          </div>
          <Link
            to="/"
            className="text-[14px] text-black/50 hover:text-[#DB4444] transition-colors"
          >
            View Store →
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-[24px] md:p-[32px]">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
