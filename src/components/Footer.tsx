"use client";

import Link from "next/link";
import Image from "next/image";


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
                            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-105 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0">
                                <Image
                                    src="/logo-final.png"
                                    alt="Homely Healthcare Logo"
                                    fill
                                    className="object-contain p-1"
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
                        <p className="Text-16 text-white/50 font-light leading-relaxed max-w-sm">
                            Excellence in private home care, delivering dignity and compassion tailored to your unique lifestyle.
                        </p>
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
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">LinkedIn</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Facebook</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Instagram</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">YouTube</a>
                            </nav>
                        </div>

                        {/* Column 3: Inquiries */}
                        <div className="flex flex-col gap-8">
                            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#D6B36A]/90">Inquiries</h4>
                            <div className="flex flex-col gap-4">
                                <p className="text-[18px] text-white font-serif italic tracking-tight">0203 916 5797</p>
                                <div className="space-y-1 group cursor-pointer">
                                    <p className="text-[14px] text-white/60 group-hover:text-[#D6B36A] transition-colors break-all font-light">
                                        info@homelyhealthcare.org.uk
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
                        <Link href="/privacy" className="hover:text-[#D6B36A] transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-[#D6B36A] transition-colors">Terms</Link>
                        <p className="text-white/10 font-light lowercase tracking-normal">
                            &copy; {new Date().getFullYear()} <span className="uppercase tracking-widest font-bold">Homely Health Care</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
