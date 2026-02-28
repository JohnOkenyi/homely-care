"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function InteractiveGlobe() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const [globeMounted, setGlobeMounted] = useState(false);

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

  // After globe mounts, poll until controls() is available then enable autoRotate
  useEffect(() => {
    if (!globeMounted) return;
    let attempts = 0;
    const tryEnableRotation = () => {
      attempts++;
      try {
        if (globeEl.current && typeof globeEl.current.controls === 'function') {
          const controls = globeEl.current.controls();
          if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.8;
            controls.enableZoom = false;
            globeEl.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 0);
            return; // success, stop polling
          }
        }
      } catch (e) {
        // controls not ready yet
      }
      if (attempts < 40) {
        setTimeout(tryEnableRotation, 250);
      }
    };
    const timer = setTimeout(tryEnableRotation, 500);
    return () => clearTimeout(timer);
  }, [globeMounted]);

  const globeData = useMemo(() => [
    { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> },
    { id: 3, text: "Live-in Care", lat: -25, lng: 25, icon: <UserCheck size={18} /> },
    { id: 4, text: "Supported\nLiving", lat: 40, lng: -75, icon: <ShieldCheck size={18} /> },
    { id: 5, text: "TDDI &\nHomely care", lat: 35, lng: 140, icon: <Activity size={18} /> },
    { id: 6, text: "Home Care", lat: -34, lng: 151, icon: <Home size={18} /> },
    { id: 8, text: "Live-in Care", lat: 45, lng: -120, icon: <UserCheck size={18} /> },
    { id: 9, text: "Supported\nLiving", lat: 60, lng: 100, icon: <ShieldCheck size={18} /> },
    { id: 10, text: "TDDI &\nHomely care", lat: 10, lng: 80, icon: <Activity size={18} /> },
  ], []);

  return (
    <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeReady={() => {
          // onGlobeReady fires when Three.js scene is fully initialized
          // This is the primary trigger for autoRotate
          setGlobeMounted(true);
          try {
            if (globeEl.current) {
              const controls = globeEl.current.controls();
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.8;
              controls.enableZoom = false;
              globeEl.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 0);
            }
          } catch (e) {
            // polling via useEffect will handle it
          }
        }}
        htmlElementsData={globeData}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        htmlElement={(d: any) => {
          const el = document.createElement("div");
          const iconMarkup = renderToStaticMarkup(d.icon);
          el.innerHTML = `
            <div class="label-container flex flex-col items-center gap-0 cursor-pointer transition-all duration-300">
              <div class="icon-box flex items-center justify-center w-[34px] h-[34px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                ${iconMarkup}
              </div>
              <span class="label-text font-bold text-[11px] leading-[1.1] tracking-wider text-center text-white whitespace-pre-line drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] mt-[-2px]">
                ${d.text}
              </span>
            </div>
          `;
          el.style.pointerEvents = "auto";
          el.onclick = () => {
            const containers = document.querySelectorAll('.label-container');
            containers.forEach(c => c.classList.remove('glow-active'));
            el.querySelector('.label-container')?.classList.add('glow-active');
          };
          el.onmouseenter = () => {
            if (globeEl.current) {
              try { globeEl.current.controls().autoRotate = false; } catch(e){}
            }
            el.querySelector('.label-container')?.classList.add('hover-glow');
          };
          el.onmouseleave = () => {
            if (globeEl.current) {
              try { globeEl.current.controls().autoRotate = true; } catch(e){}
            }
            el.querySelector('.label-container')?.classList.remove('hover-glow');
          };
          return el;
        }}
      />
      <style jsx global>{`
        .label-container { transition: all 0.3s ease; }
        .label-container.hover-glow .icon-box {
          background: rgba(252,228,170,0.4) !important;
          border-color: rgba(252,228,170,1) !important;
          box-shadow: 0 0 20px rgba(252,228,170,0.8) !important;
          transform: scale(1.1);
        }
        .label-container.hover-glow .label-text {
          color: #fce4aa !important;
          text-shadow: 0 0 15px rgba(252,228,170,0.8) !important;
        }
        .label-container.glow-active .icon-box {
          background: rgba(252,228,170,0.6) !important;
          border-color: rgba(252,228,170,1) !important;
          box-shadow: 0 0 30px rgba(252,228,170,1) !important;
        }
        .label-container.glow-active .label-text {
          color: #fce4aa !important;
          text-shadow: 0 0 20px rgba(252,228,170,1) !important;
        }
      `}</style>
    </div>
  );
}
