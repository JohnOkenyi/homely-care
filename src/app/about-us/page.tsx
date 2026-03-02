"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

export default function AboutUs() {
    return (
        <main className="min-h-screen bg-[#F7F5F2]">
            {/* HERO SECTION - Cinematic Breadcrumb */}
            <section className="relative pt-32 pb-12 flex items-center justify-center overflow-hidden bg-premium-dark">
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
                        <span className="text-[#D6B36A] text-[9px] tracking-[0.4em] uppercase block mb-3 font-bold">Established with Purpose</span>
                        <h1 className="Heading-Display text-white mb-6 text-4xl md:text-5xl lg:text-6xl">
                            Our <span className="Heading-Serif italic font-light highlighted-text-gold">Heritage</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* MANIFESTO SECTION - Editorial Style */}
            <section className="py-12 md:py-16 bg-[#F7F5F2]">
                <div className="grid-container max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="aspect-[16/10] relative rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                <Image
                                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
                                    alt="Caring interaction"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1B1326]/20 to-transparent" />
                            </div>
                            {/* Decorative Accent */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-[#D6B36A]/30" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col"
                        >
                            <span className="text-[#D6B36A] text-[8px] tracking-[0.4em] uppercase block mb-4 font-bold">The Homely Manifesto</span>
                            <h2 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] mb-6 leading-tight">
                                Redefining the <span className="highlighted-text-gold font-light not-italic">Gold Standard</span> of Care.
                            </h2>
                            <div className="space-y-4 text-sm md:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                                <p>
                                    Founded on the belief that every individual deserves to age with dignity and grace, Homely Health Care was established to bridge the gap between clinical excellence and emotional warmth.
                                </p>
                                <p>
                                    We don&apos;t just provide services; we cultivate relationships. Our approach is deeply personal, ensuring that the care we deliver feels less like a clinical intervention and more like an extension of family.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-[#1B1326]/5">
                                <p className="italic text-lg text-[#5B2A86] font-serif font-light leading-snug">
                                    &ldquo;Our mission is to create a world where home care is synonymous with sanctuary.&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PILLARS SECTION - Compact Cards */}
            <section className="py-12 md:py-16 bg-premium-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B2A86]/10 rounded-full blur-[160px]" />

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#D6B36A] text-[8px] tracking-[0.4em] uppercase block mb-3 font-bold">Our Foundation</span>
                        <h2 className="text-3xl md:text-4xl text-white mb-8">
                            The Pillars of our <span className="Heading-Serif italic font-light highlighted-text-gold">Promise</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 perspective-2000">
                        {[
                            { icon: Heart, title: "Compassion", desc: "Every action is led by the heart, ensuring emotional security alongside physical well-being." },
                            { icon: Shield, title: "Integrity", desc: "Unwavering commitment to honesty, transparency, and the highest clinical standards." },
                            { icon: Users, title: "Dignity", desc: "Honouring the person behind the patient, respecting their history and autonomy." }
                        ].map((pillar, idx) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                                className="relative group cursor-default"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.06,
                                        z: 60,
                                        rotateX: -2,
                                        rotateY: 2,
                                        transition: { duration: 0.4, ease: "easeOut" }
                                    }}
                                    className="bg-[#0F1115]/60 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)] group-hover:bg-[#1B1326]/80 group-hover:border-[#D6B36A]/40 h-full flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    {/* Luxury Glow Effect */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D6B36A]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#D6B36A] mb-6 transition-all duration-700 group-hover:bg-[#D6B36A] group-hover:text-[#1B1326] group-hover:rotate-6">
                                        <pillar.icon className="w-6 h-6 stroke-[1.5]" />
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-serif italic text-white mb-4 group-hover:text-[#D6B36A] transition-colors duration-500">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-sm text-white/70 font-medium leading-relaxed group-hover:text-white transition-colors duration-500">
                                        {pillar.desc}
                                    </p>

                                    {/* Bottom Decorative Edge */}
                                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D6B36A] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
