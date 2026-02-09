import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Send, ArrowUp } from 'lucide-react';
import { BackgroundBeams } from '@/components/ui/background-beams';



const Footer = () => {
  <BackgroundBeams className="absolute inset-0 z-0" />
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkGroups = [
    {
      title: 'NAVIGATION',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Process', href: '#process' },
        { label: 'Case Studies', href: '#case-studies' },
        { label: 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: 'COMPANY',
      links: [
        { label: 'About', href: '#manifesto' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ];

  const socials = [
    { 
      icon: <Linkedin size={20} />, 
      href: 'https://linkedin.com/company/nexora-ai', 
      label: 'LinkedIn' 
    },
    { 
      icon: <Instagram size={20} />, 
      href: 'https://instagram.com/nexora.ai', 
      label: 'Instagram' 
    },
  ];

  return (
    <footer className="relative w-full bg-transparent border-t border-white/[0.05] z-30 overflow-hidden" data-scroll-section>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nexora-violet/5 blur-[100px] pointer-events-none" />
      
      <div className="relative w-full px-6 lg:px-[5vw] py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter - Takes up more space */}
          <div className="lg:col-span-5">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="inline-flex items-center gap-2 mb-6 group"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-heading text-2xl font-bold text-white">
                Nexora
              </span>
              <span className="font-heading text-2xl font-light text-nexora-violet">
                AI
              </span>
            </motion.a>

            {/* Tagline */}
            <p className="text-sm font-light text-white/60 tracking-wide mb-8 max-w-md leading-relaxed">
              Engineering custom AI infrastructure for Dubai's elite real estate brokerages.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-sm font-medium text-white mb-3 tracking-wide">
                Stay Updated
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm placeholder:text-nexora-gray/50 focus:outline-none focus:border-nexora-violet/50 focus:bg-white/[0.05] transition-all"
                  required
                />
                <motion.button
                  type="submit"
                  className="w-12 h-12 rounded-xl bg-nexora-violet flex items-center justify-center text-white hover:bg-nexora-violet-light transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p 
                  className="text-xs text-nexora-lime mt-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✓ Thanks for subscribing!
                </motion.p>
              )}
            </div>

            {/* CTA Button */}
            <motion.a
              href="https://calendly.com/app/scheduled_events/user/me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-nexora-violet text-white text-sm font-semibold hover:bg-nexora-violet-light transition-all shadow-lg shadow-nexora-violet/20"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Consultation
            </motion.a>
          </div>

          {/* Link Groups - Compact on right */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {linkGroups.map((group, index) => (
              <div key={index}>
                <h4 className="font-heading text-xs font-semibold text-white/60 mb-4 uppercase tracking-wider">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <motion.button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-nexora-gray hover:text-white transition-colors inline-flex items-center group"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity">→</span>
                        {link.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Socials */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-semibold text-white/60 mb-4 uppercase tracking-wider">
              CONNECT
            </h4>
            <div className="flex gap-3 mb-6">
              {socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-nexora-gray hover:text-white hover:border-nexora-violet/50 hover:bg-nexora-violet/10 transition-all"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-nexora-gray hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
            >
              <span className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-nexora-violet/50 group-hover:bg-nexora-violet/10 transition-all">
                <ArrowUp size={14} />
              </span>
              Back to top
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nexora-gray/60 font-light">
            © {new Date().getFullYear()} Nexora AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-nexora-gray/60 hover:text-white transition-colors font-light">
              Privacy Policy
            </button>
            <button className="text-xs text-nexora-gray/60 hover:text-white transition-colors font-light">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
