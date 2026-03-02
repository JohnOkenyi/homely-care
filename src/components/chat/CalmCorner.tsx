"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Wind } from "lucide-react";
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
        <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
            <AnimatePresence mode="wait">
                {mode === "intro" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-[#5B2A86]/5 flex items-center justify-center">
                            <Wind className="w-10 h-10 text-[#5B2A86] opacity-30" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-light text-[#1B1326]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                Calm Corner
                            </h2>
                            <p className="text-sm text-[#1B1326]/60 font-light">
                                Take 60 seconds to reset.
                            </p>
                        </div>

                        <button
                            onClick={handleStart}
                            className="flex items-center gap-2 px-8 py-3 rounded-full text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-lg shadow-[#5B2A86]/20"
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
                        className="flex-1 flex flex-col relative"
                    >
                        <BreathingCircle isPaused={isPaused} onComplete={handleComplete} />

                        {/* Controls */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="w-10 h-10 rounded-full bg-[#F4F2EF] flex items-center justify-center text-[#5B2A86] hover:bg-[#5B2A86]/10 transition-colors"
                                title={isPaused ? "Resume" : "Pause"}
                            >
                                {isPaused ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <Pause className="w-4 h-4 fill-current" />}
                            </button>
                            <button
                                onClick={handleReset}
                                className="w-10 h-10 rounded-full bg-[#F4F2EF] flex items-center justify-center text-[#5B2A86] hover:bg-[#5B2A86]/10 transition-colors"
                                title="Reset"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {mode === "guidance" && (
                    <motion.div
                        key="guidance"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1"
                    >
                        <CareGuideFlow onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Aesthetic Gradient */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: "radial-gradient(circle at center, #5B2A86, transparent)" }} />
        </div>
    );
}
