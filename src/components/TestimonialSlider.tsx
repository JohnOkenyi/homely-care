"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        name: "Louise",
        role: "Family Member",
        text: "It has been a very positive experience with Homely who I can see have done everything possible to support us as a family. I would definitely recommend them as a care agency. Thank you very much!",
        initial: "L"
    },
    {
        name: "Debbie",
        role: "Family Member",
        text: "Just to say 'Thank you' for all the extra care your team did for the family. Your presence and support made a world of difference during a challenging time.",
        initial: "D"
    },
    {
        name: "Jon",
        role: "Private Client",
        text: "As a retired professional, I am acutely aware how people are quick to criticise but not so quick to praise. I was feeling very unwell and my carer was attentive, reassuring, and professional throughout. I really couldn't have asked for anyone better.",
        initial: "J"
    },
    {
        name: "Nigel",
        role: "Family Member",
        text: "I would like to thank you and your special team for the fantastic care you provided for our family. The professionalism and warmth you showed was exceptional.",
        initial: "N"
    },
    {
        name: "Clinical Specialist",
        role: "Occupational Therapist",
        text: "I am impressed with the exceptional care. Their level of professionalism, compassion and dedication has been remarkable. They have consistently gone above and beyond to ensure complex needs were met with the utmost attention.",
        initial: "C"
    },
    {
        name: "Louise",
        role: "Family Member",
        text: "The team were all amazing. I feel as if they all genuinely care and really worked with us as a family. Every carer did their best and they really are a credit to the organization.",
        initial: "L"
    },
    {
        name: "Janet",
        role: "Healthcare Professional",
        text: "Every single one of the carers I have met has been absolutely brilliant, always so positive and helpful and an absolute joy to work with.",
        initial: "J"
    }
];

export default function TestimonialSlider() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextStep = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextStep, 6000);
        return () => clearInterval(timer);
    }, [nextStep]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            filter: "blur(10px)"
        })
    };

    return (
        <div className="relative w-full min-h-[300px] flex flex-col justify-center">
            <div className="relative overflow-hidden min-h-[220px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.4 },
                            filter: { duration: 0.4 }
                        }}
                        className="w-full"
                    >
                        {/* Elegant Quotation Mark */}
                        <div className="absolute -top-12 -left-8 text-[#E4DDF0] text-[120px] font-serif leading-none select-none pointer-events-none opacity-40">
                            &ldquo;
                        </div>

                        <p className="Heading-Serif text-[#1A1A1A] text-[18px] md:text-[22px] leading-[1.6] relative z-10 font-normal italic tracking-tight text-balance mb-8">
                            {testimonials[index].text}
                        </p>

                        <div className="flex items-center gap-4 mt-auto">
                            {/* Client Avatar */}
                            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-lg ring-2 ring-white border border-[#1A1A1A]/5 bg-[#5B2A86] flex items-center justify-center text-white font-serif text-xl">
                                {testimonials[index].initial}
                            </div>

                            {/* Client Info Block */}
                            <div className="flex flex-col gap-0.5">
                                <div className="w-8 h-[1px] bg-[#D6B36A] mb-1" />
                                <p className="font-bold text-[#4B3061] text-xs tracking-[0.1em] uppercase">{testimonials[index].name}</p>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 font-bold">{testimonials[index].role}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-start gap-2 mt-8">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > index ? 1 : -1);
                            setIndex(i);
                        }}
                        className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? "w-8 bg-[#D6B36A]" : "w-2 bg-[#D6B36A]/20 hover:bg-[#D6B36A]/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
