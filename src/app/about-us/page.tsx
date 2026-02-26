"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#faf9f6]">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-24 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#c5a265] text-xs uppercase tracking-[0.3em] font-bold mb-6"
                >
                    Our Story
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="Heading-Display text-[#1c1c1c] max-w-4xl mx-auto"
                >
                    Compassionate care that is <span className="italic text-[#c5a265]">focused on you.</span>
                </motion.h1>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative h-[600px] w-full rounded-sm overflow-hidden"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=2670&auto=format&fit=crop"
                        alt="Compassionate Care"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-8 text-[#8e948c] text-lg font-light leading-relaxed"
                >
                    <h2 className="Heading-H2 text-[#1c1c1c]">Why Choose <br />Homely Health Care?</h2>
                    <p>
                        As a leading healthcare agency, Homely Health Care is committed to connecting you with exceptional care services tailored to your unique needs. We provide solutions to meet your needs as we believe that every individual is different and as a result your care and support must be person-centred.
                    </p>
                    <p>
                        At Homely Health Care we are dedicated to creating an atmosphere of care and support which enables and encourages you to lead a full and independent life. Our friendly team of staff are highly trained to deliver person centred care which allows you to choose how you live whilst maintaining dignity and respect.
                    </p>

                    <div className="pt-8 border-t border-[#1c1c1c]/10">
                        <h3 className="Heading-Serif text-2xl text-[#1c1c1c] mb-4">Our Commitment</h3>
                        <p>
                            We operate a robust recruitment and selection process which ensures that all staff are thoroughly referenced, DBS checked and appropriately trained to a high standard.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Charity Section */}
            <section className="bg-[#1c1c1c] text-[#faf9f6] py-32">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 mx-auto border border-[#c5a265] rounded-full flex items-center justify-center mb-8">
                            <div className="w-4 h-4 bg-[#c5a265] rounded-full" />
                        </div>
                        <h2 className="Heading-Serif text-4xl md:text-5xl mb-8">Giving Back</h2>
                        <p className="text-[#8e948c] text-lg lg:text-xl font-light leading-relaxed mb-12">
                            We are proud to say that we give a percentage of our profits to a small children’s education charity, The Rahula Trust, who do amazing work to support children in their education in various parts of the world.
                        </p>
                        <a
                            href="http://www.rahula-trust.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border-b border-[#c5a265] pb-2 text-sm uppercase tracking-widest hover:text-[#c5a265] transition-colors"
                        >
                            Discover The Rahula Trust
                        </a>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
