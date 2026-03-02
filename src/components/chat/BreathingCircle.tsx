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

    const getScale = () => {
        switch (phase) {
            case "inhale": return 1.12;
            case "hold": return 1.12;
            case "exhale": return 0.88;
        }
    };

    const getDuration = () => {
        switch (phase) {
            case "inhale": return 4;
            case "hold": return 4;
            case "exhale": return 6;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-4 space-y-8 w-full">
            {/* The Orb Container */}
            <div className="relative flex items-center justify-center w-[clamp(180px,55vw,220px)] aspect-square max-h-[30vh]">

                {/* Outer Halo Glow */}
                <motion.div
                    animate={{
                        scale: getScale() * 1.25,
                        opacity: phase === "inhale" ? [0.15, 0.35] : phase === "exhale" ? [0.35, 0.15] : 0.35,
                    }}
                    transition={{
                        duration: getDuration(),
                        ease: "easeInOut",
                    }}
                    className="absolute inset-[-20%] rounded-full bg-[#7A4FB3]/25 blur-3xl"
                />

                {/* Second Halo Layer */}
                <motion.div
                    animate={{
                        scale: getScale() * 1.1,
                        opacity: phase === "hold" ? 0.3 : 0.2,
                    }}
                    transition={{
                        duration: getDuration(),
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full border border-[#D6B36A]/20 blur-sm"
                />

                {/* Main Premium Orb */}
                <motion.div
                    animate={{
                        scale: getScale(),
                    }}
                    transition={{
                        duration: getDuration(),
                        ease: "easeInOut",
                    }}
                    className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(91,42,134,0.5)]"
                    style={{
                        background: "radial-gradient(circle at 35% 35%, #9b6dd3 0%, #5B2A86 45%, #3e1b5c 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.12)"
                    }}
                >
                    {/* Inner highlighting glaze */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    {/* Centered Phase Text */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center justify-center text-center px-4"
                        >
                            <span className="text-white font-light tracking-widest uppercase text-[10px] sm:text-[12px] mb-1 opacity-90" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                {getGuidanceText()}
                            </span>
                            <span className="text-[#D6B36A] text-2xl sm:text-3xl font-light tabular-nums drop-shadow-sm">
                                {String(phaseTimeRemaining).padStart(2, '0')}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Countdown / Progress */}
            <div className="flex flex-col items-center space-y-2">
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#1B1326]/40 font-bold">
                    Session Progress
                </div>
                <div className="text-[#1B1326]/60 text-xs font-medium tabular-nums px-3 py-1 bg-[#F4F2EF] rounded-full">
                    {Math.floor((totalDuration - secondsElapsed) / 60)}:
                    {String((totalDuration - secondsElapsed) % 60).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
