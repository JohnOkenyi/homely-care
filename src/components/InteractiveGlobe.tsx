"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function InteractiveGlobe() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeEl = useRef<any>();
    const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // On desktop, take up half the width. On mobile, full width.
            const elWidth = width >= 1024 ? width * 0.5 : width;
            const elHeight = width >= 1024 ? height * 0.8 : height * 0.5;

            // To ensure it fits nicely above the hands
            const size = Math.min(elWidth, elHeight);
            setDimensions({ width: size, height: size });
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const gData = useMemo(() => [
        { text: "Home Care", lat: 35, lng: -20, altitude: 0.05 },
        { text: "Residential &\nNursing Support", lat: 15, lng: 50, altitude: 0.05 },
        { text: "Live-in Care", lat: -25, lng: -60, altitude: 0.05 },
        { text: "Supported\nLiving", lat: -40, lng: 30, altitude: 0.05 },
        { text: "TDDI &\nHomely care", lat: 5, lng: 110, altitude: 0.05 },
    ], []);

    useEffect(() => {
        if (globeEl.current) {
            // Auto-rotate
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 1.0;
            // Disable zoom if you want it to remain fixed size relative to the hands
            globeEl.current.controls().enableZoom = false;
        }
    }, []);

    return (
        <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                htmlElementsData={gData}
                htmlLat="lat"
                htmlLng="lng"
                htmlAltitude="altitude"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                htmlElement={(d: any) => {
                    const el = document.createElement('div');
                    el.innerHTML = `
            <div style="
              color: white; 
              font-family: inherit;
              font-weight: 700; 
              font-size: 15px; 
              line-height: 1.3;
              letter-spacing: 0.05em;
              text-shadow: 0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8); 
              cursor: pointer; 
              transition: all 0.3s ease; 
              text-align: center; 
              white-space: pre-line;
              position: absolute;
              transform: translate(-50%, -50%);
            ">
              ${d.text}
            </div>
          `;
                    el.style.pointerEvents = 'auto';
                    el.onmouseenter = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) {
                            inner.style.transform = 'translate(-50%, -50%) scale(1.15)';
                            inner.style.color = '#fce4aa'; // Hover color from theme
                            inner.style.textShadow = '0 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(252,228,170,0.6)';
                        }
                        if (globeEl.current) {
                            globeEl.current.controls().autoRotate = false;
                        }
                    };
                    el.onmouseleave = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) {
                            inner.style.transform = 'translate(-50%, -50%) scale(1)';
                            inner.style.color = 'white';
                            inner.style.textShadow = '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)';
                        }
                        if (globeEl.current) {
                            globeEl.current.controls().autoRotate = true;
                        }
                    };
                    return el;
                }}
            />
        </div>
    );
}
