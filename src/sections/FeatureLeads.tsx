import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, FileText, TrendingUp, Mail, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureLeads = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const miniCardsRef = useRef<HTMLDivElement>(null);

  const pipelineStages = [
    { label: 'New Leads', count: 124, color: 'bg-nexora-violet', icon: <Users size={16} /> },
    { label: 'Contacted', count: 89, color: 'bg-nexora-cyan', icon: <Mail size={16} /> },
    { label: 'Qualified', count: 56, color: 'bg-nexora-lime', icon: <MessageSquare size={16} /> },
    { label: 'Negotiation', count: 23, color: 'bg-nexora-amber', icon: <TrendingUp size={16} /> },
    { label: 'Closed', count: 12, color: 'bg-green-500', icon: <FileText size={16} /> },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const pipeline = pipelineRef.current;
    const text = textRef.current;
    const miniCards = miniCardsRef.current;

    if (!section || !pipeline || !text || !miniCards) return;

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
        .fromTo(pipeline,
          { x: '-60vw', rotateY: 14, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(text.children,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(miniCards.children,
          { y: '-20vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.12
        );

      // Phase 2: SETTLE (30% - 70%) - Hold

      // Phase 3: EXIT (70% - 100%)
      scrollTl
        .fromTo(pipeline,
          { x: 0, opacity: 1 },
          { x: '-30vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo(miniCards,
          { y: 0, opacity: 1 },
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.72
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
      {/* Left Pipeline Card */}
      <div
        ref={pipelineRef}
        className="absolute left-[6vw] top-[18vh] w-[44vw] max-w-[600px] h-[64vh] perspective-1000"
      >
        <div className="glass-card h-full p-6">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-white">Sales Pipeline</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nexora-lime animate-pulse" />
              <span className="text-xs text-nexora-gray">Live</span>
            </div>
          </div>

          {/* Pipeline Stages */}
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-nexora-violet/20 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${stage.color}/20 flex items-center justify-center ${stage.color.replace('bg-', 'text-')}`}>
                    {stage.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-white font-medium">{stage.label}</p>
                      <span className={`text-sm font-bold ${stage.color.replace('bg-', 'text-')}`}>
                        {stage.count}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${stage.color} transition-all duration-1000`}
                        style={{ 
                          width: `${(stage.count / 124) * 100}%`,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Connector line */}
                {index < pipelineStages.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[1px] h-4 bg-gradient-to-b from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Text Block */}
      <div
        ref={textRef}
        className="absolute left-[58vw] top-1/2 -translate-y-1/2 max-w-[34vw]"
      >
        <span className="inline-block font-mono text-micro uppercase text-nexora-violet mb-4">
          Sales & Marketing
        </span>
        <h2 className="font-heading text-h2 font-bold text-white mb-6">
          Automated Lead Generation
        </h2>
        <p className="text-body text-nexora-gray mb-8 leading-relaxed">
          Your CRM is a goldmine. We build automated outreach systems that reactivate dead leads and nurture new inquiries until they're ready to buy—so your agents only talk to qualified buyers.
        </p>
        <a
          href="#contact"
          className="btn-primary inline-flex items-center gap-2 text-white text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          See outreach templates
        </a>
      </div>

      {/* Top-right Mini Cards */}
      <div
        ref={miniCardsRef}
        className="absolute right-[6vw] top-[14vh] flex gap-3"
      >
        <div className="glass-card-light px-4 py-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-nexora-violet" />
            <span className="text-sm text-white font-medium">Leads</span>
          </div>
          <p className="text-2xl font-bold text-nexora-violet mt-1">304</p>
        </div>
        <div className="glass-card-light px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-nexora-cyan" />
            <span className="text-sm text-white font-medium">Content</span>
          </div>
          <p className="text-2xl font-bold text-nexora-cyan mt-1">48</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-center px-6 py-20">
        <span className="font-mono text-micro uppercase text-nexora-violet mb-4">
          Sales & Marketing
        </span>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          Automated Lead Generation
        </h2>
        <p className="text-base text-nexora-gray mb-6">
          Automated outreach systems that reactivate dead leads and nurture new inquiries.
        </p>
        <div className="glass-card p-4">
          <div className="space-y-3">
            {pipelineStages.slice(0, 3).map((stage, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                <div className={`w-8 h-8 rounded-lg ${stage.color}/20 flex items-center justify-center ${stage.color.replace('bg-', 'text-')}`}>
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">{stage.label}</p>
                    <span className={`text-sm font-bold ${stage.color.replace('bg-', 'text-')}`}>
                      {stage.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureLeads;
