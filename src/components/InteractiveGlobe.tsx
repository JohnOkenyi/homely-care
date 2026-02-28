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

    const globeData = useMemo(() => [
        // Spaced out globally to ensure ~3 per view and no clustering
        { id: 1, text: "Home Care", lat: 51.5, lng: -0.1, icon: <Home size={18} /> }, // London
        { id: 3, text: "Live-in Care", lat: -25, lng: 25, icon: <UserCheck size={18} /> }, // Southern Africa
        { id: 4, text: "Supported\nLiving", lat: 40, lng: -75, icon: <ShieldCheck size={18} /> }, // USA East
        { id: 5, text: "TDDI &\nHomely care", lat: 35, lng: 140, icon: <Activity size={18} /> }, // Japan
        { id: 6, text: "Home Care", lat: -34, lng: 151, icon: <Home size={18} /> }, // Australia
        { id: 8, text: "Live-in Care", lat: 45, lng: -120, icon: <UserCheck size={18} /> }, // USA West
        { id: 9, text: "Supported\nLiving", lat: 60, lng: 100, icon: <ShieldCheck size={18} /> }, // Asia North
        { id: 10, text: "TDDI &\nHomely care", lat: 10, lng: 80, icon: <Activity size={18} /> }, // India
    ], []);

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.8;
            globeEl.current.controls().enableZoom = false;

            // Initial view showing a nice sparse group of ~3
            globeEl.current.pointOfView({ lat: 30, lng: 20, altitude: 1.4 }, 0);
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
                        <div class="label-container flex flex-col items-center gap-0 cursor-pointer transition-all duration-300">
                            <div class="icon-box flex items-center justify-center w-[36px] h-[36px] rounded-full" style="background:rgba(91,42,134,0.25);border:1px solid rgba(185,163,211,0.4);backdrop-filter:blur(8px);box-shadow:0 4px 16px rgba(91,42,134,0.3)">
                                ${iconMarkup}
                            </div>
                            <span class="label-text font-semibold text-[11px] leading-[1.2] tracking-wide text-center whitespace-pre-line mt-[-1px]" style="color:#F2F2F2;text-shadow:0 2px 8px rgba(15,17,21,0.9)">
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
                .label-container .icon-box svg {
                    color: #B9A3D3;
                    stroke: #B9A3D3;
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
