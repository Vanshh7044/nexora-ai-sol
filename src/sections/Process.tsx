import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Search, Code2, Plug, TrendingUp, Check } from 'lucide-react';
import { 
  staggerContainer, 
  staggerItem,
  easings 
} from '@/lib/animations';

// Terminal typing component with smooth animation
const TerminalCode = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: '-50px' });
  const hasStarted = useRef(false);

  const codeLines = [
    'class AutomationTrigger:',
    '    def __init__(self, threshold):',
    '        self.threshold = threshold',
    '        self.status = "inactive"',
    '',
    '    def check_trigger(self, value):',
    '        if value > self.threshold:',
    '            self.status = "active"',
    '            return "Automation triggered!"',
    '        else:',
    '            return "No action taken."',
    '',
    '    def get_status(self):',
    '        return f"Status: {self.status}"',
  ];

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    const typeInterval = setInterval(() => {
      if (lineIndex >= codeLines.length) {
        clearInterval(typeInterval);
        return;
      }

      const line = codeLines[lineIndex];
      
      if (charIndex < line.length) {
        currentText += line[charIndex];
        setDisplayedCode(currentText);
        charIndex++;
      } else {
        currentText += '\n';
        setDisplayedCode(currentText);
        lineIndex++;
        charIndex = 0;
        setCurrentLine(lineIndex);
      }
    }, 25);

    return () => clearInterval(typeInterval);
  }, [isInView]);

  return (
    <motion.div 
      ref={terminalRef}
      className="glass-card p-5 font-mono text-sm"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: easings.premium }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-nexora-amber" />
        <div className="w-3 h-3 rounded-full bg-nexora-lime" />
        <span className="ml-2 text-xs text-nexora-gray">automation.py</span>
      </div>
      <pre className="text-nexora-gray overflow-x-auto">
        <code>
          {displayedCode.split('\n').map((line, i) => (
            <motion.div 
              key={i} 
              className="flex"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <span className="text-nexora-violet/50 w-8 flex-shrink-0 select-none">
                {i + 1}
              </span>
              <span className={i === currentLine ? 'text-white' : ''}>
                {line || ' '}
              </span>
            </motion.div>
          ))}
          <motion.span 
            className="text-nexora-violet"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </code>
      </pre>
    </motion.div>
  );
};

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const steps = [
    {
      number: '01',
      title: 'Smart Analyzing',
      description: 'We assess your needs and identify AI solutions to streamline workflows and improve efficiency.',
      icon: <Search size={24} />,
      checks: ['System check', 'Process check', 'Speed check', 'Manual work', 'Repetitive task'],
    },
    {
      number: '02',
      title: 'AI Development',
      description: 'Our team builds intelligent automation systems tailored to your business processes.',
      icon: <Code2 size={24} />,
      hasCode: true,
    },
    {
      number: '03',
      title: 'Seamless Integration',
      description: 'We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.',
      icon: <Plug size={24} />,
      integration: true,
    },
    {
      number: '04',
      title: 'Continuous Optimization',
      description: 'We refine performance, analyze insights, and enhance automation for long-term growth.',
      icon: <TrendingUp size={24} />,
      optimization: true,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
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
            Our Process
          </motion.span>
          <motion.h2 
            className="font-heading text-h2 font-bold text-white mb-4 max-w-[720px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Simple, Smart, and Scalable Process
          </motion.h2>
          <motion.p 
            className="text-body text-nexora-gray max-w-[640px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            We design, develop, and implement automation tools that help you work smarter, not harder.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-[1000px] mx-auto">
          {/* Background Timeline Line (full height, dimmed) */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white/10 hidden lg:block" />
          
          {/* Animated Timeline Line (scroll-driven) */}
          <motion.div 
            className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-nexora-violet via-nexora-cyan to-nexora-violet origin-top hidden lg:block"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  ease: easings.premium, 
                  delay: 0.3 + index * 0.15 
                }}
              >
                {/* Number Circle (desktop) */}
                <motion.div 
                  className="absolute left-1/2 top-0 -translate-x-1/2 w-14 h-14 rounded-full bg-nexora-violet border-4 border-nexora-black flex items-center justify-center hidden lg:flex z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ 
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.5 + index * 0.15
                  }}
                >
                  <span className="font-heading text-lg font-bold text-white">{step.number}</span>
                </motion.div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-2 lg:pl-16' : 'lg:pr-16 lg:text-right'}`}>
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? '' : 'lg:flex-row-reverse'}`}>
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-nexora-violet/10 border border-nexora-violet/20 flex items-center justify-center text-nexora-violet lg:hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {step.icon}
                    </motion.div>
                    <span className="font-mono text-micro uppercase text-nexora-violet lg:hidden">
                      Step {step.number}
                    </span>
                  </div>
                  <motion.h3 
                    className="font-heading text-2xl font-semibold text-white mb-3"
                    initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-nexora-gray leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                  >
                    {step.description}
                  </motion.p>
                </div>

                {/* Visual */}
                <motion.div 
                  className={`${index % 2 === 1 ? 'lg:order-1 lg:pr-16' : 'lg:pl-16'}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                >
                  {step.checks && (
                    <motion.div 
                      className="glass-card p-5 space-y-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    >
                      <p className="text-sm text-nexora-gray mb-3">Analyzing current workflow..</p>
                      {step.checks.map((check, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3"
                          variants={staggerItem}
                        >
                          <motion.div 
                            className="w-5 h-5 rounded-full bg-nexora-lime/20 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ 
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                              delay: 0.7 + i * 0.1
                            }}
                          >
                            <Check size={12} className="text-nexora-lime" />
                          </motion.div>
                          <span className="text-sm text-white">{check}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {step.hasCode && <TerminalCode />}

                  {step.integration && (
                    <motion.div 
                      className="glass-card p-5"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className="text-center"
                          initial={{ x: -20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.7 }}
                        >
                          <div className="w-16 h-16 rounded-2xl bg-nexora-violet/20 flex items-center justify-center mx-auto mb-2">
                            <span className="text-2xl font-bold text-nexora-violet">AI</span>
                          </div>
                          <p className="text-xs text-nexora-gray">Our solution</p>
                        </motion.div>
                        <div className="flex-1 px-4">
                          <motion.div 
                            className="h-[2px] bg-gradient-to-r from-nexora-violet to-nexora-cyan relative"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            style={{ originX: 0 }}
                          >
                            <motion.div 
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-nexora-cyan"
                              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </motion.div>
                        </div>
                        <motion.div 
                          className="text-center"
                          initial={{ x: 20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.7 }}
                        >
                          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-2">
                            <Plug size={24} className="text-nexora-gray" />
                          </div>
                          <p className="text-xs text-nexora-gray">Your stack</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {step.optimization && (
                    <motion.div 
                      className="glass-card p-5 space-y-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    >
                      {[
                        { label: 'Chatbot system', status: 'Efficiency will increase by 20%', color: 'text-nexora-lime' },
                        { label: 'Workflow system', status: 'Update available..', color: 'text-nexora-amber' },
                        { label: 'Sales system', status: 'Up to date', color: 'text-nexora-lime' },
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]"
                          variants={staggerItem}
                        >
                          <span className="text-sm text-white">{item.label}</span>
                          <span className={`text-xs ${item.color}`}>{item.status}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;