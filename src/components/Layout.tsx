import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LeadModal } from "./LeadModal";
import { WhatsApp } from "./WhatsApp";

export function Layout() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <Outlet />
      <Footer />
      <WhatsApp />
      <LeadModal />
    </div>
  );
}
