"use client";

import { motion } from "framer-motion";
import { Waves, HeartPulse, Home, Users2 } from "lucide-react";
import Image from "next/image";

const services = [
    {
        title: "Home Care",
        subtitle: "Bespoke Domiciliary Support",
        description: "Maintain your independence with our premium home care services. We provide tailored support that respects your routines and preferences.",
        icon: Home,
        features: ["Personalised care planning", "Assistance with daily living", "Medicine administration", "Domestic & nutritional support"]
    },
    {
        title: "Live-in Care",
        subtitle: "24/7 Professional Presence",
        description: "Experience round-the-clock peace of mind with a dedicated live-in carer who provides clinical support and heartfelt companionship.",
        icon: Users2,
        features: ["Full-time companionship", "Clinical & emotional support", "Expert domestic care", "Dignified personal care"]
    },
    {
        title: "Supported Living",
        subtitle: "Independence with Dignity",
        description: "Specialised support for individuals with learning disabilities or autism, empowering them to live fulfilling lives in their community.",
        icon: Waves,
        features: ["Community integration", "Life skills development", "Flexible support hours", "Person-centred outcomes"]
    },
    {
        title: "Complex Care",
        subtitle: "Expert Nurse-Led Clinical Care",
        description: "Highly skilled clinical support for complex health conditions, managed by qualified nurses and specialist care practitioners.",
        icon: HeartPulse,
        features: ["Nurse-led interventions", "Neurological support", "Post-injury rehabilitation", "Multidisciplinary coordination"]
    }
];

export default function Services() {
    return (
        <main className="min-h-screen bg-[#F7F5F2] overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-12 overflow-hidden bg-premium-dark">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none overflow-hidden" style={{ background: '#5B2A86' }} />

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-[#D6B36A] text-[9px] tracking-[0.4em] uppercase block mb-3 font-bold">Tailored Excellence</span>
                        <h1 className="Heading-Display text-white mb-6 text-4xl md:text-5xl lg:text-6xl">
                            Our <span className="Heading-Serif italic font-light highlighted-text-gold">Services</span>
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#F2F2F2]/60 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        We offer a range of specialized care solutions designed to provide safety, dignity, and a profound sense of well-being in the comfort of your own home.
                    </motion.p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-12 md:py-16 relative -mt-8 z-20">
                <div className="grid-container">
                    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                        {services.map((srv, idx) => (
                            <motion.div
                                key={srv.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`group relative perspective-1000 mb-4 ${'image' in srv ? 'h-auto' : 'h-auto md:h-[320px] lg:h-[300px]'}`}
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.02,
                                        z: 30,
                                        transition: { duration: 0.4, ease: "easeOut" }
                                    }}
                                    whileTap={{
                                        scale: 1.02,
                                        transition: { duration: 0.1, ease: "easeOut" }
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className="relative w-full h-full rounded-2xl overflow-hidden glass-card-light border-[#5B2A86]/5 shadow-lg transition-all duration-500 group-hover:border-[#D6B36A]/40 group-hover:shadow-2xl group-hover:bg-white flex flex-col justify-center select-none cursor-default"
                                >
                                    <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                                            <div className="w-16 h-16 bg-[#5B2A86]/5 border border-[#5B2A86]/10 rounded-xl flex items-center justify-center text-[#5B2A86] shrink-0 transition-all duration-500 group-hover:bg-[#5B2A86] group-hover:text-white">
                                                <srv.icon className="w-8 h-8 stroke-[1.5]" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-[#D6B36A] mb-3 block">
                                                    {srv.subtitle}
                                                </span>
                                                <h2 className="text-3xl md:text-4xl font-serif italic text-[#1B1326] mb-4 tracking-tight">{srv.title}</h2>
                                                <p className="text-sm md:text-base text-[#1B1326] font-medium leading-relaxed mb-6 max-w-2xl opacity-90">
                                                    {srv.description}
                                                </p>

                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                                                    {srv.features.map(feat => (
                                                        <li key={feat} className="flex items-center gap-3 text-[10px] md:text-[11px] tracking-[0.05em] text-[#1B1326] uppercase font-bold">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] shrink-0" />
                                                            {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Interaction Decoration */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D6B36A]/10 to-transparent rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION - Cinematic */}
            <section className="py-16 bg-premium-dark relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D6B36A]/20 rounded-full blur-[140px]" />
                </div>

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-3xl md:text-4xl text-white mb-6 font-display">
                            A <span className="Heading-Serif italic font-light text-[#D6B36A]">Personalised</span> Path to Care.
                        </h2>
                        <p className="text-[#F2F2F2]/60 text-sm md:text-base font-light max-w-2xl mx-auto mb-8 leading-relaxed">
                            Every care journey is unique. Speak with our specialist team to design a bespoke plan that honours your choices and enhances your lifestyle.
                        </p>
                        <motion.a
                            href="/contact-us"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center px-12 py-5 bg-[#5B2A86] text-white text-[9px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] relative overflow-hidden group"
                        >
                            <span className="relative z-10">Request a Consultation</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
