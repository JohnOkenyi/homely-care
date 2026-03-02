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
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
                        className="absolute w-[2px] h-[2px] bg-[#A878FF] rounded-full shadow-[0_0_8px_#A878FF]"
                        style={{
                            transform: `rotate(${p.angle}deg) translateY(-140px)`
                        }}
                    />
                ))}
            </div>

            {/* Orb Wrapper */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    animate={{ scale }}
                    transition={{ duration, ease: "easeInOut" }}
                    className="relative flex items-center justify-center rounded-full overflow-hidden"
                    style={{
                        width: "min(220px, 60vw)",
                        aspectRatio: "1/1",
                        background: "radial-gradient(circle at 30% 30%, #4C1D95 0%, #1E1B4B 100%)",
                        boxShadow: "0 0 40px rgba(168, 120, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)"
                    }}
                >
                    {/* Digital Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(#A878FF 1px, transparent 1px), linear-gradient(90deg, #A878FF 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                    />

                    {/* Holographic Glowing Core */}
                    <motion.div
                        animate={{
                            opacity: [0.4, 0.7, 0.4],
                            scale: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-4 rounded-full"
                        style={{
                            background: "radial-gradient(circle at center, rgba(168, 120, 255, 0.4) 0%, transparent 70%)",
                            filter: "blur(20px)"
                        }}
                    />

                    {/* Internal Text - Fixed Spacing to prevent overlap */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full select-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={phase}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[10px] sm:text-[11px] text-[#A878FF]/80 uppercase tracking-[0.3em] font-bold mb-4">
                                    {getGuidanceText()}
                                </span>
                                <span className="text-4xl sm:text-5xl font-light text-white tabular-nums tracking-tighter">
                                    {String(phaseTimeRemaining).padStart(2, '0')}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* Session Progress - Pushed down slightly more */}
            <div className="mt-12 flex flex-col items-center gap-1 opacity-40 select-none">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#D6B36A] font-bold">Session Time</span>
                <div className="text-white text-[10px] font-medium tabular-nums">
                    {Math.floor((totalDuration - secondsElapsed) / 60)}:{String((totalDuration - secondsElapsed) % 60).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
