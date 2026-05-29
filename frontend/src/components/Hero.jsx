import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: "community",
    theme: "Community | Friendship | Belonging",
    heading: "More Than a Campus Community",
    subtitle: "Friendship, prasadam, and soulful conversations.",
    primary: "Join Our Community",
    secondary: "Weekly Programs",
    image:
      "../../prasadameating.png",
    alt: "Students sharing a meal and laughing together",
  },
  {
    id: "wisdom",
    theme: "Knowledge | Discovery | Philosophy",
    heading: "Discover Timeless Wisdom",
    subtitle: "Bhagavad Gita, spiritual literature, deep discussions.",
    primary: "Explore Philosophy",
    secondary: "Visit Library",
    image:
      "../../lib.png",
    alt: "Library shelves filled with books",
  },
  {
    id: "learning",
    theme: "Learning | Guidance | Transformation",
    heading: "Ancient Knowledge for Modern Life",
    subtitle: "Interactive Gita sessions, mentorship, practical wisdom.",
    primary: "Attend Classes",
    secondary: "Start Your Journey",
    image:
      "../../guidance.png",
    alt: "Teacher guiding students in a classroom",
  },
  {
    id: "devotion",
    theme: "Devotion | Tradition | Sacred Culture",
    heading: "Experience the Beauty of Bhakti",
    subtitle: "Darshan, kirtan, festivals, devotional culture.",
    primary: "Explore Festivals",
    secondary: "Temple Programs",
    image:
      "../../public/deities.png",
    alt: "Temple architecture glowing at dusk",
  },
  {
    id: "kirtan",
    theme: "Joy | Energy | Spiritual Experience",
    heading: "Chant, Connect, and Transform",
    subtitle: "Kirtan, meditation, community, inner happiness.",
    primary: "Join Kirtan",
    secondary: "Upcoming Events",
    image: "../../public/kirtan-2.png",
    alt: "Crowd immersed in music and lights",
  },
  {
    id: "kirtan-nights",
    theme: "Kirtan | Meditation | Inner Peace",
    heading: "Sacred Sound, Quiet Mind",
    subtitle: "Evening kirtan sessions that uplift and center.",
    primary: "Join Kirtan",
    secondary: "Upcoming Events",
    image:
      "../../public/kirtan.png",
    alt: "Kirtan gathering with devotees singing together",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeSlide = slides[activeIndex];

  const containerVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
        exit: { opacity: 0, transition: { duration: 0.3 } },
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
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#12070c] text-white"
      aria-label="ISKCON IIT Bhubaneswar hero"
    >
      <Swiper
        className="h-screen"
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: false }}
        allowTouchMove={false}
        loop
        speed={1200}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-screen w-full">
              <motion.img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                initial={{ scale: 1.04 }}
                animate={{
                  scale: reduceMotion
                    ? 1
                    : index === activeIndex
                      ? 1.08
                      : 1.02,
                }}
                transition={{ duration: 7, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#1a0d12]/70 to-[#12070c]/90" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.18),_transparent_55%)]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl float-slow" />
        <div className="absolute right-12 top-40 h-40 w-40 rounded-full bg-white/10 blur-3xl float-medium" />
        <div className="absolute bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#4A1F2D]/30 blur-3xl float-delay" />
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto max-w-4xl"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex flex-col items-center gap-3"
            >
              
              <span className="text-[0.7rem] uppercase tracking-[0.35em] text-[#D4AF37]">
                {activeSlide.theme}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {activeSlide.heading}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base text-white/80 sm:text-lg"
            >
              {activeSlide.subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
              >
                {activeSlide.primary}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
              >
                {activeSlide.secondary}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.5em] text-white/60">
          <span>Scroll</span>
          <span className="scroll-indicator" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
