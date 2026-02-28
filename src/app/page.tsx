"use client"; // Trigger rebuild: 2026-02-28T16:23:00

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, UserCheck, Heart } from "lucide-react";
import CustomGlobe from "@/components/CustomGlobe";

export default function Home() {
  const container = useRef(null);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION - Luxury Purple Dark Theme */}
      <section ref={container} className="relative flex flex-col lg:flex-row items-center justify-center min-h-[100svh] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F1115 0%, #1B1326 55%, #24163A 100%)' }}>

        {/* Depth layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Ambient star field */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, rgba(185,163,211,0.9) 1px, transparent 1px)', backgroundSize: '70px 70px' }} />
          {/* Purple glow — left ambient */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25" style={{ background: '#5B2A86' }} />
          {/* Text-readability gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,17,21,0.97) 0%, rgba(27,19,38,0.9) 30%, rgba(36,22,58,0.5) 55%, transparent 78%)' }} />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-30 flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-8 gap-12 lg:gap-8 min-h-[100svh]">

          {/* Left: Typography */}
          <div className="w-full lg:w-[45%] flex flex-col z-40">
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.15 } } }}
              initial="hidden"
              animate="visible"
            >
              {/* Label */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }}
                className="mb-6 lg:mb-8"
              >
                <span className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase" style={{ color: '#B9A3D3' }}>
                  The Gold Standard of Care
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                className="Heading-Serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6 lg:mb-8 tracking-tight"
              >
                <span className="font-light block" style={{ color: '#F2F2F2' }}>A Life of</span>
                <span className="font-bold block" style={{ color: '#F2F2F2' }}>Refinement,</span>
                <span className="font-light italic block" style={{ background: 'linear-gradient(90deg, #B9A3D3 0%, #D6B36A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Tailored to You.</span>
              </motion.h1>

              {/* Supporting text */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="Text-18 font-light mb-10 max-w-md leading-relaxed"
                style={{ color: 'rgba(242,242,242,0.7)' }}
              >
                Experience world-class healthcare within your own private sanctuary, where every detail is meticulously curated for your well-being.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full text-white text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #5B2A86, #7A4FB3)', boxShadow: '0 4px 24px rgba(91,42,134,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 32px rgba(214,179,106,0.35), 0 4px 24px rgba(91,42,134,0.45)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(91,42,134,0.45)')}
                >
                  Explore the Standard
                  <Heart className="w-4 h-4 stroke-[2]" />
                </Link>
                <Link href="/services" className="group relative text-xs uppercase tracking-[0.2em] font-medium inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'rgba(185,163,211,0.85)' }}>
                  Discover More
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ background: '#B9A3D3' }} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Interactive Globe + Hands */}
          <div className="w-full lg:w-[55%] lg:absolute lg:right-0 lg:bottom-0 flex flex-col items-center justify-end pointer-events-none mt-8 lg:mt-0 z-30 overflow-visible">
            <div className="relative w-[120%] sm:w-[110%] md:w-full max-w-[700px] xl:max-w-[850px] aspect-square flex items-end justify-center translate-y-[5%] lg:translate-y-[5%]">

              {/* Atmospheric purple glow behind globe */}
              <div className="absolute top-[8%] left-[8%] w-[84%] h-[84%] rounded-full z-0 blur-[80px] opacity-35" style={{ background: 'radial-gradient(circle, #5B2A86 0%, transparent 70%)' }} />

              {/* Globe */}
              <div className="absolute inset-0 z-50 pointer-events-auto flex items-center justify-center">
                <div className="w-[85%] h-[85%] mt-[-5%] bg-red-500/20">
                  <CustomGlobe />
                </div>
              </div>

              {/* Hands — testing with higher z-index but lower than globe? No, hands should be on top maybe? */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <Image
                  src="/hands-globe.png"
                  alt="Hands cradling globe"
                  fill
                  className="object-contain object-bottom select-none"
                  priority
                  unoptimized={true}
                />
              </div>

              {/* Bottom fade to next section */}
              <div className="absolute bottom-[-10%] inset-x-0 h-1/3 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, #0F1115, rgba(15,17,21,0.6), transparent)' }} />

            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex absolute bottom-10 left-12 xl:left-24 items-center gap-4 z-30">
          <div className="w-[1px] h-12 overflow-hidden relative" style={{ background: 'rgba(185,163,211,0.25)' }}>
            <motion.div
              className="w-full h-full"
              style={{ background: '#D6B36A' }}
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: 'rgba(185,163,211,0.7)' }}>Discover more</span>
        </div>
      </section>

      {/* SECTION 2: TRUSTED CARE - Clean Ivory Restructure */}
      <section className="relative w-full py-14 lg:py-20 bg-[#F7F5F2] overflow-hidden">
        <div className="grid-container w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left: Image Container - Soft Rounded with breathing room */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative aspect-[4/5] md:aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="/images/compassionate-care.png"
                  alt="Compassionate Home Care"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle natural lighting enhancement */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1326]/20 to-transparent pointer-events-none" />
              </div>

              {/* Refined Brand Accents */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#5B2A86]/5 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D6B36A]/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Right: Content - Clean Typography Hierarchy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-full lg:w-1/2 flex flex-col items-start"
            >
              {/* Small Gold Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1.5px] bg-[#D6B36A]" />
                <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Our Philosophy</span>
              </div>

              <h2 className="Heading-Serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-[#1A1A1A] leading-[1.1] mb-6 font-light">
                Nurturing Dignity with <br />
                <span className="italic text-[#5B2A86]">Boundless Compassion</span>
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg md:text-xl text-[#1A1A1A]/70 font-light leading-relaxed">
                  Exceptional person-centred support is more than a service—it’s a deep commitment to treating every client like a cherished member of our family.
                </p>
                <div className="flex items-center gap-2 text-[#5B2A86] font-medium">
                  <Heart className="w-5 h-5 fill-[#5B2A86]" />
                  <span className="text-sm tracking-wide">A Legacy of Unwavering Trust</span>
                </div>
              </div>

              <Link
                href="/services"
                className="group relative inline-flex items-center px-10 py-5 bg-[#5B2A86] text-white rounded-full overflow-hidden transition-all duration-500 hover:bg-[#4a226d] hover:shadow-xl hover:shadow-purple-900/10"
              >
                <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-semibold">Our Care Philosophy</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE HOMELY CARE - Heading on Dark / Cards in Ivory Box */}
      <section className="relative py-16 md:py-20 overflow-hidden scroll-mt-20" style={{ background: 'linear-gradient(160deg, #1B1230 0%, #0F1115 100%)' }}>
        {/* Very subtle ambient glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] opacity-[0.08]" style={{ background: '#5B2A86' }} />
        </div>

        <div className="grid-container relative z-10 flex flex-col items-center">

          {/* HEADING — displayed directly on dark background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10"
          >
            <h2 className="flex flex-col items-center gap-2">
              <span className="Heading-Serif text-[#F2F2F2] text-[clamp(2rem,4.5vw,3.5rem)] leading-tight font-normal">
                Why Choose
              </span>
              <span className="Heading-Serif italic text-[clamp(2.5rem,6vw,4.5rem)] leading-tight font-light highlighted-text-gold">
                Homely Health Care
              </span>
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D6B36A] to-transparent mx-auto mt-6" />
          </motion.div>

          {/* IVORY CONTAINER — holds only the 3 white feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#F0EDE8] rounded-[24px] shadow-[0_25px_70px_rgba(0,0,0,0.3)] p-6 md:p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: UserCheck,
                  title: "Person-Centred Care",
                  desc: "We believe every individual is unique. Your care plan is tailored specifically to your wants, needs, and lifestyle for maximum comfort and dignity."
                },
                {
                  icon: ShieldCheck,
                  title: "Rigorous Vetting",
                  desc: "Our robust selection process ensures all staff are thoroughly referenced, fully DBS checked, and trained to an exceptionally high standard."
                },
                {
                  icon: HeartHandshake,
                  title: "Expert Management",
                  desc: "Our friendly management team and Field Care Managers visit you regularly to ensure the care you receive always meets your expectations."
                }
              ].map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col items-center text-center p-6 lg:p-8 bg-white rounded-[16px] border border-black/[0.04] shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_18px_48px_rgba(0,0,0,0.10)] cursor-default"
                >
                  {/* Purple icon badge with faint gold glow on hover */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-[12px]" style={{ background: '#D6B36A', transform: 'scale(1.2)' }} />
                    <div className="relative w-14 h-14 rounded-full bg-[#5B2A86] flex items-center justify-center z-10">
                      <feature.icon className="w-6 h-6 text-white stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Small gold divider under icon */}
                  <div className="w-8 h-[1px] bg-[#D6B36A] mb-4" />

                  <h3 className="Heading-Serif text-[#1A1A1A] text-[1.2rem] mb-4 font-normal leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(0,0,0,0.58)' }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 4: TRUST & TESTIMONIALS - 3D Box Mockup Replica */}
      <section className="bg-[#F7F5F2] section-padding relative z-20 overflow-hidden">

        <div className="grid-container w-full max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 relative">
            <h2 className="Heading-Serif text-[#1A1A1A] text-3xl md:text-[42px] mb-8 font-normal tracking-tight">
              Trusted by Families Across the UK
            </h2>
            {/* Glowing divider line */}
            <div className="relative w-80 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#D6B36A]/40 to-transparent">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1px] bg-[#D6B36A] shadow-[0_0_12px_rgba(214,179,106,1)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] bg-white rounded-full blur-[1px] shadow-[0_0_10px_rgba(255,255,255,1)]" />
            </div>
          </div>

          {/* Unified Trust Card - Outer 3D Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FCFBFA] rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row gap-10 lg:gap-14 items-center border border-black/[0.03]"
          >
            {/* Left Column: Inner 3D Stat Cards */}
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 shrink-0">
              {/* Card 1 */}
              <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-10 flex flex-col items-center justify-center min-w-[180px] md:min-w-[210px] border border-black/[0.04] transform transition-transform hover:-translate-y-1 duration-500">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[64px] md:text-[76px] leading-none font-medium text-[#4B3061] tracking-tighter Heading-Serif">9.8</span>
                  <span className="text-2xl md:text-3xl text-[#1A1A1A]/20 font-light">/10</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 text-center leading-[1.8] mt-2">
                  Family Trust<br />Rating
                </span>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-10 flex flex-col items-center justify-center min-w-[180px] md:min-w-[210px] border border-black/[0.04] transform transition-transform hover:-translate-y-1 duration-500">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-[64px] md:text-[76px] leading-none font-medium text-[#4B3061] tracking-tighter Heading-Serif">7</span>
                  <span className="text-[40px] md:text-[50px] text-[#1A1A1A]/20 font-light">+</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 text-center leading-[1.8] mt-2">
                  Years Clinical<br />Experience
                </span>
              </div>
            </div>

            {/* Faint Vertical Divider */}
            <div className="hidden lg:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-[#1A1A1A]/[0.06] to-transparent mx-2" />
            {/* Horizontal Divider for Mobile */}
            <div className="lg:hidden h-[1px] w-full bg-gradient-to-r from-transparent via-[#1A1A1A]/[0.06] to-transparent" />

            {/* Right Column: Testimonial */}
            <div className="relative flex-1">
              {/* Elegant Quotation Mark */}
              <div className="absolute -top-16 -left-10 text-[#E4DDF0] text-[160px] font-serif leading-none select-none pointer-events-none transform -rotate-12">
                &ldquo;
              </div>

              <p className="Heading-Serif text-[#1A1A1A] text-[24px] md:text-[28px] leading-[1.3] relative z-10 font-normal italic tracking-tight text-balance">
                The level of dignity and true compassion provided is unparalleled. We feel a profound sense of security knowing our loved ones are in such expert hands.
              </p>

              <div className="flex items-center gap-6 mt-8 relative z-10">
                {/* Client Avatar with soft ring and shadow */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-[0_10px_25px_rgba(0,0,0,0.15)] ring-4 ring-white border border-[#1A1A1A]/5">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                    alt="Sarah Jenkins"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Client Info Block */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="w-12 h-[1px] bg-[#D6B36A] mb-1" />
                  <p className="font-bold text-[#4B3061] text-sm md:text-sm tracking-[0.1em] uppercase">Sarah Jenkins</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-bold">Private Client, Dorset</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 5: SERVICES OVERVIEW - Editorial Presentation */}
      <section className="py-12 md:py-16 bg-premium-dark text-[#F2F2F2] overflow-hidden relative" >
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#F7F5F2] to-transparent opacity-5" />

        <div className="grid-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 text-center"
          >
            <span className="text-[#D6B36A] text-[9px] tracking-[0.4em] uppercase block mb-3 font-bold">Curated Care Packages</span>
            <h2 className="Heading-H2 text-white text-3xl md:text-4xl">Our Services</h2>
          </motion.div>

          {/* Service Cards - Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              {
                title: "Home Care",
                tag: "Bespoke Support",
                img: "/images/home-care.png",
                desc: "Clinical precision and heartfelt companionship in the comfort of your own home."
              },
              {
                title: "Live-in Care",
                tag: "24/7 Presence",
                img: "/images/live-in-care.png",
                desc: "Round-the-clock peace of mind delivered by a hand-picked team of professionals."
              },
              {
                title: "Supported Living",
                tag: "Independence First",
                img: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?q=80&w=1600&auto=format&fit=crop",
                desc: "Empowering individuals to lead fulfilling lives within their local community."
              },
              {
                title: "Complex Care",
                tag: "Clinical Excellence",
                img: "/images/complex-care.png",
                desc: "Specialized nurse-led care for complex health conditions and intensive support."
              }
            ].map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer relative"
              >
                <div className="relative h-[280px] md:h-[320px] w-full overflow-hidden rounded-sm mb-4">
                  <Image src={srv.img} alt={srv.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1326] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Glassmorphism Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 glass-card-dark border-white/10 flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#D6B36A] text-[8px] uppercase tracking-[0.3em] font-bold">{srv.tag}</span>
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl md:text-2xl font-serif italic text-white">{srv.title}</h3>
                      <Link href="/services" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D6B36A] group-hover:border-[#D6B36A] transition-all duration-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:text-[#1B1326] transition-colors"><path d="M7 17l10-10M17 17V7H7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Secondary Info (Only visible on larger screens or hover) */}
                <p className="px-1 text-[#F2F2F2]/60 text-xs md:text-sm font-light leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">{srv.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center px-12 py-5 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] hover:-translate-y-2 relative overflow-hidden group">
              <span className="relative z-10">Experience All Services</span>
              <div className="absolute inset-0 bg-[#D6B36A] opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE CHARITY TRUST - Luxury Purpose */}
      <section className="section-padding bg-[#F7F5F2] relative overflow-hidden">
        <div className="grid-container relative z-10 mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col items-start mb-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5B2A86] mb-4">Social Responsibility</span>
                <h2 className="Heading-H2 text-[#1B1326]">
                  A Vision of <span className="italic font-light text-[#5B2A86]">Hope.</span>
                </h2>
              </div>
              <p className="Text-18 text-[#1B1326]/70 leading-relaxed font-light mb-8 max-w-xl">
                We believe that premium care should extend beyond our immediate community. Homely Health Care proudly dedicates a percentage of its profits to The Rahula Trust, supporting the education of underprivileged children worldwide.
              </p>
              <a
                href="http://www.rahula-trust.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 border border-[#1B1326] text-[#1B1326] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#1B1326] hover:text-white transition-all duration-500 hover:-translate-y-1"
              >
                Discover The Rahula Trust
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[500px] overflow-hidden rounded-sm shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop"
                alt="Children receiving education"
                fill
                className="object-cover transition-transform duration-[10s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#5B2A86]/20 mix-blend-multiply transition-opacity duration-1000" />
              <div className="absolute inset-0 border-[20px] border-[#F7F5F2] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
    </main >
  );
}
