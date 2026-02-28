"use client";

import Link from "next/link";


export default function Footer() {
    return (
        <footer className="relative bg-premium-dark text-[#F2F2F2] pt-32 pb-16 overflow-hidden border-t border-white/5">
            {/* Subtle ambient lighting */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 pointer-events-none" style={{ background: '#5B2A86' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none" style={{ background: '#D6B36A' }} />

            <div className="grid-container relative z-10">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-block group">
                            <span className="Heading-Serif text-3xl tracking-tight text-[#F2F2F2] block transition-transform group-hover:scale-105 duration-500">
                                HOMELY
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D6B36A] block mt-1 font-bold">
                                Health Care
                            </span>
                        </Link>
                        <p className="mt-8 text-[#F2F2F2]/60 text-sm leading-relaxed font-light">
                            Excellence in private home care, delivering dignity and compassion tailored to your unique lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Navigation</h4>
                            <nav className="flex flex-col gap-4 text-xs tracking-widest text-[#F2F2F2]/70 font-medium">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <Link href="/about-us" className="hover:text-white transition-colors">About</Link>
                                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                                <Link href="/meet-the-team" className="hover:text-white transition-colors">Team</Link>
                                <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Connect</h4>
                            <nav className="flex flex-col gap-4 text-xs tracking-widest text-[#F2F2F2]/70 font-medium">
                                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                                <a href="#" className="hover:text-white transition-colors">YouTube</a>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Inquiries</h4>
                            <div className="text-sm font-light text-[#F2F2F2]/70">
                                <p className="mb-2">01202 948 898</p>
                                <p>info@homelyhealth.uk</p>
                                <div className="mt-8 h-px w-12 bg-[#D6B36A]/40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Divider */}
                <div className="w-full h-px bg-white/10 mb-16" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] uppercase tracking-[0.3em] text-[#F2F2F2]/40 font-bold">
                    <div className="flex flex-wrap justify-center gap-8">
                        <span className="flex items-center gap-2 italic font-light"><span className="w-1 h-1 bg-[#D6B36A] rounded-full" /> CQC Regulated</span>
                        <span className="flex items-center gap-2 italic font-light"><span className="w-1 h-1 bg-[#D6B36A] rounded-full" /> NHS Partner</span>
                        <span className="flex items-center gap-2 italic font-light"><span className="w-1 h-1 bg-[#D6B36A] rounded-full" /> Skills for Care</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <p>&copy; {new Date().getFullYear()} HOMELY HEALTH CARE</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
