import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  CheckCircle2,
  Share2,
  Heart,
  BookOpen,
  Users,
  Home,
  Calendar,
  ChevronRight,
  MessageCircle,
  Copy,
  Utensils,
  PartyPopper,
  HandHeart
} from "lucide-react";

// --- Subcomponents ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ImpactCard = ({ icon: Icon, title, description, delay }) => (
  <FadeIn delay={delay} className="bg-white rounded-3xl p-8 shadow-sm border border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="w-14 h-14 rounded-2xl bg-[#F8F5EF] flex items-center justify-center mb-6 text-[#800000]">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-[#1a0b12] mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </FadeIn>
);

// --- Main Page Component ---

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") || "TXN_NOT_FOUND";
  
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Stop dropping new confetti after 6 seconds
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#F8F5EF] min-h-screen overflow-hidden font-body">
      <Confetti
        width={width}
        height={height}
        recycle={showConfetti}
        numberOfPieces={300}
        colors={["#D4AF37", "#800000", "#FFD700", "#FFFFFF", "#FFA500"]}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 px-6 text-center min-h-[60vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image moved to Top */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.iskcondelhi.com/wp-content/uploads/2021/05/iskcon-delhi-donation-page.jpg" 
            alt="ISKCON Temple" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b12]/80 via-[#1a0b12]/60 to-[#1a0b12]/90" />
        </div>

        <FadeIn className="relative z-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl shadow-[#D4AF37]/20 text-[#22c55e] mb-8 border-4 border-[#1a0b12] outline outline-1 outline-[#D4AF37]/50">
            <CheckCircle2 size={50} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Thank You for Your<br className="hidden md:block"/> Generous Contribution!
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-medium leading-relaxed drop-shadow-md">
            Your donation has been received successfully. Thank you for supporting the mission of spreading spiritual wisdom, education, prasadam distribution, outreach programs, and devotional services.
          </p>
        </FadeIn>
      </section>

      {/* 2. DONATION SUMMARY CARD */}
      <section className="px-6 pt-16 pb-20 relative z-10">
        <FadeIn delay={0.2} className="max-w-xl mx-auto">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-[#800000]/5 border border-[#D4AF37]/20 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-end border-b border-gray-100 pb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">Donation Amount</p>
                  <p className="text-4xl font-bold text-[#800000]">
                    {searchParams.get("amount") ? `₹${searchParams.get("amount")}` : "Successful"}
                  </p>
                </div>
                <div className="bg-[#22c55e]/10 text-[#22c55e] px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  Success
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-medium text-gray-900 break-all">{reference}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                  <p className="font-medium text-gray-900">Razorpay Secure</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-[#22c55e]">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3 & 4. IMPACT SECTION */}
      <section className="py-24 px-6 bg-white border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1a0b12] mb-6">
                Every Contribution<br/>Makes a Difference
              </h2>
              <p className="text-lg text-gray-600">
                Your support directly helps us conduct these vital community services.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImpactCard
              delay={0.1}
              icon={BookOpen}
              title="Gita Distribution"
              description="Sharing the timeless wisdom of Bhagavad-gita with students and society."
            />
            <ImpactCard
              delay={0.2}
              icon={Utensils}
              title="Prasadam Distribution"
              description="Distributing sanctified vegetarian food to hundreds of people weekly."
            />
            <ImpactCard
              delay={0.3}
              icon={Users}
              title="Student Outreach"
              description="Empowering youth through character-building workshops and spiritual mentorship."
            />
            <ImpactCard
              delay={0.4}
              icon={Home}
              title="Village Outreach"
              description="Taking spiritual culture and holistic development to rural areas."
            />
            <ImpactCard
              delay={0.5}
              icon={Heart}
              title="Children's Programs"
              description="Cultivating strong moral and spiritual foundations in the next generation."
            />
            <ImpactCard
              delay={0.6}
              icon={PartyPopper}
              title="Festivals & Events"
              description="Hosting vibrant community celebrations of Krishna conscious culture."
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PaymentSuccess;
