import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Outreach", href: "/outreach/student" },
  { label: "Programs", href: "/programs" },
  { label: "Library", href: "/library" },
  { label: "Media", href: "/media" },
  { label: "Calendar", href: "#" },
  { label: "Become a Volunteer", href: "#" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const timings = [
  { label: "Mangala Arati", time: "05:00 AM" },
  { label: "Bhagavatam Class", time: "08:00 AM" },
  { label: "Raj Bhoga Arati", time: "12:30 PM" },
  { label: "Sandhya Arati", time: "06:30 PM" },
  { label: "Bhagavad Gita Class", time: "07:00 PM" },
  { label: "Shayan Arati", time: "08:15 PM" },
];
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/iskcon__iit_centre?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", icon: "instagram" },
  { name: "YouTube", href: "https://www.youtube.com/@ISKCONBhubaneswarOfficial/featured", icon: "youtube" },
  { name: "Facebook", href: "https://www.facebook.com/ISKCONBhubaneswar", icon: "facebook" },
];

const icons = {
  location: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  phone: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M5.5 5.5c2-2 4.5-1.5 5.5 0l.9 1.3c.6.9.5 2.2-.2 3l-1.1 1.3a12.5 12.5 0 0 0 5.3 5.3l1.3-1.1c.8-.7 2.1-.8 3-.2l1.3.9c1.5 1 2 3.5 0 5.5-1.2 1.2-3.1 1.6-4.7.9-4.1-1.7-8.4-6-10.1-10.1-.7-1.6-.3-3.5.9-4.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  mail: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#D4AF37]">
      <path
        d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="m22 8-10 6L2 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  instagram: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F8F5EF]">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F8F5EF]">
      <path
        d="M22 12s0-4-1-5-3-1-3-1H6s-2 0-3 1-1 5-1 5 0 4 1 5 3 1 3 1h12s2 0 3-1 1-5 1-5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 9.5 15 12 10 14.5Z" fill="currentColor" />
    </svg>
  ),
  whatsapp: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F8F5EF]">
      <path
        d="M20 11.5a8.5 8.5 0 1 1-16.1 3.7L3 21l5.9-1.5A8.5 8.5 0 0 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9.2c.1-.4.3-.5.7-.5h1c.4 0 .6.3.6.6 0 .6-.3 1.1-.8 1.5.7 1.4 1.9 2.6 3.4 3.3.4-.4.9-.7 1.5-.8.3 0 .6.2.6.6v1c0 .4-.1.6-.5.7-1.1.3-2.3.2-3.4-.4-1.9-1-3.5-2.6-4.5-4.5-.6-1.1-.7-2.3-.4-3.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  facebook: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F8F5EF]">
      <path
        d="M14 8h2V5h-2c-2 0-3.5 1.5-3.5 3.5V10H8v3h2.5v6H14v-6h2.2l.8-3H14V8.5c0-.3.2-.5.5-.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  telegram: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#F8F5EF]">
      <path
        d="M20.5 4 3.5 11.2l5.9 1.9 2.2 6.4 3.4-4.2 4.7 3.6L20.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 13.1 18.4 6.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const Footer = () => {
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#1F1B24] via-[#1a121a] to-[#12070c] text-[#F8F5EF]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#4A1F2D]/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_65%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-20 sm:pt-24 lg:px-12">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={itemVariants}
            className="relative rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-10"
            whileHover={reduceMotion ? {} : { y: -4 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-[#D4AF37]/20" />
            <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-32 -translate-x-1/2 rounded-full bg-[#D4AF37]/20 blur-2xl" />
            <h3 className="font-display text-2xl text-white sm:text-3xl">
              Begin Your Spiritual Journey Today
            </h3>
            <p className="mt-3 text-sm text-white/70 sm:text-base">
              Join a vibrant community of wisdom, devotion, friendship, and
              meaningful growth.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] shadow-[0_18px_40px_-22px_rgba(212,175,55,0.8)] transition hover:-translate-y-0.5"
                >
                  Join Community
                </button>
              </Link>
              <Link to="/programs">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  Explore Programs
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-16 border-t border-[#D4AF37]/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-12">
          <motion.div
            className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[#D4AF37]/25 blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 p-1">
                  <img
                    src="/logo.png"
                    alt="ISKCON IIT Bhubaneswar logo"
                    className="h-full w-full rounded-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">ISKCON IIT</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
                    Bhubaneswar
                  </p>
                </div>
              </div>
              <div className="mt-5 h-px w-12 bg-[#D4AF37]/60" />
              <p className="mt-4 text-sm text-white/70">
                A spiritual and cultural student community dedicated to
                Bhagavad Gita wisdom, kirtan, mentorship, and conscious living.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_12px_30px_-22px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:border-[#D4AF37]/50 hover:shadow-[0_16px_35px_-18px_rgba(212,175,55,0.55)]"
                    aria-label={item.name}
                  >
                    {icons[item.icon]}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-display text-lg">Quick Links</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 transition hover:text-[#D4AF37]"
                    >
                      <span className="h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-4" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-display text-lg">Contact</h4>
              <div className="mt-5 space-y-4 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  {icons.location}
                  <div>
                    <p>ISKCON IIT Bhubaneswar Centre</p>
                    <p>Bhubaneswar, Odisha, India</p>
                    <a
                      href="https://maps.app.goo.gl/K7asP1C3pm57wHTR7"
                      className="mt-2 inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#D4AF37]"
                    >
                      Google Maps
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {icons.phone}
                  <span>8895400410</span>
                </div>
                <div className="flex items-center gap-3">
                  {icons.mail}
                  <a href="mailto:iskconiitcenterbbsr@gmail.com" className="hover:text-[#D4AF37]">
                    iskconiitcenterbbsr@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-display text-lg">Program Timings</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {timings.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-4">
                    <span className="text-[#D4AF37]">{item.label}</span>
                    <span className="text-white/60">{item.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/60 sm:flex-row lg:px-12">
          <span>© 2026 ISKCON IIT Bhubaneswar. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]/70" />
            Designed with devotion and purpose.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;