import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  MapPin, Phone, Mail, Clock, 
  ChevronDown, ArrowRight, Loader2, Send,
  Users, Presentation, Home as HomeIcon, HeartHandshake
} from "lucide-react";

// --- Schema & Validation ---
const contactSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 chars)"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const faqs = [
  { question: "How can I attend Sunday Feast?", answer: "Our Sunday Feast is open to all. Simply visit the centre at 12:00 PM every Sunday." },
  { question: "How can I invite devotees to my home?", answer: "You can use the 'Request a House Program' link or email us directly to schedule a visit." },
  { question: "Can I volunteer?", answer: "Absolutely! We are always looking for enthusiastic volunteers. Check our Volunteer section." },
  { question: "How can I join outreach programs?", answer: "You can join our outreach programs by signing up during our weekly events or contacting the specific coordinator." },
  { question: "How can I support the centre?", answer: "You can support us through volunteering your time or making a donation via our Membership & Donations page." }
];

const quickActions = [
  { title: "Join a Program", icon: Users, link: "/programs" },
  { title: "Invite a Speaker", icon: Presentation, link: "/programs#register" },
  { title: "Request a House Program", icon: HomeIcon, link: "/programs#register" },
  { title: "Volunteer With Us", icon: HeartHandshake, link: "#" }
];

// --- Shared Components ---
const SectionHeader = ({ eyebrow, title, description, align = "left", isDark = false }) => (
  <div className={`space-y-4 ${align === "center" ? "text-center" : "text-left"} relative z-10 mb-12`}>
    {eyebrow && (
      <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">{eyebrow}</span>
        <span className="h-px w-14 bg-[#D4AF37]/70" />
      </div>
    )}
    <h2 className={`font-display text-3xl font-semibold ${isDark ? "text-white" : "text-[#2a1b22]"} sm:text-4xl`}>{title}</h2>
    {description && <p className={`text-base ${isDark ? "text-white/80" : "text-[#3b3237]"} sm:text-lg max-w-2xl mx-auto`}>{description}</p>}
  </div>
);

// --- Sections ---

const HeroSection = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1a0b12]">
    <div className="absolute inset-0">
      <img src="/deities.png" alt="ISKCON Deities" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2e]/95 via-[#1a0d12]/85 to-[#0c1a2e]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.20),_transparent_55%)]" />
    </div>
    <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.4em] text-[#D4AF37] mb-5">
        Connect With Us
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl text-white sm:text-5xl lg:text-6xl mb-6">
        Get In Touch
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
        We would be delighted to hear from you. Whether you have questions, would like to attend a program, invite us for an event, or simply wish to connect, feel free to reach out.
      </motion.p>
    </div>
  </section>
);

const InfoCards = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
    {[
      { icon: MapPin, title: "Visit Us", info: "ISKCON IIT Centre\nBhubaneswar, Odisha" },
      { icon: Phone, title: "Phone", info: "+91 88954 00410\n+91 63705 07337" },
      { icon: Mail, title: "Email", info: "tukaramdas.bcs@gmail.com\niskconiitcenterbbsr@gmail.com" },
      { icon: Clock, title: "Darshan Timings", info: "4:30 AM - 3:00 PM\n4:00 PM - 9:00 PM" }
    ].map((item, idx) => (
      <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white/80 border border-white/60 p-6 rounded-2xl shadow-[0_15px_40px_-20px_rgba(31,23,28,0.2)] backdrop-blur-md text-center hover:-translate-y-1 transition duration-300 hover:border-[#D4AF37]/50">
        <div className="w-12 h-12 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-4">
          <item.icon className="w-6 h-6" />
        </div>
        <h3 className="font-display font-semibold text-[#2a1b22] text-lg mb-2">{item.title}</h3>
        <p className="text-[#4b4246] text-sm whitespace-pre-line leading-relaxed">{item.info}</p>
      </motion.div>
    ))}
  </div>
);

const ContactFormAndMap = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      
      if (!res.ok) throw new Error(json.message || "Failed to send message");
      
      toast.success("Thank you for contacting us. We have received your message and will get back to you soon.");
      reset();
    } catch (err) {
      toast.error(err.message || "Network error. Please check your internet connection.");
    }
  };

  const InputField = ({ label, name, type = "text", required }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#4A1F2D] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type} 
        {...register(name)} 
        className="w-full bg-[#F8F5EF] border border-[#4A1F2D]/20 rounded-lg px-4 py-3 text-sm text-[#2a1b22] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-20">
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_-30px_rgba(31,23,28,0.3)] border border-[#D4AF37]/20">
        <SectionHeader eyebrow="Message Us" title="Send a Message" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Full Name" name="name" required />
            <InputField label="Email Address" name="email" type="email" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <InputField label="Phone Number" name="phone" />
            <InputField label="Subject" name="subject" required />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#4A1F2D] mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea 
              {...register("message")} 
              rows={4}
              className="w-full bg-[#F8F5EF] border border-[#4A1F2D]/20 rounded-lg px-4 py-3 text-sm text-[#2a1b22] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              placeholder="How can we help you?"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#4A1F2D] text-[#D4AF37] px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.2em] text-xs hover:bg-[#2a1b22] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Message...</>
            ) : (
              <><Send className="w-4 h-4 mr-2" /> Submit Message</>
            )}
          </button>
        </form>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-[0_20px_50px_-30px_rgba(31,23,28,0.3)] border border-[#D4AF37]/20 relative">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239716.9335876586!2d85.38449128671876!3d20.151683800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19ad003a8c1395%3A0x464f0bdec98c95ea!2sISKCON%20IIT%20Center%20and%20Govinda&#39;s%20Restaurant!5e0!3m2!1sen!2sin!4v1781621057024!5m2!1sen!2sin" width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"></iframe>
      </motion.div>
    </div>
  );
};

const QuickActionsAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <SectionHeader eyebrow="Quick Links" title="Quick Contact Actions" />
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map((action, idx) => (
            <motion.a key={idx} href={action.link} whileHover={{ y: -4 }} className="bg-white/80 border border-white/60 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-[#D4AF37]/50 transition-all flex items-center group">
              <div className="w-10 h-10 bg-[#F8F5EF] rounded-full flex items-center justify-center text-[#4A1F2D] mr-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                <action.icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm text-[#2a1b22]">{action.title}</span>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#D4AF37] transition-colors transform group-hover:translate-x-1" />
            </motion.a>
          ))}
        </div>
      </div>
      
      <div>
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white/80 border border-white/60 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none">
                <span className="font-semibold text-sm text-[#2a1b22] pr-4">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p className="px-5 pb-4 text-sm text-[#4b4246]">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default function Contact() {
  return (
    <main className="bg-[#F8F5EF] min-h-screen">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative -mt-10 z-20 pb-20">
        <InfoCards />
        <ContactFormAndMap />
        <QuickActionsAndFAQ />
      </div>
    </main>
  );
}
