import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const galleryItems = [
  {
    id: "kirtan",
    title: "Kirtan Evenings",
    image: "/kirtan.png",
    layout: "lg:col-span-4 lg:row-span-3",
  },
  {
    id: "festivals",
    title: "Festival Celebrations",
    image: "/festival.png",
    layout: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "gita",
    title: "Spiritual Discussions",
    image: "/bgclass.png",
    layout: "lg:col-span-3 lg:row-span-3",
  },
  {
    id: "prasadam",
    title: "Prasadam & Friendship",
    image: "/prasadameating.png",
    layout: "lg:col-span-3 lg:row-span-2",
  },
  {
    id: "retreat",
    title: "Retreat Experiences",
    image: "/villageoutreach.png",
    layout: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "seva",
    title: "Outreach & Seva",
    image: "/prasaddistribute.png",
    layout: "lg:col-span-4 lg:row-span-2",
  },
];

const GalleryPreview = () => {
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
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
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
              Gallery
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            Moments of Bhakti &amp; Community
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-[#3b3237] sm:text-lg"
          >
            Kirtan, wisdom, festivals, friendship, prasadam, and transformative
            spiritual experiences.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {galleryItems.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-3xl shadow-[0_24px_70px_-40px_rgba(18,9,12,0.45)] ${item.layout}`}
              whileHover={reduceMotion ? {} : { y: -4 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative h-full min-h-[220px] w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition duration-500 group-hover:from-black/80" />
                <div className="absolute inset-0 border border-transparent transition duration-500 group-hover:border-[#D4AF37]/40" />
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="translate-y-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/90 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MotionLink
            to="/media"
            className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)]"
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            View Full Gallery
          </MotionLink>
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#4A1F2D]/30 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
            whileHover={reduceMotion ? {} : { scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            Join Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
