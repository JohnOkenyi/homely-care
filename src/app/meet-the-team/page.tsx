"use client";

import { motion } from "framer-motion";

export default function MeetTheTeam() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#faf9f8]">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-24 max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#8da399] text-xs uppercase tracking-[0.3em] font-bold mb-6"
                >
                    Our People
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="Heading-Display text-[#1c1c1c]"
                >
                    Driven by <span className="italic text-[#8da399]">compassion.</span>
                </motion.h1>
            </section>

            <section className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="space-y-8 text-[#1c1c1c]/70 text-lg font-light leading-relaxed"
                >
                    <p>
                        Our friendly and approachable management team are on hand to help with any questions or issues you may have. In addition, our Field Care Managers will visit you regularly in your home to ensure that the care you are receiving continues to be aligned with your wants and needs.
                    </p>
                    <p>
                        At Homely Health Care we take great pride in the work that our staff do. We consistently seek feedback from the clients that we support and/or their family and friends as well as other professionals that we work closely with to ensure that we consistently deliver a high service.
                    </p>
                </motion.div>

                {/* Placeholder for Team Grid if client adds photos later */}
                <div className="mt-32 grid md:grid-cols-3 gap-12">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="space-y-4 text-left">
                            <div className="aspect-[3/4] bg-[#f5f5f5] rounded-sm w-full" />
                            <h3 className="Heading-Serif text-xl text-[#1c1c1c]">Clinical Lead</h3>
                            <p className="text-[#1c1c1c]/50 text-sm tracking-widest uppercase">Senior Team</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
