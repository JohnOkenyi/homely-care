"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Careers() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#1c1c1c] text-[#faf9f6]">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-24 max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#c5a265] text-xs uppercase tracking-[0.3em] font-bold mb-6"
                >
                    Join Our Team
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="Heading-Display text-white"
                >
                    A rewarding career in <span className="italic text-[#c5a265]">luxury care.</span>
                </motion.h1>
            </section>

            <section className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="space-y-8 text-[#8e948c] text-lg font-light leading-relaxed"
                >
                    <p>
                        We operate a robust recruitment and selection process which ensures that all staff are thoroughly referenced, DBS checked and appropriately trained to a high standard.
                    </p>
                    <p>
                        If you are passionate about providing high-quality, person-centered care and want to work in an environment that values dignity and respect, we would love to hear from you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-16"
                >
                    <Link
                        href="/contact-us"
                        className="inline-block border border-[#c5a265] text-[#c5a265] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#c5a265] hover:text-[#1c1c1c] transition-all duration-500"
                    >
                        Apply Now
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
