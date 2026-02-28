"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, HeartHandshake, ArrowRight } from "lucide-react";

const jobs = [
    {
        title: "Senior Care Practitioner",
        type: "Full-Time",
        location: "London & Surrounding Areas",
        description: "Leading a team to deliver exceptional complex care. Requires Level 3 NVQ and significant clinical experience."
    },
    {
        title: "Live-in Care Specialist",
        type: "Flexible / Rotational",
        location: "National",
        description: "Providing dedicated 24/7 support. Focus on companionship and high-end clinical assistance."
    },
    {
        title: "Registered Manager",
        type: "Full-Time",
        location: "Head Office",
        description: "Overseeing clinical compliance and operational excellence across our service portfolio."
    }
];

export default function Careers() {
    return (
        <main className="min-h-screen bg-[#F7F5F2]">

            {/* HERO SECTION */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-premium-dark text-center">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ background: '#D6B36A' }} />

                <div className="grid-container relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#D6B36A] text-[10px] tracking-[0.6em] uppercase block mb-8 font-bold"
                    >
                        Join Our Mission
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="Heading-H1 text-white mb-8"
                    >
                        A Career in <span className="Heading-Serif italic font-light text-[#B9A3D3]">Excellence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#F2F2F2]/60 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        We are looking for individuals who view care not just as a profession, but as a calling. At Homely, we invest in your growth as much as you invest in our clients.
                    </motion.p>
                </div>
            </section>

            {/* CULTURE SECTION */}
            <section className="section-padding bg-white/40">
                <div className="grid-container">
                    <div className="grid md:grid-cols-3 gap-16 text-center">
                        {[
                            { icon: GraduationCap, title: "Elite Training", desc: "Access to specialist nursing modules and advanced clinical certifications." },
                            { icon: HeartHandshake, title: "Supportive Culture", desc: "A management team that prioritises your emotional well-being and professional balance." },
                            { icon: Briefcase, title: "Career Path", desc: "Clear progression routes from support roles to clinical and operational management." }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="w-16 h-16 bg-[#5B2A86]/5 rounded-2xl flex items-center justify-center text-[#5B2A86] mx-auto mb-8 group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                                    <item.icon className="w-8 h-8 stroke-[1.5]" />
                                </div>
                                <h3 className="Heading-Serif text-2xl text-[#1B1326] mb-4">{item.title}</h3>
                                <p className="text-[#1B1326]/60 font-light text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* JOB LISTINGS */}
            <section className="section-padding">
                <div className="grid-container">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#5B2A86] text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Current Opportunities</span>
                            <h2 className="Heading-H2 text-[#1B1326]">Find Your Place in Our <span className="Heading-Serif italic font-light text-[#5B2A86]">Community</span></h2>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {jobs.map((job, idx) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card-light p-10 lg:p-12 border-[#5B2A86]/5 group hover:border-[#5B2A86]/20 transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-10">
                                    <div className="flex-1">
                                        <div className="flex gap-4 mb-4">
                                            <span className="px-3 py-1 bg-[#5B2A86]/10 text-[#5B2A86] text-[9px] uppercase tracking-widest font-bold rounded-full">{job.type}</span>
                                            <span className="text-[#1B1326]/40 text-[9px] uppercase tracking-widest font-bold pt-1">{job.location}</span>
                                        </div>
                                        <h3 className="Heading-Serif text-2xl text-[#1B1326] mb-4 group-hover:text-[#5B2A86] transition-colors">{job.title}</h3>
                                        <p className="text-[#1B1326]/60 font-light text-sm max-w-2xl">{job.description}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-[#5B2A86] font-bold text-[10px] uppercase tracking-[0.2em]">
                                        <span>Apply Now</span>
                                        <div className="w-10 h-10 border border-[#5B2A86]/20 rounded-full flex items-center justify-center group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
