"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUpRight, Shield, Car, Monitor, Recycle } from "lucide-react";

interface SustainabilitySectionProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function SustainabilitySection({
  className = "",
  variant = "light",
}: SustainabilitySectionProps) {
  const isDark = variant === "dark";

  const commitments = [
    {
      icon: Car,
      title: "Optimised Travel & Rotas",
      desc: "Minimising emissions by allocating staff geographically, grouping home care visits, and encouraging virtual administrative meetings.",
    },
    {
      icon: Monitor,
      title: "Digital Care Systems",
      desc: "Operating a paperless digital workflow across electronic care records, rotas, assessments, and internal administration.",
    },
    {
      icon: Recycle,
      title: "Waste & Energy Efficiency",
      desc: "Enforcing energy management across offices, reducing paper consumption, and adopting responsible waste recycling practices.",
    },
    {
      icon: Shield,
      title: "Net Zero by 2050",
      desc: "Publicly committed to achieving Net Zero greenhouse gas emissions across Scope 1, 2, and 3 operations by 2050 at the latest.",
    },
  ];

  return (
    <section
      className={`section-padding relative overflow-hidden transition-colors ${
        isDark ? "bg-[#0F1115] text-[#F2F2F2]" : "bg-[#F7F5F2] text-[#1B1326]"
      } ${className}`}
    >
      {/* Signature Brand Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ background: "#5B2A86" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ background: "#D6B36A" }}
      />

      <div className="grid-container relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-4"
          >
            <span
              className={`text-[10px] uppercase tracking-[0.4em] font-bold mb-3 ${
                isDark ? "text-[#D6B36A]" : "text-[#5B2A86]"
              }`}
            >
              Environmental Responsibility
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl md:text-5xl font-serif italic mb-6 ${
              isDark ? "text-white" : "text-[#1B1326]"
            }`}
          >
            Our Commitment to{" "}
            <span className="highlighted-text-gold font-light not-italic">
              Sustainability
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-4 text-base md:text-lg font-light leading-relaxed ${
              isDark ? "text-white/80" : "text-[#1B1326]/70"
            }`}
          >
            <p>
              At Homely Health Care Limited, we recognise our responsibility to reduce the environmental impact of our operations and contribute to a more sustainable future. We are committed to measuring and reducing our carbon emissions and continually reviewing how we can operate more efficiently and responsibly.
            </p>
            <p>
              Our approach includes reducing unnecessary travel, making greater use of digital systems, encouraging more sustainable working practices and monitoring our carbon footprint over time. Our Carbon Reduction Plan sets out our current emissions, reduction measures and future commitments.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid & Interactive Document Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Key Approach Grid (7 Columns) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {commitments.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={`p-6 rounded-2xl border transition-all duration-500 group flex flex-col justify-between ${
                  isDark
                    ? "bg-[#161A23]/80 border-white/10 hover:border-[#D6B36A]/40 hover:bg-[#1B212D]"
                    : "bg-white border-[#1B1326]/5 hover:border-[#5B2A86]/30 shadow-md hover:shadow-xl"
                }`}
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 ${
                      isDark
                        ? "bg-white/5 border border-white/10 text-[#D6B36A]"
                        : "bg-[#5B2A86]/5 border border-[#5B2A86]/10 text-[#5B2A86]"
                    }`}
                  >
                    <item.icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3
                    className={`font-serif italic text-lg mb-2 ${
                      isDark ? "text-white" : "text-[#1B1326]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs md:text-sm font-light leading-relaxed ${
                      isDark ? "text-white/70" : "text-[#1B1326]/70"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Luxury PDF Showcase Card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex"
          >
            <div
              className={`w-full rounded-3xl p-8 border relative overflow-hidden flex flex-col justify-between group shadow-2xl transition-all duration-700 ${
                isDark
                  ? "bg-gradient-to-b from-[#1B1326] via-[#150F1F] to-[#0F1115] border-[#D6B36A]/30"
                  : "bg-gradient-to-b from-white via-[#F7F5F2] to-[#EFECE6] border-[#1B1326]/10"
              }`}
            >
              {/* Subtle Brand Glows */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D6B36A]/10 via-transparent to-[#5B2A86]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <div className="relative z-10">
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D6B36A]">
                    Official Publication
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono opacity-60">
                    Aug 2026 • v2.0
                  </span>
                </div>

                {/* Document Preview Frame */}
                <div
                  className={`p-6 rounded-2xl border mb-6 relative overflow-hidden transition-colors ${
                    isDark
                      ? "bg-[#0F1115]/80 border-white/10 group-hover:border-[#D6B36A]/40"
                      : "bg-white border-[#1B1326]/10 shadow-sm group-hover:border-[#5B2A86]/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-16 rounded-xl bg-[#5B2A86] border border-[#D6B36A]/30 flex flex-col items-center justify-center text-[#D6B36A] shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <FileText className="w-6 h-6 stroke-[1.5]" />
                      <span className="text-[7px] font-bold uppercase tracking-widest mt-1 text-white/90">
                        PDF
                      </span>
                    </div>
                    <div>
                      <h4
                        className={`font-serif italic text-lg leading-snug mb-1 ${
                          isDark ? "text-white" : "text-[#1B1326]"
                        }`}
                      >
                        Carbon Reduction Plan
                      </h4>
                      <p
                        className={`text-xs font-light ${
                          isDark ? "text-white/60" : "text-[#1B1326]/60"
                        }`}
                      >
                        Homely Health Care Ltd baseline emissions report & Net Zero roadmap.
                      </p>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div
                    className={`mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-[11px] ${
                      isDark
                        ? "border-white/10 text-white/70"
                        : "border-[#1B1326]/5 text-[#1B1326]/70"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                      <span>Scope 1, 2 & 3 Data</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B2A86]" />
                      <span>Net Zero Commitment</span>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-xs md:text-sm font-light leading-relaxed mb-8 ${
                    isDark ? "text-white/70" : "text-[#1B1326]/70"
                  }`}
                >
                  View our full emissions footprint analysis, governance frameworks, and environmental targets.
                </p>
              </div>

              {/* Signature Executive CTA Button */}
              <div className="relative z-10">
                <a
                  href="/homely-health-care-carbon-reduction-plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-3 px-8 py-5 border text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:-translate-y-1 ${
                    isDark
                      ? "border-[#D6B36A] text-[#D6B36A] hover:bg-[#D6B36A] hover:text-[#1B1326]"
                      : "border-[#1B1326] text-[#1B1326] hover:bg-[#1B1326] hover:text-white"
                  }`}
                >
                  <span>View our Carbon Reduction Plan</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
