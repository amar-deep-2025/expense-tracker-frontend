import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./css/MainLayout.css";
import Header from "../landing/Header";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
