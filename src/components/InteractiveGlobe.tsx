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

    const icons = {
        home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/></svg>`,
        user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>`,
        shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
        activity: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>`
    };

    const gData = useMemo(() => [
        { text: "Home Care", lat: 53, lng: -2, altitude: 0.05, icon: icons.home }, // UK
        { text: "Residential &\nNursing Support", lat: 46, lng: 14, altitude: 0.05, icon: icons.heart }, // Central Europe (Austria/Slovenia)
        { text: "Live-in Care", lat: 39, lng: -4, altitude: 0.05, icon: icons.user }, // Spain
        { text: "Supported\nLiving", lat: 44, lng: 26, altitude: 0.05, icon: icons.shield }, // Eastern Europe (Romania)
        { text: "TDDI &\nHomely care", lat: 60, lng: 10, altitude: 0.05, icon: icons.activity }, // Scandinavia (Norway/Sweden)
    ], [icons.activity, icons.heart, icons.home, icons.shield, icons.user]);

    useEffect(() => {
        if (globeEl.current) {
            // Auto-rotate
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 1.0;
            // Disable zoom if you want it to remain fixed size relative to the hands
            globeEl.current.controls().enableZoom = false;

            // Start facing Europe (specifically centered on France/Germany)
            globeEl.current.pointOfView({ lat: 48, lng: 10, altitude: 2 }, 0);
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
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
              color: white; 
              font-family: inherit;
              font-weight: 700; 
              font-size: 14px; 
              line-height: 1.2;
              letter-spacing: 0.05em;
              text-shadow: 0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8); 
              cursor: pointer; 
              transition: all 0.3s ease; 
              text-align: center; 
              white-space: pre-line;
              position: absolute;
              transform: translate(-50%, -50%);
            ">
              <div style="
                display: flex; 
                align-items: center; 
                justify-content: center; 
                width: 38px; 
                height: 38px; 
                border-radius: 50%; 
                background: rgba(255,255,255,0.1); 
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255,255,255,0.2);
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              " class="icon-container">
                ${d.icon}
              </div>
              <span class="text-container" style="transition: all 0.3s ease;">${d.text}</span>
            </div>
          `;
                    el.style.pointerEvents = 'auto';

                    let isActive = false;
                    el.onclick = () => {
                        isActive = !isActive;
                        const iconCont = el.querySelector('.icon-container') as HTMLElement;
                        const textCont = el.querySelector('.text-container') as HTMLElement;
                        if (isActive) {
                            if (iconCont) {
                                iconCont.style.boxShadow = '0 0 20px rgba(252,228,170,0.8)';
                                iconCont.style.borderColor = 'rgba(252,228,170,0.8)';
                                iconCont.style.color = '#fce4aa';
                            }
                            if (textCont) {
                                textCont.style.color = '#fce4aa';
                                textCont.style.textShadow = '0 0 15px rgba(252,228,170,0.8)';
                            }
                        } else {
                            if (iconCont) {
                                iconCont.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                                iconCont.style.borderColor = 'rgba(255,255,255,0.2)';
                                iconCont.style.color = 'white';
                            }
                            if (textCont) {
                                textCont.style.color = 'white';
                                textCont.style.textShadow = '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)';
                            }
                        }
                    };

                    el.onmouseenter = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) inner.style.transform = 'translate(-50%, -50%) scale(1.15)';

                        // Apply strong glow on hover regardless of isActive state
                        const iconCont = el.querySelector('.icon-container') as HTMLElement;
                        const textCont = el.querySelector('.text-container') as HTMLElement;
                        if (iconCont) {
                            iconCont.style.boxShadow = '0 0 30px rgba(252,228,170,1)';
                            iconCont.style.borderColor = 'rgba(252,228,170,1)';
                            iconCont.style.color = '#fce4aa';
                        }
                        if (textCont) {
                            textCont.style.color = '#fce4aa';
                            textCont.style.textShadow = '0 0 25px rgba(252,228,170,1)';
                        }

                        if (globeEl.current) {
                            globeEl.current.controls().autoRotate = false;
                        }
                    };
                    el.onmouseleave = () => {
                        const inner = el.firstElementChild as HTMLElement;
                        if (inner) inner.style.transform = 'translate(-50%, -50%) scale(1)';

                        const iconCont = el.querySelector('.icon-container') as HTMLElement;
                        const textCont = el.querySelector('.text-container') as HTMLElement;

                        if (!isActive) {
                            if (iconCont) {
                                iconCont.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
                                iconCont.style.borderColor = 'rgba(255,255,255,0.2)';
                                iconCont.style.color = 'white';
                            }
                            if (textCont) {
                                textCont.style.color = 'white';
                                textCont.style.textShadow = '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)';
                            }
                        } else {
                            // Revert to the active state glow
                            if (iconCont) {
                                iconCont.style.boxShadow = '0 0 20px rgba(252,228,170,0.8)';
                                iconCont.style.borderColor = 'rgba(252,228,170,0.8)';
                                iconCont.style.color = '#fce4aa';
                            }
                            if (textCont) {
                                textCont.style.color = '#fce4aa';
                                textCont.style.textShadow = '0 0 15px rgba(252,228,170,0.8)';
                            }
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
