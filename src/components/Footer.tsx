"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1c1c1c] text-[#faf9f6] pt-32 pb-12 mt-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
                    <div className="lg:col-span-2">
                        <h2 className="Heading-Display text-white mb-8">
                            Experience true <br /><span className="italic text-[#csa265]">elegance.</span>
                        </h2>
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] border-b border-[#csa265] pb-2 hover:opacity-70 transition-opacity"
                        >
                            Request a Private Tour
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#8e948c] mb-8 font-semibold">Residences</h4>
                        <ul className="space-y-4">
                            {["London", "Bournemouth", "Surrey", "Cheshire"].map((city) => (
                                <li key={city}>
                                    <Link href={`/residences/${city.toLowerCase()}`} className="text-sm text-[#faf9f6]/70 hover:text-white transition-colors">
                                        {city} Estate
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#8e948c] mb-8 font-semibold">Contact</h4>
                        <ul className="space-y-4 text-sm text-[#faf9f6]/70">
                            <li>enquiries@homelyhealth.uk</li>
                            <li>+44 (0) 20 7123 4567</li>
                            <li className="pt-4">
                                124 Luxury Lane<br />
                                Mayfair, London<br />
                                W1K 4DT
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8e948c]">
                    <p>© {new Date().getFullYear()} Homely Health Care. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
