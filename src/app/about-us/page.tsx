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
            <section className="relative h-[55vh] lg:h-[60vh] flex items-center justify-center overflow-hidden bg-premium-dark">
                {/* Background Depth Layers */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Ambient star field */}
                    <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, rgba(185,163,211,0.9) 1px, transparent 1px)', backgroundSize: '70px 70px' }} />
                    {/* Atmospheric Glows */}
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-20" style={{ background: '#5B2A86' }} />
                    <div className="absolute -right-32 bottom-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10" style={{ background: '#D6B36A' }} />
                </div>

                <Image
                    src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Interior"
                    fill
                    className="object-cover opacity-30 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/80 via-[#1B1326]/60 to-[#1B1326]" />

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[#D6B36A] text-[10px] sm:text-xs tracking-[0.6em] uppercase block mb-8 font-bold">
                            Established with Purpose
                        </span>
                        <h1 className="Heading-Display text-white mb-6">
                            Our <span className="Heading-Serif italic font-light highlighted-text-gold">Heritage</span>
                        </h1>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D6B36A] to-transparent mx-auto" />
                    </motion.div>
                </div>

                {/* Bottom Cinematic Fade */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#F7F5F2] to-transparent z-20" />
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
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D6B36A] content-gap-sm block">The Homely Manifesto</span>
                                <h2 className="Heading-Display text-[#1A1A1A] mb-10 leading-[1.1]">
                                    Redefining the <br />
                                    <span className="Heading-Serif italic font-light highlighted-text-gold">Gold Standard</span> of Care.
                                </h2>
                                <div className="space-y-8 text-lg md:text-xl font-light text-[#1A1A1A]/70 leading-relaxed">
                                    <p>
                                        Founded on the belief that every individual deserves to age with dignity and grace, Homely Health Care was established to bridge the gap between clinical excellence and emotional warmth.
                                    </p>
                                    <p>
                                        We don&apos;t just provide services; we cultivate relationships. Our approach is deeply personal, ensuring that the care we deliver feels less like a clinical intervention and more like an extension of family.
                                    </p>
                                    <blockquote className="border-l-2 border-[#D6B36A] pl-10 py-4 my-14 italic text-2xl md:text-3xl text-[#5B2A86] Heading-Serif font-light leading-snug">
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
                        className="Heading-Display text-white content-gap-md"
                    >
                        The Pillars of our <span className="Heading-Serif italic font-light highlighted-text-gold">Promise</span>
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
                                className="glass-card p-12 text-center group hover:-translate-y-2 transition-all duration-500 glow-gold-hover"
                            >
                                <div className="w-20 h-20 bg-[#5B2A86]/20 border border-[#5B2A86]/30 rounded-full flex items-center justify-center text-[#D6B36A] mx-auto mb-10 transition-all duration-500 group-hover:bg-[#5B2A86]/40 group-hover:scale-110">
                                    <pillar.icon className="w-10 h-10 stroke-[1]" />
                                </div>
                                <h3 className="Heading-Serif text-3xl text-white mb-6 tracking-wide group-hover:text-[#D6B36A] transition-colors duration-500">{pillar.title}</h3>
                                <p className="text-base text-white/60 font-light leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
