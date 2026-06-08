import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Heart,
  Home,
  Leaf,
  MapPin,
  Quote,
  Sparkles,
  Star,
  Sun,
  Users,
  Utensils,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const stats = [
  { label: "Students reached", value: 5000, suffix: "+" },
  { label: "Active participants", value: 500, suffix: "+" },
  { label: "Programs conducted annually", value: 100, suffix: "+" },
  { label: "Student leaders", value: 20, suffix: "+" },
  { label: "Major festivals every year", value: 12, suffix: "+" },
];

const colleges = [
  { name: "IIT Bhubaneswar", badge: "IIT" },
  { name: "NISER", badge: "NISER" },
  { name: "Centurion University", badge: "CU" },
  { name: "ITER", badge: "ITER" },
  { name: "OUTR", badge: "OUTR" },
  { name: "AIIMS Bhubaneswar", badge: "AIIMS" },
  { name: "Jatni Colleges", badge: "JATNI" },
];

const programs = [
  {
    title: "Bhagavad-gita study circles",
    description: "Interactive groups that explore timeless wisdom and personal application.",
    icon: BookOpen,
  },
  {
    title: "Weekly satsanga",
    description: "Music, kirtan, and discussion for a calm and grounded week.",
    icon: Sun,
  },
  {
    title: "Mentorship & counselling",
    description: "Guided support for academics, wellbeing, and life direction.",
    icon: Heart,
  },
  {
    title: "Hostel programs",
    description: "On-campus gatherings that build community and spiritual habits.",
    icon: Home,
  },
  {
    title: "Campus festivals",
    description: "Vibrant celebrations that bring culture, joy, and connection.",
    icon: Star,
  },
  {
    title: "Youth retreats",
    description: "Immersive weekends focused on reflection, service, and growth.",
    icon: Leaf,
  },
  {
    title: "Leadership development",
    description: "Practical training in values-based leadership and service.",
    icon: Users,
  },
  {
    title: "Prasadam distribution",
    description: "Nutritious sanctified meals shared with love and care.",
    icon: Utensils,
  },
];

const benefits = [
  "Clarity of purpose",
  "Stress management",
  "Meaningful friendships",
  "Leadership skills",
  "Better decision making",
  "Balanced lifestyle",
  "Character development",
  "Spiritual growth",
];

const galleryItems = [
  { id: 2, src: "/bgclass.png", alt: "Bhagavad-gita class", category: "Study circles" },
  { id: 3, src: "/prasaddistribute.png", alt: "Prasadam distribution", category: "Seva" },
  { id: 4, src: "/festival.png", alt: "Campus festival celebration", category: "Festivals" },
  { id: 5, src: "/mentorship.png", alt: "Mentoring session", category: "Mentorship" },
  { id: 6, src: "/villageoutreach.png", alt: "Village outreach", category: "Outreach" },
  { id: 10, src: "/arati.png", alt: "Aarti ceremony", category: "Devotion" },
  { id: 11, src: "/prasadameating.png", alt: "Students sharing prasadam", category: "Prasadam" },
  { id: 12, src: "/deities.png", alt: "Temple visit", category: "Darshan" },
  { id: 12, src: "/lib.png", alt: "Temple visit", category: "Darshan" },
  { id: 12, src: "/media/media16.png", alt: "Temple visit", category: "Prasadam" },
  { id: 12, src: "/media/media60.png", alt: "Temple visit", category: "Study circles" },
  { id: 12, src: "/media/media68.png", alt: "Temple visit", category: "Study circles" },
];

const testimonials = [
  {
    name: "Ananya Sharma",
    college: "IIT Bhubaneswar",
    quote:
      "The study circles helped me manage stress and find clarity during a demanding semester.",
    photo: "/media/media12.png",
  },
  {
    name: "Rohit Das",
    college: "NISER",
    quote:
      "The community here is warm and focused. I found mentors who genuinely care.",
    photo: "/media/media60.png",
  },
  {
    name: "Sneha Patel",
    college: "AIIMS Bhubaneswar",
    quote:
      "Satsanga evenings keep me grounded and inspired for the week ahead.",
    photo: "/media/media45.png",
  },
  {
    name: "Arjun Rao",
    college: "Centurion University",
    quote:
      "The retreats and leadership sessions gave me direction and confidence.",
    photo: "/media/media13.png",
  },
];

const upcomingPrograms = [
  {
    title: "Gita discovery circle",
    date: "June 18, 2026",
    venue: "IIT Bhubaneswar, Humanities Block",
  },
  {
    title: "Satsanga and kirtan night",
    date: "June 25, 2026",
    venue: "NISER Campus Auditorium",
  },
  {
    title: "Youth retreat weekend",
    date: "July 12, 2026",
    venue: "ISKCON Bhubaneswar Retreat Center",
  },
];

const faqItems = [
  {
    question: "Who can attend?",
    answer:
      "Any student or young professional who wants to explore personal growth and spiritual wisdom is welcome.",
  },
  {
    question: "Is there any fee?",
    answer:
      "Most programs are free. Some retreats may have a minimal contribution for travel and meals.",
  },
  {
    question: "Do I need prior knowledge of Bhagavad-gita?",
    answer: "No. Sessions are beginner-friendly and guided by mentors.",
  },
  {
    question: "How can I join?",
    answer:
      "Use the Join a Program button or contact the coordinator to receive the latest schedule.",
  },
  {
    question: "Are programs conducted on campus?",
    answer: "Yes, we hold sessions across multiple campuses every week.",
  },
];

const galleryBreakpoints = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

const useCountUp = (target, start, reduceMotion, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let animationFrame = 0;
    let startTime;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, reduceMotion, start, target]);

  return value;
};

const SectionHeader = ({ eyebrow, title, description, align = "left" }) => {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`space-y-4 ${alignment}`}>
      {eyebrow ? (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            {eyebrow}
          </span>
          <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-[#3b3237] sm:text-lg">
          {description}
        </p>
      ) : null}
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
      className="rounded-2xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_26px_70px_-34px_rgba(74,31,45,0.55)]"
    >
      <p className="text-3xl font-semibold text-[#D4AF37] sm:text-4xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#4b4246]">
        {stat.label}
      </p>
    </motion.div>
  );
};

const ProgramCard = ({ program }) => {
  const Icon = program.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.5)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_28px_70px_-34px_rgba(74,31,45,0.55)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#2a1b22]">
        {program.title}
      </h3>
      <p className="mt-3 text-sm text-[#4b4246]">
        {program.description}
      </p>

    </motion.div>
  );
};

const CollegeCard = ({ college }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_26px_70px_-34px_rgba(74,31,45,0.55)]"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-white text-xs font-semibold text-[#D4AF37]">
      {college.badge}
    </div>
    <div>
      <p className="text-base font-semibold text-[#2a1b22]">{college.name}</p>
      <p className="text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/60">Campus</p>
    </div>
  </motion.div>
);

const BenefitCard = ({ benefit }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-2xl border border-white/70 bg-white/80 p-5 text-left shadow-[0_16px_40px_-28px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_26px_70px_-34px_rgba(74,31,45,0.55)]"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
      <Sparkles className="h-5 w-5" />
    </div>
    <p className="mt-4 text-sm font-semibold text-[#2a1b22]">{benefit}</p>
  </motion.div>
);

const EventCard = ({ event }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60 hover:shadow-[0_26px_70px_-34px_rgba(74,31,45,0.55)]"
  >
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
      <Calendar className="h-4 w-4" />
      {event.date}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-[#2a1b22]">{event.title}</h3>
    <div className="mt-3 flex items-center gap-2 text-sm text-[#4b4246]">
      <MapPin className="h-4 w-4" />
      {event.venue}
    </div>
    <button
      type="button"
      className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#D4AF37]/60 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition duration-300 hover:shadow-[0_12px_28px_-18px_rgba(212,175,55,0.7)]"
    >
      Register
    </button>
  </motion.div>
);

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="rounded-2xl border border-white/70 bg-white/80 p-5 backdrop-blur-xl transition duration-300 hover:border-[#D4AF37]/40">
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="flex w-full items-center justify-between text-left"
    >
      <span className="text-sm font-semibold text-[#2a1b22]">{item.question}</span>
      <ChevronDown className={`h-4 w-4 text-[#D4AF37] transition ${isOpen ? "rotate-180" : ""}`} />
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

const StudentOutreach = () => {
  const reduceMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <main>
      {/* ── Hero (stays dark — background image overlay, same as home Hero) ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/guidance-2.png"
            alt="Students attending a spiritual gathering"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#12070c]/95 via-[#2a0f17]/85 to-[#12070c]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.25),_transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 pb-16 pt-32 lg:px-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]"
          >
            Student outreach
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-3xl font-display text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Empowering Students Through Timeless Wisdom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Helping students discover purpose, character, leadership, and spiritual growth
            through the teachings of Bhagavad-gita.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#programs"
              className="rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
            >
              Join a program
            </a>
            <a
              href="#join"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
            >
              Contact us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 overflow-hidden bg-[#F8F5EF] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Impact"
            title="Students inspired across campuses"
            description="A glimpse of the spiritual and leadership impact created through our outreach."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Student Outreach ── */}
      <section id="programs" className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="About student outreach"
              title="Guiding students toward inner strength"
              description="College life is a period of learning, growth, and important life decisions. Through our student outreach initiatives, we provide mentorship, spiritual wisdom, positive association, and opportunities for holistic development. Our aim is to help students excel academically while cultivating strong values and inner fulfillment."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_26px_70px_-45px_rgba(31,23,28,0.6)]"
          >
            <img
              src="/prasadameating.png"
              alt="Students sharing prasadam"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Colleges We Serve ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Colleges we serve"
            title="Rooted in every campus"
            description="We partner with student communities across Odisha to create a nurturing spiritual ecosystem."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard key={college.name} college={college} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Programs ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Our programs"
            title="Designed for growth and connection"
            description="Every program is crafted to blend wisdom, relationships, and meaningful experiences."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Why students join us"
            title="Benefits that stay for life"
            description="Students discover practical tools for success, wellbeing, and spiritual depth."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Gallery"
            title="Moments of joy and service"
            description="Student gatherings, festivals, retreats, kirtans, and prasadam distribution."
          />
          <div className="mt-10">
            <Masonry
              breakpointCols={galleryBreakpoints}
              className="flex gap-4"
              columnClassName="space-y-4"
            >
              {galleryItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLightbox(item)}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.5)]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 text-left opacity-0 transition group-hover:opacity-100">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/90">
                      {item.category}
                    </p>
                  </div>
                </button>
              ))}
            </Masonry>
          </div>
        </div>
      </section>

      {/* ── Lightbox (stays dark — modal overlay) ── */}
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
              onClick={(event) => event.stopPropagation()}
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

      {/* ── Testimonials ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Testimonials"
            title="Voices from our student community"
            description="Stories of growth, friendship, and inspiration."
          />
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 1 },
                900: { slidesPerView: 2 },
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.name}>
                  <div className="h-full rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl">
                    <Quote className="h-8 w-8 text-[#D4AF37]" />
                    <p className="mt-4 text-sm text-[#4b4246]">{testimonial.quote}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <img
                        src={testimonial.photo}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2a1b22]">{testimonial.name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/60">
                          {testimonial.college}
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

      {/* ── Upcoming Programs ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Upcoming programs"
            title="Join the next experience"
            description="Reserve your spot in our upcoming student gatherings."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {upcomingPrograms.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — Join the Movement ── */}
      <section id="join" className="parchment-bg py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
          <p className="text-xs uppercase tracking-[0.4em] text-white/90">Join the movement</p>
          <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
            Begin Your Journey of Growth and Purpose
          </h2>
          <p className="mt-5 text-base text-white/85">
            Whether you are searching for answers, meaningful friendships, personal growth, or
            spiritual wisdom, we warmly invite you to become part of our student community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#programs"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-16px_rgba(0,0,0,0.45)]"
            >
              Join our community
            </a>
            <a
              href="#faq"
              className="rounded-full border border-white/40 bg-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/25"
            >
              Contact coordinator
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions students often ask"
            description="Everything you need to know before you join."
          />
          <div className="mt-10 grid gap-4">
            {faqItems.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openFaqIndex === index}
                onToggle={() =>
                  setOpenFaqIndex((prev) => (prev === index ? null : index))
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer Motto ── */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/2 h-48 w-48 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Student life</p>
          <h2 className="font-display text-2xl font-semibold text-[#2a1b22] sm:text-3xl">
            Come for the wisdom. Stay for the friendships. Grow for a lifetime.
          </h2>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#4b4246]">
            <span>Love</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Service</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Community</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudentOutreach;
