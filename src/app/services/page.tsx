"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Waves, HeartPulse, Home, Users2 } from "lucide-react";

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
        <main className="min-h-screen bg-[#F7F5F2]">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-premium-dark">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ background: '#5B2A86' }} />

                <div className="grid-container relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#D6B36A] text-[10px] tracking-[0.6em] uppercase block mb-8 font-bold"
                    >
                        Tailored Excellence
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="Heading-H1 text-white mb-8"
                    >
                        Our <span className="Heading-Serif italic font-light">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#F2F2F2]/60 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        We offer a range of specialized care solutions designed to provide safety, dignity, and a profound sense of well-being in the comfort of your own home.
                    </motion.p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="section-padding relative -mt-16 z-20">
                <div className="grid-container">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {services.map((srv, idx) => (
                            <motion.div
                                key={srv.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="glass-card-light p-12 lg:p-16 border-[#5B2A86]/5 group hover:border-[#5B2A86]/20 transition-all duration-700"
                            >
                                <div className="flex flex-col md:flex-row md:items-start gap-12">
                                    <div className="w-20 h-20 bg-[#5B2A86]/5 border border-[#5B2A86]/10 rounded-full flex items-center justify-center text-[#5B2A86] shrink-0 transition-all duration-700 group-hover:bg-[#5B2A86]/10 group-hover:scale-110">
                                        <srv.icon className="w-10 h-10 stroke-[1.2]" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#D6B36A] mb-4 block">
                                            {srv.subtitle}
                                        </span>
                                        <h2 className="Heading-Serif text-3xl text-[#1B1326] mb-8">{srv.title}</h2>
                                        <p className="text-base text-[#1B1326]/70 font-light leading-relaxed mb-10">
                                            {srv.description}
                                        </p>

                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                            {srv.features.map(feat => (
                                                <li key={feat} className="flex items-center gap-3 text-xs tracking-wider text-[#1B1326]/50 uppercase font-bold">
                                                    <CheckCircle2 className="w-4 h-4 text-[#5B2A86]" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION - Cinematic */}
            <section className="section-padding bg-premium-dark relative overflow-hidden">
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
                        <h2 className="Heading-H2 text-white mb-12">
                            A <span className="Heading-Serif italic font-light text-[#D6B36A]">Personalised</span> Path to Care.
                        </h2>
                        <p className="text-[#F2F2F2]/60 text-lg font-light max-w-2xl mx-auto mb-16 leading-relaxed">
                            Every care journey is unique. Speak with our specialist team to design a bespoke plan that honours your choices and enhances your lifestyle.
                        </p>
                        <motion.a
                            href="/contact-us"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center px-16 py-6 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] relative overflow-hidden group"
                        >
                            <span className="relative z-10">Request a Consultation</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
