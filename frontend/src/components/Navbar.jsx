import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const outreachChildren = [
  {
    label: "Student",
    href: "/outreach/student",
    description: "Mentoring circles and study support for students.",
    image: "/mentorship.png",
  },
  {
    label: "Faculty",
    href: "/outreach/faculty",
    description: "Satsangs and talks on leadership and mindful living.",
    image: "/faculty/F19.jpeg",
  },
  {
    label: "Village",
    href: "/outreach/village",
    description: "Seva drives and prasadam distribution in villages.",
    image: "/village/V3.jpeg",
  },
  {
    label: "Corporate",
    href: "/outreach/corporate",
    description: "Workplace wellbeing and values workshops.",
    image: "/corporate/P21.jpeg",
  },
];

const desktopNavItems = [
  { label: "Outreach", children: outreachChildren },
  { label: "Programs", href: "/programs" },
  {
    label: "Services",
    children: [
      { label: "Restaurant", href: "/govindas" },
      { label: "House Programs", href: "#" },
    ],
  },
  { label: "Calendar", href: "#" },
  { label: "Membership & Donations", href: "/donate" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileNavItems = [
  { label: "Outreach", children: outreachChildren },
  { label: "Programs", href: "/programs" },
  {
    label: "Services",
    children: [
      { label: "Restaurant", href: "/govindas" },
      { label: "House Programs", href: "#" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Become a Volunteer", href: "#" },
  { label: "Calendar", href: "#" },
  { label: "Transparency and Accountability", href: "#" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSections, setMobileSections] = useState({});
  const reduceMotion = useReducedMotion();

  const isLight = location.pathname === "/philosophy";

  const baseText = scrolled
    ? "text-white"
    : isLight
      ? "text-[#2a1b22]"
      : "text-white";

  const mutedText = scrolled
    ? "text-white/60"
    : isLight
      ? "text-[#4A1F2D]/70"
      : "text-white/60";

  const navInactive = scrolled
    ? "text-white/80 hover:text-white"
    : isLight
      ? "text-[#2a1b22]/70 hover:text-[#4A1F2D]"
      : "text-white/80 hover:text-white";

  const navActive = scrolled
    ? "text-white"
    : isLight
      ? "text-[#4A1F2D]"
      : "text-white";

  const menuButtonClass = scrolled
    ? "border-white/20 bg-white/10 text-white"
    : isLight
      ? "border-[#4A1F2D]/20 bg-white/70 text-[#4A1F2D]"
      : "border-white/20 bg-white/10 text-white";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      setMobileSections({});
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const toggleMobileSection = (label) => {
    setMobileSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const dropdownVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 },
      },
    };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "border-b border-[#3a1421]/80 bg-[#4A1F2D]/85 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
          }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
          <NavLink to="/" className="relative flex items-center gap-3" aria-label="Go to home">
            <div className="absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-[#D4AF37]/20 blur-2xl" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 p-1">
              <img
                src="/logo.png"
                alt="ISKCON IIT Bhubaneswar logo"
                className="h-full w-full rounded-full object-contain"
                loading="eager"
                decoding="async"
              />
            </div>

            <div>
              <p className={`text-sm font-semibold ${baseText}`}>ISKCON IIT</p>
              <p className={`text-[0.65rem] uppercase tracking-[0.35em] ${mutedText}`}>
                Bhubaneswar
              </p>
            </div>
          </NavLink>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-6 text-[0.7rem] font-medium uppercase tracking-[0.2em]">
              {desktopNavItems.map((item) => {
                const hasDetailedChildren =
                  Array.isArray(item.children) &&
                  typeof item.children[0] === "object" &&
                  "image" in item.children[0];

                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                    onMouseLeave={() => item.children && setOpenDropdown(null)}
                  >
                    {item.children ? (
                      <button
                        type="button"
                        className={`group flex items-center gap-2 uppercase transition ${navInactive}`}
                        aria-expanded={openDropdown === item.label}
                        onFocus={() => setOpenDropdown(item.label)}
                      >
                        <span className="relative pb-1 after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all after:duration-300 group-hover:after:w-full">
                          {item.label}
                        </span>
                        <span className="text-[#D4AF37]">v</span>
                      </button>
                    ) : item.href?.startsWith("/") ? (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `relative pb-1 transition after:absolute after:left-0 after:bottom-0 after:h-px after:bg-[#D4AF37] after:transition-all after:duration-300 ${isActive
                            ? `${navActive} after:w-full`
                            : `${navInactive} after:w-0 hover:after:w-full`
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <a
                        href={item.href}
                        className={`relative pb-1 transition after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#D4AF37] after:transition-all after:duration-300 hover:after:w-full ${navInactive}`}
                      >
                        {item.label}
                      </a>
                    )}

                    <AnimatePresence>
                      {item.children && openDropdown === item.label && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className={`absolute left-0 mt-4 rounded-2xl border border-white/10 bg-[#2a0f17]/95 p-5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)] backdrop-blur-2xl ${hasDetailedChildren ? "w-[520px]" : "w-56"
                            }`}
                        >
                          {hasDetailedChildren ? (
                            <div className="grid grid-cols-2 gap-4">
                              {item.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href ?? "#"}
                                  className="flex items-start gap-4 rounded-xl bg-white/5 p-3 transition hover:bg-white/10"
                                >
                                  <img
                                    src={child.image}
                                    alt={child.label}
                                    className="h-20 w-24 shrink-0 rounded-lg object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  <div>
                                    <p className="text-[0.65rem] font-semibold normal-case tracking-[0.08em] text-[#D4AF37]">
                                      {child.label}
                                    </p>
                                    <p className="mt-1 text-[0.7rem] normal-case leading-snug text-white/70">
                                      {child.description}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-3 text-xs uppercase tracking-[0.2em] text-white/70">
                              {item.children.map((child) => {
                                const label = typeof child === "string" ? child : child.label;
                                const href = typeof child === "string" ? "#" : child.href ?? "#";
                                return (
                                <li key={label}>
                                  <NavLink
                                    to={href}
                                    className="flex items-center justify-between transition hover:text-[#D4AF37]"
                                  >
                                    {label}
                                    <span className="h-px w-6 bg-[#D4AF37]/40" />
                                    <span className="h-px w-6 bg-[#D4AF37]/40" />
                                  </NavLink>
                                </li>
                                );
                              })}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${menuButtonClass}`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="fixed right-0 top-0 h-dvh w-full max-w-md overflow-y-auto bg-[#4A1F2D] p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
                  Menu
                </p>

                <button
                  type="button"
                  className="text-white"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  X
                </button>
              </div>

              <div className="mt-8 space-y-4 text-sm uppercase tracking-[0.25em] text-white/80">
                {mobileNavItems.map((item) => (
                  <div key={item.label} className="border-b border-white/10 pb-4">
                    {item.children ? (
                      <button
                        type="button"
                        onClick={() => toggleMobileSection(item.label)}
                        className="flex w-full items-center justify-between"
                        aria-expanded={!!mobileSections[item.label]}
                      >
                        {item.label}
                        <span className="text-[#D4AF37]">v</span>
                      </button>
                    ) : item.href?.startsWith("/") ? (
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `block transition ${isActive ? "text-[#D4AF37]" : "text-white/80"
                          }`
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <a
                        href={item.href}
                        className="block"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </a>
                    )}

                    <AnimatePresence>
                      {item.children && mobileSections[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 space-y-3 overflow-hidden pl-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/70"
                        >
                          {item.children.map((child) => {
                            const label =
                              typeof child === "string" ? child : child.label;
                            const href =
                              typeof child === "string" ? "#" : child.href ?? "#";

                            return (
                              <NavLink
                                key={label}
                                to={href}
                                className="block hover:text-[#D4AF37]"
                                onClick={() => setMobileOpen(false)}
                              >
                                {label}
                              </NavLink>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
