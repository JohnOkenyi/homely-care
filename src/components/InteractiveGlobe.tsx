"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeDataItem {
    id: number;
    text: string;
    lat: number;
    lng: number;
    icon: React.ReactNode;
}

export default function InteractiveGlobe() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeEl = useRef<any>();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
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

    // Effect to handle auto-rotation lifecycle robustly
    useEffect(() => {
        if (!isMounted || !globeEl.current) return;

        const globe = globeEl.current;
        const setRotation = () => {
            const controls = globe.controls();
            if (controls) {
                controls.autoRotate = true;
                controls.autoRotateSpeed = 2.0;
                // Force an update to the controls to ensure rotation starts
                controls.update();
            } else {
                setTimeout(setRotation, 100);
            }
        };

        setRotation();
    }, [isMounted]);

    // Initial setup for camera and basic control props
    const handleGlobeReady = () => {
        const globe = globeEl.current;
        if (!globe) return;

        // Initial camera position
        globe.pointOfView({ lat: 5, lng: 0, altitude: 1.8 }, 1200);

        const controls = globe.controls();
        if (controls) {
            controls.enableZoom = false;
        }
    };

    const globeData = useMemo<GlobeDataItem[]>(() => [
        // SET 1 (Front: Longitude ~ 0)
        { id: 1, text: "Home Care", lat: 25, lng: -15, icon: <Home size={18} /> },
        { id: 2, text: "Live-in Care", lat: -15, lng: 15, icon: <UserCheck size={18} /> },

        // SET 2 (Right: Longitude ~ 90)
        { id: 3, text: "Supported\nLiving", lat: 25, lng: 75, icon: <ShieldCheck size={18} /> },
        { id: 4, text: "Complex Care", lat: -15, lng: 105, icon: <Activity size={18} /> },

        // SET 3 (Back: Longitude ~ 180)
        { id: 5, text: "Home Care", lat: 25, lng: 165, icon: <Home size={18} /> },
        { id: 6, text: "Live-in Care", lat: -15, lng: 195, icon: <UserCheck size={18} /> },

        // SET 4 (Left: Longitude ~ -90)
        { id: 7, text: "Supported\nLiving", lat: 25, lng: -105, icon: <ShieldCheck size={18} /> },
        { id: 8, text: "Complex Care", lat: -15, lng: -75, icon: <Activity size={18} /> },
    ], []);

    // Performance: Don't render until client-ready and dimensions are calculated
    if (!isMounted || dimensions.width === 0) {
        return <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-[#5B2A86] border-t-transparent animate-spin opacity-50" />
        </div>;
    }

    return (
        <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            <Globe
                ref={globeEl}
                onGlobeReady={handleGlobeReady}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                htmlElementsData={globeData}
                htmlElement={(d: object) => {
                    const item = d as GlobeDataItem;
                    const el = document.createElement("div");
                    const iconMarkup = renderToStaticMarkup(item.icon);

                    el.innerHTML = `
                        <div class="label-container flex flex-col items-center gap-1 cursor-pointer transition-all duration-300">
                            <div class="icon-box flex items-center justify-center w-[38px] h-[38px] rounded-full" style="background:rgba(91,42,134,0.55);border:1.5px solid rgba(255,255,255,0.7);backdrop-filter:blur(10px);box-shadow:0 4px 20px rgba(91,42,134,0.5),0 0 0 1px rgba(185,163,211,0.2)">
                                ${iconMarkup}
                            </div>
                            <span class="label-text font-bold text-[12px] leading-[1.25] tracking-wide text-center whitespace-pre-line" style="color:#FFFFFF;text-shadow:0 1px 3px rgba(0,0,0,1),0 0 12px rgba(0,0,0,0.9),0 0 24px rgba(0,0,0,0.8)">
                                ${item.text}
                            </span>
                        </div>
                    `;

                    el.style.pointerEvents = "auto";
                    el.onclick = () => {
                        const containers = document.querySelectorAll('.label-container');
                        containers.forEach(c => c.classList.remove('glow-active'));
                        el.querySelector('.label-container')?.classList.add('glow-active');
                    };

                    // Simple Hover logic
                    el.onmouseenter = () => {
                        const controls = globeEl.current?.controls();
                        if (controls) controls.autoRotate = false;
                        el.querySelector('.label-container')?.classList.add('hover-glow');
                    };
                    el.onmouseleave = () => {
                        const controls = globeEl.current?.controls();
                        if (controls) controls.autoRotate = true;
                        el.querySelector('.label-container')?.classList.remove('hover-glow');
                    };

                    return el;
                }}
            />

            <style jsx global>{`
                .label-container {
                    transition: all 0.3s ease;
                }
                .label-container .icon-box svg {
                    color: #ffffff;
                    stroke: #ffffff;
                    opacity: 0.95;
                }
                .label-container.hover-glow .icon-box {
                    background: rgba(214,179,106,0.25) !important;
                    border-color: rgba(214,179,106,0.7) !important;
                    box-shadow: 0 0 20px rgba(214,179,106,0.5) !important;
                    transform: scale(1.1);
                }
                .label-container.hover-glow .icon-box svg {
                    color: #D6B36A;
                    stroke: #D6B36A;
                }
                .label-container.hover-glow .label-text {
                    color: #D6B36A !important;
                    text-shadow: 0 0 12px rgba(214,179,106,0.6) !important;
                }
                .label-container.glow-active .icon-box {
                    background: rgba(214,179,106,0.4) !important;
                    border-color: rgba(214,179,106,1) !important;
                    box-shadow: 0 0 28px rgba(214,179,106,0.7) !important;
                }
                .label-container.glow-active .icon-box svg {
                    color: #D6B36A;
                    stroke: #D6B36A;
                }
                .label-container.glow-active .label-text {
                    color: #D6B36A !important;
                    text-shadow: 0 0 16px rgba(214,179,106,0.8) !important;
                }
            `}</style>
        </div>
    );
}
