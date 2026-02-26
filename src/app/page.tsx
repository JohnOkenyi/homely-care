"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, HeartHandshake, UserCheck, Award, Clock, Check, Heart } from "lucide-react";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - Monumental & Restrained */}
      <section ref={container} className="relative h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 bg-[#150f1d] overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          {/* Subtle bottom shadow just for text readability, no colored tint blocking the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150f1d]/80 via-transparent to-transparent z-10" />
          <Image
            src="/hero-house.jpg"
            alt="Homely Health Care Luxury Residence"
            fill
            className="object-cover"
            priority
            unoptimized={true}
          />
        </motion.div>

        <div className="relative z-20 grid-container h-full flex flex-col justify-end pb-24 text-[#f3effa]">
          <div className="max-w-4xl relative">

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 1, delay: 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-24 md:-top-32 right-0 hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full"
            >
              <div className="w-2 h-2 rounded-full bg-[#c5a265] animate-pulse" />
              <span className="text-sm font-medium tracking-wide">24/7 Dedicated Care</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-[#c5a265]" />
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#c5a265] font-medium">
                Luxury Home & Complex Care
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="Heading-Display mb-6"
            >
              A Life of <span className="italic text-[#c5a265] font-light">Dignity,</span><br />
              Tailored to You.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="Text-18 text-[#d1c8e1] max-w-2xl mb-10 font-light"
            >
              Experience world-class, person-centred support in the comfort of your own home, delivered by compassionate and highly trained professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Link href="/contact-us" className="bg-[#c5a265] text-[#150f1d] px-8 py-4 text-sm uppercase tracking-[0.1em] font-medium hover:bg-white transition-colors duration-300">
                Speak with our team
              </Link>
              <Link href="/services" className="group flex items-center gap-4 text-sm uppercase tracking-[0.1em] font-medium hover:text-[#c5a265] transition-colors duration-300">
                Explore care services
                <div className="h-[1px] w-8 bg-white group-hover:bg-[#c5a265] transition-colors duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-white border-b border-gray-100 py-10 relative z-20">
        <div className="grid-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-sm font-medium tracking-widest uppercase text-[#1c1c1c]">Regulated & Trusted By</span>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 text-[#primary]">
              <span className="font-bold text-2xl tracking-tighter">CQC</span>
              <span className="font-bold text-2xl tracking-tighter">NHS</span>
              <span className="font-bold text-xl tracking-tight">Skills for Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRODUCTION - Why Choose Us */}
      <section className="py-32 md:py-48 bg-[#fdfcff] text-[#1c1c1c] relative z-20">
        <div className="grid-container">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12"
            >
              <h2 className="Heading-H2 text-center max-w-4xl mx-auto">
                Why Choose <span className="italic text-[#c5a265]">Homely</span> Health Care?
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="space-y-6 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100/50 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-14 h-14 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Person-Centred Care</h3>
              <p className="Text-16 text-[#1c1c1c]/70">
                We believe every individual is unique. Your care plan is tailored specifically to your wants, needs, and lifestyle for maximum comfort and dignity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100/50 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-14 h-14 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Rigorous Vetting</h3>
              <p className="Text-16 text-[#1c1c1c]/70">
                Our robust selection process ensures all staff are thoroughly referenced, fully DBS checked, and appropriately trained to an exceptionally high standard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl border border-gray-100/50 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-14 h-14 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Approachable Management</h3>
              <p className="Text-16 text-[#1c1c1c]/70">
                Our friendly management team and Field Care Managers visit you regularly to guarantee the care you receive always aligns with your expectations.
              </p>
            </motion.div>
          </div>

          {/* Proof Points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mt-24 grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-6 bg-[#f3effa] p-6 rounded-2xl border border-white">
              <div className="w-12 h-12 bg-[#3a2051] rounded-full flex items-center justify-center text-[#c5a265]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#3a2051]">9.8/10</span>
                <span className="text-sm font-medium text-[#1c1c1c]/70 uppercase tracking-wide">Rated By Families</span>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-[#f3effa] p-6 rounded-2xl border border-white">
              <div className="w-12 h-12 bg-[#3a2051] rounded-full flex items-center justify-center text-[#c5a265]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#3a2051]">7+ Years</span>
                <span className="text-sm font-medium text-[#1c1c1c]/70 uppercase tracking-wide">Avg. Carer Experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL (Placeholder) */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="grid-container max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="Heading-H4 text-[#3a2051] italic text-2xl lg:text-3xl leading-relaxed">
              &quot;The level of dignity and true compassion the staff at Homely Health Care provides is unmatched. We feel so incredibly supported having them care for our mother.&quot;
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative">
                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="Client Family" fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#1c1c1c]">Sarah Jenkins</p>
                <p className="text-sm text-[#1c1c1c]/60">Daughter of Live-in Client, Dorset</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR COMPREHENSIVE SERVICES - Editorial Cards */}
      <section className="py-32 bg-[#150f1d] text-[#f3effa] overflow-hidden">
        <div className="grid-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-24 text-center"
          >
            <span className="text-[#c5a265] text-sm tracking-[0.3em] uppercase block mb-6">Expertise</span>
            <h2 className="Heading-H2">Our Care <span className="italic font-light">Services</span></h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Service 1 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="group">
              <div className="relative h-[40vh] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 bg-[#3a2051]/40 z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Link href="/services" className="px-8 py-3 bg-[#c5a265] text-[#150f1d] uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    View Home Care
                  </Link>
                </div>
                <Image src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop" alt="Home Care" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a265] mb-4 block">Domiciliary Care</span>
              <h3 className="Heading-Serif text-3xl mb-4 group-hover:text-[#c5a265] transition-colors duration-500">Home Care</h3>
              <p className="Text-16 text-[#d1c8e1] font-light mb-6">Receive necessary support while maintaining full independence in the comfort of your own home.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Personalised care plans agreed with family</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Support ranging from a few hours to 7 days a week</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Options for sleep-in or waking night security</li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }} className="group mt-0 lg:mt-24">
              <div className="relative h-[40vh] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 bg-[#3a2051]/40 z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Link href="/services" className="px-8 py-3 bg-[#c5a265] text-[#150f1d] uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    View Live-in Care
                  </Link>
                </div>
                <Image src="https://images.unsplash.com/photo-1581579205556-c3ccfe505d04?q=80&w=1600&auto=format&fit=crop" alt="Live-in Care" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a265] mb-4 block">24/7 Presence</span>
              <h3 className="Heading-Serif text-3xl mb-4 group-hover:text-[#c5a265] transition-colors duration-500">Live-in & Companionship</h3>
              <p className="Text-16 text-[#d1c8e1] font-light mb-6">Round-the-clock support for those who need constant care but prefer to remain in their own homes.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Carefully matched carers based on likes and hobbies</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Assistance with administration of medicine and domestic duties</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Accompanied visits to appointments and social activities</li>
              </ul>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-24">
            {/* Service 3 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="group">
              <div className="relative h-[40vh] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 bg-[#3a2051]/40 z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Link href="/services" className="px-8 py-3 bg-[#c5a265] text-[#150f1d] uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    View Supported Living
                  </Link>
                </div>
                <Image src="https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?q=80&w=1600&auto=format&fit=crop" alt="Supported Living" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a265] mb-4 block">Independence Focus</span>
              <h3 className="Heading-Serif text-3xl mb-4 group-hover:text-[#c5a265] transition-colors duration-500">Supported Living</h3>
              <p className="Text-16 text-[#d1c8e1] font-light mb-6">Empowering individuals with complex care needs, learning disabilities, or autism to live as independently as possible.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Tailored support for individuals aged 18 and over</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Flexible service ranging from a few hours to full-time</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Skills development and community integration support</li>
              </ul>
            </motion.div>

            {/* Service 4 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }} className="group mt-0 lg:mt-24">
              <div className="relative h-[40vh] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 bg-[#3a2051]/40 z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Link href="/services" className="px-8 py-3 bg-[#c5a265] text-[#150f1d] uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    View Staffing Solutions
                  </Link>
                </div>
                <Image src="https://images.unsplash.com/photo-1576766125468-ba5aca23a7bb?q=80&w=1600&auto=format&fit=crop" alt="Residential Nursing Support" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a265] mb-4 block">B2B Staff Cover</span>
              <h3 className="Heading-Serif text-3xl mb-4 group-hover:text-[#c5a265] transition-colors duration-500">Residential & Nursing Support</h3>
              <p className="Text-16 text-[#d1c8e1] font-light mb-6">Reliable, professional short-term and long-term staff cover for residential homes facing staffing challenges.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> No additional fees for urgent, last-minute cover</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Highly trained and vetted healthcare professionals</li>
                <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Solutions for single or multiple staff placements</li>
              </ul>
            </motion.div>
          </div>

          <div className="max-w-[1000px] mx-auto">
            {/* Service 5 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="group">
              <div className="relative h-[50vh] overflow-hidden mb-8 rounded-sm">
                <div className="absolute inset-0 bg-[#3a2051]/40 z-10 transition-opacity duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Link href="/services" className="px-8 py-3 bg-[#c5a265] text-[#150f1d] uppercase tracking-widest text-sm font-medium hover:bg-white transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    View Complex Care
                  </Link>
                </div>
                <Image src="https://images.unsplash.com/photo-1628177142898-93e46e48c1be?q=80&w=2000&auto=format&fit=crop" alt="Complex Care" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#c5a265] mb-4 block">Clinical Expertise</span>
                  <h3 className="Heading-Serif text-3xl mb-4 group-hover:text-[#c5a265] transition-colors duration-500">TDDI / Complex Care</h3>
                  <p className="Text-16 text-[#d1c8e1] font-light mb-6">A safe, skilled, person-centred service led by qualified nurses to support individuals managing, improving, or recovering from diagnosed health conditions.</p>
                </div>
                <div>
                  <ul className="space-y-4 md:mt-10">
                    <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Nurse-led teams delivering clinical interventions (e.g., feeding tubes)</li>
                    <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Specialised support for neurological conditions and acquired injuries</li>
                    <li className="flex items-start gap-3 text-sm text-[#f3effa]/80"><Check className="w-4 h-4 text-[#c5a265] mt-0.5 shrink-0" /> Collaborative care working closely with healthcare professionals</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE CHARITY TRUST - Purpose driven luxury */}
      <section className="py-32 bg-[#fdfcff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f4effc] rounded-full blur-[100px] opacity-70 z-0 pointer-events-none" />
        <div className="grid-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-[#f3effa] border border-[#d1c8e1]/50 px-4 py-2 rounded-full mb-8">
                <Heart className="w-4 h-4 text-[#3a2051] fill-[#3a2051]" />
                <span className="text-xs uppercase tracking-widest font-medium text-[#3a2051]">We Donate a Portion of Every Booking</span>
              </div>
              <h2 className="Heading-H2 text-[#3a2051] mb-8">
                Giving Back to <br /><span className="italic font-light">The Rahula Trust.</span>
              </h2>
              <p className="Text-18 text-[#1c1c1c]/70 leading-relaxed font-light mb-10 max-w-xl">
                Luxury care means caring profoundly. Homely Health Care proudly donates a percentage of its profits to The Rahula Trust, an extraordinary children&apos;s education charity. They tirelessly support underprivileged children&apos;s education in various parts of the world.
              </p>
              <a
                href="http://www.rahula-trust.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3a2051] text-white text-xs uppercase tracking-[0.1em] font-medium transform hover:-translate-y-1 hover:shadow-xl hover:bg-[#4e2b6e] transition-all duration-300"
              >
                Learn about The Rahula Trust
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop"
                alt="Children receiving education"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#3a2051]/20 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
