import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: "ayush",
    name: "Ayush Sharma",
    branch: "CSE - 3rd Year",
    story:
      "Through the Gita discussions and kirtans, I found clarity, meaningful friendships, and a sense of purpose during my college journey.",
    image: "/association.png",
  },
  {
    id: "riya",
    name: "Riya Patel",
    branch: "ECE - 2nd Year",
    story:
      "The community here feels like a spiritual family. The programs helped me balance academics, mental peace, and personal growth.",
    image: "/prasadameating.png",
  },
  {
    id: "rahul",
    name: "Rahul Verma",
    branch: "Mechanical - 4th Year",
    story:
      "Kirtans, prasadam, and mentorship transformed my perspective on life and helped me develop positive habits and discipline.",
    image: "/kirtan.png",
  },
  {
    id: "ananya",
    name: "Ananya Das",
    branch: "Electrical - 1st Year",
    story:
      "I came for one program and stayed for the warmth, wisdom, and joyful atmosphere. It became my home away from home.",
    image: "/guidance-2.png",
  },
];

const StudentTestimonials = () => {
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
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.65),_transparent_60%)]" />
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
              Student Experiences
            </span>
            <span className="h-px w-16 bg-[#D4AF37]/70" aria-hidden="true" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl lg:text-[2.75rem]"
          >
            Stories of Growth & Transformation
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-base text-[#3b3237] sm:text-lg"
          >
            Students discovering wisdom, friendship, purpose, and spiritual
            growth through the community.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            className="testimonials-swiper pb-10"
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5600, disableOnInteraction: false }}
            loop
            speed={900}
            centeredSlides
            spaceBetween={24}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 1.6, spaceBetween: 24 },
              1024: { slidesPerView: 2.2, spaceBetween: 28 },
              1280: { slidesPerView: 2.6, spaceBetween: 32 },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="px-1 sm:px-2">
                <motion.article
                  variants={itemVariants}
                  className="testimonial-card group relative flex h-full flex-col rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_24px_70px_-40px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-[0_30px_80px_-40px_rgba(74,31,45,0.55)]"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.5),_rgba(248,245,239,0.15))] opacity-60 blur-2xl" />

                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-full border border-white/80 shadow-[0_12px_28px_-18px_rgba(31,23,28,0.5)]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#2a1b22]">
                        {testimonial.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#4A1F2D]/60">
                        {testimonial.branch}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="h-px w-14 bg-[#D4AF37]/70" aria-hidden="true" />
                    <span
                      aria-hidden="true"
                      className="font-display text-[2.25rem] leading-none tracking-[-0.1em] text-[#D4AF37]/70"
                    >
                      &ldquo;&rdquo;
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-[#3b3237] sm:text-base">
                    {testimonial.story}
                  </p>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link to="/contact">
            <motion.button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)]"
              whileHover={reduceMotion ? {} : { scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              Join the Community
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentTestimonials;
