import { useEffect } from "react";

let introStarted = false;

export function SiteLoader() {
  useEffect(() => {
    if (introStarted) return;
    introStarted = true;
    bootLoader();
  }, []);

  return null;
}

function bootLoader() {
  const root = document.documentElement;
  const el = document.getElementById("site-loader");

  if (!el) {
    root.classList.remove("is-loading");
    return;
  }

  try {
    if (sessionStorage.getItem("radar-seen") === "1") {
      el.remove();
      root.classList.remove("is-loading");
      return;
    }
  } catch {
    /* ignore */
  }

  const app = document.getElementById("root");
  if (app) app.setAttribute("inert", "");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const min = reduced ? 450 : 2200;
  const max = reduced ? 900 : 3800;
  const started = performance.now();
  let leaving = false;

  function leave() {
    if (leaving) return;
    leaving = true;
    el.classList.add("is-leaving");
    el.setAttribute("aria-busy", "false");
    const app = document.getElementById("root");
    if (app) app.removeAttribute("inert");
    window.setTimeout(() => {
      el.remove();
      root.classList.remove("is-loading");
      try {
        sessionStorage.setItem("radar-seen", "1");
      } catch {
        /* ignore */
      }
    }, 560);
  }

  function afterReady() {
    const wait = Math.max(0, min - (performance.now() - started));
    window.setTimeout(leave, wait);
  }

  if (document.readyState === "complete") afterReady();
  else window.addEventListener("load", afterReady, { once: true });
  window.setTimeout(leave, max);
}
