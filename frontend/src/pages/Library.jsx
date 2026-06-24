import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  BookOpen,
  Search,
  ExternalLink,
  Book,
  X,
  MapPin,
  Mail,
  ChevronRight,
  Library as LibraryIcon,
  BookCopy,
  Users,
  CheckCircle2,
  ZoomIn
} from "lucide-react";

/* ───────────────────────── Data ───────────────────────── */

const books = [
  { id: "bg", title: "Bhagavad Gita As It Is", image: "/lib/Bhagavad_Gita.png", categories: ["Bhagavad Gita", "Prabhupada Books"], buyLink: "https://www.amazon.in/Translation-Commentary-Bhaktivedanta-Prabhupada-Facilitator/dp/B0FN47Z3XC/ref=asc_df_B0FN47Z3XC?mcid=29a6b657a6793a54bcb54041c30077c5&tag=googleshopdes-21&linkCode=df0&hvadid=710035920198&hvpos=&hvnetw=g&hvrand=11112967750271293556&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9150971&hvtargid=pla-2459093363695&psc=1&hvocijid=11112967750271293556-B0FN47Z3XC-&hvexpln=0&gad_source=1", readLink: "https://vedabase.io/en/library/bg/", featured: true },
  { id: "sb", title: "Srimad Bhagavatam", image: "/lib/bhagavatam.png", categories: ["Bhagavatam", "Prabhupada Books"], buyLink: "https://www.amazon.in/Srimad-Bhagavatam-Complete-Cantos-Bhagavat/dp/8189574809?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A2JMFOE0E0F75F", readLink: "https://vedabase.io/en/library/sb", featured: true },
  { id: "cc", title: "Chaitanya Charitamrita", image: "/lib/cc.png", categories: ["Chaitanya Charitamrita", "Prabhupada Books"], buyLink: "https://www.amazon.in/Caitanya-Caritamrta-Full-Bhaktivedanta-Swami-Prabhupada/dp/8189574647", readLink: "https://vedabase.io/en/library/cc", featured: true },
  { id: "sos", title: "Science of Self Realization", image: "/lib/soselfrealization.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/SCIENCE-SELF-REALIZATION-Bhaktivedanta-Swami-Prabhupada/dp/B07LDNK6JH/ref=asc_df_B07LDNK6JH?mcid=4749cbc1833a396586ae457f120cf261&tag=googleshopdes-21&linkCode=df0&hvadid=709881838747&hvpos=&hvnetw=g&hvrand=6820728595231526055&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9150971&hvtargid=pla-2193742307507&psc=1&hvocijid=6820728595231526055-B07LDNK6JH-&hvexpln=0&gad_source=1", readLink: "https://vedabase.io/en/library/ssr/", featured: true },
  { id: "nod", title: "Nectar of Devotion", image: "/lib/nod.png", categories: ["Prabhupada Books", "Devotional Literature"], buyLink: "https://iskcontsp.org/product/the-nectar-of-devotion-english/", readLink: "https://vedabase.io/en/library/nod/", featured: true },
  { id: "sc", title: "A Second Chance", image: "/lib/sc.png", categories: ["Devotional Literature", "Prabhupada Books"], buyLink: "https://www.flipkart.com/a-second-chance/p/itm6730a3cc03588", readLink: "https://vedabase.io/en/library/sc/", featured: true },
  { id: "bbd", title: "Beyond Birth and Death", image: "/lib/bbd.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.flipkart.com/beyond-birth-death/p/itm05e926bcab7e8", readLink: "https://vedabase.io/en/library/bbd/", featured: false },
  { id: "btg", title: "Back to Godhead", image: "/lib/btg.png", categories: ["Devotional Literature"], buyLink: "https://btg.krishna.com/previous-issues/", readLink: "https://btg.krishna.com/", featured: false },
  { id: "cb", title: "Coming Back - The Science of Reincarnation", image: "/lib/cb.png", categories: ["Devotional Literature"], buyLink: "https://www.amazon.in/Coming-Back-C-Bhaktivedanta-Swami-Prabhupada/dp/9382716939?s=bazaar", readLink: "https://vedabase.io/en/library/", featured: false },
  { id: "ct", title: "Civilization and Transcendence", image: "/lib/ct.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/Civilization-Transcendence-Divine-Bhaktivedanta-Prabhupada-ebook/dp/B013CT6S74", readLink: "https://vedabase.io/en/library/cat/", featured: false },
  { id: "ejtop", title: "Easy Journey to Other Planets", image: "/lib/ejtop.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/Journey-Planets-Divine-Bhaktivedanta-Prabhupada-ebook/dp/B00C5NZACI", readLink: "https://prabhupadabooks.com/pdf/Easy-Journy-to-Other-Planets-1977-Scanned-edition.pdf", featured: false },
  { id: "etkc", title: "Elevation to Krishna Consciousness", image: "/lib/etkc.png", categories: ["Prabhupada Books"], buyLink: "https://www.amazon.in/Elevation-Krishna-Consciousness-Bhaktivedanta-Swami/dp/0912776439?s=bazaar", readLink: "https://prabhupadabooks.com/etkc", featured: false },
  { id: "hkc", title: "Hare Krishna Challenge", image: "/lib/hkc.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/Krishna-Challenge-Bhaktivedanta-Swami-Prabhupada/dp/B078PMQFSG?s=bazaar", readLink: "https://vedabase.io/en/library/", featured: false },
  { id: "img", title: "Krishna, The Supreme Personality of Godhead", image: "/lib/image.png", categories: ["Devotional Literature"], buyLink: "https://www.flipkart.com/krishna-supreme-personality-godhead/p/itme54702502cf7d?pid=9788189574185&lid=LSTBOK9788189574185FZUG7E&marketplace=FLIPKART&cmpid=content_book_8965229628_gmc", readLink: "https://vedabase.io/en/library/kb/", featured: false },
  { id: "itbgasitis", title: "Introduction to Bhagavad Gita As It Is", image: "/lib/itbgasitis.png", categories: ["Bhagavad Gita", "Prabhupada Books"], buyLink: "https://iskconshop.com/product/introduction-to-bhagavad-gita-english/", readLink: "https://vedabase.io/en/library/bg/introduction/", featured: false },
  { id: "jsd", title: "Journey of Self Discovery", image: "/lib/jsd.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.flipkart.com/the-journey-of-self-discovery/p/itmdyywsrurxabbe?pid=9780892132706&lid=LSTBOK9780892132706P57UBF&marketplace=FLIPKART&cmpid=content_book_8965229628_gmc", readLink: "https://vedabase.io/en/library/josd/", featured: false },
  { id: "lcl", title: "Life Comes from Life", image: "/lib/lcl.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.flipkart.com/life-comes/p/itm12e9a089594eb?pid=9789388883078&lid=LSTBOK9789388883078MN6TSN&marketplace=FLIPKART&cmpid=content_book_8965229628_gmc", readLink: "https://prabhupadabooks.com/lcfl", featured: false },
  { id: "mg", title: "Matchless Gifts", image: "/lib/mg.png", categories: ["Prabhupada Books"], buyLink: "https://www.amazon.in/Krsna-Consciousness-Bhaktivedanta-Swami-Prabhupada-ebook/dp/B0GY22K54T", readLink: "https://prabhupadabooks.com/mg", featured: false },
  { id: "mog", title: "Message of Godhead", image: "/lib/mog.png", categories: ["Prabhupada Books"], buyLink: "https://www.amazon.in/Message-Godhead-C-Bhaktivedanta-Swami/dp/089213299X", readLink: "https://vanisource.org/wiki/Message_of_Godhead_(1990)", featured: false },
  { id: "noi", title: "Nectar of Instruction", image: "/lib/noi.png", categories: ["Prabhupada Books", "Devotional Literature"], buyLink: "https://iskconvrindavanmart.com/product/the-nectar-of-instruction/", readLink: "https://vedabase.io/en/library/noi/", featured: false },
  { id: "otwtk", title: "On the Way to Krishna", image: "/lib/otwtk.png", categories: ["Prabhupada Books"], buyLink: "https://www.flipkart.com/on-the-way-to-krsna/p/itmf3h36puxzwckr", readLink: "https://vedabase.io/en/library/owk/", featured: false },
  { id: "pl", title: "Prabhupada Lilamrita", image: "/lib/pl.png", categories: ["Devotional Literature"], buyLink: "https://www.amazon.in/Srila-Prabhupada-Lilamrta-Biography-Founder/dp/8189574299", readLink: "https://vedabase.io/en/library/spl/", featured: false },
  { id: "pop", title: "Path of Perfection", image: "/lib/pop.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://iskconshop.com/product/the-path-of-perfection-english/", readLink: "https://vedabase.io/en/library/pop/", featured: false },
  { id: "poy", title: "The Perfection of Yoga", image: "/lib/poy.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/Perfection-Yoga-C-Bhaktivedanta-Swami/dp/0912776366?s=bazaar", readLink: "https://vedabase.io/en/library/poy/", featured: false },
  { id: "pqpa", title: "Perfect Questions Perfect Answers", image: "/lib/pqpa.png", categories: ["Prabhupada Books"], buyLink: "https://www.amazon.in/Perfect-Questions-Answers-Bhaktivedanta-Publications/dp/B07KYFJ28D?s=bazaar", readLink: "https://vedabase.io/en/library/pqpa/", featured: false },
  { id: "rop", title: "Krishna - The Reservoir of Pleasure", image: "/lib/rop.png", categories: ["Devotional Literature"], buyLink: "https://www.amazon.in/Krishna-Reservoir-Pleasure-C-Bhaktivedanta-Prabhupada/dp/9382716440?s=bazaar", readLink: "https://prabhupadabooks.com/krop", featured: false },
  { id: "rv", title: "Raja Vidya - The King of Knowledge", image: "/lib/rv.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://iskconshop.com/product/raja-vidya-english/", readLink: "https://vedabase.io/en/library/rv/", featured: false },
  { id: "sbkc", title: "The Scientific Basis of Krishna Consciousness", image: "/lib/sbkc.png", categories: ["Prabhupada Books"], buyLink: "https://www.exoticindiaart.com/book/details/scientific-basis-of-krishna-consciousness-nau835/", readLink: "https://krishna.org/wp-content/uploads/2016/07/The-Scientific-Basis-of-Krishna-Consciousness-Svarupa-Damodar-dasa-Ph.D..pdf", featured: false },
  { id: "sok", title: "The Sword of Knowledge", image: "/lib/sok.png", categories: ["Devotional Literature"], buyLink: "https://iskconbooks.jivadaya.org/shop/hnd0sok-sword-of-knowledge-hindi-2255", readLink: "https://vedabase.io/en/library/", featured: false },
  { id: "sri", title: "Sri Isopanisad", image: "/lib/sriisopanisad.png", categories: ["Prabhupada Books"], buyLink: "https://www.amazon.in/Sri-Isopanisad-Bhaktivedanta-Swami-Prabhupada-ebook/dp/B0052PK02Q", readLink: "https://vedabase.io/en/library/iso/", featured: false },
  { id: "told", title: "Teachings of Lord Chaitanya", image: "/lib/told.png", categories: ["Prabhupada Books", "Chaitanya Charitamrita"], buyLink: "https://www.amazon.com/Teachings-Caitanya-Divine-Bhaktivedanta-Prabhupada-ebook/dp/B00HUWQD8E", readLink: "https://vedabase.io/en/library/tlc/", featured: false },
  { id: "tolk", title: "Teachings of Lord Kapila", image: "/lib/tolk.png", categories: ["Prabhupada Books"], buyLink: "https://iskconshop.com/product/teachings-of-lord-kapila-english/", readLink: "https://vedabase.io/en/library/tlk/", featured: false },
  { id: "toqk", title: "Teachings of Queen Kunti", image: "/lib/toqk.png", categories: ["Prabhupada Books", "Bhagavatam"], buyLink: "https://www.amazon.in/Teachings-Queen-Kunti-Bhaktivedanta-Publications/dp/B07KYC3WTV?s=bazaar", readLink: "https://vedabase.io/en/library/tqk/", featured: false },
  { id: "ttpm", title: "Transcendental Teachings of Prahlada Maharaja", image: "/lib/ttpm.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://iskconshop.com/product/transcendental-teachings-of-prahlada-maharaj-english/", readLink: "https://prabhupadabooks.com/ttpm", featured: false },
  { id: "tys", title: "Krishna Consciousness - The Topmost Yoga System", image: "/lib/tys.png", categories: ["Prabhupada Books", "Self Development"], buyLink: "https://www.amazon.in/Krsna-Consciousness-Topmost-Yoga-System/dp/B073GP9HW7/ref=tmm_hrd_swatch_0", readLink: "https://prabhupadabooks.com/tys", featured: false },
];

const categoriesList = [
  "All",
  "Bhagavad Gita",
  "Bhagavatam",
  "Chaitanya Charitamrita"
];

const libraryPhotos = [
  { id: 1, src: "/lib/lib1.png", alt: "ISKCON IIT-BBSR Library View 1" },
  { id: 2, src: "/lib/lib2.png", alt: "ISKCON IIT-BBSR Library View 2" },
  { id: 3, src: "/lib/lib3.png", alt: "ISKCON IIT-BBSR Library View 3" },
  { id: 4, src: "/lib/liib4.png", alt: "ISKCON IIT-BBSR Library View 4" }
];

/* ───────────────────── Utilities ──────────────────────── */

const useCountUp = (target, start, reduceMotion, duration = 1500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let raf = 0;
    let t0;

    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduceMotion, start, target]);

  return value;
};

/* ───────────────── Reusable Components ────────────────── */

const SectionOrbs = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.7),_transparent_60%)]" />
  </div>
);

const StatCounter = ({ end, label, suffix = "+", icon: Icon }) => {
  const ref = useRef(null);
  const rm = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(end, inView, rm);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/10 border border-white/20 shadow-sm backdrop-blur-md"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-3xl font-display font-bold text-white">
        {typeof end === 'number' ? count : end}{suffix}
      </p>
      <p className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37] mt-2 text-center">
        {label}
      </p>
    </motion.div>
  );
};

/* ═══════════════════ Main Component ══════════════════════ */

export default function Library() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [readOnlineModalOpen, setReadOnlineModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  const rm = useReducedMotion();

  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === "All" || book.categories.includes(activeCategory);
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBooks = books.filter(b => b.featured);

  // Lock body scroll when modals are open
  useEffect(() => {
    if (readOnlineModalOpen || lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [readOnlineModalOpen, lightboxIndex]);

  // Handle escape key for modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setReadOnlineModalOpen(false);
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F5EF] font-body text-[#2a1b22] selection:bg-[#D4AF37]/30 selection:text-[#4A1F2D]">
      
      {/* ━━ 1. Hero Section ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/lib/lib1.png"
            alt="ISKCON IIT-BBSR Library"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c0d12]/95 via-[#2a1b22]/80 to-[#1c0d12]/60" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Mini Spiritual Library</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
              ISKCON IIT-BBSR <span className="text-[#D4AF37] italic font-medium">Library</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed">
              Explore timeless spiritual wisdom through Srila Prabhupada's books and other Vedic literature in our peaceful devotional atmosphere.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="#collection"
                className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-[#4A1F2D] transition duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                Browse Collection
              </a>
              <a
                href="#visit"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-white/20 hover:border-white/50"
              >
                Visit Library
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Subtle scroll down indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white mb-2">Scroll</span>
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ━━ 2. About Library Section ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-24 overflow-hidden bg-white">
        <SectionOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Swiper Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(74,31,45,0.3)] border border-[#D4AF37]/20 aspect-[4/3]"
            >
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="w-full h-full library-swiper"
              >
                {libraryPhotos.map((photo) => (
                  <SwiperSlide key={photo.id}>
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#4A1F2D] mb-6">
                Our Mini <span className="text-[#D4AF37] italic">Spiritual Library</span>
              </h2>
              <div className="space-y-6 text-[#4b4246] text-lg leading-relaxed mb-10">
                <p>
                  The ISKCON IIT-BBSR Library houses a growing collection of Bhagavad Gita, Srimad Bhagavatam, Chaitanya Charitamrita, Vedic literature, self-development books, and spiritual classics.
                </p>
                <p>
                  Visitors are welcome to spend time reading and studying these books in a peaceful devotional atmosphere. <strong className="text-[#4A1F2D] font-semibold">Note: Books are free to read at the centre and are not sold directly by us.</strong>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Peaceful Reading Environment", icon: LibraryIcon },
                  { title: "Spiritual Literature", icon: Book },
                  { title: "Open To Everyone", icon: Users },
                  { title: "Free Reading Facility", icon: CheckCircle2 }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F5EF] border border-[#D4AF37]/20">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#D4AF37] shadow-sm">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#2a1b22]">{feature.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ━━ 3. Statistics Section ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-16 bg-[#4A1F2D] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.1),_transparent_70%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter end={100} label="Books" icon={BookCopy} />
            <StatCounter end={25} label="Categories" icon={LibraryIcon} />
            <StatCounter end="Yes" suffix="" label="Open For All" icon={Users} />
            <StatCounter end="Free" suffix="" label="Reading" icon={BookOpen} />
          </div>
        </div>
      </section>



      {/* ━━ 5. Book Collection & Filters ━━━━━━━━━━━━━━━━━━ */}
      <section id="collection" className="relative py-24 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-semibold text-[#4A1F2D] mb-4">Book Collection</h2>
            <p className="text-[#4b4246] text-lg">Browse the books available in our library.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <input
                type="text"
                placeholder="Search Bhagavad Gita, Chaitanya Charitamrita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#F8F5EF] border border-[#D4AF37]/30 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-transparent text-sm text-[#4A1F2D] placeholder-[#4b4246]/60 shadow-sm transition-all"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:w-auto">
              {categoriesList.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === category 
                      ? "bg-[#4A1F2D] text-[#D4AF37] shadow-md border border-[#4A1F2D]" 
                      : "bg-[#F8F5EF] text-[#4b4246] hover:bg-[#D4AF37]/10 border border-[#D4AF37]/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Book Grid */}
          {filteredBooks.length > 0 ? (
            <>
              <motion.div 
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10"
              >
              <AnimatePresence>
                {filteredBooks.map((book) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={book.id}
                    className="group flex flex-col"
                  >
                    <div className="relative w-full aspect-[2/3] bg-[#12070c] rounded-xl overflow-hidden shadow-md group-hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] transition-shadow duration-300 border border-white/10">
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full h-full object-contain p-2 filter drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 backdrop-blur-sm">
                        <button 
                          onClick={() => window.open(book.readLink, "_blank")}
                          className="cursor-pointer w-full py-2.5 bg-white/10 hover:bg-white text-white hover:text-[#4A1F2D] rounded-full text-xs font-bold uppercase tracking-wider transition-colors border border-white/30 backdrop-blur-md flex items-center justify-center gap-1"
                        >
                          Read Online <ExternalLink className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => window.open(book.buyLink, "_blank")}
                          className="cursor-pointer w-full py-2.5 bg-[#D4AF37] hover:bg-[#e0b940] text-[#4A1F2D] rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-1"
                        >
                          Buy Book <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex-grow flex flex-col">
                      <h3 className="font-display text-sm font-bold text-[#2a1b22] line-clamp-2 leading-snug group-hover:text-[#4A1F2D] transition-colors">
                        {book.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* 'Much more' text at the end */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="font-display text-2xl md:text-3xl text-[#4A1F2D]/60 italic font-medium">
                ...and much more!
              </p>
              <p className="text-[#4b4246] mt-2 text-sm">
                Visit our library to explore the complete collection.
              </p>
            </motion.div>
          </>
            
          ) : (
            /* Empty State */
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-20 flex flex-col items-center justify-center text-center bg-[#F8F5EF] rounded-3xl border border-dashed border-[#D4AF37]/50"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Search className="w-8 h-8 text-[#D4AF37]/50" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#4A1F2D] mb-2">No books found</h3>
              <p className="text-[#4b4246]">Try adjusting your search term or category filter.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-6 px-6 py-2.5 bg-white border border-[#D4AF37]/30 rounded-full text-xs font-bold uppercase tracking-wider text-[#4A1F2D] hover:bg-[#D4AF37]/10 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ━━ 6. Library Gallery ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-24 bg-[#12070c] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(212,175,55,0.1),_transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-semibold text-white mb-4">Library Gallery</h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {libraryPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightboxIndex(index)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#4A1F2D]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center border border-white/50 text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ 7. Visit Library CTA ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="visit" className="relative py-24 bg-[#D4AF37] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.4),_transparent_60%)]" />
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <BookOpen className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-[#4A1F2D]">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">ISKCON IIT-BBSR Library</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto font-medium">
            Visitors are welcome to read books in the library during centre visiting hours. Experience spiritual learning in a peaceful devotional atmosphere.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4A1F2D] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:shadow-xl">
              <MapPin className="w-4 h-4" /> Visit Centre
            </a>
          </div>
        </div>
      </section>

      {/* ━━ Modals ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      
      {/* Read Online Modal */}
      <AnimatePresence>
        {readOnlineModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12070c]/80 backdrop-blur-md"
            onClick={() => setReadOnlineModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F5EF] rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-[#D4AF37]/30 text-center"
            >
              <button 
                onClick={() => setReadOnlineModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#4b4246] hover:text-[#4A1F2D] hover:bg-[#D4AF37]/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-20 h-20 mx-auto bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                <BookOpen className="w-10 h-10" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-[#4A1F2D] mb-3">Online Reading</h3>
              <p className="text-[#4b4246] mb-8">
                Online reading coming soon. We are working on bringing this feature to you. In the meantime, please visit our physical library.
              </p>
              
              <button 
                onClick={() => setReadOnlineModalOpen(false)}
                className="w-full py-3.5 bg-[#4A1F2D] text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#2a1b22] transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img 
                src={libraryPhotos[lightboxIndex].src} 
                alt={libraryPhotos[lightboxIndex].alt} 
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-center text-white/70 mt-4 font-medium uppercase tracking-widest text-xs">
                {libraryPhotos[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
