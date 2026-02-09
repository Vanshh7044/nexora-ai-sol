import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { heroTextReveal, heroWord, easings } from '@/lib/animations';
import MagneticButton from '@/components/MagneticButton';
import MorphingBadge from '@/components/ui/MorphingBadge';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Spring-based smooth transforms
  const orbScale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 1.3]),
    { stiffness: 50, damping: 20 }
  );
  const orbOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.3]),
    { stiffness: 50, damping: 20 }
  );
  const contentY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [0, -100]),
    { stiffness: 50, damping: 20 }
  );

  // Animated systems diagram (nodes + flowing lines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node system
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const nodeCount = 8;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const colors = ['#7C3AED', '#22D3EE', '#A78BFA', '#E879F9'];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 120 + Math.random() * 80;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 4 + Math.random() * 4,
        color: colors[i % colors.length],
      });
    }

    // Center node
    nodes.push({
      x: centerX,
      y: centerY,
      vx: 0,
      vy: 0,
      radius: 12,
      color: '#7C3AED',
    });

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Update node positions (orbit around center)
      const centerNode = nodes[nodes.length - 1];
      for (let i = 0; i < nodes.length - 1; i++) {
        const node = nodes[i];
        const angle = (i / (nodes.length - 1)) * Math.PI * 2 + time * 0.3;
        const radius = 140 + Math.sin(time + i) * 20;
        node.x = centerNode.x + Math.cos(angle) * radius;
        node.y = centerNode.y + Math.sin(angle) * radius;
      }

      // Draw connections
      for (let i = 0; i < nodes.length - 1; i++) {
        const node = nodes[i];
        const center = nodes[nodes.length - 1];

        // Draw line to center
        const gradient = ctx.createLinearGradient(node.x, node.y, center.x, center.y);
        gradient.addColorStop(0, node.color + '40');
        gradient.addColorStop(0.5, '#7C3AED60');
        gradient.addColorStop(1, center.color + '40');

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(center.x, center.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw flowing particles on lines
        const particlePos = (time * 2 + i * 0.5) % 1;
        const px = node.x + (center.x - node.x) * particlePos;
        const py = node.y + (center.y - node.y) * particlePos;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#22D3EE';
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        // Glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
        glowGradient.addColorStop(0, node.color + '60');
        glowGradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Ring for outer nodes
        if (i < nodes.length - 1) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2);
          ctx.strokeStyle = node.color + '40';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const headlineWords = 'Engineering intelligence systems for high-volume brokerages.'.split(' ');

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Canvas for animated systems diagram */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Central Orb with smooth motion */}
      <motion.div
        className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[min(42vw,520px)] h-[min(42vw,520px)] rounded-full z-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #A78BFA 0%, #7C3AED 40%, #2E1065 100%)',
          boxShadow: '0 0 120px rgba(124, 58, 237, 0.35), 0 0 200px rgba(124, 58, 237, 0.2), inset 0 0 60px rgba(167, 139, 250, 0.3)',
          scale: orbScale,
          opacity: orbOpacity,
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: easings.premium, delay: 0.2 }}
      />

      {/* Content with smooth parallax */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[920px]"
        style={{ y: contentY }}
      >
        {/* Morphing Badge - Added here */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easings.premium, delay: 0.3 }}
        >
          <MorphingBadge />
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <motion.h1
          className="font-heading text-4xl sm:text-5xl lg:text-hero font-bold text-white mb-6 leading-[0.95] perspective-1000"
          variants={heroTextReveal}
          initial="hidden"
          animate="visible"
        >
          {headlineWords.map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block mr-[0.3em]"
              variants={heroWord}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-body text-nexora-gray max-w-[640px] mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.premium, delay: 0.6 }}
        >
          Custom AI infrastructure for Dubai real estate teams—voice, workflows, and lead systems that run 24/7.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easings.premium, delay: 0.8 }}
        >
          <MagneticButton
            href="https://calendly.com/app/scheduled_events/user/me"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 text-white"
          >
            Book a call
            <ArrowUpRight size={18} />
          </MagneticButton>
          <MagneticButton
            className="btn-secondary text-white"
            onClick={() => {
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View services
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nexora-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;