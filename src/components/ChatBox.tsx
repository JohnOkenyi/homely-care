"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Bot, Smile, Send, RefreshCw, Wind } from "lucide-react";
import CalmCorner from "./chat/CalmCorner";

/* ══════════════════════════════════════════════
   KNOWLEDGE BASE — sourced from website + research
   ══════════════════════════════════════════════ */
interface QA {
    keywords: string[];
    answer: string;
}

const knowledgeBase: QA[] = [
    // ── GENERAL ──
    {
        keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "how are you"],
        answer: "Hello! 👋 Welcome to Homely Health Care. I'm here to help you learn about our services. What would you like to know?"
    },
    {
        keywords: ["thank", "thanks", "cheers", "appreciate", "ta"],
        answer: "You're welcome! 😊 If you have any other questions, feel free to ask. You can also call us on **01202 948898** for a personal consultation."
    },
    {
        keywords: ["bye", "goodbye", "see you", "later", "take care"],
        answer: "Thank you for chatting with us! 💜 Take care, and don't hesitate to reach out anytime. Call **01202 948898** or email **info@homelyhealth.uk**."
    },

    // ── ABOUT THE COMPANY ──
    {
        keywords: ["about", "company", "who are you", "tell me about", "history", "background", "what is homely"],
        answer: "**Homely Health Care** was founded in 2016 by Douglas Matungamire. We are an innovative provider of support and personal care, dedicated to creating an atmosphere that enables and encourages you to lead a full and independent life.\n\nOur mission is to bridge the gap between clinical excellence and emotional warmth — making home care synonymous with sanctuary."
    },
    {
        keywords: ["founded", "started", "established", "when", "year", "2016", "how long"],
        answer: "Homely Health Care was **founded in 2016** by Douglas Matungamire. That gives us nearly a decade of experience providing outstanding care services."
    },
    {
        keywords: ["value", "mission", "vision", "pillar", "philosophy", "believe", "principle", "promise"],
        answer: "Our care is built on three pillars:\n\n💜 **Compassion** – Every action is led by the heart, ensuring emotional security alongside physical wellbeing.\n🛡️ **Integrity** – Unwavering commitment to honesty, transparency and the highest clinical standards.\n👥 **Dignity** – Honouring the person behind the patient, respecting their history, choices, and autonomy."
    },
    {
        keywords: ["why choose", "why homely", "what makes you different", "special", "unique", "advantage"],
        answer: "People choose Homely Health Care because:\n\n✅ **Person-centred care** – Every plan is tailored to your unique needs\n✅ **Rigorous vetting** – All staff are thoroughly referenced, DBS checked, and highly trained\n✅ **Expert management** – Field Care Managers visit regularly to ensure your care is always aligned with your needs\n✅ **CQC rated 'Good'** – Independently inspected and approved\n✅ **Social responsibility** – We donate to The Rahula Trust and The Regiment Support Service"
    },

    // ── SERVICES OVERVIEW ──
    {
        keywords: ["service", "offer", "provide", "what do you do", "care type", "types of care", "care options"],
        answer: "We offer five core services:\n\n🏠 **Home Care** – Domiciliary support to help you stay independent at home\n🤝 **Live-in Care** – 24/7 companionship and support in your own home\n🌍 **Supported Living** – Empowering adults with learning disabilities, autism, or mental health needs\n🏥 **TDDI / Complex Care** – Nurse-led clinical support for complex health conditions\n🏢 **Residential & Nursing Home Support** – Professional staffing solutions for care homes"
    },

    // ── HOME CARE ──
    {
        keywords: ["home care", "domiciliary", "daily living", "stay at home"],
        answer: "Our **Home Care** (domiciliary care) service helps you receive support while maintaining independence at home. We provide:\n\n• Personalised care based on individual assessment\n• Assistance with daily living activities\n• Medicine administration\n• Domestic & nutritional support\n• Sleep-in or waking night services\n\nVisits can be as little as a few hours a day, with one or more visits throughout the day, 7 days a week. Our Field Care Managers conduct comprehensive home assessments to create your personalised care plan."
    },
    {
        keywords: ["visit", "how often", "frequency", "schedule", "how many times"],
        answer: "Our home care visits are completely **flexible**. They can be as little as a few hours a day, and we can arrange one or more visits throughout the day, **7 days a week**. We also offer **sleep-in or waking night** services for overnight security. Call **01202 948898** to discuss your specific needs."
    },
    {
        keywords: ["night", "sleep", "overnight", "waking night", "sleep in"],
        answer: "Yes! We offer both **sleep-in** and **waking night** services. If you'd like the security of having someone staying with you overnight, we can arrange this as part of your home care package. Call **01202 948898** to discuss."
    },

    // ── LIVE-IN CARE ──
    {
        keywords: ["live-in", "live in", "24/7", "round the clock", "full time", "companionship"],
        answer: "Our **Live-in and Companionship Care** provides round-the-clock support for those who prefer to remain at home. Your dedicated live-in carer provides:\n\n• Companionship and emotional support\n• Help with everyday tasks\n• Medicine administration\n• Personal care with dignity\n• Domestic duties, cooking & shopping\n• Accompanied visits to appointments and social activities\n\nWe carefully match you with a **like-minded carer** based on your personality, hobbies, and preferences."
    },
    {
        keywords: ["match", "matching", "compatible", "carer selection", "choose carer"],
        answer: "We take **carer matching** very seriously. Our Field Care Managers assess your likes, dislikes, hobbies, activities, and personal attributes, then match you with a **like-minded carer** to ensure a positive relationship. It's not just about skills — it's about compatibility! 💜"
    },

    // ── SUPPORTED LIVING ──
    {
        keywords: ["supported living", "learning disabilit", "autism", "independent living", "mental health"],
        answer: "Our **Supported Living** service empowers individuals aged 18+ with diverse needs including:\n\n• Learning disabilities (mild, moderate, or severe)\n• Autism\n• Sensory impairment\n• Physical disabilities\n• Acquired brain injury\n• Mental health challenges\n• Behavioural challenges\n\nWe provide tailored support from a few hours a day to full-time support, helping people live as independently as possible within their own homes and communities."
    },
    {
        keywords: ["disability", "disabilit", "brain injury", "sensory", "impairment"],
        answer: "We provide expert tailored support for people aged **18 or over** with mild, moderate, or severe disabilities, including **autism**, **sensory impairment**, **physical disabilities**, **acquired brain injury**, associated mental health needs, and behavioural challenges. Call **01202 948898** for a consultation."
    },

    // ── COMPLEX CARE / TDDI ──
    {
        keywords: ["complex care", "nurse", "clinical", "neurological", "rehabilitation", "tddi", "disease", "disorder", "injury"],
        answer: "Our **TDDI / Complex Care** service supports people to manage, improve, or recover from diagnosed health conditions. Led by qualified nurses, we provide:\n\n• Nurse-led clinical interventions\n• Neurological condition support\n• Post-injury rehabilitation\n• Feeding tube management\n• Multidisciplinary coordination\n\nTDDI stands for **Treatment of Disease, Disorder or Injury** — a safe, skilled, person-centred approach that promotes wellbeing, prevents deterioration, and helps people stay as independent and comfortable as possible."
    },
    {
        keywords: ["feeding tube", "peg", "clinical intervention"],
        answer: "Yes, our TDDI / Complex Care team is trained to manage **feeding tubes** and other clinical interventions. Our nurse-led team works closely with healthcare professionals and families to deliver safe, consistent care. Contact us on **01202 948898** for more details."
    },

    // ── RESIDENTIAL & NURSING HOME SUPPORT ──
    {
        keywords: ["residential", "nursing home", "care home staffing", "staff cover", "staffing solution"],
        answer: "Our **Residential & Nursing Home Support** service provides reliable, professional staff to care homes. We offer:\n\n• Short-term and long-term staff cover\n• Flexible staffing from a few shifts a week to continuous daily support\n• Single or multiple staff placements\n• **No additional fee for last-minute cover** (unlike many agencies!)\n\nWe support residential and care homes looking after vulnerable children and adults with various health and social care needs."
    },
    {
        keywords: ["last minute", "urgent", "emergency cover", "agency", "sickness cover"],
        answer: "Unlike some agencies, we **do not charge an additional fee for last-minute cover**. We understand staffing needs can be urgent due to sickness or other absences, and we pride ourselves on providing the staff you need, **when you need them**. Call **01202 948898**."
    },

    // ── CONTACT INFO ──
    {
        keywords: ["phone", "call", "telephone", "number", "ring"],
        answer: "You can call us on **01202 948898**. We're available 24/7 to discuss your care needs."
    },
    {
        keywords: ["email", "mail", "write to"],
        answer: "You can email us at **info@homelyhealth.uk**. We aim to respond to all enquiries promptly."
    },
    {
        keywords: ["address", "location", "where", "visit", "office", "find you", "based"],
        answer: "Our office is located at:\n\n📍 **Suite 6A, Wessex House, St. Leonards Road, Charminster, Bournemouth, Dorset, BH8 8QS, UK**\n\nFeel free to visit us or contact us to arrange a meeting."
    },
    {
        keywords: ["contact", "get in touch", "reach", "enquir", "speak to"],
        answer: "You can reach us by:\n\n📞 **Phone:** 01202 948898\n📧 **Email:** info@homelyhealth.uk\n📍 **Address:** Suite 6A, Wessex House, St. Leonards Road, Charminster, Bournemouth, Dorset, BH8 8QS, UK\n\nOr visit our Contact Us page to submit an enquiry form."
    },
    {
        keywords: ["hours", "available", "when", "open", "time", "24/7"],
        answer: "Our care services are available **24/7, 365 days a year**. Our office team is ready to assist you during business hours, and our care staff provides round-the-clock support whenever it's needed."
    },

    // ── TEAM ──
    {
        keywords: ["team", "staff", "who works", "employees", "people", "management", "members"],
        answer: "Our leadership team includes:\n\n👤 **Douglas Matungamire** – Director & Registered Manager\n👤 **Maria Wilson** – Operations Manager\n👤 **Cedric Dube** – Compliance Officer\n👤 **Sara Randall** – Registered Manager\n👤 **Pauline Makazhu** – Registered Manager\n\nYou can read more about their specific experience and roles on our **Meet the Team** page!"
    },
    {
        keywords: ["douglas", "matungamire", "director", "founder", "who founded"],
        answer: "**Douglas Matungamire**, Director / Registered Manager\n\nDouglas started Homely Health Care in 2016. He has extensive experience across Healthcare, Education and Insurance as an internal auditor, as well as hands-on care work as a Support Worker / Carer with adults and children with various social care needs."
    },
    {
        keywords: ["maria", "wilson", "office manager"],
        answer: "**Maria Wilson**, Operations Manager\n\nHaving previously worked in general management within the NHS in London and Southampton, Maria joined Homely Health Care in 2022. Her diverse role includes recruitment, HR, client liaison, staff management and accounts."
    },
    {
        keywords: ["cedric", "dube", "compliance"],
        answer: "**Cedric Dube**, Compliance Officer\n\nCedric has 15 years' experience in the legal and compliance field. He ensures that all processes adhere to legal and regulatory requirements, fostering a culture of integrity across the organisation."
    },
    {
        keywords: ["sara", "randall"],
        answer: "**Sara Randall**, Registered Manager\n\nSara has over 35 years' experience in the social care industry, working for Social Services, the NHS and in care home settings. She is passionate about ensuring clients receive the best care and all staff are trained to the highest standards to ensure this."
    },
    {
        keywords: ["pauline", "makazhu"],
        answer: "**Pauline Makazhu**, Registered Manager\n\nA compassionate Registered Nurse and CQC Registered Manager, Pauline leads the TDDI / Complex Care Team, ensuring individuals with higher clinical needs receive safe, skilled and responsive support."
    },

    // ── FIELD CARE MANAGERS ──
    {
        keywords: ["field care", "assessment", "care plan", "care planning"],
        answer: "Our **Field Care Managers** are highly experienced and compassionate professionals who:\n\n• Visit you and your family at home\n• Conduct a comprehensive assessment of your needs\n• Learn about your likes, dislikes, hobbies, and preferences\n• Create a **personalised care plan** with your agreement\n• Visit regularly to ensure care stays aligned with your needs\n\nThis ensures your care is always person-centred and up to date."
    },

    // ── CQC & QUALITY ──
    {
        keywords: ["cqc", "regulated", "registered", "nhs", "framework", "accredit", "inspection", "rating", "good"],
        answer: "Homely Health Care is **CQC regulated**. We were rated **'Good'** by CQC in our very first inspection and are striving to improve this to **'Excellent'** when we are next inspected! We are also **NHS Framework Approved**.\n\nWe operate to the highest care and regulatory standards to give you complete peace of mind."
    },
    {
        keywords: ["quality", "standard", "training", "qualified", "professional"],
        answer: "Quality is at the heart of everything we do:\n\n✅ All staff are **thoroughly referenced and DBS checked**\n✅ Comprehensive ongoing training programmes\n✅ Regular supervision and spot checks\n✅ **CQC 'Good' rating** (inspected Nov 2022)\n✅ **NHS Framework Approved**\n✅ Field Care Managers conduct regular visits to review care"
    },

    // ── SAFETY & VETTING ──
    {
        keywords: ["vetting", "dbs", "check", "safe", "trust", "background check", "recruit"],
        answer: "We take safety extremely seriously. Our rigorous recruitment process includes:\n\n🔍 **Full DBS checks** for all staff\n📋 **Thorough referencing** and background verification\n🎓 **Comprehensive training** to the highest standards\n👁️ **Regular check-ins** with both staff and clients\n📊 **Ongoing supervision** and performance reviews\n\nWe don't just look for skilled staff — we look for people with genuine compassion and emotional intelligence."
    },

    // ── CHARITY ──
    {
        keywords: ["charity", "rahula", "trust", "donate", "giving back", "social responsibility", "children", "education"],
        answer: "Homely Health Care proudly supports **The Rahula Trust** and **The Regiment Support Service**, dedicating a percentage of our profits to these causes. This reflects our belief that premium care should extend beyond our immediate community."
    },

    // ── CAREERS ──
    {
        keywords: ["career", "job", "work for", "hiring", "vacanc", "employ", "join", "recruit", "apply"],
        answer: "We're always looking for compassionate, dedicated care professionals! We offer roles for:\n\n• Carers & Support Workers\n• Registered Nurses\n• Office & Administrative Staff\n\nWe invest heavily in **training and development**, and all staff undergo comprehensive induction. Visit our **Careers** page or email **info@homelyhealth.uk** to express your interest."
    },
    {
        keywords: ["training", "development", "learn", "induction", "qualification"],
        answer: "We invest heavily in our team's training. All staff undergo:\n\n📚 Comprehensive induction programme\n🎓 Ongoing clinical training\n🏆 Regular skills development\n👁️ Supervision and performance reviews\n\nWe're committed to keeping our team at the absolute peak of their profession."
    },

    // ── COST & PRICING ──
    {
        keywords: ["cost", "price", "how much", "fee", "afford", "expensive", "pay", "fund", "budget"],
        answer: "Our care packages are **bespoke and tailored** to individual needs, so costs vary depending on the type and level of care required. We're happy to discuss pricing in a confidential, no-obligation consultation.\n\n📞 Call **01202 948898** to get a personalised quote."
    },
    {
        keywords: ["fund", "council", "local authority", "social services", "nhs fund", "pay for care"],
        answer: "Care can be funded through various routes including **local authority funding**, **NHS Continuing Healthcare**, **personal budgets**, or **private payment**. To discuss your funding options, please call us on **01202 948898** — our team can guide you through the process."
    },

    // ── LOCATION & COVERAGE ──
    {
        keywords: ["bournemouth", "dorset", "croydon", "london", "area", "cover", "region", "south"],
        answer: "Our main office is in **Bournemouth, Dorset** (Suite 6A, Wessex House, St. Leonards Road, Charminster, BH8 8QS). We provide care across multiple regions. For information about our full coverage areas near you, please call **01202 948898**."
    },

    // ── PERSON-CENTRED CARE ──
    {
        keywords: ["person centred", "person-centred", "personalised", "tailored", "bespoke", "individual", "unique"],
        answer: "**Person-centred care** is at the core of everything we do. We believe every individual is unique, so every care plan is tailored specifically to your wants, needs, and lifestyle. Our Field Care Managers work closely with you and your family to ensure your care reflects **your** choices and preferences — always maintaining maximum comfort and dignity."
    },

    // ── HOSPITAL DISCHARGE ──
    {
        keywords: ["hospital", "discharge", "recovery", "after hospital", "post hospital"],
        answer: "We provide care following **hospital discharge** to support your recovery and help you regain independence. This can be short-term or long-term depending on your needs. Our home care service ensures you have the support you need to recover comfortably at home. Call **01202 948898** to arrange."
    },

    // ── WEBSITE & ONLINE ──
    {
        keywords: ["website", "web", "online", "internet", "url"],
        answer: "You can find us online at **www.homelyhealth.uk** (original website) and this new site you're browsing now! Both have information about our services, team, and how to get in touch."
    },

    // ── CATCH-ALL CONVERSATIONAL ──
    {
        keywords: ["help", "assist", "support me", "i need", "looking for"],
        answer: "I'd love to help! You can ask me about:\n\n• Our **services** (Home Care, Live-in Care, Supported Living, Complex Care)\n• Our **team** and their experience\n• **Contact details** and office location\n• **CQC rating** and quality standards\n• **Careers** and job opportunities\n• **The Rahula Trust** charity\n\nOr simply call us on **01202 948898** for a personal chat!"
    },
    {
        keywords: ["what can you do", "what can i ask", "how do you work", "what do you know"],
        answer: "I'm Homely Health Care's virtual assistant! I can answer questions about:\n\n🏥 Our care services (Home Care, Live-in, Supported Living, Complex Care)\n👥 Our team members\n📞 Contact information\n⭐ CQC rating and quality\n💼 Career opportunities\n💜 Our charity work\n💷 Pricing and funding\n\nJust type your question and I'll do my best to help!"
    }
];

const FALLBACK = "I'm not sure about that one! 🤔 For specific questions, please call us on **01202 948898** or email **info@homelyhealth.uk** — our friendly team will be happy to help!";

/* ═══════════════════════════════════════════════
   JOKES — categorised by theme, warm & lighthearted
   ═══════════════════════════════════════════════ */
interface Joke {
    setup: string;
    punchline: string;
    category: string;
}

const jokes: Joke[] = [
    // ── NURSE JOKES ──
    { setup: "Why do nurses always carry red pens?", punchline: "In case they need to draw blood! 🩸😄", category: "Nurses" },
    { setup: "What did the nurse say to the doctor who walked past the medicine cabinet?", punchline: "\"You missed your dose of charm today!\" 💊", category: "Nurses" },
    { setup: "Why are nurses always calm?", punchline: "Because they know how to keep their patients! 😌", category: "Nurses" },
    { setup: "What's a nurse's favourite type of footwear?", punchline: "Comfortable ones — they've got 12 hours of TLC to deliver! 👟", category: "Nurses" },
    { setup: "Why did the nurse keep telling jokes?", punchline: "Because laughter is the best medicine — and it's free! 😂", category: "Nurses" },
    { setup: "How do nurses stay cool under pressure?", punchline: "They have lots of fans — their patients! 💨", category: "Nurses" },
    { setup: "What did the patient say to the nurse?", punchline: "\"You make my heart monitor race!\" 💓", category: "Nurses" },
    { setup: "Why don't nurses ever take shortcuts?", punchline: "Because they follow the proper care pathway — always! 🗺️", category: "Nurses" },
    { setup: "What did the banana say to the nurse?", punchline: "I'm here to see the doctor. I am not peeling well.", category: "Nurses" },
    { setup: "How do you know when a nurse is having a bad day?", punchline: "She won’t stop needling people!", category: "Nurses" },
    { setup: "What did the nurse say to the man who fainted at the airport terminal?", punchline: "I think you might have a terminal illness.", category: "Nurses" },
    { setup: "Why didn’t one nurse find the other nurse’s joke funny?", punchline: "She had an irony deficiency.", category: "Nurses" },
    { setup: "Why did the robot ask the nurse to call the doctor immediately?", punchline: "Because it had a virus! 🦠", category: "Nurses" },
    { setup: "What is it called when a hospital runs out of maternity nurses?", punchline: "A mid-wife crisis.", category: "Nurses" },
    { setup: "Never upset a pediatric nurse.", punchline: "They have very little patients.", category: "Nurses" },

    // ── HOSPITAL JOKES ──
    { setup: "Why did the doctor carry a red pen to the hospital?", punchline: "In case they needed to draw blood — wait, that's the nurse's job! 🩺", category: "Hospital" },
    { setup: "What did the hospital say to the patient?", punchline: "\"I've got you covered — 24/7!\" 🏥", category: "Hospital" },
    { setup: "Why did the thermometer go to school?", punchline: "Because it wanted more degrees! 🌡️📚", category: "Hospital" },
    { setup: "Why don't hospitals ever get lonely?", punchline: "Because they always have patience (patients)! 🏥", category: "Hospital" },
    { setup: "What did one bandage say to the other?", punchline: "\"I've got you covered, mate!\" 🩹", category: "Hospital" },
    { setup: "Organ coordinator: Here’s our list of donor lungs, hearts and kidneys in alphabetical order.", punchline: "Transplant surgeon: Impressive! It’s very organ-ized.", category: "Hospital" },
    { setup: "When you get a bladder infection...", punchline: "Ur-ine trouble.", category: "Hospital" },
    { setup: "Recent studies show patients who have a cold feel better on Saturdays and Sundays.", punchline: "Evidence points to a weekend immune system.", category: "Hospital" },
    { setup: "A man was wheeled into the operating room...", punchline: "But at the last minute, he had a change of heart.", category: "Hospital" },
    { setup: "I tried to play hide-and-seek when I was in the hospital...", punchline: "But the security kept finding me in the ICU.", category: "Hospital" },
    { setup: "I went to the library to get a medical book on abdominal pain.", punchline: "Somebody had ripped the appendix out.", category: "Hospital" },
    { setup: "I once heard a joke about amnesia...", punchline: "But I forgot how it goes.", category: "Hospital" },
    { setup: "Dogs can’t operate an MRI machine...", punchline: "But CAT-scan! 🐱", category: "Hospital" },
    { setup: "If you steal someone's heart...", punchline: "Do you get cardiac arrested?", category: "Hospital" },
    { setup: "I just had a successful liver transplant operation.", punchline: "That surgeon really de-livered!", category: "Hospital" },
    { setup: "Why do your heart, liver, and lungs all fit in your body?", punchline: "Because they are well organized.", category: "Hospital" },
    { setup: "The doctor told a patient, 'You have acute appendicitis.'", punchline: "The patient replied, 'Is that better than an ugly one?'", category: "Hospital" },
    { setup: "I've got this awful disease where I can't stop telling airport puns.", punchline: "The doctor says it's terminal.", category: "Hospital" },
    { setup: "Why did they take paracetamol to prison?", punchline: "Because it’s a pain killer.", category: "Hospital" },
    { setup: "A patient said to the doctor, 'I keep dreaming my eyes change color.'", punchline: "The doctor says 'It's just a pigment of your imagination.'", category: "Hospital" },
    { setup: "For years I was against organ transplants.", punchline: "Then I had a change of heart.", category: "Hospital" },
    { setup: "I woke up this morning coughing badly, think I may have pneumonoultramicroscopicsilicovolcanoconiosis...", punchline: "But it’s hard to say.", category: "Hospital" },
    { setup: "When the lung fell in love...", punchline: "It took its breath away.", category: "Hospital" },
    { setup: "Bad medical puns...", punchline: "Are hard to stomach.", category: "Hospital" },
    { setup: "An organ’s favorite boat...", punchline: "Is a blood vessel.", category: "Hospital" },
    { setup: "Dentists always get to the root of the problem.", punchline: "They really know their drill!", category: "Hospital" },

    // ── CARE HOME JOKES ──
    { setup: "Why did the care home start a band?", punchline: "Because they already had outstanding support staff! 🎸", category: "Care Home" },
    { setup: "Why did the care home get five stars?", punchline: "Because they gave everyone a warm welcome — and biscuits! 🍪⭐", category: "Care Home" },
    { setup: "What's the secret ingredient in care home cooking?", punchline: "A generous serving of love! ❤️🍳", category: "Care Home" },
    { setup: "Why are care homes the happiest places?", punchline: "Because they're full of people who genuinely care! 💜", category: "Care Home" },
    { setup: "What do you call a care home with great Wi-Fi?", punchline: "Well-connected! 📱😄", category: "Care Home" },
    { setup: "Why did the resident bring a pencil to dinner?", punchline: "In case they wanted to draw dessert! 🎨🍰", category: "Care Home" },
    { setup: "What did the care home manager say at the awards?", punchline: "\"I'd like to thank our amazing team — they truly care!\" 🏆", category: "Care Home" },
    { setup: "Why is bingo night the highlight at the care home?", punchline: "Because it's the only time everyone shouts at the staff and it's okay! 🎯😂", category: "Care Home" },

    // ── LIVE-IN CARE JOKES ──
    { setup: "Why did the live-in carer bring a suitcase full of tea?", punchline: "Because a good cuppa solves everything — and they need 24 hours' worth! ☕", category: "Live-in Care" },
    { setup: "What's the best thing about having a live-in carer?", punchline: "Someone who actually laughs at your jokes every day! 😂", category: "Live-in Care" },
    { setup: "Why did the live-in carer become a great chef?", punchline: "Because when you cook three meals a day with love, you're practically Michelin-starred! 👨‍🍳", category: "Live-in Care" },
    { setup: "What did the live-in carer say about their commute?", punchline: "\"It's about 30 seconds — from my room to the kitchen!\" 🚶", category: "Live-in Care" },
    { setup: "Why are live-in carers great at Scrabble?", punchline: "They've had lots of practice with daily companionship — and long evenings! 🎲", category: "Live-in Care" },

    // ── SUPPORTED LIVING JOKES ──
    { setup: "Why did the supported living team throw a party?", punchline: "Because every milestone deserves a celebration — no matter how small! 🎉", category: "Supported Living" },
    { setup: "What's a support worker's favourite game?", punchline: "Life — they help people win at it every day! 🎮", category: "Supported Living" },
    { setup: "Why are supported living staff great navigators?", punchline: "They always help people find their way to independence! 🧭", category: "Supported Living" },
    { setup: "What did the support worker say on Monday morning?", punchline: "\"Another week, another chance to make a difference!\" 🌟", category: "Supported Living" },
    { setup: "Why do supported living residents love cooking classes?", punchline: "Because independence starts in the kitchen — and ends with cake! 🍰", category: "Supported Living" },

    // ── COMPLEX CARE JOKES ──
    { setup: "Why do complex care nurses always carry notebooks?", punchline: "Because their care plans are more detailed than a novel! 📔", category: "Complex Care" },
    { setup: "What did the complex care nurse say after a perfect shift?", punchline: "\"Nailed it — care plan, clinical skills, AND a cup of tea!\" ☕👩‍⚕️", category: "Complex Care" },
    { setup: "Why is the complex care team like a Swiss watch?", punchline: "Because precision, coordination, and care are in every movement! ⌚", category: "Complex Care" },
    { setup: "What's the complex care team's motto?", punchline: "\"No condition too complex, no challenge too great — we've got you!\" 💪", category: "Complex Care" },

    // ── STAFF & CARER JOKES ──
    { setup: "What's a carer's favourite exercise?", punchline: "Running late — and lifting spirits! 💪😄", category: "Staff" },
    { setup: "Why do carers make great friends?", punchline: "Because they always check up on you! 🤗", category: "Staff" },
    { setup: "What did the carer say at the end of a long shift?", punchline: "\"I've really taken care of business!\" 💼", category: "Staff" },
    { setup: "Never lie to an X-ray technician.", punchline: "They can see right through you.", category: "Staff" },
    { setup: "What's a care worker's favourite key on the keyboard?", punchline: "The 'Home' key, of course! 🏠⌨️", category: "Staff" },
    { setup: "How does a support worker fix a broken heart?", punchline: "With a cup of tea and a good chat! ☕💜", category: "Staff" },
    { setup: "What do you call a carer who also does magic tricks?", punchline: "A care-dician — they make worries disappear! ✨", category: "Staff" },
    { setup: "Why was the care plan always so happy?", punchline: "Because it was person-centred! 😊", category: "Staff" },
    { setup: "Why did the carer bring a ladder to work?", punchline: "To raise the standard of care! 📈", category: "Staff" },
    { setup: "What do carers and superheroes have in common?", punchline: "They both save the day — one cup of tea at a time! 🦸‍♀️☕", category: "Staff" },
    { setup: "Why don't carers ever get lost?", punchline: "Because they always follow the care pathway! 🗺️", category: "Staff" },
    { setup: "What's a carer's favourite type of music?", punchline: "Soul — because they put theirs into everything! 🎵", category: "Staff" },
    { setup: "Why was the medication round always cheerful?", punchline: "Because it came with a smile, every single time! 💊😄", category: "Staff" },
    { setup: "What's the best thing about working in care?", punchline: "Every day you make someone's day brighter! ☀️", category: "Staff" },
    { setup: "Why did the carer start writing poetry?", punchline: "Because they already had the heart for it! ❤️🖊️", category: "Staff" },
    { setup: "What did the new carer say on their first day?", punchline: "\"I came for the job, but I stayed for the hugs!\" 🤗", category: "Staff" },
    { setup: "Why are carers great at cards?", punchline: "Because they always play with a full deck of compassion! 🃏", category: "Staff" },
    { setup: "What did the carer say to the grumpy patient?", punchline: "\"Don't worry — I'll grow on you, just like a good cup of tea!\" ☕😊", category: "Staff" },
    { setup: "Why do Field Care Managers love their job?", punchline: "Because they get to visit the most wonderful people every day! 🚗💜", category: "Staff" },
    { setup: "What did the DBS check say to the carer?", punchline: "\"You're clear for greatness!\" ✅🌟", category: "Staff" }
];

const jokeCategories = ["All", ...Array.from(new Set(jokes.map(j => j.category)))];

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
                score += keyword.length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestAnswer = qa.answer;
        }
    }

    return bestScore >= 3 ? bestAnswer : FALLBACK;
}

/* ──────────────────────────
   MARKDOWN-LITE RENDERER
   ────────────────────────── */
function renderMarkdown(text: string) {
    return text.split("\n").map((line, i) => {
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
    const [activeTab, setActiveTab] = useState<"ai" | "humor" | "calm">("ai");

    // AI Chat state
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "bot", text: "Hello! 👋 Welcome to Homely Health Care. How can I help you today?\n\nYou can ask me about our **services**, **team**, **contact details**, **CQC rating**, **careers**, or anything else about Homely Health Care." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Humor state
    const [currentJoke, setCurrentJoke] = useState<number | null>(null);
    const [showPunchline, setShowPunchline] = useState(false);
    const [usedJokes, setUsedJokes] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Interaction tracking for "Try Me" popups
    const [hasVisitedHumor, setHasVisitedHumor] = useState(false);
    const [hasVisitedCalm, setHasVisitedCalm] = useState(false);

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

    const filteredJokes = selectedCategory === "All" ? jokes : jokes.filter(j => j.category === selectedCategory);

    const getNextJoke = () => {
        setShowPunchline(false);
        const pool = filteredJokes;
        const poolIndices = pool.map((_, i) => jokes.indexOf(pool[i]));
        let available = poolIndices.filter(i => !usedJokes.includes(i));
        if (available.length === 0) {
            setUsedJokes([]);
            available = poolIndices;
        }
        const nextIdx = available[Math.floor(Math.random() * available.length)];
        setCurrentJoke(nextIdx);
        setUsedJokes(prev => [...prev, nextIdx]);
        setTimeout(() => setShowPunchline(true), 2000);
    };

    return (
        <>
            {/* FLOATING BUBBLE */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                style={{
                    background: "linear-gradient(135deg, #5B2A86, #7A4FB3)",
                    boxShadow: "0 6px 24px rgba(91, 42, 134, 0.4)"
                }}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
            </button>

            {/* CHAT PANEL — full-screen on mobile, floating card on desktop */}
            <div
                className={`fixed z-[9998] overflow-hidden flex flex-col transition-all duration-500
                    bottom-4 right-4 
                    w-[calc(100%-32px)] 
                    h-[clamp(520px,70vh,720px)] 
                    max-h-[85vh] 
                    max-w-[420px]
                    rounded-3xl
                    sm:bottom-6 sm:right-6 
                    sm:w-[clamp(320px,28vw,420px)]
                    sm:h-[clamp(650px,80vh,880px)]
                    sm:max-h-[92vh]
                    max-sm:max-w-[92vw] max-sm:h-[75vh] max-sm:rounded-2xl
                    ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
                style={{
                    boxShadow: "0 25px 80px rgba(15, 17, 21, 0.25), 0 0 0 1px rgba(91, 42, 134, 0.08)"
                }}
            >
                {/* HEADER */}
                <div className="px-5 py-4 flex items-center gap-3 shrink-0" style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}>
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
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeTab === "ai" ? "text-[#5B2A86] border-b-2 border-[#5B2A86] bg-white" : "text-[#1B1326]/40 hover:text-[#1B1326]/60"
                            }`}
                    >
                        <Bot className="w-3.5 h-3.5" />
                        AI Assist
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("humor");
                            setHasVisitedHumor(true);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 relative group ${activeTab === "humor"
                            ? "text-[#5B2A86] border-b-2 border-[#5B2A86] bg-white"
                            : "text-[#1B1326]/80 hover:text-[#1B1326] hover:bg-black/[0.02]"
                            }`}
                    >
                        <div className="relative">
                            <motion.div
                                animate={activeTab !== "humor" && !hasVisitedHumor ? {
                                    x: [0, -2, 2, -2, 2, 0],
                                    rotate: [0, -5, 5, -5, 5, 0],
                                } : {}}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut"
                                }}
                            >
                                <Smile className={`w-3.5 h-3.5 ${activeTab !== "humor" && !hasVisitedHumor ? "text-[#D6B36A] filter drop-shadow-[0_0_8px_rgba(214,179,106,0.5)]" : ""}`} />
                            </motion.div>
                            {activeTab !== "humor" && !hasVisitedHumor && (
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6B36A] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6B36A]"></span>
                                </span>
                            )}
                        </div>
                        Humour
                        {activeTab === "ai" && !hasVisitedHumor && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    scale: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D6B36A] text-[#1B1326] text-[8px] px-2 py-0.5 rounded-full font-black tracking-tighter shadow-md border border-[#1B1326]/10 shadow-[0_4px_12px_rgba(214,179,106,0.4)]"
                            >
                                TRY ME!
                            </motion.div>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("calm");
                            setHasVisitedCalm(true);
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 relative group ${activeTab === "calm" ? "text-[#5B2A86] border-b-2 border-[#5B2A86] bg-white" : "text-[#1B1326]/40 hover:text-[#1B1326]/60"
                            }`}
                    >
                        <div className="relative">
                            <motion.div
                                animate={hasVisitedHumor && !hasVisitedCalm && activeTab !== "calm" ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 10, -10, 10, 0]
                                } : {}}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatDelay: 1.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <Wind className={`w-3.5 h-3.5 ${hasVisitedHumor && !hasVisitedCalm && activeTab !== "calm" ? "text-[#D6B36A] filter drop-shadow-[0_0_8px_rgba(214,179,106,0.5)]" : ""}`} />
                            </motion.div>
                            {hasVisitedHumor && !hasVisitedCalm && activeTab !== "calm" && (
                                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6B36A] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6B36A]"></span>
                                </span>
                            )}
                        </div>
                        Calm Corner
                        {hasVisitedHumor && !hasVisitedCalm && activeTab !== "calm" && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    scale: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D6B36A] text-[#1B1326] text-[8px] px-2 py-0.5 rounded-full font-black tracking-tighter shadow-md border border-[#1B1326]/10 shadow-[0_4px_12px_rgba(214,179,106,0.4)]"
                            >
                                TRY ME!
                            </motion.div>
                        )}
                    </button>
                </div>

                {/* BODY */}
                <div className="flex-1 flex flex-col bg-white overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: "thin" }}>
                    {activeTab === "ai" ? (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
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
                                        className="flex-1 bg-white border border-[#5B2A86]/10 rounded-full px-4 py-2.5 text-[16px] sm:text-sm text-[#1B1326] placeholder:text-[#1B1326]/30 focus:outline-none focus:ring-2 focus:ring-[#5B2A86]/20 transition-all"
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
                    ) : activeTab === "humor" ? (
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Category pills */}
                            <div className="shrink-0 px-4 pt-3 pb-2 overflow-x-auto flex gap-2" style={{ scrollbarWidth: "none" }}>
                                {jokeCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setCurrentJoke(null); setUsedJokes([]); }}
                                        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-200 ${selectedCategory === cat
                                            ? "bg-[#5B2A86] text-white"
                                            : "bg-[#F4F2EF] text-[#1B1326]/40 hover:text-[#1B1326]/60"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Joke display area */}
                            <div className="flex-1 flex flex-col items-center justify-center px-5 py-4 text-center">
                                {currentJoke === null ? (
                                    <div className="space-y-5">
                                        <div className="w-16 h-16 rounded-full bg-[#5B2A86]/5 flex items-center justify-center mx-auto">
                                            <Smile className="w-8 h-8 text-[#5B2A86]/40" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-[#1B1326] mb-1" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                                Need a Laugh?
                                            </h3>
                                            <p className="text-xs text-[#1B1326]/50 font-light leading-relaxed">
                                                Pick a category above & tap below for {selectedCategory === "All" ? "60+" : filteredJokes.length} {selectedCategory === "All" ? "" : selectedCategory.toLowerCase()} jokes! 😄
                                            </p>
                                        </div>
                                        <button
                                            onClick={getNextJoke}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105"
                                            style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                                        >
                                            <Smile className="w-3.5 h-3.5" />
                                            Tell Me a Joke
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-full space-y-4">
                                        <div className="bg-[#F7F5F2] rounded-2xl p-5 border border-[#5B2A86]/5 text-left">
                                            <div className="flex items-center justify-between mb-3">
                                                <p className="text-[9px] uppercase tracking-widest text-[#D6B36A] font-bold">😂 {jokes[currentJoke].category}</p>
                                                <span className="text-[9px] uppercase tracking-wider text-[#1B1326]/20 font-bold">{usedJokes.length}/{filteredJokes.length}</span>
                                            </div>
                                            <p className="text-[14px] text-[#1B1326] font-medium leading-relaxed mb-3">
                                                {jokes[currentJoke].setup}
                                            </p>
                                            <div className={`transition-all duration-500 overflow-hidden ${showPunchline ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                                                <div className="pt-3 border-t border-[#5B2A86]/10">
                                                    <p className="text-[14px] text-[#5B2A86] font-semibold leading-relaxed italic">
                                                        {jokes[currentJoke].punchline}
                                                    </p>
                                                </div>
                                            </div>
                                            {!showPunchline && (
                                                <p className="text-[#1B1326]/30 text-xs mt-1 animate-pulse">Wait for it...</p>
                                            )}
                                        </div>

                                        <button
                                            onClick={getNextJoke}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 mx-auto"
                                            style={{ background: "linear-gradient(135deg, #5B2A86, #7A4FB3)" }}
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" />
                                            Another One!
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <CalmCorner />
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
