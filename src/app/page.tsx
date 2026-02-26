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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - Monumental Editorial Split */}
      <section ref={container} className="relative pt-32 lg:pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-center min-h-[90vh] bg-[#fdfcff] overflow-hidden">

        {/* Subtle background ambient glow if desired, left empty for now for max cleanliness */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#f3effa] rounded-full blur-[100px] opacity-40 z-0 pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="grid-container relative z-20 w-full h-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center h-full">

            {/* Left: Typography */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative z-30 flex flex-col justify-center pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-[#c5a265]" />
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#c5a265] font-semibold">
                    Luxury Home & Complex Care
                  </span>
                </div>

                <h1 className="Heading-Serif text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] text-[#150f1d] mb-8 tracking-tight">
                  A Life of <span className="italic text-[#c5a265] font-light">Dignity,</span><br />
                  Tailored to You.
                </h1>

                <p className="Text-18 text-[#1c1c1c]/70 font-light mb-12 max-w-lg leading-relaxed">
                  Experience world-class, person-centred support in the comfort of your own home, delivered by compassionate and highly trained professionals.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Link href="/contact-us" className="bg-[#3a2051] text-white px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium shadow-[0_8px_30px_rgb(58,32,81,0.2)] hover:bg-[#4e2b6e] transition-all duration-300 hover:-translate-y-1">
                    Speak with our team
                  </Link>
                  <Link href="/services" className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium text-[#1c1c1c] hover:text-[#c5a265] transition-colors duration-300">
                    Explore services
                    <div className="h-[1px] w-8 bg-[#1c1c1c]/20 group-hover:bg-[#c5a265] transition-all duration-300 group-hover:w-12 block" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Image Framed Container */}
            <div className="lg:col-span-6 order-1 lg:order-2 h-[40vh] sm:h-[50vh] lg:h-[75vh] relative w-full rounded-sm overflow-hidden shadow-2xl group">
              <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full origin-bottom">
                <Image src="/hero-house.jpg" alt="Homely Health Care Luxury Residence" fill className="object-cover scale-110 transition-transform duration-[20s] group-hover:scale-100 ease-out" priority unoptimized={true} />
              </motion.div>

              {/* Absolute Solid Overlay for depth without hurting legibility outside */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#150f1d]/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge moved to the Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ opacity: { duration: 1, delay: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute bottom-6 left-6 md:bottom-10 md:left-10 hidden md:flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-4 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-30 border border-white/50"
              >
                <div className="w-2 h-2 rounded-full bg-[#c5a265] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#3a2051]">24/7 Dedicated Care</span>
              </motion.div>
            </div>

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
      <section className="py-40 md:py-48 bg-[#fdfcff] text-[#1c1c1c] relative z-20">
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

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24 pt-16 border-t border-[#1c1c1c]/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Person-Centred Care</h3>
              <p className="Text-16 text-[#1c1c1c]/80 font-light">
                We believe every individual is unique. Your care plan is tailored specifically to your wants, needs, and lifestyle for maximum comfort and dignity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Rigorous Vetting</h3>
              <p className="Text-16 text-[#1c1c1c]/80 font-light">
                Our robust selection process ensures all staff are thoroughly referenced, fully DBS checked, and appropriately trained to an exceptionally high standard.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-[#f3effa] rounded-full flex items-center justify-center text-[#3a2051] mb-8">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="Heading-H4 text-[#3a2051]">Approachable Management</h3>
              <p className="Text-16 text-[#1c1c1c]/80 font-light">
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
            className="mt-24 pt-16 border-t border-[#1c1c1c]/10 grid sm:grid-cols-2 gap-12 lg:gap-24 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#3a2051] rounded-full flex items-center justify-center text-[#c5a265] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#3a2051]">9.8/10</span>
                <span className="text-sm font-medium text-[#1c1c1c]/70 uppercase tracking-widest mt-1 block">Rated By Families</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#3a2051] rounded-full flex items-center justify-center text-[#c5a265] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#3a2051]">7+ Years</span>
                <span className="text-sm font-medium text-[#1c1c1c]/70 uppercase tracking-widest mt-1 block">Avg. Carer Experience</span>
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
                <p className="text-sm text-[#1c1c1c]/80">Daughter of Live-in Client, Dorset</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR COMPREHENSIVE SERVICES - Editorial Roster */}
      <section className="py-40 bg-[#150f1d] text-[#f3effa] overflow-hidden">
        <div className="grid-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 md:mb-48 text-center"
          >
            <span className="text-[#c5a265] text-[10px] tracking-[0.4em] uppercase block mb-8 font-semibold">Expertise & Solutions</span>
            <h2 className="Heading-H2">Our Care <span className="italic font-light">Services</span></h2>
          </motion.div>

          {/* Service 1: Domiciliary Care (Image Right) */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32 md:mb-48">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#c5a265] mb-6 block">Domiciliary Care</span>
              <h3 className="Heading-H3 mb-8">Home Care</h3>
              <p className="Text-18 text-[#d1c8e1] font-light mb-10 max-w-lg leading-relaxed">
                Receive necessary support while maintaining full independence in the comfort of your own home, surrounded by the things you love.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Personalised care plans agreed with family</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Support ranging from a few hours to 7 days a week</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Options for sleep-in or waking night security</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-white/30 text-white text-xs uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-[#150f1d] hover:border-white transition-all duration-300 hover:-translate-y-1">
                Explore Home Care
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[60vh] lg:h-[80vh] w-full order-1 lg:order-2"
            >
              <Image src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop" alt="Home Care" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Service 2: Live-in Care (Image Left) */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32 md:mb-48">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[60vh] lg:h-[80vh] w-full order-1"
            >
              <Image src="https://images.unsplash.com/photo-1581579205556-c3ccfe505d04?q=80&w=1600&auto=format&fit=crop" alt="Live-in Care" fill className="object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="order-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#c5a265] mb-6 block">24/7 Presence</span>
              <h3 className="Heading-H3 mb-8">Live-in & Companionship</h3>
              <p className="Text-18 text-[#d1c8e1] font-light mb-10 max-w-lg leading-relaxed">
                Round-the-clock support for those who need constant care but prefer to remain in their own homes, preserving their lifestyle and dignity.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Carefully matched carers based on likes and hobbies</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Assistance with administration of medicine and domestic duties</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Accompanied visits to appointments and social activities</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-white/30 text-white text-xs uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-[#150f1d] hover:border-white transition-all duration-300 hover:-translate-y-1">
                Explore Live-in Care
              </Link>
            </motion.div>
          </div>

          {/* Service 3: Supported Living (Image Right) */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32 md:mb-48">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#c5a265] mb-6 block">Independence Focus</span>
              <h3 className="Heading-H3 mb-8">Supported Living</h3>
              <p className="Text-18 text-[#d1c8e1] font-light mb-10 max-w-lg leading-relaxed">
                Empowering individuals with complex care needs, learning disabilities, or autism to live fully and independently within their communities.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Tailored support for individuals aged 18 and over</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Flexible service ranging from a few hours to full-time</li>
                <li className="flex items-start gap-4 text-sm text-[#f3effa]/80 font-light border-b border-white/10 pb-4"><Check className="w-5 h-5 text-[#c5a265] mt-0 shrink-0" /> Skills development and community integration support</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-white/30 text-white text-xs uppercase tracking-[0.1em] font-medium hover:bg-white hover:text-[#150f1d] hover:border-white transition-all duration-300 hover:-translate-y-1">
                Explore Supported Living
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[60vh] lg:h-[80vh] w-full order-1 lg:order-2"
            >
              <Image src="https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?q=80&w=1600&auto=format&fit=crop" alt="Supported Living" fill className="object-cover" />
            </motion.div>
          </div>

          {/* Service 4: Complex Care (Full Width Hero Style) */}
          <div className="pt-32 border-t border-white/10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#c5a265] mb-6 block">Clinical Expertise</span>
              <h3 className="Heading-H2 mb-8">TDDI & Complex Care</h3>
              <p className="Text-18 text-[#d1c8e1] font-light mb-16 leading-relaxed max-w-3xl mx-auto">
                A safe, highly-skilled service led by qualified nurses to support individuals managing, improving, or recovering from serious diagnosed health conditions.
              </p>

              <div className="relative h-[60vh] w-full mb-16">
                <Image src="https://images.unsplash.com/photo-1628177142898-93e46e48c1be?q=80&w=2000&auto=format&fit=crop" alt="Complex Care" fill className="object-cover" />
              </div>

              <ul className="text-left grid md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-16">
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#f3effa]/80 font-light">
                  <Check className="w-6 h-6 text-[#c5a265] mb-2" />
                  Nurse-led clinical interventions (e.g., tube feeding)
                </li>
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#f3effa]/80 font-light">
                  <Check className="w-6 h-6 text-[#c5a265] mb-2" />
                  Support for neurological conditions & acquired injuries
                </li>
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#f3effa]/80 font-light">
                  <Check className="w-6 h-6 text-[#c5a265] mb-2" />
                  Collaborative care with multidisciplinary teams
                </li>
              </ul>

              <Link href="/services" className="inline-flex items-center px-10 py-5 bg-[#c5a265] text-[#150f1d] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_30px_rgb(197,162,101,0.2)]">
                Explore Clinical Care
              </Link>
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
              <p className="Text-18 text-[#1c1c1c]/80 leading-relaxed font-light mb-10 max-w-xl">
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
