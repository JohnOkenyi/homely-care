"use client";

import Link from "next/link";


export default function Footer() {
    return (
        <footer className="bg-[#1c1c1c] text-[#fdfcff] pt-24 pb-12 overflow-hidden border-t border-[#fdfcff]/5">
            <div className="grid-container max-w-6xl">

                {/* Top Section - Brand & Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
                    <Link href="/" className="inline-block">
                        <span className="Heading-Serif text-2xl tracking-tight text-[#fdfcff] block">
                            HOMELY
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.4em] text-[#fdfcff]/50 block mt-1">
                            Health Care
                        </span>
                    </Link>

                    <nav className="flex flex-wrap items-center gap-x-6 gap-y-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-[#fdfcff]/60">
                        <Link href="/" className="hover:text-white transition-colors">HOME</Link>
                        <span className="text-[#fdfcff]/20">&middot;</span>
                        <Link href="/about-us" className="hover:text-white transition-colors">ABOUT</Link>
                        <span className="text-[#fdfcff]/20">&middot;</span>
                        <Link href="/services" className="hover:text-white transition-colors">SERVICES</Link>
                        <span className="text-[#fdfcff]/20">&middot;</span>
                        <Link href="/meet-the-team" className="hover:text-white transition-colors">MEET THE TEAM</Link>
                        <span className="text-[#fdfcff]/20">&middot;</span>
                        <Link href="/careers" className="hover:text-white transition-colors">CAREERS</Link>
                        <span className="text-[#fdfcff]/20">&middot;</span>
                        <Link href="/contact-us" className="hover:text-white transition-colors underline underline-offset-4 decoration-[#fdfcff]/30">CONTACT US</Link>
                    </nav>
                </div>

                {/* Middle Divider */}
                <div className="w-full h-px bg-[#fdfcff]/10 mb-12" />

                {/* Bottom Section - Socials, Accreditations, Copyright */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 text-[10px] uppercase tracking-widest text-[#fdfcff]/40">

                    {/* Socials */}
                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">YOUTUBE</a>
                        <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
                        <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
                    </div>

                    {/* Accreditations */}
                    <div className="flex items-center gap-6 opacity-60">
                        <span>CQC REGULATED</span>
                        <span className="w-1 h-1 rounded-full bg-[#fdfcff]/20" />
                        <span>NHS PARTNER</span>
                        <span className="w-1 h-1 rounded-full bg-[#fdfcff]/20" />
                        <span>SKILLS FOR CARE</span>
                    </div>

                    {/* Legal & Copyright */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">TERMS</Link>
                        <p>&copy; {new Date().getFullYear()} HOMELY HEALTH CARE</p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
