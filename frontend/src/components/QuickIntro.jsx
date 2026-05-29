import { motion, useReducedMotion } from "framer-motion";

const collageImages = [
  {
    src: "/guidance.png",
    alt: "Students in a Bhagavad Gita discussion",
  },
  {
    src: "/kirtan.png",
    alt: "Kirtan and chanting session",
  },
  {
    src: "/gaurangaprabhu.png",
    alt: "Meeting exalted monks",
  },
  {
    src: "/deities.png",
    alt: "Deity darshan at the temple",
  },
];

const QuickIntro = () => {
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
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="relative overflow-hidden bg-[#F8F5EF] text-[#241d20]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 py-16 sm:py-20 lg:flex-row lg:gap-16 lg:px-12 lg:py-24">
        <motion.div
          className="aspect-square w-full max-w-xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="grid h-full w-full grid-cols-2 gap-4">
            {collageImages.map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                className="aspect-square overflow-hidden rounded-2xl bg-white shadow-[0_18px_60px_-24px_rgba(31,23,28,0.6)]"
                whileHover={reduceMotion ? {} : { scale: 1.03 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-xl text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              About the Centre
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            A Spiritual Home for Students &amp; Seekers
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-5 text-base text-[#3a3236] sm:text-lg">
            ISKCON IIT Bhubaneswar is a vibrant spiritual and cultural community
            dedicated to Bhagavad Gita wisdom, mentorship, kirtan, conscious
            living, and holistic student growth.
          </motion.p>

          <motion.p variants={itemVariants} className="mt-4 text-sm text-[#4b4246] sm:text-base">
            We create an environment where students can discover purpose, build
            meaningful friendships, develop character, and explore timeless
            spiritual wisdom in a practical modern context.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)]"
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              Explore Programs
            </motion.button>
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[#4A1F2D]/25 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#4A1F2D]"
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              Join Community
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickIntro;
