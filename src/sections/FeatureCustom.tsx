import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Lightbulb, Cpu, MessageSquare, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FeatureCustom = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const events = [
    { title: 'Discovery call', time: '10:00 am to 10:30 am', day: 1 },
    { title: 'Custom automation', time: '06:00 pm to 06:30 pm', day: 3 },
  ];

  const pills = ['Strategy', 'Custom AI', 'Consulting'];

  useEffect(() => {
    const section = sectionRef.current;
    const calendar = calendarRef.current;
    const text = textRef.current;
    const chatbot = chatbotRef.current;
    const pills = pillsRef.current;

    if (!section || !calendar || !text || !chatbot || !pills) return;

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
        .fromTo(calendar,
          { y: '100vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(text.children,
          { x: '-40vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.08
        )
        .fromTo(chatbot,
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
        .fromTo(calendar,
          { y: 0, opacity: 1 },
          { y: '-30vh', opacity: 0.25, ease: 'power2.in' },
          0.7
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
          0.7
        )
        .fromTo(chatbot,
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
          Custom Projects
        </span>
        <h2 className="font-heading text-h2 font-bold text-white mb-6">
          Bespoke Custom Development
        </h2>
        <p className="text-body text-nexora-gray mb-8 leading-relaxed">
          No two brokerages are the same. We engineer custom solutions tailored to your workflow, your commission structures, and your team.
        </p>
        <a
          href="#contact"
          className="btn-primary inline-flex items-center gap-2 text-white text-sm"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Discuss a custom build
        </a>
      </div>

      {/* Center Calendar Card */}
      <div
        ref={calendarRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[30vw] max-w-[380px] h-[72vh]"
      >
        <div className="glass-card h-full p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg font-semibold text-white">Schedule</h3>
            <div className="flex gap-1">
              {weekDays.map((day, i) => (
                <div 
                  key={day} 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                    i < 5 ? 'bg-nexora-violet/20 text-nexora-violet' : 'bg-white/[0.05] text-nexora-gray'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="space-y-3">
            {events.map((event, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-nexora-violet/10 border border-nexora-violet/20"
              >
                <p className="text-white font-medium mb-1">{event.title}</p>
                <p className="text-xs text-nexora-gray">{event.time}</p>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="mt-6 grid grid-cols-7 gap-1">
            {[...Array(28)].map((_, i) => (
              <div 
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                  i === 14 ? 'bg-nexora-violet text-white' : 
                  i === 15 ? 'bg-nexora-cyan/20 text-nexora-cyan' :
                  'bg-white/[0.03] text-nexora-gray hover:bg-white/[0.05]'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Chatbot Card */}
      <div
        ref={chatbotRef}
        className="absolute right-[6vw] top-[22vh] w-[22vw] max-w-[300px] h-[56vh]"
      >
        <div className="glass-card-light h-full p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading text-sm font-semibold text-white">Customer Support Chatbot</h4>
          </div>
          
          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-nexora-gray">Progress</span>
              <span className="text-nexora-lime">90% Finished</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
              <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-nexora-violet to-nexora-cyan" />
            </div>
          </div>

          {/* Status Items */}
          <div className="space-y-3">
            {[
              { label: 'Chatbot system', status: 'Efficiency will increase by 20%', color: 'text-nexora-lime' },
              { label: 'Workflow system', status: 'Update available..', color: 'text-nexora-amber' },
              { label: 'Sales system', status: 'Up to date', color: 'text-nexora-lime' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03]">
                <Check size={14} className={item.color} />
                <div>
                  <p className="text-sm text-white">{item.label}</p>
                  <p className={`text-xs ${item.color}`}>{item.status}</p>
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
            {pill === 'Strategy' && <Lightbulb size={14} className="text-nexora-violet" />}
            {pill === 'Custom AI' && <Cpu size={14} className="text-nexora-cyan" />}
            {pill === 'Consulting' && <MessageSquare size={14} className="text-nexora-magenta" />}
            {pill}
          </span>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col justify-center px-6 py-20">
        <span className="font-mono text-micro uppercase text-nexora-violet mb-4">
          Custom Projects
        </span>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          Bespoke Custom Development
        </h2>
        <p className="text-base text-nexora-gray mb-6">
          Custom solutions tailored to your workflow and commission structures.
        </p>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={20} className="text-nexora-violet" />
            <div>
              <p className="text-white font-medium">Custom Scheduling</p>
              <p className="text-xs text-nexora-gray">Built for your team</p>
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

export default FeatureCustom;
