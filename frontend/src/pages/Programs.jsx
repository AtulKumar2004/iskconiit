import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Masonry from "react-masonry-css";
import {
  Calendar, ChevronDown, ChevronRight, Clock, MapPin,
  Users, Heart, BookOpen, Music, Home as HomeIcon, Star,
  ArrowRight, Sparkles, Quote
} from "lucide-react";
import ProgramRegistrationForm from "../components/ProgramRegistrationForm";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// --- DATA ---

const statistics = [
  { label: "Programs Every Month", value: 100, suffix: "+" },
  { label: "Participants Reached", value: 5000, suffix: "+" },
  { label: "Villages Connected", value: 30, suffix: "+" },
  { label: "Corporate Houses Served", value: 100, suffix: "+" },
  { label: "Educational Institutions", value: 7, suffix: "+" },
];

const featuredPrograms = [
  {
    title: "Sunday Feast",
    description: "Weekly kirtan, Bhagavad-gita discourse, prasadam, and association.",
    image: "/prasadameating.png",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Srimad Bhagavatam Classes",
    description: "Daily discussions on timeless spiritual wisdom.",
    image: "/bgclass.png",
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    title: "Srimad Bhagavad Gita Classes",
    description: "Systematic study of Bhagavad-gita and practical application.",
    image: "/guidance.png",
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    title: "Kirtan Evenings",
    description: "Soulful chanting and meditation sessions.",
    image: "/kirtan-2.png",
    icon: <Music className="w-6 h-6" />
  },
  {
    title: "Harinama Sankirtana",
    description: "Congregational chanting and outreach.",
    image: "/dancing.png",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "House Programs",
    description: "Spiritual gatherings in homes and communities.",
    image: "/association.png",
    icon: <HomeIcon className="w-6 h-6" />
  }
];

const programsByAudience = [
  {
    category: "Students",
    items: ["Gita Study Circles", "Hostel Programs", "Youth Retreats", "Mentorship"],
    image: "/mentorship.png"
  },
  {
    category: "Faculty",
    items: ["Discussion Forums", "Leadership Dialogues", "Home Satsangas"],
    image: "/lib.png"
  },
  {
    category: "Corporate Professionals",
    items: ["Wellness Workshops", "Leadership Seminars", "Executive Retreats"],
    image: "/corporate/P3.jpeg"
  },
  {
    category: "Families",
    items: ["House Programs", "Family Satsangas", "Festival Celebrations"],
    image: "/festival.png"
  },
  {
    category: "Children",
    items: ["Bala Gokulam", "Sloka Recitation", "Drama", "Cultural Education"],
    image: "/guidance-2.png"
  }
];

const dailySchedule = [
  { event: "Mangal Arati", time: "4:30 AM - 5:00 AM" },
  { event: "Mantra Meditation", time: "5:00 AM - 7:30 AM" },
  { event: "Darshan & Guru Puja", time: "7:30 AM - 8:00 AM" },
  { event: "Discussion on Srimad Bhagavatam", time: "8:00 AM - 9:00 AM" },
  { event: "Sandhya Arati", time: "7:00 PM - 7:30 PM" },
  { event: "Soulful Kirtan", time: "7:30 PM - 9:00 PM" },
];

const weeklySchedule = [
  { day: "Saturday", event: "Exclusively youth spiritual session for all youth", time: "7:00 PM" },
  { day: "Sunday", event: "Weekly session for serious and sincere youth devotees", time: "7:00 AM" },
  { day: "Sunday", event: "Bhagavatam Class for Grhasthas", time: "11:00 AM" },
];

const annualEvents = [
  { title: "Janmashtami", desc: "The grand appearance day of Lord Krishna.", image: "/deities.png" },
  { title: "Ratha Yatra", desc: "The spectacular festival of chariots.", image: "/festival.png" },
  { title: "Gaura Purnima", desc: "Celebrating the appearance of Sri Chaitanya Mahaprabhu.", image: "/dancing.png" },
  { title: "Shravan Utsava", desc: "A festival of hearing timeless pastimes.", image: "/arati.png" },
  { title: "Bhagavata Katha Series", desc: "Immersive days of hearing Srimad Bhagavatam.", image: "/bgclass.png" },
  { title: "Kartika Festival", desc: "The month of offering lamps to Lord Damodara.", image: "/arati.png" },
  { title: "Senior Devotee Visits", desc: "Special classes by traveling monks.", image: "/gaurangaprabhu.png" }
];

const yatras = [
  { title: "Vrindavan Yatra", image: "/villageoutreach.png" },
  { title: "Mayapur Yatra", image: "/association.png" },
  { title: "Jagannath Puri Yatra", image: "/festival.png" },
  { title: "Youth Retreats", image: "/mentorship.png" },
  { title: "Family Retreats", image: "/prasadameating.png" },
];

const galleryImages = [
  "/kirtan.png",
  "/bgclass.png",
  "/guidance.png",
  "/dancing.png",
  "/association.png",
  "/prasadameating.png",
  "/festival.png",
];

const testimonials = [
  { name: "Rahul S.", role: "Student, IIT Bhubaneswar", quote: "The Gita Study Circles provided me with immense clarity and focus. It's a perfect blend of wisdom and practical application." },
  { name: "Dr. A. Kumar", role: "Faculty Member", quote: "Faculty Satsangas are my weekly retreat. The discussions are profound and deeply enriching for my personal and professional life." },
  { name: "Priya M.", role: "Corporate Professional", quote: "The wellness workshops taught me how to manage stress effectively using timeless spiritual principles." },
  { name: "The Sharma Family", role: "Congregation", quote: "Sunday Feasts and Family Satsangas have become the highlight of our week. It's a wonderful environment for our children." },
];

const upcomingPrograms = [
  { title: "Youth Spiritual Retreat", date: "Oct 15, 2026", time: "10:00 AM - 5:00 PM", venue: "ISKCON Centre" },
  { title: "Special Sunday Feast with Kirtan", date: "Oct 18, 2026", time: "12:00 PM - 3:00 PM", venue: "Main Temple Hall" },
  { title: "Leadership Workshop", date: "Oct 22, 2026", time: "6:00 PM - 8:00 PM", venue: "Online via Zoom" },
];

const faqs = [
  { question: "Who can attend?", answer: "Our programs are open to everyone, regardless of age, background, or beliefs. We welcome students, professionals, families, and spiritual seekers." },
  { question: "Is there any registration fee?", answer: "Most of our regular weekly programs are completely free of charge. Some special retreats or workshops may have a nominal fee to cover costs, which will be clearly mentioned during registration." },
  { question: "Are programs open to newcomers?", answer: "Absolutely! We design our sessions to be accessible and welcoming to newcomers, explaining concepts clearly and providing a friendly environment." },
  { question: "How do I register?", answer: "You can register for upcoming events through the 'Register' links on this page or by contacting us directly via our Contact page." },
  { question: "Can I invite programs to my institution or home?", answer: "Yes, we actively organize house programs and institutional workshops. Please reach out to our outreach coordinators to arrange a session." },
];

// --- UTILITIES ---

const useCountUp = (target, start, reduceMotion, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let t0;

    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduceMotion, start, target]);

  return value;
};

// --- SHARED COMPONENTS ---

const SectionOrbs = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
  </div>
);

const SectionHeader = ({ eyebrow, title, description, align = "left", isDark = false }) => {
  const a = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`space-y-4 ${a} relative z-10 mb-12`}>
      {eyebrow && (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {eyebrow}
          </span>
          <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
        </div>
      )}
      <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-white" : "text-[#2a1b22]"} sm:text-4xl`}>{title}</h2>
      {description && <p className={`text-base ${isDark ? "text-white/80" : "text-[#3b3237]"} sm:text-lg max-w-2xl mx-auto`}>{description}</p>}
    </div>
  );
};

const StatCard = ({ stat, index, reduceMotion }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const value = useCountUp(stat.value, inView, reduceMotion);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="rounded-2xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60"
    >
      <p className="text-3xl font-semibold text-[#D4AF37] sm:text-4xl">
        {value.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#4b4246]">{stat.label}</p>
    </motion.div>
  );
};

// 1. Hero Section
const HeroSection = () => (
  <section className="relative overflow-hidden" aria-label="Programs hero">
    <div className="absolute inset-0">
      <img
        src="/kirtan.png"
        alt="ISKCON Kirtan Gathering"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2e]/95 via-[#1a0d12]/85 to-[#0c1a2e]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.20),_transparent_55%)]" />
    </div>

    <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 pb-16 pt-32 lg:px-12">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]"
      >
        Spiritual Education & Culture
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-5 max-w-3xl font-display text-4xl text-white sm:text-5xl lg:text-6xl leading-tight"
      >
        Programs for Every Stage of <span className="text-[#D4AF37]">Spiritual Growth</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
      >
        From students and professionals to families and children, discover transformative programs that inspire wisdom, devotion, and community.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#register"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
        >
          Join a Program
        </a>
        <a
          href="#schedule"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
        >
          View Calendar
        </a>
      </motion.div>
    </div>
  </section>
);

// 2. Program Statistics
const StatsSection = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] py-16">
      <SectionOrbs />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {statistics.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
};

// 3. Featured Programs
const FeaturedSection = () => (
  <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
    <SectionOrbs />
    <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
      <SectionHeader
        eyebrow="Featured"
        title="Featured Programs"
        description="Explore our core offerings designed to bring you closer to spiritual perfection."
        align="center"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPrograms.map((program, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative rounded-2xl border border-white/60 bg-white/80 overflow-hidden shadow-[0_20px_50px_-32px_rgba(31,23,28,0.3)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-[#4A1F2D]/10 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full z-20 text-[#D4AF37] shadow-sm">
                {program.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-[#2a1b22] mb-2">{program.title}</h3>
              <p className="text-sm text-[#4b4246] mb-2">{program.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 4. Programs by Audience
const AudienceSection = () => (
  <section className="relative overflow-hidden bg-[#1f1117] py-20 text-white">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1),_transparent_60%)]" />
    <div className="relative mx-auto max-w-6xl px-6 lg:px-12 z-10">
      <SectionHeader
        eyebrow="By Audience"
        title="Programs by Audience"
        description="Tailored spiritual experiences for every stage of life."
        align="center"
        isDark={true}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programsByAudience.map((aud, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-[#1f1117] text-white shadow-[0_26px_70px_-45px_rgba(18,9,12,0.85)] transition duration-500 hover:-translate-y-1 ${idx === 3 || idx === 4 ? 'lg:col-span-1.5' : ''}`}
          >
            <img src={aud.image} alt={aud.category} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition duration-500 group-hover:from-black/95" />

            <div className="relative z-10 p-6 sm:p-7">
              <h3 className="text-2xl font-display font-semibold text-[#D4AF37] mb-4">{aud.category}</h3>
              <ul className="space-y-2">
                {aud.items.map((item, i) => (
                  <li key={i} className="flex items-center text-white/90 text-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 5. Common Schedule
const ScheduleSection = () => (
  <section id="schedule" className="relative overflow-hidden bg-[#F8F5EF] py-20">
    <SectionOrbs />
    <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
      <SectionHeader
        eyebrow="Timetable"
        title="Temple Schedule"
        description="Darshan Timings: 4:30 AM to 3:00 PM & 4:00 PM to 9:30 PM"
        align="center"
      />
      
      <h3 className="text-2xl font-display font-semibold text-[#2a1b22] mb-6 text-center mt-4">Daily Schedule</h3>
      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl mb-12">
        {dailySchedule.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 ${idx !== dailySchedule.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
              <span className="text-lg font-display font-medium text-[#4b4246]">{item.event}</span>
            </div>
            <div className="flex items-center w-full sm:w-1/2 sm:justify-end text-sm text-[#4b4246]">
              <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="font-semibold">{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="text-2xl font-display font-semibold text-[#2a1b22] mb-6 text-center">Weekly Schedule</h3>
      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl">
        {weeklySchedule.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 ${idx !== weeklySchedule.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-1/4">
              <Calendar className="w-5 h-5 text-[#D4AF37] mr-3" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#2a1b22]">{item.day}</span>
            </div>
            <div className="w-full sm:w-1/2 mb-2 sm:mb-0">
              <span className="text-lg font-display font-medium text-[#4b4246]">{item.event}</span>
            </div>
            <div className="flex items-center w-full sm:w-1/4 sm:justify-end text-sm text-[#4b4246]">
              <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="font-semibold">{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 6. Annual Signature Events
const AnnualEventsSection = () => (
  <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
    <SectionOrbs />
    <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
      <div className="flex flex-col items-center mb-12">
        <SectionHeader
          eyebrow="Festivals"
          title="Annual Signature Events"
          description="Grand festivals celebrating devotion and culture."
          align="center"
        />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="pb-16"
      >
        {annualEvents.map((event, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.3)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60">
              <div className="h-48 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2e]/80 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-lg font-display font-semibold text-white">{event.title}</h3>
                </div>
              </div>
              <div className="flex flex-col flex-grow p-5">
                <p className="text-[#4b4246] text-sm mb-4 flex-grow">{event.desc}</p>
                <button className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#4A1F2D] transition-colors flex items-center mt-auto">
                  Event Details <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

// 7. Pilgrimages & Retreats
const YatraSection = () => (
  <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
    <SectionOrbs />
    <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
      <SectionHeader
        eyebrow="Journeys"
        title="Pilgrimages & Retreats"
        description="Journey to holy places and rejuvenate your spirit."
      />

      <div className="flex overflow-x-auto pb-8 space-x-6 hide-scrollbar snap-x snap-mandatory pt-4">
        {yatras.map((yatra, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex-none w-72 md:w-80 rounded-3xl overflow-hidden relative snap-center group shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] h-80"
          >
            <img src={yatra.image} alt={yatra.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d12]/90 via-[#1a0d12]/40 to-transparent transition duration-500 group-hover:from-[#1a0d12]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 relative z-10 h-full flex flex-col justify-end">
              <h3 className="text-white text-xl font-display font-semibold mb-2">{yatra.title}</h3>
              <div className="flex items-center text-[#D4AF37] text-xs font-semibold uppercase tracking-wider">
                <span>View Gallery</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// 8. Program Gallery
const GallerySection = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
      <SectionOrbs />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader
          eyebrow="Gallery"
          title="Moments of Devotion"
          description="Glimpses from our vibrant community programs."
          align="center"
        />

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6 mt-10"
          columnClassName="pl-6 bg-clip-padding"
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="mb-6 overflow-hidden rounded-2xl group cursor-pointer relative shadow-[0_10px_30px_-15px_rgba(31,23,28,0.3)]"
            >
              <img src={img} alt="Gallery moment" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

// 9. Testimonials
const TestimonialSection = () => (
  <section className="parchment-bg relative py-20">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
    <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[#4A1F2D]">Community Voices</p>
        <h2 className="mt-4 font-display text-3xl text-[#2a1b22] sm:text-4xl">
          What Our Community Says
        </h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="pb-16 testimonials-swiper"
      >
        {testimonials.map((test, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center px-4 md:px-12">
              <Quote className="w-12 h-12 mx-auto text-[#4A1F2D]/20 mb-6" />
              <p className="text-lg md:text-2xl font-display leading-relaxed mb-8 italic text-[#2a1b22]">
                "{test.quote}"
              </p>
              <div className="flex flex-col items-center justify-center">
                <h4 className="font-semibold text-sm text-[#2a1b22] uppercase tracking-wide">{test.name}</h4>
                <p className="text-[#4A1F2D] text-xs font-semibold uppercase tracking-[0.2em] mt-1">{test.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

// 10. Upcoming Programs
const UpcomingSection = () => (
  <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
    <SectionOrbs />
    <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
      <SectionHeader
        eyebrow="Register"
        title="Upcoming Programs"
        description="Don't miss out on these special events."
      />

      <div className="space-y-4 mt-8">
        {upcomingPrograms.map((prog, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/60 bg-white/80 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-[0_15px_40px_-25px_rgba(31,23,28,0.3)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
          >
            <div className="flex-1 mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <span className="bg-[#D4AF37]/20 text-[#4A1F2D] px-2 py-1 rounded text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                  Upcoming
                </span>
                <h3 className="text-xl font-display font-semibold text-[#2a1b22]">{prog.title}</h3>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-6 text-[#4b4246] text-sm mt-3">
                <div className="flex items-center mb-2 sm:mb-0"><Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" /> {prog.date}</div>
                <div className="flex items-center mb-2 sm:mb-0"><Clock className="w-4 h-4 mr-2 text-[#D4AF37]" /> {prog.time}</div>
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" /> {prog.venue}</div>
              </div>
            </div>
            <button className="w-full md:w-auto rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]">
              Register Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// 11. Frequently Asked Questions
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
      <SectionOrbs />
      <div className="relative mx-auto max-w-3xl px-6 lg:px-12">
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" align="center" />

        <div className="space-y-4 mt-10">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/70 bg-white/80 p-5 backdrop-blur-xl transition duration-300 hover:border-[#D4AF37]/40 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
                aria-expanded={openIndex === idx}
              >
                <span className="text-sm font-semibold text-[#2a1b22]">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-[#D4AF37] transition ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-[#4b4246] leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 12. Registration Section
const RegistrationSection = () => (
  <section id="register" className="relative overflow-hidden bg-[#F8F5EF] py-24">
    <SectionOrbs />
    <div className="relative mx-auto max-w-6xl px-6 lg:px-12 z-10">
      <SectionHeader
        eyebrow="Join Us"
        title="Register For a Program"
        description="We would be delighted to connect with you and help you begin your spiritual journey."
        align="center"
      />
      <div className="mt-12">
        <ProgramRegistrationForm />
      </div>
    </div>
  </section>
);

// 13. Join Us
const JoinUsSection = () => (
  <section id="join" className="relative overflow-hidden py-24 text-center">
    <div className="absolute inset-0 bg-[#0c1a2e]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
    </div>

    <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl mb-6">Take the Next Step in Your Spiritual Journey</h2>
        <p className="text-base text-white/80 sm:text-lg mb-10 max-w-2xl mx-auto">
          Whether you are a student, faculty member, professional, parent, or spiritual seeker, there is a program designed to help you grow and connect.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-full bg-[#D4AF37] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
          >
            Join a Program
          </button>
          <a href="/contact" className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]">
            Contact Us
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// 13. Footer Banner
const FooterBanner = () => (
  <section className="bg-[#12070c] py-12 text-center border-t border-white/5">
    <div className="max-w-4xl mx-auto px-4">
      <div className="w-16 h-[1px] bg-[#D4AF37]/50 mx-auto mt-6" />
    </div>
  </section>
);

export default function Programs() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="font-body bg-[#12070c] min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedSection />
      <AudienceSection />
      <ScheduleSection />
      <AnnualEventsSection />
      <YatraSection />
      <GallerySection />
      <TestimonialSection />
      <UpcomingSection />
      <RegistrationSection />
      <FAQSection />
      <JoinUsSection />
      <FooterBanner />
    </div>
  );
}
