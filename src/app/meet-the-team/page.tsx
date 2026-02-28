"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Heart } from "lucide-react";

const team = [
    {
        name: "Lola Okenyi",
        role: "Managing Director",
        bio: "With over 15 years of leadership in private healthcare, Lola is dedicated to setting new standards for dignity and compassion in home care.",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop",
        accolade: "Dignity in Care Award"
    },
    {
        name: "James Sterling",
        role: "Clinical Lead",
        bio: "A specialist in complex care management, James ensures our nurse-led interventions are delivered with absolute clinical precision.",
        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1600&auto=format&fit=crop",
        accolade: "Excellence in Nursing"
    },
    {
        name: "Sarah Montgomery",
        role: "Head of Operations",
        bio: "Sarah meticulously oversees our bespoke care packages, ensuring every client experience aligns with our luxury brand promise.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1600&auto=format&fit=crop",
        accolade: "Operations Excellence"
    }
];

export default function MeetTheTeam() {
    return (
        <main className="min-h-screen bg-[#F7F5F2]">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-premium-dark text-center">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ background: '#5B2A86' }} />

                <div className="grid-container relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#D6B36A] text-[10px] tracking-[0.6em] uppercase block mb-8 font-bold"
                    >
                        Visionary Leadership
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="Heading-H1 text-white mb-8"
                    >
                        Meet the <span className="Heading-Serif italic font-light">Team</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#F2F2F2]/60 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Our leadership team combines clinical expertise with a profound passion for personal dignity, ensuring your care is in the most capable hands.
                    </motion.p>
                </div>
            </section>

            {/* TEAM GRID - Editorial Style */}
            <section className="section-padding relative z-20">
                <div className="grid-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {team.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-10 shadow-2xl">
                                    <Image src={member.img} alt={member.name} fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1326]/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-8 left-8">
                                        <div className="flex items-center gap-3 bg-[#D6B36A]/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <Award className="w-4 h-4 text-[#1B1326]" />
                                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1B1326]">{member.accolade}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center lg:text-left px-4 lg:px-0">
                                    <span className="text-[#5B2A86] text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">{member.role}</span>
                                    <h2 className="Heading-Serif text-3xl text-[#1B1326] mb-6 group-hover:text-[#5B2A86] transition-colors">{member.name}</h2>
                                    <p className="text-base text-[#1B1326]/70 font-light leading-relaxed mb-8">
                                        {member.bio}
                                    </p>
                                    <div className="h-[1px] w-12 bg-[#D6B36A] group-hover:w-full transition-all duration-700" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Culture/Philosophy Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="mt-24 p-16 lg:p-24 glass-card-light text-center border-[#5B2A86]/10"
                    >
                        <Heart className="w-10 h-10 text-[#5B2A86] mx-auto mb-8 opacity-40" />
                        <h2 className="Heading-Serif text-4xl text-[#1B1326] mb-12">Driven by <span className="italic font-light text-[#5B2A86]">Collective Compassion.</span></h2>
                        <div className="grid md:grid-cols-3 gap-12 text-left pt-12 border-t border-[#5B2A86]/5">
                            <div>
                                <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D6B36A] mb-4">The Human Touch</h3>
                                <p className="text-sm text-[#1B1326]/60 font-light">We hand-select every carer, looking beyond qualifications for true emotional intelligence.</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D6B36A] mb-4">Continuous Growth</h3>
                                <p className="text-sm text-[#1B1326]/60 font-light">Our team undergoes constant clinical training to remain at the absolute peak of their field.</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D6B36A] mb-4">Shared Purpose</h3>
                                <p className="text-sm text-[#1B1326]/60 font-light">Every staff member is united by our &apos;Dignity First&apos; charter, ensuring consistency across every touchpoint.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
