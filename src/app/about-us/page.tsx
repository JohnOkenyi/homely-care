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
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop"
                    alt="Compassionate Senior Care"
                    fill
                    className="object-cover opacity-30 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/80 via-[#1B1326]/60 to-[#1B1326]" />

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[#D6B36A] text-[9px] tracking-[0.4em] uppercase block mb-3 font-bold">Established with Purpose</span>
                        <h1 className="Heading-Display text-white mb-6 text-4xl md:text-5xl lg:text-6xl">
                            Our <span className="Heading-Serif italic font-light highlighted-text-gold">Vision</span>
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
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            <div className="aspect-[16/10] relative rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                <Image
                                    src="/quality-care-scene.png"
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
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col"
                        >
                            <span className="text-[#D6B36A] text-[8px] tracking-[0.4em] uppercase block mb-4 font-bold">The Homely Manifesto</span>
                            <h2 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] mb-6 leading-tight">
                                Excellent home care combining practical expertise with <span className="highlighted-text-gold font-light not-italic">genuine humanity.</span>
                            </h2>
                            <div className="space-y-4 text-sm md:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
                                <p>
                                    Founded on the belief that every individual deserves to age with dignity and grace, Homely Health Care was established to bridge the gap between expertise and emotional warmth.
                                </p>
                                <p>
                                    We don&apos;t just provide services; we cultivate relationships. Our approach is deeply personal, ensuring that the care we deliver feels less like an intervention and more like an extension of family.
                                </p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-[#1B1326]/5">
                                <p className="italic text-lg text-[#5B2A86] font-serif font-light leading-snug">
                                    &ldquo;Our mission is to provide compassionate, high quality health care services through trusted professionals.&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="grid-container max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#D6B36A] text-[9px] tracking-[0.4em] uppercase block mb-3 font-bold">Why Us</span>
                        <h2 className="text-3xl md:text-5xl text-[#1B1326] mb-12 font-serif italic">
                            People Choose <span className="highlighted-text-gold font-light not-italic">Homely Health Care</span> Because
                        </h2>
                    </motion.div>
                </div>

                <div className="grid-container max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Heart,
                                title: "Person-Centred Care",
                                desc: "Homely Health Care is committed to connecting you with exceptional care services tailored to your unique needs. We provide solutions to meet your needs as we believe that every individual is different and as a result your care and support must be person-centred.",
                                dark: false,
                            },
                            {
                                icon: Shield,
                                title: "Robust Recruitment",
                                desc: "We operate a robust recruitment and selection process which ensures that all staff are thoroughly referenced, DBS checked and appropriately trained to a high standard.",
                                dark: false,
                            },
                            {
                                icon: Users,
                                title: "Approachable Management",
                                desc: "Our friendly and approachable management team are on hand to help with any questions or issues you may have. In addition our Field Care Managers will visit you regularly in your home to ensure that the care you are receiving continues to be aligned with your wants and needs.",
                                dark: false,
                            },
                            {
                                icon: Heart,
                                title: "Giving Back",
                                desc: "Homely Health Care donates a percentage of its profits to a small children's education charity, The Rahula Trust, who do amazing work to support children in their education in various parts of the world.",
                                dark: true,
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="group relative"
                                style={{ perspective: '900px' }}
                                onMouseMove={(e) => {
                                    const wrapper = e.currentTarget;
                                    const inner = wrapper.querySelector('.whyus-3d-inner') as HTMLElement;
                                    const extB = wrapper.querySelector('.ext-b') as HTMLElement;
                                    const extR = wrapper.querySelector('.ext-r') as HTMLElement;
                                    if (!inner) return;
                                    const rect = wrapper.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const rX = ((y - rect.height / 2) / (rect.height / 2)) * -18;
                                    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 18;
                                    inner.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) translateZ(55px)`;
                                    inner.style.boxShadow = `${-rY * 3}px ${rX * 3}px 70px rgba(0,0,0,0.28), 0 30px 70px rgba(91,42,134,0.15)`;
                                    if (extB) extB.style.opacity = '1';
                                    if (extR) extR.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                    const wrapper = e.currentTarget;
                                    const inner = wrapper.querySelector('.whyus-3d-inner') as HTMLElement;
                                    const extB = wrapper.querySelector('.ext-b') as HTMLElement;
                                    const extR = wrapper.querySelector('.ext-r') as HTMLElement;
                                    if (!inner) return;
                                    inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                                    inner.style.boxShadow = card.dark
                                        ? '0 20px 50px rgba(91,42,134,0.4)'
                                        : '0 4px 20px rgba(0,0,0,0.06)';
                                    if (extB) extB.style.opacity = '0';
                                    if (extR) extR.style.opacity = '0';
                                }}
                            >
                                {/* Physical extrusion side faces */}
                                <div
                                    className="ext-b absolute inset-x-4 -bottom-[18px] h-[20px] rounded-b-[24px] z-0"
                                    style={{
                                        opacity: 0,
                                        transition: 'opacity 0.18s ease-out',
                                        background: card.dark
                                            ? 'linear-gradient(to bottom, #3a1558, #25093a)'
                                            : 'linear-gradient(to bottom, #ddd8d2, #b5afa9)',
                                    }}
                                />
                                <div
                                    className="ext-r absolute inset-y-4 -right-[18px] w-[20px] rounded-r-[24px] z-0"
                                    style={{
                                        opacity: 0,
                                        transition: 'opacity 0.18s ease-out',
                                        background: card.dark
                                            ? 'linear-gradient(to right, #3a1558, #25093a)'
                                            : 'linear-gradient(to right, #ddd8d2, #b5afa9)',
                                    }}
                                />

                                <div
                                    className={`whyus-3d-inner relative z-10 p-8 md:p-10 rounded-3xl border cursor-default h-full ${card.dark
                                            ? 'bg-[#5B2A86] border-[#5B2A86]/10 overflow-hidden'
                                            : 'bg-[#F7F5F2] border-[#1B1326]/5'
                                        }`}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                                        boxShadow: card.dark
                                            ? '0 20px 50px rgba(91,42,134,0.4)'
                                            : '0 4px 20px rgba(0,0,0,0.06)',
                                        willChange: 'transform',
                                    }}
                                >
                                    {card.dark && (
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6B36A]/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    )}
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[#D6B36A] mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10 ${card.dark ? 'bg-white/10 backdrop-blur-sm' : 'bg-white'}`}>
                                        <card.icon className="w-6 h-6 stroke-[1.5]" />
                                    </div>
                                    <h3 className={`text-2xl font-serif italic mb-4 relative z-10 ${card.dark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                                        {card.title}
                                    </h3>
                                    <p className={`leading-relaxed font-light text-base md:text-lg relative z-10 ${card.dark ? 'text-white/80' : 'text-[#1A1A1A]/70'}`}>
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
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
                        <h2 className="text-3xl md:text-4xl text-white mb-8">
                            Our <span className="Heading-Serif italic font-light highlighted-text-gold">Foundations</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 perspective-2000">
                        {[
                            { icon: Heart, title: "Compassion", desc: "Every action is led by the heart, ensuring emotional security alongside physical wellbeing." },
                            { icon: Shield, title: "Integrity", desc: "Unwavering commitment to honesty, transparency, and the highest standards." },
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
