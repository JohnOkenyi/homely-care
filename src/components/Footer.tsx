"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


export default function Footer() {
    return (
        <footer className="relative bg-[#0A0C10] text-[#F2F2F2] pt-24 pb-12 overflow-hidden border-t border-white/5 selection:bg-[#D6B36A]/30">
            {/* Ambient Cinematic Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.1] pointer-events-none" style={{ background: '#5B2A86' }} />
            <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none" style={{ background: '#D6B36A' }} />

            <div className="grid-container relative z-10">
                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-20">

                    {/* Brand Column */}
                    <div className="max-w-md">
                        <Link href="/" className="flex flex-row items-center gap-4 group mb-8 w-fit mt-[-10px]">
                            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-105 shrink-0">
                                <Image
                                    src="/logo-final.png"
                                    alt="Homely Healthcare Logo"
                                    fill
                                    className="object-contain"
                                    style={{ filter: 'saturate(1.2) brightness(1.1)' }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="Heading-Serif text-4xl lg:text-5xl tracking-tighter text-white block mb-0 transition-all duration-700 group-hover:tracking-normal group-hover:text-[#D6B36A] leading-none mt-2">
                                    HOMELY
                                </span>
                                <span className="text-[11px] ml-1 uppercase tracking-[0.4em] text-[#D6B36A] block font-extrabold opacity-90 mt-2">
                                    Health Care
                                </span>
                            </div>
                        </Link>
                        <p className="Text-16 text-white/50 font-light leading-relaxed max-w-sm mb-6">
                            Excellence in private home care, delivering dignity and compassion tailored to your unique lifestyle.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group mt-4 max-w-sm"
                        >
                            {/* Card Body - Luxury Glassmorphism */}
                            <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-[#D6B36A]/5 backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-[#D6B36A]/30 group-hover:shadow-[0_25px_60px_rgba(214,179,106,0.15)]">
                                
                                {/* Animated Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
                                
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6B36A] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D6B36A]"></span>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#D6B36A]">CQC Regulated</span>
                                    </div>
                                    <div className="px-3 py-1 bg-[#D6B36A]/10 rounded-full border border-[#D6B36A]/20">
                                        <span className="text-[9px] uppercase font-black tracking-widest text-[#D6B36A]">Official Rating</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 shrink-0 bg-white rounded-xl p-2 shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                                        <Image
                                            src="/images/cqc-good.png"
                                            alt="CQC Good Rating"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="Heading-Serif italic text-2xl text-white font-light lowercase tracking-tighter leading-none">
                                            Good <span className="text-[#D6B36A]">Rating</span>
                                        </h4>
                                        <p className="text-[11px] text-white/40 uppercase font-bold tracking-widest leading-relaxed">
                                            Inspected & <br />Proven Excellence
                                        </p>
                                        <a 
                                            href="https://www.cqc.org.uk/provider/1-259229241" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#D6B36A] hover:text-white transition-all duration-300 group/link tracking-[0.3em] mt-1"
                                        >
                                            View Report
                                            <div className="w-6 h-6 rounded-full border border-[#D6B36A]/30 flex items-center justify-center group-hover/link:bg-[#D6B36A] group-hover/link:text-[#0A0C10] transition-all">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">

                        {/* Column 1: Navigation */}
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D6B36A]/90">Navigation</h4>
                            <nav className="flex flex-col gap-4 text-[14px] text-white/40 font-medium">
                                <Link href="/" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Home</Link>
                                <Link href="/about-us" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">About</Link>
                                <Link href="/services" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Services</Link>
                                <Link href="/meet-the-team" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Team</Link>
                                <Link href="/careers" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Careers</Link>
                            </nav>
                        </div>

                        {/* Column 2: Connect */}
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D6B36A]/90">Connect</h4>
                            <nav className="flex flex-col gap-4 text-[14px] text-white/40 font-medium">
                                <a href="https://www.linkedin.com/company/homely-health-care-limited/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">LinkedIn</a>
                                <a href="https://www.facebook.com/homelyhealthcarelimited" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Facebook</a>
                            </nav>
                        </div>

                        {/* Column 3: Enquiries */}
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D6B36A]/90">Enquiries</h4>
                            <div className="flex flex-col gap-4">
                                <p className="text-[18px] text-white font-serif italic tracking-tight">01202 948 898</p>
                                <div className="space-y-1 group cursor-pointer">
                                    <p className="text-[14px] text-white/60 group-hover:text-[#D6B36A] transition-colors break-all font-light">
                                        info@homelyhealth.uk
                                    </p>
                                    <div className="h-px w-12 bg-[#D6B36A] scale-x-100 group-hover:w-full transition-all duration-700 origin-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Divider */}
                <div className="w-full h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 mb-12" />

                {/* Final Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase tracking-[0.3em] text-white/20 font-black">

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                        <span className="flex items-center gap-3 group px-4 py-2 rounded-full border border-white/5 hover:bg-white/5 transition-all">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full group-hover:scale-150 transition-transform" />
                            CQC Regulated
                        </span>
                        <span className="flex items-center gap-3 group px-4 py-2 rounded-full border border-white/5 hover:bg-white/5 transition-all">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full group-hover:scale-150 transition-transform" />
                            NHS Framework Approved
                        </span>
                        <span className="flex items-center gap-3 group px-4 py-2 rounded-full border border-white/5 hover:bg-white/5 transition-all">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full group-hover:scale-150 transition-transform" />
                            Skills for Care
                        </span>
                    </div>

                    {/* Legal & Copyright */}
                    <div className="flex flex-wrap items-center justify-center gap-10">
                        <Link href="javascript:void(0)" className="hover:text-[#D6B36A] transition-colors cursor-not-allowed">Privacy</Link>
                        <Link href="javascript:void(0)" className="hover:text-[#D6B36A] transition-colors cursor-not-allowed">Terms</Link>
                        <p className="text-white/10 font-light lowercase tracking-normal">
                            &copy; {new Date().getFullYear()} <span className="uppercase tracking-widest font-bold">Homely Health Care</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
