"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactUs() {
    return (
        <main className="min-h-screen bg-[#F7F5F2]">
            <Navbar />

            {/* HERO / CONTACT HEADER */}
            <section className="relative pt-48 pb-32 bg-premium-dark overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ background: '#5B2A86' }} />

                <div className="grid-container relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#D6B36A] text-[10px] tracking-[0.6em] uppercase block mb-8 font-bold"
                    >
                        Available 24/7
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="Heading-H1 text-white mb-8"
                    >
                        Begin Your <span className="Heading-Serif italic font-light text-[#B9A3D3]">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#F2F2F2]/60 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Our care specialists are ready to provide a confidential consultation tailored to your unique requirements.
                    </motion.p>
                </div>
            </section>

            {/* CONTACT BODY */}
            <section className="py-32 lg:py-48 -mt-16 relative z-20">
                <div className="grid-container">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                        {/* INFO PANEL */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="glass-card-light p-10 lg:p-12 border-[#5B2A86]/5"
                            >
                                <h2 className="Heading-Serif text-3xl text-[#1B1326] mb-12">Direct <span className="italic font-light text-[#5B2A86]">Concierge</span></h2>

                                <div className="space-y-10">
                                    <div className="flex gap-6 group">
                                        <div className="w-12 h-12 bg-[#5B2A86]/5 rounded-full flex items-center justify-center text-[#5B2A86] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Call Us</p>
                                            <p className="text-xl text-[#1B1326] font-light">0203 916 5797</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group">
                                        <div className="w-12 h-12 bg-[#5B2A86]/5 rounded-full flex items-center justify-center text-[#5B2A86] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Email Us</p>
                                            <p className="text-xl text-[#1B1326] font-light">info@homelyhealthcare.org.uk</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group">
                                        <div className="w-12 h-12 bg-[#5B2A86]/5 rounded-full flex items-center justify-center text-[#5B2A86] group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-[#D6B36A] mb-1">Visit Us</p>
                                            <p className="text-xl text-[#1B1326] font-light leading-relaxed">
                                                Suite 2 27, Brighton Road,<br />
                                                South Croydon, CR2 6EB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="p-8 text-center border border-[#5B2A86]/10 rounded-sm">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-[#1B1326]/50">Registered Provider</p>
                                <p className="text-[9px] uppercase tracking-[0.1em] text-[#1B1326]/30 mt-2 italic">NHS Framework Approved • CQC Regulated</p>
                            </div>
                        </div>

                        {/* FORM PANEL */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white p-12 lg:p-16 shadow-[0_40px_100px_-20px_rgba(27,19,38,0.1)] rounded-sm border border-[#5B2A86]/5"
                            >
                                <h3 className="Heading-Serif text-3xl text-[#1B1326] mb-12">Enquiry <span className="italic font-light text-[#5B2A86]">Form</span></h3>

                                <form className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#1B1326]/40">Full Name</label>
                                            <input type="text" className="w-full bg-[#F7F5F2] border-none px-6 py-4 text-[#1B1326] placeholder-[#1B1326]/20 focus:ring-2 focus:ring-[#5B2A86]/20 transition-all" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-[#1B1326]/40">Phone Number</label>
                                            <input type="tel" className="w-full bg-[#F7F5F2] border-none px-6 py-4 text-[#1B1326] placeholder-[#1B1326]/20 focus:ring-2 focus:ring-[#5B2A86]/20 transition-all" placeholder="+44 20" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#1B1326]/40">Email Address</label>
                                        <input type="email" className="w-full bg-[#F7F5F2] border-none px-6 py-4 text-[#1B1326] placeholder-[#1B1326]/20 focus:ring-2 focus:ring-[#5B2A86]/20 transition-all" placeholder="john@example.com" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#1B1326]/40">Nature of Enquiry</label>
                                        <select className="w-full bg-[#F7F5F2] border-none px-6 py-4 text-[#1B1326] focus:ring-2 focus:ring-[#5B2A86]/20 transition-all appearance-none cursor-pointer">
                                            <option>General Care Enquiry</option>
                                            <option>Live-in Care</option>
                                            <option>Complex Care</option>
                                            <option>Employment</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-[#1B1326]/40">Your Message</label>
                                        <textarea rows={4} className="w-full bg-[#F7F5F2] border-none px-6 py-4 text-[#1B1326] placeholder-[#1B1326]/20 focus:ring-2 focus:ring-[#5B2A86]/20 transition-all resize-none" placeholder="How Can We Assist You?" />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-6 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] flex items-center justify-center gap-4 group"
                                    >
                                        <span>Submit Enquiry</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
