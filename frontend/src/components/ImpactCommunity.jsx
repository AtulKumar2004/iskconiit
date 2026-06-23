import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";

const collageImages = [
  {
    src: "/bgclass.png",
    alt: "Students in a Gita class discussion",
    className: "lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:row-span-4",
  },
  {
    src: "/kirtan-2.png",
    alt: "Kirtan gathering with students",
    className: "lg:col-start-5 lg:col-span-2 lg:row-start-1 lg:row-span-2",
  },
  {
    src: "/prasaddistribute.png",
    alt: "Prasadam distribution with students",
    className: "lg:col-start-1 lg:col-span-3 lg:row-start-5 lg:row-span-3",
  },
  {
    src: "/festival.png",
    alt: "Festival celebrations",
    className: "lg:col-start-5 lg:col-span-2 lg:row-start-3 lg:row-span-2",
  },
  {
    src: "/mentorship.png",
    alt: "Mentorship and community discussion",
    className: "lg:col-start-4 lg:col-span-3 lg:row-start-5 lg:row-span-3",
  },
  {
    src: "/villageoutreach.png",
    alt: "Outreach activity",
    className: "lg:col-start-1 lg:col-span-4 lg:row-start-8 lg:row-span-3",
  },
];

const stats = [
  {
    id: "students-reached",
    value: 5000,
    suffix: "+",
    label: "Students Reached",
    text: "Connecting students with timeless wisdom and spiritual culture.",
    icon: "students",
  },
  {
    id: "weekly-participants",
    value: 100,
    suffix: "+",
    label: "Weekly Participants",
    text: "Students regularly attending kirtans, classes, and gatherings.",
    icon: "participants",
  },
  {
    id: "events-conducted",
    value: 50,
    suffix: "+",
    label: "Events Conducted",
    text: "Festivals, retreats, workshops, and spiritual programs every year.",
    icon: "events",
  },
  {
    id: "prasadam-served",
    value: 1000,
    suffix: "+",
    label: "Plates of Prasadam Served",
    text: "Sharing sanctified vegetarian meals with love and community.",
    icon: "prasadam",
  },
  {
    id: "active-volunteers",
    value: 20,
    suffix: "+",
    label: "Active Volunteers",
    text: "Dedicated students and devotees helping organize programs and outreach.",
    icon: "volunteers",
  },
];

const icons = {
  students: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M7 13c-2.2 0-4 1.5-4 3.3V18h8v-1.7C11 14.5 9.2 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15 12.5c1.8 0 3.3 1.1 3.7 2.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15 10.5a2.5 2.5 0 1 0 0-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  participants: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M4 18v-1.5C4 14.6 5.8 13 8 13h8c2.2 0 4 1.6 4 3.5V18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  events: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M6 4v3M18 4v3M4 9h16M6 13h4m-4 4h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="6"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
  prasadam: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 12c0 4 3 7 6 7s6-3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 9c1.5-2 2.7-2.5 4-2.5s2.5.5 4 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  volunteers: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M12 20s-7-4.2-7-9.3C5 8 7 6 9.5 6c1.4 0 2.7.7 3.5 1.9C13.8 6.7 15.1 6 16.5 6 19 6 21 8 21 10.7 21 15.8 14 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const tinyIcons = {
  students: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#D4AF37]/80">
      <path
        d="M7 13c-2.2 0-4 1.5-4 3.3V18h8v-1.7C11 14.5 9.2 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M15 12.5c1.8 0 3.3 1.1 3.7 2.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15 10.5a2.5 2.5 0 1 0 0-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  participants: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#D4AF37]/80">
      <path
        d="M4 18v-1.5C4 14.6 5.8 13 8 13h8c2.2 0 4 1.6 4 3.5V18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  events: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#D4AF37]/80">
      <path
        d="M6 4v3M18 4v3M4 9h16M6 13h4m-4 4h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="6"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ),
  prasadam: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#D4AF37]/80">
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 12c0 4 3 7 6 7s6-3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 9c1.5-2 2.7-2.5 4-2.5s2.5.5 4 2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  volunteers: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-[#D4AF37]/80">
      <path
        d="M12 20s-7-4.2-7-9.3C5 8 7 6 9.5 6c1.4 0 2.7.7 3.5 1.9C13.8 6.7 15.1 6 16.5 6 19 6 21 8 21 10.7 21 15.8 14 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const AnimatedNumber = ({ value, suffix }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (reduceMotion || !isInView) {
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, motionValue, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? value : <motion.span>{rounded}</motion.span>}
      {suffix}
    </span>
  );
};

const ImpactCommunity = () => {
  const reduceMotion = useReducedMotion();

  const containerVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 },
        },
      };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] text-[#241d20]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-12 lg:py-24">
        <motion.div
          className="order-1 lg:order-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              Our Impact
            </span>
            <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            Building a Krishna Conscious Student Community
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-[#3b3237] sm:text-lg"
          >
            Through wisdom, devotion, mentorship, kirtan, prasadam, and service,
            students are finding friendship, purpose, and spiritual growth.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {stats.map((stat, index) => (
              <motion.article
                key={stat.id}
                variants={itemVariants}
                className="group relative rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_26px_70px_-34px_rgba(74,31,45,0.55)]"
                whileHover={reduceMotion ? {} : { y: -4 }}
              >
                <div className="pointer-events-none absolute right-4 top-4">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.6),_rgba(248,245,239,0.2))] opacity-60 blur-xl" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/70 backdrop-blur">
                      {tinyIcons[stat.icon]}
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white">
                      {icons[stat.icon]}
                    </div>
                    <p className="mt-4 text-2xl font-semibold text-[#2a1b22]">
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </p>
                  </div>
                  <span className="h-10 w-10 rounded-full bg-[#D4AF37]/10" />
                </div>
                <h3 className="mt-3 font-display text-lg text-[#2a1b22]">
                  {stat.label}
                </h3>
                <p className="mt-2 text-sm text-[#4b4246]">
                  {stat.text}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <Link to="/contact">
              <motion.button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)]"
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                Become Part of the Community
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-none"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:grid-rows-10 lg:min-h-[640px]">
            {collageImages.map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_60px_-30px_rgba(18,9,12,0.6)] sm:aspect-[5/4] lg:aspect-auto lg:h-full ${image.className}`}
                whileHover={reduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactCommunity;
