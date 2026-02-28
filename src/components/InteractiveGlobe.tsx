"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useMemo } from "react";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

interface GlobePoint {
  id: number;
  text: string;
  lat: number;
  lng: number;
  icon: React.ReactElement;
}

export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [size, setSize] = useState(800);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ew = w >= 1024 ? w * 0.75 : w;
      const eh = w >= 1024 ? h * 0.95 : h * 0.7;
      setSize(Math.min(ew, eh));
    };
    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  const globeData = useMemo<GlobePoint[]>(() => [
    { id: 1,  text: "Home Care",         lat: 51.5, lng: -0.1,  icon: <Home size={18} /> },
    { id: 2,  text: "Live-in Care",      lat: -25,  lng: 25,    icon: <UserCheck size={18} /> },
    { id: 3,  text: "Supported\nLiving", lat: 40,   lng: -75,   icon: <ShieldCheck size={18} /> },
    { id: 4,  text: "TDDI &\nHomely",    lat: 35,   lng: 140,   icon: <Activity size={18} /> },
    { id: 5,  text: "Home Care",         lat: -34,  lng: 151,   icon: <Home size={18} /> },
    { id: 6,  text: "Live-in Care",      lat: 45,   lng: -120,  icon: <UserCheck size={18} /> },
    { id: 7,  text: "Supported\nLiving", lat: 60,   lng: 100,   icon: <ShieldCheck size={18} /> },
    { id: 8,  text: "TDDI &\nHomely",    lat: 10,   lng: 80,    icon: <Activity size={18} /> },
  ], []);

  // Build HTML label element for each point
  const makeEl = (d: any, getGlobe: () => any) => {
    const el = document.createElement("div");
    const markup = renderToStaticMarkup(d.icon);
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:rgba(252,228,170,0.15);border:1px solid rgba(252,228,170,0.6);border-radius:8px;padding:6px;margin-bottom:4px;">
          <div style="color:#fce4aa;">${markup}</div>
        </div>
        <span style="color:#fce4aa;font-size:10px;font-weight:600;text-align:center;white-space:pre-line;text-shadow:0 0 8px rgba(252,228,170,0.5);">${d.text}</span>
      </div>`;
    el.style.pointerEvents = "auto";
    el.onmouseenter = () => { try { getGlobe().controls().autoRotate = false; } catch { /* */ } };
    el.onmouseleave = () => { try { getGlobe().controls().autoRotate = true; } catch { /* */ } };
    return el;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    (async () => {
      const mod = await import("react-globe.gl");
      if (cancelled || !containerRef.current) return;

      // react-globe.gl default export is a factory function (not a class)
      const GlobeFactory = (mod as any).default;
      const globe = GlobeFactory({ animateIn: true });

      globe(containerRef.current);
      globeRef.current = globe;

      globe
        .width(size)
        .height(size)
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
        .htmlElementsData(globeData)
        .htmlElement((d: any) => makeEl(d, () => globeRef.current));

      // Enable autoRotate
      const enableRotation = () => {
        try {
          const ctrl = globe.controls();
          if (ctrl) {
            ctrl.autoRotate = true;
            ctrl.autoRotateSpeed = 0.8;
            ctrl.enableZoom = false;
            globe.pointOfView({ lat: 30, lng: 20, altitude: 1.4 });
            return true;
          }
        } catch { /* */ }
        return false;
      };

      if (!enableRotation()) {
        let attempts = 0;
        const iv = setInterval(() => {
          attempts++;
          if (enableRotation() || attempts > 30) clearInterval(iv);
        }, 300);
      }
    })();

    return () => {
      cancelled = true;
      try { globeRef.current?._destructor?.(); } catch { /* */ }
      globeRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep size in sync
  useEffect(() => {
    try { globeRef.current?.width(size).height(size); } catch { /* */ }
  }, [size]);

  return <div ref={containerRef} style={{ width: size, height: size }} />;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
