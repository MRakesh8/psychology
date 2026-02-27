/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import {
  Brain,
  Heart,
  Target,
  Briefcase,
  Youtube,
  Instagram,
  Mail,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  Users,
  Sparkles,
  BookOpen,
  Phone,
  Clock,
  Globe,
  CalendarDays,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Specializations', href: '#specializations' },
  { label: 'Resources', href: '#resources' },
  { label: 'Career Scope', href: '#career' },
  { label: 'Contact', href: '#contact' },
];

const SPECIALIZATIONS = [
  {
    title: "Counseling Psychology",
    icon: Heart,
    description: "Focusing on emotional coping mechanisms and daily life stressors. Helping individuals navigate personal challenges and transitions.",
    areas: ["Schools", "Rehabilitation Centers", "Substance Addiction"]
  },
  {
    title: "Clinical Psychology",
    icon: Brain,
    description: "Diagnosing and treating behavioral disorders using evidence-based techniques like CBT and Psychoanalysis.",
    areas: ["Diagnosis", "CBT", "Behavioral Therapy"]
  },
  {
    title: "I/O Psychology",
    icon: Briefcase,
    description: "Optimizing human behavior in the workplace. Specializing in HR management and talent development.",
    areas: ["HR Management", "Talent Management", "Behavior Analysis"]
  },
  {
    title: "Sports Psychology",
    icon: Target,
    description: "Enhancing athletic performance through mental conditioning and psychological resilience training.",
    areas: ["Performance", "Resilience", "Mental Toughness"]
  }
];

const BLOG_POSTS = [
  {
    title: "The Art of Saying No",
    category: "Mental Health",
    excerpt: "Learn how setting boundaries can significantly reduce stress and help you prioritize what truly matters.",
    icon: ShieldCheck,
    image: "/images/therapy-setting.png"
  },
  {
    title: "Mental Health is a Necessity",
    category: "Advocacy",
    excerpt: "Breaking the stigma: Why seeking professional help is a sign of strength, not a luxury.",
    icon: Heart,
    image: "/images/mens-mental-health.png"
  },
  {
    title: "Finding Bravery in Life",
    category: "Prevention",
    excerpt: "Special focus on suicide prevention and encouraging resilience during life's most difficult challenges.",
    icon: Users,
    image: "/images/mindfulness-calm.png"
  }
];

const PSYCHOLOGY_FACTS = [
  { icon: "🧠", text: "Psychology is the scientific study of mind, behavior, and mental processes — it's both an art and a science." },
  { icon: "💡", text: "Over 450 million people worldwide are affected by mental health conditions, making psychology more vital than ever." },
  { icon: "🌱", text: "Positive psychology focuses on human strengths, well-being, and what makes life worth living." },
  { icon: "🎯", text: "Cognitive Behavioral Therapy (CBT) is one of the most effective evidence-based treatments for anxiety and depression." }
];

// Animated section wrapper
function AnimatedSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

// Booking Modal Component
function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => { data[key] = value.toString(); });

    try {
      const response = await fetch('https://formsubmit.co/ajax/rakesh837m@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          'Client Name': data.name,
          'Age': data.age,
          'Gender': data.gender,
          'Phone': data.phone,
          'Email': data.email,
          'Preferred Language': data.language,
          'Concern': data.reason,
          'Details': data.description,
          'Preferred Date': data.date,
          'Preferred Time': data.time,
          '_subject': `New Booking: ${data.name} — Psychology Insight`,
          '_template': 'table',
          '_replyto': data.email,
          '_captcha': 'false'
        })
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFormStatus('idle');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="bg-white rounded-[2rem] max-w-[680px] w-full p-6 sm:p-10 shadow-2xl my-auto"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">✓</div>
                <h3 className="text-2xl font-serif font-bold text-[#1F2937] mb-3">Booking Request Sent!</h3>
                <p className="text-[#6B7280] mb-6">We'll contact you within 24 hours to confirm your session.</p>
                <button onClick={onClose} className="bg-[#5A5A40] text-white px-8 py-3 rounded-full font-medium hover:bg-[#4A4A35] transition-all">
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2937] mb-2">Book a Session</h3>
                    <p className="text-[#6B7280] text-sm sm:text-base">Fill in your details and we'll get back to you within 24 hours.</p>
                  </div>
                  <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB] hover:rotate-90 transition-all shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Full Name *</label>
                      <input name="name" type="text" required className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Age *</label>
                      <input name="age" type="number" required min="10" max="120" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="Age" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Gender</label>
                      <select name="gender" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all appearance-none">
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Phone *</label>
                      <input name="phone" type="tel" required className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="+91 XXXXXXXXXX" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Email *</label>
                      <input name="email" type="email" required className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Preferred Language</label>
                      <select name="language" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all appearance-none">
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Hindi</option>
                        <option>Telugu</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Reason for Visit *</label>
                    <select name="reason" required className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all appearance-none">
                      <option value="">Select reason</option>
                      <option>Anxiety / Stress</option>
                      <option>Depression</option>
                      <option>Relationship Issues</option>
                      <option>Career Guidance</option>
                      <option>Self Improvement</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Brief Description</label>
                    <textarea name="description" rows={3} className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all resize-none" placeholder="Tell us briefly about your concern..." />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Preferred Date</label>
                      <input name="date" type="date" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Preferred Time</label>
                      <select name="time" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all appearance-none">
                        <option>Morning (9AM-12PM)</option>
                        <option>Afternoon (12PM-4PM)</option>
                        <option>Evening (4PM-7PM)</option>
                      </select>
                    </div>
                  </div>

                  {formStatus === 'error' && (
                    <div className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 text-sm font-medium">
                      Unable to submit. Please try again or email directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="w-full bg-[#5A5A40] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#4A4A35] transition-all shadow-lg shadow-[#5A5A40]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Request Session'}
                  </button>
                  <p className="text-center text-xs text-[#9CA3AF] italic">Your information is completely confidential and secure.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isBookingOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isBookingOpen]);

  const openBooking = () => {
    setIsBookingOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] font-sans selection:bg-[#E2E8F0]">

      {/* ===== NAVIGATION ===== */}
      <nav className={`fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] transition-shadow duration-300 ${isScrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.06)]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#5A5A40]">Psychology Insight</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-[#4B5563] hover:text-[#5A5A40] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5A5A40] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <button
                onClick={openBooking}
                className="bg-[#5A5A40] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A4A35] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-lg hover:shadow-[#5A5A40]/30"
              >
                Book a Session
              </button>
            </div>

            <button className="md:hidden p-2 text-[#4B5563]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-[#E5E7EB] overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-[#4B5563] hover:text-[#5A5A40] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <button onClick={openBooking} className="block w-full bg-[#5A5A40] text-white px-6 py-3 rounded-full text-center font-medium">
                  Book a Session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#F5F5F0] text-[#5A5A40] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Psychologist & Mental Health Advocate
            </span>
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-[#1F2937]">
              Empowering Minds, <br />
              <span className="italic text-[#5A5A40]">Enriching Lives.</span>
            </h1>
            <p className="text-lg text-[#4B5563] mb-8 max-w-lg leading-relaxed">
              I am Preethi Rangasamy, dedicated to fostering mental health awareness and providing professional guidance for aspiring psychologists in India.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#resources" className="bg-[#5A5A40] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#4A4A35] hover:-translate-y-0.5 transition-all group shadow-lg shadow-[#5A5A40]/25 hover:shadow-xl hover:shadow-[#5A5A40]/35">
                Explore Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3 px-4">
                <a href="https://instagram.com/psychology__insight" target="_blank" rel="noreferrer" className="p-3 bg-white border border-[#E5E7EB] rounded-full hover:border-[#5A5A40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5A5A40]/15 transition-all">
                  <Instagram className="w-5 h-5 text-[#5A5A40]" />
                </a>
                <a href="#" className="p-3 bg-white border border-[#E5E7EB] rounded-full hover:border-[#5A5A40] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#5A5A40]/15 transition-all">
                  <Youtube className="w-5 h-5 text-[#5A5A40]" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="/images/hero-psychology.png"
                alt="Professional Portrait"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[600ms]"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#F5F5F0] max-w-[240px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Available for Consult</span>
              </div>
              <p className="text-sm font-medium text-[#374151]">Specializing in Clinical & Counseling Psychology</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <AnimatedSection className="py-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Specializations', value: '4+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Resources Shared', value: '100+' },
            { label: 'Community Members', value: '10k+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-bold text-[#5A5A40] mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ===== ABOUT PSYCHOLOGY ===== */}
      <AnimatedSection id="about" className="py-24 px-4 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif mb-6 text-[#1F2937]">What is Psychology?</h2>
            <p className="text-[#4B5563] leading-relaxed mb-4 text-lg">
              Psychology is the scientific study of mind and behavior. It explores how we think, feel, and act — both individually and in groups. Understanding psychology helps us navigate life's challenges with greater awareness and resilience.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-8">
              As a psychologist, I believe everyone deserves access to mental health resources. My mission is to educate, support, and empower individuals — especially in the Indian context where mental health awareness is still growing.
            </p>
            <div className="space-y-3">
              {PSYCHOLOGY_FACTS.map((fact, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 items-start bg-white p-4 rounded-xl border border-[#E5E7EB] hover:border-[#5A5A40]/30 hover:shadow-md transition-all cursor-default"
                >
                  <span className="text-2xl shrink-0">{fact.icon}</span>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{fact.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/psychology-brain.png"
              alt="Psychology and Mindfulness"
              className="rounded-[2rem] shadow-2xl max-w-[500px] w-full hover:scale-[1.02] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* ===== SPECIALIZATIONS ===== */}
      <AnimatedSection id="specializations" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Areas of Expertise</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">Comprehensive psychological support and career guidance tailored to the Indian landscape.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPECIALIZATIONS.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="bg-white p-8 rounded-3xl border border-[#E5E7EB] hover:border-[#5A5A40]/30 transition-all shadow-sm hover:shadow-xl group"
                >
                  <div className="w-12 h-12 bg-[#F5F5F0] rounded-2xl flex items-center justify-center text-[#5A5A40] mb-6 group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-4">{spec.title}</h3>
                  <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">{spec.description}</p>
                  <div className="space-y-2">
                    {spec.areas.map((area, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-medium text-[#4B5563]">
                        <CheckCircle2 className="w-3 h-3 text-[#5A5A40]" /> {area}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== RESOURCES / BLOG ===== */}
      <AnimatedSection id="resources" className="py-24 px-4 bg-[#1F2937] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5A5A40]/10 rounded-full blur-[60px] -mr-48 -mt-48 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif mb-4">Psychological Insights</h2>
              <p className="text-gray-400 max-w-xl">Educational content designed to help you manage daily life and emotional well-being.</p>
            </div>
            <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-[#E5E7EB] hover:text-[#F5F5F0] transition-colors">
              View All Articles <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => {
              const PostIcon = post.icon;
              return (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-800">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-[10px] uppercase tracking-widest mb-3">
                    <PostIcon className="w-4 h-4" /> {post.category}
                  </div>
                  <h3 className="text-2xl font-serif mb-3 group-hover:text-[#F5F5F0] transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== CAREER SCOPE ===== */}
      <AnimatedSection id="career" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F5F5F0] rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-serif mb-6 text-[#1F2937]">The Scope of Psychology in India</h2>
              <p className="text-[#4B5563] mb-8 leading-relaxed">
                Navigating a career in psychology can be complex. We provide detailed insights into specializations, educational pathways, and professional opportunities within the Indian context.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <GraduationCap className="w-5 h-5 text-[#5A5A40]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1F2937]">Educational Pathways</h4>
                    <p className="text-sm text-[#6B7280]">Guidance on degrees, certifications, and RCI licensing requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <Briefcase className="w-5 h-5 text-[#5A5A40]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1F2937]">Market Insights</h4>
                    <p className="text-sm text-[#6B7280]">Average starting salaries (approx. ₹35,000/mo for Clinical Psychologists) and growth trends.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="/images/hero-psychology.png" alt="Therapy Room" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="/images/therapy-setting.png" alt="Therapy Setting" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="/images/psychology-brain.png" alt="Psychology Growth" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="/images/mindfulness-calm.png" alt="Mindfulness" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== CONTACT ===== */}
      <AnimatedSection id="contact" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif mb-6">Get in Touch</h2>
              <p className="text-[#6B7280] mb-10">Whether you're seeking personal support or professional guidance, I'm here to help you on your journey.</p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-[#F5F5F0] rounded-2xl flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Email Address</div>
                    <a href="mailto:rakesh837m@gmail.com" className="text-xl font-medium text-[#1F2937] hover:text-[#5A5A40] transition-colors">
                      rakesh837m@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-[#F5F5F0] rounded-2xl flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-1">Social Media</div>
                    <a href="https://instagram.com/psychology__insight" target="_blank" rel="noreferrer" className="text-xl font-medium text-[#1F2937] hover:text-[#5A5A40] transition-colors">
                      @psychology__insight
                    </a>
                  </div>
                </div>

                <div className="p-8 bg-[#F5F5F0] rounded-3xl border border-[#E5E7EB]">
                  <h4 className="font-serif text-lg mb-4">Professional Details</h4>
                  <ul className="space-y-3 text-sm text-[#4B5563]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5 shrink-0" />
                      <span>Registered Psychologist (Specializing in Clinical & Counseling)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5 shrink-0" />
                      <span>Expertise in CBT & Psychoanalysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5 shrink-0" />
                      <span>Mental Health Content Creator & Career Consultant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E5E7EB] shadow-sm">
              <form
                action="https://formsubmit.co/ajax/rakesh837m@gmail.com"
                method="POST"
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const data: Record<string, string> = {};
                  formData.forEach((v, k) => { data[k] = v.toString(); });

                  try {
                    await fetch('https://formsubmit.co/ajax/rakesh837m@gmail.com', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                      body: JSON.stringify({
                        ...data,
                        '_subject': `Psychology Insight — New Message from ${data.name}`,
                        '_template': 'table',
                        '_captcha': 'false'
                      })
                    });
                    form.reset();
                    alert('Message sent successfully! We\'ll get back to you soon.');
                  } catch {
                    alert('Unable to send. Please email us directly.');
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Full Name</label>
                    <input name="name" type="text" required className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Email Address</label>
                    <input name="email" type="email" required className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Subject</label>
                  <select name="subject" className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] transition-colors appearance-none">
                    <option>Counseling Session</option>
                    <option>Career Guidance</option>
                    <option>Collaboration</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Message</label>
                  <textarea name="message" rows={4} required className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] focus:ring-2 focus:ring-[#5A5A40]/10 transition-all resize-none" placeholder="How can I help you?" />
                </div>
                <button type="submit" className="w-full bg-[#5A5A40] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#4A4A35] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#5A5A40]/20 hover:shadow-xl hover:shadow-[#5A5A40]/30">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-[#E5E7EB] bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-lg font-serif font-bold tracking-tight text-[#5A5A40]">Psychology Insight</span>
          </div>
          <div className="text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} Preethi Rangasamy. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="https://instagram.com/psychology__insight" target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#5A5A40] hover:-translate-y-0.5 transition-all"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#5A5A40] hover:-translate-y-0.5 transition-all"><Youtube className="w-5 h-5" /></a>
            <a href="mailto:rakesh837m@gmail.com" className="text-[#9CA3AF] hover:text-[#5A5A40] hover:-translate-y-0.5 transition-all"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* ===== MOBILE STICKY CTA ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[99] p-3 bg-white/95 backdrop-blur-xl border-t border-[#E5E7EB] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={openBooking}
          className="block w-full bg-[#5A5A40] text-white text-center py-3.5 rounded-full font-medium text-[15px]"
        >
          Book a Session
        </button>
      </div>

      {/* ===== BOOKING MODAL ===== */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
