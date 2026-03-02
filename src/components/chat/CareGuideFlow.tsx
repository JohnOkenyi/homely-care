"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Heart, Users, Home, Clipboard, UserPlus, Info } from "lucide-react";

interface CareGuideFlowProps {
    onReset: () => void;
}

type Step = "completion" | "who" | "type" | "recommendation";

export default function CareGuideFlow({ onReset }: CareGuideFlowProps) {
    const [step, setStep] = useState<Step>("completion");
    const [who, setWho] = useState<"self" | "loved_one" | null>(null);
    const [supportType, setSupportType] = useState<string | null>(null);

    const nextStep = () => {
        if (step === "completion") setStep("who");
        else if (step === "who") setStep("type");
        else if (step === "type") setStep("recommendation");
    };

    const handleWhoSelection = (selection: "self" | "loved_one") => {
        setWho(selection);
        setStep("type");
    };

    const handleTypeSelection = (type: string) => {
        setSupportType(type);
        setStep("recommendation");
    };

    const getRecommendation = () => {
        const target = who === "self" ? "you" : "your loved one";
        switch (supportType) {
            case "Help at home occasionally":
                return {
                    title: "Home Care",
                    text: `Based on what you shared, Home Care may be the best starting point for ${target}.`,
                    link: "/services#home-care",
                };
            case "Full-time support":
                return {
                    title: "Live-in Care",
                    text: `Based on what you shared, Live-in Care may be the best starting point for ${target}.`,
                    link: "/services#live-in-care",
                };
            case "Specialist or complex care":
                return {
                    title: "TDDI / Complex Care",
                    text: `Based on what you shared, specialist TDDI / Complex Care may be the best starting point for ${target}.`,
                    link: "/services#complex-care",
                };
            default:
                return {
                    title: "Services Overview",
                    text: "Based on what you shared, exploring our full range of services would be a great first step.",
                    link: "/services",
                };
        }
    };

    return (
        <div className="flex flex-col h-full justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
                {step === "completion" && (
                    <motion.div
                        key="completion"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-4 px-6"
                    >
                        <h2 className="text-3xl font-light text-[#D6B36A]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                            ✨ Well done.
                        </h2>
                        <p className="text-sm text-white/60 font-light tracking-wide">
                            You&apos;ve taken a moment to reset.
                        </p>
                        {/* Auto advance after 2s */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="h-0.5 bg-[#D6B36A]/20 max-w-[100px] mx-auto mt-6"
                            onAnimationComplete={() => setTimeout(nextStep, 500)}
                        />
                    </motion.div>
                )}

                {(step === "who" || step === "type") && (
                    <motion.div
                        key="questionnaire"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 bg-white flex flex-col p-6 space-y-6"
                    >
                        <div className="text-center pt-4">
                            <h2 className="text-xl font-medium text-[#1B1326] mb-2">
                                {step === "who" ? "Can we help today?" : "What kind of support?"}
                            </h2>
                            <p className="text-xs text-[#1B1326]/50">
                                {step === "who" ? "Can we help you or someone you care about?" : "What kind of support are you exploring?"}
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pb-4" style={{ scrollbarWidth: 'none' }}>
                            {step === "who" ? (
                                <>
                                    <button
                                        onClick={() => handleWhoSelection("self")}
                                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-[#5B2A86]/10 hover:border-[#5B2A86]/30 hover:bg-[#5B2A86]/5 transition-all text-left group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#5B2A86]/10 flex items-center justify-center text-[#5B2A86] group-hover:scale-110 transition-transform">
                                            <Heart className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-semibold text-[#1B1326]">I need support for myself</span>
                                    </button>
                                    <button
                                        onClick={() => handleWhoSelection("loved_one")}
                                        className="w-full flex items-center gap-4 p-5 rounded-2xl border border-[#5B2A86]/10 hover:border-[#5B2A86]/30 hover:bg-[#5B2A86]/5 transition-all text-left group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#5B2A86]/10 flex items-center justify-center text-[#5B2A86] group-hover:scale-110 transition-transform">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-semibold text-[#1B1326]">Support for a loved one</span>
                                    </button>
                                </>
                            ) : (
                                [
                                    { label: "Help at home occasionally", icon: Home },
                                    { label: "Full-time support", icon: UserPlus },
                                    { label: "Specialist or complex care", icon: Clipboard },
                                    { label: "Just exploring options", icon: Info },
                                ].map((opt) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => handleTypeSelection(opt.label)}
                                        className="w-full flex items-center gap-3 p-4 rounded-xl border border-[#1B1326]/5 hover:border-[#5B2A86]/20 hover:bg-[#F7F5F2] transition-all text-left group"
                                    >
                                        <opt.icon className="w-5 h-5 text-[#5B2A86]/40 group-hover:text-[#5B2A86] transition-colors" />
                                        <span className="text-xs font-semibold text-[#1B1326]">{opt.label}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}

                {step === "recommendation" && (
                    <motion.div
                        key="recommendation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 bg-[#FAFAF8] flex flex-col"
                    >
                        <div className="flex-1 p-6 flex flex-col justify-center space-y-6">
                            <div className="text-center space-y-2">
                                <h3 className="text-[#1B1326]/40 text-[10px] uppercase tracking-widest font-black">Well done. Need support today?</h3>
                            </div>

                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#5B2A86]/5 rounded-full -mr-12 -mt-12 blur-xl" />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#D6B36A]">
                                        <ArrowRight className="w-4 h-4" />
                                        <span className="text-[9px] uppercase tracking-[0.2em] font-black">Recommendation</span>
                                    </div>
                                    <h3 className="text-2xl font-light text-[#5B2A86]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                        {getRecommendation().title}
                                    </h3>
                                    <p className="text-sm text-[#1B1326]/70 font-light leading-relaxed">
                                        {getRecommendation().text}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href="/contact-us"
                                    className="w-full py-4 bg-[#5B2A86] text-white rounded-2xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-[#5B2A86]/20 hover:scale-[1.02] transition-all"
                                >
                                    Request Care Consultation
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href={getRecommendation().link}
                                    className="w-full py-4 bg-white border border-[#1B1326]/10 text-[#1B1326] rounded-2xl text-center text-xs font-bold tracking-widest uppercase hover:bg-[#FAFAF8] transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={onReset}
                            className="bg-white border-t border-black/5 p-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#1B1326]/30 font-black hover:text-[#5B2A86] transition-colors"
                        >
                            Return to Calm Corner
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
