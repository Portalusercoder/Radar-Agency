import { useEffect, useRef } from "react";

const ORBS = [
  { color: "80,112,255", r: 220, x: 0.22, y: 0.28, vx: 0.00018, vy: 0.00012 },
  { color: "253,130,86", r: 170, x: 0.78, y: 0.42, vx: -0.00014, vy: 0.00016 },
  { color: "255,222,106", r: 140, x: 0.52, y: 0.78, vx: 0.0001, vy: -0.00014 },
  { color: "80,112,255", r: 110, x: 0.88, y: 0.82, vx: -0.00012, vy: -0.0001 },
];

export function AmbientFX() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const orbs = ORBS.map((orb) => ({ ...orb }));
    let frame = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const orb of orbs) {
        if (!reduce) {
          orb.x += orb.vx;
          orb.y += orb.vy;
          if (orb.x < 0.08 || orb.x > 0.92) orb.vx *= -1;
          if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;
        }
        const g = ctx.createRadialGradient(orb.x * w, orb.y * h, 0, orb.x * w, orb.y * h, orb.r);
        g.addColorStop(0, `rgba(${orb.color},0.22)`);
        g.addColorStop(0.45, `rgba(${orb.color},0.08)`);
        g.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x * w, orb.y * h, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="ambientfx" aria-hidden />;
}
