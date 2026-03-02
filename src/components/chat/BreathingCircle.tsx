"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface BreathingCircleProps {
    isPaused: boolean;
    onComplete: () => void;
}

export default function BreathingCircle({ isPaused, onComplete }: BreathingCircleProps) {
    const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        if (isPaused) return;

        const totalDuration = 60; // 60 seconds total
        const timer = setInterval(() => {
            setSecondsElapsed((prev) => {
                if (prev >= totalDuration) {
                    clearInterval(timer);
                    onComplete();
                    return totalDuration;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isPaused, onComplete]);

    useEffect(() => {
        if (isPaused) return;

        // Phase cycle: 4s inhale, 4s hold, 6s exhale = 14s total cycle
        const cycleTime = secondsElapsed % 14;

        if (cycleTime < 4) {
            setPhase("inhale");
        } else if (cycleTime < 8) {
            setPhase("hold");
        } else {
            setPhase("exhale");
        }
    }, [secondsElapsed, isPaused]);

    const getGuidanceText = () => {
        switch (phase) {
            case "inhale": return "Breathe in...";
            case "hold": return "Hold gently...";
            case "exhale": return "Release...";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 h-full space-y-8">
            <div className="relative flex items-center justify-center w-64 h-64">
                {/* Outer Halo */}
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.4 : phase === "hold" ? 1.4 : 1,
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: phase === "inhale" ? 4 : phase === "hold" ? 4 : 6,
                        ease: "easeInOut",
                    }}
                    className="absolute w-full h-full rounded-full bg-[#5B2A86]/10 blur-2xl"
                />

                {/* Outer Glow */}
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.2 : phase === "hold" ? 1.2 : 1,
                        opacity: phase === "hold" ? 0.6 : 0.4
                    }}
                    transition={{
                        duration: phase === "inhale" ? 4 : phase === "hold" ? 4 : 6,
                        ease: "easeInOut",
                    }}
                    className="absolute w-40 h-40 rounded-full bg-[#7A4FB3]/20 blur-xl"
                />

                {/* Main Circle */}
                <motion.div
                    animate={{
                        scale: phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 1,
                    }}
                    transition={{
                        duration: phase === "inhale" ? 4 : phase === "hold" ? 4 : 6,
                        ease: "easeInOut",
                    }}
                    className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(91,42,134,0.3)]"
                    style={{
                        background: "linear-gradient(135deg, #5B2A86, #7A4FB3)",
                        border: "1px solid rgba(255, 255, 255, 0.1)"
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-white/5" />
                </motion.div>
            </div>

            <div className="h-12 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={phase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-lg font-light text-[#1B1326] tracking-wide"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                        {getGuidanceText()}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-[200px] h-1 bg-[#F4F2EF] rounded-full overflow-hidden">
                <motion.div
                    animate={{ width: `${(secondsElapsed / 60) * 100}%` }}
                    className="h-full bg-[#D6B36A] rounded-full"
                />
            </div>
        </div>
    );
}
