"use client";

import { motion } from "framer-motion";
import { Leaf, FileText, ArrowUpRight, ShieldCheck, Zap, Car, MonitorCheck } from "lucide-react";

interface SustainabilitySectionProps {
  className?: string;
  variant?: "dark" | "light";
}

export default function SustainabilitySection({
  className = "",
  variant = "dark",
}: SustainabilitySectionProps) {
  const isDark = variant === "dark";

  const pillars = [
    {
      icon: Car,
      title: "Reduced Travel & Rota Optimisation",
      desc: "Minimising business mileage through smart rota planning, geographically grouped visits, and remote virtual meetings.",
    },
    {
      icon: MonitorCheck,
      title: "Digital Care & Office Systems",
      desc: "Transitioning to 100% electronic care records, rotas, and digital administration to eliminate paper waste.",
    },
    {
      icon: Zap,
      title: "Energy & Waste Reduction",
      desc: "Promoting energy efficiency in our offices and implementing strict recycling and sustainable procurement guidelines.",
    },
    {
      icon: ShieldCheck,
      title: "Net Zero by 2050",
      desc: "Publicly committed to achieving Net Zero greenhouse gas emissions across Scope 1, 2, and 3 by 2050 at the latest.",
    },
  ];

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden transition-colors ${
        isDark ? "bg-[#0B0D12] text-white" : "bg-[#F7F5F2] text-[#1B1326]"
      } ${className}`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#5B2A86]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid-container relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.35em] font-extrabold mb-4"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Environmental Stewardship</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-serif italic mb-6 ${
              isDark ? "text-white" : "text-[#1B1326]"
            }`}
          >
            Our Commitment to{" "}
            <span className="highlighted-text-gold not-italic font-light">
              Sustainability
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`space-y-4 text-base md:text-lg font-light leading-relaxed ${
              isDark ? "text-white/80" : "text-[#1B1326]/80"
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

        {/* Feature Grid & Interactive Document Card Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Key Approach Grid (7 Columns) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isDark
                    ? "bg-[#141822]/80 border-white/10 hover:border-emerald-500/40 hover:bg-[#1A202C]"
                    : "bg-white border-[#1B1326]/10 hover:border-emerald-500/40 shadow-sm"
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <item.icon className="w-5 h-5" />
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

          {/* Creative PDF Showcase Card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex"
          >
            <div
              className={`w-full rounded-3xl p-8 border relative overflow-hidden flex flex-col justify-between group shadow-2xl ${
                isDark
                  ? "bg-gradient-to-br from-[#161B26] via-[#10141D] to-[#0A0C10] border-emerald-500/30"
                  : "bg-gradient-to-br from-white via-[#F4F1EA] to-[#EAE4D9] border-emerald-600/20"
              }`}
            >
              {/* Glass / Metallic Accent Overlay */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-500/20 via-transparent to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#D6B36A]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Official Policy Document</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-wider">
                    Aug 2026 • v2.0
                  </span>
                </div>

                {/* Document Preview Graphic */}
                <div className="relative mb-6 p-6 rounded-2xl bg-[#0F121A]/90 border border-white/10 shadow-inner group-hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-14 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex flex-col items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                      <FileText className="w-6 h-6" />
                      <span className="text-[8px] font-bold uppercase tracking-tighter mt-0.5">PDF</span>
                    </div>
                    <div>
                      <h4 className="text-white font-serif text-lg leading-snug mb-1">
                        Carbon Reduction Plan
                      </h4>
                      <p className="text-xs text-white/60 font-light">
                        Homely Health Care Ltd baseline emissions report & Net Zero roadmap.
                      </p>
                    </div>
                  </div>

                  {/* Document Highlights */}
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-white/70">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Scope 1, 2 & 3 Data</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Net Zero Commitment</span>
                    </div>
                  </div>
                </div>

                <p
                  className={`text-xs md:text-sm font-light leading-relaxed mb-8 ${
                    isDark ? "text-white/70" : "text-[#1B1326]/70"
                  }`}
                >
                  Explore our complete baseline carbon footprint assessment, emission reduction measures, and governance frameworks.
                </p>
              </div>

              {/* Action Link Button */}
              <div>
                <a
                  href="/homely-health-care-carbon-reduction-plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs uppercase tracking-[0.25em] font-extrabold shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 group/btn"
                >
                  <span>View Carbon Reduction Plan</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
