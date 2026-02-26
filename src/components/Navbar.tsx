"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 flex items-center h-24 ${scrolled ? "bg-[#faf9f6]/90 backdrop-blur-md shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center w-full">
                {/* LOGO */}
                <Link href="/" className="flex flex-col items-center group">
                    <span className="Heading-Serif text-2xl tracking-tight text-[#1c1c1c] group-hover:text-[#csa265] transition-colors">
                        HOMELY
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#8e948c] mt-1">
                        Health Care
                    </span>
                </Link>

                {/* LINKS */}
                <nav className="hidden md:flex items-center gap-10">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About Us", path: "/about-us" },
                        { name: "Services", path: "/services" },
                        { name: "Meet The Team", path: "/meet-the-team" },
                        { name: "Careers", path: "/careers" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="text-sm uppercase tracking-widest text-[#1c1c1c] hover:text-[#c5a265] transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a265] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link
                        href="/contact-us"
                        className="text-xs uppercase tracking-[0.2em] font-medium border border-[#1c1c1c] px-6 py-3 rounded-sm hover:bg-[#1c1c1c] hover:text-white transition-all duration-500"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* MOBILE MENU BTN */}
                <button className="md:hidden flex flex-col gap-[6px] p-2">
                    <div className="w-6 h-[1px] bg-[#1c1c1c]" />
                    <div className="w-6 h-[1px] bg-[#1c1c1c]" />
                </button>
            </div>
        </motion.header>
    );
}
