"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, HeartHandshake, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function InteractiveGlobe() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeEl = useRef<any>();
    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const elWidth = width >= 1024 ? width * 0.5 : width;
            const elHeight = width >= 1024 ? height * 0.8 : height * 0.5;
            const size = Math.min(elWidth, elHeight);
            setDimensions({ width: size, height: size });
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const globeData = useMemo(() => [
        // Cluster 1: Initial View (Europe/Atlantic Focus - 4 Services)
        { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> },
        { id: 2, text: "Residential &\nNursing Support", lat: 48, lng: 16, icon: <HeartHandshake size={18} /> },
        { id: 3, text: "Live-in Care", lat: 15, lng: -15, icon: <UserCheck size={18} /> },
        { id: 4, text: "Supported\nLiving", lat: 38, lng: -45, icon: <ShieldCheck size={18} /> },

        // Distribution: Around the Globe (At least 3 in every section)
        { id: 5, text: "TDDI &\nHomely care", lat: -15, lng: -55, icon: <Activity size={18} /> },
        { id: 6, text: "Home Care", lat: 35, lng: 139, icon: <Home size={18} /> },
        { id: 7, text: "Residential &\nNursing Support", lat: -25, lng: 133, icon: <HeartHandshake size={18} /> },
        { id: 8, text: "Live-in Care", lat: 10, lng: 105, icon: <UserCheck size={18} /> },
        { id: 9, text: "Supported\nLiving", lat: 25, lng: 55, icon: <ShieldCheck size={18} /> },
        { id: 10, text: "TDDI &\nHomely care", lat: -30, lng: 25, icon: <Activity size={18} /> },
        { id: 11, text: "Home Care", lat: 37, lng: -122, icon: <Home size={18} /> },
        { id: 12, text: "Residential &\nNursing Support", lat: 55, lng: -100, icon: <HeartHandshake size={18} /> },
        { id: 13, text: "Live-in Care", lat: -2, lng: 115, icon: <UserCheck size={18} /> },
        { id: 14, text: "Supported\nLiving", lat: 55, lng: 70, icon: <ShieldCheck size={18} /> },
        { id: 15, text: "TDDI &\nHomely care", lat: 35, lng: 95, icon: <Activity size={18} /> },
        { id: 16, text: "Home Care", lat: -34, lng: -58, icon: <Home size={18} /> },
        { id: 17, text: "Residential &\nNursing Support", lat: 26, lng: 30, icon: <HeartHandshake size={18} /> },
        { id: 18, text: "Live-in Care", lat: 60, lng: 15, icon: <UserCheck size={18} /> },
    ], []);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.8;
            globeEl.current.controls().enableZoom = false;

            // Adjusted view to ensure the Europe-side cluster (4 pins) is prominent
            globeEl.current.pointOfView({ lat: 35, lng: -10, altitude: 2.1 }, 0);
        }
    }, [dimensions]);

    return (
        <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                htmlElementsData={globeData}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                htmlElement={(d: any) => {
                    const el = document.createElement("div");
                    const iconMarkup = renderToStaticMarkup(d.icon);

                    el.innerHTML = `
                        <div class="label-container flex flex-col items-center gap-1 cursor-pointer transition-all duration-300">
                            <div class="icon-box flex items-center justify-center w-[34px] h-[34px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mb-1">
                                ${iconMarkup}
                            </div>
                            <span class="label-text font-bold text-[11px] leading-[1.2] tracking-wider text-center text-white whitespace-pre-line drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
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

                    // Hover effects using standard CSS in JS approach for the library
                    el.onmouseenter = () => {
                        if (globeEl.current) globeEl.current.controls().autoRotate = false;
                        el.querySelector('.label-container')?.classList.add('hover-glow');
                    };
                    el.onmouseleave = () => {
                        if (globeEl.current) globeEl.current.controls().autoRotate = true;
                        el.querySelector('.label-container')?.classList.remove('hover-glow');
                    };

                    return el;
                }}
            />

            <style jsx global>{`
                .label-container {
                    transition: all 0.3s ease;
                }
                .label-container.hover-glow .icon-box {
                    background: rgba(252, 228, 170, 0.4) !important;
                    border-color: rgba(252, 228, 170, 1) !important;
                    box-shadow: 0 0 20px rgba(252, 228, 170, 0.8) !important;
                    transform: scale(1.1);
                }
                .label-container.hover-glow .label-text {
                    color: #fce4aa !important;
                    text-shadow: 0 0 15px rgba(252, 228, 170, 0.8) !important;
                }
                .label-container.glow-active .icon-box {
                    background: rgba(252, 228, 170, 0.6) !important;
                    border-color: rgba(252, 228, 170, 1) !important;
                    box-shadow: 0 0 30px rgba(252, 228, 170, 1) !important;
                }
                .label-container.glow-active .label-text {
                    color: #fce4aa !important;
                    text-shadow: 0 0 20px rgba(252, 228, 170, 1) !important;
                }
            `}</style>
        </div>
    );
}
