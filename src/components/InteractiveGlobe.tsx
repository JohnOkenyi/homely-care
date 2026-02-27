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
        { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> }, // London
        { id: 2, text: "Residential &\nNursing Support", lat: -25.2, lng: 133.7, icon: <HeartHandshake size={18} /> }, // Australia
        { id: 3, text: "Live-in Care", lat: 40.7, lng: -74, icon: <UserCheck size={18} /> }, // New York
        { id: 4, text: "Supported\nLiving", lat: 35.6, lng: 139.6, icon: <ShieldCheck size={18} /> }, // Tokyo
        { id: 5, text: "TDDI &\nHomely care", lat: -23.5, lng: -46.6, icon: <Activity size={18} /> }, // Sao Paulo
    ], []);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.8;
            globeEl.current.controls().enableZoom = false;

            // Start with a view that shows the first few pins
            globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 0);
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
                        <div class="label-container flex flex-col items-center gap-3 cursor-pointer transition-all duration-300">
                            <div class="icon-box flex items-center justify-center w-[36px] h-[36px] rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg mb-1">
                                ${iconMarkup}
                            </div>
                            <span class="label-text font-bold text-[12px] leading-[1.3] tracking-wider text-center text-white whitespace-pre-line drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
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
