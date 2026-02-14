import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import RuralSidebar from "./RuralSidebar";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <RuralSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
