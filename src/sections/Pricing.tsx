import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { easings } from '@/lib/animations';
import { BackgroundBeams } from '@/components/ui/background-beams';

const MagicCard = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`magic-card relative ${className}`}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      data-scroll-section
      className="relative w-full py-24 lg:py-32 bg-transparent z-30 overflow-hidden"
    >
      <BackgroundBeams className="absolute inset-0 z-0" />
      
      <style>
        {`
          .magic-card {
            --mouse-x: 50%;
            --mouse-y: 50%;
          }
          
          .magic-card::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            background: radial-gradient(
              600px circle at var(--mouse-x) var(--mouse-y),
              rgba(167, 139, 250, 0.15),
              transparent 40%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
          }
          
          .magic-card:hover::before {
            opacity: 1;
          }
        `}
      </style>
      
      <div className="relative w-full px-6 lg:px-[5vw] max-w-6xl mx-auto z-10">
        {/* Header */}
        <motion.div 
          className="max-w-3xl mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easings.premium }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Sparkles size={12} className="text-nexora-violet" />
            Custom Solutions
          </motion.span>

          <motion.h2 
            className="font-heading text-h2 font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We don&apos;t do subscriptions.
            <span className="block text-gradient">We engineer sovereign AI systems.</span>
          </motion.h2>

          <motion.p 
            className="text-body text-nexora-gray/90 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Every Nexora engagement is architected from the ground up around your brokerage&apos;s
            specific deal flow, commission structure, and teams. No templates. No generic &quot;plans&quot;.
            Just deeply integrated, custom AI infrastructure.
          </motion.p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Principles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6, ease: easings.premium }}
          >
            <MagicCard className="glass-card p-6 lg:p-8 space-y-6">
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                A bespoke, sovereign approach
              </h3>
              <p className="text-sm text-nexora-gray mb-4">
                We treat each brokerage as its own ecosystem. Our work is structured around three
                simple commitments:
              </p>

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-nexora-violet/15 flex items-center justify-center text-nexora-violet text-xs shrink-0">
                    01
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      No subscriptions, no lock-in.
                    </p>
                    <p className="text-sm text-nexora-gray">
                      You retain full ownership of the systems we build—infra, logic, and data. We
                      don&apos;t meter usage or gate features behind tiers.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-nexora-violet/15 flex items-center justify-center text-nexora-violet text-xs shrink-0">
                    02
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Every build is custom-scoped.
                    </p>
                    <p className="text-sm text-nexora-gray">
                      We start with an operational audit, then design a roadmap around your volume,
                      markets, and internal team structure—never a one-size-fits-all plan.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-nexora-violet/15 flex items-center justify-center text-nexora-violet text-xs shrink-0">
                    03
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Clear outcomes, not vague promises.
                    </p>
                    <p className="text-sm text-nexora-gray">
                      We scope engagements around measurable lifts—call throughput, listing volume,
                      response times, and hours unlocked for your top producers.
                    </p>
                  </div>
                </li>
              </ul>
            </MagicCard>
          </motion.div>

          {/* Right: CTA panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.6, ease: easings.premium }}
          >
            <MagicCard className="glass-card-light p-6 lg:p-7 flex flex-col justify-between gap-6 border border-white/10">
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-nexora-gray/80">
                  Engagement model
                </p>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Book a discovery call to receive a tailored proposal.
                </h3>
                <p className="text-sm text-nexora-gray">
                  In 30 minutes we map your current stack, identify the highest-leverage automations,
                  and outline a bespoke engagement with clear timelines and investment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-nexora-gray/80">
                  <span>Typical engagement range</span>
                  <span className="font-medium text-white/90">Custom, based on scope</span>
                </div>
                <motion.a
                  href="https://calendly.com/app/scheduled_events/user/me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2 text-white"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Book a consultation
                  <ArrowUpRight size={16} />
                </motion.a>
                <p className="text-[11px] text-nexora-gray/70">
                  No obligation, no hard pitch. If we&apos;re not the right fit, you&apos;ll still
                  leave with a clearer automation roadmap for your brokerage.
                </p>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;