import React, { useState } from "react";
import axios from "axios";
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Users,
  Utensils,
  Landmark,
  ChevronDown,
} from "lucide-react";

const impactData = [
  {
    amount: "₹500",
    text: "Supports prasadam distribution for students.",
  },
  {
    amount: "₹1000",
    text: "Sponsors Bhagavad Gita books and study materials.",
  },
  {
    amount: "₹2500",
    text: "Helps organize spiritual outreach programs.",
  },
  {
    amount: "₹5000",
    text: "Supports mentorship and youth cultural events.",
  },
];

const categories = [
  {
    title: "Student Outreach",
    icon: Users,
    desc: "Bhagavad Gita classes, mentorship, and youth programs.",
  },
  {
    title: "Annadanam",
    icon: Utensils,
    desc: "Support prasadam distribution and community meals.",
  },
  {
    title: "Book Distribution",
    icon: BookOpen,
    desc: "Distribute spiritual wisdom through Gita and literature.",
  },
  {
    title: "Temple Support",
    icon: Landmark,
    desc: "Support spiritual activities and temple maintenance.",
  },
];

const faqs = [
  {
    q: "How are donations used?",
    a: "Donations support student outreach, prasadam distribution, festivals, spiritual education, and community programs.",
  },
  {
    q: "Are donations secure?",
    a: "Yes. Payments are securely processed through Razorpay.",
  },
  {
    q: "Can I donate monthly?",
    a: "Currently we support one-time donations.",
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#D4AF37]/20 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-white text-lg">
          {item.q}
        </span>

        <ChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div className="px-6 pb-5 text-gray-300">
          {item.a}
        </div>
      )}
    </div>
  );
}

const Donation = () => {
  const [amount, setAmount] = useState("1000");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const checkoutHandler = async (amount) => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const { data: { order } } = await axios.post(`${baseUrl}/api/checkout`, {
      amount,
      name,
      email,
      message
    });

    const { data: { key } } = await axios.get(`${baseUrl}/api/getKey`)

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "ISKCON IIT Bhubaneswar",
      description: "Test Transaction",
      image: "https://res.cloudinary.com/dunplsngs/image/upload/v1781880595/88ef1f72-c6d3-4032-a483-0e088b71c4af_fy7haw.png",
      order_id: order.id,
      callback_url: `${baseUrl}/api/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "+919876543210"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }




  return (
    <div className="bg-[#0F0A12] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <p className="text-[#D4AF37] tracking-[0.3em] uppercase mt-20">
            Support The Mission
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Help Transform Lives Through Wisdom & Devotion
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Your contribution helps organize spiritual programs,
            prasadam distribution, Bhagavad Gita education,
            and youth mentorship initiatives.
          </p>

          <button onClick={() => checkoutHandler(amount)} className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition duration-300">
            Donate Now
          </button>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-24 px-6 bg-[#140D18]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
              Impact
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Your Contribution Creates Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactData.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:-translate-y-2 transition duration-300"
              >
                <Heart className="text-[#D4AF37] mb-6" size={32} />

                <h3 className="text-3xl font-bold mb-4">
                  {item.amount}
                </h3>

                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
              Donation Categories
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Support Different Initiatives
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#D4AF37]/40 transition duration-300"
                >
                  <Icon
                    size={36}
                    className="text-[#D4AF37] mb-6"
                  />

                  <h3 className="text-2xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-300">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DONATION FORM */}
      <section className="py-24 px-6 bg-[#140D18]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
              Contribute With Devotion
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Become Part of Something Transformative
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              By supporting spiritual education and community
              outreach, you become part of a transformative
              journey of wisdom, compassion, and devotion.
            </p>

            <div className="rounded-3xl overflow-hidden">
              <img
                src="/donate.png"
                alt=""
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-8">
            <h3 className="text-3xl font-bold mb-8">
              Make a Donation
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {["500", "1000", "2500", "5000"].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-4 rounded-2xl font-semibold transition duration-300 ${amount === amt
                    ? "bg-[#D4AF37] text-black"
                    : "bg-white/5 border border-white/10"
                    }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Custom Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mb-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4AF37]"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4AF37]"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4AF37]"
            />

            <textarea
              placeholder="Message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-6 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#D4AF37]"
            />

            <button
              onClick={() => checkoutHandler(amount)}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300"
            >
              Donate Securely
            </button>

            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
              <ShieldCheck size={18} />
              <span>100% Secure Payments via Razorpay</span>
            </div>

            <div className="mt-8 text-center">
              <p className="text-[#D4AF37] mb-2">
                Alternative UPI Donation
              </p>

              <p className="text-gray-300">
                iskconiitbbsr@upi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
              FAQ
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            {faqs.map((item, index) => (
              <FAQItem key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 bg-[#140D18] text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] mb-4">
            Join The Mission
          </p>

          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Help Build a Community of Wisdom & Compassion
          </h2>

          <p className="text-gray-300 text-lg mb-10">
            Support spiritual education, prasadam distribution,
            mentorship, and transformative outreach initiatives.
          </p>

          <button onClick={() => checkoutHandler(amount)} className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-semibold hover:scale-105 transition duration-300">
            Donate Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Donation;