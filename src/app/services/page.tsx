"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
    {
        title: "Home Care",
        desc: "Professional clinical support in the comfort and familiarity of your own residence. We provide solutions to meet your needs as we believe that every individual is different and as a result your care and support must be person-centred."
    },
    {
        title: "Live-in Care",
        desc: "Expert round-the-clock support, providing peace of mind for you and your family. Living in your own home with one-on-one personal attention."
    },
    {
        title: "Supported Living",
        desc: "Empowering adults with learning and/or physical disabilities to live independently while receiving tailored clinical care and support."
    },
    {
        title: "Residential & Nursing Home Support",
        desc: "Providing highly trained staffing solutions to residential and care homes when additional high-quality support is required."
    },
    {
        title: "TDDI / Complex Care",
        desc: "Treatment of Disease, Disorder, or Injury. Specialized clinical approach for those with advanced medical and support requirements."
    }
];

export default function Services() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-[#ffffff] text-[#1c1c1c]">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-24 max-w-4xl text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[#8da399] text-xs uppercase tracking-[0.3em] font-bold mb-6"
                >
                    Specialized Support
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="Heading-Display text-[#1c1c1c]"
                >
                    Comprehensive services, <br /><span className="italic text-[#8da399]">expertly delivered.</span>
                </motion.h1>
            </section>

            {/* Services List */}
            <section className="container mx-auto px-6 md:px-12 max-w-5xl">
                <div className="flex flex-col gap-8">
                    {services.map((srv, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="group border-b border-[#1c1c1c]/10 py-12 hover:bg-[#faf9f8] transition-colors cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-8 -mx-6 px-6 md:-mx-12 md:px-12"
                        >
                            <div className="flex-1">
                                <span className="text-[#8da399] text-xs tracking-widest block mb-4">0{i + 1}</span>
                                <h3 className="Heading-Serif text-3xl mb-4 text-[#1c1c1c]">{srv.title}</h3>
                                <p className="text-[#1c1c1c]/70 leading-relaxed max-w-2xl">{srv.desc}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-[#1c1c1c]/20 flex items-center justify-center group-hover:bg-[#1c1c1c] group-hover:border-[#1c1c1c] transition-all duration-500">
                                <ArrowUpRight size={20} className="text-[#1c1c1c] group-hover:text-white transition-colors duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 md:px-12 mt-32 text-center">
                <p className="text-[#1c1c1c]/70 text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
                    Our highly specialised team of Carers, Support Workers and Specialist Nurses offer a variety of services to clients living in their own homes.
                </p>
                <Link
                    href="/contact-us"
                    className="inline-block border border-[#1c1c1c]/20 text-[#1c1c1c] px-10 py-4 text-xs uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white hover:border-transparent transition-all duration-500"
                >
                    Discuss Your Needs
                </Link>
            </section>
        </main>
    );
}
