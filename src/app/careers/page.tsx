"use client";

import { motion } from "framer-motion";
import {
    Users,
    Wallet,
    Calendar,
    Banknote,
    Trophy,
    GraduationCap,
    Zap,
    HeartHandshake,
    ArrowRight,
    Briefcase,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";

const OFFERS = [
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Flexible Scheduling",
        description: "Variety of shift patterns tailored to your lifestyle and commitments."
    },
    {
        icon: <Wallet className="w-6 h-6" />,
        title: "Competitive Pay",
        description: "Industry-leading rates of pay that value your expertise and dedication."
    },
    {
        icon: <Banknote className="w-6 h-6" />,
        title: "Weekly Payments",
        description: "Reliable weekly pay cycles to provide financial peace of mind."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Elite Teamwork",
        description: "A collaborative environment where every member is respected and heard."
    },
    {
        icon: <GraduationCap className="w-6 h-6" />,
        title: "Career Growth",
        description: "Comprehensive training and development pathways for your future."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Diverse Roles",
        description: "Different types of care work available to keep you energized and engaged."
    },
    {
        icon: <HeartHandshake className="w-6 h-6" />,
        title: "Consistent Support",
        description: "Regular supervision so you always feel supported in your role."
    }
];

const ROLES = [
    { title: "Care Assistant", slug: "care-assistant" },
    { title: "Support Worker", slug: "support-worker" },
    { title: "Senior Carer", slug: "senior-carer" },
    { title: "Registered Nurse", slug: "registered-nurse" }
];

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#0F1115] text-[#F2F2F2] selection:bg-[#B9A3D3]/30 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #0F1115 0%, #1B1326 55%, #24163A 100%)' }}>
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #B9A3D3 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#B9A3D3] mb-6 block">
                            Careers at Homely Health Care
                        </span>
                        <h1 className="Heading-Serif text-5xl md:text-7xl lg:text-8xl leading-none mb-8">
                            Join the <span className="italic font-light">Highest Standard</span> of Care
                        </h1>
                        <p className="Text-20 text-white/90 max-w-2xl font-light leading-relaxed">
                            We are always on the lookout for talented and dedicated staff to join our lovely and enthusiastic team. We value our staff and believe that they are our greatest asset.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Recruitment Note / CoS */}
            <section className="py-12 bg-[#D6B36A]/5 border-y border-[#D6B36A]/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#D6B36A]/10 flex items-center justify-center text-[#D6B36A]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#D6B36A]">Certificates of Sponsorship (CoS)</h3>
                                <p className="text-sm text-white/80">Please note that we are not currently recruiting from outside of the UK.</p>
                            </div>
                        </div>
                        <Link href="/contact-us" className="px-8 py-3 rounded-full border border-[#D6B36A]/30 text-[#D6B36A] text-[10px] uppercase font-bold tracking-widest hover:bg-[#D6B36A] hover:text-[#0F1115] transition-all">
                            Inquire Within
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* What we Offer */}
            <section className="py-24 bg-[#0F1115]">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="Heading-Serif text-4xl md:text-5xl mb-6">What we Offer</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#D6B36A] to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-2000">
                        {OFFERS.map((offer, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.15,
                                        z: 150,
                                        rotateX: -5,
                                        rotateY: 5,
                                        transition: { duration: 0.4, ease: "easeOut" }
                                    }}
                                    whileTap={{
                                        scale: 1.15,
                                        z: 150,
                                        rotateX: -5,
                                        rotateY: 5,
                                        transition: { duration: 0.1, ease: "easeOut" }
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className="p-8 h-full bg-[#1B1326]/40 backdrop-blur-xl border border-white/5 group-hover:border-[#D6B36A]/40 rounded-2xl transition-all duration-500 shadow-2xl group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)] group-hover:bg-[#1B1326]/80 select-none pointer-events-auto"
                                >
                                    <div className="text-[#D6B36A] mb-8 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-[#D6B36A] group-hover:text-[#1B1326] transition-all duration-700 group-hover:rotate-12">
                                        {offer.icon}
                                    </div>
                                    <h4 className="text-white font-serif italic text-xl mb-4 group-hover:text-[#D6B36A] transition-colors">{offer.title}</h4>
                                    <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors">{offer.description}</p>

                                    {/* Interaction Glow */}
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D6B36A]/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Excellence */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5B2A86]/20 rounded-full blur-[100px] -mr-64 -mt-32" />
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="Heading-Serif text-4xl md:text-5xl mb-8">Team Excellence</h2>
                            <div className="space-y-6 text-white/90 font-light leading-relaxed Text-18">
                                <p>
                                    We value our team of Carers, Support Workers and Registered Nurses as we are well aware that they are our biggest asset and the face of Homely Health Care on a daily basis.
                                </p>
                                <p>
                                    We know the importance of meeting outside work not just for team building exercises but as a way of fostering pride and commitment to being part of the Homely Health Care family.
                                </p>
                                <p>
                                    So we arrange fun days out throughout the year allowing those who are available to come along for some fun and down time.
                                </p>
                            </div>
                        </motion.div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-8">
                                <Trophy className="w-12 h-12 text-[#D6B36A] opacity-20" />
                            </div>
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-[#24163A] mt-12 flex items-center justify-center p-8">
                                <Users className="w-12 h-12 text-[#B9A3D3] opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Available Roles */}
            <section className="py-24 bg-white selection:text-black">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl text-black">
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#5B2A86] mb-4 block">Current Opportunities</span>
                            <h2 className="Heading-Serif text-4xl md:text-6xl text-[#0F1115]">Available Roles</h2>
                            <p className="mt-6 text-black/80 font-medium">
                                We offer a wide range of opportunities suited to your skills and experience. If you are interested in any of the roles below, please get in touch.
                            </p>
                        </div>
                        <Link href="/contact-us" className="text-black font-bold uppercase tracking-widest text-xs flex items-center gap-4 group">
                            Start Your Application
                            <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-[#0F1115] group-hover:text-white transition-all">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {ROLES.map((role, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex items-center justify-between p-10 border-b border-black/5 hover:bg-[#F9F9F9] transition-all"
                            >
                                <div className="flex items-center gap-8">
                                    <span className="text-black/20 font-light text-2xl">0{idx + 1}</span>
                                    <h3 className="Heading-Serif text-3xl md:text-4xl text-[#0F1115]">{role.title}</h3>
                                </div>
                                <div className="hidden md:flex items-center gap-12">
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/70">Full Time / Part Time</span>
                                    <Link href="/contact-us" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <Briefcase className="w-4 h-4 text-black" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-[#0F1115] text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="Heading-Serif text-5xl md:text-7xl mb-12">Start Your Journey Today</h2>
                        <Link
                            href="/contact-us"
                            className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#B9A3D3] text-[#0F1115] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all"
                        >
                            Contact Us Today
                        </Link>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}


