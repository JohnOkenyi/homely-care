"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface BreathingCircleProps {
    isPaused: boolean;
    onComplete: () => void;
}

type Phase = "inhale" | "hold" | "exhale";

export default function BreathingCircle({ isPaused, onComplete }: BreathingCircleProps) {
    const [phase, setPhase] = useState<Phase>("inhale");
    const [phaseTimeRemaining, setPhaseTimeRemaining] = useState(4);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const totalDuration = 60;

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isPaused) {
            if (timerRef.current) clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setSecondsElapsed((prev) => {
                if (prev >= totalDuration - 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    onComplete();
                    return totalDuration;
                }
                return prev + 1;
            });

            setPhaseTimeRemaining((prev) => {
                if (prev <= 1) {
                    setPhase((currentPhase) => {
                        if (currentPhase === "inhale") {
                            setPhaseTimeRemaining(4);
                            return "hold";
                        } else if (currentPhase === "hold") {
                            setPhaseTimeRemaining(6);
                            return "exhale";
                        } else {
                            setPhaseTimeRemaining(4);
                            return "inhale";
                        }
                    });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, onComplete]);

    const getGuidanceText = () => {
        switch (phase) {
            case "inhale": return "Breathe in";
            case "hold": return "Hold gently";
            case "exhale": return "Release";
        }
    };

    // Animation values
    const scale = phase === "inhale" ? 1.15 : phase === "hold" ? 1.15 : 0.85;
    const particleOpacity = phase === "inhale" ? 0.8 : phase === "hold" ? 1 : 0.4;
    const duration = phase === "exhale" ? 6 : 4;

    // Generate static particles for the digital effect
    const particles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        delay: i * 0.1
    }));

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-0 relative">
            {/* Particle Ring - Artistic Digital Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={false}
                        animate={{
                            scale: phase === "inhale" ? [1, 1.4, 1.2] : phase === "hold" ? 1.2 : 0.8,
                            opacity: particleOpacity,
                            rotate: [p.angle, p.angle + 360],
                        }}
                        transition={{
                            scale: { duration, ease: "easeInOut" },
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute w-[1.2px] h-[1.2px] bg-[#A878FF] rounded-full shadow-[0_0_5px_#A878FF]"
                        style={{
                            transform: `rotate(${p.angle}deg) translateY(var(--particle-translate, -85px))`
                        }}
                    />
                ))}
                <style jsx>{`
                    div :global(.absolute.w-\[1\.2px\]) {
                        --particle-translate: -110px;
                    }
                    @media (min-width: 640px) {
                        div :global(.absolute.w-\[1\.2px\]) {
                            --particle-translate: -85px;
                        }
                    }
                `}</style>
            </div>

            {/* Orb Wrapper - Responsive sizing */}
            <div className="w-full flex justify-center items-center py-1">
                <div
                    className="relative flex items-center justify-center transition-all ease-in-out w-[210px] h-[210px] sm:w-[170px] sm:h-[170px]"
                    style={{
                        aspectRatio: "1/1"
                    }}
                >
                    {/* Orb Implementation */}
                    <motion.div
                        animate={{ scale }}
                        transition={{ duration, ease: "easeInOut" }}
                        className="orb-container relative w-full h-full rounded-full flex items-center justify-center transition-all overflow-visible"
                        style={{
                            borderRadius: "999px",
                            background: "radial-gradient(circle at 30% 30%, #4C1D95 0%, #1E1B4B 100%)",
                            boxShadow: "0 0 30px rgba(168, 120, 255, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        {/* Digital Grid Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none rounded-full"
                            style={{ backgroundImage: "linear-gradient(#A878FF 1px, transparent 1px), linear-gradient(90deg, #A878FF 1px, transparent 1px)", backgroundSize: "12px 12px" }}
                        />

                        {/* Holographic Glowing Core */}
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-4 rounded-full"
                            style={{
                                background: "radial-gradient(circle at center, rgba(168, 120, 255, 0.3) 0%, transparent 70%)",
                                filter: "blur(15px)"
                            }}
                        />

                        {/* Internal Text - Responsive Scaling */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full select-none">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={phase}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-[10px] sm:text-[9px] text-white uppercase tracking-[0.25em] font-black mb-1 drop-shadow-[0_0_8px_rgba(168,120,255,0.8)]">
                                        {getGuidanceText()}
                                    </span>
                                    <span className="text-4xl sm:text-3xl font-light text-white tabular-nums tracking-tighter drop-shadow-lg leading-none">
                                        {String(phaseTimeRemaining).padStart(2, '0')}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Session Progress - Larger on Mobile */}
            <div className="mt-4 flex flex-col items-center opacity-40 sm:opacity-30 select-none">
                <span className="text-[9px] sm:text-[7px] uppercase tracking-[0.2em] text-[#D6B36A] font-bold">Time Left</span>
                <div className="text-white text-[10px] sm:text-[8px] font-medium tabular-nums">
                    {Math.floor((totalDuration - secondsElapsed) / 60)}:{String((totalDuration - secondsElapsed) % 60).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
