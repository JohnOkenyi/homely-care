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
                    // Phase switch logic
                    setPhase((currentPhase) => {
                        if (currentPhase === "inhale") {
                            setPhaseTimeRemaining(4); // Hold for 4s
                            return "hold";
                        } else if (currentPhase === "hold") {
                            setPhaseTimeRemaining(6); // Exhale for 6s
                            return "exhale";
                        } else {
                            setPhaseTimeRemaining(4); // Inhale for 4s
                            return "inhale";
                        }
                    });
                    return 0; // Will be set in the setPhase block above
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
            case "inhale": return 1.15;
            case "hold": return 1.15;
            case "exhale": return 0.85;
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
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10 relative overflow-hidden">
            {/* Starry Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse" />
                <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#D6B36A]/20 rounded-full blur-sm" />
            </div>

            <div className="relative flex items-center justify-center w-72 h-72">
                {/* Glow & Halo */}
                <motion.div
                    animate={{
                        scale: getScale() * 1.3,
                        opacity: phase === "hold" ? 0.3 : [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: getDuration(),
                        ease: "linear",
                    }}
                    className="absolute w-full h-full rounded-full bg-[#7A4FB3]/20 blur-3xl"
                />

                {/* Main Circle */}
                <motion.div
                    animate={{
                        scale: getScale(),
                    }}
                    transition={{
                        duration: getDuration(),
                        ease: "linear",
                    }}
                    className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(91,42,134,0.4)] overflow-hidden"
                    style={{
                        background: "radial-gradient(circle at 30% 30%, #7A4FB3, #5B2A86)",
                        border: "1px solid rgba(255, 255, 255, 0.15)"
                    }}
                >
                    {/* Inner Texture/Glaze */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

                    {/* Inner Text Guidance */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-col items-center text-center space-y-2 z-10"
                        >
                            <span className="text-white/90 text-sm font-light tracking-widest uppercase">
                                {getGuidanceText().split('...')[0]}
                            </span>
                            <span className="text-white text-5xl font-light tabular-nums">
                                {String(phaseTimeRemaining).padStart(2, '0')}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Soft inner glow overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </motion.div>
            </div>

            {/* Session Timer & Progress */}
            <div className="flex flex-col items-center space-y-3 z-20">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1B1326]/40 font-bold mb-1">Session Progress</span>
                    <span className="text-[#1B1326]/60 text-xs font-medium tabular-nums">
                        {Math.floor((totalDuration - secondsElapsed) / 60)}:
                        {String((totalDuration - secondsElapsed) % 60).padStart(2, '0')}
                        <span className="ml-1 text-[9px] text-[#1B1326]/30">Remaining</span>
                    </span>
                </div>
                <div className="w-48 h-1 bg-[#F4F2EF] rounded-full overflow-hidden shadow-inner">
                    <motion.div
                        animate={{ width: `${(secondsElapsed / totalDuration) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#5B2A86] to-[#D6B36A] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}
