"use client";

import { motion } from "framer-motion";

export default function ContactUs() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#faf9f6]">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-24 max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#c5a265] text-xs uppercase tracking-[0.3em] font-bold mb-6"
                >
                    Get in Touch
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="Heading-Display text-[#1c1c1c]"
                >
                    We are here <span className="italic text-[#c5a265]">to help.</span>
                </motion.h1>
            </section>

            <section className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="Heading-H2 text-[#1c1c1c] mb-8">Contact Information</h2>
                    <div className="space-y-8 text-[#8e948c] text-lg font-light leading-relaxed">
                        <div>
                            <h3 className="text-[#1c1c1c] font-medium tracking-wide uppercase text-sm mb-2">Head Office Address</h3>
                            <p>Suite 6a, Wessex House, St. Leonards Road,<br />Charminster, Bournemouth, BH8 8QS</p>
                        </div>
                        <div>
                            <h3 className="text-[#1c1c1c] font-medium tracking-wide uppercase text-sm mb-2">Telephone</h3>
                            <p>01202 948 898<br />07985 591 098</p>
                        </div>
                        <div>
                            <h3 className="text-[#1c1c1c] font-medium tracking-wide uppercase text-sm mb-2">Email</h3>
                            <p>
                                <a href="mailto:info@homelyhealth.uk" className="border-b border-[#c5a265] hover:text-[#c5a265] transition-colors">info@homelyhealth.uk</a>
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <form className="bg-white p-12 shadow-sm border border-black/5 rounded-sm flex flex-col gap-6">
                        <h3 className="Heading-Serif text-3xl mb-4 text-[#1c1c1c]">Send us a message</h3>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-[#8e948c]">Name</label>
                            <input type="text" className="border-b border-[#8e948c]/30 pb-2 outline-none focus:border-[#c5a265] transition-colors text-[#1c1c1c] bg-transparent" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-[#8e948c]">Email</label>
                            <input type="email" className="border-b border-[#8e948c]/30 pb-2 outline-none focus:border-[#c5a265] transition-colors text-[#1c1c1c] bg-transparent" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-widest text-[#8e948c]">Message</label>
                            <textarea rows={4} className="border-b border-[#8e948c]/30 pb-2 outline-none focus:border-[#c5a265] transition-colors text-[#1c1c1c] bg-transparent resize-none" />
                        </div>
                        <button type="button" className="mt-8 bg-[#1c1c1c] text-white py-4 text-xs uppercase tracking-widest hover:bg-[#c5a265] transition-colors">
                            Submit Enquiry
                        </button>
                    </form>
                </motion.div>
            </section>

            {/* Compliments Section */}
            <section className="bg-[#1c1c1c] text-[#faf9f6] py-32">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="Heading-Serif text-4xl mb-8"
                    >
                        Compliments & Feedback
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[#8e948c] text-lg font-light leading-relaxed mb-12"
                    >
                        At Homely Health Care we take great pride in the work that our staff do. We consistently seek feedback from the clients that we support and/or their family and friends as well as other professionals that we work closely with to ensure that we consistently deliver a high service. We like to celebrate success as well as replicate the practices that have resulted in the compliments.
                    </motion.p>
                </div>
            </section>
        </main>
    );
}
