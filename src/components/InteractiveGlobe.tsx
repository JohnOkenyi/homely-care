"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Home, HeartHandshake, UserCheck, ShieldCheck, Activity } from "lucide-react";

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

    const fixedLabels = useMemo(() => [
        { text: "Home Care", top: "20%", left: "50%", icon: <Home size={20} /> },
        { text: "Residential &\nNursing Support", top: "35%", left: "75%", icon: <HeartHandshake size={20} /> },
        { text: "Live-in Care", top: "65%", left: "25%", icon: <UserCheck size={20} /> },
        { text: "Supported\nLiving", top: "75%", left: "70%", icon: <ShieldCheck size={20} /> },
        { text: "TDDI &\nHomely care", top: "45%", left: "20%", icon: <Activity size={20} /> },
    ], []);

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
    }, [dimensions]); // Added dimensions as dependency so rotation resets on load if needed

    return (
        <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
            <Globe
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            />

            {/* Overlay the non-spinning static markers */}
            {fixedLabels.map((label, i) => (
                <FixedLabel
                    key={i}
                    {...label}
                    onHover={(hoverState: boolean) => {
                        if (globeEl.current) {
                            globeEl.current.controls().autoRotate = !hoverState;
                        }
                    }}
                />
            ))}
        </div>
    );
}

// Sub-component to manage its own hover/active states beautifully
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FixedLabel({ text, top, left, icon, onHover }: any) {
    const [isActive, setIsActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const activeOrHover = isHovered || isActive;

    return (
        <div
            className="absolute flex flex-col items-center gap-1 cursor-pointer transition-all duration-300 z-50 pointer-events-auto"
            style={{
                top,
                left,
                transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`,
                color: activeOrHover ? '#fce4aa' : 'white',
                textShadow: activeOrHover ? '0 0 25px rgba(252,228,170,1)' : '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)'
            }}
            onClick={() => setIsActive(!isActive)}
            onMouseEnter={() => { setIsHovered(true); onHover(true); }}
            onMouseLeave={() => { setIsHovered(false); onHover(false); }}
        >
            <div
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full backdrop-blur-sm transition-all duration-300"
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: `1px solid ${activeOrHover ? 'rgba(252,228,170,1)' : 'rgba(255,255,255,0.2)'}`,
                    boxShadow: activeOrHover ? '0 0 30px rgba(252,228,170,1)' : '0 4px 10px rgba(0,0,0,0.3)'
                }}
            >
                {icon}
            </div>
            <span className="font-bold text-[14px] leading-[1.2] tracking-wider text-center whitespace-pre-line transition-all duration-300">
                {text}
            </span>
        </div>
    );
}
