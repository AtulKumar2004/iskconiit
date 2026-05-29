import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const updates = [
  {
    id: "gita-session",
    title: "Bhagavad Gita Session",
    date: "May 30",
    description:
      "Weekly wisdom circle exploring practical spirituality for student life.",
    image: "/guidance.png",
  },
  {
    id: "kirtan-evening",
    title: "Kirtan Evening",
    date: "Jun 02",
    description:
      "An immersive night of mantra meditation, music, and community energy.",
    image: "/kirtan-2.png",
  },
  {
    id: "janmashtami",
    title: "Janmashtami Festival",
    date: "Aug 26",
    description:
      "Celebrate Krishna's appearance with kirtan, drama, and prasadam feast.",
    image: "/festival.png",
  },
  {
    id: "sunday-feast",
    title: "Sunday Feast",
    date: "Every Sun",
    description:
      "Community gathering with discourse, devotional music, and shared meals.",
    image: "/prasadam.png",
  },
  {
    id: "youth-retreat",
    title: "Youth Retreat",
    date: "Sep 14",
    description:
      "Weekend retreat for reflection, mentorship, and transformative learning.",
    image: "/villageoutreach.png",
  },
];

const LatestUpdates = () => {
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
    <section className="relative overflow-hidden bg-[#12070c] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/35 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#14080d] to-[#0a0508]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-12 lg:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]"
          >
            Latest Updates
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]"
          >
            Programs, Events &amp; Campus Activities
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            className="news-swiper pb-10"
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5200, disableOnInteraction: false }}
            loop
            speed={900}
            spaceBetween={24}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 1.1, spaceBetween: 18 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {updates.map((update, index) => (
              <SwiperSlide key={update.id} className="px-1 sm:px-2">
                <motion.article
                  variants={itemVariants}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]"
                >
                  {/* ↑ Image area increased from h-44 → h-64 */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={update.image}
                      alt={update.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-[#D4AF37]/40 bg-[#1a0c12]/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                      {update.date}
                    </span>
                  </div>

                  {/* ↓ Text area tightened: padding reduced p-6 → p-4, description clamped to 2 lines */}
                  <div className="flex flex-col p-4">
                    <h3 className="font-display text-lg text-white leading-snug">
                      {update.title}
                    </h3>
                    <p className="mt-2 text-xs text-white/70 line-clamp-2">
                      {update.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(212,175,55,0.8)]"
                      >
                        Read More
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestUpdates;