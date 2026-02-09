import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureWorkflow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const tasks = [
    { label: 'Payroll management', status: 'Due on 2nd July', icon: <Clock size={14} />, color: 'text-nexora-amber' },
    { label: 'Employee Tracking', status: '2 days ago', icon: <CheckCircle2 size={14} />, color: 'text-nexora-lime' },
    { label: 'Social media post', status: 'Cancelled by user', icon: <AlertCircle size={14} />, color: 'text-red-400' },
    { label: 'Lead list', status: '70% prepared', icon: <FileText size={14} />, color: 'text-nexora-cyan' },
    { label: 'Payment reminder', status: 'Sent to selected clients', icon: <CheckCircle2 size={14} />, color: 'text-nexora-lime' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const text = textRef.current;
    const stats = statsRef.current;

    if (!section || !card || !text || !stats) return;

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
        .fromTo(card,
          { x: '-60vw', rotateY: 18, opacity: 0 },
          { x: 0, rotateY: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(text.children,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.08
        )
        .fromTo(stats,
          { y: '-20vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.12
        );

      // Phase 2: SETTLE (30% - 70%) - Hold

      // Phase 3: EXIT (70% - 100%)
      scrollTl
        .fromTo(card,
          { x: 0, opacity: 1 },
          { x: '-35vw', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo(stats,
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
      {/* Left Task Card */}
      <div
        ref={cardRef}
        className="absolute left-[6vw] top-[18vh] w-[44vw] max-w-[600px] h-[64vh] perspective-1000"
      >
        <div className="glass-card h-full p-6 overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-white">All Tasks</h3>
            <span className="px-3 py-1 rounded-full bg-nexora-violet/20 text-nexora-violet text-xs font-medium">
              Waiting for approval
            </span>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-nexora-violet/20 transition-colors group animate-pulse-glow"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className={`${task.color}`}>
                  {task.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{task.label}</p>
                  <p className="text-xs text-nexora-gray">{task.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-nexora-black/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Right Text Block */}
      <div
        ref={textRef}
        className="absolute left-[58vw] top-1/2 -translate-y-1/2 max-w-[34vw]"
      >
        <span className="inline-block font-mono text-micro uppercase text-nexora-violet mb-4">
          Workflow Automation
        </span>
        <h2 className="font-heading text-h2 font-bold text-white mb-6">
          Operational Control Centers
        </h2>
        <p className="text-body text-nexora-gray mb-8 leading-relaxed">
          You can't manage what you can't measure. We build custom admin dashboards that give you a bird's eye view of your brokerage—from agent performance to deal flow, without the spreadsheet chaos.
        </p>
        <a
          href="#contact"
          className="btn-primary inline-flex items-center gap-2 text-white text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Request a dashboard demo
        </a>
      </div>

      {/* Stats Card */}
      <div
        ref={statsRef}
        className="absolute right-[6vw] top-[14vh] glass-card-light px-6 py-4"
      >
        <div className="text-center">
          <p className="font-heading text-3xl font-bold text-nexora-violet mb-1">100+</p>
          <p className="text-xs text-nexora-gray uppercase tracking-wider">Automations</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-center px-6 py-20">
        <span className="font-mono text-micro uppercase text-nexora-violet mb-4">
          Workflow Automation
        </span>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          Operational Control Centers
        </h2>
        <p className="text-base text-nexora-gray mb-6">
          Custom admin dashboards for complete brokerage visibility.
        </p>
        <div className="glass-card p-4">
          <div className="space-y-2">
            {tasks.slice(0, 3).map((task, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]">
                <div className={task.color}>{task.icon}</div>
                <div>
                  <p className="text-sm text-white">{task.label}</p>
                  <p className="text-xs text-nexora-gray">{task.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureWorkflow;
