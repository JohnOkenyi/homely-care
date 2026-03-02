"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useEffect } from "react";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Services", path: "/services" },
    { name: "Meet The Team", path: "/meet-the-team" },
    { name: "Careers", path: "/careers" }
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    // Body Scroll Lock
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`fixed top-0 inset-x-0 z-50 flex items-center h-24 ${scrolled || mobileMenuOpen ? 'bg-[#F7F5F2]/98 backdrop-blur-xl shadow-sm border-b border-[#5B2A86]/10' : 'bg-[#F7F5F2]/90 backdrop-blur-md'
                    }`}
            >
                <div className="grid-container flex justify-between items-center w-full">
                    {/* LOGO */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center group relative z-50">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src="/logo-final.png"
                                alt="Homely Healthcare Logo"
                                fill
                                className="object-contain"
                                style={{ filter: 'saturate(1.2) brightness(1.1) url(#blackToAlpha)' }}
                                priority
                            />
                        </div>
                        <div className="ml-4 flex flex-col">
                            <span className="Heading-Serif text-xl tracking-tight text-[#5B2A86] block leading-none">
                                HOMELY
                            </span>
                            <span className="text-[8px] uppercase tracking-[0.4em] text-[#5B2A86]/60 block mt-1">
                                Health Care
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden lg:flex items-center gap-12">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-[10px] uppercase tracking-[0.25em] transition-colors relative group font-semibold text-[#1B1326]/60 hover:text-[#5B2A86]"
                            >
                                {item.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] transition-all duration-500 ease-out group-hover:w-full" style={{ background: '#5B2A86' }} />
                                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] transition-all duration-700 ease-out delay-75 group-hover:w-full opacity-30" style={{ background: '#D6B36A' }} />
                            </Link>
                        ))}
                    </nav>

                    {/* CONTACT CTA */}
                    <div className="hidden lg:block relative z-50">
                        <Link
                            href="/contact-us"
                            className="text-[10px] uppercase tracking-[0.25em] px-10 py-4 font-bold transition-all duration-500 text-white inline-block rounded-sm relative overflow-hidden group"
                            style={{ background: 'linear-gradient(135deg, #5B2A86, #7A4FB3)' }}
                        >
                            <span className="relative z-10">Contact Us</span>
                            <div className="absolute inset-0 bg-[#D6B36A] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ boxShadow: 'inset 0 0 20px rgba(214,179,106,0.5), 0 0 30px rgba(214,179,106,0.3)' }} />
                        </Link>
                    </div>

                    {/* MOBILE MENU BTN */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden relative z-50 p-3 -mr-3 transition-colors text-[#5B2A86]"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* PREMIUM MOBILE DRAWER */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-3xl lg:hidden overflow-hidden"
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0 }}
                            className="absolute inset-y-0 right-0 w-full max-w-md bg-[#F7F5F2] pt-32 px-8 pb-6 flex flex-col justify-between shadow-[-20px_0_60px_rgba(0,0,0,0.1)] overflow-hidden"
                        >
                            {/* Decorative Background Accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B2A86]/5 rounded-full blur-[100px] pointer-events-none" />

                            <nav className="flex flex-col gap-4 relative z-10">
                                {NAV_LINKS.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0 }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="group flex flex-col items-start"
                                        >
                                            <div className="flex items-end gap-3 overflow-hidden">
                                                <span className="Heading-Serif italic text-[#D6B36A] text-xl font-light mb-2">
                                                    0{i + 1}
                                                </span>
                                                <span className="Heading-Serif text-3xl md:text-4xl tracking-tight text-[#1B1326] group-hover:translate-x-3 transition-none">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <div className="w-0 h-[1.5px] bg-[#D6B36A] mt-2 group-hover:w-full opacity-40 transition-none" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0 }}
                                className="flex flex-col gap-4 relative z-10"
                            >
                                <div className="h-[1px] w-full bg-gradient-to-r from-[#5B2A86]/20 via-[#D6B36A]/20 to-transparent" />

                                <div className="flex justify-between items-end">
                                    <div className="space-y-2">
                                        <p className="text-[9px] uppercase tracking-[0.4em] text-[#5B2A86] font-extrabold opacity-60">Concierge</p>
                                        <a href="tel:01202948898" className="Heading-Serif text-2xl text-[#1B1326] hover:text-[#5B2A86] transition-colors decoration-[#D6B36A]/30 underline underline-offset-8">
                                            01202 948 898
                                        </a>
                                        <p className="text-[10px] text-[#1B1326]/50 tracking-wider">Available 24/7 for you</p>
                                    </div>

                                    <Link
                                        href="/contact-us"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-12 h-12 rounded-full bg-[#5B2A86] flex items-center justify-center text-white shadow-lg group transition-none"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-45 transition-none">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>

                                <Link
                                    href="/contact-us"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="relative py-5 bg-gradient-to-r from-[#D6B36A] via-[#5B2A86] to-[#1B1326] text-white text-[10px] uppercase tracking-[0.4em] font-extrabold text-center overflow-hidden group shadow-[0_10px_30px_rgba(91,42,134,0.3)] transition-none rounded-sm border border-white/10"
                                >
                                    <span className="relative z-10">Request Consultation</span>
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-none" />
                                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D6B36A] shadow-[0_0_15px_#D6B36A]" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
