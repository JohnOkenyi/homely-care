"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic Import for the heavy Globe component to improve page load
// Dynamic Import for the new 3D visual
const SeniorLiving3D = dynamic(() => import("@/components/SeniorLiving3D"), {
    ssr: false,
    loading: () => <div className="w-full h-full rounded-full bg-white/5 animate-pulse" />
});

export default function ContactUs() {
    return (
        <main className="min-h-screen bg-[#0F1115] text-[#F2F2F2] overflow-hidden">

            {/* HERO / 3D SECTION */}
            <section className="relative min-h-[40vh] lg:min-h-[90vh] flex items-center justify-center pt-28 pb-4 lg:pt-20 lg:pb-16 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none" style={{ background: '#5B2A86' }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: '#D6B36A' }} />

                <div className="grid-container relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

                        {/* LEFT: TEXT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full lg:w-auto text-center lg:text-left flex flex-col items-center lg:items-start gap-y-12"
                        >
                            <div className="w-full">
                                <span className="text-[#D6B36A] text-[10px] md:text-xs tracking-[0.4em] uppercase block mb-6 font-bold whitespace-nowrap">Care Tailored to You</span>
                                <h1 className="Heading-Serif text-3xl xs:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.9] mb-8 whitespace-nowrap">
                                    <span className="italic font-light highlighted-text-gold">Book a Call</span>
                                </h1>
                                <p className="text-white/80 text-base md:text-xl font-light leading-relaxed whitespace-nowrap">
                                    Discuss how we can help.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <motion.a
                                    href="#enquiry-form"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full shadow-2xl hover:bg-[#7A4FB3] transition-all"
                                >
                                    Book a Call
                                </motion.a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="hidden lg:flex relative w-full lg:max-w-[700px] lg:h-[600px] items-center justify-center p-8 bg-white/[0.03] border border-white/5 rounded-[40px] shadow-2xl overflow-visible mt-0 lg:-translate-x-32 lg:-translate-y-32"
                        >
                            <div className="absolute inset-0 z-0 bg-gradient-radial from-[#5B2A86]/5 to-transparent blur-3xl rounded-full scale-75" />
                            <div className="w-full h-full relative z-20 flex items-center justify-center overflow-visible">
                                <SeniorLiving3D scale={1.0} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CONTACT CARDS & FORM */}
            <section id="enquiry-form" className="py-24 relative z-20 bg-white selection:bg-[#5B2A86] selection:text-white">
                <div className="grid-container">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">

                        {/* INFO PANEL */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#0F1115] p-7 xs:p-10 lg:p-14 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B2A86]/10 blur-3xl group-hover:bg-[#5B2A86]/20 transition-all duration-700" />

                                <div className="relative z-10">
                                    <h2 className="Heading-Serif text-4xl text-white mb-12">Head Office</h2>

                                    <div className="space-y-12">
                                        <div className="flex gap-4 md:gap-6 items-center">
                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#B9A3D3] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500 shrink-0">
                                                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Office Line</p>
                                                <p className="text-xl md:text-2xl text-white font-light">01202 948898</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 md:gap-6 items-center">
                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#B9A3D3] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500 shrink-0">
                                                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Email</p>
                                                <p className="text-lg md:text-xl text-white font-light break-all xs:break-normal">info@homelyhealth.uk</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 md:gap-6 items-start">
                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#B9A3D3] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500 shrink-0">
                                                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Head Office</p>
                                                <p className="text-base md:text-lg text-white font-light leading-relaxed">
                                                    Suite 6A, Wessex House<br />
                                                    St. Leonards Road, Charminster<br />
                                                    Bournemouth, BH8 8QS
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="p-4 md:p-8 rounded-full md:rounded-3xl border border-black/5 bg-[#F7F5F2] flex items-center justify-center md:justify-between"
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black/5 rounded-full flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-[#5B2A86]" />
                                    </div>
                                    <p className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-black/40 text-center md:text-left">Registered Provider • CQC Good</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 w-full overflow-hidden">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-[#F7F5F2] p-8 xs:p-10 lg:p-16 rounded-3xl md:rounded-[40px] shadow-sm border border-black/[0.03] w-full"
                            >
                                <div className="mb-8 md:mb-12 text-center md:text-left">
                                    <h3 className="Heading-Serif text-3xl sm:text-4xl md:text-5xl text-[#0F1115] mb-4">Book a <span className="italic font-light text-[#5B2A86]">Call</span></h3>
                                    <p className="text-black/60 font-medium text-sm sm:text-base max-w-md mx-auto md:mx-0">Please complete the form below and we will contact you shortly.</p>
                                </div>

                                <form className="space-y-6 md:space-y-10">
                                    <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                                        <div className="space-y-2 md:space-y-3">
                                            <input type="text" className="w-full bg-transparent border-b border-black/10 px-0 py-3 md:py-4 text-[#0F1115] text-base md:text-lg placeholder:text-black/40 focus:border-[#5B2A86] focus:outline-none transition-all" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-2 md:space-y-3">
                                            <input type="tel" className="w-full bg-transparent border-b border-black/10 px-0 py-3 md:py-4 text-[#0F1115] text-base md:text-lg placeholder:text-black/40 focus:border-[#5B2A86] focus:outline-none transition-all" placeholder="Phone Number" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <input type="email" className="w-full bg-transparent border-b border-black/10 px-0 py-3 md:py-4 text-[#0F1115] text-base md:text-lg placeholder:text-black/40 focus:border-[#5B2A86] focus:outline-none transition-all" placeholder="Email Address" />
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[#5B2A86]">Service Requirement</label>
                                        <select className="w-full bg-transparent border-b border-black/10 px-0 py-3 md:py-4 text-[#0F1115] text-base md:text-lg focus:border-[#5B2A86] focus:outline-none appearance-none cursor-pointer">
                                            <option>Live In Care</option>
                                            <option>Companionship</option>
                                            <option>Complex Care</option>
                                            <option>Staffing Support</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 md:space-y-3">
                                        <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[#5B2A86]">Personal Message</label>
                                        <textarea rows={2} className="w-full bg-transparent border-b border-black/10 px-0 py-3 md:py-4 text-[#0F1115] text-base md:text-lg placeholder:text-black/10 focus:border-[#5B2A86] focus:outline-none resize-none transition-all" placeholder="How may we assist you?" />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-5 md:py-6 bg-[#0F1115] text-[#D6B36A] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold rounded-xl md:rounded-2xl shadow-2xl transition-all duration-500 hover:bg-[#5B2A86] hover:text-white flex items-center justify-center gap-4 group"
                                    >
                                        <span>Secure Transmission</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
