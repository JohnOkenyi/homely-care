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
            case "inhale": return "Breathe in...";
            case "hold": return "Hold gently...";
            case "exhale": return "Release...";
        }
    };

    // State derived CSS values for the Premium Orb
    const scale = phase === "inhale" ? 1.12 : phase === "hold" ? 1.12 : 0.92;
    const halo = phase === "inhale" ? 0.95 : phase === "hold" ? 0.85 : 0.70;
    const duration = phase === "exhale" ? 6 : 4;

    return (
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0" style={{ gap: "24px" }}>
            {/* Orb Wrapper - Ensuring no cropping */}
            <div className="w-full flex justify-center items-center py-4" style={{ marginTop: "10px", marginBottom: "10px" }}>
                <div
                    className="relative flex items-center justify-center transition-all ease-in-out"
                    style={{
                        width: "min(240px, 70%)",
                        aspectRatio: "1/1",
                        maxHeight: "45vh" // Safe-constraint to prevent vertical overflow/clipping
                    }}
                >
                    {/* Orb Implementation with EXACT requested premium CSS */}
                    <div
                        className="orb-container relative w-full h-full rounded-full flex items-center justify-center transition-all bg-no-repeat"
                        style={{
                            borderRadius: "999px",
                            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), rgba(168,120,255,0.28) 25%, rgba(120,70,210,0.50) 55%, rgba(60,25,120,0.90) 100%)",
                            boxShadow: "0 0 0 1px rgba(255,255,255,0.08) inset, 0 22px 60px rgba(0,0,0,0.35), 0 0 70px rgba(168,120,255,0.35)",
                            transform: `scale(${scale})`,
                            transition: `transform ${duration}s ease-in-out`
                        } as React.CSSProperties}
                    >
                        {/* Orb::before (Halo) */}
                        <div
                            className="absolute rounded-full transition-opacity"
                            style={{
                                inset: "-22%",
                                background: "radial-gradient(circle, rgba(200,160,255,0.22), rgba(200,160,255,0.08) 40%, rgba(200,160,255,0.00) 70%)",
                                filter: "blur(10px)",
                                opacity: halo,
                                transition: "opacity 2s ease-in-out",
                                pointerEvents: "none",
                                zIndex: -1
                            }}
                        />

                        {/* Orb::after (Highlight Glaze) */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                inset: "10%",
                                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18), rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.0) 70%)",
                                filter: "blur(1px)",
                                opacity: 0.9,
                                pointerEvents: "none"
                            }}
                        />

                        {/* Phase Text & Countdown on top of Orb */}
                        <div className="relative z-10 text-center select-none px-4" style={{ textShadow: "0 8px 24px rgba(0,0,0,0.45)" }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={phase}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="flex flex-col items-center"
                                >
                                    <span className="text-white text-[12px] sm:text-[14px] font-medium tracking-[0.1em] uppercase mb-1">
                                        {getGuidanceText()}
                                    </span>
                                    <span className="text-white text-3xl sm:text-4xl font-light tabular-nums">
                                        {String(phaseTimeRemaining).padStart(2, '0')}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Session Status Display */}
            <div className="flex flex-col items-center gap-1.5 opacity-60 pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6B36A] font-bold">Session Progress</span>
                <div className="text-white text-xs font-light tabular-nums">
                    {Math.floor((totalDuration - secondsElapsed) / 60)}:
                    {String((totalDuration - secondsElapsed) % 60).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
