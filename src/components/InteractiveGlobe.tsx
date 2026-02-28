"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

// Dynamically import Globe with no SSR
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobePoint {
  id: number;
  text: string;
  lat: number;
  lng: number;
  icon: React.ReactElement;
}

export default function InteractiveGlobe() {
  const globeEl = useRef<any>(null);
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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const globeData = useMemo<GlobePoint[]>(() => [
    { id: 1, text: "Home Care",         lat: 51.5, lng: -0.1,  icon: <Home size={18} /> },
    { id: 2, text: "Live-in Care",      lat: -25,  lng: 25,    icon: <UserCheck size={18} /> },
    { id: 3, text: "Supported\nLiving", lat: 40,   lng: -75,   icon: <ShieldCheck size={18} /> },
    { id: 4, text: "TDDI &\nHomely",    lat: 35,   lng: 140,   icon: <Activity size={18} /> },
    { id: 5, text: "Home Care",         lat: -34,  lng: 151,   icon: <Home size={18} /> },
    { id: 6, text: "Live-in Care",      lat: 45,   lng: -120,  icon: <UserCheck size={18} /> },
    { id: 7, text: "Supported\nLiving", lat: 60,   lng: 100,   icon: <ShieldCheck size={18} /> },
    { id: 8, text: "TDDI &\nHomely",    lat: 10,   lng: 80,    icon: <Activity size={18} /> },
  ], []);

  const handleGlobeReady = () => {
    if (!globeEl.current) return;
    const ctrl = globeEl.current.controls();
    if (ctrl) {
      ctrl.autoRotate = true;
      ctrl.autoRotateSpeed = 0.8;
      ctrl.enableZoom = false;
    }
    globeEl.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 0);
  };

  const getHtmlElement = (d: any) => {
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
    el.onmouseenter = () => {
      if (globeEl.current) globeEl.current.controls().autoRotate = false;
    };
    el.onmouseleave = () => {
      if (globeEl.current) globeEl.current.controls().autoRotate = true;
    };
    return el;
  };

  return (
    <Globe
      ref={globeEl}
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      htmlElementsData={globeData}
      htmlElement={getHtmlElement}
      onGlobeReady={handleGlobeReady}
    />
  );
}
/* eslint-enable @typescript-eslint/no-explicit-any */
