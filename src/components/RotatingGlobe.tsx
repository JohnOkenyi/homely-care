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
    const [isGlobeReady, setIsGlobeReady] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
    const isHoveredRef = useRef(false);

    // Handle mounting and initial sizing
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

    // Definitive Rotation Loop using requestAnimationFrame
    useEffect(() => {
        if (!isMounted || !isGlobeReady || !globeRef.current) return;

        console.log("🚀 STARTING ROBUST ROTATION LOOP");
        let frameId: number;

        const rotate = () => {
            if (globeRef.current && !isHoveredRef.current) {
                const controls = globeRef.current.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 2.0;
                    controls.update();
                }
            }
            frameId = requestAnimationFrame(rotate);
        };

        rotate();

        const heartbeat = setInterval(() => {
            console.log("💓 GLOBE HEARTBEAT", {
                hovered: isHoveredRef.current,
                autoRotate: globeRef.current?.controls()?.autoRotate
            });
        }, 5000);

        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(heartbeat);
        };
    }, [isMounted, isGlobeReady]);

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
        console.log("✅ GLOBE READY CALLBACK");
        setIsGlobeReady(true);

        if (globeRef.current) {
            // Initial POV
            globeRef.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 0);
            const controls = globeRef.current.controls();
            if (controls) {
                controls.enableZoom = false;
                controls.autoRotate = true;
            }
        }
    };

    const createHtmlElement = (d: any) => {
        const el = document.createElement("div");
        let iconMarkup = "";
        try {
            iconMarkup = renderToStaticMarkup(d.icon);
        } catch (e) {
            console.error("Icon render error", e);
            iconMarkup = "<span>📍</span>";
        }

        el.innerHTML = `
      <div class="globe-label" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:rgba(252,228,170,0.15);border:1px solid rgba(252,228,170,0.6);border-radius:8px;padding:6px;margin-bottom:4px;backdrop-filter:blur(4px);">
          <div style="color:#fce4aa;">${iconMarkup}</div>
        </div>
        <span style="color:#fce4aa;font-size:10px;font-weight:600;text-align:center;white-space:pre-line;" class="label-text">${d.text}</span>
      </div>
    `;

        el.style.pointerEvents = "auto";

        el.onmouseenter = () => {
            isHoveredRef.current = true;
        };
        el.onmouseleave = () => {
            isHoveredRef.current = false;
        };

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
