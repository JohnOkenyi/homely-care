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
        { text: "Home Care", lat: 30, lng: -40, altitude: 0.1 },
        { text: "Residential &\nNursing Support", lat: 10, lng: 20, altitude: 0.1 },
        { text: "Live-in Care", lat: -20, lng: -30, altitude: 0.1 },
        { text: "Supported\nLiving", lat: 45, lng: 50, altitude: 0.1 },
        { text: "TDDI &\nHomely care", lat: -10, lng: 60, altitude: 0.1 },
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
              background: rgba(255,255,255,0.1); 
              backdrop-filter: blur(8px); 
              -webkit-backdrop-filter: blur(8px);
              border: 1px solid rgba(255,255,255,0.2); 
              padding: 10px 16px; 
              border-radius: 12px; 
              color: white; 
              font-family: inherit;
              font-weight: 600; 
              font-size: 13px; 
              line-height: 1.3;
              letter-spacing: 0.05em;
              text-shadow: 0 2px 4px rgba(0,0,0,0.8); 
              cursor: pointer; 
              transition: all 0.3s ease; 
              text-align: center; 
              white-space: pre-line;
              box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            ">
              ${d.text}
            </div>
          `;
                    el.style.pointerEvents = 'auto';
                    el.onmouseenter = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) {
                            inner.style.transform = 'scale(1.1) translateY(-5px)';
                            inner.style.backgroundColor = 'rgba(255,255,255,0.2)';
                            inner.style.borderColor = 'rgba(255,255,255,0.4)';
                            inner.style.color = '#fce4aa'; // Hover color from theme
                        }
                        if (globeEl.current) {
                            globeEl.current.controls().autoRotate = false;
                        }
                    };
                    el.onmouseleave = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) {
                            inner.style.transform = 'none';
                            inner.style.backgroundColor = 'rgba(255,255,255,0.1)';
                            inner.style.borderColor = 'rgba(255,255,255,0.2)';
                            inner.style.color = 'white';
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
