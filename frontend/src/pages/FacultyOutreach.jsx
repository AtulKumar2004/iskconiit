import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Users,
  Lightbulb,
  Building2,
  Brain,
  Microscope,
  Landmark,
  ChevronDown,
  Calendar,
  MapPin,
  MessageSquareQuote,
  CheckCircle2,
  Atom,
  Quote
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
const stats = [
  { label: "Faculty Connected", value: 300, suffix: "+" },
  { label: "Academic Seminars", value: 50, suffix: "+" },
  { label: "Institutions Served", value: 20, suffix: "+" },
  { label: "Home Satsangas", value: 100, suffix: "+" },
  { label: "Annual Retreats", value: 10, suffix: "+" },
];

const institutions = [
  { name: "IIT Bhubaneswar", icon: GraduationCap },
  { name: "NISER", icon: Atom },
  { name: "AIIMS Bhubaneswar", icon: Brain },
  { name: "OUTR", icon: Building2 },
  { name: "ITER", icon: Landmark },
  { name: "Centurion University", icon: BookOpen },
  { name: "Research Institutions", icon: Microscope },
  { name: "Other Colleges", icon: Users },
];

const programs = [
  { title: "Bhagavad-gita Discussion Forums", description: "Interactive study of ancient wisdom applied to modern academic challenges.", icon: BookOpen },
  { title: "Faculty Satsanga", description: "Regular gatherings for spiritual association and intellectual inquiry.", icon: Users },
  { title: "Leadership & Ethics Seminars", description: "Programs focusing on value-based leadership in educational settings.", icon: Lightbulb },
  { title: "Science & Spirituality Dialogues", description: "Exploring the intersections of scientific discovery and spiritual truth.", icon: Atom },
  { title: "Home Satsangas", description: "Intimate spiritual gatherings hosted at faculty residences.", icon: Building2 },
  { title: "Faculty Retreats", description: "Immersive experiences for reflection, rejuvenation, and deep learning.", icon: MapPin },
  { title: "Book Discussions", description: "In-depth reviews and discussions on profound spiritual literature.", icon: BookOpen },
  { title: "Spiritual Mentorship", description: "Personalized guidance on balancing academic pressure with spiritual growth.", icon: Brain },
];

const themes = [
  "Leadership with Values",
  "Science and Spirituality",
  "Consciousness Studies",
  "Ethics in Education",
  "Work-Life Balance",
  "Stress Management",
  "Purpose and Meaning",
  "Ancient Wisdom for Modern Challenges"
];

const retreats = [
  { title: "Weekend Retreats", description: "Two-day getaways focusing on spiritual rejuvenation.", image: "/faculty/F13.jpeg" },
  { title: "Workshops", description: "Interactive sessions on integrating wisdom in academia.", image: "/faculty/F14.jpeg" },
  { title: "Spiritual Excursions", description: "Guided trips to holy places for deep cultural immersion.", image: "/faculty/F15.jpeg" },
  { title: "Interactive Discussions", description: "Open forums to address life's profound questions.", image: "/faculty/F16.jpeg" },
];

const testimonials = [
  { name: "Dr. Arvind Kumar", designation: "Professor of Physics", institution: "IIT Bhubaneswar", quote: "The discussions on science and spirituality have completely reshaped how I approach my research and interact with my students.", photo: "/faculty/F2.jpeg" },
  { name: "Dr. Rina Das", designation: "Associate Professor", institution: "NISER", quote: "Faculty retreats are a breath of fresh air. They provide the perfect environment to reflect on the higher purpose of education.", photo: "/faculty/F4.jpeg" },
  { name: "Dr. Sanjay Mishra", designation: "Senior Surgeon", institution: "AIIMS Bhubaneswar", quote: "The Bhagavad-gita forums have given me practical tools to handle the immense stress of the medical profession.", photo: "/faculty/F6.jpeg" },
  { name: "Prof. Meera Sen", designation: "Dean of Humanities", institution: "OUTR", quote: "A wonderful platform where intellectual rigor seamlessly meets profound spiritual insight.", photo: "/faculty/F7.jpeg" }
];

const galleryItems = [
  { id: 1, src: "/faculty/F8.jpeg", alt: "Faculty seminar", category: "Seminars" },
  { id: 2, src: "/faculty/F9.jpeg", alt: "Academic discussion", category: "Discussions" },
  { id: 3, src: "/faculty/F10.jpeg", alt: "Home program", category: "Home Satsanga" },
  { id: 4, src: "/faculty/F11.jpeg", alt: "Retreat", category: "Retreats" },
  { id: 5, src: "/faculty/F12.jpeg", alt: "Book launch", category: "Events" },
  { id: 6, src: "/faculty/F17.jpeg", alt: "Guest lecture", category: "Lectures" },
  { id: 7, src: "/faculty/F18.jpeg", alt: "Group discussion", category: "Discussions" },
  { id: 10, src: "/faculty/F21.jpeg", alt: "Campus gathering", category: "Events" },
  { id: 8, src: "/faculty/F19.jpeg", alt: "Meditation session", category: "Retreats" },
  { id: 9, src: "/faculty/F20.jpeg", alt: "Workshop", category: "Workshops" },
];

const upcomingEvents = [
  { title: "Science & Spirituality Symposium", speaker: "HG Chaitanya Charan Das", date: "August 15, 2026", venue: "IIT Bhubaneswar Auditorium" },
  { title: "Leadership with Values Seminar", speaker: "HG Gauranga Prabhu", date: "September 10, 2026", venue: "NISER Campus" },
  { title: "Annual Faculty Retreat", speaker: "Multiple Speakers", date: "October 2-4, 2026", venue: "ISKCON Retreat Centre, Puri" }
];

const faqItems = [
  { question: "Who can participate?", answer: "Our programs are open to educators, researchers, scientists, doctors, and professionals from all academic and research institutions." },
  { question: "Are discussions academic or devotional?", answer: "They are a harmonious blend of both. We encourage rigorous intellectual inquiry guided by timeless devotional wisdom." },
  { question: "Can institutions invite speakers?", answer: "Yes, institutions can invite our speakers for seminars, workshops, and guest lectures on various themes." },
  { question: "Is prior knowledge required?", answer: "No prior knowledge of the Bhagavad-gita or spiritual texts is required. Our programs are designed to be accessible to everyone." },
  { question: "How can faculty members connect?", answer: "You can reach out through our contact form, join our mailing list, or attend one of our upcoming events to get involved." }
];

/* ───────────────────── Utilities ──────────────────────── */

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

/* ─────────────────── Shared Variants ─────────────────── */

const useVariants = () => {
  const rm = useReducedMotion();

  const container = rm
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
      };

  const item = rm
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return { container, item, rm };
};

/* ───────────────── Reusable Components ────────────────── */

const SectionOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
  </div>
);

const SectionHeader = ({ eyebrow, title, description, align = "left" }) => {
  const a = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`space-y-4 ${a}`}>
      {eyebrow && (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {eyebrow}
          </span>
          <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-[#3b3237] sm:text-lg">{description}</p>}
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

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="rounded-2xl border border-white/70 bg-white/80 p-5 backdrop-blur-xl transition duration-300 hover:border-[#D4AF37]/40">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="text-sm font-semibold text-[#2a1b22]">{item.question}</span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-[#D4AF37] transition ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-3 text-sm text-[#4b4246]"
        >
          {item.answer}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ═══════════════════ Main Component ══════════════════════ */

const FacultyOutreach = () => {
  const { container, item: iv, rm } = useVariants();
  const [lightbox, setLightbox] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const handler = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <main>
      {/* ━━ 1. Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" aria-label="Faculty Outreach hero">
        <div className="absolute inset-0">
          <img
            src="/faculty/F3.jpeg"
            alt="Faculty leadership gathering"
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
            Faculty Outreach
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-4xl font-display text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Integrating Wisdom, Leadership, and Higher Purpose
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Creating meaningful dialogue among educators, researchers, scientists, doctors, and professionals through timeless spiritual wisdom.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="/programs#register"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
            >
              Join Faculty Forum
            </a>
            <a
              href="/programs#register"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
            >
              Request a Seminar
            </a>
          </motion.div>
        </div>
      </section>

      {/* ━━ 2. Impact Statistics ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-16">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Impact"
            title="Building a thriving academic community"
            description="Our faculty programmes foster deep connections across premier institutions."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} reduceMotion={rm} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 3. About Faculty Outreach ━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.div variants={iv}>
              <SectionHeader
                eyebrow="About Faculty Outreach"
                title="Where intellectual inquiry meets spiritual wisdom"
                description="Faculty members shape the future of society through education, research, and leadership. ISKCON IIT Centre provides a platform where intellectual inquiry meets spiritual wisdom. Through discussions, seminars, retreats, and personal interactions, we help educators explore deeper dimensions of knowledge, purpose, ethics, and well-being."
              />
            </motion.div>
            <motion.div variants={iv}>
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)] transition hover:-translate-y-0.5"
              >
                Explore Programs
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_26px_70px_-45px_rgba(31,23,28,0.6)]"
          >
            <img
              src="/faculty/F1.jpeg"
              alt="Faculty outreach gathering"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ━━ 4. Institutions We Serve ━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Institutions We Serve"
            title="Partnering with premier institutions"
            description="We connect with faculty members across leading universities and research centres."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {institutions.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  variants={iv}
                  whileHover={rm ? {} : { y: -4 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#2a1b22]">{ind.name}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 5. Our Faculty Programs ━━━━━━━━━━━━━━━━━━━━ */}
      <section id="programs" className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Our Programs"
            title="Fostering wisdom and connection"
            description="A diverse range of programs tailored for intellectual and spiritual growth."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {programs.map((prog) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.title}
                  variants={iv}
                  whileHover={rm ? {} : { y: -6 }}
                  className="group rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.5)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[#2a1b22]">{prog.title}</h3>
                  <p className="mt-3 text-sm text-[#4b4246]">{prog.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 6. Key Discussion Themes ━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Discussion Themes"
            title="Exploring profound ideas"
            description="Engaging topics that bridge the gap between academic rigor and spiritual insight."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {themes.map((theme) => (
              <motion.div
                key={theme}
                variants={iv}
                whileHover={rm ? {} : { y: -4 }}
                className="rounded-2xl border border-white/70 bg-white/80 p-5 text-center shadow-[0_16px_40px_-28px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[#2a1b22]">{theme}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 7. Science & Spirituality ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="parchment-bg relative py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#4A1F2D]">Where Knowledge Meets Wisdom</p>
            <h2 className="mt-4 font-display text-3xl text-[#2a1b22] sm:text-4xl">
              Science & Spirituality
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base text-[#3b3237]">
              Presenting the harmonious relationship between scientific inquiry and spiritual understanding. We facilitate deep discussions on consciousness, ethics, purpose, and holistic well-being, exploring how ancient wisdom complements modern research.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={iv}
              className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/30 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md"
            >
              <img src="/faculty/F5.jpeg" alt="Science and spirituality discussion" className="h-full w-full rounded-2xl object-cover" />
            </motion.div>
            <div className="flex flex-col justify-center gap-6">
              <motion.div variants={iv} className="rounded-2xl border border-white/50 bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
                <Quote className="h-6 w-6 text-[#4A1F2D]" />
                <p className="mt-3 text-sm italic text-[#4b4246]">"Science without religion is lame, religion without science is blind."</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A1F2D]">— Albert Einstein</p>
              </motion.div>
              <motion.div variants={iv} className="rounded-2xl border border-white/50 bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
                <Quote className="h-6 w-6 text-[#4A1F2D]" />
                <p className="mt-3 text-sm italic text-[#4b4246]">"The first gulp from the glass of natural sciences will turn you into an atheist, but at the bottom of the glass God is waiting for you."</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#4A1F2D]">— Werner Heisenberg</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ 8. Testimonials ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Testimonials"
            title="Voices from the academic community"
            description="Hear from educators and researchers who have experienced our programs."
          />
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={24}
              breakpoints={{ 640: { slidesPerView: 1 }, 900: { slidesPerView: 2 } }}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="h-full rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl">
                    <MessageSquareQuote className="h-8 w-8 text-[#D4AF37]" />
                    <p className="mt-4 text-sm text-[#4b4246]">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2a1b22]">{t.name}</p>
                        <p className="text-xs text-[#4b4246]">{t.designation}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4A1F2D]/70">
                          {t.institution}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ━━ 9. Faculty Retreats & Gatherings ━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Retreats & Gatherings"
            title="Immersive experiences for profound growth"
            description="Take a step back from the academic rigor to reflect, rejuvenate, and connect."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {retreats.map((r) => (
              <motion.article
                key={r.title}
                variants={iv}
                className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-[#1f1117] text-white shadow-[0_26px_70px_-45px_rgba(18,9,12,0.85)] transition duration-500 hover:-translate-y-1"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition duration-500 group-hover:from-black/90" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.24),_transparent_60%)] opacity-70 transition duration-500 group-hover:opacity-90" />
                <div className="relative z-10 p-6">
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">{r.title}</h3>
                  <p className="mt-1.5 text-xs text-white/80 sm:text-sm">{r.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 10. Gallery ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Gallery"
            title="Glimpses of our community"
            description="Faculty seminars, academic discussions, home programs, and retreats."
          />
          <div className="mt-10">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryItems.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightbox(img)}
                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.5)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 text-left opacity-0 transition group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/90">
                    {img.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#1b0c13]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="h-full w-full object-cover" />
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white"
                  aria-label="Close gallery"
                >
                  Close
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
                  {lightbox.category}
                </p>
                <p className="mt-2 text-sm text-white/80">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━ 11. Upcoming Events ━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Upcoming Events"
            title="Join the next academic dialogue"
            description="Reserve your spot in our upcoming seminars and retreats."
          />
          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {upcomingEvents.map((ev) => (
              <motion.div
                key={ev.title}
                variants={iv}
                whileHover={rm ? {} : { y: -4 }}
                className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                  <Calendar className="h-4 w-4" />
                  {ev.date}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#2a1b22]">{ev.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#4b4246]">{ev.speaker}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-[#4b4246]">
                  <MapPin className="h-4 w-4" />
                  {ev.venue}
                </div>
                <a
                  href="/programs#register"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#D4AF37]/60 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition duration-300 hover:shadow-[0_12px_28px_-18px_rgba(212,175,55,0.7)]"
                >
                  Register
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 12. FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions educators often ask"
            description="Everything you need to know before joining the forum."
          />
          <div className="mt-10 grid gap-4">
            {faqItems.map((faq, i) => (
              <FaqItem
                key={faq.question}
                item={faq}
                isOpen={openFaqIndex === i}
                onToggle={() => setOpenFaqIndex((prev) => (prev === i ? null : i))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 13. Call To Action ━━━━━━━━━━━━━━━━━━━ */}
      <section id="join" className="parchment-bg relative py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#4A1F2D]">Get Involved</p>
          <h2 className="mt-4 font-display text-3xl text-[#2a1b22] sm:text-4xl">
            Join a Community of Thoughtful Inquiry and Spiritual Exploration
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[#3b3237]">
            Connect with fellow educators, researchers, and professionals who are exploring deeper questions of life, purpose, consciousness, and leadership through timeless wisdom.
          </p>
          <div id="contact" className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/programs#register"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(212,175,55,0.65)]"
            >
              Join Faculty Network
            </a>
            <a
              href="/contact"
              className="rounded-full border border-[#D4AF37]/50 bg-white/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:bg-white/60"
            >
              Contact Coordinator
            </a>
          </div>
        </div>
      </section>

      {/* ━━ 14. Footer Banner ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-16">
        <SectionOrbs />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            True Education
          </p>
          <h2 className="font-display text-2xl font-semibold italic text-[#2a1b22] sm:text-3xl">
            "True education awakens wisdom, character, and higher purpose."
          </h2>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#4b4246]">
            <span>Wisdom</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Character</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Purpose</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FacultyOutreach;
