import { motion, useReducedMotion } from "framer-motion";

const activityCards = [
  {
    id: "gita-classes",
    title: "Bhagavad Gita Classes",
    subtitle: "Interactive wisdom sessions for modern student life.",
    cta: "Explore Classes",
    image: "/guidance.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
  {
    id: "kirtan-meditation",
    title: "Kirtan & Meditation",
    subtitle: "Experience mantra meditation and spiritual energy.",
    cta: "Join Kirtan",
    image: "/kirtan-2.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
  {
    id: "mentorship",
    title: "Student Mentorship",
    subtitle: "Guidance, discussions, and meaningful friendships.",
    cta: "Meet Community",
    image: "/mentorship.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
  {
    id: "festivals",
    title: "Festivals & Culture",
    subtitle: "Celebrate devotion, music, and vibrant traditions.",
    cta: "View Festivals",
    image: "/festival.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
  {
    id: "prasadam",
    title: "Prasadam & Community",
    subtitle: "Wholesome spiritual meals shared with love.",
    cta: "Explore Prasadam",
    image: "/vegetarianmeals.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
  {
    id: "outreach",
    title: "Outreach & Seva",
    subtitle: "Service initiatives, food distribution, and outreach.",
    cta: "Learn More",
    image: "/villageoutreach.png",
    layout: "xl:col-span-4 xl:min-h-[320px]",
  },
];

const WhatWeDo = () => {
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
    <section className="relative overflow-hidden bg-[#F8F5EF]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:px-12 lg:pt-12 lg:pb-24">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Our Activities
            </span>
            <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            Experience Spiritual Campus Life
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-[#3b3237] sm:text-lg"
          >
            A vibrant spiritual and cultural student community built around
            wisdom, devotion, friendship, and service.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12 xl:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {activityCards.map((card, index) => (
            <motion.article
              key={card.id}
              variants={itemVariants}
              className={`group relative flex w-full min-h-[260px] flex-col justify-end self-start overflow-hidden rounded-3xl bg-[#1f1117] text-white shadow-[0_26px_70px_-45px_rgba(18,9,12,0.85)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(18,9,12,0.9)] sm:min-h-[320px] ${card.layout}`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition duration-500 group-hover:from-black/90" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.24),_transparent_60%)] opacity-70 transition duration-500 group-hover:opacity-90" />

              <div className="relative z-10 p-6 sm:p-7">
                <div className="transition duration-500 group-hover:-translate-y-1">
                  <h3 className="font-display text-sm text-white sm:text-xl lg:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[0.6rem] text-white/75 sm:text-sm">
                    {card.subtitle}
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]"
                  >
                    {card.cta}
                    <span className="h-px w-8 bg-[#D4AF37]/80 transition-all duration-500 group-hover:w-12" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
