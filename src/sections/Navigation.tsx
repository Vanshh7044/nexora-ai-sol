"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/stateful-button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for desktop nav highlighting
  useEffect(() => {
    const sectionIds = navLinks
      .map((link) => (link.href.startsWith("#") ? link.href.replace("#", "") : null))
      .filter((id): id is string => Boolean(id) && id !== "");

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleBookCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        scrollToSection("#contact");
        resolve(true);
      }, 4000);
    });
  };

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: isScrolled ? 0.96 : 1,
            boxShadow: isScrolled
              ? "0 8px 20px rgba(0,0,0,0.12)"
              : "0 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`nav-morph backdrop-blur-md bg-black/40 ${
            isScrolled ? "is-scrolled" : "is-top"
          }`}
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-2.5 md:py-3">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#");
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300 ease-out">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-semibold text-base tracking-tight text-white">
                Nexora AI
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const id = link.href.startsWith("#") ? link.href.replace("#", "") : "";
                const isActive = id && activeSection === id;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`text-sm font-medium relative group cursor-pointer transition-colors duration-300 ease-out ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <Button
                  onClick={handleBookCall}
                  className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-md hover:shadow-purple-500/30 transition-all duration-300 ease-out"
                >
                  Book a Call
                </Button>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 text-white transition-colors duration-300 ease-out"
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`md:hidden nav-glass rounded-2xl shadow-nav p-4 space-y-1 ${
                isScrolled ? "mx-auto max-w-6xl mt-2 w-[95%]" : "mx-4 mt-2"
              }`}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="block py-2 px-4 text-gray-300 font-medium hover:text-white hover:bg-white/10 rounded-xl transition-colors duration-200 ease-out cursor-pointer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-2">
                <Button
                  onClick={handleBookCall}
                  className="w-full mt-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-md hover:shadow-purple-500/30 transition-all duration-300 ease-out"
                >
                  Book a Call
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navigation;
