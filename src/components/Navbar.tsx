"use client";

import { useState } from "react";
import Link from "next/link";
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
                className={`fixed top-0 inset-x-0 z-50 transition-colors duration-700 flex items-center h-28 ${scrolled || mobileMenuOpen ? "bg-[#fdfcff]/95 backdrop-blur-xl shadow-sm border-b border-[#3a2051]/5" : "bg-transparent text-[#f3effa]"
                    }`}
            >
                <div className="grid-container flex justify-between items-center w-full">
                    {/* LOGO */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center group relative z-50">
                        <span className={`Heading-Serif text-3xl tracking-tight transition-colors duration-500 ${scrolled || mobileMenuOpen ? "text-[#3a2051]" : "text-[#f3effa]"}`}>
                            HOMELY
                        </span>
                        <span className={`text-[9px] uppercase tracking-[0.4em] mt-1 ${scrolled || mobileMenuOpen ? "text-[#c5a265]" : "text-[#c5a265]/80"}`}>
                            Health Care
                        </span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden lg:flex items-center gap-10 xl:gap-14">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`text-xs uppercase tracking-[0.2em] transition-colors relative group font-medium ${scrolled || mobileMenuOpen ? "text-[#1c1c1c]/80 hover:text-[#3a2051]" : "text-[#f3effa]/90 hover:text-white"}`}
                            >
                                {item.name}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#c5a265] transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CONTACT CTA */}
                    <div className="hidden lg:block relative z-50">
                        <Link
                            href="/contact-us"
                            className={`text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold transition-all duration-500 ${scrolled || mobileMenuOpen ? "bg-[#3a2051] text-white hover:bg-[#4e2b6e]" : "bg-[#c5a265] text-[#150f1d] hover:bg-white"}`}
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* MOBILE MENU BTN */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden relative z-50 p-2 transition-colors ${scrolled || mobileMenuOpen ? "text-[#3a2051]" : "text-[#fdfcff]"}`}
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
                                        className="Heading-Serif text-4xl text-[#3a2051]"
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
                                <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a265] mb-4 font-semibold">Contact</p>
                                <a href="tel:01202948898" className="block text-2xl font-light text-[#3a2051] mb-2">01202 948 898</a>
                                <p className="text-sm text-[#1c1c1c]/60">Available 24/7</p>
                            </div>
                            <Link
                                href="/contact-us"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center bg-[#3a2051] text-white py-5 text-sm uppercase tracking-[0.2em] font-medium"
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
