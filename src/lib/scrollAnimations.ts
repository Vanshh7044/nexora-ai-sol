import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies a subtle, Framer-like scroll reveal to any section
 * marked with [data-scroll-section]. Keeps animations transform/opacity-only.
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>('[data-scroll-section]');

    const animations: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const tl = gsap.fromTo(
        section,
        {
          autoAlpha: 0,
          y: 32,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (tl.scrollTrigger) {
        animations.push(tl.scrollTrigger);
      }
    });

    return () => {
      animations.forEach((st) => st.kill());
    };
  }, []);
};

