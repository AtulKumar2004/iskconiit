import { motion, useReducedMotion } from "framer-motion";

const programs = [
  {
    id: "monday-gita",
    day: "Monday",
    title: "Bhagavad Gita Study Circle",
    description:
      "Interactive discussion on Bhagavad Gita and practical spiritual wisdom for student life.",
    time: "7:00 PM - 8:30 PM",
    venue: "Student Activity Centre",
    cta: "Join Session",
  },
  {
    id: "wednesday-kirtan",
    day: "Wednesday",
    title: "Kirtan & Meditation Evening",
    description:
      "Experience mantra meditation, soulful kirtan, and spiritual relaxation.",
    time: "6:30 PM - 8:00 PM",
    venue: "Temple Hall",
    cta: "Attend Kirtan",
  },
  {
    id: "friday-satsang",
    day: "Friday",
    title: "Youth Satsang & Mentorship",
    description:
      "Open discussions, guidance, Q&A, and meaningful student association.",
    time: "7:00 PM - 9:00 PM",
    venue: "Community Hall",
    cta: "Join Community",
  },
  {
    id: "saturday-bhakti",
    day: "Saturday",
    title: "Bhakti Vriksha Gathering",
    description:
      "Small-group spiritual discussions, reading, and devotional bonding.",
    time: "5:30 PM - 7:00 PM",
    venue: "Campus Hostel Common Room",
    cta: "Explore Gathering",
  },
  {
    id: "sunday-feast",
    day: "Sunday",
    title: "Sunday Love Feast",
    description:
      "Kirtan, Bhagavad Gita discourse, prasadam feast, and joyful association.",
    time: "5:00 PM - 8:00 PM",
    venue: "ISKCON IIT Bhubaneswar Centre",
    cta: "Attend Feast",
  },
  {
    id: "daily-japa",
    day: "Daily",
    title: "Morning Japa & Prayer",
    description:
      "Start the day with mantra meditation and peaceful spiritual practice.",
    time: "6:00 AM - 7:00 AM",
    venue: "Temple Room",
    cta: "Join Morning Program",
  },
];

const WeeklyPrograms = () => {
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
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] text-[#241d20]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
              Weekly Programs
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            Join Our Weekly Gatherings
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-[#3b3237] sm:text-lg"
          >
            Experience wisdom, kirtan, mentorship, devotion, and meaningful
            community throughout the week.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {programs.map((program) => (
            <motion.article
              key={program.id}
              variants={itemVariants}
              className="group relative flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.5)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_28px_70px_-34px_rgba(74,31,45,0.55)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#4A1F2D] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                  {program.day}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[#4A1F2D]/60">
                  Weekly
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl text-[#2a1b22]">
                {program.title}
              </h3>
              <p className="mt-3 text-sm text-[#4b4246]">
                {program.description}
              </p>

              <div className="mt-6 h-px w-full bg-[#4A1F2D]/10" />

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#3f373b]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 text-[#D4AF37]"
                    >
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path
                        d="M12 7v5l3 2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#4A1F2D]/60">
                      Time
                    </p>
                    <p className="text-sm font-medium text-[#2a1b22]">
                      {program.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#3f373b]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 text-[#D4AF37]"
                    >
                      <path
                        d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#4A1F2D]/60">
                      Venue
                    </p>
                    <p className="text-sm font-medium text-[#2a1b22]">
                      {program.venue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-[#D4AF37]/60 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition duration-300 group-hover:shadow-[0_12px_28px_-18px_rgba(212,175,55,0.7)]"
                  whileHover={reduceMotion ? {} : { scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {program.cta}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)]"
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            View Full Schedule
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyPrograms;
