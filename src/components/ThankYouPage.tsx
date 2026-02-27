/**
 * Thank You Page Component
 * Professional medical design - clean and calm aesthetic
 * Responsive across all devices
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Home, MessageSquare, Clock, Phone } from 'lucide-react';

interface ThankYouPageProps {
  formType?: 'contact' | 'booking';
  userName?: string;
}

export default function ThankYouPage({ 
  formType = 'contact',
  userName = 'there' 
}: ThankYouPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isBooking = formType === 'booking';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFCFB] to-[#F5F5F0] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-[#5A5A40]/10 rounded-full animate-pulse" />
            <div className="relative w-full h-full flex items-center justify-center">
              <CheckCircle2 className="w-20 h-20 text-[#5A5A40]" />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F2937] mb-4">
            Thank You, {userName}!
          </h1>
          
          {isBooking ? (
            <div className="space-y-4">
              <p className="text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto">
                Your appointment request has been received successfully.
              </p>
              <p className="text-base text-[#6B7280] max-w-xl mx-auto">
                Our clinic team will contact you within <span className="font-semibold text-[#5A5A40]">24 hours</span> to confirm your session details and discuss the best time for your consultation.
              </p>
            </div>
          ) : (
            <p className="text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto">
              Your message has been received successfully. We appreciate you reaching out and will respond within <span className="font-semibold text-[#5A5A40]">24 hours</span>.
            </p>
          )}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          {/* What to Expect */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F0] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1F2937] mb-1">What to Expect</h3>
                <p className="text-sm text-[#6B7280]">
                  We'll contact you via phone or email to finalize the details.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F0] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-[#1F2937] mb-1">Got Questions?</h3>
                <p className="text-sm text-[#6B7280]">
                  Contact us at <span className="font-medium text-[#5A5A40]">rakesh837m@gmail.com</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        {isBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-[#5A5A40]/5 border border-[#5A5A40]/20 rounded-2xl p-6 mb-12"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#5A5A40] mb-3">
              ✓ Booking Confirmation
            </h3>
            <ul className="space-y-2 text-sm text-[#4B5563]">
              <li className="flex items-center gap-2">
                <span className="text-[#5A5A40]">✓</span> Check your email for confirmation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#5A5A40]">✓</span> Receive appointment details
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#5A5A40]">✓</span> Get preparation guidelines if needed
              </li>
            </ul>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#5A5A40] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4A4A35] transition-all shadow-sm"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </a>
          
          <a
            href="https://wa.me/919750xxx" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#25D366] px-8 py-4 rounded-full font-medium hover:bg-[#25D366]/5 transition-all shadow-sm"
          >
            <MessageSquare className="w-5 h-5" />
            Message on WhatsApp
          </a>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center text-xs text-[#9CA3AF] mt-8"
        >
          Psychology Insight • Professional Mental Health Services
        </motion.p>
      </div>
    </div>
  );
}
