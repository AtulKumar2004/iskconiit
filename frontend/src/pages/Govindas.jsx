import React, { useRef } from "react";
import { motion } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import {
  Leaf,
  Heart,
  ChefHat,
  Sparkles,
  Users,
  Flame,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// --- Components ---

const SectionOrbs = () => (
  <div className="pointer-events-none absolute inset-0 z-0">
    <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
    <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.6),_transparent_60%)]" />
  </div>
);

const SectionHeader = ({ eyebrow, title, description, align = "center", isDark = false }) => (
  <div className={`space-y-4 ${align === "center" ? "text-center" : "text-left"} relative z-10 mb-12`}>
    {eyebrow && (
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">{eyebrow}</span>
        <span className="h-px w-14 bg-[#D4AF37]/70" />
      </div>
    )}
    <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-white" : "text-[#2a1b22]"} sm:text-4xl lg:text-5xl`}>{title}</h2>
    {description && <p className={`text-base ${isDark ? "text-white/80" : "text-[#4b4246]"} sm:text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>{description}</p>}
  </div>
);

// --- Sections ---

const HeroSection = () => {
  const scrollToFlipbook = () => {
    document.getElementById('digital-menu').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVisit = () => {
    document.getElementById('visit-us').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#1a0b12]" aria-label="Govinda's Restaurant hero">
      <div className="absolute inset-0">
        <img 
          src="/govindas/govindas.png" 
          alt="Govinda's Restaurant" 
          className="w-full h-full object-cover object-top opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A1F2D]/95 via-[#1a0b12]/90 to-[#4A1F2D]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.25),_transparent_60%)]" />
      </div>
      
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 pb-16 pt-32 lg:px-12">
        <motion.p 
          initial={{ opacity: 0, y: 12 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] font-semibold"
        >
          Pure Vegetarian • Sattvic • Offered to Krishna
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.1 }} 
          className="mt-5 max-w-3xl font-display text-4xl text-white sm:text-5xl lg:text-7xl"
        >
          Govinda's Restaurant
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }} 
          className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg leading-relaxed"
        >
          Experience nourishing prasadam lovingly prepared and offered to Lord Krishna before being served.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.3 }} 
          className="mt-10 flex flex-wrap gap-4"
        >
          <button 
            onClick={scrollToFlipbook} 
            className="rounded-full bg-[#D4AF37] px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#4A1F2D] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(212,175,55,0.7)]"
          >
            View Digital Menu
          </button>
          <button 
            onClick={scrollToVisit} 
            className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
          >
            Visit Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="py-24 px-6 bg-[#F8F5EF] relative overflow-hidden">
    <SectionOrbs />
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
        <div className="absolute inset-0 bg-[#D4AF37]/20 transform translate-x-4 translate-y-4 rounded-3xl" />
        <img 
          src="/prasaddistribute.png" 
          alt="Prasadam preparation" 
          className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl" 
        />
      </motion.div>
      
      <div>
        <SectionHeader eyebrow="Our Ethos" title="More Than a Meal" align="left" />
        <p className="text-lg text-[#4b4246] leading-relaxed mb-8">
          At Govinda's Restaurant, every preparation is lovingly cooked using fresh ingredients and offered to Lord Krishna before being served as prasadam.
        </p>
        <p className="text-lg text-[#4b4246] leading-relaxed mb-10">
          Enjoy nutritious, wholesome meals in a peaceful spiritual atmosphere designed to rejuvenate both body and soul.
        </p>
        
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "100% Vegetarian", icon: Leaf },
            { title: "No Onion & Garlic", icon: Sparkles },
            { title: "Freshly Prepared", icon: ChefHat },
            { title: "Offered to Krishna", icon: Heart },
            { title: "Hygienic Kitchen", icon: Flame },
            { title: "Family Friendly", icon: Users }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4A1F2D]/10 flex items-center justify-center text-[#4A1F2D]">
                <feature.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-[#2a1b22] text-sm">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CurrentMenuSection = () => {
  const menuItems = [
    {
      title: "Normal Thali",
      price: "₹90",
      items: ["Chapati", "Rice", "Dal", "Sabji", "Salad"],
      delay: 0.1
    },
    {
      title: "Special Thali",
      price: "₹170",
      items: ["Chapati", "Rice", "Dal", "Premium Sabji", "Sweet", "Salad"],
      delay: 0.2,
      featured: true
    },
    {
      title: "Snacks",
      price: "From ₹5",
      items: ["Pani Puri - ₹50", "Noodles - ₹50", "Puri Chole - ₹80", "Chapati - ₹5 per piece", "Sabji - ₹40"],
      delay: 0.3
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#F8F5EF] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"></div>
      <SectionOrbs />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader eyebrow="Our Menu" title="Current Offerings" description="Wholesome prasadam meals prepared daily." isDark={false} />
        
        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className={`relative rounded-2xl border bg-white/80 p-8 shadow-[0_20px_50px_-32px_rgba(31,23,28,0.45)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 ${item.featured ? 'border-2 border-[#D4AF37] hover:border-[#D4AF37]/80' : 'border-white/70 hover:border-[#D4AF37]/60'}`}
            >
              {item.featured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#1a0b12] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                <h3 className="font-display text-2xl font-bold text-[#4A1F2D]">{item.title}</h3>
                <span className="bg-[#4A1F2D]/5 text-[#4A1F2D] font-bold text-xl px-4 py-2 rounded-xl">{item.price}</span>
              </div>
              <ul className="space-y-4">
                {item.items.map((line, i) => (
                  <li key={i} className="flex items-center text-gray-600 font-medium">
                    <Sparkles className="w-4 h-4 mr-3 text-[#D4AF37]" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DigitalMenuFlipbook = () => {
  const book = useRef();

  const pages = [
    "/govindas/1st.png",
    "/govindas/2nd.png",
    "/govindas/3rd.png",
    "/govindas/4th.png",
    "/govindas/5th.png",
    "/govindas/6th.png",
    "/govindas/7th.png",
    "/govindas/8th.png"
  ];

  return (
    <section id="digital-menu" className="py-24 px-6 bg-[#F8F5EF] relative overflow-hidden">
      <SectionOrbs />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Digital Menu</span>
              <span className="h-px w-14 bg-[#D4AF37]/70 hidden lg:block" />
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#2a1b22] leading-tight">
              AVAILABLE<br />NOW
            </h2>
            
            <p className="text-lg text-[#4A1F2D] font-medium tracking-wide uppercase mt-4">
              Click the arrows to flip through
            </p>
          </div>

          {/* Right Flipbook Container */}
          <div className="relative bg-[#2b2b2b] py-3 sm:py-4 px-0 rounded-xl shadow-2xl flex items-center justify-center w-full">
            
            <button 
              onClick={() => book.current.pageFlip().flipPrev()} 
              className="absolute left-1 sm:left-2 z-20 text-white/50 hover:text-white transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" />
            </button>

            <div className="mx-auto w-full max-w-[650px] drop-shadow-2xl flex justify-center">
              <HTMLFlipBook
                width={280}
                height={400}
                size="stretch"
                minWidth={200}
                maxWidth={320}
                minHeight={280}
                maxHeight={450}
                maxShadowOpacity={0.5}
                showCover={false}
                mobileScrollSupport={true}
                className="mx-auto"
                ref={book}
              >
                {pages.map((imgSrc, index) => (
                  <div key={index} className="flex items-center justify-center overflow-hidden bg-white">
                    <img src={imgSrc} alt={`Menu Page ${index + 1}`} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            <button 
              onClick={() => book.current.pageFlip().flipNext()} 
              className="absolute right-2 sm:right-4 z-20 text-white/50 hover:text-white transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md" />
            </button>
            
          </div>

        </div>
      </div>
    </section>
  );
};

const WhyOurPrasadam = () => {
  const cards = [
    { title: "100% Sattvic", icon: Leaf },
    { title: "Offered to Krishna", icon: Heart },
    { title: "Freshly Prepared Daily", icon: ChefHat },
    { title: "Nourishing for Body & Soul", icon: Sparkles },
    { title: "Family Friendly", icon: Users },
    { title: "Spiritual Atmosphere", icon: Flame }
  ];

  return (
    <section className="py-24 px-6 bg-[#4A1F2D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4 text-xs font-bold">Why Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display">Why Our Prasadam?</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition duration-300 group"
            >
              <div className="mb-5 flex justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                <card.icon className="w-10 h-10 drop-shadow-md" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-semibold text-lg">{card.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VisitUsSection = () => (
  <section id="visit-us" className="py-24 px-6 bg-[#F8F5EF] relative overflow-hidden">
    <SectionOrbs />
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <div>
        <SectionHeader eyebrow="Visit Us" title="Come Experience" align="left" />
        
        <div className="space-y-8 bg-white p-8 rounded-3xl shadow-lg border border-[#D4AF37]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full -z-0" />
          
          <div className="flex items-start gap-4 relative z-10">
            <MapPin className="w-6 h-6 text-[#4A1F2D] mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-[#2a1b22] mb-1">Govinda's Restaurant</h4>
              <p className="text-gray-600">ISKCON IIT Centre<br />Bhubaneswar</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <Clock className="w-6 h-6 text-[#4A1F2D] mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-[#2a1b22] mb-1">Lunch Timing</h4>
              <p className="text-gray-600">12:00 PM – 3:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <Phone className="w-6 h-6 text-[#4A1F2D] mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-[#2a1b22] mb-1">Contact</h4>
              <p className="text-gray-600">WhatsApp: +91 8895400410</p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4 relative z-10">
            <a href="https://maps.google.com/?q=ISKCON+IIT+Center+Bhubaneswar" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#4A1F2D] text-[#D4AF37] px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#2a1b22] transition-colors">
              Get Directions
            </a>
            <a href="https://wa.me/918895400410" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white text-[#4A1F2D] border border-[#4A1F2D] px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#F8F5EF] transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239716.9335876586!2d85.38449128671876!3d20.151683800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19ad003a8c1395%3A0x464f0bdec98c95ea!2sISKCON%20IIT%20Center%20and%20Govinda&#39;s%20Restaurant!5e0!3m2!1sen!2sin!4v1781621057024!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-32 px-6 bg-[#1a0b12] text-center relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2000&auto=format&fit=crop" alt="Prasadam Background" className="w-full h-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b12] to-transparent" />
    </div>
    
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#D4AF37] uppercase tracking-[0.4em] mb-6 text-sm font-bold">
        Experience The Divine Taste
      </motion.p>
      
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-bold text-white font-display mb-8">
        Come Experience the Taste of Prasadam
      </motion.h2>
      
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-300 text-xl md:text-2xl mb-12 font-medium">
        Not just a meal, but a spiritual experience.
      </motion.p>
      
      <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} onClick={() => document.getElementById('visit-us').scrollIntoView({ behavior: 'smooth' })} className="bg-[#D4AF37] text-[#1a0b12] px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
        Visit Govinda's Today
      </motion.button>
    </div>
  </section>
);

export default function Govindas() {
  return (
    <main className="bg-[#F8F5EF] min-h-screen">
      <HeroSection />
      <AboutSection />
      <CurrentMenuSection />
      <DigitalMenuFlipbook />
      <WhyOurPrasadam />
      <VisitUsSection />
      <FinalCTA />
    </main>
  );
}
