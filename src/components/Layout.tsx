import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LeadModal } from "./LeadModal";
import { SmokeFX } from "./SmokeFX";
import { WhatsApp } from "./WhatsApp";

const MAGNETIC = ".btn-pill, .lang-orb, .arrow-btn, .orb-btn, .wa-orb, .nav-tool, .nav-start, .process-arrow";

function useMagnetic() {
  useEffect(() => {
    let current: HTMLElement | null = null;

    const clear = (node: HTMLElement | null) => {
      if (!node) return;
      node.style.removeProperty("--mx");
      node.style.removeProperty("--my");
      node.style.removeProperty("transform");
    };

    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(MAGNETIC);
      if (current && current !== target) clear(current);
      current = target;
      if (!target) return;
      const box = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - box.left}px`);
      target.style.setProperty("--my", `${event.clientY - box.top}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      clear(current);
    };
  }, []);
}

export function Layout() {
  useMagnetic();

  return (
    <div className="relative min-h-screen bg-paper text-night">
      <SmokeFX />
      <Header />
      <Outlet />
      <Footer />
      <WhatsApp />
      <LeadModal />
    </div>
  );
}
