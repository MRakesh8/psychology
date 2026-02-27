/**
 * WhatsApp Integration Component
 * Floating WhatsApp contact button with pre-filled message
 * Mobile-friendly, professional styling, no performance impact
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppButtonProps {
  phoneNumber?: string; // Indian phone number with country code: +919876543210
  position?: 'bottom-right' | 'bottom-left'; // Button position
  showLabel?: boolean; // Show text label
  preFilledMessages?: {
    booking: string;
    general: string;
  };
}

const DEFAULT_MESSAGES = {
  booking: "Hi! I'd like to book an appointment for a psychology consultation.",
  general: "Hi! I have a question about your psychology services.",
};

export default function WhatsAppButton({
  phoneNumber = '+919875441236', // Update with actual number
  position = 'bottom-right',
  showLabel = true,
  preFilledMessages = DEFAULT_MESSAGES,
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track window width safely (avoids SSR crash from window.innerWidth in JSX)
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Only show on mobile or when scrolled down (3000px or after some engagement)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
  };

  const positionClasses = position === 'bottom-right'
    ? 'bottom-6 right-6 sm:bottom-8 sm:right-8'
    : 'bottom-6 left-6 sm:bottom-8 sm:left-8';

  return (
    <>
      {/* Main Button */}
      <motion.a
        href={whatsappUrl(preFilledMessages.booking)}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        className={`fixed ${positionClasses} z-40 group`}
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-20 animate-pulse"
          style={{ width: '100%', height: '100%' }} />

        {/* Button Container */}
        <div className="relative flex items-center gap-3 bg-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 p-4 group-hover:bg-[#f0f0f0]">
          {/* Icon */}
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#25D366]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.471 16.624c-.504-.635-1.196-.987-1.968-.987-.571 0-1.125.217-1.629.644l-.67.544c-.154.124-.319.128-.502.068-.527-.182-1.229-.642-1.89-1.303-.661-.661-1.121-1.363-1.303-1.89-.06-.183-.056-.348.068-.502l.544-.67c.427-.504.644-1.058.644-1.629 0-.772-.352-1.464-.987-1.968l-.8-1.003c-.556-.68-1.47-1.167-2.4-1.167-.969 0-1.866.407-2.517 1.118-1.246 1.346-1.514 3.176-.71 5.376 1.043 2.748 3.872 5.576 6.62 6.62 2.2.804 4.03.536 5.376-.71.711-.651 1.118-1.548 1.118-2.517 0-.93-.487-1.844-1.167-2.4l-1.003-.8z" />
            </svg>
          </div>

          {/* Label - Only show on hover or on larger screens */}
          <AnimatePresence>
            {(showLabel && isHovered) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold text-[#25D366] whitespace-nowrap"
              >
                Message us
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.a>

      {/* Quick Message Menu (Desktop only) */}
      <AnimatePresence>
        {isHovered && isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${position === 'bottom-right' ? 'bottom-24 right-8' : 'bottom-24 left-8'} z-39 bg-white rounded-2xl shadow-2xl overflow-hidden`}
            style={{ minWidth: '250px' }}
          >
            <a
              href={whatsappUrl(preFilledMessages.booking)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm text-[#2D2D2D] hover:bg-[#f5f5f5] border-b border-[#E5E7EB] transition-colors"
            >
              📅 Book an Appointment
            </a>
            <a
              href={whatsappUrl(preFilledMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-sm text-[#2D2D2D] hover:bg-[#f5f5f5] transition-colors"
            >
              ❓ Ask a Question
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Usage Example:
 * 
 * <WhatsAppButton 
 *   phoneNumber="+919875441236"
 *   position="bottom-right"
 *   showLabel={true}
 *   preFilledMessages={{
 *     booking: "Hi! I'd like to book an appointment.",
 *     general: "Hi! I have a question."
 *   }}
 * />
 */
