import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  Bot,
  User,
  LogOut,
} from "lucide-react";
import "./css/Sidebar.css";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Expenses",
      path: "/expenses",
      icon: Receipt,
    },
    {
      label: "Budgets",
      path: "/budgets",
      icon: Wallet,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      label: "AI Assistant",
      path: "/ai",
      icon: Bot,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <aside className="sidebar">
      <NavLink to="/" className="sidebar-logo">
        <div className="sidebar-logo-icon">₹</div>
        <span>ExpenseTracker</span>
      </NavLink>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
