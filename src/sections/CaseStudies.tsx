import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, TrendingUp, Zap, Target } from 'lucide-react';
import { easings } from '@/lib/animations';
import { useCounter } from '@/hooks/useCounter';

// Before/After Slider Component
interface BeforeAfterSliderProps {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: string;
  afterValue: string;
  metric: string;
}

const BeforeAfterSlider = ({ beforeLabel, afterLabel, beforeValue, afterValue, metric }: BeforeAfterSliderProps) => {
  return (
    <motion.div 
      className="relative h-16 rounded-xl overflow-hidden cursor-ew-resize select-none bg-white/[0.05]"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-nexora-violet/20" />
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-nexora-gray uppercase">{beforeLabel}</span>
          <span className="text-lg font-bold text-nexora-gray">{beforeValue}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-nexora-lime">{afterValue}</span>
          <span className="text-xs text-nexora-lime uppercase">{afterLabel}</span>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-nexora-violet to-nexora-cyan"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1.5, ease: easings.gentle, delay: 0.5 }}
        viewport={{ once: true }}
      />

      {/* Metric label */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-nexora-gray uppercase tracking-wider">
        {metric}
      </div>
    </motion.div>
  );
};

const CaseStudies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { count: calls, ref: callsRef } = useCounter(1000);
  const { count: listings, ref: listingsRef } = useCounter(13);

  const caseStudy = {
    quote: '1,000 AI Calls Generated 13 Property Listings',
    description: 'We deployed a voice AI outbound system for a Dubai brokerage targeting pocket listings. 10 days. 1,000 automated calls. 13 confirmed listings.',
    impact: [
      { label: 'Calls Made', value: '1,000', icon: <Phone size={16} /> },
      { label: 'Listings Secured', value: '13', icon: <TrendingUp size={16} /> },
      { label: 'Operation Time', value: '24/7', icon: <Zap size={16} /> },
      { label: 'Manual Hours', value: '0', icon: <Target size={16} /> },
    ],
    sliders: [
      { beforeLabel: 'Manual', afterLabel: 'AI', beforeValue: '4h/day', afterValue: '24/7', metric: 'Coverage time' },
      { beforeLabel: 'Before', afterLabel: 'After', beforeValue: '0', afterValue: '13', metric: 'Listings generated' },
    ],
  };

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      data-scroll-section
      className="relative w-full py-24 lg:py-32 bg-transparent z-30"
    >
      <div className="w-full px-6 lg:px-[5vw]">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easings.premium }}
        >
          <motion.span 
            className="inline-block font-mono text-micro uppercase text-nexora-violet mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Case Studies
          </motion.span>
          <motion.h2 
            className="font-heading text-h2 font-bold text-white mb-4 max-w-[720px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Real Results, Real Impact
          </motion.h2>
        </motion.div>

        {/* Case Study Card */}
        <motion.div 
          className="max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 60, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: easings.premium, delay: 0.3 }}
        >
          <div className="glass-card p-8 lg:p-12">
            {/* Quote */}
            <motion.blockquote 
              className="font-heading text-2xl lg:text-4xl font-semibold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {caseStudy.quote}
            </motion.blockquote>
            
            {/* Description */}
            <motion.p 
              className="text-nexora-gray mb-10 max-w-[700px]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {caseStudy.description}
            </motion.p>

            {/* Impact Metrics */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-nexora-gray uppercase tracking-wider mb-4">Impact</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {caseStudy.impact.map((item, i) => (
                  <motion.div 
                    key={i}
                    className="glass-card-light p-4 text-center"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      delay: 0.7 + i * 0.1
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-nexora-violet/10 flex items-center justify-center mx-auto mb-2 text-nexora-violet">
                      {item.icon}
                    </div>
                    <p
                      className="font-heading text-2xl font-bold text-nexora-lime mb-1"
                      ref={
                        item.label === 'Calls Made'
                          ? (callsRef as any)
                          : item.label === 'Listings Secured'
                          ? (listingsRef as any)
                          : undefined
                      }
                    >
                      {item.label === 'Calls Made'
                        ? calls.toLocaleString()
                        : item.label === 'Listings Secured'
                        ? listings
                        : item.value}
                    </p>
                    <p className="text-xs text-nexora-gray">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Before/After Sliders */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <p className="text-xs text-nexora-gray uppercase tracking-wider mb-2">
                The Transformation
              </p>
              {caseStudy.sliders.map((slider, i) => (
                <BeforeAfterSlider key={i} {...slider} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
