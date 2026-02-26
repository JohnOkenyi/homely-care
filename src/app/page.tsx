"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section ref={container} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1c1c1c]">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
            alt="Luxury Residence"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center text-white mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 text-[#c5a265]"
          >
            Redefining Private Care
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="Heading-Display mx-auto max-w-5xl"
          >
            A Life of <span className="italic text-[#c5a265] font-light">Dignity,</span><br />
            Surrounded by Comfort.
          </motion.h1>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 md:py-48 bg-[#faf9f6]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="Heading-H2 text-[#1c1c1c] mb-8">
                The Standard of <br /><span className="italic text-[#c5a265]">Excellence.</span>
              </h2>
              <p className="text-[#8e948c] text-lg lg:text-xl leading-relaxed max-w-xl font-light">
                At Homely Care, we believe that choosing support shouldn&apos;t mean compromising on lifestyle. We provide an environment that feels like a prestigious private residence, where dignity and independence remain our highest priorities.
              </p>

              <Link href="/about-us" className="mt-12 flex items-center gap-6 cursor-pointer group">
                <div className="h-[1px] w-12 bg-[#c5a265] group-hover:w-24 transition-all duration-500" />
                <span className="text-xs uppercase tracking-[0.2em] font-medium group-hover:text-[#c5a265] transition-colors">Discover Our Story</span>
              </Link>
            </motion.div>

            <div className="relative h-[600px] w-full lg:w-[90%] ml-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1628611225249-6c3c7c689552?q=80&w=2670&auto=format&fit=crop"
                  alt="Interior"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 bg-[#ebe9e1] z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-32 bg-[#1c1c1c] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-[#8e948c]">Bespoke Services</p>
          <h2 className="Heading-H2">Comprehensive Support</h2>
        </div>

        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
          {[
            { title: "Live-in Care", desc: "Expert round-the-clock support in the familiarity of our luxurious estates." },
            { title: "Complex Care", desc: "Specialized clinical approach for advanced medical and support requirements." },
            { title: "Supported Living", desc: "Empowering individuals to live independently while receiving tailored care." }
          ].map((srv, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/10 p-12 hover:bg-white/5 transition-colors group cursor-pointer"
            >
              <span className="text-[#c5a265] text-sm tracking-widest block mb-8">0{i + 1}</span>
              <h3 className="Heading-Serif text-2xl mb-4">{srv.title}</h3>
              <p className="text-[#8e948c] leading-relaxed text-sm mb-12">{srv.desc}</p>

              <div className="w-8 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-[#c5a265] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
