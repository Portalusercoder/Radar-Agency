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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const state = new WeakMap<HTMLElement, { x: number; y: number; tx: number; ty: number }>();
    const live = new Set<HTMLElement>();
    let current: HTMLElement | null = null;
    let frame = 0;

    const ensure = (node: HTMLElement) => {
      if (!state.has(node)) state.set(node, { x: 0, y: 0, tx: 0, ty: 0 });
      live.add(node);
      return state.get(node)!;
    };

    const release = (node: HTMLElement | null) => {
      if (!node) return;
      const item = state.get(node);
      if (item) {
        item.tx = 0;
        item.ty = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(MAGNETIC);
      if (current && current !== target) release(current);
      current = target;
      if (!target) return;
      const box = target.getBoundingClientRect();
      const mx = event.clientX - box.left;
      const my = event.clientY - box.top;
      target.style.setProperty("--mx", `${mx}px`);
      target.style.setProperty("--my", `${my}px`);
      if (reduce || !fine) return;
      const item = ensure(target);
      item.tx = (mx - box.width / 2) * 0.28;
      item.ty = (my - box.height / 2) * 0.38;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      live.forEach((node) => {
        const item = state.get(node);
        if (!item) return;
        item.x += (item.tx - item.x) * 0.18;
        item.y += (item.ty - item.y) * 0.18;
        if (Math.abs(item.x) < 0.08 && Math.abs(item.y) < 0.08 && item.tx === 0 && item.ty === 0) {
          item.x = 0;
          item.y = 0;
          node.style.removeProperty("transform");
          live.delete(node);
          return;
        }
        node.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    if (!reduce && fine) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
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
