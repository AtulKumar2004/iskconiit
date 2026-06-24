import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

// Placeholder hero image
const HERO_IMAGE = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop"; 
// Using a generic library image for placeholder as it will be provided later

const bookCategories = [
  {
    title: "Bhagavad Gita As It Is",
    description: "The timeless science of yoga and spiritual knowledge.",
    image: "/bgclass.png" // using existing placeholder
  },
  {
    title: "Srimad Bhagavatam",
    description: "The ripened fruit of the tree of Vedic literature.",
    image: "/guidance.png"
  },
  {
    title: "Sri Caitanya Caritamrta",
    description: "The post-graduate study of spiritual realization.",
    image: "/kirtan.png"
  },
  {
    title: "Prabhupada's Small Books",
    description: "Introduction to the philosophy of Krishna consciousness.",
    image: "/lib.png"
  },
  {
    title: "Books for Children",
    description: "Illustrated stories and spiritual education for kids.",
    image: "/guidance-2.png"
  },
  {
    title: "Vedic Philosophy & Lifestyle",
    description: "Deep dive into karma, reincarnation, and ayurveda.",
    image: "/association.png"
  }
];

const SectionOrbs = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
  </div>
);

export default function Library() {
  return (
    <div className="font-body bg-[#F8F5EF] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#12070c]">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Library Hero"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12070c] via-[#12070c]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-4 block">
              Knowledge | Discovery | Philosophy
            </span>
            <h1 className="font-display text-4xl text-white sm:text-5xl lg:text-6xl mb-6">
              Spiritual Library
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg">
              Explore our vast collection of Vedic literature, offering profound insights into the nature of the self, the universe, and the Ultimate Reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Book Categories Section */}
      <section className="relative py-20 overflow-hidden">
        <SectionOrbs />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl mb-4">
              Explore Our Collection
            </h2>
            <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-white/60 bg-white/80 overflow-hidden shadow-[0_20px_50px_-32px_rgba(31,23,28,0.3)] backdrop-blur-xl transition duration-500 hover:border-[#D4AF37]/60 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#4A1F2D]/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full z-20 text-[#D4AF37] shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-semibold text-[#2a1b22] mb-3">{category.title}</h3>
                  <p className="text-[#4b4246] mb-6 flex-grow">{category.description}</p>
                  <button className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#4A1F2D] transition-colors flex items-center mt-auto">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Visit Us Section */}
      <section className="bg-[#12070c] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <BookOpen className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-80" />
          <h2 className="font-display text-3xl text-white mb-4">Visit Our Physical Library</h2>
          <p className="text-white/80 mb-8">
            Come and spend some quiet time reading in our temple library. We have a peaceful environment perfect for deep study and contemplation.
          </p>
          <button className="rounded-full bg-[#D4AF37] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]">
            Contact for Timings
          </button>
        </div>
      </section>
    </div>
  );
}
