import { useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Workflow, Phone, TrendingUp, Code2 } from 'lucide-react';
import { easings } from '@/lib/animations';
import { gsap } from 'gsap';

const DEFAULT_GLOW_COLOR = '167, 139, 250';
const SPOTLIGHT_RADIUS = 350;

const createParticleElement = (x: number, y: number): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${DEFAULT_GLOW_COLOR}, 1);
    box-shadow: 0 0 8px rgba(${DEFAULT_GLOW_COLOR}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({ children, className = '', isHero = false }: { children: React.ReactNode; className?: string; isHero?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle)
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    const count = isHero ? 18 : 12;

    for (let i = 0; i < count; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const particle = createParticleElement(Math.random() * width, Math.random() * height);
        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(particle, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, i * 80) as unknown as number;

      timeoutsRef.current.push(timeoutId);
    }
  }, [isHero]);

  useEffect(() => {
    if (!cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`}>
      {children}
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const services = [
    {
      icon: <Code2 size={32} />,
      title: 'Custom Projects',
      description: 'Bespoke AI architecture tailored to your workflow, commission structures, and team. Full sovereignty over your data and processes.',
      label: 'MVP',
      isHero: true,
    },
    {
      icon: <Workflow size={28} />,
      title: 'Workflow Automation',
      description: 'Operational Control Centers + Internal Task Bots. Streamline your brokerage operations with intelligent automation.',
      label: 'Efficiency',
    },
    {
      icon: <Phone size={28} />,
      title: 'AI Voice Assistant',
      description: 'Voice AI Receptionists that answer calls instantly, qualify prospects, and book meetings 24/7.',
      label: 'Voice AI',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Sales & Marketing',
      description: 'Automated Lead Generation systems that reactivate dead leads and nurture new inquiries.',
      label: 'Growth',
    },
  ];

  // Global spotlight effect
  useEffect(() => {
    if (!gridRef.current) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `
      position: fixed;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${DEFAULT_GLOW_COLOR}, 0.15) 0%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.08) 15%,
        rgba(${DEFAULT_GLOW_COLOR}, 0.04) 25%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);

    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!mouseInside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3 });
        return;
      }

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, opacity: 0.9, duration: 0.1, ease: 'power2.out' });

      // Update card glows
      gridRef.current?.querySelectorAll('.service-card').forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        cardElement.style.setProperty('--glow-x', `${relativeX}%`);
        cardElement.style.setProperty('--glow-y', `${relativeY}%`);
        cardElement.style.setProperty('--glow-intensity', '1');
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlight.remove();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-scroll-section
      className="relative w-full py-24 lg:py-32 bg-transparent z-30"
    >
      <style>
        {`
          .service-card {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            background-color: #060010;
            border: 1px solid rgba(87, 61, 122, 0.3);
            border-radius: 24px;
            transition: all 0.3s ease;
            position: relative;
            min-height: 280px;
          }

          .service-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(${SPOTLIGHT_RADIUS}px circle at var(--glow-x) var(--glow-y),
                rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            z-index: 1;
          }

          .service-card:hover {
            box-shadow: 0 4px 30px rgba(46, 24, 78, 0.4), 0 0 40px rgba(${DEFAULT_GLOW_COLOR}, 0.2);
            border-color: rgba(167, 139, 250, 0.5);
          }

          .bento-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: minmax(140px, auto);
            gap: 1rem;
            max-width: 1400px;
            margin: 0 auto;
          }

          .card-0 { grid-column: span 3; grid-row: span 2; }
          .card-1 { grid-column: span 3; grid-row: span 1; }
          .card-2 { grid-column: span 3; grid-row: span 1; }
          .card-3 { grid-column: span 6; grid-row: span 1; }

          @media (max-width: 1024px) {
            .bento-grid { grid-template-columns: repeat(2, 1fr); }
            .card-0 { grid-column: span 2; grid-row: span 2; }
            .card-1, .card-2, .card-3 { grid-column: span 2; grid-row: span 1; }
          }

          @media (max-width: 768px) {
            .bento-grid { grid-template-columns: 1fr; }
            .card-0, .card-1, .card-2, .card-3 { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
        `}
      </style>

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
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Services
          </motion.span>
          <motion.h2 
            className="font-heading text-h2 font-bold text-white mb-4 max-w-[720px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Beyond Off-the-Shelf Systems
          </motion.h2>
          <motion.p 
            className="text-body text-nexora-gray max-w-[860px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Custom AI infrastructure for Dubai's elite brokerages. We don't sell subscriptions—we build sovereign systems.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div ref={gridRef} className="bento-grid">
          {services.map((service, index) => (
            <ParticleCard
              key={service.title}
              className={`service-card card-${index}`}
              isHero={service.isHero}
            >
              <div className="h-full flex flex-col justify-between p-6 lg:p-8 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono uppercase text-nexora-violet/80 tracking-wider">
                    {service.label}
                  </span>
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-nexora-violet/10 border border-nexora-violet/20 flex items-center justify-center text-nexora-violet hover:text-nexora-cyan transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold text-lg lg:text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-nexora-gray text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </ParticleCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;