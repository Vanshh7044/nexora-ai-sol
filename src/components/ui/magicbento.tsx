import React, { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import { gsap } from 'gsap';

interface ServiceCard {
  icon: ReactNode;
  title: string;
  description: string;
  label: string;
  isHero?: boolean;
}

interface ServiceBentoGridProps {
  services: ServiceCard[];
}

const DEFAULT_GLOW_COLOR = '167, 139, 250'; // Purple
const SPOTLIGHT_RADIUS = 350;
const PARTICLE_COUNT = 12;

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: ReactNode;
  className?: string;
  isHero?: boolean;
}> = ({ children, className = '', isHero = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    const count = isHero ? PARTICLE_COUNT * 1.5 : PARTICLE_COUNT;
    memoizedParticles.current = Array.from({ length: count }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, DEFAULT_GLOW_COLOR)
    );
    particlesInitialized.current = true;
  }, [isHero]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 80);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      gsap.to(element, {
        rotateX: 3,
        rotateY: 3,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.1,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      const magnetX = (x - centerX) * 0.04;
      const magnetY = (y - centerY) * 0.04;

      gsap.to(element, {
        x: magnetX,
        y: magnetY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, 0.4) 0%, rgba(${DEFAULT_GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
}> = ({ gridRef }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (!gridRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
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
        rgba(${DEFAULT_GLOW_COLOR}, 0.02) 40%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.service-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(SPOTLIGHT_RADIUS);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, SPOTLIGHT_RADIUS);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.9
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.9
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.service-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef]);

  return null;
};

const ServiceBentoGrid: React.FC<ServiceBentoGridProps> = ({ services }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reorder services: Custom Projects first (hero), then the rest
  const heroService = services.find(s => s.isHero);
  const otherServices = services.filter(s => !s.isHero);
  const orderedServices = heroService ? [heroService, ...otherServices] : services;

  return (
    <>
      <style>
        {`
          .service-bento-grid {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${DEFAULT_GLOW_COLOR};
          }
          
          .service-card {
            background-color: #060010;
            border: 1px solid rgba(87, 61, 122, 0.3);
            border-radius: 24px;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .service-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            z-index: 1;
          }
          
          .service-card:hover {
            box-shadow: 0 4px 30px rgba(46, 24, 78, 0.4), 0 0 40px rgba(var(--glow-color), 0.2);
            border-color: rgba(167, 139, 250, 0.5);
          }
          
          @media (max-width: 768px) {
            .service-bento-grid {
              grid-template-columns: 1fr !important;
            }
            
            .service-card {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
          }
        `}
      </style>

      <GlobalSpotlight gridRef={gridRef} />

      <div
        ref={gridRef}
        className="service-bento-grid grid gap-4 max-w-6xl mx-auto"
        style={{
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gridAutoRows: '200px',
        }}
      >
        {orderedServices.map((service, index) => {
          const isHero = service.isHero;
          const gridStyle = isHero && !isMobile
            ? { gridColumn: 'span 2', gridRow: 'span 2' }
            : { gridColumn: 'span 1', gridRow: 'span 1' };

          return (
            <ParticleCard
              key={service.title}
              className="service-card"
              isHero={isHero}
            >
              <div
                className="h-full flex flex-col justify-between p-6 lg:p-8 relative z-10"
                style={gridStyle}
              >
                {/* Label */}
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono uppercase text-nexora-violet/80 tracking-wider">
                    {service.label}
                  </span>
                </div>

                {/* Icon & Content */}
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-nexora-violet/10 border border-nexora-violet/20 flex items-center justify-center text-nexora-violet group-hover:text-nexora-cyan transition-colors duration-300">
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
          );
        })}
      </div>
    </>
  );
};

export { ParticleCard };
export default ServiceBentoGrid;
