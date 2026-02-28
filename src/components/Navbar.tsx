"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

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

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 flex items-center h-24 ${scrolled || mobileMenuOpen ? 'bg-[#F7F5F2]/98 backdrop-blur-xl shadow-sm border-b border-[#5B2A86]/10' : 'bg-[#F7F5F2]/90 backdrop-blur-md'
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
                                style={{ filter: 'saturate(1.2) brightness(1.1)' }}
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

            {/* MOBILE DRAWER */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-[#F7F5F2] pt-32 px-8 pb-12 flex flex-col justify-between"
                    >
                        <nav className="flex flex-col gap-10 mt-8">
                            {NAV_LINKS.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl uppercase tracking-[0.2em] font-light text-[#1B1326] flex items-center group"
                                    >
                                        <span className="Heading-Serif italic text-[#D6B36A] text-lg mr-4 opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-col gap-10"
                        >
                            <div className="h-[1px] w-full bg-[#5B2A86]/10" />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#5B2A86] mb-4 font-bold">Inquiries</p>
                                <a href="tel:01202948898" className="block text-3xl font-light text-[#1B1326] mb-2">01202 948 898</a>
                                <p className="text-sm text-[#1B1326]/60">Available for you 24/7</p>
                            </div>
                            <Link
                                href="/contact-us"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center bg-[#5B2A86] text-white py-6 text-xs uppercase tracking-[0.3em] font-bold shadow-xl"
                            >
                                Speak With Us
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
