"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Bot, Smile, Send, RefreshCw } from "lucide-react";

/* ──────────────────────────────────────────
   KNOWLEDGE BASE — sourced from the website
   ────────────────────────────────────────── */
interface QA {
    keywords: string[];
    answer: string;
}

const knowledgeBase: QA[] = [
    {
        keywords: ["service", "offer", "provide", "what do you do", "care type", "types of care"],
        answer: "We offer four core services:\n\n• **Home Care** – Bespoke domiciliary support to maintain your independence at home.\n• **Live-in Care** – 24/7 round-the-clock companionship and clinical support.\n• **Supported Living** – Empowering individuals with learning disabilities or autism to live independently.\n• **Complex Care** – Expert nurse-led clinical care for complex health conditions."
    },
    {
        keywords: ["home care", "domiciliary", "daily living"],
        answer: "Our **Home Care** service provides personalised support including assistance with daily living, medicine administration, domestic & nutritional support — all tailored to your routines and preferences."
    },
    {
        keywords: ["live-in", "live in", "24/7", "round the clock", "full time"],
        answer: "Our **Live-in Care** service provides a dedicated carer living in your home, offering 24/7 clinical support, companionship, expert domestic care, and dignified personal care."
    },
    {
        keywords: ["supported living", "learning disabilit", "autism", "independent living"],
        answer: "Our **Supported Living** service specialises in helping individuals with learning disabilities or autism live fulfilling lives in their community, with person-centred support including community integration, life skills development, and flexible support hours."
    },
    {
        keywords: ["complex care", "nurse", "clinical", "neurological", "rehabilitation", "tddi"],
        answer: "Our **Complex Care** service provides highly skilled, nurse-led clinical support for complex health conditions. This includes neurological support, post-injury rehabilitation, and multidisciplinary coordination."
    },
    {
        keywords: ["phone", "call", "telephone", "number", "ring"],
        answer: "You can call us on **0203 916 5797**. We're available 24/7 to discuss your care needs."
    },
    {
        keywords: ["email", "mail", "write to"],
        answer: "You can email us at **info@homelyhealthcare.org.uk**. We aim to respond to all enquiries promptly."
    },
    {
        keywords: ["address", "location", "where", "visit", "office", "find you", "based"],
        answer: "Our office is located at:\n\n**Suite 2 27, Brighton Road, South Croydon, CR2 6EB**\n\nFeel free to visit us or contact us to arrange a meeting."
    },
    {
        keywords: ["contact", "get in touch", "reach", "enquir"],
        answer: "You can reach us by:\n\n📞 **Phone:** 0203 916 5797\n📧 **Email:** info@homelyhealthcare.org.uk\n📍 **Address:** Suite 2 27, Brighton Road, South Croydon, CR2 6EB\n\nOr visit our Contact Us page to submit an enquiry form."
    },
    {
        keywords: ["team", "staff", "who works", "employees", "people"],
        answer: "Our leadership team includes:\n\n• **Douglas Matungamire** – Director / Registered Manager (Founder)\n• **Maria Wilson** – Office Manager (NHS background)\n• **Cedric Dube** – Compliance Officer (15 years legal experience)\n• **Sara Randall** – Registered Manager (35+ years in social care)\n• **Pauline Makazhu** – Registered Manager (Registered Nurse, leads Complex Care)"
    },
    {
        keywords: ["douglas", "director", "founder", "started", "who founded"],
        answer: "**Douglas Matungamire** is our Director and Registered Manager. He founded Homely Health Care in 2016 and has extensive experience across Healthcare, Education, and Insurance."
    },
    {
        keywords: ["about", "company", "who are you", "tell me about", "history", "background"],
        answer: "Homely Health Care was founded in 2016 on the belief that every individual deserves to age with dignity and grace. We bridge the gap between clinical excellence and emotional warmth. Our mission is to create a world where home care is synonymous with sanctuary."
    },
    {
        keywords: ["cqc", "regulated", "registered", "nhs", "framework", "accredit"],
        answer: "Yes, Homely Health Care is **CQC regulated** and **NHS Framework Approved**. We operate to the highest clinical and regulatory standards."
    },
    {
        keywords: ["charity", "rahula", "trust", "donate", "giving back", "social responsibility"],
        answer: "Homely Health Care proudly supports **The Rahula Trust**, dedicating a percentage of our profits to the education of underprivileged children worldwide. Learn more at rahula-trust.org."
    },
    {
        keywords: ["career", "job", "work for", "hiring", "vacanc", "employ", "join", "recruit"],
        answer: "We're always looking for compassionate, dedicated care professionals! Visit our **Careers** page to see current opportunities, or contact us at **info@homelyhealthcare.org.uk** to express your interest."
    },
    {
        keywords: ["cost", "price", "how much", "fee", "afford", "expensive", "pay"],
        answer: "Our care packages are bespoke and tailored to individual needs, so costs vary. Please call us on **0203 916 5797** for a confidential, no-obligation consultation to discuss pricing."
    },
    {
        keywords: ["hours", "available", "when", "open", "time"],
        answer: "Our care services are available **24/7**. Our office team is ready to assist you during business hours, and our care staff provides round-the-clock support."
    },
    {
        keywords: ["value", "mission", "vision", "pillar", "philosophy", "believe", "principle"],
        answer: "Our care is built on three pillars:\n\n💜 **Compassion** – Every action is led by the heart.\n🛡️ **Integrity** – Unwavering commitment to the highest standards.\n👥 **Dignity** – Honouring the person behind the patient."
    },
    {
        keywords: ["vetting", "dbs", "check", "safe", "trust", "background check"],
        answer: "All our staff undergo **rigorous pre-recruitment checks** including full DBS checks, thorough references, and ongoing training. We take the safety of your loved ones very seriously."
    },
    {
        keywords: ["person centred", "person-centred", "personalised", "tailored", "bespoke", "individual"],
        answer: "We believe every individual is unique. All our care plans are **tailored specifically** to your wants, needs, and lifestyle — ensuring maximum comfort and dignity."
    },
    {
        keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "how are you"],
        answer: "Hello! 👋 Welcome to Homely Health Care. I'm here to help you learn about our services. What would you like to know?"
    },
    {
        keywords: ["thank", "thanks", "cheers", "appreciate"],
        answer: "You're welcome! 😊 If you have any other questions, feel free to ask. You can also call us on **0203 916 5797** for a personal consultation."
    },
    {
        keywords: ["bournemouth", "dorset", "croydon", "london", "area", "cover", "region"],
        answer: "Our main office is in **South Croydon, London**. For information about our coverage areas, please call us on **0203 916 5797** and our team will be happy to discuss how we can help."
    },
    {
        keywords: ["sara", "randall"],
        answer: "**Sara Randall** is one of our Registered Managers with over 35 years' experience in the social care industry, having worked for Social Services, the NHS, and care home settings. She is passionate about ensuring our clients receive the best care possible."
    },
    {
        keywords: ["pauline", "makazhu"],
        answer: "**Pauline Makazhu** is a Registered Nurse and CQC Registered Manager who leads our TDDI / Complex Care Team, ensuring individuals with higher clinical needs receive safe, skilled, and responsive support."
    }
];

const FALLBACK = "I'm not sure about that one! 🤔 For specific questions, please call us on **0203 916 5797** or email **info@homelyhealthcare.org.uk** — our friendly team will be happy to help!";

/* ──────────────────────────────────
   JOKES — care-home themed & warm
   ────────────────────────────────── */
const jokes = [
    { setup: "Why did the care home start a band?", punchline: "Because they already had outstanding support staff! 🎸" },
    { setup: "What's a carer's favourite exercise?", punchline: "Running late — and lifting spirits! 💪" },
    { setup: "Why do carers make great friends?", punchline: "Because they always check up on you! 😄" },
    { setup: "What did the carer say at the end of a long shift?", punchline: "\"I've really taken care of business!\" 💼" },
    { setup: "Why did the care home get five stars?", punchline: "Because they gave everyone a warm welcome — and biscuits! 🍪" },
    { setup: "What's a care worker's favourite key on the keyboard?", punchline: "The 'Home' key, of course! 🏠" },
    { setup: "Why do care home residents always win at poker?", punchline: "Because they've got the most experience at the table! ♠️" },
    { setup: "How does a support worker fix a broken heart?", punchline: "With a cup of tea and a good chat! ☕" },
    { setup: "What do you call a carer who also does magic tricks?", punchline: "A carer who makes pain disappear! ✨" },
    { setup: "Why was the care plan always so happy?", punchline: "Because it was person-centred! 😊" },
    { setup: "What's the secret ingredient in care home cooking?", punchline: "A generous serving of love! ❤️" },
    { setup: "Why did the carer bring a ladder to work?", punchline: "To raise the standard of care! 📈" },
    { setup: "What do carers and superheroes have in common?", punchline: "They both save the day — one cup of tea at a time! 🦸‍♀️" },
    { setup: "Why don't carers ever get lost?", punchline: "Because they always follow the care pathway! 🗺️" },
    { setup: "What's a carer's favourite type of music?", punchline: "Soul — because they put theirs into everything! 🎵" },
    { setup: "Why was the medication round always cheerful?", punchline: "Because it came with a smile, every single time! 💊😄" },
    { setup: "What's the best thing about working in care?", punchline: "Every day you make someone's day brighter! ☀️" },
    { setup: "Why did the resident bring a pencil to dinner?", punchline: "In case they wanted to draw dessert! 🎨🍰" },
    { setup: "What did the nurse say to the fidgety patient?", punchline: "\"Don't worry, I'll always be here to support you!\" 🤗" },
    { setup: "Why are care homes the happiest places?", punchline: "Because they're full of people who genuinely care! 💜" }
];

/* ──────────────────────────
   MATCHING LOGIC
   ────────────────────────── */
function findBestAnswer(input: string): string {
    const lower = input.toLowerCase().trim();
    if (lower.length < 2) return FALLBACK;

    let bestScore = 0;
    let bestAnswer = FALLBACK;

    for (const qa of knowledgeBase) {
        let score = 0;
        for (const keyword of qa.keywords) {
            if (lower.includes(keyword.toLowerCase())) {
                // Longer keyword matches = higher relevance
                score += keyword.length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestAnswer = qa.answer;
        }
    }

    // Require a minimum match quality
    return bestScore >= 3 ? bestAnswer : FALLBACK;
}

/* ──────────────────────────
   MARKDOWN-LITE RENDERER
   ────────────────────────── */
function renderMarkdown(text: string) {
    return text.split("\n").map((line, i) => {
        // Bold
        const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
        });
        return (
            <span key={i} className="block">
                {parts}
            </span>
        );
    });
}

/* ──────────────────────────
   CHAT MESSAGE TYPE
   ────────────────────────── */
interface ChatMessage {
    role: "user" | "bot";
    text: string;
}

/* ══════════════════════════
   CHATBOX COMPONENT
   ══════════════════════════ */
export default function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"ai" | "humor">("ai");

    // AI Chat state
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "bot", text: "Hello! 👋 Welcome to Homely Health Care. How can I help you today?\n\nYou can ask me about our **services**, **team**, **contact details**, or anything else about Homely Health Care." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Humor state
    const [currentJoke, setCurrentJoke] = useState<number | null>(null);
    const [showPunchline, setShowPunchline] = useState(false);
    const [usedJokes, setUsedJokes] = useState<number[]>([]);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed || isTyping) return;

        setMessages(prev => [...prev, { role: "user", text: trimmed }]);
        setInput("");
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const answer = findBestAnswer(trimmed);
            setMessages(prev => [...prev, { role: "bot", text: answer }]);
            setIsTyping(false);
        }, 600 + Math.random() * 800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getNextJoke = () => {
        setShowPunchline(false);
        let available = jokes.map((_, i) => i).filter(i => !usedJokes.includes(i));
        if (available.length === 0) {
            setUsedJokes([]);
            available = jokes.map((_, i) => i);
        }
        const nextIdx = available[Math.floor(Math.random() * available.length)];
        setCurrentJoke(nextIdx);
        setUsedJokes(prev => [...prev, nextIdx]);
        // Delay showing punchline for comedic effect
        setTimeout(() => setShowPunchline(true), 2000);
    };

    return (
        <>
            {/* FLOATING BUBBLE */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                style={{
                    background: "linear-gradient(135deg, #5B2A86, #7A4FB3)",
                    boxShadow: "0 6px 24px rgba(91, 42, 134, 0.4)"
                }}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <MessageCircle className="w-5 h-5" />
                )}
            </button>

            {/* CHAT PANEL */}
            <div
                className={`fixed bottom-24 right-6 z-[9998] w-[360px] sm:w-[380px] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                style={{
                    height: "520px",
                    maxHeight: "calc(100vh - 120px)",
                    boxShadow: "0 25px 80px rgba(15, 17, 21, 0.25), 0 0 0 1px rgba(91, 42, 134, 0.08)"
                }}
            >
                {/* HEADER */}
                <div
                    className="px-5 py-4 flex items-center gap-3 shrink-0"
                    style={{ background: "linear-gradient(135deg, #1B1326, #2a1a40)" }}
                >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[#D6B36A]" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-semibold tracking-wide">Homely Assistant</p>
                        <p className="text-white/40 text-[10px] tracking-wider uppercase">
                            {activeTab === "ai" ? "AI Assist" : "Humour Corner"}
                        </p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* TAB BAR */}
                <div className="flex bg-[#F7F5F2] border-b border-black/5 shrink-0">
                    <button
                        onClick={() => setActiveTab("ai")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === "ai"
                                ? "text-[#5B2A86] border-b-2 border-[#5B2A86] bg-white"
                                : "text-[#1B1326]/40 hover:text-[#1B1326]/60"
                            }`}
                    >
                        <Bot className="w-3.5 h-3.5" />
                        AI Assist
                    </button>
                    <button
                        onClick={() => setActiveTab("humor")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === "humor"
                                ? "text-[#5B2A86] border-b-2 border-[#5B2A86] bg-white"
                                : "text-[#1B1326]/40 hover:text-[#1B1326]/60"
                            }`}
                    >
                        <Smile className="w-3.5 h-3.5" />
                        Humour
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    {activeTab === "ai" ? (
                        /* ── AI ASSIST TAB ── */
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${msg.role === "user"
                                                    ? "bg-[#5B2A86] text-white rounded-br-md"
                                                    : "bg-[#F4F2EF] text-[#1B1326] rounded-bl-md"
                                                }`}
                                        >
                                            {renderMarkdown(msg.text)}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#F4F2EF] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                            <span className="w-2 h-2 bg-[#5B2A86]/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-[#5B2A86]/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-[#5B2A86]/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input bar */}
                            <div className="shrink-0 border-t border-black/5 p-3 bg-[#FAFAF8]">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask me anything..."
                                        className="flex-1 bg-white border border-[#5B2A86]/10 rounded-full px-4 py-2.5 text-sm text-[#1B1326] placeholder:text-[#1B1326]/30 focus:outline-none focus:ring-2 focus:ring-[#5B2A86]/20 transition-all"
                                        disabled={isTyping}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isTyping}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 disabled:opacity-30 hover:scale-105"
                                        style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* ── HUMOUR TAB ── */
                        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
                            {currentJoke === null ? (
                                /* Initial state */
                                <div className="space-y-6">
                                    <div className="w-20 h-20 rounded-full bg-[#5B2A86]/5 flex items-center justify-center mx-auto">
                                        <Smile className="w-10 h-10 text-[#5B2A86]/40" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#1B1326] mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                            Need a Laugh?
                                        </h3>
                                        <p className="text-sm text-[#1B1326]/50 font-light leading-relaxed">
                                            Everyone deserves a smile! Tap below for some lighthearted care-themed humour. 😄
                                        </p>
                                    </div>
                                    <button
                                        onClick={getNextJoke}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105"
                                        style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                                    >
                                        <Smile className="w-4 h-4" />
                                        Tell Me a Joke
                                    </button>
                                </div>
                            ) : (
                                /* Joke card */
                                <div className="w-full space-y-6">
                                    <div className="bg-[#F7F5F2] rounded-2xl p-6 border border-[#5B2A86]/5 text-left">
                                        <p className="text-[10px] uppercase tracking-widest text-[#D6B36A] font-bold mb-3">😂 Joke Time</p>
                                        <p className="text-[15px] text-[#1B1326] font-medium leading-relaxed mb-4">
                                            {jokes[currentJoke].setup}
                                        </p>
                                        <div
                                            className={`transition-all duration-500 overflow-hidden ${showPunchline ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className="pt-3 border-t border-[#5B2A86]/10">
                                                <p className="text-[15px] text-[#5B2A86] font-semibold leading-relaxed italic">
                                                    {jokes[currentJoke].punchline}
                                                </p>
                                            </div>
                                        </div>
                                        {!showPunchline && (
                                            <div className="flex items-center gap-2 text-[#1B1326]/30 text-xs mt-1">
                                                <span className="animate-pulse">Wait for it...</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={getNextJoke}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 mx-auto"
                                        style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        Another One!
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER BRANDING */}
                <div className="shrink-0 bg-[#FAFAF8] border-t border-black/5 py-2 text-center">
                    <p className="text-[9px] uppercase tracking-widest text-[#1B1326]/25 font-bold">
                        Homely Health Care • 24/7 Support
                    </p>
                </div>
            </div>
        </>
    );
}
