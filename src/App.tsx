/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    icon: <Heart className="w-6 h-6" />,
    description: "Focusing on emotional coping mechanisms and daily life stressors. Helping individuals navigate personal challenges and transitions.",
    areas: ["Schools", "Rehabilitation Centers", "Substance Addiction"]
  },
  {
    title: "Clinical Psychology",
    icon: <Brain className="w-6 h-6" />,
    description: "Diagnosing and treating behavioral disorders using evidence-based techniques like CBT and Psychoanalysis.",
    areas: ["Diagnosis", "CBT", "Behavioral Therapy"]
  },
  {
    title: "I/O Psychology",
    icon: <Briefcase className="w-6 h-6" />,
    description: "Optimizing human behavior in the workplace. Specializing in HR management and talent development.",
    areas: ["HR Management", "Talent Management", "Behavior Analysis"]
  },
  {
    title: "Sports Psychology",
    icon: <Target className="w-6 h-6" />,
    description: "Enhancing athletic performance through mental conditioning and psychological resilience training.",
    areas: ["Performance", "Resilience", "Mental Toughness"]
  }
];

const BLOG_POSTS = [
  {
    title: "The Art of Saying No",
    category: "Mental Health",
    excerpt: "Learn how setting boundaries can significantly reduce stress and help you prioritize what truly matters.",
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    title: "Mental Health is a Necessity",
    category: "Advocacy",
    excerpt: "Breaking the stigma: Why seeking professional help is a sign of strength, not a luxury.",
    icon: <Heart className="w-5 h-5" />
  },
  {
    title: "Finding Bravery in Life",
    category: "Prevention",
    excerpt: "Special focus on suicide prevention and encouraging resilience during life's most difficult challenges.",
    icon: <Users className="w-5 h-5" />
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2D2D2D] font-sans selection:bg-[#E2E8F0]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#5A5A40]">Psychology Insight</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  className="text-sm font-medium text-[#4B5563] hover:text-[#5A5A40] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="#contact"
                className="bg-[#5A5A40] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A4A35] transition-all shadow-sm"
              >
                Book a Session
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-[#4B5563]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
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
                    className="block text-lg font-medium text-[#4B5563]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <button className="bg-[#5A5A40] text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-[#4A4A35] transition-all group">
                Explore Resources <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-4">
                <a href="https://instagram.com/psychology__insight" target="_blank" rel="noreferrer" className="p-3 bg-white border border-[#E5E7EB] rounded-full hover:border-[#5A5A40] transition-colors">
                  <Instagram className="w-5 h-5 text-[#5A5A40]" />
                </a>
                <a href="#" className="p-3 bg-white border border-[#E5E7EB] rounded-full hover:border-[#5A5A40] transition-colors">
                  <Youtube className="w-5 h-5 text-[#5A5A40]" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/psychology/800/1000" 
                alt="Professional Portrait" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#F5F5F0] max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Available for Consult</span>
              </div>
              <p className="text-sm font-medium text-[#374151]">Specializing in Clinical & Counseling Psychology</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Quick Info */}
      <section className="py-12 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Specializations', value: '4+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Resources Shared', value: '100+' },
            { label: 'Community Members', value: '10k+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-serif font-bold text-[#5A5A40] mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-[#6B7280] font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section id="specializations" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Areas of Expertise</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">Comprehensive psychological support and career guidance tailored to the Indian landscape.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPECIALIZATIONS.map((spec, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-[#E5E7EB] hover:border-[#5A5A40]/30 transition-all shadow-sm"
              >
                <div className="w-12 h-12 bg-[#F5F5F0] rounded-2xl flex items-center justify-center text-[#5A5A40] mb-6">
                  {spec.icon}
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
            ))}
          </div>
        </div>
      </section>

      {/* Resources / Blog */}
      <section id="resources" className="py-24 px-4 bg-[#1F2937] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5A5A40]/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif mb-4">Psychological Insights</h2>
              <p className="text-gray-400 max-w-xl">Educational content designed to help you manage daily life and emotional well-being.</p>
            </div>
            <button className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[#F5F5F0] transition-colors">
              View All Articles <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-800">
                  <img 
                    src={`https://picsum.photos/seed/${i + 10}/600/400`} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-[10px] uppercase tracking-widest mb-3">
                  {post.icon} {post.category}
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-[#F5F5F0] transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Scope Section */}
      <section id="career" className="py-24 px-4">
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
                  <img src="https://picsum.photos/seed/career1/400/400" alt="Career" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="https://picsum.photos/seed/career2/400/533" alt="Career" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="https://picsum.photos/seed/career3/400/533" alt="Career" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden bg-white p-2 shadow-sm">
                  <img src="https://picsum.photos/seed/career4/400/400" alt="Career" className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white">
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
                    <a href="mailto:preethi.psychology@example.com" className="text-xl font-medium text-[#1F2937] hover:text-[#5A5A40] transition-colors">
                      preethi.psychology@example.com
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
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5" />
                      <span>Registered Psychologist (Specializing in Clinical & Counseling)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5" />
                      <span>Expertise in CBT & Psychoanalysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] mt-0.5" />
                      <span>Mental Health Content Creator & Career Consultant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-[#E5E7EB] shadow-sm">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Subject</label>
                  <select className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] transition-colors appearance-none">
                    <option>Counseling Session</option>
                    <option>Career Guidance</option>
                    <option>Collaboration</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#6B7280]">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:outline-none focus:border-[#5A5A40] transition-colors resize-none" placeholder="How can I help you?"></textarea>
                </div>
                <button className="w-full bg-[#5A5A40] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#4A4A35] transition-all shadow-lg shadow-[#5A5A40]/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
            <a href="#" className="text-[#9CA3AF] hover:text-[#5A5A40] transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#5A5A40] transition-colors"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#5A5A40] transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
