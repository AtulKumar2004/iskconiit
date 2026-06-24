import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Tent,
  Music,
  BookOpen,
  BookText,
  PartyPopper,
  Utensils,
  Baby,
  Flame,
  Library,
  Landmark,
  Palette,
  Theater,
  ShieldCheck,
  ChevronDown,
  Calendar,
  MapPin,
  MessageSquareQuote,
  CheckCircle2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* ───────────────────── Data ──────────────────────── */

const stats = [
  { label: "Villages Connected", value: 30, suffix: "+" },
  { label: "Weekly Programs", value: 100, suffix: "+" },
  { label: "Families Reached", value: 1000, suffix: "+" },
  { label: "Naam Hatta Groups", value: 50, suffix: "+" },
  { label: "Regular Participants", value: 500, suffix: "+" },
];

const programs = [
  { title: "Naam Hatta Programs", description: "Regular local gatherings for kirtan and spiritual discourse.", icon: Home },
  { title: "Bhakti Riksha Groups", description: "Small, interactive neighborhood study groups.", icon: Users },
  { title: "House Programs", description: "Special spiritual programs hosted at devotees' homes.", icon: Tent },
  { title: "Harinama Sankirtana", description: "Joyful congregational chanting through village streets.", icon: Music },
  { title: "Bhagavad-gita Classes", description: "Systematic study of ancient spiritual texts.", icon: BookOpen },
  { title: "Srimad Bhagavatam Discussions", description: "Deep dives into the histories and pastimes of the Lord.", icon: BookText },
  { title: "Community Festivals", description: "Grand celebrations bringing the whole village together.", icon: PartyPopper },
  { title: "Prasadam Distribution", description: "Sharing sanctified food with the entire community.", icon: Utensils },
  { title: "Children's Education", description: "Teaching values, slokas, and culture to the next generation.", icon: Baby },
  { title: "Youth Development", description: "Empowering young people with character and purpose.", icon: Flame },
];

const festivals = [
  { title: "Janmashtami", image: "/village/V1.jpeg" },
  { title: "Ratha Yatra", image: "/village/V2.jpeg" },
  { title: "Gaura Purnima", image: "/village/V3.jpeg" },
  { title: "Kartika Celebrations", image: "/village/V4.jpeg" },
  { title: "Nagar Sankirtana", image: "/village/V5.jpeg" },
  { title: "Kirtan Melas", image: "/village/V6.jpeg" },
];

const youthPrograms = [
  { title: "Sloka Recitation", icon: BookOpen },
  { title: "Devotional Storytelling", icon: Library },
  { title: "Cultural Education", icon: Landmark },
  { title: "Drawing Competitions", icon: Palette },
  { title: "Drama Performances", icon: Theater },
  { title: "Personality Development", icon: ShieldCheck },
];

const testimonials = [
  { name: "Pratap Singh", role: "Village Head", location: "Khurda District", quote: "The Naam Hatta programs have completely transformed the atmosphere in our village. There is more peace, cooperation, and joy among the families.", photo: "/village/V7.jpeg" },
  { name: "Sujata Mohanty", role: "Mother & Devotee", location: "Puri District", quote: "My children look forward to the weekend Bhakti Riksha. They are learning such wonderful values and slokas.", photo: "/village/V8.jpeg" },
  { name: "Ramesh Das", role: "Youth Leader", location: "Cuttack District", quote: "Through the youth development programs, many young people in our area have found purpose and avoided bad habits.", photo: "/village/V9.jpeg" },
];

const galleryItems = [
  { id: 1, src: "/village/V1.jpeg", alt: "Village Festival", category: "Festivals" },
  { id: 2, src: "/village/V2.jpeg", alt: "Harinama", category: "Harinama" },
  { id: 3, src: "/village/V3.jpeg", alt: "House Program", category: "Programs" },
  { id: 4, src: "/village/V4.jpeg", alt: "Bhakti Riksha", category: "Groups" },
  { id: 5, src: "/village/V5.jpeg", alt: "Children's Activities", category: "Children" },
  { id: 6, src: "/village/V6.jpeg", alt: "Prasadam Distribution", category: "Prasadam" },
  { id: 7, src: "/village/V7.jpeg", alt: "Kirtan Mela", category: "Festivals" },
  { id: 8, src: "/village/V8.jpeg", alt: "Community Gathering", category: "Programs" },
  { id: 9, src: "/village/V9.jpeg", alt: "Spiritual Education", category: "Education" },
  { id: 10, src: "/village/V10.jpeg", alt: "Naam Hatta", category: "Naam Hatta" },
];

const upcomingEvents = [
  { title: "Grand Harinama Sankirtana", village: "Pipli", date: "August 20, 2026", details: "A massive congregational chanting festival through the main streets." },
  { title: "Janmashtami Mahotsav", village: "Jatni", date: "September 5, 2026", details: "All-day celebration including kirtan, drama, and a grand feast." },
  { title: "Bhakti Riksha Annual Gathering", village: "Bhubaneswar Outskirts", date: "October 12, 2026", details: "A meeting of all local groups for shared realization and inspiration." },
];

const faqItems = [
  { question: "How can a village start a Naam Hatta?", answer: "Any group of interested individuals can start a Naam Hatta. Simply contact us, and we will send a team to help set up the initial programs and guide you." },
  { question: "Can we request a house program?", answer: "Yes, we regularly conduct house programs. You can fill out the request form on this page or call our coordinator to schedule a date." },
  { question: "How can families participate?", answer: "Families are the core of our village outreach! You can host programs, attend weekly Bhakti Riksha meetings, and engage your children in our educational activities." },
  { question: "Are children's programs available?", answer: "Absolutely. We place a strong emphasis on children's spiritual and cultural education through storytelling, sloka recitation, and arts." },
  { question: "How can we support village outreach?", answer: "You can support by volunteering your time, sponsoring prasadam or literature, or providing financial contributions to expand our reach." }
];

const mapLocations = [
  { id: "L1", x: 30, y: 40, name: "Pipli", stats: "3 Naam Hatta Groups" },
  { id: "L2", x: 60, y: 30, name: "Jatni", stats: "5 Bhakti Riksha Groups" },
  { id: "L3", x: 45, y: 65, name: "Khurda", stats: "Major Festival Center" },
  { id: "L4", x: 75, y: 55, name: "Puri Outskirts", stats: "10 Weekly Programs" },
  { id: "L5", x: 20, y: 75, name: "Cuttack Villages", stats: "Youth Development Hub" },
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
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#1e4620]/10 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#e67e22]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
  </div>
);

const SectionHeader = ({ eyebrow, title, description, align = "left" }) => {
  const a = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`space-y-4 ${a}`}>
      {eyebrow && (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e67e22]">
            {eyebrow}
          </span>
          <span className="h-px w-14 bg-[#e67e22]/70" aria-hidden="true" />
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
      className="rounded-2xl border border-[#e67e22]/20 bg-[#F8F5EF]/80 p-6 text-center shadow-[0_20px_50px_-32px_rgba(31,23,28,0.35)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#e67e22]/60"
    >
      <p className="text-3xl font-semibold text-[#e67e22] sm:text-4xl">
        {value.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#2a1b22]">{stat.label}</p>
    </motion.div>
  );
};

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="rounded-2xl border border-[#e67e22]/20 bg-[#F8F5EF]/80 p-5 backdrop-blur-xl transition duration-300 hover:border-[#e67e22]/40">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="text-sm font-semibold text-[#2a1b22]">{item.question}</span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-[#e67e22] transition ${isOpen ? "rotate-180" : ""}`}
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

const VillageOutreach = () => {
  const { container, item: iv, rm } = useVariants();
  const [lightbox, setLightbox] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeMapPin, setActiveMapPin] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const handler = (e) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <main>
      {/* ━━ 1. Hero ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" aria-label="Village Outreach hero">
        <div className="absolute inset-0">
          <img
            src="/village/V1.jpeg"
            alt="Village Harinama Sankirtana"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b0c13]/90 via-[#3a1824]/85 to-[#0b1b11]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(230,126,34,0.25),_transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 pb-16 pt-32 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#e67e22]"
          >
            Village Outreach
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-4xl font-display text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Transforming Villages Through Spiritual Culture and Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Bringing Krishna consciousness, cultural values, spiritual education, and joyful community life to villages across the region.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#programs"
              className="rounded-full bg-[#e67e22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(230,126,34,0.7)]"
            >
              Explore Our Outreach
            </a>
            <a
              href="/programs#register"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#e67e22]/70 hover:text-[#e67e22]"
            >
              Join Seva
            </a>
          </motion.div>
        </div>
      </section>

      {/* ━━ 2. Impact Statistics ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-16">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Impact"
            title="Growing roots in local communities"
            description="Our village outreach touches thousands of lives every week."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} reduceMotion={rm} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 3. About Village Outreach ━━━━━━━━━━━━━━━━━━ */}
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
                eyebrow="About Village Outreach"
                title="The heart of spiritual culture"
                description="Village communities have always been the heart of spiritual and cultural life. Through Naam Hatta programs, Bhakti Riksha gatherings, house programs, Harinama Sankirtana, spiritual festivals, and community engagement, ISKCON IIT Centre is helping strengthen devotional culture and bring people together through Krishna consciousness."
              />
            </motion.div>
            <motion.div variants={iv}>
              <a
                href="#network"
                className="inline-flex items-center justify-center rounded-full bg-[#4A1F2D] px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_18px_40px_-22px_rgba(74,31,45,0.8)] transition hover:-translate-y-0.5 hover:bg-[#3a1824]"
              >
                Discover the Network
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-[#e67e22]/30 bg-white/80 p-4 shadow-[0_26px_70px_-45px_rgba(31,23,28,0.4)]"
          >
            <img
              src="/village/V2.jpeg"
              alt="Village outreach gathering"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#4A1F2D]/40 via-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ━━ 4. Interactive Village Map ━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-[#e67e22]/5" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Coverage"
            title="Spreading the Holy Name"
            description="Explore the villages and communities we serve across the region."
            align="center"
          />
          <div className="mt-12 flex flex-col lg:flex-row gap-12 items-center">
            {/* Interactive SVG Map (Abstract representation) */}
            <div className="relative w-full max-w-lg aspect-square bg-[#F8F5EF] rounded-[3rem] border border-[#e67e22]/20 shadow-xl p-8">
              <svg className="w-full h-full text-[#4A1F2D]/10" viewBox="0 0 100 100">
                <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M20,20 Q50,80 80,20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M50,10 Q50,50 50,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                
                {mapLocations.map((loc) => (
                  <g 
                    key={loc.id} 
                    transform={`translate(${loc.x}, ${loc.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveMapPin(loc)}
                    onMouseLeave={() => setActiveMapPin(null)}
                  >
                    <circle cx="0" cy="0" r="4" fill={activeMapPin?.id === loc.id ? "#e67e22" : "#4A1F2D"} className="transition-colors duration-300" />
                    <circle cx="0" cy="0" r="8" fill="none" stroke={activeMapPin?.id === loc.id ? "#e67e22" : "#4A1F2D"} strokeWidth="1" className={`${activeMapPin?.id === loc.id ? 'animate-ping' : ''}`} />
                  </g>
                ))}
              </svg>
            </div>

            {/* Map Info Panel */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeMapPin ? (
                  <motion.div
                    key={activeMapPin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-[#F8F5EF] border border-[#e67e22]/30 p-8 rounded-3xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-[#e67e22] mb-4">
                      <MapPin className="h-6 w-6" />
                      <h3 className="font-display text-2xl font-semibold text-[#2a1b22]">{activeMapPin.name}</h3>
                    </div>
                    <p className="text-base font-medium text-[#4b4246]">{activeMapPin.stats}</p>
                    <p className="mt-4 text-sm text-[#4b4246]">Regular kirtans, study circles, and prasadam distribution bring the community together.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8 border-2 border-dashed border-[#e67e22]/20 rounded-3xl"
                  >
                    <MapPin className="mx-auto h-8 w-8 text-[#e67e22]/50 mb-4" />
                    <p className="text-[#3b3237]">Hover over the points on the map to explore our local centers and programs.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 5. Our Village Programs ━━━━━━━━━━━━━━━━━━━━ */}
      <section id="programs" className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Our Programs"
            title="Bringing devotion to every doorstep"
            description="A comprehensive array of initiatives designed to uplift and unite village communities."
            align="center"
          />
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {programs.map((prog) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.title}
                  variants={iv}
                  whileHover={rm ? {} : { y: -6 }}
                  className="group rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.5)] backdrop-blur-xl transition duration-500 hover:border-[#e67e22]/60 hover:shadow-[0_28px_70px_-34px_rgba(230,126,34,0.3)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e67e22]/10 text-[#e67e22] transition-colors group-hover:bg-[#e67e22] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-[#2a1b22]">{prog.title}</h3>
                  <p className="mt-3 text-sm text-[#4b4246]">{prog.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 6. Naam Hatta Network ━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="network" className="relative overflow-hidden bg-[#1e4620] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f1c40f]">Naam Hatta Network</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl">
            Every Village a Spiritual Community
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base text-white/80 lg:text-lg">
            The Naam Hatta (Marketplace of the Holy Name) model empowers local villagers to create their own devotional communities through regular kirtan, study, association, and service. It is a decentralized, grassroots movement spreading spiritual joy.
          </p>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="border border-white/20 bg-white/5 rounded-3xl p-8 backdrop-blur-md">
              <Users className="mx-auto h-10 w-10 text-[#f1c40f]" />
              <h3 className="mt-4 text-2xl font-display font-semibold">Local Leadership</h3>
              <p className="mt-3 text-sm text-white/70">Empowering villagers to lead and sustain their own weekly spiritual gatherings.</p>
            </div>
            <div className="border border-white/20 bg-white/5 rounded-3xl p-8 backdrop-blur-md">
              <BookOpen className="mx-auto h-10 w-10 text-[#f1c40f]" />
              <h3 className="mt-4 text-2xl font-display font-semibold">Systematic Study</h3>
              <p className="mt-3 text-sm text-white/70">Structured modules for studying Bhagavad-gita and Srimad Bhagavatam.</p>
            </div>
            <div className="border border-white/20 bg-white/5 rounded-3xl p-8 backdrop-blur-md">
              <Music className="mx-auto h-10 w-10 text-[#f1c40f]" />
              <h3 className="mt-4 text-2xl font-display font-semibold">Joyful Kirtan</h3>
              <p className="mt-3 text-sm text-white/70">The heart of the program—congregational chanting that purifies the atmosphere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 7. Bhakti Riksha & House Programs ━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="House Programs"
            title="Bringing devotion into the home"
            description="Bhakti Riksha groups turn everyday homes into vibrant spiritual sanctuaries."
            align="center"
          />
          <div className="mt-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-[#e67e22]/20">
                <img src="/village/V3.jpeg" alt="House program gathering" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A1F2D]/60 via-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-display text-xl">A typical Friday evening house program in Khurda.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#e67e22]/10 text-[#e67e22]">
                  <span className="font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2a1b22]">Small-Group Dynamics</h3>
                  <p className="mt-2 text-[#4b4246]">Intimate gatherings of 10-15 people allow for personal care, mentorship, and deep relationships to form.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#e67e22]/10 text-[#e67e22]">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2a1b22]">Interactive Discussions</h3>
                  <p className="mt-2 text-[#4b4246]">Instead of lectures, participants discuss how spiritual philosophy applies to their daily struggles and family life.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#e67e22]/10 text-[#e67e22]">
                  <span className="font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2a1b22]">Family Participation</h3>
                  <p className="mt-2 text-[#4b4246]">Entire families—from grandparents to toddlers—participate together, creating a unified spiritual culture at home.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ 8. Festivals in Villages ━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Festivals"
            title="Grand celebrations of devotion"
            description="Festivals bring the entire village together in joyful celebration and cultural expression."
            align="center"
          />
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {festivals.map((fest) => (
              <motion.article
                key={fest.title}
                variants={iv}
                className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-3xl bg-[#1f1117] text-white shadow-[0_26px_70px_-45px_rgba(18,9,12,0.85)] transition duration-500 hover:-translate-y-1"
              >
                <img
                  src={fest.image}
                  alt={fest.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A1F2D]/90 via-black/40 to-black/10 transition duration-500 group-hover:from-[#4A1F2D]" />
                <div className="relative z-10 p-6 sm:p-7 text-center">
                  <h3 className="font-display text-xl font-semibold text-white tracking-wide">{fest.title}</h3>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 9. Children & Youth Development ━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(230,126,34,0.1),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#e67e22]">Next Generation</p>
            <h2 className="mt-4 font-display text-3xl text-[#2a1b22] sm:text-4xl">
              Children & Youth Development
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#3b3237]">
              Cultivating character, culture, and devotion in the hearts of the youth through engaging and joyful activities.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {youthPrograms.map((yp) => {
              const Icon = yp.icon;
              return (
                <motion.div
                  key={yp.title}
                  variants={iv}
                  whileHover={rm ? {} : { scale: 1.02 }}
                  className="flex items-center gap-4 rounded-2xl border border-[#e67e22]/20 bg-[#F8F5EF] p-5 shadow-sm transition duration-300 hover:border-[#e67e22]/60 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#e67e22] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-[#2a1b22]">{yp.title}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 10. Transformation Stories ━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Transformation Stories"
            title="Voices from the villages"
            description="Real stories of impact and cultural revival from community members."
          />
          <div className="mt-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={24}
              breakpoints={{ 640: { slidesPerView: 1 }, 900: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="pb-12" // Padding for pagination dots
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="h-full rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl">
                    <MessageSquareQuote className="h-8 w-8 text-[#e67e22]" />
                    <p className="mt-6 text-sm leading-relaxed text-[#4b4246] italic">"{t.quote}"</p>
                    <div className="mt-8 flex items-center gap-4">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-14 w-14 rounded-full object-cover border-2 border-[#e67e22]/30"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#2a1b22]">{t.name}</p>
                        <p className="text-xs text-[#e67e22]">{t.role}</p>
                        <p className="text-[10px] uppercase tracking-wider text-[#4b4246] mt-1">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ━━ 11. Outreach Gallery ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Gallery"
            title="Glimpses of village devotion"
            description="Joyful moments captured during our various outreach programs."
            align="center"
          />
          <div className="mt-12">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {galleryItems.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setLightbox(img)}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.3)] bg-[#F8F5EF]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-4 left-4 text-left opacity-0 transition group-hover:opacity-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e67e22]">
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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm"
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
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#1b0c13] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto max-h-[80vh] object-contain" />
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-black/80 transition"
                  aria-label="Close gallery"
                >
                  Close
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#e67e22]">
                  {lightbox.category}
                </p>
                <p className="mt-2 text-base text-white/90">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━ 12. Upcoming Village Events ━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Upcoming Events"
            title="Join our next village gathering"
            description="Participate in festivals and grand harinama programs."
          />
          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-3"
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
                className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#e67e22]/60"
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e67e22]">
                  <Calendar className="h-4 w-4" />
                  {ev.date}
                </div>
                <h3 className="mt-5 text-xl font-display font-semibold text-[#2a1b22] leading-tight">{ev.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#4A1F2D]">
                  <MapPin className="h-4 w-4" />
                  {ev.village}
                </div>
                <p className="mt-4 text-sm text-[#4b4246]">{ev.details}</p>
                <a
                  href="/programs#register"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border-2 border-[#e67e22] bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e67e22] transition duration-300 hover:bg-[#e67e22] hover:text-white"
                >
                  Participate
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 13. FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-white py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions about village outreach"
            description="Learn how you can get involved or start a program in your area."
            align="center"
          />
          <div className="mt-12 grid gap-4">
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

      {/* ━━ 14. Support Village Outreach (CTA) ━━━━━━━━━ */}
      <section id="support" className="parchment-bg relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,126,34,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#4A1F2D]">Support The Cause</p>
          <h2 className="mt-5 font-display text-4xl text-[#2a1b22] sm:text-5xl">
            Help Bring Spiritual Culture to Every Village
          </h2>
          <p className="mx-auto mt-6 text-lg text-[#4b4246] leading-relaxed">
            Support our efforts to strengthen devotional communities through spiritual education, festivals, outreach programs, and cultural activities. Your participation makes a profound difference.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <a
              href="/donate"
              className="rounded-full bg-[#e67e22] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#e67e22]/30"
            >
              Support Village Outreach
            </a>
            <a
              href="#volunteer"
              className="rounded-full border-2 border-[#4A1F2D] bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#4A1F2D] transition hover:bg-[#4A1F2D] hover:text-white"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>


    </main>
  );
};

export default VillageOutreach;
