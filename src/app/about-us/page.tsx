"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

export default function AboutUs() {
    return (
        <main className="min-h-screen bg-[#F7F5F2]">
            <Navbar />

            {/* HERO SECTION - Cinematic Breadcrumb */}
            <section className="relative h-[45vh] lg:h-[50vh] flex items-center justify-center overflow-hidden bg-premium-dark">
                <Image
                    src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Interior"
                    fill
                    className="object-cover opacity-40 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1B1326]/60 to-[#1B1326]" />

                <div className="grid-container relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-[#D6B36A] text-[10px] tracking-[0.6em] uppercase block mb-8 font-bold"
                    >
                        Established with Purpose
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="Heading-H1 text-white"
                    >
                        Our <span className="Heading-Serif italic font-light">Heritage</span>
                    </motion.h1>
                </div>
            </section>

            {/* MANIFESTO SECTION - Warm Ivory Background */}
            <section className="section-padding">
                <div className="grid-container w-full max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
                                    alt="Caring interaction"
                                    fill
                                    className="object-cover transition-transform duration-[10s] hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#5B2A86]/10 mix-blend-overlay" />
                            </motion.div>
                            {/* Accent Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D6B36A]/20 rounded-full blur-3xl" />
                        </div>

                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5B2A86] content-gap-sm block">The Homely Manifesto</span>
                                <h2 className="Heading-H2 text-[#1B1326] mb-10">
                                    Redefining the <br />
                                    <span className="Heading-Serif italic font-light text-[#5B2A86]">Gold Standard</span> of Home Care.
                                </h2>
                                <div className="space-y-8 text-lg font-light text-[#1B1326]/70 leading-relaxed">
                                    <p>
                                        Founded on the belief that every individual deserves to age with dignity and grace, Homely Health Care was established to bridge the gap between clinical excellence and emotional warmth.
                                    </p>
                                    <p>
                                        We don&apos;t just provide services; we cultivate relationships. Our approach is deeply personal, ensuring that the care we deliver feels less like a clinical intervention and more like an extension of family.
                                    </p>
                                    <blockquote className="border-l-2 border-[#D6B36A] pl-8 py-4 my-12 italic text-2xl text-[#5B2A86] Heading-Serif font-light">
                                        &ldquo;Our mission is to create a world where home care is synonymous with sanctuary.&rdquo;
                                    </blockquote>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PILLARS SECTION - Glassmorphism on Dark */}
            <section className="section-padding bg-premium-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B2A86]/10 rounded-full blur-[160px]" />

                <div className="grid-container relative z-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="Heading-H2 text-white content-gap-md"
                    >
                        The Pillars of our <span className="italic font-light text-[#B9A3D3]">Promise</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { icon: Heart, title: "Compassion", desc: "Every action is led by the heart, ensuring emotional security alongside physical well-being." },
                            { icon: Shield, title: "Integrity", desc: "Unwavering commitment to honesty, transparency, and the highest clinical standards." },
                            { icon: Users, title: "Dignity", desc: "Honouring the person behind the patient, respecting their history, choices, and autonomy." }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.2 }}
                                className="glass-card p-12 text-center group hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className="w-16 h-16 bg-[#5B2A86]/20 border border-[#5B2A86]/30 rounded-full flex items-center justify-center text-[#D6B36A] mx-auto mb-10 transition-colors group-hover:bg-[#5B2A86]/40">
                                    <pillar.icon className="w-8 h-8 stroke-[1.5]" />
                                </div>
                                <h3 className="Heading-Serif text-2xl text-white mb-6 tracking-wide">{pillar.title}</h3>
                                <p className="text-sm text-white/60 font-light leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
