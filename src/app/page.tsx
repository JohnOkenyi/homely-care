"use client"; // Trigger rebuild: 2026-03-13T10:49:00

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, UserCheck, Heart } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic Import for the heavy Globe component to improve LCP/TTI
// Dynamic Import for the new 3D visual
// Dynamic Import for the heavy 3D visual
const SeniorLiving3D = dynamic(() => import("@/components/SeniorLiving3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full rounded-full bg-white/5 animate-pulse" />
});

// Dynamic Import for the new Testimonial Slider
const TestimonialSlider = dynamic(() => import("@/components/TestimonialSlider"), {
  ssr: false,
  loading: () => <div className="w-full h-48 bg-black/5 animate-pulse rounded-2xl" />
});

export default function Home() {
  const container = useRef(null);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* HERO SECTION - Luxury Purple Dark Theme */}
      <section ref={container} className="relative flex flex-col lg:flex-row items-center lg:justify-center min-h-0 pt-28 pb-8 lg:py-0 lg:min-h-[100svh] overflow-hidden bg-[linear-gradient(135deg,#0F1115_0%,#1B1326_100%)] lg:bg-[linear-gradient(135deg,#0F1115_0%,#1B1326_50%,#000000_100%)]">

        {/* Depth layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Ambient star field - Hidden on mobile to prevent glitches */}
          <div className="absolute inset-0 opacity-[0.15] hidden lg:block" style={{ backgroundImage: 'radial-gradient(circle, rgba(185,163,211,0.9) 1px, transparent 1px)', backgroundSize: '70px 70px' }} />
          {/* Purple glow — left ambient - Hidden on mobile to prevent glitches */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25 hidden lg:block" style={{ background: '#5B2A86' }} />
          {/* Text-readability gradient overlay — Unified dark backdrop */}
          <div className="absolute inset-0 bg-transparent lg:bg-[linear-gradient(to_right,rgba(15,17,21,0.99)_0%,rgba(27,19,38,0.98)_45%,rgba(27,19,38,0.95)_60%,rgba(0,0,0,1)_85%)]" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-30 flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto px-0 lg:px-16 pt-0 lg:pt-20 pb-0 lg:pb-8 gap-0 lg:gap-8">

          {/* Left: Typography */}
          <div className="relative w-full lg:w-[48%] flex flex-col z-40 lg:-ml-12">
            {/* Subtle Spotlight Glow behind text - Hidden on mobile to prevent glitches */}
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(185,163,211,0.1),transparent_70%)] blur-3xl pointer-events-none hidden lg:block" />

            <div>
              {/* Label */}
              <div
                className="mb-8 lg:mb-10 px-4 md:px-8 lg:px-0 mt-8 lg:mt-0"
              >
                <span className="text-[10px] font-bold tracking-[0.45em] uppercase" style={{ color: '#B9A3D3' }}>
                  Care Tailored to You
                </span>
              </div>

              {/* Headline & Subheadline - Unified Anchored Block */}
              <div
                className="relative mb-12 sm:mb-8 lg:mb-4 pl-8 border-l border-[#D4AF37]/30 mx-4 md:mx-8 lg:mx-0"
              >
                {/* Vertical Gold Spine Accent */}
                <div
                  className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                />

                {/* Main Headline Unit */}
                <div className="mb-2">
                  <h1
                    className="Heading-Serif tracking-tight font-light"
                    style={{
                      fontSize: 'clamp(40px, 7vw, 72px)',
                      background: 'linear-gradient(to bottom, #FFFFFF 0%, #E0E0E0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: '1.0',
                      marginBottom: '0px'
                    }}
                  >
                    <span className="block">Compassionate</span>
                    <span className="block">care</span>
                  </h1>
                  <p
                    className="italic highlighted-text-gold font-medium"
                    style={{
                      fontSize: 'clamp(18px, 3vw, 32px)',
                      color: '#D4AF37',
                      opacity: 0.9,
                      marginTop: '8px',
                      filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.2))'
                    }}
                  >
                    focused on you.
                  </p>
                </div>

                {/* Supporting Text */}
                <p
                  className="Text-18 font-light max-w-lg mb-0"
                  style={{
                    color: 'rgba(242,242,242,0.92)',
                    lineHeight: '1.65'
                  }}
                >
                  Dedicated personal support tailored to your life, your needs, and your independence.
                </p>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-4 w-full mb-0 pb-0 px-4 md:px-8 lg:px-0"
              >
                <Link
                  href="/contact-us"
                  className="group relative inline-flex items-center justify-center gap-4 px-7 py-4 sm:py-3.5 w-full md:w-auto rounded-full text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold transition-all duration-700 overflow-hidden"
                  style={{
                    backgroundColor: '#5B2A86',
                    color: '#FFFFFF',
                    border: '1px solid #D6B36A',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2), 0 0 15px rgba(214,179,106,0.1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(214,179,106,0.3), 0 8px 25px rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2), 0 0 15px rgba(214,179,106,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-[#D6B36A]/10 transition-all duration-700 ease-out" />
                  <span className="relative z-10">Book a Call</span>
                  <Heart className="w-4 h-4 text-[#D6B36A] group-hover:scale-110 transition-transform duration-500 relative z-10" />
                </Link>

                <Link
                  href="/services"
                  className="group relative text-[10px] uppercase tracking-[0.3em] font-bold inline-flex items-center justify-center sm:justify-start gap-4 sm:gap-3 transition-all duration-500 py-3 sm:py-2 sm:pl-4 w-full sm:w-auto"
                  style={{ color: '#F7F5F2' }}
                >
                  <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">Explore Services</span>
                  <div className="w-8 h-[1px] bg-[#D6B36A] transition-all duration-500 group-hover:w-12" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Premium 3D Diorama */}
          <div className="hidden lg:flex w-full lg:w-[50%] items-center justify-center lg:justify-end mt-12 lg:mt-0 relative z-30 mb-8 lg:mb-0">
            <div className="relative w-full aspect-[4/3] max-w-[600px] lg:max-w-none lg:w-[120%] lg:translate-x-[15%]">
              <SeniorLiving3D />
            </div>
          </div>
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
                  src="/images/compassionate-care-v2.png"
                  alt="Compassionate Home Care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#D6B36A]">Our Mission</span>
              </div>

              <h2 className="Heading-Serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-[#1A1A1A] leading-[1.1] mb-6 font-light">
                Upholding dignity with <br />
                <span className="italic text-[#5B2A86]">care and compassion</span>
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg md:text-xl text-[#1A1A1A]/70 font-light leading-relaxed">
                  To provide compassionate, high quality healthcare services through trusted professionals.
                </p>
              </div>

              <Link
                href="/about-us"
                className="group relative inline-flex items-center px-10 py-5 bg-[#5B2A86] text-white rounded-full overflow-hidden transition-all duration-500 hover:bg-[#4a226d] hover:shadow-xl hover:shadow-purple-900/10"
              >
                <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-semibold">Our Mission</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE HOMELY CARE - Heading on Dark / Cards in Ivory Box */}
      <section className="relative py-16 md:py-20 scroll-mt-20" style={{ background: 'linear-gradient(160deg, #1B1230 0%, #0F1115 100%)' }}>
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
            className="w-full bg-[#F0EDE8] rounded-[24px] shadow-[0_25px_70px_rgba(0,0,0,0.3)] p-6 md:p-10 perspective-[1200px] overflow-visible select-none"
          >
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
              {[
                { icon: UserCheck, title: "Person Centred Care", desc: "We believe every individual is unique. Your care plan is tailored specifically to your wants, needs, and lifestyle for maximum comfort and dignity." },
                { icon: ShieldCheck, title: "Rigorous Vetting", desc: "Our robust selection process ensures all staff are thoroughly referenced, fully DBS checked, and trained to an exceptionally high standard." },
                { icon: HeartHandshake, title: "Expert Management", desc: "Our friendly management team and Field Care Managers visit you regularly to ensure the care you receive always meets your expectations." }
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative"
                  style={{ perspective: '900px' }}
                  onMouseMove={(e) => {
                    const wrapper = e.currentTarget;
                    const inner = wrapper.querySelector('.card-3d-inner') as HTMLElement;
                    const extBottom = wrapper.querySelector('.ext-bottom') as HTMLElement;
                    const extRight = wrapper.querySelector('.ext-right') as HTMLElement;
                    if (!inner) return;
                    const rect = wrapper.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const cx = rect.width / 2;
                    const cy = rect.height / 2;
                    const rX = ((y - cy) / cy) * -16;
                    const rY = ((x - cx) / cx) * 16;
                    inner.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) translateZ(50px)`;
                    inner.style.boxShadow = `${-rY * 2}px ${rX * 2}px 60px rgba(0,0,0,0.22), 0 30px 60px rgba(91,42,134,0.12)`;
                    if (extBottom) extBottom.style.opacity = '1';
                    if (extRight) extRight.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    const wrapper = e.currentTarget;
                    const inner = wrapper.querySelector('.card-3d-inner') as HTMLElement;
                    const extBottom = wrapper.querySelector('.ext-bottom') as HTMLElement;
                    const extRight = wrapper.querySelector('.ext-right') as HTMLElement;
                    if (!inner) return;
                    inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    inner.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)';
                    if (extBottom) extBottom.style.opacity = '0';
                    if (extRight) extRight.style.opacity = '0';
                  }}
                >
                  {/* Physical side extrusion faces */}
                  <div
                    className="ext-bottom absolute inset-x-3 -bottom-[14px] h-[16px] rounded-b-[18px] z-0"
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.18s ease-out',
                      background: 'linear-gradient(to bottom, #c8c3bc, #a09890)',
                    }}
                  />
                  <div
                    className="ext-right absolute inset-y-3 -right-[14px] w-[16px] rounded-r-[18px] z-0"
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.18s ease-out',
                      background: 'linear-gradient(to right, #c8c3bc, #a09890)',
                    }}
                  />

                  <div
                    className="card-3d-inner relative z-10 flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-[20px] border border-black/[0.04] cursor-default h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                      willChange: 'transform',
                    }}
                  >
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-[15px]" style={{ background: '#D6B36A', transform: 'scale(1.3)' }} />
                      <div className="relative w-16 h-16 rounded-full bg-[#5B2A86] flex items-center justify-center z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <feature.icon className="w-7 h-7 text-white stroke-[1.5]" />
                      </div>
                    </div>
                    <div className="w-10 h-[1.5px] bg-[#D6B36A] mb-5 transform transition-transform duration-500 group-hover:scale-x-150" />
                    <h3 className="Heading-Serif text-[#1A1A1A] text-xl md:text-2xl mb-4 font-normal leading-snug group-hover:text-[#5B2A86] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed font-light group-hover:text-black transition-colors duration-300" style={{ color: 'rgba(0,0,0,0.6)' }}>
                      {feature.desc}
                    </p>
                    <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#D6B36A]/0 group-hover:border-[#D6B36A]/60 transition-all duration-500" />
                  </div>
                </div>
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
              Trusted by Families Across the UK....
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
            className="bg-[#FCFBFA] rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row gap-10 lg:gap-14 items-center border border-black/[0.03] select-none"
          >
            {/* Left Column: Inner 3D Stat Cards */}
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 shrink-0">
              {/* Card 1 */}
              <div className="bg-white rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.06)] p-10 flex flex-col items-center justify-center min-w-[250px] md:min-w-[300px] border border-black/[0.04] transform transition-transform hover:-translate-y-1 duration-500">
                <div className="flex flex-col items-center gap-2 mb-2">
                  <span className="text-3xl md:text-4xl text-[#4B3061] font-medium tracking-tighter Heading-Serif text-center">Providing Exceptional Care</span>
                </div>
                <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#D6B36A] text-center mt-2">
                  Since 2016
                </span>
              </div>
            </div>

            {/* Faint Vertical Divider */}
            <div className="hidden lg:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-[#1A1A1A]/[0.06] to-transparent mx-2" />
            {/* Horizontal Divider for Mobile */}
            <div className="lg:hidden h-[1px] w-full bg-gradient-to-r from-transparent via-[#1A1A1A]/[0.06] to-transparent" />

            {/* Right Column: Testimonial Slider */}
            <div className="relative flex-1">
              <TestimonialSlider />
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 5: SERVICES OVERVIEW - Editorial Presentation */}
      <section className="py-12 md:py-16 bg-premium-dark text-[#F2F2F2] relative" >
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
                id: "home-care",
                title: "Home Care",
                tag: "Bespoke Support", // Keeping original tag, as new objects don't explicitly define it
                desc: "Compassionate, personalised support enabling you to live independently and safely in your own home.",
                img: "/images/services/home-care-diverse.png",
              },
              {
                id: "live-in-care",
                title: "Live in Care",
                tag: "24/7 Presence", // Keeping original tag
                desc: "Round the clock reassurance and dedicated 1-to-1 care from a perfectly matched companion.",
                img: "/images/services/live-in-care-diverse.png",
              },
              {
                id: "supported-living",
                title: "Supported Living",
                tag: "Independence First", // Keeping original tag
                desc: "Empowering individuals with learning disabilities or mental health needs to lead fulfilling lives within the community.",
                img: "/images/services/supported-living-diverse.png",
              },
              {
                id: "complex-care",
                title: "Complex Care",
                tag: "Clinical Excellence", // Keeping original tag
                desc: "Specialist, nurse led clinical interventions delivered safely in your own environment.",
                img: "/images/services/complex-care-diverse.png",
              }
            ].map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[320px] perspective-[1200px] overflow-visible"
              >
                {/* 3D EXTRUDE CARD */}
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    z: 50,
                    rotateX: -2,
                    rotateY: 2,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                  whileTap={{
                    scale: 1.04,
                    z: 50,
                    rotateX: -2,
                    rotateY: 2,
                    transition: { duration: 0.1, ease: "easeOut" }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative w-full h-full rounded-xl overflow-hidden glass-card-dark border-white/10 shadow-xl transition-all duration-500 group-hover:border-[#D6B36A]/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(214,179,106,0.15)] group-hover:bg-[#1B1326]/90 active:shadow-[0_80px_180px_rgba(0,0,0,0.8),0_0_30px_rgba(214,179,106,0.3)] will-change-transform select-none"
                >
                  {/* Background Image - Subtle Zoom */}
                  <Image
                    src={srv.img}
                    alt={srv.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/20 to-transparent" />

                  {/* Content - Compact Layout */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.div className="relative z-10">
                      <span className="text-[#D6B36A] text-[10px] uppercase tracking-[0.4em] font-extrabold block mb-2">{srv.tag}</span>
                      <h3 className="Heading-Serif text-3xl lg:text-4xl italic text-white mb-3 leading-tight tracking-tight">{srv.title}</h3>
                      <p className="text-white text-sm md:text-base font-medium leading-relaxed mb-6 line-clamp-2 md:line-clamp-none opacity-100 shadow-sm">
                        {srv.desc}
                      </p>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/services?service=${srv.id}`}
                          className="px-6 py-2.5 rounded-full border border-white/30 text-white text-[10px] uppercase tracking-[0.2em] font-extrabold transition-all duration-500 hover:bg-[#D6B36A] hover:text-[#1B1326] hover:border-[#D6B36A] bg-white/5"
                        >
                          View Service
                        </Link>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#5B2A86] group-hover:text-white transition-all duration-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Highlight Border */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl group-hover:border-white/30 transition-colors duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/services?service=all" className="inline-flex items-center px-12 py-5 bg-[#5B2A86] text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl transition-all duration-500 hover:bg-[#7A4FB3] hover:-translate-y-2 relative overflow-hidden group">
              <span className="relative z-10">Experience All Services</span>
              <div className="absolute inset-0 bg-[#D6B36A] opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE CHARITY TRUST - Luxury Purpose */}
      <section className="section-padding bg-[#F7F5F2] relative">
        <div className="grid-container relative z-10 mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="flex flex-col items-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5B2A86] mb-4">Social Responsibility</span>
              </div>
              
              {/* Charity Certificate */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[400px] aspect-[1.414/1] mx-auto mb-12 group"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#D6B36A]/20 via-transparent to-[#5B2A86]/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/40 bg-white p-2">
                  <Image
                    src="/images/charity-certificate.jpg"
                    alt="Certificate of Appreciation - Royal Regiment of Fusiliers"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <p className="Text-18 text-[#1B1326]/70 leading-relaxed font-light mb-10 max-w-2xl mx-auto">
                We believe that premium care should extend beyond our immediate community. Homely Health Care proudly dedicates a percentage of its profits to two charities; The Rahula Trust and The Regiment Support Service.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="http://www.rahula-trust.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 border border-[#1B1326] text-[#1B1326] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#1B1326] hover:text-white transition-all duration-500 hover:-translate-y-1"
                >
                  The Rahula Trust
                </a>
                <a
                  href="https://www.regimentsupportservice.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 border border-[#1B1326] text-[#1B1326] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#1B1326] hover:text-white transition-all duration-500 hover:-translate-y-1"
                >
                  The Regiment Support Service
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main >
  );
}
