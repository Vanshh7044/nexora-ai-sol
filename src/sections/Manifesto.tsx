import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "@/components/ui/GradientText";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    if (!section || !headline || !body) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        headline.querySelectorAll(".manifesto-line"),
        { clipPath: "inset(100% 0 0 0)", y: 30, opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        body,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative w-full h-screen flex items-center justify-center overflow-visible"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 manifesto-grid" />

      {/* Accent nodes */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_20px_6px_hsl(263_84%_58%/0.4)] animate-pulse-glow" />
      <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_16px_5px_hsl(187_92%_69%/0.35)] animate-pulse-glow delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 md:px-12">
        <h2
          ref={headlineRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 flex flex-col items-center"
        >
          <span className="manifesto-line block text-white">
            Bespoke AI Architecture
          </span>
          <span className="manifesto-line block">
            <GradientText
              colors={["#F0ABFC", "#A78BFA", "#22D3EE"]}
              animationSpeed={5}
              showBorder={false}
              direction="horizontal"
              yoyo={false}
            >
              for Real Estate Teams.
            </GradientText>
          </span>
        </h2>
        <p
          ref={bodyRef}
          className="text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Off-the-shelf tools force you to adapt. We engineer systems that adapt
          to you—integrated, secure, and built for Dubai's market.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              document.querySelector("#process")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600/30 via-purple-600/30 to-cyan-500/30 border border-violet-400/40 backdrop-blur-md hover:from-violet-500/40 hover:via-purple-500/40 hover:to-cyan-400/40 hover:border-violet-300/60 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] transition-all duration-300 group"
          >
            See how we work
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;