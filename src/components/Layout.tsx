import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AmbientFX } from "./AmbientFX";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LeadModal } from "./LeadModal";
import { WhatsApp } from "./WhatsApp";

function useMagnetic() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(".btn-pill, .lang-orb, .arrow-btn, .orb-btn");
      if (!target) return;
      const box = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - box.left}px`);
      target.style.setProperty("--my", `${event.clientY - box.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export function Layout() {
  useMagnetic();

  return (
    <div className="relative min-h-screen bg-paper text-night">
      <AmbientFX />
      <Header />
      <Outlet />
      <Footer />
      <WhatsApp />
      <LeadModal />
    </div>
  );
}
