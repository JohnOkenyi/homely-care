"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// KEY FIX: Dynamically import GlobeInner (which directly imports react-globe.gl)
// When using dynamic() in Next.js, the ref doesn't forward to the actual globe instance.
// The fix is a two-file pattern: this wrapper uses dynamic(), and GlobeInner.tsx uses
// direct import - so the ref inside GlobeInner correctly accesses controls().
const GlobeInner = dynamic(() => import("./GlobeInner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  ),
});

export default function InteractiveGlobe() {
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

  return (
    <div className="relative flex items-center justify-center w-full h-full pointer-events-auto">
      <GlobeInner width={dimensions.width} height={dimensions.height} />
    </div>
  );
}
