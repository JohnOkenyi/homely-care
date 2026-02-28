"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

/* eslint-disable @typescript-eslint/no-explicit-any */
let GlobeLib: any = null;

interface GlobePoint {
  id: number;
  text: string;
  lat: number;
  lng: number;
  icon: React.ReactElement;
}

export default function InteractiveGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const elWidth = width >= 1024 ? width * 0.75 : width;
      const elHeight = width >= 1024 ? height * 0.95 : height * 0.7;
      const size = Math.min(elWidth, elHeight);
      setDimensions({ width: size, height: size });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const globeData = useMemo<GlobePoint[]>(() => [
    { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> },
    { id: 3, text: "Live-in Care", lat: -25, lng: 25, icon: <UserCheck size={18} /> },
    { id: 4, text: "Supported\nLiving", lat: 40, lng: -75, icon: <ShieldCheck size={18} /> },
    { id: 5, text: "TDDI &\nHomely care", lat: 35, lng: 140, icon: <Activity size={18} /> },
    { id: 6, text: "Home Care", lat: -34, lng: 151, icon: <Home size={18} /> },
    { id: 8, text: "Live-in Care", lat: 45, lng: -120, icon: <UserCheck size={18} /> },
    { id: 9, text: "Supported\nLiving", lat: 60, lng: 100, icon: <ShieldCheck size={18} /> },
    { id: 10, text: "TDDI &\nHomely care", lat: 10, lng: 80, icon: <Activity size={18} /> },
  ], []);

  useEffect(() => {
    if (!mountRef.current) return;
    let globe: any = null;
    let cancelled = false;

    const initGlobe = async () => {
      if (!GlobeLib) {
        const mod = await import('react-globe.gl');
        GlobeLib = mod.default;
      }
      if (cancelled || !mountRef.current) return;

      globe = new (GlobeLib as any)()(mountRef.current);
      globeInstanceRef.current = globe;

      globe
        .width(dimensions.width)
        .height(dimensions.height)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .htmlElementsData(globeData)
        .htmlElement((d: any) => {
          const el = document.createElement('div');
          const iconMarkup = renderToStaticMarkup(d.icon);
          el.innerHTML = `
            <div class="label-container" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
              <div class="icon-box" style="background:rgba(252,228,170,0.15);border:1px solid rgba(252,228,170,0.6);border-radius:8px;padding:6px;margin-bottom:4px;transition:all 0.3s ease;">
                <div style="color:#fce4aa;">${iconMarkup}</div>
              </div>
              <span class="label-text" style="color:#fce4aa;font-size:10px;font-weight:600;text-align:center;white-space:pre-line;text-shadow:0 0 8px rgba(252,228,170,0.5);">${d.text}</span>
            </div>
          `;
          el.style.pointerEvents = 'auto';
          el.onmouseenter = () => { try { globe.controls().autoRotate = false; } catch { /* ignore */ } };
          el.onmouseleave = () => { try { globe.controls().autoRotate = true; } catch { /* ignore */ } };
          return el;
        });

      try {
        const controls = globe.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.enableZoom = false;
        globe.pointOfView({ lat: 30, lng: 20, altitude: 1.4 });
      } catch {
        setTimeout(() => {
          try {
            const controls = globe.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.8;
            controls.enableZoom = false;
          } catch { /* ignore */ }
        }, 1000);
      }
    };

    initGlobe();

    return () => {
      cancelled = true;
      if (globeInstanceRef.current) {
        try { globeInstanceRef.current._destructor(); } catch { /* ignore */ }
        globeInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (globeInstanceRef.current) {
      try {
        globeInstanceRef.current.width(dimensions.width).height(dimensions.height);
      } catch { /* ignore */ }
    }
  }, [dimensions]);

  return (
    <div
      ref={mountRef}
      style={{ width: dimensions.width, height: dimensions.height }}
    />
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */
