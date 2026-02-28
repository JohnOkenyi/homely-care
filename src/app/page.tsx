"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, UserCheck, Heart } from "lucide-react";
import InteractiveGlobe from "@/components/InteractiveGlobe";

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
              <div className="absolute top-[2%] left-[6%] w-[88%] h-[88%] z-10 pointer-events-auto">
                <InteractiveGlobe />
              </div>

              {/* Hands — mix-blend-lighten makes black bg transparent on the dark hero, hands stay solid */}
              <div className="absolute inset-0 z-20 pointer-events-none mix-blend-lighten">
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
      <section className="relative w-full py-20 lg:py-32 bg-[#F7F5F2] overflow-hidden">
        <div className="grid-container w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

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

              <h2 className="Heading-Serif text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A1A] leading-[1.1] mb-8 font-light">
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

      {/* SECTION 3: WHY CHOOSE HOMELY CARE - Cinematic Luxury Version */}
      <section className="relative section-padding-large overflow-hidden bg-premium-dark scroll-mt-20">
        {/* Background Depth Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Main Cinematic Gradient Overlay */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(91,42,134,0.15),transparent_70%)]" />

          {/* Soft Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(15,17,21,0.9)]" />

          {/* Atmospheric Light Particles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-[#B9A3D3] rounded-full blur-[2px] animate-pulse" />
            <div className="absolute top-[40%] left-[15%] w-1.5 h-1.5 bg-[#D6B36A] rounded-full blur-[3px] animate-pulse [animation-delay:1.5s]" />
            <div className="absolute top-[80%] left-[25%] w-0.5 h-0.5 bg-white rounded-full blur-[1px] animate-pulse [animation-delay:3s]" />
            <div className="absolute top-[20%] right-[30%] w-1 h-1 bg-[#B9A3D3] rounded-full blur-[2px] animate-pulse [animation-delay:0.5s]" />
            <div className="absolute top-[60%] right-[10%] w-1 h-1 bg-[#D6B36A] rounded-full blur-[2px] animate-pulse [animation-delay:2s]" />
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full blur-[160px] opacity-10" style={{ background: '#5B2A86' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-5" style={{ background: '#D6B36A' }} />
        </div>

        <div className="grid-container relative z-10 flex flex-col items-center">
          {/* HEADER AREA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="content-gap-md text-center flex flex-col items-center relative"
          >
            {/* Ambient Purple Light behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-48 bg-[#5B2A86]/10 blur-[100px] -z-10 pointer-events-none" />

            <span className="text-[#D6B36A] text-[13px] sm:text-[14px] tracking-[0.8em] uppercase block mb-4 font-bold animate-shimmer bg-gradient-to-r from-[#D6B36A] via-white/50 to-[#D6B36A] bg-[length:200%_auto] bg-clip-text text-transparent">
              Uncompromising Quality
            </span>

            <h2 className="text-[#F2F2F2] mb-6 flex flex-col items-center gap-1">
              <span className="Heading-Serif text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-light opacity-95">Why Choose</span>
              <span className="Heading-Serif italic text-[clamp(3.5rem,9vw,6.5rem)] font-light highlighted-text-gold drop-shadow-[0_0_15px_rgba(185,163,211,0.2)] leading-[0.9]">
                Homely Health Care
              </span>
            </h2>

            {/* Glowing Divider with Flare */}
            <div className="relative w-64 h-[1px] mt-4">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B36A]/60 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D6B36A] blur-[6px] shadow-[0_0_15px_#D6B36A]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 w-full">
            {[
              {
                icon: UserCheck,
                title: "Person-Centred Care",
                desc: "We believe every individual is unique. Your care plan is tailored specifically to your wants, needs, and lifestyle for maximum comfort and dignity."
              },
              {
                icon: ShieldCheck,
                title: "Rigorous Vetting",
                desc: "Our robust selection process ensures all staff are thoroughly referenced, fully DBS checked, and appropriately trained to an exceptionally high standard.",
                isFeatured: true
              },
              {
                icon: HeartHandshake,
                title: "Expert Management",
                desc: "Our friendly management team and Field Care Managers visit you regularly to guarantee the care you receive always aligns with your expectations."
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.15 }}
                className={`relative flex flex-col p-8 lg:p-10 rounded-[32px] border transition-all duration-700 hover:-translate-y-2 cursor-default group overflow-hidden glass-card ${feature.isFeatured ? 'border-[#D6B36A]/30 ring-1 ring-[#D6B36A]/10 shadow-[0_20px_50px_-12px_rgba(214,179,106,0.15)]' : 'border-[#B9A3D3]/10 hover:border-[#B9A3D3]/30 shadow-2xl'}`}
              >
                {/* Surface Reflection - Refined */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Shimmering Border Effect for Featured Card */}
                {feature.isFeatured && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 border border-[#D6B36A]/20 rounded-[32px] animate-shimmer bg-gradient-to-r from-transparent via-[#D6B36A]/10 to-transparent bg-[length:200%_auto]" />
                  </div>
                )}

                {/* Card Interior Glow */}
                {feature.isFeatured && (
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D6B36A]/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-40" />
                )}

                {/* Glowing Halo Icon */}
                <div className="relative mb-8 flex">
                  {/* Halo Ambient - Refined */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full blur-[12px] bg-[#B9A3D3]/20 group-hover:bg-[#D6B36A]/30 transition-all duration-700" />

                  <div className="relative w-14 h-14 border border-[#B9A3D3]/10 bg-white/[0.04] rounded-full flex items-center justify-center text-[#F2F2F2]/90 group-hover:text-[#D6B36A] transition-all duration-700 z-10">
                    <feature.icon className="w-7 h-7 stroke-[1.2] transition-transform duration-700 group-hover:rotate-[5deg]" />
                  </div>
                </div>

                <h3 className="Heading-Serif text-2xl text-white mb-4 font-light group-hover:text-[#D6B36A] transition-all duration-700">
                  {feature.title}
                </h3>

                <p className="text-[14px] text-[#F2F2F2]/95 font-light leading-relaxed mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>

                {/* Subtle Luxury Edge Highlight */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D6B36A]/0 to-transparent group-hover:via-[#D6B36A]/30 transition-all duration-1000" />
              </motion.div>
            ))}
          </div>

          {/* Luxury Reflection/Glow beneath the center card container */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#5B2A86]/5 blur-[100px] pointer-events-none" />
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS - Luxury Ivory Theme */}
      <section className="bg-[#F7F5F2] section-padding relative z-20 overflow-hidden border-t border-[#5B2A86]/5">
        <div className="grid-container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">

            {/* Left Column: Stats */}
            <div className="flex flex-col gap-16 lg:border-r border-[#1B1326]/10 lg:pr-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="flex items-baseline gap-1">
                  <span className="block text-[100px] lg:text-[140px] leading-none font-light text-[#5B2A86] tracking-tighter Heading-Serif">
                    9.8
                  </span>
                  <span className="text-4xl text-[#1B1326]/20 font-light">/10</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#1B1326]/40 block mt-4">
                  Family Trust Rating
                </span>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#D6B36A]/10 rounded-full blur-3xl opacity-50" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="block text-[100px] lg:text-[140px] leading-none font-light text-[#5B2A86] tracking-tighter Heading-Serif">
                    7
                  </span>
                  <span className="text-[60px] lg:text-[100px] text-[#1B1326]/20 font-light">+</span>
                </div>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#1B1326]/40 block mt-4">
                  Average Years of Clinical Experience
                </span>
              </motion.div>
            </div>

            {/* Right Column: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pl-24 relative"
            >
              <div className="absolute -top-24 -left-12 text-[#5B2A86]/5 text-[280px] font-serif leading-none italic select-none">
                &ldquo;
              </div>
              <p className="Heading-Serif text-[#1B1326] text-3xl lg:text-4xl leading-relaxed relative z-10 font-light italic">
                The level of dignity and true compassion provided is unparalleled. We feel a profound sense of security knowing our loved ones are in such expert hands.
              </p>

              <div className="mt-16 flex items-center gap-8">
                <div className="w-16 h-[1px] bg-[#D6B36A]" />
                <div>
                  <p className="font-bold text-[#5B2A86] text-xl tracking-wide uppercase">Sarah Jenkins</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#1B1326]/40 mt-2 font-bold">Private Client, Dorset</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: SERVICES OVERVIEW - Editorial Presentation */}
      <section className="section-padding bg-premium-dark text-[#F2F2F2] overflow-hidden relative" >
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#F7F5F2] to-transparent opacity-5" />

        <div className="grid-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 text-center"
          >
            <span className="text-[#D6B36A] text-[10px] tracking-[0.4em] uppercase block mb-8 font-bold">Curated Care Packages</span>
            <h2 className="Heading-H2">Our <span className="italic font-light text-[#B9A3D3]">Luxury</span> Services</h2>
          </motion.div>

          {/* Service Cards - Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[
              {
                title: "Home Care",
                tag: "Bespoke Support",
                img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop",
                desc: "Maintain independence with clinical precision and heartfelt companionship in your own home."
              },
              {
                title: "Live-in Care",
                tag: "24/7 Presence",
                img: "https://images.unsplash.com/photo-1581579205556-c3ccfe505d04?q=80&w=1600&auto=format&fit=crop",
                desc: "Round-the-clock peace of mind delivered by a hand-picked team of dedicated professionals."
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
                img: "https://images.unsplash.com/photo-1628177142898-93e46e48c1be?q=80&w=2000&auto=format&fit=crop",
                desc: "Specialized nurse-led care for complex health conditions and intensive support needs."
              }
            ].map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="relative h-[500px] w-full mb-10 overflow-hidden rounded-sm">
                  <Image src={srv.img} alt={srv.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#1B1326]/40 transition-colors duration-500 group-hover:bg-[#1B1326]/20" />
                  <div className="absolute inset-0 border border-white/10 m-4 group-hover:m-6 transition-all duration-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#D6B36A] text-[9px] uppercase tracking-[0.3em] font-bold mb-4">{srv.tag}</span>
                  <div className="flex justify-between items-end">
                    <h3 className="Heading-H3 text-[#F2F2F2] group-hover:text-[#D6B36A] transition-colors">{srv.title}</h3>
                    <Link href="/services" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D6B36A] group-hover:bg-[#D6B36A] transition-all duration-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:text-[#1B1326] transition-colors"><path d="M7 17l10-10M17 17V7H7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  </div>
                  <p className="mt-6 text-[#F2F2F2]/60 font-light leading-relaxed max-w-sm">{srv.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <Link href="/services" className="inline-flex items-center px-12 py-5 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] hover:-translate-y-2 relative overflow-hidden group">
              <span className="relative z-10">Experience All Services</span>
              <div className="absolute inset-0 bg-[#D6B36A] opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE CHARITY TRUST - Luxury Purpose */}
      <section className="section-padding bg-[#F7F5F2] relative overflow-hidden bg-texture-linen">
        <div className="grid-container relative z-10 mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 glass-card-light px-6 py-3 rounded-full mb-10 border-[#5B2A86]/10">
                <Heart className="w-4 h-4 text-[#5B2A86] fill-[#5B2A86]" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#5B2A86]">Social Responsibility</span>
              </div>
              <h2 className="Heading-H2 text-[#1B1326] content-gap-sm">
                A Vision of <span className="italic font-light text-[#5B2A86]">Hope.</span>
              </h2>
              <p className="Text-18 text-[#1B1326]/70 leading-relaxed font-light mb-12 max-w-xl">
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
              className="relative h-[700px] overflow-hidden rounded-sm shadow-2xl"
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
