import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { BackgroundBeams } from '@/components/ui/background-beams';

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-scroll-section
      className="relative w-full py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Beams */}
      <BackgroundBeams />

      {/* Additional subtle glow (optional - you can remove if beams are enough) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity
          }}
        />
      </motion.div>

      <div className="relative w-full px-6 lg:px-[5vw] z-10">
        <motion.div 
          className="max-w-[720px] mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            className="font-heading text-h2 font-bold text-white mb-4"
            variants={staggerItem}
          >
            Let AI do the Work so you can Scale Faster
          </motion.h2>
          <motion.p 
            className="text-body text-nexora-gray mb-10"
            variants={staggerItem}
          >
            Book a Call Today and Start Automating
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4"
            variants={staggerItem}
          >
            <motion.a
              href="https://calendly.com/app/scheduled_events/user/me"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-white"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar size={18} />
              Book a free call
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#services"
              className="btn-secondary text-white"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View services
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
