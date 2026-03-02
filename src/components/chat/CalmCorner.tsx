"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Wind } from "lucide-react";
import BreathingCircle from "./BreathingCircle";
import CareGuideFlow from "./CareGuideFlow";

export default function CalmCorner() {
    const [mode, setMode] = useState<"intro" | "breathing" | "guidance">("intro");
    const [isPaused, setIsPaused] = useState(false);

    const handleStart = () => {
        setMode("breathing");
        setIsPaused(false);
    };

    const handleComplete = () => {
        setMode("guidance");
    };

    const handleReset = () => {
        setMode("intro");
        setIsPaused(false);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1B1326] relative">
            {/* Background Aesthetic - Deep Dark Theme for Calm Corner */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.15]" style={{ background: "radial-gradient(circle at center, #5B2A86 0%, #1B1326 70%)" }} />
                {/* Subtle Starry texture overlay */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>

            <AnimatePresence mode="wait">
                {mode === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8 z-10"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                            <Wind className="w-10 h-10 text-[#D6B36A] opacity-80" />
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-3xl font-light text-[#D6B36A]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                Calm Corner
                            </h2>
                            <p className="text-sm text-white/50 font-light tracking-wide max-w-[200px] mx-auto">
                                Take 60 seconds to reset your mind and body.
                            </p>
                        </div>

                        <button
                            onClick={handleStart}
                            className="flex items-center gap-3 px-10 py-4 rounded-full text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#5B2A86]/40"
                            style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Begin Session
                        </button>
                    </motion.div>
                )}

                {mode === "breathing" && (
                    <motion.div
                        key="breathing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col relative z-10 pt-8"
                    >
                        {/* Header during session */}
                        <div className="text-center space-y-1 mb-2">
                            <h2 className="text-2xl font-light text-[#D6B36A]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                Calm Corner
                            </h2>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                Take 60 seconds to reset.
                            </p>
                        </div>

                        <BreathingCircle isPaused={isPaused} onComplete={handleComplete} />

                        {/* Controls - Styled as per screenshot */}
                        <div className="shrink-0 pb-10 flex items-center justify-center gap-3">
                            <button
                                onClick={handleStart} // Start/Resume effectively
                                disabled={!isPaused}
                                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${!isPaused ? "bg-white/10 text-white/20 border border-white/5" : "bg-gradient-to-r from-[#D6B36A] to-[#B8924A] text-[#1B1326] shadow-lg shadow-[#D6B36A]/20"}`}
                            >
                                Start
                            </button>
                            <button
                                onClick={() => setIsPaused(true)}
                                disabled={isPaused}
                                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${isPaused ? "bg-white/10 text-white/20 border border-white/5" : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"}`}
                            >
                                Pause
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </motion.div>
                )}

                {mode === "guidance" && (
                    <motion.div
                        key="guidance"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 z-10"
                    >
                        <CareGuideFlow onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
