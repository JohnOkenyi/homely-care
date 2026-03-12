"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Waves, HeartPulse, Home, Users2, ChevronRight, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ServicesContent() {
    const searchParams = useSearchParams();
    const [selectedService, setSelectedService] = useState<string | "all">("all");

    useEffect(() => {
        const serviceId = searchParams.get("service");
        if (serviceId && services.find(s => s.id === serviceId)) {
            setSelectedService(serviceId);
        } else if (serviceId === "all") {
            setSelectedService("all");
        }
    }, [searchParams]);

    const filteredServices = selectedService === "all" 
        ? services 
        : services.filter(s => s.id === selectedService);

    return (
        <>
            {/* TAB NAVIGATION */}
            <section className="bg-white border-b border-black/5 sticky top-[72px] z-[50] shadow-sm">
                <div className="grid-container py-4 flex flex-wrap justify-center gap-4 md:gap-8">
                    <button 
                        onClick={() => setSelectedService("all")}
                        className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all px-4 py-2 rounded-full ${selectedService === "all" ? "bg-[#5B2A86] text-white" : "text-black/40 hover:text-black"}`}
                    >
                        Experience All
                    </button>
                    {services.map(srv => (
                        <button 
                            key={srv.id}
                            onClick={() => setSelectedService(srv.id)}
                            className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold transition-all px-4 py-2 rounded-full ${selectedService === srv.id ? "bg-[#5B2A86] text-white" : "text-black/40 hover:text-black"}`}
                        >
                            {srv.title}
                        </button>
                    ))}
                    {selectedService !== "all" && (
                        <button 
                            onClick={() => setSelectedService("all")}
                            className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-red-500/60 hover:text-red-500 flex items-center gap-2"
                        >
                            <X className="w-3 h-3" />
                            Clear Filter
                        </button>
                    )}
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-12 md:py-20 relative z-20">
                <div className="grid-container">
                    <div className={`grid gap-8 lg:gap-12 ${selectedService === "all" ? "lg:grid-cols-2" : "max-w-4xl mx-auto grid-cols-1"}`}>
                        <AnimatePresence mode="wait">
                            {filteredServices.map((srv) => (
                                <motion.div
                                    key={srv.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative perspective-1000"
                                >
                                    <div className="relative w-full h-full rounded-[32px] overflow-hidden glass-card-light border-[#5B2A86]/5 shadow-xl transition-all duration-700 group-hover:border-[#D6B36A]/40 group-hover:shadow-2xl group-hover:bg-white flex flex-col justify-center select-none cursor-default bg-white p-8 md:p-12">
                                        <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-12">
                                            <div className="w-20 h-20 bg-[#5B2A86] text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg transform transition-transform duration-500 group-hover:rotate-6">
                                                <srv.icon className="w-10 h-10 stroke-[1.5]" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-8 h-[1px] bg-[#D6B36A]" />
                                                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-extrabold text-[#D6B36A]">
                                                        {srv.subtitle}
                                                    </span>
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-serif italic text-[#1B1326] mb-6 tracking-tight leading-none">{srv.title}</h2>
                                                <p className="text-lg md:text-xl text-[#1B1326]/70 font-light leading-relaxed mb-10">
                                                    {srv.description}
                                                </p>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                                    {srv.features.map(feat => (
                                                        <div key={feat} className="flex items-center gap-4">
                                                            <div className="w-2 h-2 rounded-full bg-[#5B2A86] shrink-0" />
                                                            <span className="text-[12px] md:text-[13px] tracking-widest text-[#1B1326] uppercase font-bold opacity-80">{feat}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-12 flex items-center justify-between pt-8 border-t border-black/5">
                                            <a href="/contact-us" className="text-[10px] uppercase font-bold tracking-widest text-[#5B2A86] hover:text-[#D6B36A] transition-colors flex items-center gap-2 group/link">
                                                Enquire About This Service
                                                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                            <div className="w-12 h-12 bg-black/[0.02] rounded-full flex items-center justify-center text-[#D6B36A] opacity-20">
                                                <srv.icon className="w-6 h-6" />
                                            </div>
                                        </div>

                                        {/* Interaction Decoration */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D6B36A]/5 to-transparent rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    );
}

const services = [
    {
        id: "home-care",
        title: "Home Care",
        subtitle: "Bespoke Domiciliary Support",
        description: "Specialist care and genuine human connection, supporting your independence where you feel safest — at home.",
        icon: Home,
        features: ["Personalised care planning", "Assistance with daily living", "Medicine administration", "Domestic & nutritional support"]
    },
    {
        id: "live-in-care",
        title: "Live In Care",
        subtitle: "24/7 Professional Presence",
        description: "Experience round the clock peace of mind with a dedicated live in carer who provides clinical support and heartfelt companionship.",
        icon: Users2,
        features: ["Full-time companionship", "Clinical & emotional support", "Expert domestic care", "Dignified personal care"]
    },
    {
        id: "supported-living",
        title: "Supported Living",
        subtitle: "Independence with Dignity",
        description: "Specialised support for individuals with learning disabilities or autism, empowering them to live fulfilling lives in their community.",
        icon: Waves,
        features: ["Community integration", "Life skills development", "Flexible support hours", "Person centred outcomes"]
    },
    {
        id: "complex-care",
        title: "Complex Care",
        subtitle: "Expert Nurse Led Complex Care",
        description: "Highly skilled clinical support for complex health conditions, managed by qualified nurses and specialised care practitioners.",
        icon: HeartPulse,
        features: ["nurse led interventions", "Neurological support", "Post injury rehabilitation", "Multidisciplinary coordination"]
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
                </div>
            </section>

            <Suspense fallback={<div className="h-40 flex items-center justify-center text-black/20 uppercase tracking-[0.4em] text-[10px] font-bold">Loading Services...</div>}>
                <ServicesContent />
            </Suspense>

            {/* CALL TO ACTION - Cinematic */}
            <section className="py-20 bg-premium-dark relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D6B36A]/20 rounded-full blur-[140px]" />
                </div>

                <div className="grid-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="Heading-Serif text-3xl md:text-5xl text-white mb-8 font-normal leading-tight">
                            Ready to start your <br />
                            <span className="italic font-light text-[#D6B36A]">care journey?</span>
                        </h2>
                        <motion.a
                            href="/contact-us"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-12 py-5 bg-[#D6B36A] text-[#1B1326] text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-white relative overflow-hidden group"
                        >
                            <span className="relative z-10">Contact Us</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
