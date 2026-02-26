"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-[#fdfcff] pt-32 pb-12">
            <div className="grid-container">
                <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
                    {/* Brand & About */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block mb-12">
                            <span className="Heading-Serif text-3xl tracking-tight text-[#fdfcff]">
                                HOMELY
                            </span><br />
                            <span className="text-[9px] uppercase tracking-[0.4em] text-[#8da399]">
                                Health Care
                            </span>
                        </Link>

                        <h2 className="Heading-H4 text-white mb-8">
                            Experience true <br /><span className="italic text-[#8da399] font-light">compassion.</span>
                        </h2>

                        <div className="flex flex-col gap-4 mt-8">
                            <Link href="/about-us" className="text-sm text-[#fdfcff]/70 hover:text-[#8da399] transition-colors font-light tracking-wide w-max">Our Story</Link>
                            <Link href="/meet-the-team" className="text-sm text-[#fdfcff]/70 hover:text-[#8da399] transition-colors font-light tracking-wide w-max">Meet the Management</Link>
                            <Link href="/careers" className="text-sm text-[#fdfcff]/70 hover:text-[#8da399] transition-colors font-light tracking-wide w-max">Join our Team</Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="lg:col-start-6 lg:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#fdfcff]/40 mb-8 font-semibold">Services</h4>
                        <ul className="space-y-6">
                            {[
                                { name: "Home Care", path: "/services" },
                                { name: "Live-in & Companionship", path: "/services" },
                                { name: "Supported Living", path: "/services" },
                                { name: "Residential & Nursing Support", path: "/services" },
                                { name: "TDDI / Complex Care", path: "/services" }
                            ].map((service) => (
                                <li key={service.name}>
                                    <Link href={service.path} className="text-sm text-[#fdfcff]/70 hover:text-[#8da399] transition-colors font-light tracking-wide">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-4 lg:col-start-9">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#fdfcff]/40 mb-8 font-semibold">Head Office Contact</h4>
                        <ul className="space-y-6 text-sm text-[#fdfcff]/70 font-light tracking-wide leading-relaxed">
                            <li><a href="mailto:info@homelyhealth.uk" className="hover:text-[#8da399] transition-colors">info@homelyhealth.uk</a></li>
                            <li className="grid grid-cols-[100px_1fr] gap-4">
                                <span className="text-white/30 text-xs mt-1">Office Line</span>
                                <a href="tel:01202948898" className="hover:text-[#8da399] transition-colors">01202 948 898</a>

                                <span className="text-white/30 text-xs mt-1">24/7 Mobile</span>
                                <div>
                                    <a href="tel:07985591098" className="hover:text-[#8da399] transition-colors block">07985 591 098</a>
                                    <span className="text-[10px] text-[#8da399] italic tracking-wider">Available 24/7 for emergencies</span>
                                </div>
                            </li>
                            <li className="pt-6 border-t border-white/10">
                                Homely Health Care<br />
                                Suite 6a, Wessex House<br />
                                St. Leonards Road<br />
                                Charminster, Bournemouth<br />
                                BH8 8QS
                            </li>
                        </ul>
                        <div className="mt-12">
                            <Link
                                href="/contact-us"
                                className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] border-b border-[#fdfcff]/30 pb-2 hover:text-[#8da399] hover:border-[#8da399] transition-colors"
                            >
                                Speak With Our Team
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-[#fdfcff]/50">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <p>Copyright © Homely Health Care 2022-{new Date().getFullYear()}</p>
                        <div className="flex gap-4 opacity-70">
                            <a href="#" aria-label="Facebook" className="hover:text-[#8da399] transition-colors"><Facebook size={16} /></a>
                            <a href="#" aria-label="Instagram" className="hover:text-[#8da399] transition-colors"><Instagram size={16} /></a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-[#8da399] transition-colors"><Linkedin size={16} /></a>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                        <Link href="/privacy" className="hover:text-[#8da399] transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="hover:text-[#8da399] transition-colors">Cookie Policy</Link>
                        <Link href="/terms" className="hover:text-[#8da399] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
