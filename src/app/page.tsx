"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, UserCheck, Check, Heart, Home as HomeIcon, Users, Building2, Activity } from "lucide-react";

export default function Home() {
  const container = useRef(null);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - Purple House Background */}
      <section ref={container} className="relative flex flex-col lg:flex-row items-center justify-center min-h-[100svh] overflow-hidden bg-[#1c1c1c]">

        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg-bw.jpg"
            alt="Homely Care Holding Hands"
            fill
            className="object-cover object-center"
            priority
            unoptimized={true}
          />
          {/* Subtle neutral gradient to ensure text readability on the left without tinting the whole image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-30 flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-24 gap-12 lg:gap-8">

          {/* Left: Typography (50%) */}
          <div className="w-full lg:w-1/2 flex flex-col lg:pr-8">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="relative inline-block mb-6 lg:mb-8 group cursor-default"
              >
                <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-[#e0c3fc] shadow-sm font-bold relative z-10 transition-all duration-500 drop-shadow-md">
                  HOME CARE SERVICES
                </span>
                <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 z-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                className="Heading-Serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-white mb-6 lg:mb-8 tracking-tight drop-shadow-xl"
              >
                <span className="font-light block">A Life of</span>
                <span className="font-bold block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e0c3fc]">Dignity,</span>
                <span className="font-light italic text-[#fce4aa] block drop-shadow-[0_0_15px_rgba(0,0,0,0.4)]">Tailored to You.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="Text-18 text-white/90 font-light mb-10 max-w-md leading-relaxed drop-shadow-md"
              >
                Experience world-class, person-centred support in the comfort of your own home, delivered by compassionate professionals.
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }} className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/contact-us" className="inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full bg-white text-[#511685] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#fce4aa] hover:text-[#2b084e] transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(252,228,170,0.5)]">
                  24/7 DEDICATED CARE
                  <Heart className="w-4 h-4 stroke-[2]" />
                </Link>
                <Link href="/services" className="relative text-xs uppercase tracking-[0.2em] font-medium text-white/80 hover:text-white transition-colors duration-300 group inline-flex items-center gap-2 drop-shadow-md">
                  DISCOVER MORE
                  <motion.span whileHover={{ y: 3 }} transition={{ type: "spring", stiffness: 300 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Top-Right: Horizontal Interactive Signs */}
          <div className="w-full lg:w-[65%] flex justify-center lg:absolute lg:top-12 lg:right-4 lg:pt-16 pointer-events-none mt-12 lg:mt-0 z-40">
            <div className="pointer-events-auto flex flex-row flex-wrap lg:flex-nowrap items-start justify-center gap-4 sm:gap-6 xl:gap-10 w-full px-4 lg:px-0">
              {[
                { title: 'Home Care', Icon: HomeIcon },
                { title: 'Residential &\nNursing Support', Icon: Building2 },
                { title: 'Live-in Care', Icon: Users },
                { title: 'Supported\nLiving', Icon: HeartHandshake },
                { title: 'Treatment of Disease,\nDisorder, or Injury\n(TDDI) & Homely care', Icon: Activity },
              ].map((s, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (index * 0.15), duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center justify-start cursor-pointer group w-[28%] sm:w-[20%] lg:w-28 xl:w-36 shrink-0"
                >
                  <motion.div
                    className="flex flex-col items-center justify-start relative w-full h-full"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    {/* The "Sign" (Circular Icon) */}
                    <div className="mb-3 w-16 h-16 sm:w-18 sm:h-18 xl:w-20 xl:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/25 group-hover:border-white/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 shadow-lg relative z-10 shrink-0">
                      <s.Icon className="w-8 h-8 sm:w-10 sm:h-10 xl:w-10 xl:h-10 text-white group-hover:text-[#fce4aa] stroke-[1.5] transition-colors duration-300 drop-shadow-md" />
                    </div>

                    {/* Writing Under the Sign */}
                    <span className="text-white text-[12px] sm:text-[14px] xl:text-[15px] font-semibold text-center leading-snug relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-1 w-full break-words">
                      {s.title.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator overlay at bottom left */}
        <div className="hidden lg:flex absolute bottom-12 left-12 xl:left-24 items-center gap-4 z-30">
          <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
            <motion.div
              className="w-full h-full bg-[#fce4aa]"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70">Discover more</span>
        </div>
      </section>

      {/* SECTION 2: TRUST BAR */}
      <section className="bg-[#fdfcff] py-32 md:py-48 relative z-20 overflow-hidden">
        <div className="grid-container w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            {/* Modern Layout Flow: Asymmetry */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-24 mb-16 md:mb-24">

              {/* Left text */}
              <div className="text-center lg:text-left shrink-0">
                <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[#1c1c1c]/40 block">
                  REGULATED & TRUSTED BY
                </span>
              </div>

              {/* Right Logos */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-12 md:gap-16 w-full">

                {/* NHS Logo */}
                <div className="relative group cursor-pointer w-20 h-8 flex justify-center items-center">
                  <div className="relative w-full h-full opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/NHS-Logo.svg" alt="NHS Logo" fill className="object-contain" unoptimized />
                  </div>
                </div>

                {/* CQC Logo */}
                <div className="relative group cursor-pointer w-28 h-10 flex justify-center items-center">
                  <div className="relative w-full h-full opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Care_Quality_Commission_logo.svg/1024px-Care_Quality_Commission_logo.svg.png" alt="CQC Logo" fill className="object-contain" unoptimized />
                  </div>
                </div>

                {/* Skills for Care Logo */}
                <div className="relative group cursor-pointer w-32 h-10 flex justify-center items-center">
                  <div className="relative w-full h-full opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100">
                    <Image src="https://www.skillsforcare.org.uk/images/Logo/Skills-for-Care-logo.svg" alt="Skills for Care" fill className="object-contain" unoptimized />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-px h-16 bg-[#1c1c1c]/10 mx-auto mb-16 md:mb-24" />

            <h2 className="Heading-H2">
              <span className="font-light">Why Choose</span> <br className="sm:hidden" />
              <span className="Heading-Serif font-bold">Homely Health Care?</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid-container">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24 pt-16 border-t border-[#1c1c1c]/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-[#fdfcff] border border-[#1c1c1c]/10 rounded-full flex items-center justify-center text-[#8da399] mb-8">
                <UserCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="Heading-H4 text-[#1c1c1c]">Person-Centred Care</h3>
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
              <div className="w-16 h-16 bg-[#fdfcff] border border-[#1c1c1c]/10 rounded-full flex items-center justify-center text-[#8da399] mb-8">
                <ShieldCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="Heading-H4 text-[#1c1c1c]">Rigorous Vetting</h3>
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
              <div className="w-16 h-16 bg-[#fdfcff] border border-[#1c1c1c]/10 rounded-full flex items-center justify-center text-[#8da399] mb-8">
                <HeartHandshake className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="Heading-H4 text-[#1c1c1c]">Approachable Management</h3>
              <p className="Text-16 text-[#1c1c1c]/80 font-light">
                Our friendly management team and Field Care Managers visit you regularly to guarantee the care you receive always aligns with your expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL PROOF & TESTIMONIAL */}
      <section className="bg-[#faf9f8] py-32 lg:py-48 relative z-20 overflow-hidden border-t border-[#1c1c1c]/5">
        <div className="grid-container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-0 items-center">

            {/* Left Column: Stats */}
            <div className="flex flex-col gap-16 lg:border-r border-[#1c1c1c]/10 lg:pr-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-baseline gap-1">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="block text-[80px] lg:text-[100px] leading-none font-light text-[#1c1c1c] tracking-tighter"
                  >
                    9.8
                  </motion.span>
                  <span className="text-4xl text-[#1c1c1c]/30 font-light">/10</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#1c1c1c]/40 block mt-4">
                  RATED BY FAMILIES
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="flex items-baseline gap-1">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="block text-[80px] lg:text-[100px] leading-none font-light text-[#1c1c1c] tracking-tighter"
                  >
                    7
                  </motion.span>
                  <span className="text-[60px] lg:text-[80px] text-[#1c1c1c]/30 font-light">+</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#1c1c1c]/40 block mt-4">
                  AVG. CARER EXPERIENCE (YEARS)
                </span>
              </motion.div>
            </div>

            {/* Right Column: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:pl-24 relative"
            >
              <div className="absolute -top-12 -left-4 lg:left-12 text-[#1c1c1c]/5 text-[150px] font-serif leading-none italic select-none">
                &ldquo;
              </div>
              <p className="Heading-Serif text-[#1c1c1c] text-2xl lg:text-3xl leading-relaxed relative z-10 font-medium">
                The level of dignity and true compassion the staff at Homely Health Care provides is unmatched. We feel so incredibly supported having them care for our mother.
              </p>

              <div className="mt-12 flex items-center gap-6">
                <div className="w-12 h-[1px] bg-[#8da399]" />
                <div>
                  <p className="font-medium text-[#1c1c1c] text-lg">Sarah Jenkins</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#1c1c1c]/50 mt-1">Daughter of Live-in Client, Dorset</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* OUR COMPREHENSIVE SERVICES - Editorial Roster */}
      <section className="py-40 bg-[#ffffff] text-[#1c1c1c] overflow-hidden" >
        <div className="grid-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 md:mb-48 text-center"
          >
            <span className="text-[#8da399] text-[10px] tracking-[0.4em] uppercase block mb-8 font-semibold">Expertise & Solutions</span>
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
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8da399] mb-6 block">Domiciliary Care</span>
              <h3 className="Heading-H3 mb-8">Home Care</h3>
              <p className="Text-18 text-[#1c1c1c]/70 font-light mb-10 max-w-lg leading-relaxed">
                Receive necessary support while maintaining full independence in the comfort of your own home, surrounded by the things you love.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Personalised care plans agreed with family</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Support ranging from a few hours to 7 days a week</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Options for sleep-in or waking night security</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-[#1c1c1c]/20 text-[#1c1c1c] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1c1c1c] hover:text-white hover:border-transparent transition-all duration-500 hover:-translate-y-1">
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
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8da399] mb-6 block">24/7 Presence</span>
              <h3 className="Heading-H3 mb-8">Live-in & Companionship</h3>
              <p className="Text-18 text-[#1c1c1c]/70 font-light mb-10 max-w-lg leading-relaxed">
                Round-the-clock support for those who need constant care but prefer to remain in their own homes, preserving their lifestyle and dignity.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Carefully matched carers based on likes and hobbies</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Assistance with administration of medicine and domestic duties</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Accompanied visits to appointments and social activities</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-[#1c1c1c]/20 text-[#1c1c1c] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1c1c1c] hover:text-white hover:border-transparent transition-all duration-500 hover:-translate-y-1">
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
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8da399] mb-6 block">Independence Focus</span>
              <h3 className="Heading-H3 mb-8">Supported Living</h3>
              <p className="Text-18 text-[#1c1c1c]/70 font-light mb-10 max-w-lg leading-relaxed">
                Empowering individuals with complex care needs, learning disabilities, or autism to live fully and independently within their communities.
              </p>
              <ul className="space-y-6 mb-12">
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Tailored support for individuals aged 18 and over</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Flexible service ranging from a few hours to full-time</li>
                <li className="flex items-start gap-4 text-sm text-[#1c1c1c]/70 font-light border-b border-[#1c1c1c]/10 pb-4"><Check className="w-5 h-5 text-[#8da399] mt-0 shrink-0" /> Skills development and community integration support</li>
              </ul>
              <Link href="/services" className="inline-flex items-center px-8 py-4 bg-transparent border border-[#1c1c1c]/20 text-[#1c1c1c] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1c1c1c] hover:text-white hover:border-transparent transition-all duration-500 hover:-translate-y-1">
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
          <div className="pt-32 border-t border-[#1c1c1c]/10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8da399] mb-6 block">Clinical Expertise</span>
              <h3 className="Heading-H2 mb-8 text-[#1c1c1c]">TDDI & Complex Care</h3>
              <p className="Text-18 text-[#1c1c1c]/70 font-light mb-16 leading-relaxed max-w-3xl mx-auto">
                A safe, highly-skilled service led by qualified nurses to support individuals managing, improving, or recovering from serious diagnosed health conditions.
              </p>

              <div className="relative h-[60vh] w-full mb-16">
                <Image src="https://images.unsplash.com/photo-1628177142898-93e46e48c1be?q=80&w=2000&auto=format&fit=crop" alt="Complex Care" fill className="object-cover" />
              </div>

              <ul className="text-left grid md:grid-cols-3 gap-12 max-w-4xl mx-auto mb-16">
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#1c1c1c]/70 font-light">
                  <Check className="w-6 h-6 text-[#8da399] mb-2 stroke-[1.5]" />
                  Nurse-led clinical interventions (e.g., tube feeding)
                </li>
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#1c1c1c]/70 font-light">
                  <Check className="w-6 h-6 text-[#8da399] mb-2 stroke-[1.5]" />
                  Support for neurological conditions & acquired injuries
                </li>
                <li className="flex flex-col items-center gap-4 text-center text-sm text-[#1c1c1c]/70 font-light">
                  <Check className="w-6 h-6 text-[#8da399] mb-2 stroke-[1.5]" />
                  Collaborative care with multidisciplinary teams
                </li>
              </ul>

              <Link href="/services" className="inline-flex items-center px-10 py-5 bg-[#1c1c1c] text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#8da399] hover:-translate-y-1 transition-all duration-300 shadow-xl">
                Explore Clinical Care
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE CHARITY TRUST - Purpose driven luxury */}
      <section className="py-32 bg-[#faf9f8] relative overflow-hidden" >
        <div className="grid-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 bg-white border border-[#1c1c1c]/10 px-4 py-2 rounded-full mb-8">
                <Heart className="w-4 h-4 text-[#8da399] fill-[#8da399]" />
                <span className="text-xs uppercase tracking-widest font-medium text-[#1c1c1c]">We Donate a Portion of Every Booking</span>
              </div>
              <h2 className="Heading-H2 text-[#1c1c1c] mb-8">
                Giving Back to <br /><span className="italic font-light text-[#8da399]">The Rahula Trust.</span>
              </h2>
              <p className="Text-18 text-[#1c1c1c]/70 leading-relaxed font-light mb-10 max-w-xl">
                Luxury care means caring profoundly. Homely Health Care proudly donates a percentage of its profits to The Rahula Trust, an extraordinary children&apos;s education charity. They tirelessly support underprivileged children&apos;s education in various parts of the world.
              </p>
              <a
                href="http://www.rahula-trust.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#1c1c1c] text-[#1c1c1c] text-xs uppercase tracking-[0.1em] font-medium hover:bg-[#1c1c1c] hover:text-white transition-all duration-500 hover:-translate-y-1"
              >
                Learn about The Rahula Trust
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[600px] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop"
                alt="Children receiving education"
                fill
                className="object-cover sepia-[0.2]"
              />
              <div className="absolute inset-0 bg-[#8da399]/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>
    </main >
  );
}
