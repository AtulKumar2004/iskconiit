import { useCallback, useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const baseCategories = [
  "Festivals",
  "Kirtan",
  "Bhagavad Gita Classes",
  "Prasadam",
  "Retreats",
  "Outreach",
  "Children Programs",
  "Campus Events",
];

const ratioOptions = ["4 / 5", "3 / 4", "1 / 1", "16 / 9", "2 / 3", "5 / 7", "3 / 5"];

const titleMap = {
  Festivals: ["Festival Lights", "Sacred Celebrations", "Temple Glow", "Unity in Joy"],
  Kirtan: ["Kirtan Flow", "Holy Name Rising", "Sankirtan Circle", "Evening Harmony"],
  "Bhagavad Gita Classes": ["Gita Insights", "Wisdom Circle", "Shastra Study", "Learning Together"],
  Prasadam: ["Prasadam Grace", "Shared Meal", "Blessed Plates", "Seva Kitchen"],
  Retreats: ["Retreat Sunrise", "Pilgrimage Path", "Quiet Reflection", "Seva Journey"],
  Outreach: ["Outreach Seva", "Community Giving", "Service Drive", "Village Care"],
  "Children Programs": ["Bal Gopal Joy", "Youth Bhakti", "Kids Kirtan", "Playful Devotion"],
  "Campus Events": ["Campus Bhakti", "Student Circle", "IIT Spirit", "Hostel Harmony"],
};

const galleryItems = Array.from({ length: 72 }, (_, index) => {
  const category = baseCategories[index % baseCategories.length];
  const titles = titleMap[category];
  return {
    id: index + 1,
    src: `/media/media${index + 1}.png`,
    title: titles[index % titles.length],
    category,
    ratio: ratioOptions[index % ratioOptions.length],
    year: 2025,
  };
});

const stats = [
  { label: "Photos", value: 72, suffix: "+" },
  { label: "Events", value: 25, suffix: "+" },
  { label: "Students Reached", value: 5000, suffix: "+" },
  { label: "Programs Conducted", value: 100, suffix: "+" },
];

const featuredEvents = [
  {
    title: "Visit of HG Gauranga Prabhuji",
    year: "2025",
    image: "/media/media12.png",
    description: "Gauranga Prabhuji visit to the centre paying obeisances to the deities",
  },
  {
    title: "Visit of HG Amogh Lila Prabhuji",
    year: "2024",
    image: "/media/media13.png",
    description: "Amogh Lila Prabhuji enlightening with the timeless Vedic Wisdom ",
  },
  {
    title: "Deities",
    year: "2023",
    image: "/media/media45.png",
    description: "Beautiful Deities of Lord Jagannath, Baladeva and Subhadra Maharani",
  },
  {
    title: "Campus Kirtan Immersion",
    year: "2025",
    image: "/media/media60.png",
    description: "An immersive day of philosophy and classes",
  },
];

const videos = [
  {
    title: "Kirtan Soiree",
    type: "Kirtans",
    videoId: "wKue1OJ_GmU",
  },
  {
    title: "Gita Insight Series",
    type: "Lectures",
    videoId: "2H0HIOWwcY8",
  },
  {
    title: "Chanting",
    type: "Chanting names of Krishna",
    videoId: "xBqNUisRtmo",
  },
  {
    title: "Association",
    type: "Meet Devotees from Bhubaneswar",
    videoId: "p92ySLI_2PU",
  }
];

const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

const useCountUp = (target, start, reduceMotion, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      return;
    }

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [duration, reduceMotion, start, target]);

  return value;
};

const StatCard = ({ label, value, suffix, start, reduceMotion, variants }) => {
  const count = useCountUp(value, start, reduceMotion);

  return (
    <motion.div
      variants={variants}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur"
    >
      <p className="text-3xl font-semibold text-[#D4AF37] sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
        {label}
      </p>
    </motion.div>
  );
};

const MediaGallery = () => {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const filteredItems = galleryItems;

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) {
        return 0;
      }
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) {
        return 0;
      }
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNext();
      }
      if (event.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeLightbox, lightboxIndex, showNext, showPrev]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex]);

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

  const activeLightboxItem =
    lightboxIndex === null ? null : filteredItems[lightboxIndex];

  return (
    <main className="bg-[#F8F5EF] text-[#241d20]">
      <div className="bg-[#12070c] text-white">
        <section className="relative min-h-[70vh] overflow-hidden pt-28">
          <div className="absolute inset-0">
            <img
              src="/media/media70.png"
              alt="ISKCON IIT Bhubaneswar devotional gathering"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#12070c]/80 via-[#12070c]/55 to-[#12070c]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(74,31,45,0.35),transparent_55%)]" />
          </div>

          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pb-12 lg:px-12">
            <motion.div
              className="max-w-3xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.p
                variants={itemVariants}
                className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]"
              >
                ISKCON IIT Bhubaneswar
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl lg:text-6xl"
              >
                Media Gallery
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-5 text-base text-white/80 sm:text-lg"
              >
                Capturing moments of devotion, wisdom, friendship, and service.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-sm text-white/70 sm:text-base"
              >
                A living visual story of the student community shaped by spiritual learning,
                vibrant festivals, and heartfelt seva.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="relative -mt-16 pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <div className="absolute right-0 top-1/2 h-56 w-56 rounded-full bg-[#4A1F2D]/40 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
            <motion.div
              ref={statsRef}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  start={statsInView}
                  reduceMotion={reduceMotion}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                Featured events
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Premium moments from the heart of campus bhakti
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="text-sm text-[#4A1F2D]/70 sm:text-right"
            >
              A curated selection of standout gatherings that define our community.
            </motion.div>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredEvents.map((event, index) => (
              <motion.article
                key={event.title}
                className="group relative overflow-hidden rounded-3xl border border-[#4A1F2D]/10 bg-white"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
              >
                <div className="relative h-72 overflow-hidden sm:h-80">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A1F2D]/70 via-[#4A1F2D]/25 to-transparent" />
                </div>
                <div className="absolute left-6 top-6 rounded-full border border-[#4A1F2D]/20 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/70">
                  {event.year}
                </div>
                <div className="relative space-y-3 px-6 pb-6 pt-5">
                  <h3 className="font-display text-2xl font-semibold text-[#2a1b22]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#4A1F2D]/70">{event.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#F8F5EF] py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]"
            >
              Masonry gallery
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-4 font-display text-3xl font-semibold sm:text-4xl"
            >
              A cinematic tapestry of devotion and community
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-[#4A1F2D]/70 sm:text-base"
            >
              Hover to explore, click to enter the full lightbox experience.
            </motion.p>
          </motion.div>

          <div className="mt-10">
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  className="group relative w-full overflow-hidden rounded-3xl border border-[#4A1F2D]/10 bg-white text-left shadow-[0_24px_60px_-36px_rgba(31,23,28,0.35)]"
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: (index % 6) * 0.05 }}
                >
                  <div className="relative w-full" style={{ aspectRatio: item.ratio }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A1F2D]/55 via-[#4A1F2D]/20 to-transparent opacity-60 transition duration-500 group-hover:opacity-80" />
                    <div className="absolute right-5 top-5 rounded-full border border-[#4A1F2D]/20 bg-white/80 px-3 py-1 text-xs text-[#4A1F2D]/70">
                      {item.year}
                    </div>
                  </div>
                </motion.button>
              ))}
            </Masonry>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]"
            >
              Video gallery
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-4 font-display text-3xl font-semibold sm:text-4xl"
            >
              Hear the kirtan, feel the wisdom, relive the festivals
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-[#4A1F2D]/70 sm:text-base"
            >
              Curated highlights from kirtans, lectures, festivals, and student voices.
            </motion.p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {videos.map((video, index) => (
              <motion.article
                key={video.title}
                className="group overflow-hidden rounded-3xl border border-[#4A1F2D]/10 bg-white"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe
                    title={video.title}
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-2 px-6 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                    {video.type}
                  </p>
                  <h3 className="font-display text-2xl text-[#2a1b22]">{video.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-[#4A1F2D]/15 bg-[#F8F5EF] text-[#241d20] shadow-[0_30px_70px_-40px_rgba(31,23,28,0.4)]"
              initial={reduceMotion ? { opacity: 1 } : { scale: 0.95, opacity: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="relative">
                <img
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.title}
                  className="h-[70vh] w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                  {activeLightboxItem.category}
                </div>
                <div className="absolute bottom-6 left-6 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                    {activeLightboxItem.year}
                  </p>
                  <h3 className="font-display text-3xl text-white">
                    {activeLightboxItem.title}
                  </h3>
                </div>
              </div>

              <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                  onClick={closeLightbox}
                  aria-label="Close gallery"
                >
                  <X size={18} />
                </button>
              </div>

              <button
                type="button"
                className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 p-3 text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37] sm:inline-flex"
                onClick={showPrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 p-3 text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37] sm:inline-flex"
                onClick={showNext}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              <div className="flex items-center justify-between border-t border-[#4A1F2D]/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/70">
                <span>
                  Image {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-[#4A1F2D]/20 px-4 py-2 text-[0.6rem] text-[#4A1F2D]/70 transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                    onClick={showPrev}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[#4A1F2D]/20 px-4 py-2 text-[0.6rem] text-[#4A1F2D]/70 transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                    onClick={showNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MediaGallery;
