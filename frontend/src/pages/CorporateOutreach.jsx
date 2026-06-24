import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Flame,
  GraduationCap,
  HandHeart,
  Heart,
  Landmark,
  Lightbulb,
  MapPin,
  MessageSquareQuote,
  Microscope,
  Rocket,
  Scale,
  Shield,
  Sparkles,
  Target,
  TreePine,
  Users,
  Zap,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

/* ───────────────────────── Data ───────────────────────── */

const stats = [
  { label: "Corporate Houses Reached", value: 100, suffix: "+" },
  { label: "Professionals Engaged", value: 10000, suffix: "+" },
  { label: "Corporate Sessions Conducted", value: 500, suffix: "+" },
  { label: "Leadership Workshops", value: 50, suffix: "+" },
  { label: "Annual Corporate Retreats", value: 20, suffix: "+" },
];

const industries = [
  { name: "Manufacturing Industries", icon: Building2 },
  { name: "IT Companies", icon: Brain },
  { name: "Educational Institutions", icon: GraduationCap },
  { name: "Healthcare Organizations", icon: Heart },
  { name: "Government Departments", icon: Landmark },
  { name: "Startups", icon: Rocket },
  { name: "Research Organizations", icon: Microscope },
  { name: "Corporate Offices", icon: Briefcase },
];

const programs = [
  {
    title: "Leadership Through Bhagavad-gita",
    description:
      "Timeless leadership lessons drawn from ancient wisdom, adapted for modern corporate life.",
    icon: BookOpen,
  },
  {
    title: "Workplace Wellness Programs",
    description:
      "Holistic wellbeing initiatives covering physical, mental, and spiritual health at work.",
    icon: Heart,
  },
  {
    title: "Stress Management Workshops",
    description:
      "Practical techniques for managing workplace stress, building resilience, and staying centred.",
    icon: Brain,
  },
  {
    title: "Ethics & Values in Leadership",
    description:
      "Developing integrity, accountability, and value-driven decision-making across teams.",
    icon: Scale,
  },
  {
    title: "Mindfulness & Meditation Sessions",
    description:
      "Guided meditation and mindfulness practices to enhance focus, clarity, and calm.",
    icon: Sparkles,
  },
  {
    title: "Work-Life Balance Seminars",
    description:
      "Strategies to harmonise professional ambition with personal fulfilment and family life.",
    icon: Target,
  },
  {
    title: "Employee Engagement Programs",
    description:
      "Interactive sessions that boost motivation, loyalty, and a sense of purpose at work.",
    icon: Users,
  },
  {
    title: "Team Building Retreats",
    description:
      "Immersive retreats designed to strengthen trust, collaboration, and team spirit.",
    icon: HandHeart,
  },
  {
    title: "Executive Coaching Sessions",
    description:
      "One-on-one coaching grounded in wisdom principles for senior leaders and managers.",
    icon: Award,
  },
  {
    title: "Corporate Spiritual Retreats",
    description:
      "Multi-day immersive experiences combining reflection, leadership, and spiritual insight.",
    icon: TreePine,
  },
];

const challenges = [
  { label: "Workplace Stress", icon: Zap },
  { label: "Burnout Prevention", icon: Flame },
  { label: "Leadership Development", icon: Award },
  { label: "Employee Motivation", icon: Lightbulb },
  { label: "Ethical Decision Making", icon: Scale },
  { label: "Team Harmony", icon: Users },
  { label: "Mental Well-being", icon: Brain },
  { label: "Purpose-Driven Leadership", icon: Target },
];

const wisdomPrinciples = [
  {
    principle: "Selfless Leadership",
    verse: "BG 3.25",
    text: "A true leader acts for the welfare of others, not for personal gain.",
  },
  {
    principle: "Equanimity Under Pressure",
    verse: "BG 2.48",
    text: "Perform your duty with steadiness, undisturbed by success or failure.",
  },
  {
    principle: "Integrity in Action",
    verse: "BG 18.45",
    text: "Excellence comes from wholehearted commitment and devotion to one's work.",
  },
  {
    principle: "Resilience & Detachment",
    verse: "BG 2.47",
    text: "Focus on the quality of your effort, not the anxiety of outcomes.",
  },
];

const retreats = [
  {
    title: "One-Day Retreats",
    description:
      "Intensive single-day programmes covering leadership, mindfulness, and team alignment.",
    image: "/corporate/P15.jpeg",
  },
  {
    title: "Weekend Leadership Retreats",
    description:
      "Two-day immersive experiences blending wisdom, reflection, and practical leadership skills.",
    image: "/corporate/P16.jpeg",
  },
  {
    title: "Wellness Retreats",
    description:
      "Programmes focused on physical and mental restoration through yoga, meditation, and nature.",
    image: "/corporate/P17.jpeg",
  },
  {
    title: "Executive Reflection Programs",
    description:
      "Quiet, structured programmes for senior executives seeking clarity and renewed purpose.",
    image: "/corporate/P19.jpeg",
  },
  {
    title: "Spiritual Leadership Immersions",
    description:
      "Deep-dive multi-day programmes exploring the intersection of spirituality and leadership.",
    image: "/corporate/P20.jpeg",
  },
];

const testimonials = [
  {
    name: "Rajesh Mehta",
    designation: "VP Engineering",
    organization: "TechServe India",
    quote:
      "The leadership workshop transformed how our managers approach conflict resolution and team motivation.",
    photo: "/corporate/P22.jpeg",
  },
  {
    name: "Priya Sharma",
    designation: "HR Director",
    organization: "InfraBuild Corp",
    quote:
      "Our employee engagement scores improved significantly after the wellness and mindfulness programme.",
    photo: "/corporate/P23.jpeg",
  },
  {
    name: "Anil Patnaik",
    designation: "CEO",
    organization: "GreenTech Solutions",
    quote:
      "The Bhagavad-gita leadership sessions gave our leadership team a shared language for values and ethics.",
    photo: "/corporate/P24.jpeg",
  },
  {
    name: "Sunita Rao",
    designation: "COO",
    organization: "MediCare Plus",
    quote:
      "The corporate retreat was a turning point for our senior management—deeply insightful and practical.",
    photo: "/corporate/P25.jpeg",
  },
];

const galleryItems = [
  { id: 1, src: "/corporate/P1.jpeg", alt: "Leadership seminar", category: "Seminars" },
  { id: 2, src: "/corporate/P2.jpeg", alt: "Corporate workshop", category: "Workshops" },
  { id: 3, src: "/corporate/P3.jpeg", alt: "Wellness session", category: "Wellness" },
  { id: 4, src: "/corporate/P4.jpeg", alt: "Corporate retreat", category: "Retreats" },
  { id: 5, src: "/corporate/P5.jpeg", alt: "Executive discussion", category: "Discussions" },
  { id: 6, src: "/corporate/P6.jpeg", alt: "Industrial outreach", category: "Outreach" },
  { id: 7, src: "/corporate/P7.jpeg", alt: "Team building activity", category: "Team Building" },
  { id: 8, src: "/corporate/P9.jpeg", alt: "Meditation session", category: "Meditation" },
  { id: 9, src: "/corporate/P10.jpeg", alt: "Leadership workshop", category: "Workshops" },
  { id: 10, src: "/corporate/P11.jpeg", alt: "Executive coaching", category: "Coaching" },
  { id: 11, src: "/corporate/P12.jpeg", alt: "Corporate gathering", category: "Gatherings" },
  { id: 12, src: "/corporate/P14.jpeg", alt: "Value-based leadership talk", category: "Seminars" },
];

const processSteps = [
  {
    step: 1,
    title: "Connect With Us",
    description: "Reach out through our enquiry form, email, or phone to begin the conversation.",
    icon: Users,
  },
  {
    step: 2,
    title: "Needs Assessment",
    description:
      "We understand your organisational goals, culture, and specific challenges through detailed discussion.",
    icon: Target,
  },
  {
    step: 3,
    title: "Customized Program Design",
    description:
      "Our team designs a tailored programme aligned with your objectives, team size, and schedule.",
    icon: Lightbulb,
  },
  {
    step: 4,
    title: "Workshop Delivery & Follow-up",
    description:
      "We deliver the programme, gather feedback, and offer follow-up support for lasting impact.",
    icon: CheckCircle2,
  },
];

const upcomingEvents = [
  {
    title: "Leadership Through Wisdom Summit",
    speaker: "HG Chaitanya Charan Das",
    date: "July 20, 2026",
    venue: "KIIT Convention Centre, Bhubaneswar",
  },
  {
    title: "Corporate Wellness Workshop",
    speaker: "Dr. Anand Rao",
    date: "August 8, 2026",
    venue: "TCS Campus, Bhubaneswar",
  },
  {
    title: "Executive Reflection Retreat",
    speaker: "HG Gauranga Prabhu",
    date: "September 5–7, 2026",
    venue: "ISKCON Retreat Centre, Puri",
  },
];

const faqItems = [
  {
    question: "Can organizations request customized workshops?",
    answer:
      "Yes. Every programme is designed around your organization's specific goals, challenges, and culture. We work closely with your team during the needs assessment phase.",
  },
  {
    question: "Are programs suitable for all faith backgrounds?",
    answer:
      "Absolutely. Our programmes are universal, practical, and rooted in timeless wisdom that transcends religious boundaries. Participants from all backgrounds have found them valuable.",
  },
  {
    question: "Can sessions be conducted onsite?",
    answer:
      "Yes, we conduct sessions at your office, campus, or preferred venue. We also offer programmes at our retreat centres for immersive experiences.",
  },
  {
    question: "Do you offer leadership retreats?",
    answer:
      "We offer a range of retreats—from one-day intensives to weekend leadership immersions—designed for executives and managers seeking depth and clarity.",
  },
  {
    question: "How long are corporate programs?",
    answer:
      "Programmes range from 90-minute talks to multi-day retreats. Duration is customized based on your goals and schedule.",
  },
];

const galleryBreakpoints = { default: 4, 1280: 3, 1024: 2, 640: 1 };

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
  <div className="pointer-events-none absolute inset-0">
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

const CorporateOutreach = () => {
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
      <section className="relative overflow-hidden" aria-label="Corporate Outreach hero">
        <div className="absolute inset-0">
          <img
            src="/corporate/P3.jpeg"
            alt="Corporate leadership seminar"
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
            Corporate outreach
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-3xl font-display text-4xl text-white sm:text-5xl lg:text-6xl"
          >
            Transforming Workplaces Through Timeless Wisdom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg"
          >
            Helping organizations cultivate leadership, ethics, well-being, and purpose through
            practical spiritual wisdom.
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
              Request a Corporate Program
            </a>
            <a
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
            >
              Partner With Us
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
            title="Trusted by organizations across sectors"
            description="Our corporate programmes have reached thousands of professionals and leaders."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} reduceMotion={rm} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 3. About Corporate Outreach ━━━━━━━━━━━━━━━━━━ */}
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
                eyebrow="About Corporate Outreach"
                title="Building healthier, purpose-driven workplaces"
                description="Modern workplaces face increasing challenges related to stress, burnout, employee engagement, ethics, and work-life balance. Through leadership seminars, wellness programmes, and wisdom-based discussions, ISKCON IIT Centre helps organizations foster healthier, more purposeful, and value-driven work cultures."
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
              src="/corporate/P5.jpeg"
              alt="Corporate workshop in progress"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ━━ 4. Industries & Organizations Served ━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Across sectors, a shared need for purpose"
            description="We partner with diverse organizations to bring values-based development to every workplace."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {industries.map((ind) => {
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

      {/* ━━ 5. Our Corporate Programs ━━━━━━━━━━━━━━━━━━━━ */}
      <section id="programs" className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Our Programs"
            title="Tailored for transformation"
            description="Every programme blends ancient wisdom with contemporary corporate needs."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
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

      {/* ━━ 6. Key Challenges We Address ━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Challenges We Address"
            title="The workplace issues that matter most"
            description="Our programmes directly target the core challenges modern organisations face every day."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {challenges.map((ch) => {
              const Icon = ch.icon;
              return (
                <motion.div
                  key={ch.label}
                  variants={iv}
                  whileHover={rm ? {} : { y: -4 }}
                  className="rounded-2xl border border-white/70 bg-white/80 p-5 text-left shadow-[0_16px_40px_-28px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white text-[#D4AF37]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#2a1b22]">{ch.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 7. Leadership Wisdom ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="parchment-bg relative py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#4A1F2D]">Wisdom for Leaders</p>
            <h2 className="mt-4 font-display text-3xl text-[#2a1b22] sm:text-4xl">
              Ancient Wisdom for Modern Leadership
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-[#3b3237]">
              Practical lessons from the Bhagavad-gita on leadership, decision-making, resilience,
              responsibility, integrity, and emotional intelligence.
            </p>
          </div>

          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {wisdomPrinciples.map((w) => (
              <motion.div
                key={w.principle}
                variants={iv}
                className="rounded-2xl border border-white/50 bg-white/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition duration-500 hover:bg-white/40"
              >
                <MessageSquareQuote className="h-7 w-7 text-[#4A1F2D]" />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#2a1b22]">{w.principle}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4b4246]">{w.text}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D]">{w.verse}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 8. Corporate Retreats & Executive Experiences ━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Retreats & Experiences"
            title="Immersive programmes for lasting impact"
            description="Executive retreats designed for deep reflection, renewal, and leadership growth."
            align="center"
          />
          <motion.div
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {retreats.map((r) => (
              <motion.article
                key={r.title}
                variants={iv}
                className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl bg-[#1f1117] text-white shadow-[0_26px_70px_-45px_rgba(18,9,12,0.85)] transition duration-500 hover:-translate-y-1 sm:min-h-[320px]"
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
                <div className="relative z-10 p-6 sm:p-7">
                  <h3 className="font-display text-base text-white sm:text-lg">{r.title}</h3>
                  <p className="mt-1.5 text-xs text-white/75 sm:text-sm">{r.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━ 9. Testimonials ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Testimonials"
            title="What leaders are saying"
            description="Feedback from executives and HR professionals who've experienced our programmes."
          />
          <div className="mt-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
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
                        <p className="text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/60">
                          {t.organization}
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

      {/* ━━ 10. Corporate Gallery ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Gallery"
            title="Moments of leadership and learning"
            description="Seminars, workshops, wellness sessions, retreats, and executive discussions."
          />
          <div className="mt-10">
            <Masonry
              breakpointCols={galleryBreakpoints}
              className="flex gap-4"
              columnClassName="space-y-4"
            >
              {galleryItems.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setLightbox(img)}
                  className="group relative overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.5)]"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
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
            </Masonry>
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

      {/* ━━ 11. Corporate Engagement Process ━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="How It Works"
            title="Your journey with us"
            description="A streamlined four-step process from initial contact to programme delivery."
            align="center"
          />
          <motion.div
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {processSteps.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  variants={iv}
                  className="relative rounded-2xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                    Step {s.step}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-[#2a1b22]">{s.title}</h3>
                  <p className="mt-3 text-sm text-[#4b4246]">{s.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━ 12. Upcoming Corporate Events ━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="Upcoming Events"
            title="Join the next corporate experience"
            description="Reserve your spot in our upcoming leadership and wellness programmes."
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

      {/* ━━ 13. FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-20">
        <SectionOrbs />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions organizations often ask"
            description="Everything you need to know before partnering with us."
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


      {/* ━━ 15. Footer Banner ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden bg-[#F8F5EF] py-16">
        <SectionOrbs />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            Corporate Excellence
          </p>
          <h2 className="font-display text-2xl font-semibold text-[#2a1b22] sm:text-3xl">
            Organizations thrive when leadership is guided by wisdom, integrity, and purpose.
          </h2>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#4b4246]">
            <span>Wisdom</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Integrity</span>
            <span className="h-px w-8 bg-[#D4AF37]/60" />
            <span>Purpose</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CorporateOutreach;
