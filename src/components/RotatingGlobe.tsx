"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

// Dynamic import for the Globe component
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobePoint {
    id: number;
    text: string;
    lat: number;
    lng: number;
    icon: React.ReactElement;
}

export default function RotatingGlobe() {
    const globeRef = useRef<any>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
    const isHoveredRef = useRef(false);

    // Handle mounting and resizing
    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const elWidth = width >= 1024 ? width * 0.75 : width;
            const elHeight = width >= 1024 ? height * 0.95 : height * 0.7;
            const size = Math.min(elWidth, elHeight) || 600;
            setDimensions({ width: size, height: size });
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Definitive Rotation Engine
    useEffect(() => {
        if (!isMounted || !globeRef.current) return;

        // We expose these to the window for debugging, as requested by the user's situation
        (window as any).globeRef = globeRef.current;

        console.log("🛠️ INITIALIZING ROTATION ENGINE...");

        let frameId: number;
        const globe = globeRef.current;

        const rotationLoop = () => {
            if (globe && !isHoveredRef.current) {
                const controls = globe.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 2.0;
                    controls.update();
                }
            }
            frameId = requestAnimationFrame(rotationLoop);
        };

        // Kick off the loop
        rotationLoop();

        // Heartbeat to confirm execution
        const hb = setInterval(() => {
            const controls = globe.controls();
            console.log("💓 HEARTBEAT", {
                hovered: isHoveredRef.current,
                autoRotate: controls?.autoRotate,
                controlsReady: !!controls
            });
        }, 2000);

        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(hb);
        };
    }, [isMounted]);

    const globeData = useMemo<GlobePoint[]>(() => [
        { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> },
        { id: 2, text: "Live-in Care", lat: -25, lng: 25, icon: <UserCheck size={18} /> },
        { id: 3, text: "Supported\nLiving", lat: 40, lng: -75, icon: <ShieldCheck size={18} /> },
        { id: 4, text: "Complex Care", lat: 35, lng: 140, icon: <Activity size={18} /> },
        { id: 5, text: "Home Care", lat: -34, lng: 151, icon: <Home size={18} /> },
        { id: 6, text: "Live-in Care", lat: 45, lng: -120, icon: <UserCheck size={18} /> },
        { id: 7, text: "Supported\nLiving", lat: 60, lng: 100, icon: <ShieldCheck size={18} /> },
        { id: 8, text: "Complex Care", lat: 10, lng: 80, icon: <Activity size={18} /> },
    ], []);

    const handleGlobeReady = () => {
        if (!globeRef.current) return;
        console.log("✅ GLOBE READY");
        globeRef.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 500);
        const controls = globeRef.current.controls();
        if (controls) {
            controls.enableZoom = false;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.0;
        }
    };

    const createHtmlElement = (d: any) => {
        const el = document.createElement("div");
        let iconMarkup = "";
        try {
            iconMarkup = renderToStaticMarkup(d.icon);
        } catch (e) {
            iconMarkup = "<span>📍</span>";
        }

        el.innerHTML = `
      <div class="globe-label" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:rgba(252,228,170,0.15);border:1px solid rgba(252,228,170,0.6);border-radius:8px;padding:6px;margin-bottom:4px;backdrop-filter:blur(4px);pointer-events:none;">
          <div style="color:#fce4aa;">${iconMarkup}</div>
        </div>
        <span style="color:#fce4aa;font-size:10px;font-weight:600;text-align:center;white-space:pre-line;pointer-events:none;">${d.text}</span>
      </div>
    `;

        el.style.pointerEvents = "auto";
        el.onmouseenter = () => { isHoveredRef.current = true; };
        el.onmouseleave = () => { isHoveredRef.current = false; };

        return el;
    };

    if (!isMounted) return null;

    return (
        <div className="w-full h-full flex items-center justify-center overflow-visible">
            <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                htmlElementsData={globeData}
                htmlElement={createHtmlElement}
                onGlobeReady={handleGlobeReady}
            />
        </div>
    );
}
/* eslint-enable @typescript-eslint/no-explicit-any */
