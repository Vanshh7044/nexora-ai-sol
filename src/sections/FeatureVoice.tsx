import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Calendar, FileText, MoreHorizontal, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureVoice = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const foundersRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const founders = [
    { name: 'Jack Daniel', role: 'Founder', email: 'justin@main.com', company: 'Xavier LLC' },
    { name: 'Gorge Chapel', role: 'Founder', email: 'gorge@mail.com', company: 'Chapel LLC' },
    { name: 'Mike Tylor', role: 'Founder', email: 'mike@Cmb.com', company: 'CMB LLC' },
    { name: 'Thomas Shelby', role: 'Founder', email: 'Thimas@Sby.com', company: 'Shelby.co' },
  ];

  const pills = ['Summaries', 'Scheduling', 'Many more'];

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const text = textRef.current;
    const founders = foundersRef.current;
    const pills = pillsRef.current;

    if (!section || !phone || !text || !founders || !pills) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // Phase 1: ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(phone,
          { y: '100vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(text.children,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.08
        )
        .fromTo(founders,
          { x: '50vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(pills.children,
          { y: '20vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.16
        );

      // Phase 2: SETTLE (30% - 70%) - Hold

      // Phase 3: EXIT (70% - 100%)
      scrollTl
        .fromTo(phone,
          { y: 0, opacity: 1 },
          { y: '-30vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo(founders,
          { x: 0, opacity: 1 },
          { x: '22vw', opacity: 0.2, ease: 'power2.in' },
          0.72
        )
        .fromTo(pills,
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, ease: 'power2.in' },
          0.74
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative w-full h-screen overflow-hidden bg-transparent z-30"
    >
      {/* Left Text Block */}
      <div
        ref={textRef}
        className="absolute left-[7vw] top-1/2 -translate-y-1/2 max-w-[34vw]"
      >
        <span className="inline-block font-mono text-micro uppercase text-nexora-violet mb-4">
          AI Voice Assistant
        </span>
        <h2 className="font-heading text-h2 font-bold text-white mb-6">
          Voice AI Receptionists
        </h2>
        <p className="text-body text-nexora-gray mb-8 leading-relaxed">
          Stop losing leads to missed calls. We deploy custom voice agents that answer instantly, qualify prospects, and book meetings directly into your calendar—day or night.
        </p>
        <a
          href="#contact"
          className="btn-primary inline-flex items-center gap-2 text-white text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <Mic size={16} />
          Hear a sample call
        </a>
      </div>

      {/* Center Phone Card */}
      <div
        ref={phoneRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[30vw] max-w-[380px] h-[72vh]"
      >
        <div className="glass-card h-full p-6 flex flex-col">
          {/* Phone Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-nexora-amber" />
              <div className="w-3 h-3 rounded-full bg-nexora-lime" />
            </div>
            <span className="text-xs text-nexora-gray">AI Assistant</span>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-nexora-violet/20 border border-nexora-violet/30 flex items-center justify-center mx-auto mb-4">
                <Mic size={28} className="text-nexora-violet" />
              </div>
              <p className="text-white font-medium mb-2">What can I help with?</p>
              <p className="text-xs text-nexora-gray">
                Whether you want help in customer handling or make changes in your system just give me command
              </p>
            </div>

            {/* Animated listening bars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-nexora-violet rounded-full animate-pulse-glow"
                  style={{
                    height: `${12 + Math.random() * 24}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {['Add document', 'Analyze', 'Generate'].map((action) => (
              <button
                key={action}
                className="px-3 py-2 rounded-lg bg-white/[0.05] text-xs text-nexora-gray hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Founder List */}
      <div
        ref={foundersRef}
        className="absolute right-[6vw] top-[22vh] w-[22vw] max-w-[300px] h-[56vh]"
      >
        <div className="glass-card-light h-full p-4 overflow-hidden">
          <h4 className="font-heading text-sm font-semibold text-white mb-4">Founders</h4>
          <div className="space-y-3">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nexora-violet to-nexora-violet-dark flex items-center justify-center text-white text-sm font-medium">
                  {founder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white font-medium truncate">{founder.name}</p>
                    <Check size={12} className="text-nexora-cyan flex-shrink-0" />
                  </div>
                  <p className="text-xs text-nexora-gray">{founder.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Pills */}
      <div
        ref={pillsRef}
        className="absolute left-[7vw] bottom-[12vh] flex gap-3"
      >
        {pills.map((pill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] text-sm text-nexora-gray flex items-center gap-2"
          >
            {pill === 'Summaries' && <FileText size={14} className="text-nexora-violet" />}
            {pill === 'Scheduling' && <Calendar size={14} className="text-nexora-cyan" />}
            {pill === 'Many more' && <MoreHorizontal size={14} className="text-nexora-magenta" />}
            {pill}
          </span>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-center px-6 py-20">
        <span className="font-mono text-micro uppercase text-nexora-violet mb-4">
          AI Voice Assistant
        </span>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          Voice AI Receptionists
        </h2>
        <p className="text-base text-nexora-gray mb-6">
          Custom voice agents that answer instantly, qualify prospects, and book meetings 24/7.
        </p>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-nexora-violet/20 flex items-center justify-center">
              <Mic size={20} className="text-nexora-violet" />
            </div>
            <div>
              <p className="text-white font-medium">AI Voice Agent</p>
              <p className="text-xs text-nexora-gray">Always available</p>
            </div>
          </div>
          <div className="flex gap-2">
            {pills.map((pill) => (
              <span key={pill} className="px-3 py-1 rounded-full bg-white/[0.05] text-xs text-nexora-gray">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureVoice;
