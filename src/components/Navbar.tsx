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
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 inset-x-0 z-50 transition-colors duration-700 flex items-center h-28 ${scrolled || mobileMenuOpen ? "bg-[#fdfcff]/95 backdrop-blur-xl shadow-sm border-b border-[#1c1c1c]/5" : "bg-[#fdfcff]/90 backdrop-blur-md"
                    }`}
            >
                <div className="grid-container flex justify-between items-center w-full">
                    {/* LOGO */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center group relative z-50">
                        <Image
                            src="/logo-final.png"
                            alt="Homely Healthcare Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </Link>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-xs uppercase tracking-[0.2em] transition-colors relative group font-medium text-[#1c1c1c]/60 hover:text-[#1c1c1c]"
                            >
                                {item.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#8da399] transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CONTACT CTA */}
                    <div className="hidden lg:block relative z-50">
                        <Link
                            href="/contact-us"
                            className="text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold transition-all duration-500 bg-[#1c1c1c] text-white hover:bg-[#8da399] hover:-translate-y-1 inline-block"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* MOBILE MENU BTN */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden relative z-50 p-3 -mr-3 transition-colors text-[#1c1c1c]"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.header>

            {/* MOBILE DRAWER */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-[#fdfcff] pt-32 px-6 pb-12 flex flex-col justify-between"
                    >
                        <nav className="flex flex-col gap-8 mt-8">
                            {NAV_LINKS.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl uppercase tracking-[0.2em] font-medium text-[#1c1c1c]"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="h-[1px] w-full bg-[#1c1c1c]/10" />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#8da399] mb-4 font-semibold">Contact</p>
                                <a href="tel:01202948898" className="block text-2xl font-light text-[#1c1c1c] mb-2">01202 948 898</a>
                                <p className="text-sm text-[#1c1c1c]/60">Available 24/7</p>
                            </div>
                            <Link
                                href="/contact-us"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center bg-[#1c1c1c] text-white py-5 text-sm uppercase tracking-[0.2em] font-medium"
                            >
                                Speak To Us
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
