"use client";

import Link from "next/link";


export default function Footer() {
    return (
        <footer className="relative bg-[#0F1115] text-[#F2F2F2] pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none" style={{ background: 'var(--royal-purple)' }} />
            <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none" style={{ background: 'var(--soft-gold)' }} />

            <div className="grid-container relative z-10">
                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16">

                    {/* Brand Column */}
                    <div className="max-w-md">
                        <Link href="/" className="inline-block group mb-6">
                            <span className="Heading-Serif text-3xl lg:text-4xl tracking-tight text-[#F2F2F2] block mb-1 transition-transform duration-500 group-hover:scale-105">
                                HOMELY
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D6B36A] block font-bold">
                                Health Care
                            </span>
                        </Link>
                        <p className="text-sm lg:text-base text-[#F2F2F2]/60 font-light leading-relaxed max-w-xs">
                            Excellence in private home care, delivering dignity and compassion tailored to your unique lifestyle.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto">

                        {/* Column 1: Navigation */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Navigation</h4>
                            <nav className="flex flex-col gap-3 text-sm text-[#F2F2F2]/50 font-light">
                                <Link href="/" className="hover:text-[#D6B36A] transition-colors">Home</Link>
                                <Link href="/about-us" className="hover:text-[#D6B36A] transition-colors">About</Link>
                                <Link href="/services" className="hover:text-[#D6B36A] transition-colors">Services</Link>
                                <Link href="/meet-the-team" className="hover:text-[#D6B36A] transition-colors">Team</Link>
                                <Link href="/careers" className="hover:text-[#D6B36A] transition-colors">Careers</Link>
                            </nav>
                        </div>

                        {/* Column 2: Connect */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Connect</h4>
                            <nav className="flex flex-col gap-3 text-sm text-[#F2F2F2]/50 font-light">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B36A] transition-colors">LinkedIn</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B36A] transition-colors">Facebook</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B36A] transition-colors">Instagram</a>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6B36A] transition-colors">YouTube</a>
                            </nav>
                        </div>

                        {/* Column 3: Inquiries */}
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Inquiries</h4>
                            <div className="text-sm font-light text-[#F2F2F2]/50 space-y-3">
                                <p className="text-[#F2F2F2] font-normal">0203 916 5797</p>
                                <p className="hover:text-[#D6B36A] cursor-pointer transition-colors break-all">info@homelyhealthcare.org.uk</p>
                                <div className="mt-6 h-px w-10 bg-[#D6B36A]/40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Divider */}
                <div className="w-full h-px bg-white/[0.05] mb-10" />

                {/* Final Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-[#F2F2F2]/30 font-bold">

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full" />
                            CQC Regulated
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full" />
                            NHS Framework Approved
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#D6B36A] rounded-full" />
                            Skills for Care
                        </span>
                    </div>

                    {/* Legal & Copyright */}
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <p className="text-[#F2F2F2]/20 font-light">&copy; {new Date().getFullYear()} HOMELY HEALTH CARE</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
