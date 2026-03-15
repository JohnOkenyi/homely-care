"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


export default function Footer() {
    // Mouse Tracking for Footer Logo
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

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
                        <Link 
                            href="/" 
                            className="block mb-8 w-fit mt-[-10px] perspective-[1200px]"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="flex flex-row items-center gap-6 group">
                                {/* Cinema 3D Extruded Logo Icon */}
                                <motion.div 
                                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#F7F5F2] shrink-0 shadow-xl"
                                    whileHover={{ 
                                        z: 180, // High Z-axis movement towards user
                                        scale: 1.35, // Significant scaling for "coming towards you" effect
                                        rotateX: rotateX.get(),
                                        rotateY: rotateY.get(),
                                        boxShadow: `
                                            0.5px 0.5px 0px #e5e1d8, 
                                            1px 1px 0px #e5e1d8, 
                                            1.5px 1.5px 0px #e5e1d8, 
                                            2px 2px 0px #e5e1d8, 
                                            2.5px 2.5px 0px #e5e1d8, 
                                            3px 3px 0px #e5e1d8, 
                                            3.5px 3.5px 0px #e5e1d8, 
                                            4px 4px 0px #e5e1d8,
                                            15px 15px 35px rgba(0,0,0,0.6)
                                        `
                                    }}
                                    style={{ 
                                        rotateX,
                                        rotateY,
                                        transformStyle: "preserve-3d" 
                                    }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 250, 
                                        damping: 18,
                                        mass: 0.8
                                    }}
                                >
                                    <Image
                                        src="/logo-final.png"
                                        alt="Homely Healthcare Logo"
                                        fill
                                        className="object-contain"
                                        style={{ 
                                            filter: 'saturate(1.2) brightness(1.1)',
                                            mixBlendMode: 'multiply'
                                        }}
                                    />
                                </motion.div>

                                {/* Static Brand Text */}
                                <div className="flex flex-col">
                                    <span className="Heading-Serif text-4xl lg:text-5xl tracking-tighter text-white block mb-0 leading-none mt-2 transition-colors duration-500 group-hover:text-[#D6B36A]">
                                        HOMELY
                                    </span>
                                    <span className="text-[11px] ml-1 uppercase tracking-[0.4em] text-[#D6B36A] block font-extrabold opacity-90 mt-2">
                                        Health Care
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <p className="Text-16 text-white/50 font-light leading-relaxed max-w-sm mb-6">
                            Excellence in private home care, delivering dignity and compassion tailored to your unique lifestyle.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group mt-2"
                        >
                            {/* Animated Glow Behind */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D6B36A]/50 to-[#5B2A86]/50 rounded-xl opacity-40 group-hover:opacity-80 group-hover:blur-md transition-all duration-1000 animate-pulse"></div>

                            {/* Card Content */}
                            <div className="relative p-5 rounded-xl border border-[#D6B36A]/20 bg-[#0A0C10] flex flex-col gap-2 overflow-hidden">
                                {/* Subtle internal shine */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6B36A] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6B36A]"></span>
                                    </div>
                                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D6B36A]">
                                        CQC Rating
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mt-3">
                                    <div className="relative w-16 h-16 shrink-0 bg-white rounded-lg p-1.5 shadow-md">
                                        <Image
                                            src="/images/cqc-good.png"
                                            alt="CQC Good Rating"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <a 
                                            href="https://www.cqc.org.uk/provider/1-259229241" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[9px] uppercase font-black text-[#D6B36A] hover:text-white transition-colors flex items-center gap-1 group/link tracking-[0.2em]"
                                        >
                                            Full Report
                                            <span className="group-hover/link:translate-x-0.5 transition-transform text-[12px]">→</span>
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
