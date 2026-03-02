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

    const steps: Record<Step, { title: string; subtitle: string }> = {
        completion: {
            title: "✨ Well done.",
            subtitle: "You've taken a moment to reset.",
        },
        who: {
            title: "How can we help?",
            subtitle: "Can we help you or someone you care about today?",
        },
        type: {
            title: "Support Type",
            subtitle: "What kind of support are you exploring?",
        },
        recommendation: {
            title: "Our Recommendation",
            subtitle: "Based on what you shared...",
        },
    };

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
        <div className="flex flex-col h-full bg-white p-6 justify-center">
            <AnimatePresence mode="wait">
                {step === "completion" && (
                    <motion.div
                        key="completion"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-2xl font-light text-[#5B2A86]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                            {steps.completion.title}
                        </h2>
                        <p className="text-sm text-[#1B1326]/60 font-light">
                            {steps.completion.subtitle}
                        </p>
                        {/* Auto advance after 2s */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            onAnimationComplete={() => setTimeout(nextStep, 2000)}
                        />
                    </motion.div>
                )}

                {step === "who" && (
                    <motion.div
                        key="who"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-[#1B1326] mb-2">{steps.who.title}</h2>
                            <p className="text-xs text-[#1B1326]/50">{steps.who.subtitle}</p>
                        </div>
                        <div className="grid gap-3">
                            <button
                                onClick={() => handleWhoSelection("self")}
                                className="flex items-center gap-4 p-4 rounded-xl border border-[#5B2A86]/10 hover:border-[#5B2A86]/30 hover:bg-[#5B2A86]/5 transition-all text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#5B2A86]/10 flex items-center justify-center text-[#5B2A86] group-hover:scale-110 transition-transform">
                                    <Heart className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-[#1B1326]">I need support for myself</span>
                            </button>
                            <button
                                onClick={() => handleWhoSelection("loved_one")}
                                className="flex items-center gap-4 p-4 rounded-xl border border-[#5B2A86]/10 hover:border-[#5B2A86]/30 hover:bg-[#5B2A86]/5 transition-all text-left group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#5B2A86]/10 flex items-center justify-center text-[#5B2A86] group-hover:scale-110 transition-transform">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-[#1B1326]">I&apos;m looking for care for a loved one</span>
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === "type" && (
                    <motion.div
                        key="type"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-[#1B1326] mb-2">{steps.type.title}</h2>
                            <p className="text-xs text-[#1B1326]/50">{steps.type.subtitle}</p>
                        </div>
                        <div className="grid gap-2">
                            {[
                                { label: "Help at home occasionally", icon: Home },
                                { label: "Full-time support", icon: UserPlus },
                                { label: "Specialist or complex care", icon: Clipboard },
                                { label: "Just exploring options", icon: Info },
                            ].map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => handleTypeSelection(opt.label)}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-[#1B1326]/5 hover:border-[#5B2A86]/20 hover:bg-[#F7F5F2] transition-all text-left group"
                                >
                                    <opt.icon className="w-4 h-4 text-[#5B2A86]/40 group-hover:text-[#5B2A86] transition-colors" />
                                    <span className="text-xs font-medium text-[#1B1326]">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {step === "recommendation" && (
                    <motion.div
                        key="recommendation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="bg-[#5B2A86] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-all duration-500" />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2 text-[#D6B36A]">
                                    <ArrowRight className="w-4 h-4" />
                                    <span className="text-[10px] uppercase tracking-widest font-black">Personalised Path</span>
                                </div>
                                <h3 className="text-xl font-light" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                    {getRecommendation().title}
                                </h3>
                                <p className="text-sm text-white/80 font-light leading-relaxed">
                                    {getRecommendation().text}
                                </p>

                                <div className="flex flex-col gap-2 pt-2">
                                    <a
                                        href={getRecommendation().link}
                                        className="w-full py-3 bg-[#D6B36A] text-[#1B1326] rounded-xl text-center text-xs font-bold tracking-wider uppercase hover:bg-[#D6B36A]/90 transition-colors"
                                    >
                                        Learn More
                                    </a>
                                    <a
                                        href="/contact-us"
                                        className="w-full py-3 bg-white/10 text-white rounded-xl text-center text-xs font-bold tracking-wider uppercase hover:bg-white/20 transition-colors backdrop-blur-sm"
                                    >
                                        Request Consultation
                                    </a>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onReset}
                            className="w-full text-center text-[10px] uppercase tracking-widest text-[#1B1326]/30 font-bold hover:text-[#5B2A86] transition-colors"
                        >
                            Reset Session
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
