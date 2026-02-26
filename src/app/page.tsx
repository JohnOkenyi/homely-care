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
      {/* HERO SECTION - 50/50 Split */}
      <section ref={container} className="relative flex flex-col lg:flex-row min-h-screen bg-[#fdfcff] overflow-hidden">

        {/* Left: Typography (40-50%) */}
        <div className="w-full lg:w-[45%] lg:min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-32 lg:pt-0 relative z-30">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#8da399] font-semibold block mb-8">
              HEALTH CARE
            </span>

            <h1 className="Heading-Serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-[#150f1d] mb-6 tracking-tight">
              <span className="font-light">A Life of</span> <br />
              <span className="font-bold">Dignity,</span> <br />
              <span className="font-light italic text-[#1c1c1c]/80">Tailored to You.</span>
            </h1>

            <p className="Text-18 text-[#1c1c1c]/80 font-light mb-12 max-w-lg leading-relaxed">
              Experience world-class, person-centred support in the comfort of your own home, delivered by compassionate professionals.
            </p>

            <Link href="/contact-us" className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#1c1c1c]/10 text-xs uppercase tracking-[0.2em] font-medium text-[#1c1c1c] hover:bg-[#8da399] hover:text-white hover:border-transparent transition-all duration-500 group">
              24/7 DEDICATED CARE
            </Link>
          </motion.div>

          {/* subtle scroll indicator */}
          <div className="hidden lg:flex absolute bottom-12 left-12 xl:left-24 items-center gap-4">
            <div className="w-[1px] h-12 bg-[#1c1c1c]/20 overflow-hidden relative">
              <motion.div
                className="w-full h-full bg-[#1c1c1c]"
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1c1c1c]/50">Discover more</span>
          </div>
        </div>

        {/* Right: Image (50-60%) */}
        <div className="w-full lg:w-[55%] h-[50vh] lg:h-screen relative mt-12 lg:mt-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full origin-bottom">
            <Image src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1600&auto=format&fit=crop" alt="Compassionate Care" fill className="object-cover" priority unoptimized={true} />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TRUST BAR */}
      <section className="bg-[#fdfcff] py-32 md:py-48 relative z-20 overflow-hidden">
        <div className="grid-container max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#1c1c1c]/40 block mb-12 md:mb-16">
              Regulated & Trusted By
            </span>

            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 mb-16 md:mb-24 opacity-40 grayscale transition-all duration-500">
              <span className="font-bold text-3xl tracking-tighter text-[#1c1c1c]">CQC</span>
              <span className="font-bold text-3xl tracking-tighter text-[#1c1c1c]">NHS</span>
              <span className="font-bold text-2xl tracking-tight text-[#1c1c1c]">Skills for Care</span>
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

          {/* Proof Points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mt-24 pt-16 border-t border-[#1c1c1c]/10 grid sm:grid-cols-2 gap-12 lg:gap-24 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#fdfcff] border border-[#1c1c1c]/10 rounded-full flex items-center justify-center text-[#8da399] shrink-0">
                <Award className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#1c1c1c]">9.8/10</span>
                <span className="text-sm font-medium text-[#1c1c1c]/50 uppercase tracking-widest mt-1 block">Rated By Families</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-[#fdfcff] border border-[#1c1c1c]/10 rounded-full flex items-center justify-center text-[#8da399] shrink-0">
                <Clock className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#1c1c1c]">7+ Years</span>
                <span className="text-sm font-medium text-[#1c1c1c]/50 uppercase tracking-widest mt-1 block">Avg. Carer Experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL (Placeholder) */}
      <section className="py-32 bg-[#faf9f8] relative z-20">
        <div className="grid-container max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="Heading-H4 text-[#1c1c1c] italic text-2xl lg:text-3xl leading-relaxed">
              &quot;The level of dignity and true compassion the staff at Homely Health Care provides is unmatched. We feel so incredibly supported having them care for our mother.&quot;
            </p>
            <div className="mt-12 flex items-center justify-center gap-6">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative">
                <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" alt="Client Family" fill className="object-cover" />
              </div>
              <div className="text-left">
                <p className="font-medium text-[#1c1c1c]">Sarah Jenkins</p>
                <p className="text-xs uppercase tracking-widest text-[#1c1c1c]/50 mt-1">Daughter of Live-in Client, Dorset</p>
              </div>
            </div>
          </motion.div>
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
